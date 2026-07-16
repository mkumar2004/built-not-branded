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
const allowedOrigin = process.env.FRONTEND_URL || "*";

app.use(cors({ origin: allowedOrigin }));
app.use(express.json());

app.use("/api/resume", resumeUploadRoutes); // -> POST /api/resume/upload
app.use("/api/report", reportRoutes);       // -> GET  /api/report/:id

app.get("/api/health", (_request, response) => {
  response.json({ message: "Backend API is running." });
});

import { exec } from "child_process";
import { promisify } from "util";

const execAsync = promisify(exec);

let retries = 0;
const maxRetries = 5;

async function killPort(port) {
  try {
    if (process.platform === "win32") {
      const { stdout } = await execAsync(`netstat -ano | findstr :${port}`);
      const lines = stdout.split("\n");
      for (const line of lines) {
        const parts = line.trim().split(/\s+/);
        if (parts.length >= 5 && parts[1].endsWith(`:${port}`) && parts[3] === "LISTENING") {
          const pid = parts[4];
          if (pid && pid !== "0") {
            console.log(`[server] Killing ghost process ${pid} on port ${port}...`);
            await execAsync(`taskkill /F /PID ${pid}`);
          }
        }
      }
    } else {
      const { stdout } = await execAsync(`lsof -t -i:${port}`);
      const pids = stdout.trim().split("\n").filter(Boolean);
      for (const pid of pids) {
        console.log(`[server] Killing ghost process ${pid} on port ${port}...`);
        await execAsync(`kill -9 ${pid}`);
      }
    }
  } catch (err) {
    // Ignore if not found
  }
}

function startServer() {
  const server = app.listen(port, () => {
    console.log(`\n🚀 API listening on http://localhost:${port}`);
    // Run migrations only after successfully binding to the port
    runMigrations();
  });

  server.on("error", async (err) => {
    if (err.code === "EADDRINUSE") {
      console.warn(`\n[server] Port ${port} is busy. Forcefully cleaning up...`);
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
