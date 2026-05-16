import Image from "next/image";
import Zoom from "react-medium-image-zoom";
import { Clock, MapPin } from "lucide-react";

import type { DailyRecordEntry } from "@/content/i18n";

import "react-medium-image-zoom/dist/styles.css";

type DailyRecordCardProps = {
  entry: DailyRecordEntry;
};

export default function DailyRecordCard({ entry }: DailyRecordCardProps) {
  return (
    <article className="group flex break-inside-avoid flex-col rounded-xl bg-white p-4 shadow-sm ring-1 ring-black/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-black/5 sm:p-5">
      <p className="mb-3 whitespace-pre-wrap text-[15px] font-medium leading-relaxed text-zinc-800">
        {entry.content}
      </p>

      {entry.images && entry.images.length > 0 ? (
        <div className={`mb-4 grid gap-1.5 ${entry.images.length > 1 ? "grid-cols-2" : "grid-cols-1"}`}>
          {entry.images.map((image, index) => (
            <div key={`${entry.id}-${index}`} className="relative w-full overflow-hidden rounded-lg border border-black/5">
              <Zoom zoomMargin={40}>
                <Image
                  src={image}
                  alt={`${entry.author ?? "record"} image ${index + 1}`}
                  width={0}
                  height={0}
                  sizes="100vw"
                  style={{ width: "100%", height: "auto", display: "block" }}
                />
              </Zoom>
            </div>
          ))}
        </div>
      ) : null}

      <div className="mt-auto flex items-center pt-3 text-xs font-medium text-zinc-500 border-t border-black/[0.04]">
        <div className="flex items-center gap-2.5">
          {entry.author && entry.avatar ? (
            <div className="flex items-center gap-1.5">
              <Image
                src={entry.avatar}
                alt={entry.author}
                width={20}
                height={20}
                className="rounded-full bg-zinc-200 ring-1 ring-black/5"
              />
              <span className="text-[11px] text-zinc-600 sm:text-xs">{entry.author}</span>
            </div>
          ) : (
            <div className="flex items-center gap-1 rounded-full bg-zinc-100 px-2 py-0.5 text-[11px] sm:text-xs">
              <Clock className="h-3 w-3" />
              <span>{entry.timeAgo}</span>
            </div>
          )}

          {entry.location ? (
            <div className="flex items-center gap-1 rounded-full bg-zinc-100 px-2 py-0.5 text-[11px] sm:text-xs">
              <MapPin className="h-3 w-3" />
              <span>{entry.location}</span>
            </div>
          ) : null}
        </div>
      </div>
    </article>
  );
}
