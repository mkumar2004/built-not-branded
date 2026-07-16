import express from "express";
import multer from "multer";

import { extractResumeText } from "../lib/parseResume.js";
import { buildChunksFromSources } from "../lib/chunk.js";
import { embedChunks, embedText } from "../lib/embed.js";
import { fetchAllRepos } from "../prompt/fetchRepo.js";
import { buildAnalysisPrompt } from "../prompt/prompt.js";
import { callAI } from "../lib/router.js";
import {
  createReport,
  saveAnalysis,
  insertChunks,
  matchChunks,
} from "../reportsRepo.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

/**
 * POST /api/resume/upload
 * multipart/form-data fields:
 *   - resume: file (PDF or .txt)
 *   - role: string
 *   - experience_level: string
 *   - github_urls: JSON string array, e.g. '["https://github.com/user/repo"]'
 */
router.post("/upload", upload.single("resume"), async (req, res) => {
  try {
    const { role, experience_level } = req.body;
    const githubUrls = req.body.github_urls ? JSON.parse(req.body.github_urls) : [];

    if (!req.file) return res.status(400).json({ error: "resume file is required" });
    if (!role || !experience_level) {
      return res.status(400).json({ error: "role and experience_level are required" });
    }

    // 1. Create the report row up front so we have an id to attach everything to
    const report = await createReport({
      role,
      experience_level,
      github_urls: githubUrls,
    });

    // 2. Extract resume text
    const resumeText = await extractResumeText(req.file.path, req.file.mimetype);

    // 3. Fetch GitHub repo README(s) as additional evidence
    const repoSources = await fetchAllRepos(githubUrls);

    // 4. Build chunks from all sources
    const sources = [{ label: "resume", text: resumeText }, ...repoSources];
    const chunks = buildChunksFromSources(sources);

    if (chunks.length === 0) {
      return res.status(422).json({ error: "No usable text extracted from resume/repos" });
    }

    // 5. Embed chunks and store them in Supabase (pgvector)
    const embeddedChunks = await embedChunks(chunks);
    await insertChunks(report.id, embeddedChunks);

    // 6. Retrieve the most relevant chunks for this role (RAG retrieval step)
    const queryEmbedding = await embedText(
      `Skills, projects, and experience relevant to the role: ${role}, at experience level: ${experience_level}`
    );
    const retrievedChunks = await matchChunks(report.id, queryEmbedding, 8);

    // 7. Build the prompt and call the AI provider (Groq → OpenRouter fallback)
    const messages = buildAnalysisPrompt({ role, experienceLevel: experience_level, retrievedChunks });
    const { provider, content } = await callAI(messages);

    let analysis;
    try {
      analysis = JSON.parse(content);
    } catch {
      return res.status(502).json({ error: "AI returned invalid JSON", raw: content });
    }

    // 8. Save the analysis back onto the report
    const finalReport = await saveAnalysis(report.id, analysis);

    res.json({ report: finalReport, ai_provider_used: provider });
  } catch (err) {
    console.error("[resumeUpload] error:", err);
    res.status(500).json({ error: err.message });
  }
});

export default router;
