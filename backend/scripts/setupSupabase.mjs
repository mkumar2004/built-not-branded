/**
 * backend/scripts/setupSupabase.mjs
 * 
 * Creates the required tables and functions in Supabase via the REST API.
 * Run once before starting the server:
 *   node backend/scripts/setupSupabase.mjs
 * 
 * Requires SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in backend/.env
 * (Service role key is needed for DDL — find it in Supabase Dashboard → Settings → API)
 */

import { config } from "dotenv";
import { fileURLToPath } from "url";
import path from "path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
config({ path: path.resolve(__dirname, "../.env") });

const SUPABASE_URL = process.env.SUPABASE_URL;
const SERVICE_KEY  = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SERVICE_KEY) {
  console.error(
    "❌ Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in backend/.env\n" +
    "   Find the service role key at: Supabase Dashboard → Settings → API → service_role"
  );
  process.exit(1);
}

const SQL = `
-- Enable pgvector extension
create extension if not exists vector;

-- reports table
create table if not exists reports (
  id               uuid primary key default gen_random_uuid(),
  role             text not null,
  experience_level text not null,
  github_urls      text[] default '{}',
  analysis         jsonb,
  created_at       timestamptz default now()
);

-- chunks table (384-dim for all-MiniLM-L6-v2)
create table if not exists chunks (
  id          bigint generated always as identity primary key,
  report_id   uuid references reports(id) on delete cascade,
  source      text not null,
  content     text not null,
  embedding   vector(384)
);

-- ANN index for fast similarity search
create index if not exists chunks_embedding_idx
  on chunks using ivfflat (embedding vector_cosine_ops)
  with (lists = 100);

-- match_chunks RPC used by reportsRepo.matchChunks
create or replace function match_chunks(
  query_embedding    vector(384),
  match_threshold    float,
  match_count        int,
  filter_report_id   uuid
)
returns table (
  id        bigint,
  report_id uuid,
  source    text,
  content   text,
  similarity float
)
language sql stable
as \$\$
  select
    c.id,
    c.report_id,
    c.source,
    c.content,
    1 - (c.embedding <=> query_embedding) as similarity
  from chunks c
  where c.report_id = filter_report_id
    and 1 - (c.embedding <=> query_embedding) > match_threshold
  order by c.embedding <=> query_embedding
  limit match_count;
\$\$;
`;

async function setup() {
  console.log("🚀 Setting up Supabase schema...\n");

  const res = await fetch(`${SUPABASE_URL}/rest/v1/rpc/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: SERVICE_KEY,
      Authorization: `Bearer ${SERVICE_KEY}`,
    },
  });

  // Use the pg SQL endpoint instead
  const sqlRes = await fetch(`${SUPABASE_URL}/rest/v1/`, {
    method: "OPTIONS",
  });

  // Supabase SQL via Management API
  const url = SUPABASE_URL.replace("https://", "https://");
  const projectRef = url.replace("https://", "").split(".")[0];

  const mgmtRes = await fetch(
    `https://api.supabase.com/v1/projects/${projectRef}/database/query`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${SERVICE_KEY}`,
      },
      body: JSON.stringify({ query: SQL }),
    }
  );

  if (!mgmtRes.ok) {
    const txt = await mgmtRes.text();
    console.error("❌ Schema setup failed:", mgmtRes.status, txt);
    console.log("\n📋 Alternatively, run the SQL manually in Supabase SQL Editor:");
    console.log("   https://supabase.com/dashboard/project/" + projectRef + "/sql/new\n");
    console.log(SQL);
    process.exit(1);
  }

  console.log("✅ Schema created successfully!");
  console.log("   Tables: reports, chunks");
  console.log("   Function: match_chunks");
}

setup().catch((err) => {
  console.error("Unexpected error:", err.message);
  process.exit(1);
});
