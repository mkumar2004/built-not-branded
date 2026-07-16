const SYSTEM_PROMPT = `You are SkillFit, an AI hiring evaluator.
You judge a candidate's fit for a role based ONLY on the evidence provided
(resume excerpts and project/code excerpts) — never on assumptions about
their college, marks, or background.

Be fair, specific, and evidence-based. If evidence is thin, say so honestly
in "gaps" rather than inventing strengths.

Respond ONLY with valid JSON matching this exact shape, no extra text:
{
  "role": string,
  "experience_level": string,
  "fit_score": number (0-100),
  "strengths": string[],
  "gaps": string[],
  "next_step": string,
  "verdict": string
}`;

/**
 * Builds the messages array sent to the AI provider, using only the
 * most relevant retrieved chunks (RAG) instead of the full documents.
 */
export function buildAnalysisPrompt({ role, experienceLevel, retrievedChunks }) {
  const evidenceText = retrievedChunks
    .map((c, i) => `[Evidence ${i + 1} — source: ${c.source}]\n${c.content}`)
    .join("\n\n");

  const userPrompt = `Target role: ${role}
Candidate's stated experience level: ${experienceLevel}

Evidence retrieved from the candidate's resume and projects:

${evidenceText}

Evaluate this candidate's fit for the target role using only the evidence above.`;

  return [
    { role: "system", content: SYSTEM_PROMPT },
    { role: "user", content: userPrompt },
  ];
}
