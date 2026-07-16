import fs from "fs";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const pdfParse = require("pdf-parse");

/**
 * Extracts plain text from an uploaded resume file.
 * Supports PDF and plain text (.txt). Extend with mammoth for .docx if needed.
 */
export async function extractResumeText(filePath, mimeType) {
  if (mimeType === "application/pdf") {
    const buffer = fs.readFileSync(filePath);
    const parsed = await pdfParse(buffer);
    return parsed.text.trim();
  }

  if (mimeType === "text/plain") {
    return fs.readFileSync(filePath, "utf-8").trim();
  }

  throw new Error(`Unsupported resume file type: ${mimeType}`);
}
