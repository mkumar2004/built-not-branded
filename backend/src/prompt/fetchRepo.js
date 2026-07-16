/**
 * Fetches the README (and optionally other key files) from a public GitHub repo.
 * No auth token needed for public repos, but rate limits are low without one —
 * add GITHUB_TOKEN to .env if you hit limits during testing/demo.
 */
export async function fetchRepoReadme(repoUrl) {
  const match = repoUrl.match(/github\.com\/([^/]+)\/([^/]+)/);
  if (!match) throw new Error(`Invalid GitHub URL: ${repoUrl}`);
  const [, owner, repo] = match;
  const cleanRepo = repo.replace(/\.git$/, "");

  const headers = { Accept: "application/vnd.github.raw+json" };
  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  const res = await fetch(
    `https://api.github.com/repos/${owner}/${cleanRepo}/readme`,
    { headers }
  );

  if (!res.ok) {
    console.warn(`[github] Could not fetch README for ${repoUrl}: ${res.status}`);
    return { label: `repo:${owner}/${cleanRepo}`, text: "" };
  }

  const text = await res.text();
  return { label: `repo:${owner}/${cleanRepo}/README`, text };
}

export async function fetchAllRepos(repoUrls) {
  const results = await Promise.all(repoUrls.map(fetchRepoReadme));
  return results.filter((r) => r.text.trim().length > 0);
}
