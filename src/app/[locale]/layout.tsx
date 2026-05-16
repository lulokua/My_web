import { locales } from "@/content/i18n";
import Navbar from "@/features/navigation/components/Navbar";
import { getLocaleContext } from "@/shared/lib/locale";

type LocaleLayoutProps = Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale, dictionary } = await getLocaleContext(params);

  return (
    <div lang={dictionary.htmlLang} className="flex min-h-screen flex-col">
      <Navbar
        locale={locale}
        navigation={dictionary.nav}
        search={dictionary.search}
        featuredItems={dictionary.featured.items}
      />
      <main className="flex-1">{children}</main>
    </div>
  );
}
