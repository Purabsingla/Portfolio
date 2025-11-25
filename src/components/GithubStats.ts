import type { Gitstats } from "./GitHubActivity";
export const fetchGithubStatsREST = async (): Promise<Gitstats> => {
  const username = "Purabsingla";
  const token = import.meta.env.VITE_PUBLIC_GITHUB_TOKEN;
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  try {
    // We run 3 requests in parallel to be fast
    const [userRes, reposRes, searchRes, contributionsRes] = await Promise.all([
      // 1. User Profile (For Active Repos count)
      fetch(`https://api.github.com/users/${username}`, { headers }),

      // 2. All Repos (To sum up Stars manually)
      fetch(`https://api.github.com/users/${username}/repos?per_page=100`, {
        headers,
      }),

      // 3. Search API (To count Pull Requests)
      fetch(
        `https://api.github.com/search/issues?q=author:${username}+type:pr`,
        { headers }
      ),

      // 4. "Green Squares" API (Official REST doesn't give 'Total Commits' easily)
      fetch(`https://github-contributions-api.jogruber.de/v4/${username}`),
    ]);

    const user = await userRes.json();
    const repos = await reposRes.json();
    const search = await searchRes.json();
    const contributions = await contributionsRes.json();

    // CALCULATION LOGIC:

    // A. Count Stars: Loop through all repos and add up 'stargazers_count'
    const totalStars = repos.reduce(
      (acc: any, repo: any) => acc + repo.stargazers_count,
      0
    );

    // B. Total Commits (Last Year): The wrapper API gives this directly
    // If you want LIFETIME commits, it's very hard via REST. This gives "Last Year" (Calendar style)
    const totalCommits = Object.values(
      contributions.total as Record<string, number>
    ).reduce((a: any, b: any) => a + b, 0);

    return {
      activeRepos: user.public_repos, // From Request 1
      repoStars: totalStars, // Calculated from Request 2
      pullRequests: search.total_count, // From Request 3
      totalCommits: totalCommits, // From Request 4
    };
  } catch (error) {
    console.error("Error fetching GitHub stats:", error);
    return { activeRepos: 0, repoStars: 0, pullRequests: 0, totalCommits: 0 };
  }
};
