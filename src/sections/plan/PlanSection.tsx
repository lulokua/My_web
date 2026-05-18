"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, ChevronRight } from "lucide-react";

import { getLocalizedPath, type Dictionary, type Locale } from "@/content/i18n";

type PlanSectionProps = {
  locale: Locale;
  dictionary: Dictionary["plan"];
};

export default function PlanSection({ locale, dictionary }: PlanSectionProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="min-h-[calc(100dvh-64px)] bg-[#F3F1EC] text-zinc-900 selection:bg-black/10 sm:min-h-[calc(100dvh-84px)]">
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-20 lg:py-32">
        <header className="mb-10 flex flex-col items-center gap-4 sm:mb-16 sm:gap-6">
          <div className="text-center">
            <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 sm:text-3xl lg:text-5xl">{dictionary.title}</h1>
            <p className="mt-3 text-sm text-zinc-500 sm:mt-4 sm:text-base">{dictionary.subtitle}</p>
          </div>
        </header>

        <div className="overflow-hidden rounded-2xl bg-white ring-1 ring-black/5">
          <button
            type="button"
            onClick={() => setIsOpen((prev) => !prev)}
            className="flex w-full items-center justify-between px-6 py-5 text-left transition-colors hover:bg-zinc-50 sm:px-8 sm:py-6"
          >
            <span className="text-lg font-semibold text-zinc-900 sm:text-xl">{dictionary.year}</span>
            <ChevronDown
              className={`h-5 w-5 text-zinc-400 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
            />
          </button>

          <div
            className={`grid transition-all duration-300 ease-in-out ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
          >
            <div className="overflow-hidden">
              <div className="border-t border-zinc-100 py-2">
                <Link
                  href={getLocalizedPath(locale, "/plan/2026/may-july")}
                  className="group flex w-full items-center justify-between px-6 py-3 transition-colors hover:bg-zinc-50 sm:px-8 sm:py-4"
                >
                  <span className="text-base font-semibold text-zinc-900 sm:text-lg">
                    {dictionary.yearExpanded}
                  </span>
                  <ChevronRight className="h-5 w-5 text-zinc-400 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
