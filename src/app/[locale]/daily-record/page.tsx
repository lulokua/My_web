import type { Metadata } from "next";

import DailyRecordSection from "@/sections/daily-record/DailyRecordSection";
import { type LocalePageProps, getLocaleContext } from "@/shared/lib/locale";

export async function generateMetadata({ params }: LocalePageProps): Promise<Metadata> {
  const { dictionary } = await getLocaleContext(params);

  return dictionary.dailyRecord.metadata;
}

export default async function DailyRecordPage({ params }: LocalePageProps) {
  const { dictionary } = await getLocaleContext(params);

  return <DailyRecordSection dictionary={dictionary.dailyRecord} />;
}
