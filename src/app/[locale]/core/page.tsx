import type { Metadata } from "next";

import CoreExperience from "@/sections/core/CoreExperience";
import { type LocalePageProps, getLocaleContext } from "@/shared/lib/locale";

export async function generateMetadata({ params }: LocalePageProps): Promise<Metadata> {
  const { dictionary } = await getLocaleContext(params);

  return dictionary.core.metadata;
}

export default async function CorePage({ params }: LocalePageProps) {
  const { dictionary } = await getLocaleContext(params);

  return <CoreExperience dictionary={dictionary.core} />;
}
