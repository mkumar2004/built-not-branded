-- Enable pgvector extension (run once per project)
create extension if not exists vector;

-- ─────────────────────────────────────────
-- reports table
-- ─────────────────────────────────────────
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

-- ─────────────────────────────────────────
-- chunks table  (384-dim for all-MiniLM-L6-v2)
-- ─────────────────────────────────────────
create table if not exists chunks (
  id          bigint generated always as identity primary key,
  report_id   uuid references reports(id) on delete cascade,
  source      text not null,
  content     text not null,
  embedding   vector(384)
);

-- index for fast ANN search
create index if not exists chunks_embedding_idx
  on chunks using ivfflat (embedding vector_cosine_ops)
  with (lists = 100);

-- ─────────────────────────────────────────
-- match_chunks RPC  (called by reportsRepo)
-- ─────────────────────────────────────────
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
as $$
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
$$;
