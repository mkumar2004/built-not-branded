import fs from "fs";
import path from "path";

/**
 * Extracts plain text from an uploaded resume file.
 * Supports PDF (.pdf) and plain text (.txt).
 * 
 * Uses file EXTENSION (not MIME type) for detection because Vercel/multer
 * can report incorrect MIME types (e.g., "application/octet-stream" for .txt).
 * 
 * pdf-parse is imported lazily to avoid the known issue where it tries to
 * read test PDF files from disk at import time, which crashes on Vercel.
 */
export async function extractResumeText(filePath, originalName) {
  // Determine type from the original filename extension (fallback: filepath)
  const name = (originalName || filePath || "").toLowerCase();
  const ext = path.extname(name);

  if (ext === ".pdf") {
    // Lazy import: avoids pdf-parse running fs.readFile on its test fixtures at startup
    const pdfParse = (await import("pdf-parse")).default;
    const dataBuffer = fs.readFileSync(filePath);
    const result = await pdfParse(dataBuffer);
    return result.text?.trim() || "";
  }

  // .txt, no extension, or anything else — treat as plain text
  return fs.readFileSync(filePath, "utf-8").trim();
}
