import type { Metadata } from "next";

import AboutSection from "@/sections/about/AboutSection";
import { type LocalePageProps, getLocaleContext } from "@/shared/lib/locale";

export async function generateMetadata({ params }: LocalePageProps): Promise<Metadata> {
  const { dictionary } = await getLocaleContext(params);

  return dictionary.about.metadata;
}

export default async function AboutPage({ params }: LocalePageProps) {
  const { locale, dictionary } = await getLocaleContext(params);

  return <AboutSection locale={locale} dictionary={dictionary.about} />;
}
