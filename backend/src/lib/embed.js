import fetch from "node-fetch";

// Free, local embeddings — no API key, no cost, no rate limit.
// Uses Xenova/all-MiniLM-L6-v2, output dimension = 384 (matches supabase_schema.sql).
let embedderPromise = null;

async function getEmbedder() {
  if (!embedderPromise) {
    const { pipeline } = await import("@xenova/transformers");
    embedderPromise = pipeline("feature-extraction", "Xenova/all-MiniLM-L6-v2");
  }
  return embedderPromise;
}

/**
 * Returns a 384-dim embedding vector for a single piece of text.
 */
export async function embedText(text) {
  // 1. Try Hugging Face Inference API first (extremely fast, zero cold start, works on Vercel)
  try {
    const headers = { "Content-Type": "application/json" };
    if (process.env.HUGGINGFACE_TOKEN) {
      headers["Authorization"] = `Bearer ${process.env.HUGGINGFACE_TOKEN}`;
    }
    const res = await fetch("https://api-inference.huggingface.co/pipeline/feature-extraction/sentence-transformers/all-MiniLM-L6-v2", {
      method: "POST",
      headers,
      body: JSON.stringify({ inputs: text })
    });
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data)) {
        if (typeof data[0] === "number") return data;
        if (Array.isArray(data[0]) && typeof data[0][0] === "number") return data[0];
      }
    } else {
      console.warn(`[embed] HF Inference API returned status ${res.status}. Falling back to local transformers...`);
    }
  } catch (hfErr) {
    console.warn(`[embed] HF Inference API failed (${hfErr.message}). Falling back to local transformers...`);
  }

  // 2. Local fallback using Xenova/transformers
  const embedder = await getEmbedder();
  const output = await embedder(text, { pooling: "mean", normalize: true });
  return Array.from(output.data);
}

/**
 * Embeds an array of chunk objects { source, content } and attaches `embedding`.
 */
export async function embedChunks(chunks) {
  const results = [];
  for (const chunk of chunks) {
    const embedding = await embedText(chunk.content);
    results.push({ ...chunk, embedding });
  }
  return results;
}

