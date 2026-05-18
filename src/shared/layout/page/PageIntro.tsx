import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { getLocalizedPath, type Locale } from "@/content/i18n";

type PageIntroProps = {
  locale: Locale;
  backLabel: string;
  title: string;
  subtitle: string;
  backHref?: string;
  align?: "start" | "center";
};

export default function PageIntro({ locale, backLabel, title, subtitle, backHref, align = "start" }: PageIntroProps) {
  const resolvedHref = backHref ? getLocalizedPath(locale, backHref) : getLocalizedPath(locale);

  return (
    <header className="mb-10 flex flex-col items-start gap-4 sm:mb-16 sm:gap-6">
      <Link
        href={resolvedHref}
        className="group flex items-center gap-2 text-xs font-medium text-zinc-500 transition-colors hover:text-zinc-900 sm:text-sm"
      >
        <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
        {backLabel}
      </Link>
      <div className={align === "center" ? "w-full text-center" : ""}>
        <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 sm:text-3xl lg:text-5xl">{title}</h1>
        <p className="mt-3 text-base font-semibold text-zinc-700 sm:mt-4 sm:text-lg">{subtitle}</p>
      </div>
    </header>
  );
}
