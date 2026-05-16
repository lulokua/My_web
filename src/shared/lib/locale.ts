import { notFound } from "next/navigation";

import { getDictionary, isLocale, type Dictionary, type Locale } from "@/content/i18n";

export type LocaleRouteParams = Promise<{ locale: string }>;

export type LocalePageProps = {
  params: LocaleRouteParams;
};

export async function resolveLocale(params: LocaleRouteParams): Promise<Locale> {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  return locale;
}

export async function getLocaleContext(
  params: LocaleRouteParams,
): Promise<{ locale: Locale; dictionary: Dictionary }> {
  const locale = await resolveLocale(params);

  return {
    locale,
    dictionary: getDictionary(locale),
  };
}
