import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import { getDictionary, getLocalizedPath, isLocale, type Locale } from "@/lib/i18n";

type WebsitePageProps = {
  params: Promise<{ locale: string }>;
};

async function resolveLocale(params: WebsitePageProps["params"]): Promise<Locale> {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  return locale;
}

export async function generateMetadata({ params }: WebsitePageProps): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const dictionary = getDictionary(locale);

  return dictionary.website.metadata;
}

export default async function WebsitePage({ params }: WebsitePageProps) {
  const locale = await resolveLocale(params);
  const dictionary = getDictionary(locale);

  return (
    <div className="min-h-[calc(100dvh-64px)] sm:min-h-[calc(100dvh-84px)] bg-[#F3F1EC] text-zinc-900 selection:bg-black/10">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 py-12 sm:py-20 lg:py-32">
        <header className="mb-10 sm:mb-16 flex flex-col items-start gap-4 sm:gap-6">
          <Link
            href={getLocalizedPath(locale)}
            className="group flex items-center gap-2 text-xs sm:text-sm font-medium text-zinc-500 transition-colors hover:text-zinc-900"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            {dictionary.website.backHome}
          </Link>
          <div>
            <h1 className="text-2xl sm:text-3xl lg:text-5xl font-semibold tracking-tight text-zinc-900">
              {dictionary.website.title}
            </h1>
            <p className="mt-3 sm:mt-4 text-sm sm:text-base text-zinc-500">
              {dictionary.website.subtitle}
            </p>
          </div>
        </header>

        <div className="rounded-2xl bg-white p-6 sm:p-8 ring-1 ring-black/5">
          <p className="text-sm sm:text-base text-zinc-600 leading-relaxed">
            {locale === "zh"
              ? "这里将展示与网站相关的信息与资源。"
              : "This is where website-related information and resources will be presented."}
          </p>
        </div>
      </div>
    </div>
  );
}
