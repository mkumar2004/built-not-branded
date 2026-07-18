import { createClient } from "@supabase/supabase-js";
import { config } from "dotenv";
import { fileURLToPath } from "url";
import path from "path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
config({ path: path.resolve(__dirname, "../.env") });

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_SECRET_KEY;

let supabase = null;
if (supabaseUrl && supabaseAnonKey) {
  try {
    supabase = createClient(supabaseUrl, supabaseAnonKey);
    console.log("[reportsRepo] Supabase client initialized successfully.");
  } catch (err) {
    console.error("[reportsRepo] Failed to initialize Supabase client:", err.message);
  }
} else {
  console.warn("[reportsRepo] Supabase env variables missing. Running in in-memory fallback mode.");
}

const mockReports = new Map();
const mockChunks = [];

export async function createReport({ role, experience_level, github_urls, user_id, email }) {
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from("reports")
        .insert([{ role, experience_level, github_urls, user_id, email }])
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (err) {
      console.error("[reportsRepo] Supabase createReport error, falling back:", err.message);
    }
  }

  const id = Math.random().toString(36).substring(2, 15);
  const report = {
    id,
    role,
    experience_level,
    github_urls,
    user_id,
    email,
    analysis: null,
    created_at: new Date().toISOString(),
  };
  mockReports.set(id, report);
  return report;
}

export async function getReportById(id) {
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from("reports")
        .select("*")
        .eq("id", id)
        .single();

      if (error) throw error;
      return data;
    } catch (err) {
      console.error("[reportsRepo] Supabase getReportById error, falling back:", err.message);
    }
  }

  return mockReports.get(id) || null;
}

export async function saveAnalysis(id, analysis) {
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from("reports")
        .update({ analysis })
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (err) {
      console.error("[reportsRepo] Supabase saveAnalysis error, falling back:", err.message);
    }
  }

  const report = mockReports.get(id);
  if (report) {
    report.analysis = analysis;
    mockReports.set(id, report);
  }
  return report || null;
}

// ── PATCHED: now throws instead of silently swallowing, so a failed
// insert surfaces as a visible 500 with the real Supabase error message
// instead of quietly producing 0 retrievable chunks later.
export async function insertChunks(reportId, embeddedChunks) {
  if (supabase) {
    const rows = embeddedChunks.map((c) => ({
      report_id: reportId,
      source: c.source,
      content: c.content,
      embedding: c.embedding,
    }));

    const { error } = await supabase.from("chunks").insert(rows);
    if (error) {
      console.error("[reportsRepo] Supabase insertChunks FAILED:", error.message, error.details || "", error.hint || "");
      throw new Error(`Failed to insert chunks into Supabase: ${error.message}`);
    }

    console.log(`[reportsRepo] Successfully inserted ${rows.length} chunks for report ${reportId}`);
    return;
  }

  // Fallback (only reached if Supabase client was never initialized)
  embeddedChunks.forEach((c) => {
    mockChunks.push({
      report_id: reportId,
      source: c.source,
      content: c.content,
      embedding: c.embedding,
    });
  });
  console.log(`[reportsRepo] Stored ${embeddedChunks.length} chunks in-memory (no Supabase client)`);
}

function dotProduct(a, b) {
  return a.reduce((sum, val, i) => sum + val * b[i], 0);
}

// Supabase/PostgREST returns pgvector columns as a string like "[0.1,-0.2,...]",
// not a parsed array — this was silently breaking every similarity calculation
// ("a.reduce is not a function") and made every retrieval look empty.
function toVector(embedding) {
  if (Array.isArray(embedding)) return embedding;
  if (typeof embedding === "string") {
    try {
      return JSON.parse(embedding);
    } catch {
      // Fallback for non-JSON pgvector text formats, e.g. "(1,2,3)"
      return embedding
        .replace(/[[\]()]/g, "")
        .split(",")
        .map(Number);
    }
  }
  return embedding;
}

export async function matchChunks(reportId, queryEmbedding, limit = 8) {
  if (supabase) {
    try {
      const { data, error } = await supabase.rpc("match_chunks", {
        query_embedding: queryEmbedding,
        match_threshold: 0.0,
        match_count: limit,
        filter_report_id: reportId,
      });

      if (error) throw error;
      if (data && data.length > 0) return data;

      console.warn(`[reportsRepo] match_chunks RPC returned 0 rows for report ${reportId}, trying raw query fallback`);
    } catch (err) {
      console.error("[reportsRepo] Supabase matchChunks RPC failed:", err.message);
    }

    try {
      const { data, error } = await supabase
        .from("chunks")
        .select("source, content, embedding")
        .eq("report_id", reportId);

      if (error) throw error;

      console.log(`[reportsRepo] Raw query found ${data.length} chunks for report ${reportId}`);

      const scored = data.map((chunk) => {
        const vec = toVector(chunk.embedding);
        const sim = dotProduct(vec, queryEmbedding);
        return { ...chunk, embedding: vec, similarity: sim };
      });
      scored.sort((a, b) => b.similarity - a.similarity);
      return scored.slice(0, limit);
    } catch (innerErr) {
      console.error("[reportsRepo] Supabase raw query fallback also failed:", innerErr.message);
    }
  }

  const filtered = mockChunks.filter((c) => c.report_id === reportId);
  const scored = filtered.map((c) => {
    const vec = toVector(c.embedding);
    const sim = dotProduct(vec, queryEmbedding);
    return { ...c, embedding: vec, similarity: sim };
  });
  scored.sort((a, b) => b.similarity - a.similarity);
  return scored.slice(0, limit);
}

export async function getReportByUserIdentifier({ user_id, email }) {
  if (supabase) {
    try {
      let query = supabase.from("reports").select("*");
      if (user_id) {
        query = query.eq("user_id", user_id);
      } else if (email) {
        query = query.eq("email", email);
      } else {
        return null;
      }
      const { data, error } = await query.maybeSingle();
      if (error) throw error;
      return data;
    } catch (err) {
      console.error("[reportsRepo] Supabase getReportByUserIdentifier error:", err.message);
    }
  }

  for (const report of mockReports.values()) {
    if (user_id && report.user_id === user_id) return report;
    if (email && report.email === email) return report;
  }
  return null;
}

export async function updateReport(id, { role, experience_level, github_urls }) {
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from("reports")
        .update({ role, experience_level, github_urls, analysis: null })
        .eq("id", id)
        .select()
        .single();
      if (error) throw error;
      return data;
    } catch (err) {
      console.error("[reportsRepo] Supabase updateReport error:", err.message);
    }
  }

  const report = mockReports.get(id);
  if (report) {
    report.role = role;
    report.experience_level = experience_level;
    report.github_urls = github_urls;
    report.analysis = null;
    mockReports.set(id, report);
  }
  return report || null;
}

export async function deleteChunksByReportId(reportId) {
  if (supabase) {
    try {
      const { error } = await supabase
        .from("chunks")
        .delete()
        .eq("report_id", reportId);
      if (error) throw error;
    } catch (err) {
      console.error("[reportsRepo] Supabase deleteChunksByReportId error:", err.message);
    }
  }

  for (let i = mockChunks.length - 1; i >= 0; i--) {
    if (mockChunks[i].report_id === reportId) {
      mockChunks.splice(i, 1);
    }
  }
}

export async function getAllReports() {
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from("reports")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    } catch (err) {
      console.error("[reportsRepo] Supabase getAllReports error, falling back:", err.message);
    }
  }

  return Array.from(mockReports.values()).sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
}