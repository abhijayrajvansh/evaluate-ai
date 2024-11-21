import { Octokit } from "octokit";

const octokit = new Octokit();

export async function analyzeRepository(repoUrl: string) {
  // Extract owner and repo from URL
  const [owner, repo] = repoUrl
    .replace("https://github.com/", "")
    .replace(".git", "")
    .split("/");

  // Fetch repository data
  const [repoData, contributors, branches, languages] = await Promise.all([
    octokit.rest.repos.get({ owner, repo }),
    octokit.rest.repos.listContributors({ owner, repo }),
    octokit.rest.repos.listBranches({ owner, repo }),
    octokit.rest.repos.listLanguages({ owner, repo }),
  ]);

  // Mock analysis data (in a real app, you'd perform actual analysis)
  const mockQualityMetrics = [
    { name: "Code Coverage", value: Math.floor(Math.random() * 100) },
    { name: "Maintainability", value: Math.floor(Math.random() * 100) },
    { name: "Documentation", value: Math.floor(Math.random() * 100) },
    { name: "Test Coverage", value: Math.floor(Math.random() * 100) },
  ];

  const mockStyleIssues = [
    {
      severity: "error",
      title: "Inconsistent Indentation",
      description: "Mixed usage of spaces and tabs found in multiple files",
    },
    {
      severity: "warning",
      title: "Naming Conventions",
      description: "Variable naming doesn't follow project conventions in some modules",
    },
    {
      severity: "success",
      title: "Code Formatting",
      description: "Most files follow consistent formatting rules",
    },
  ];

  return {
    totalFiles: repoData.data.size,
    contributors: contributors.data.length,
    branches: branches.data.length,
    languages: languages.data,
    qualityMetrics: mockQualityMetrics,
    styleIssues: mockStyleIssues,
  };
}