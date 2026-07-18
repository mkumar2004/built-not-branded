import { callGroq } from "./groq.js";
import { callOpenRouter } from "./openrouter.js";

const AI_TIMEOUT_MS = 20000; // 20s — long enough for a real response, short enough to fail fast on a hang

function withTimeout(promise, ms, label) {
  return Promise.race([
    promise,
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error(`${label} timed out after ${ms}ms (likely a network/DNS issue)`)), ms)
    ),
  ]);
}

export async function callAI(messages, jsonMode = true) {
  try {
    console.log("[AI Router] Attempting call with Groq...");
    const content = await withTimeout(callGroq(messages, jsonMode), AI_TIMEOUT_MS, "Groq call");
    return { provider: "groq", content };
  } catch (err) {
    console.warn("[AI Router] Groq failed, trying OpenRouter fallback. Error:", err.message);
    try {
      const content = await withTimeout(callOpenRouter(messages, jsonMode), AI_TIMEOUT_MS, "OpenRouter call");
      return { provider: "openrouter", content };
    } catch (fallbackErr) {
      console.error("[AI Router] OpenRouter fallback also failed:", fallbackErr.message);
      throw new Error(`AI generation failed: Groq error: ${err.message}. OpenRouter error: ${fallbackErr.message}`);
    }
  }
}