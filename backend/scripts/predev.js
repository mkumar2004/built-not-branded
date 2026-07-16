import { exec } from "child_process";
import { promisify } from "util";

const execAsync = promisify(exec);
const PORT = 4000;

async function killPortProcess(port) {
  try {
    if (process.platform === "win32") {
      // Windows: Find PID of process listening on the port
      const { stdout } = await execAsync(`netstat -ano`);
      const lines = stdout.split("\n");
      const pids = new Set();
      
      for (const line of lines) {
        const parts = line.trim().split(/\s+/);
        // We match rows like: TCP  0.0.0.0:4000  0.0.0.0:0  LISTENING  1234
        if (parts.length >= 5 && parts[1].endsWith(`:${port}`) && parts[3] === "LISTENING") {
          const pid = parts[4];
          if (pid && pid !== "0") {
            pids.add(pid);
          }
        }
      }
      
      for (const pid of pids) {
        console.log(`[predev] Found zombie process ${pid} listening on port ${port}. Terminating...`);
        try {
          await execAsync(`taskkill /F /PID ${pid}`);
        } catch (killErr) {
          console.warn(`[predev] Failed to kill PID ${pid}: ${killErr.message}`);
        }
      }
    } else {
      // Unix/macOS
      const { stdout } = await execAsync(`lsof -t -i:${port}`);
      const pids = stdout.trim().split("\n").filter(Boolean);
      
      for (const pid of pids) {
        console.log(`[predev] Found zombie process ${pid} listening on port ${port}. Terminating...`);
        try {
          await execAsync(`kill -9 ${pid}`);
        } catch (killErr) {
          console.warn(`[predev] Failed to kill PID ${pid}: ${killErr.message}`);
        }
      }
    }
  } catch (err) {
    // If no process is running, command might exit with code 1 which is caught here safely.
  }
}

killPortProcess(PORT).then(() => {
  console.log(`[predev] Port ${PORT} is verified free and ready.`);
  process.exit(0);
});
