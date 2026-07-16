import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

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

// In-memory fallbacks
const mockReports = new Map();
const mockChunks = [];

export async function createReport({ role, experience_level, github_urls }) {
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from("reports")
        .insert([{ role, experience_level, github_urls }])
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (err) {
      console.error("[reportsRepo] Supabase createReport error, falling back:", err.message);
    }
  }

  // Fallback
  const id = Math.random().toString(36).substring(2, 15);
  const report = {
    id,
    role,
    experience_level,
    github_urls,
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

export async function insertChunks(reportId, embeddedChunks) {
  if (supabase) {
    try {
      const rows = embeddedChunks.map((c) => ({
        report_id: reportId,
        source: c.source,
        content: c.content,
        embedding: c.embedding,
      }));

      const { error } = await supabase.from("chunks").insert(rows);
      if (error) throw error;
      return;
    } catch (err) {
      console.error("[reportsRepo] Supabase insertChunks error, falling back:", err.message);
    }
  }

  // Fallback
  embeddedChunks.forEach((c) => {
    mockChunks.push({
      report_id: reportId,
      source: c.source,
      content: c.content,
      embedding: c.embedding,
    });
  });
}

function dotProduct(a, b) {
  return a.reduce((sum, val, i) => sum + val * b[i], 0);
}

export async function matchChunks(reportId, queryEmbedding, limit = 8) {
  if (supabase) {
    try {
      // Calls match_chunks RPC on Supabase
      const { data, error } = await supabase.rpc("match_chunks", {
        query_embedding: queryEmbedding,
        match_threshold: 0.0, // accept any match and sort by similarity
        match_count: limit,
        filter_report_id: reportId,
      });

      if (error) throw error;
      return data;
    } catch (err) {
      console.error("[reportsRepo] Supabase matchChunks RPC failed, trying raw query fallback:", err.message);
      // Fallback query if RPC isn't set up
      try {
        const { data, error } = await supabase
          .from("chunks")
          .select("source, content, embedding")
          .eq("report_id", reportId);

        if (error) throw error;

        // Perform similarity matching in JS
        const scored = data.map((chunk) => {
          const sim = dotProduct(chunk.embedding, queryEmbedding);
          return { ...chunk, similarity: sim };
        });
        scored.sort((a, b) => b.similarity - a.similarity);
        return scored.slice(0, limit);
      } catch (innerErr) {
        console.error("[reportsRepo] Supabase raw query fallback also failed:", innerErr.message);
      }
    }
  }

  // Fallback: match based on local data
  const filtered = mockChunks.filter((c) => c.report_id === reportId);
  const scored = filtered.map((c) => {
    const sim = dotProduct(c.embedding, queryEmbedding);
    return { ...c, similarity: sim };
  });
  scored.sort((a, b) => b.similarity - a.similarity);
  return scored.slice(0, limit);
}
