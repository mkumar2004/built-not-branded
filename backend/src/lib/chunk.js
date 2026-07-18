/**
 * Removes characters Postgres can't store in text/jsonb columns:
 * - null bytes (\u0000) — commonly introduced by PDF text extraction
 * - unpaired UTF-16 surrogates — can appear from bad encoding/decoding
 * Without this, Supabase inserts fail with "unsupported Unicode escape sequence".
 */
function sanitizeText(text) {
  return text
    .replace(/\u0000/g, "")
    .replace(/[\uD800-\uDFFF]/g, "");
}

/**
 * Splits long text into overlapping chunks suitable for embedding.
 * Overlap helps preserve context across chunk boundaries.
 */
export function chunkText(text, { chunkSize = 500, overlap = 80 } = {}) {
  const clean = sanitizeText(text).replace(/\s+/g, " ").trim();
  if (!clean) return [];

  const chunks = [];
  let start = 0;

  while (start < clean.length) {
    const end = Math.min(start + chunkSize, clean.length);
    chunks.push(clean.slice(start, end));
    if (end === clean.length) break;
    start = end - overlap;
  }

  return chunks;
}

/**
 * Builds labeled chunks from multiple sources (resume + repo files)
 * ready to be embedded and stored.
 * sources: [{ label: 'resume', text: '...' }, { label: 'repo:my-app/README.md', text: '...' }]
 */
export function buildChunksFromSources(sources) {
  const allChunks = [];
  for (const { label, text } of sources) {
    const pieces = chunkText(text);
    pieces.forEach((content) => {
      allChunks.push({ source: label, content });
    });
  }
  return allChunks;
}