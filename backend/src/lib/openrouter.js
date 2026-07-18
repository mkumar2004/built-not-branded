// OpenRouter is also OpenAI-compatible and gateways many free models.
// Docs: https://openrouter.ai/docs

const OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions";
const OPENROUTER_MODEL = "meta-llama/llama-3.3-70b-instruct:free"; // free-tier model
const REQUEST_TIMEOUT_MS = 15000;

export async function callOpenRouter(messages, jsonMode = true) {
  const apiKey = process.env.OPENROUTER_API_KEY || process.env.open_Router_ai;
  if (!apiKey) {
    throw new Error("OpenRouter API key (OPENROUTER_API_KEY or open_Router_ai) is not set");
  }

  const reqBody = {
    model: OPENROUTER_MODEL,
    messages,
    temperature: 0.2,
  };

  if (jsonMode) {
    reqBody.response_format = { type: "json_object" };
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  let res;
  try {
    res = await fetch(OPENROUTER_URL, {
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
      throw new Error(`OpenRouter request timed out after ${REQUEST_TIMEOUT_MS}ms (network unreachable or too slow)`);
    }
    throw new Error(`OpenRouter request failed: ${err.message}`);
  } finally {
    clearTimeout(timeoutId);
  }

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`OpenRouter API error (${res.status}): ${errText}`);
  }

  const data = await res.json();
  return data.choices[0].message.content;
}