import type { Metadata } from "next";

import PlanSection from "@/sections/plan/PlanSection";
import { type LocalePageProps, getLocaleContext } from "@/shared/lib/locale";

export async function generateMetadata({ params }: LocalePageProps): Promise<Metadata> {
  const { dictionary } = await getLocaleContext(params);

  return dictionary.plan.metadata;
}

export default async function PlanPage({ params }: LocalePageProps) {
  const { locale, dictionary } = await getLocaleContext(params);

  return <PlanSection locale={locale} dictionary={dictionary.plan} />;
}
