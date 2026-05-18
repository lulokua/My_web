import type { Metadata } from "next";

import MayJulyPlanSection from "@/sections/plan/MayJulyPlanSection";
import { type LocalePageProps, getLocaleContext } from "@/shared/lib/locale";

export async function generateMetadata({ params }: LocalePageProps): Promise<Metadata> {
  const { dictionary } = await getLocaleContext(params);

  return dictionary.plan.mayJuly.metadata;
}

export default async function MayJulyPlanPage({ params }: LocalePageProps) {
  const { locale, dictionary } = await getLocaleContext(params);

  return <MayJulyPlanSection locale={locale} dictionary={dictionary.plan.mayJuly} />;
}
