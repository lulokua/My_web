import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { getDictionary, isLocale, type Locale } from "@/lib/i18n";
import CoreClient from "./CoreClient";

type CorePageProps = {
  params: Promise<{ locale: string }>;
};

async function resolveLocale(params: CorePageProps["params"]): Promise<Locale> {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  return locale;
}

export async function generateMetadata({ params }: CorePageProps): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const dictionary = getDictionary(locale);

  return dictionary.core.metadata;
}

export default async function CorePage({ params }: CorePageProps) {
  const locale = await resolveLocale(params);
  const dictionary = getDictionary(locale);

  return (
    <CoreClient locale={locale} dictionary={dictionary.core} />
  );
}
