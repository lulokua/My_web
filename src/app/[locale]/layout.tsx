import { notFound } from "next/navigation";

import Navbar from "@/components/Navbar";
import { getDictionary, isLocale, locales } from "@/lib/i18n";

type LocaleLayoutProps = Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const dictionary = getDictionary(locale);

  return (
    <div lang={dictionary.htmlLang} className="flex min-h-screen flex-col">
      <Navbar locale={locale} />
      <main className="flex-1">{children}</main>
    </div>
  );
}
