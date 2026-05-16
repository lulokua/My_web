import type { Metadata } from "next";

import { getCommits } from "@/features/commits/lib/commits";
import WebLogSection from "@/sections/web-log/WebLogSection";
import { type LocalePageProps, getLocaleContext } from "@/shared/lib/locale";

export async function generateMetadata({ params }: LocalePageProps): Promise<Metadata> {
  const { dictionary } = await getLocaleContext(params);

  return dictionary.webLog.metadata;
}

export default async function WebLogPage({ params }: LocalePageProps) {
  const { locale, dictionary } = await getLocaleContext(params);
  const { commits, error } = await getCommits();

  return <WebLogSection locale={locale} dictionary={dictionary.webLog} commits={commits} error={error} />;
}
