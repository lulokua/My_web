import type { Metadata } from "next";

import HomeHero from "@/sections/home/HomeHero";
import { type LocalePageProps, getLocaleContext } from "@/shared/lib/locale";

export async function generateMetadata({ params }: LocalePageProps): Promise<Metadata> {
  const { dictionary } = await getLocaleContext(params);

  return dictionary.home.metadata;
}

export default async function HomePage({ params }: LocalePageProps) {
  const { dictionary } = await getLocaleContext(params);

  return <HomeHero dictionary={dictionary.home} />;
}
