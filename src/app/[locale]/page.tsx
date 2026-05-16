import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { getDictionary, isLocale, type Locale } from "@/lib/i18n";

type HomePageProps = {
  params: Promise<{ locale: string }>;
};

async function resolveLocale(params: HomePageProps["params"]): Promise<Locale> {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  return locale;
}

export async function generateMetadata({ params }: HomePageProps): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const dictionary = getDictionary(locale);

  return dictionary.metadata;
}

export default async function Home({ params }: HomePageProps) {
  const locale = await resolveLocale(params);
  const dictionary = getDictionary(locale);

  return (
    <div className="relative w-full bg-black">
      <div
        className="flex h-[calc(100dvh-64px)] sm:h-[calc(100dvh-84px)] w-full items-center justify-center bg-cover bg-center bg-no-repeat px-6 bg-[url('https://my-blog.cn-nb1.rains3.com/My_web/index_phone.png')] sm:bg-[url('https://my-blog.cn-nb1.rains3.com/My_web/index.png')]"
      >
        <h1 className="flex flex-col sm:flex-row items-center gap-2 sm:gap-1 md:gap-8 font-anthropic text-4xl sm:text-6xl md:text-8xl text-white tracking-widest drop-shadow-2xl text-center">
          <span>{dictionary.home.heroLine1}</span>
          <span>{dictionary.home.heroLine2}</span>
        </h1>
      </div>
    </div>
  );
}
