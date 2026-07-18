import supabase from "../config/supabaseClient.js";

/**
 * Saves the detailed analysis (category scores, growth plan, etc.) onto a report.
 * Separate from reportsRepo.saveAnalysis so the original flow is untouched.
 */
export async function saveDetailedAnalysis(reportId, analysis) {
  const {
    fit_score,
    verdict,
    category_scores,
    strengths,
    gaps,
    focus_area,
    growth_plan,
  } = analysis;

  const { data, error } = await supabase
    .from("reports")
    .update({
      fit_score,
      verdict,
      category_scores,
      strengths,
      gaps,
      focus_area,
      growth_plan,
      raw_ai_response: analysis,
    })
    .eq("id", reportId)
    .select()
    .single();

  if (error) throw error;
  return data;
}

/**
 * Lists all reports belonging to a specific candidate, newest first.
 * Powers the "Report History (via Magic Link)" screen.
 */
export async function listReportsByCandidate(candidateId) {
  const { data, error } = await supabase
    .from("reports")
    .select("id, role, experience_level, fit_score, verdict, created_at")
    .eq("candidate_id", candidateId)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
}

/**
 * Creates a report row that supports candidate_id — kept separate from
 * reportsRepo.createReport (which doesn't accept candidate_id) so that
 * file stays untouched.
 */
export async function createCandidateReport({ role, experience_level, github_urls, candidate_id }) {
  const { data, error } = await supabase
    .from("reports")
    .insert([{ role, experience_level, github_urls, candidate_id }])
    .select()
    .single();

  if (error) throw error;
  return data;
}