import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { MapPin, Clock } from "lucide-react";
import ScrollToTopButton from "@/components/ScrollToTopButton";

import { getDictionary, isLocale, type Locale } from "@/lib/i18n";
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

type DailyRecordPageProps = {
  params: Promise<{ locale: string }>;
};

async function resolveLocale(params: DailyRecordPageProps["params"]): Promise<Locale> {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  return locale;
}

export async function generateMetadata({ params }: DailyRecordPageProps): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const dictionary = getDictionary(locale);

  return dictionary.dailyRecord.metadata;
}

export default async function DailyRecordPage({ params }: DailyRecordPageProps) {
  const locale = await resolveLocale(params);
  const dictionary = getDictionary(locale);

  return (
    <div className="min-h-[calc(100dvh-64px)] sm:min-h-[calc(100dvh-84px)] bg-[#F9F8F6] text-zinc-900 selection:bg-black/10 flex flex-col">
      <header className="relative w-full aspect-[21/9] md:aspect-[3/1] lg:aspect-[4/1] mb-8 sm:mb-12 shrink-0">
        <Image
          src="https://my-blog.cn-nb1.rains3.com/My_web/index2.png"
          alt="Daily Record Header"
          fill
          className="object-cover"
          priority
        />
      </header>

      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 pb-8 sm:pb-12 flex-1">
        {/* Masonry-like grid layout */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-5 space-y-5">
          {dictionary.dailyRecord.entries.map((entry) => (
            <div
              key={entry.id}
              className="group break-inside-avoid bg-white rounded-xl p-4 sm:p-5 ring-1 ring-black/5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-black/5 flex flex-col"
            >
              {/* Content text */}
              <p className="whitespace-pre-wrap text-[15px] text-zinc-800 font-medium leading-relaxed mb-3">
                {entry.content}
              </p>

              {/* Images */}
              {"images" in entry && entry.images && entry.images.length > 0 && (
                <div className={`grid gap-1.5 mb-4 ${entry.images.length > 1 ? 'grid-cols-2' : 'grid-cols-1'}`}>
                  {entry.images.map((img: string, idx: number) => (
                    <div key={idx} className="relative w-full rounded-lg overflow-hidden border border-black/5">
                      <Zoom zoomMargin={40}>
                        <Image
                          src={img}
                          alt={`Image ${idx + 1}`}
                          width={0}
                          height={0}
                          sizes="100vw"
                          style={{ width: '100%', height: 'auto', display: 'block' }}
                        />
                      </Zoom>
                    </div>
                  ))}
                </div>
              )}

              {/* Bottom bar */}
              <div className="mt-auto pt-3 border-t border-black/[0.04] flex items-center text-xs font-medium text-zinc-500">
                <div className="flex items-center gap-2.5">
                  {/* Avatar / Time info */}
                  {entry.author && entry.avatar ? (
                    <div className="flex items-center gap-1.5">
                      <Image
                        src={entry.avatar}
                        alt={entry.author}
                        width={20}
                        height={20}
                        className="rounded-full bg-zinc-200 ring-1 ring-black/5"
                      />
                      <span className="text-zinc-600 text-[11px] sm:text-xs">{entry.author}</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1 bg-zinc-100 px-2 py-0.5 rounded-full text-[11px] sm:text-xs">
                      <Clock className="w-3 h-3" />
                      <span>{entry.timeAgo}</span>
                    </div>
                  )}

                  {/* Location */}
                  {entry.location && (
                    <div className="flex items-center gap-1 bg-zinc-100 px-2 py-0.5 rounded-full text-[11px] sm:text-xs">
                      <MapPin className="w-3 h-3" />
                      <span>{entry.location}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      <ScrollToTopButton />
    </div>
  );
}
