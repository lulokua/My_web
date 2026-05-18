import type { Dictionary, Locale } from "@/content/i18n";
import { getLocalizedPath } from "@/content/i18n";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import MusicPlayer from "./components/MusicPlayer";

type MayJulyPlanSectionProps = {
  locale: Locale;
  dictionary: Dictionary["plan"]["mayJuly"];
};

export default function MayJulyPlanSection({ locale, dictionary }: MayJulyPlanSectionProps) {
  return (
    <div className="flex min-h-[calc(100dvh-64px)] flex-col items-center bg-[#F3F1EC] text-zinc-900 selection:bg-black/10 sm:min-h-[calc(100dvh-84px)]">
      <header className="relative w-full shrink-0">
        <div className="relative aspect-[21/9] w-full md:aspect-[3/1] lg:aspect-[4/1]">
          <Image
            src="https://my-blog.cn-nb1.rains3.com/My_web/plan/2026/2026-may-july.jpg"
            alt={dictionary.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#F3F1EC] via-black/20 to-black/30" />
        </div>

        <Link
          href={getLocalizedPath(locale, "/plan")}
          className="group absolute left-4 top-4 z-10 inline-flex items-center gap-2 rounded-full border border-white/35 bg-black/25 px-3 py-2 text-xs font-medium text-white shadow-sm backdrop-blur-md transition-colors hover:bg-black/35 sm:left-6 sm:top-6 sm:text-sm"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          {dictionary.backLabel}
        </Link>

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <h1 className="mb-2 text-4xl font-bold tracking-tight text-white drop-shadow-md sm:text-5xl">
            {dictionary.title}
          </h1>
          {dictionary.subtitle && (
            <p className="text-lg font-medium text-white/80 drop-shadow sm:text-xl">
              {dictionary.subtitle}
            </p>
          )}
        </div>
      </header>

      <div className="relative w-full max-w-3xl space-y-4 px-4 py-8 sm:space-y-6 sm:px-6 sm:py-12 lg:py-16">
        {dictionary.sections.map((section) => (
          <div
            key={section.heading}
            className="rounded-2xl bg-white p-6 ring-1 ring-black/5 sm:p-8"
          >
            <h2 className="mb-3 text-base font-semibold text-zinc-900 sm:mb-4 sm:text-lg">
              {section.heading}
            </h2>
            <ul className="list-disc space-y-1 pl-5 text-[15px] leading-relaxed text-zinc-600">
              {section.items.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <MusicPlayer bvid="BV1AD421K7Ha" />
    </div>
  );
}
