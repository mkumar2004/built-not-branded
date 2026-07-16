import { config } from "dotenv";
import { fileURLToPath } from "url";
import path from "path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
config({ path: path.resolve(__dirname, "../.env") });

import cors from "cors";
import express from "express";
import { runMigrations } from "./migrate.js";
import resumeUploadRoutes from "./router/resumeUpload.js";
import reportRoutes from "./router/report.js";

const app = express();
const port = process.env.PORT || 4000;

// Allow any origin on Vercel (set FRONTEND_URL env var to restrict in production)
const allowedOrigin = process.env.FRONTEND_URL || "*";
app.use(cors({ origin: allowedOrigin }));
app.use(express.json());

app.use("/api/resume", resumeUploadRoutes); // -> POST /api/resume/upload
app.use("/api/report", reportRoutes);       // -> GET  /api/report

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", message: "SkillFit Backend API is running." });
});

// ─── Local dev server (NOT used on Vercel) ───────────────────────────────────
// On Vercel, the platform injects incoming HTTP requests directly into the
// exported `app` handler. Calling app.listen() or spawning shell processes
// (netstat, lsof, taskkill) would crash the serverless function.

if (!process.env.VERCEL) {
  const { exec } = await import("child_process");
  const { promisify } = await import("util");
  const execAsync = promisify(exec);

  let retries = 0;
  const maxRetries = 5;

  async function killPort(p) {
    try {
      if (process.platform === "win32") {
        const { stdout } = await execAsync(`netstat -ano | findstr :${p}`);
        for (const line of stdout.split("\n")) {
          const parts = line.trim().split(/\s+/);
          if (parts.length >= 5 && parts[1].endsWith(`:${p}`) && parts[3] === "LISTENING") {
            const pid = parts[4];
            if (pid && pid !== "0") {
              console.log(`[server] Killing ghost process ${pid} on port ${p}...`);
              await execAsync(`taskkill /F /PID ${pid}`);
            }
          }
        }
      } else {
        const { stdout } = await execAsync(`lsof -t -i:${p}`);
        for (const pid of stdout.trim().split("\n").filter(Boolean)) {
          console.log(`[server] Killing ghost process ${pid} on port ${p}...`);
          await execAsync(`kill -9 ${pid}`);
        }
      }
    } catch (_) { /* ignore */ }
  }

  function startServer() {
    const server = app.listen(port, () => {
      console.log(`\n🚀 API listening on http://localhost:${port}`);
      runMigrations();
    });

    server.on("error", async (err) => {
      if (err.code === "EADDRINUSE") {
        console.warn(`\n[server] Port ${port} is busy. Cleaning up...`);
        await killPort(port);
        if (retries < maxRetries) {
          retries++;
          console.log(`[server] Retrying in 1s (Attempt ${retries}/${maxRetries})...`);
          setTimeout(startServer, 1000);
        } else {
          console.error(`\n❌ Port ${port} could not be freed after ${maxRetries} attempts.`);
          process.exit(1);
        }
      } else {
        throw err;
      }
    });
  }

  startServer();
}

// Vercel uses this as the serverless function handler
export default app;
