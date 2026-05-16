import type { Metadata } from "next";

import VideoSection from "@/sections/video/VideoSection";
import { type LocalePageProps, getLocaleContext } from "@/shared/lib/locale";

export async function generateMetadata({ params }: LocalePageProps): Promise<Metadata> {
  const { dictionary } = await getLocaleContext(params);

  return dictionary.video.metadata;
}

export default async function VideoPage({ params }: LocalePageProps) {
  const { locale, dictionary } = await getLocaleContext(params);

  return <VideoSection locale={locale} dictionary={dictionary.video} />;
}
