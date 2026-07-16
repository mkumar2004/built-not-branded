import pkg from "pg";
import { config } from "dotenv";
import { fileURLToPath } from "url";
import path from "path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
config({ path: path.resolve(__dirname, "../.env") });

const { Client } = pkg;

const SCHEMA_SQL = `
-- Enable pgvector extension (required for vector similarity search)
create extension if not exists vector;

-- reports table: stores each resume analysis job
create table if not exists reports (
  id               uuid primary key default gen_random_uuid(),
  user_id          text,
  email            text,
  role             text not null,
  experience_level text not null,
  github_urls      text[] default '{}',
  analysis         jsonb,
  created_at       timestamptz default now()
);

-- chunks table: stores embedded text chunks linked to a report
create table if not exists chunks (
  id          bigint generated always as identity primary key,
  report_id   uuid references reports(id) on delete cascade,
  source      text not null,
  content     text not null,
  embedding   vector(384)
);

-- ANN index for fast cosine similarity search
create index if not exists chunks_embedding_idx
  on chunks using ivfflat (embedding vector_cosine_ops)
  with (lists = 100);

-- match_chunks RPC: called by reportsRepo to retrieve similar chunks
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

/**
 * Connects to Postgres via DATABASE_URL and runs the schema migration.
 * Tables are created with IF NOT EXISTS so it is safe to run on every startup.
 */
export async function runMigrations() {
  const databaseUrl = process.env.DATABASE_URL;

  if (!databaseUrl) {
    console.warn(
      "[migrate] ⚠️  DATABASE_URL not set — skipping auto-migration.\n" +
      "         Add DATABASE_URL to backend/.env to enable automatic table creation.\n" +
      "         Get it from: Supabase Dashboard → Settings → Database → URI"
    );
    return false;
  }

  const client = new Client({ connectionString: databaseUrl, ssl: { rejectUnauthorized: false } });

  try {
    console.log("[migrate] 🔄 Running database migrations...");
    await client.connect();
    await client.query(SCHEMA_SQL);
    
    // Migrate existing table if it was created before
    await client.query(`
      alter table reports add column if not exists user_id text;
      alter table reports add column if not exists email text;
    `);
    
    console.log("[migrate] ✅ Tables ready: reports, chunks, match_chunks()");
    return true;
  } catch (err) {
    console.error("[migrate] ❌ Migration failed:", err.message);
    console.warn("[migrate]    Data will fall back to in-memory storage.");
    return false;
  } finally {
    await client.end();
  }
}
