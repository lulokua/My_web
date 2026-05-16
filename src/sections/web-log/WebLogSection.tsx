import Image from "next/image";
import { AlertCircle, GitCommit } from "lucide-react";

import type { Dictionary, Locale } from "@/content/i18n";
import type { ParsedCommit } from "@/features/commits/lib/commits";
import { formatCommitDate } from "@/features/commits/lib/commits";
import PageIntro from "@/shared/layout/page/PageIntro";

type WebLogSectionProps = {
  locale: Locale;
  dictionary: Dictionary["webLog"];
  commits: ParsedCommit[];
  error: string | null;
};

export default function WebLogSection({ locale, dictionary, commits, error }: WebLogSectionProps) {
  return (
    <div className="min-h-[calc(100dvh-64px)] bg-[#F3F1EC] text-zinc-900 selection:bg-black/10 sm:min-h-[calc(100dvh-84px)]">
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-20 lg:py-32">
        <PageIntro
          locale={locale}
          backLabel={dictionary.backHome}
          title={dictionary.title}
          subtitle={dictionary.subtitle}
        />

        {error ? (
          <div className="flex items-start gap-3 rounded-2xl bg-red-50 p-5 text-red-800 ring-1 ring-red-500/10">
            <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-600" aria-hidden="true" />
            <div>
              <h2 className="text-sm font-semibold text-red-800">{dictionary.unableToLoad}</h2>
              <p className="mt-1 text-sm text-red-700">{error}</p>
            </div>
          </div>
        ) : (
          <div className="relative">
            <div className="absolute left-5 top-6 -bottom-6 w-px bg-zinc-200 sm:left-6" />

            <ul className="flex flex-col">
              {commits.map((commit) => {
                const displayDate = formatCommitDate(commit.committedAt, locale) ?? dictionary.dateFallback;

                return (
                  <li
                    key={commit.sha}
                    className="group relative flex gap-4 pb-10 last:pb-0 sm:gap-6 sm:pb-12"
                  >
                    <div className="relative z-10 mt-1 shrink-0">
                      <Image
                        src="https://avatars.githubusercontent.com/u/237419681?s=48&v=4"
                        alt={dictionary.authorAvatar}
                        width={48}
                        height={48}
                        className="h-10 w-10 rounded-full border border-zinc-200 bg-white object-cover ring-6 ring-[#F3F1EC] transition-transform group-hover:scale-105 sm:h-12 sm:w-12 sm:ring-8"
                      />
                    </div>

                    <div className="flex-1 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-black/5 transition-all hover:bg-zinc-50 hover:ring-black/10 sm:p-6">
                      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex items-center gap-2 text-sm text-zinc-500">
                          <span className="font-medium text-zinc-700">{commit.authorName}</span>
                          <span>{dictionary.separator}</span>
                          <time dateTime={commit.committedAt}>{displayDate}</time>
                        </div>
                        <a
                          href={commit.htmlUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex w-fit items-center gap-1.5 rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-500 ring-1 ring-black/5 transition-colors hover:bg-zinc-200 hover:text-zinc-900"
                        >
                          <GitCommit className="h-3.5 w-3.5" />
                          {commit.shortSha}
                        </a>
                      </div>

                      <h2 className="mt-3 text-base font-medium text-zinc-900 sm:mt-4 sm:text-lg">{commit.title}</h2>

                      {commit.detail ? (
                        <p className="mt-2 whitespace-pre-wrap text-sm leading-relaxed text-zinc-600 sm:mt-3">
                          {commit.detail}
                        </p>
                      ) : null}
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
