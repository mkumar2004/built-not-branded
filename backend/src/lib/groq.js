// Groq's API is OpenAI-compatible. Free tier, very fast inference.
// Docs: https://console.groq.com/docs

const GROQ_URL = "https://api.groq.com/openai/v1/chat/completions";
const GROQ_MODEL = "llama-3.3-70b-versatile"; // strong free-tier model on Groq
const REQUEST_TIMEOUT_MS = 15000;

export async function callGroq(messages, jsonMode = true) {
  const apiKey = process.env.GROQ_API_KEY || process.env.groq_Ai;
  if (!apiKey) {
    throw new Error("Groq API key (GROQ_API_KEY or groq_Ai) is not set");
  }

  const reqBody = {
    model: GROQ_MODEL,
    messages,
    temperature: 0.2,
  };

  if (jsonMode) {
    reqBody.response_format = { type: "json_object" };
  }

  // Real abort-based timeout — guarantees this fetch cannot hang indefinitely,
  // regardless of whether the failure mode is DNS, a dropped TCP connection,
  // or a slow response.
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  let res;
  try {
    res = await fetch(GROQ_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify(reqBody),
      signal: controller.signal,
    });
  } catch (err) {
    if (err.name === "AbortError") {
      throw new Error(`Groq request timed out after ${REQUEST_TIMEOUT_MS}ms (network unreachable or too slow)`);
    }
    throw new Error(`Groq request failed: ${err.message}`);
  } finally {
    clearTimeout(timeoutId);
  }

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Groq API error (${res.status}): ${errText}`);
  }

  const data = await res.json();
  return data.choices[0].message.content;
}