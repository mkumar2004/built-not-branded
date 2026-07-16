import { callGroq } from "./groq.js";
import { callOpenRouter } from "./openrouter.js";

export async function callAI(messages, jsonMode = true) {
  try {
    console.log("[AI Router] Attempting call with Groq...");
    const content = await callGroq(messages, jsonMode);
    return { provider: "groq", content };
  } catch (err) {
    console.warn("[AI Router] Groq failed, trying OpenRouter fallback. Error:", err.message);
    try {
      const content = await callOpenRouter(messages, jsonMode);
      return { provider: "openrouter", content };
    } catch (fallbackErr) {
      console.error("[AI Router] OpenRouter fallback also failed:", fallbackErr.message);
      throw new Error(`AI generation failed: Groq error: ${err.message}. OpenRouter error: ${fallbackErr.message}`);
    }
  }
}
