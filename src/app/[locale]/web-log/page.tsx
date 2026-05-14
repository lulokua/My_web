import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AlertCircle, ArrowLeft, GitCommit } from "lucide-react";

import { formatCommitDate, getCommits } from "@/lib/commits";
import { getDictionary, getLocalizedPath, isLocale, type Locale } from "@/lib/i18n";

type WebLogPageProps = {
  params: Promise<{ locale: string }>;
};

async function resolveLocale(params: WebLogPageProps["params"]): Promise<Locale> {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  return locale;
}

export async function generateMetadata({ params }: WebLogPageProps): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const dictionary = getDictionary(locale);

  return dictionary.webLog.metadata;
}

export default async function WebLogPage({ params }: WebLogPageProps) {
  const locale = await resolveLocale(params);
  const dictionary = getDictionary(locale);
  const { commits, error } = await getCommits();

  return (
    <div className="min-h-[calc(100dvh-64px)] sm:min-h-[calc(100dvh-84px)] bg-[#0A0A0A] text-zinc-100 selection:bg-white/20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 py-12 sm:py-20 lg:py-32">
        <header className="mb-10 sm:mb-16 flex flex-col items-start gap-4 sm:gap-6">
          <Link
            href={getLocalizedPath(locale)}
            className="group flex items-center gap-2 text-xs sm:text-sm font-medium text-zinc-400 transition-colors hover:text-zinc-100"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            {dictionary.webLog.backHome}
          </Link>
          <div>
            <h1 className="text-2xl sm:text-3xl lg:text-5xl font-semibold tracking-tight text-zinc-100">
              {dictionary.webLog.title}
            </h1>
            <p className="mt-3 sm:mt-4 text-sm sm:text-base text-zinc-400">
              {dictionary.webLog.subtitle}
            </p>
          </div>
        </header>

        {error ? (
          <div className="flex items-start gap-3 rounded-2xl bg-red-500/10 p-5 text-red-200 ring-1 ring-red-500/20">
            <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
            <div>
              <h2 className="text-sm font-semibold">{dictionary.webLog.unableToLoad}</h2>
              <p className="mt-1 text-sm text-red-200/80">{error}</p>
            </div>
          </div>
        ) : (
          <div className="relative">
            <div className="absolute left-5 sm:left-6 top-6 -bottom-6 w-px bg-zinc-800" />

            <ul className="flex flex-col">
              {commits.map((commit) => {
                const displayDate =
                  formatCommitDate(commit.committedAt, locale) ?? dictionary.webLog.dateFallback;

                return (
                  <li
                    key={commit.sha}
                    className="group relative flex gap-4 sm:gap-6 pb-10 sm:pb-12 last:pb-0"
                  >
                    <div className="relative z-10 shrink-0 mt-1">
                      <Image
                        src="https://avatars.githubusercontent.com/u/237419681?s=48&v=4"
                        alt={dictionary.webLog.authorAvatar}
                        width={48}
                        height={48}
                        className="h-10 w-10 sm:h-12 sm:w-12 rounded-full border border-zinc-800 bg-zinc-900 object-cover ring-6 sm:ring-8 ring-[#0A0A0A] transition-transform group-hover:scale-105"
                      />
                    </div>

                    <div className="flex-1 rounded-2xl bg-zinc-900/30 p-4 sm:p-6 ring-1 ring-white/5 transition-all hover:bg-zinc-900/50 hover:ring-white/10">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                        <div className="flex items-center gap-2 text-sm text-zinc-400">
                          <span className="font-medium text-zinc-300">{commit.authorName}</span>
                          <span>{dictionary.webLog.separator}</span>
                          <time dateTime={commit.committedAt}>{displayDate}</time>
                        </div>
                        <a
                          href={commit.htmlUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="flex w-fit items-center gap-1.5 rounded-full bg-zinc-800/50 px-3 py-1 text-xs font-medium text-zinc-400 ring-1 ring-white/5 transition-colors hover:bg-zinc-800 hover:text-zinc-100"
                        >
                          <GitCommit className="h-3.5 w-3.5" />
                          {commit.shortSha}
                        </a>
                      </div>

                      <h2 className="mt-3 sm:mt-4 text-base sm:text-lg font-medium text-zinc-100">
                        {commit.title}
                      </h2>

                      {commit.detail && (
                        <p className="mt-2 sm:mt-3 whitespace-pre-wrap text-sm leading-relaxed text-zinc-400">
                          {commit.detail}
                        </p>
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
