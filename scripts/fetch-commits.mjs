import { writeFileSync, existsSync, mkdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const PUBLIC_DIR = join(__dirname, "..", "public");
const OUTPUT_PATH = join(PUBLIC_DIR, "commits.json");

const COMMITS_ENDPOINT = "https://api.github.com/repos/lulokua/My_web/commits";

async function fetchCommits() {
  const url = new URL(COMMITS_ENDPOINT);
  url.searchParams.set("sha", "main");
  url.searchParams.set("per_page", "30");

  const response = await fetch(url, {
    headers: {
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
      "User-Agent": "My_web/1.0",
    },
    signal: AbortSignal.timeout(15000),
  });

  if (!response.ok) {
    throw new Error(`GitHub API returned ${response.status} ${response.statusText}`);
  }

  const data = await response.json();
  if (!Array.isArray(data)) {
    throw new Error("GitHub API returned an unexpected response.");
  }

  return data;
}

function parseCommit(item) {
  const [firstLine = "Untitled commit", ...restLines] = item.commit.message.split(/\r?\n/);
  const committedAt = item.commit.author?.date ?? "";

  return {
    sha: item.sha,
    shortSha: item.sha.slice(0, 7),
    title: firstLine.trim() || "Untitled commit",
    detail: restLines.join("\n").trim(),
    authorName: item.author?.login ?? item.commit.author?.name ?? "Unknown author",
    authorUrl: item.author?.html_url ?? null,
    committedAt,
    displayDate: committedAt
      ? new Intl.DateTimeFormat("zh-CN", {
          year: "numeric",
          month: "short",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        }).format(new Date(committedAt))
      : "Unknown date",
    htmlUrl: item.html_url,
  };
}

async function main() {
  try {
    console.log("[fetch-commits] Fetching commits from GitHub API...");
    const rawCommits = await fetchCommits();
    const parsedCommits = rawCommits.map(parseCommit);

    if (!existsSync(PUBLIC_DIR)) {
      mkdirSync(PUBLIC_DIR, { recursive: true });
    }

    const payload = {
      commits: parsedCommits,
      error: null,
      fetchedAt: new Date().toISOString(),
    };

    writeFileSync(OUTPUT_PATH, JSON.stringify(payload, null, 2));
    console.log(`[fetch-commits] Cached ${parsedCommits.length} commits to public/commits.json`);
  } catch (error) {
    console.error(`[fetch-commits] Error: ${error.message}`);

    if (existsSync(OUTPUT_PATH)) {
      console.log("[fetch-commits] Preserving existing cache.");
      return;
    }

    if (!existsSync(PUBLIC_DIR)) {
      mkdirSync(PUBLIC_DIR, { recursive: true });
    }

    const payload = {
      commits: [],
      error: error.message,
      fetchedAt: new Date().toISOString(),
    };

    writeFileSync(OUTPUT_PATH, JSON.stringify(payload, null, 2));
    process.exitCode = 1;
  }
}

main();
