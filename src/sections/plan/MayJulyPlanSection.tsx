import type { Dictionary, Locale } from "@/content/i18n";
import { getLocalizedPath } from "@/content/i18n";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Flag } from "lucide-react";

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

      <div className="relative w-full max-w-2xl px-4 py-8 sm:px-6 sm:py-12">
        {dictionary.sections.map((section) => (
          <section key={section.heading} className="w-full">
            <div className="mb-8 text-center sm:mb-10">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white shadow-sm ring-1 ring-zinc-200/50">
                <Flag className="h-5 w-5 text-zinc-900" />
              </div>
              <h2 className="text-2xl font-bold tracking-tight text-zinc-900 sm:text-3xl">
                {section.heading}
              </h2>
            </div>

            <div className="space-y-3 sm:space-y-4">
              {section.items.map((item, idx) => (
                <div
                  key={idx}
                  className="group relative overflow-hidden rounded-2xl bg-white shadow-[0_2px_8px_-4px_rgba(0,0,0,0.02)] ring-1 ring-zinc-200/50 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_24px_-8px_rgba(0,0,0,0.08)] hover:ring-zinc-300"
                >
                  <div className="absolute -right-4 -top-6 select-none text-[100px] font-black leading-none text-zinc-50 transition-transform duration-500 group-hover:scale-110 group-hover:text-zinc-100">
                    {idx + 1}
                  </div>

                  <div className="relative z-10 flex items-start gap-3 p-4 sm:gap-4 sm:p-5">
                    <div className="mt-0.5 flex shrink-0">
                      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#F3F1EC] text-sm font-bold text-zinc-500 transition-all duration-300 group-hover:scale-110 group-hover:bg-zinc-900 group-hover:text-white sm:h-10 sm:w-10 sm:text-base">
                        {idx + 1}
                      </div>
                    </div>
                    <p className="text-[14px] leading-relaxed text-zinc-700 sm:text-[15px]">
                      {item}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
