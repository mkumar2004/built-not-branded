import "dotenv/config";
import cors from "cors";
import express from "express";
import resumeUploadRoutes from "./router/resumeUpload.js";
import reportRoutes from "./router/report.js";

const app = express();
const port = process.env.PORT || 4000;
const allowedOrigin = process.env.FRONTEND_URL || "http://localhost:3000";

app.use(cors({ origin: allowedOrigin }));
app.use(express.json());

app.use("/api/resume", resumeUploadRoutes); // -> POST /api/resume/upload
app.use("/api/report", reportRoutes);       // -> GET  /api/report/:id

app.get("/api/health", (_request, response) => {
  response.json({ message: "Backend API is running." });
});

app.listen(port, () => {
  console.log(`API listening on http://localhost:${port}`);
});
