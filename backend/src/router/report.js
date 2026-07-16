import express from "express";
import { getReportById } from "../reportsRepo.js";

const router = express.Router();

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

export default router;
