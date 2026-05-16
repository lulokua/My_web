import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

import { getDictionary, getLocalizedPath, isLocale, type Locale } from "@/lib/i18n";

type AboutPageProps = {
  params: Promise<{ locale: string }>;
};

async function resolveLocale(params: AboutPageProps["params"]): Promise<Locale> {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  return locale;
}

export async function generateMetadata({ params }: AboutPageProps): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const dictionary = getDictionary(locale);

  return dictionary.about.metadata;
}

export default async function AboutPage({ params }: AboutPageProps) {
  const locale = await resolveLocale(params);
  const dictionary = getDictionary(locale);

  return (
    <div className="min-h-[calc(100dvh-64px)] sm:min-h-[calc(100dvh-84px)] bg-[#F9F8F6] text-zinc-900 flex flex-col items-center justify-center px-4">
      <div className="bg-white rounded-2xl p-8 sm:p-12 ring-1 ring-black/5 shadow-sm text-center max-w-md w-full">
        <Image
          src="https://avatars.githubusercontent.com/u/237419681?s=48&v=4"
          alt={dictionary.about.name}
          width={100}
          height={100}
          className="rounded-full mx-auto mb-6 bg-zinc-100 ring-1 ring-black/5"
        />
        <h1 className="text-2xl font-bold text-zinc-900 mb-2">
          {dictionary.about.title}
        </h1>
        <p className="text-sm text-zinc-500 font-medium mb-6">
          {dictionary.about.name}
        </p>
        <p className="text-[15px] text-zinc-600 leading-relaxed">
          {dictionary.about.bio}
        </p>
      </div>

      <Link
        href={getLocalizedPath(locale)}
        className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-zinc-500 hover:text-zinc-900 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        {dictionary.about.backHome}
      </Link>
    </div>
  );
}
