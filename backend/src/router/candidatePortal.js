

import express from "express";
import multer from "multer";
import fs from "fs";

// Reused as-is from earlier work — adjust these paths to match your actual
// file locations (your tree differs slightly from my original assumption —
// double check each one below before running):
import { extractResumeText } from "../lib/parseResume.js";
import { buildChunksFromSources } from "../lib/chunk.js";
import { embedChunks, embedText } from "../lib/embed.js";
import { fetchAllRepos } from "../prompt/fetchRepo.js";
import { callAI } from "../lib/router.js";
import { insertChunks, matchChunks, getReportById } from "../services/reportsRepo.js";
import { getUserFromToken } from "../lib/supabaseAuth.js";

// New pieces, specific to the candidate portal screens
import buildDetailedAnalysisPrompt  from "../prompt/promptDetailed.js";
import {
  saveDetailedAnalysis,
  listReportsByCandidate,
  createCandidateReport,
} from "../lib/candidateReportsRepo.js";

const router = express.Router();

// ── Vercel-safe upload dir ───────────────────────────────
// On Vercel only /tmp is writable, and it's ephemeral per invocation.
// This was the actual cause of the 500s: multer's diskStorage calls
// mkdirSync('uploads/') at import time, and Vercel's filesystem is
// read-only outside /tmp — that mkdirSync throws ENOENT and crashes
// the whole function (every route in this process), not just this one.
const uploadDir = process.env.VERCEL ? "/tmp" : "uploads/";
if (!process.env.VERCEL && !fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}
const upload = multer({
  dest: uploadDir,
  limits: { fileSize: 10 * 1024 * 1024 },
});

/**
 * POST /api/candidate/submit
 * Powers Screen 02 — Submission Form.
 * Same pipeline as resumeUpload.js, but saves the richer analysis shape
 * (category scores + growth plan) needed by Screens 03 and 04.
 *
 * If the request has a valid Bearer token, the report is linked to that
 * candidate. Anonymous submissions still work — candidate_id stays null.
 */
router.post("/submit", upload.single("resume"), async (req, res) => {
  let tempFilePath = req.file?.path;

  try {
    const { role, experience_level } = req.body;

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

    // Optional auth — do not require login, just attach candidate_id if present
    let candidateId = null;
    const authHeader = req.headers.authorization || "";
    if (authHeader.startsWith("Bearer ")) {
      try {
        const user = await getUserFromToken(authHeader.slice(7));
        if (user) candidateId = user.id;
      } catch {
        // invalid/expired token — proceed anonymously rather than failing the upload
      }
    }

    const report = await createCandidateReport({
      role,
      experience_level,
      github_urls: githubUrls,
      candidate_id: candidateId,
    });

    let resumeText;
    try {
      resumeText = await extractResumeText(req.file.path, req.file.originalname);
    } catch (err) {
      return res.status(422).json({ error: `Failed to parse resume file: ${err.message}` });
    }

    let repoSources = [];
    try {
      repoSources = await fetchAllRepos(githubUrls);
    } catch (err) {
      console.warn("[candidatePortal/submit] GitHub fetch failed, continuing without repo data:", err.message);
    }

    const sources = [{ label: "resume", text: resumeText }, ...repoSources];
    const chunks = buildChunksFromSources(sources);

    if (chunks.length === 0) {
      return res.status(422).json({ error: "No usable text extracted from resume/repos" });
    }

    const embeddedChunks = await embedChunks(chunks);
    await insertChunks(report.id, embeddedChunks);

    const queryEmbedding = await embedText(
      `Skills, projects, and experience relevant to the role: ${role}, at experience level: ${experience_level}`
    );
    const retrievedChunks = await matchChunks(report.id, queryEmbedding, 8);

    const messages = buildDetailedAnalysisPrompt({
      role,
      experienceLevel: experience_level,
      retrievedChunks,
    });
    const { provider, content } = await callAI(messages);

    let analysis;
    try {
      analysis = JSON.parse(content);
    } catch {
      return res.status(502).json({ error: "AI returned invalid JSON", raw: content });
    }

    const finalReport = await saveDetailedAnalysis(report.id, analysis);
    res.json({ report: finalReport, ai_provider_used: provider });
  } catch (err) {
    console.error("[candidatePortal/submit] error:", err);
    res.status(500).json({ error: err.message });
  } finally {
    if (tempFilePath) {
      fs.unlink(tempFilePath, (unlinkErr) => {
        if (unlinkErr) console.warn("[candidatePortal/submit] Failed to remove temp file:", unlinkErr.message);
      });
    }
  }
});

/**
 * GET /api/candidate/report/:id
 * Powers Screen 03 (Fit Report) and Screen 04 (Growth Path) —
 * both screens read from the same report object, just render different fields.
 */
router.get("/report/:id", async (req, res) => {
  try {
    const report = await getReportById(req.params.id);
    if (!report) return res.status(404).json({ error: "Report not found" });
    res.json(report);
  } catch (err) {
    console.error("[candidatePortal/report] error:", err);
    res.status(500).json({ error: err.message });
  }
});

/**
 * GET /api/candidate/reports
 * Powers Screen 05 — Report History (via Magic Link).
 * Protected — requires a logged-in candidate (magic link session).
 */
router.get("/reports", async (req, res) => {
  try {
    const authHeader = req.headers.authorization || "";
    if (!authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Login required to view report history" });
    }

    const user = await getUserFromToken(authHeader.slice(7));
    if (!user) return res.status(401).json({ error: "Invalid or expired session" });

    const reports = await listReportsByCandidate(user.id);
    res.json({ reports });
  } catch (err) {
    console.error("[candidatePortal/reports] error:", err);
    res.status(500).json({ error: err.message });
  }
});

export default router;