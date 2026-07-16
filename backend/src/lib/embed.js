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
  const embedder = await getEmbedder();
  const output = await embedder(text, { pooling: "mean", normalize: true });
  return Array.from(output.data);
}

/**
 * Embeds an array of chunk objects { source, content } and attaches `embedding`.
 * Runs sequentially to keep memory use predictable on a hackathon machine;
 * switch to Promise.all if you want speed and have the RAM for it.
 */
export async function embedChunks(chunks) {
  const results = [];
  for (const chunk of chunks) {
    const embedding = await embedText(chunk.content);
    results.push({ ...chunk, embedding });
  }
  return results;
}
