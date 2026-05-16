import Image from "next/image";

import type { Dictionary } from "@/content/i18n";
import DailyRecordCard from "@/features/daily-record/components/DailyRecordCard";
import ScrollToTopButton from "@/shared/ui/ScrollToTopButton";

type DailyRecordSectionProps = {
  dictionary: Dictionary["dailyRecord"];
};

export default function DailyRecordSection({ dictionary }: DailyRecordSectionProps) {
  return (
    <div className="flex min-h-[calc(100dvh-64px)] flex-col bg-[#F9F8F6] text-zinc-900 selection:bg-black/10 sm:min-h-[calc(100dvh-84px)]">
      <header className="relative mb-8 aspect-[21/9] w-full shrink-0 md:aspect-[3/1] lg:aspect-[4/1] sm:mb-12">
        <Image
          src="https://my-blog.cn-nb1.rains3.com/My_web/index2.png"
          alt={dictionary.headerAlt}
          fill
          className="object-cover"
          priority
        />
      </header>

      <div className="mx-auto w-full max-w-6xl flex-1 px-4 pb-8 sm:px-6 sm:pb-12">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 sm:text-3xl">{dictionary.title}</h1>
          <p className="mt-2 text-sm text-zinc-500 sm:text-base">{dictionary.subtitle}</p>
        </div>

        <div className="columns-1 gap-5 space-y-5 sm:columns-2 lg:columns-3">
          {dictionary.entries.map((entry) => (
            <DailyRecordCard key={entry.id} entry={entry} />
          ))}
        </div>
      </div>

      <ScrollToTopButton />
    </div>
  );
}
