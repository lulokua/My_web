import type { Metadata } from "next";

import PhotoSection from "@/sections/photo/PhotoSection";
import { type LocalePageProps, getLocaleContext } from "@/shared/lib/locale";

export async function generateMetadata({ params }: LocalePageProps): Promise<Metadata> {
  const { dictionary } = await getLocaleContext(params);

  return dictionary.photo.metadata;
}

export default async function PhotoPage({ params }: LocalePageProps) {
  const { locale, dictionary } = await getLocaleContext(params);

  return <PhotoSection locale={locale} dictionary={dictionary.photo} />;
}
