import Link from "next/link";

import type { Dictionary } from "@/content/i18n";
import { getLocalizedPath, type Locale } from "@/content/i18n";

type PhotoSectionProps = {
  locale: Locale;
  dictionary: Dictionary["photo"];
};

export default function PhotoSection({ locale, dictionary }: PhotoSectionProps) {
  return (
    <div className="flex min-h-[calc(100dvh-64px)] flex-col items-center justify-center bg-[#F9F8F6] px-4 text-zinc-900 sm:min-h-[calc(100dvh-84px)]">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-sm ring-1 ring-black/5 sm:p-12">
        <h1 className="mb-2 text-2xl font-bold text-zinc-900">{dictionary.title}</h1>
        <p className="mb-4 text-sm font-medium text-zinc-500">{dictionary.subtitle}</p>
        <p className="text-[15px] leading-relaxed text-zinc-400">{dictionary.empty}</p>
      </div>

      <Link
        href={getLocalizedPath(locale)}
        className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-zinc-500 transition-colors hover:text-zinc-900"
      >
        {dictionary.backHome}
      </Link>
    </div>
  );
}
