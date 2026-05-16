import { readFileSync } from "fs";
import { join } from "path";

import type { Locale } from "@/content/i18n";

const COMMIT_CACHE_ERROR = "Unable to load cached commit data.";
const COMMIT_URL_BASE = "https://github.com/lulokua/My_web/commit/";
const SHA_PATTERN = /^[0-9a-f]{40}$/i;

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

function readString(value: unknown, maxLength: number): string | null {
  if (typeof value !== "string") {
    return null;
  }

  const trimmed = value.trim();
  if (!trimmed) {
    return "";
  }

  return trimmed.length > maxLength ? trimmed.slice(0, maxLength) : trimmed;
}

function readGitHubProfileUrl(value: unknown): string | null {
  if (typeof value !== "string") {
    return null;
  }

  try {
    const url = new URL(value);
    return url.protocol === "https:" && url.hostname === "github.com" ? url.toString() : null;
  } catch {
    return null;
  }
}

function parseCachedCommit(value: unknown): ParsedCommit | null {
  if (!value || typeof value !== "object") {
    return null;
  }

  const record = value as Record<string, unknown>;
  const sha = readString(record.sha, 40);
  if (!sha || !SHA_PATTERN.test(sha)) {
    return null;
  }

  return {
    sha,
    shortSha: sha.slice(0, 7),
    title: readString(record.title, 240) || "Untitled commit",
    detail: readString(record.detail, 4000) ?? "",
    authorName: readString(record.authorName, 80) || "Unknown author",
    authorUrl: readGitHubProfileUrl(record.authorUrl),
    committedAt: readString(record.committedAt, 40) ?? "",
    displayDate: readString(record.displayDate, 80) ?? undefined,
    htmlUrl: `${COMMIT_URL_BASE}${sha}`,
  };
}

function isParsedCommit(commit: ParsedCommit | null): commit is ParsedCommit {
  return commit !== null;
}

export async function getCommits(): Promise<CommitLoadResult> {
  try {
    const filePath = join(process.cwd(), "public", "commits.json");
    const fileContent = readFileSync(filePath, "utf-8");
    const data = JSON.parse(fileContent);

    if (data.error) {
      return { commits: [], error: COMMIT_CACHE_ERROR };
    }

    if (!Array.isArray(data.commits)) {
      return { commits: [], error: COMMIT_CACHE_ERROR };
    }

    const commits = (data.commits as unknown[]).map(parseCachedCommit).filter(isParsedCommit);
    return { commits, error: null };
  } catch {
    return { commits: [], error: COMMIT_CACHE_ERROR };
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
