-- Run this AFTER supabase_schema.sql and match_chunks.sql

-- 1. Profiles table: links a Supabase Auth user to a role
create table if not exists profiles (
  id uuid references auth.users(id) on delete cascade primary key,
  role text check (role in ('candidate', 'recruiter')) not null,
  email text,
  created_at timestamptz default now()
);

-- 2. Link reports to the candidate who created them
alter table reports add column if not exists candidate_id uuid references auth.users(id);

-- 3. Enable Row Level Security
alter table reports enable row level security;
alter table profiles enable row level security;

-- 4. Policies: profiles
-- Users can read their own profile
create policy "Users can view their own profile"
  on profiles for select
  using (auth.uid() = id);

-- 5. Policies: reports
-- Candidates can view only their own reports
create policy "Candidates view own reports"
  on reports for select
  using (auth.uid() = candidate_id);

-- Recruiters can view all reports
create policy "Recruiters view all reports"
  on reports for select
  using (
    exists (
      select 1 from profiles
      where profiles.id = auth.uid()
      and profiles.role = 'recruiter'
    )
  );

-- Note: your backend uses the Supabase SECRET key for writes (createReport,
-- saveAnalysis, insertChunks), which bypasses RLS entirely — this is expected
-- and correct, since those operations happen server-side, not as a logged-in user.
-- RLS here only matters if the frontend ever queries Supabase directly with a
-- user's session token instead of going through your backend.
