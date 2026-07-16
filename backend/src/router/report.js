import express from "express";
import { getReportById, matchChunks, getAllReports } from "../reportsRepo.js";
import { embedText } from "../lib/embed.js";
import { callAI } from "../lib/router.js";

const router = express.Router();

// GET /api/report
router.get("/", async (req, res) => {
  try {
    const reports = await getAllReports();
    res.json(reports);
  } catch (err) {
    console.error("[reportList] error:", err);
    res.status(500).json({ error: err.message });
  }
});

// GET /api/report/:id
router.get("/:id", async (req, res) => {
  try {
    const report = await getReportById(req.params.id);
    if (!report) return res.status(404).json({ error: "Report not found" });
    res.json(report);
  } catch (err) {
    console.error("[report] error:", err);
    res.status(500).json({ error: err.message });
  }
});

// POST /api/report/:id/query
router.post("/:id/query", async (req, res) => {
  try {
    const { query } = req.body;
    if (!query) {
      return res.status(400).json({ error: "query is required" });
    }

    const reportId = req.params.id;
    const report = await getReportById(reportId);
    if (!report) return res.status(404).json({ error: "Report not found" });

    // 1. Embed user query
    const queryEmbedding = await embedText(query);

    // 2. Fetch relevant vector chunks
    const retrievedChunks = await matchChunks(reportId, queryEmbedding, 8);

    if (retrievedChunks.length === 0) {
      return res.status(404).json({ error: "No context chunks found for this report." });
    }

    // 3. Build prompt
    const contextText = retrievedChunks
      .map((c) => `[Source: ${c.source}]\n${c.content}`)
      .join("\n\n");

    const messages = [
      {
        role: "system",
        content: `You are an expert technical recruiter. Answer the user's question about the candidate based on the provided resume and repository snippets.\n\nContext:\n${contextText}`
      },
      {
        role: "user",
        content: query
      }
    ];

    // 4. Call AI provider
    const { provider, content } = await callAI(messages, false);

    res.json({
      answer: content,
      ai_provider_used: provider,
      sources: retrievedChunks.map((c) => ({ source: c.source, content: c.content }))
    });
  } catch (err) {
    console.error("[reportQuery] error:", err);
    res.status(500).json({ error: err.message });
  }
});

export default router;
