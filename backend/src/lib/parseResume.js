import fs from "fs";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const { PDFParse, VerbosityLevel } = require("pdf-parse");

/**
 * Extracts plain text from an uploaded resume file.
 * Supports PDF and plain text (.txt). Extend with mammoth for .docx if needed.
 *
 * pdf-parse v2 API:
 *   1. new PDFParse({ data: Buffer, verbosity })
 *   2. await parser.load()
 *   3. const { pages } = await parser.getText()
 *   4. pages is an array of { text: string }
 */
export async function extractResumeText(filePath, mimeType) {
  if (mimeType === "application/pdf") {
    const data = fs.readFileSync(filePath);
    const parser = new PDFParse({ data, verbosity: VerbosityLevel.ERRORS });
    await parser.load();
    const result = await parser.getText();
    // result.pages = [{ text: string }, ...]
    const fullText = result.pages.map((p) => p.text).join("\n").trim();
    return fullText;
  }

  if (mimeType === "text/plain") {
    return fs.readFileSync(filePath, "utf-8").trim();
  }

  throw new Error(`Unsupported resume file type: ${mimeType}`);
}
