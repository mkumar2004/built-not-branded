-- Run this AFTER supabase_schema.sql, match_chunks.sql, auth_schema.sql
-- Adds ALL the extra fields the candidate portal (candidateReportsRepo.js)
-- reads/writes on the `reports` table. Your previous migration only added
-- category_scores, growth_plan, and focus_area — this adds the rest.

alter table reports add column if not exists candidate_id uuid references auth.users(id);
-- Links a report to a logged-in candidate. Stays null for anonymous submissions.

alter table reports add column if not exists fit_score integer;
-- Overall numeric fit score shown on the Fit Report screen (e.g. 0-100).

alter table reports add column if not exists verdict text;
-- Short headline verdict, e.g. "Strong Fit" / "Needs Growth".

alter table reports add column if not exists category_scores jsonb;
-- Example shape: { "problem_solving": 90, "technical_skills": 85, "project_impact": 80, "communication": 78 }

alter table reports add column if not exists strengths jsonb;
-- Example shape: ["Strong grasp of React state management", "Clean commit history"]

alter table reports add column if not exists gaps jsonb;
-- Example shape: ["Limited exposure to system design", "No test coverage in projects"]

alter table reports add column if not exists focus_area text;
-- e.g. "Strengthen System Design Foundations" — the Growth Path page headline

alter table reports add column if not exists growth_plan jsonb;
-- Example shape: [
--   { "step": "Learn system design basics", "duration": "2-3 weeks" },
--   { "step": "Build a scalable backend project", "duration": "3-4 weeks" }
-- ]

alter table reports add column if not exists raw_ai_response jsonb;
-- Full AI response payload, kept for debugging/audit.

-- Index to speed up the Report History query (candidate's own reports, newest first)
create index if not exists reports_candidate_created_idx
  on reports (candidate_id, created_at desc);

-- IMPORTANT: PostgREST caches the schema. Without this, the API can keep
-- returning "column not found" errors even after the columns exist above.
notify pgrst, 'reload schema';