import { readFileSync } from "fs";
import { join } from "path";

import type { Locale } from "@/lib/i18n";

export type ParsedCommit = {
  sha: string;
  shortSha: string;
  title: string;
  detail: string;
  authorName: string;
  authorUrl: string | null;
  committedAt: string;
  displayDate?: string;
  htmlUrl: string;
};

export type CommitLoadResult =
  | { commits: ParsedCommit[]; error: null }
  | { commits: []; error: string };

export async function getCommits(): Promise<CommitLoadResult> {
  try {
    const filePath = join(process.cwd(), "public", "commits.json");
    const fileContent = readFileSync(filePath, "utf-8");
    const data = JSON.parse(fileContent);

    if (data.error) {
      return { commits: [], error: data.error };
    }

    if (!Array.isArray(data.commits)) {
      return { commits: [], error: "Invalid cached commit data." };
    }

    return { commits: data.commits as ParsedCommit[], error: null };
  } catch (error) {
    return {
      commits: [],
      error: error instanceof Error ? error.message : "Failed to load cached commits.",
    };
  }
}

export function formatCommitDate(value: string, locale: Locale): string | null {
  if (!value) {
    return null;
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return null;
  }

  return new Intl.DateTimeFormat(locale === "zh" ? "zh-CN" : "en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}
