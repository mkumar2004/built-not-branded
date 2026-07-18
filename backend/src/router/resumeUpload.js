import express from "express";
import multer from "multer";
import fs from "fs";

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
  getReportByUserIdentifier,
  updateReport,
  deleteChunksByReportId,
} from "../services/reportsRepo.js";

const router = express.Router();

// ── Vercel-safe upload dir ───────────────────────────────
// On Vercel only /tmp is writable, and it's ephemeral per invocation.
const uploadDir = process.env.VERCEL ? "/tmp" : "uploads/";
if (!process.env.VERCEL && !fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}
const upload = multer({
  dest: uploadDir,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB, matches the UI copy
});

// ── Fail fast on missing env vars ────────────────────────
// This turns a vague 500 into a clear, actionable error message in your
// Vercel function logs instead of a cryptic downstream crash.
// Matches the actual key names from .env.example:
//   - SUPABASE_URL is always required
//   - the Supabase secret key can be named either SUPABASE_SECRET_KEY (new)
//     or SUPABASE_SERVICE_ROLE_KEY (legacy projects) — only one is needed
//   - at least one AI provider (groq_Ai or open_Router_ai) is required
function checkRequiredEnvVars() {
  const missing = [];

  if (!process.env.SUPABASE_URL) missing.push("SUPABASE_URL");

  const hasSupabaseSecret =
    !!process.env.SUPABASE_SECRET_KEY || !!process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!hasSupabaseSecret) missing.push("SUPABASE_SECRET_KEY (or SUPABASE_SERVICE_ROLE_KEY)");

  const hasAiProvider = !!process.env.groq_Ai || !!process.env.open_Router_ai;
  if (!hasAiProvider) missing.push("groq_Ai (or open_Router_ai)");

  if (missing.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missing.join(", ")}. ` +
        `Set these in Vercel Project Settings → Environment Variables and redeploy.`
    );
  }
}

/**
 * POST /api/resume/upload
 * multipart/form-data fields:
 *   - resume: file (PDF or .txt)
 *   - role: string
 *   - experience_level: string
 *   - github_urls: JSON string array, e.g. '["https://github.com/user/repo"]'
 *   - email: string (optional, for tracking same user)
 *   - user_id: string (optional, for tracking same user)
 */
router.post("/upload", upload.single("resume"), async (req, res) => {
  let tempFilePath = req.file?.path;

  try {
    checkRequiredEnvVars();

    const { role, experience_level, email, user_id } = req.body;

    let githubUrls = [];
    try {
      githubUrls = req.body.github_urls ? JSON.parse(req.body.github_urls) : [];
    } catch {
      return res.status(400).json({ error: "github_urls must be valid JSON" });
    }

    if (!req.file) return res.status(400).json({ error: "resume file is required" });
    if (!role || !experience_level) {
      return res.status(400).json({ error: "role and experience_level are required" });
    }

    // 1. Check if same user already has a report, if so update/upsert it
    let report;
    if (user_id || email) {
      const existingReport = await getReportByUserIdentifier({ user_id, email });
      if (existingReport) {
        console.log(`[resumeUpload] Found existing report ${existingReport.id} for user, updating...`);
        report = await updateReport(existingReport.id, {
          role,
          experience_level,
          github_urls: githubUrls,
        });
        await deleteChunksByReportId(existingReport.id);
      }
    }

    if (!report) {
      report = await createReport({ role, experience_level, github_urls: githubUrls, user_id, email });
    }

    // 2. Extract resume text
    let resumeText;
    try {
      resumeText = await extractResumeText(req.file.path, req.file.originalname);
    } catch (err) {
      return res.status(422).json({ error: `Failed to parse resume file: ${err.message}` });
    }
    // TEMP DEBUG — remove once the extraction pipeline is confirmed working
    console.log(`[DEBUG] Extracted resume text length: ${resumeText.length}`);
    console.log(`[DEBUG] First 300 chars: ${resumeText.slice(0, 300)}`);

    // 3. Fetch GitHub repo README(s) — don't let a flaky GitHub call kill the whole request
    let repoSources = [];
    try {
      repoSources = await fetchAllRepos(githubUrls);
    } catch (err) {
      console.warn("[resumeUpload] GitHub fetch failed, continuing without repo data:", err.message);
    }

    // 4. Build chunks from all sources
    const sources = [{ label: "resume", text: resumeText }, ...repoSources];
    const chunks = buildChunksFromSources(sources);

    if (chunks.length === 0) {
      return res.status(422).json({ error: "No usable text extracted from resume/repos" });
    }

    // 5. Embed chunks and store them
    const embeddedChunks = await embedChunks(chunks);
    await insertChunks(report.id, embeddedChunks);

    // 6. Retrieve the most relevant chunks for this role
    const queryEmbedding = await embedText(
      `Skills, projects, and experience relevant to the role: ${role}, at experience level: ${experience_level}`
    );
    const retrievedChunks = await matchChunks(report.id, queryEmbedding, 8);
    // TEMP DEBUG — remove once the pipeline is confirmed working
    console.log(`[DEBUG] Retrieved ${retrievedChunks?.length || 0} chunks for AI context`);
    console.log(`[DEBUG] Chunk sources:`, retrievedChunks?.map((c) => c.source));

    // 7. Build the prompt and call the AI provider
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
  } finally {
    // Clean up the temp file from /tmp (or uploads/) so it doesn't linger.
    if (tempFilePath) {
      fs.unlink(tempFilePath, (unlinkErr) => {
        if (unlinkErr) console.warn("[resumeUpload] Failed to remove temp file:", unlinkErr.message);
      });
    }
  }
});

export default router;