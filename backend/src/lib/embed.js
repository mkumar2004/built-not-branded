import fetch from "node-fetch";

// Free, local embeddings — no API key, no cost, no rate limit.
// Uses Xenova/all-MiniLM-L6-v2, output dimension = 384 (matches supabase_schema.sql).
let embedderPromise = null;

// Circuit breaker: once the HF Inference API fails once (e.g. DNS/network
// unreachable), stop retrying it for every subsequent chunk in this process.
// Without this, a single request with 60 chunks does 60 doomed network
// calls before falling back each time.
let hfApiDisabled = process.env.EMBED_PROVIDER === "local";

const HF_TIMEOUT_MS = 5000;

function getEmbedder() {
  if (!embedderPromise) {
    embedderPromise = (async () => {
      const { pipeline } = await import("@xenova/transformers");
      return pipeline("feature-extraction", "Xenova/all-MiniLM-L6-v2");
    })();
  }
  return embedderPromise;
}

async function tryHfInference(text) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), HF_TIMEOUT_MS);

  try {
    const headers = { "Content-Type": "application/json" };
    if (process.env.HUGGINGFACE_TOKEN) {
      headers["Authorization"] = `Bearer ${process.env.HUGGINGFACE_TOKEN}`;
    }
    const res = await fetch(
      "https://api-inference.huggingface.co/pipeline/feature-extraction/sentence-transformers/all-MiniLM-L6-v2",
      {
        method: "POST",
        headers,
        body: JSON.stringify({ inputs: text }),
        signal: controller.signal,
      }
    );

    if (!res.ok) {
      console.warn(`[embed] HF Inference API returned status ${res.status}. Falling back to local transformers.`);
      return null;
    }

    const data = await res.json();
    if (Array.isArray(data)) {
      if (typeof data[0] === "number") return data;
      if (Array.isArray(data[0]) && typeof data[0][0] === "number") return data[0];
    }
    return null;
  } catch (hfErr) {
    // Network-level failures (ENOTFOUND, ECONNRESET, timeout/abort) mean the
    // API is unreachable for this whole run, not just this chunk — trip the
    // breaker so we don't repeat this for every remaining chunk.
    console.warn(`[embed] HF Inference API unreachable (${hfErr.message}). Disabling for remainder of run, using local transformers.`);
    hfApiDisabled = true;
    return null;
  } finally {
    clearTimeout(timeout);
  }
}

/**
 * Returns a 384-dim embedding vector for a single piece of text.
 */
export async function embedText(text) {
  if (!hfApiDisabled) {
    const vector = await tryHfInference(text);
    if (vector) return vector;
  }

  // Local fallback using Xenova/transformers
  const embedder = await getEmbedder();
  const output = await embedder(text, { pooling: "mean", normalize: true });
  return Array.from(output.data);
}

/**
 * Embeds an array of chunk objects { source, content } and attaches `embedding`.
 * Isolates per-chunk failures so one bad chunk doesn't crash the whole batch —
 * failed chunks are dropped (and logged) rather than throwing.
 */
export async function embedChunks(chunks) {
  const results = [];
  for (const chunk of chunks) {
    try {
      const embedding = await embedText(chunk.content);
      results.push({ ...chunk, embedding });
    } catch (err) {
      console.error(`[embed] Failed to embed chunk from "${chunk.source}": ${err.message}. Skipping this chunk.`);
    }
  }

  if (results.length === 0 && chunks.length > 0) {
    throw new Error("All chunks failed to embed — check embedding provider (network or local model) is working.");
  }

  return results;
}