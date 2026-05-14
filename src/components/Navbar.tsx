import SearchBox from "@/components/SearchBox";
import ExploreDropdown from "@/components/ExploreDropdown";
import { getDictionary, getLocalizedPath, type Locale } from "@/lib/i18n";

type NavbarProps = {
  locale: Locale;
};

export default function Navbar({ locale }: NavbarProps) {
  const dictionary = getDictionary(locale);
  const links = [
    {
      label: dictionary.nav.links.home,
      href: getLocalizedPath(locale),
      active: true,
    },
    {
      label: dictionary.nav.links.webLog,
      href: getLocalizedPath(locale, "/web-log"),
      active: false,
    },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-800 bg-black text-white relative">
      <div className="flex w-full h-16 sm:h-[84px] items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-6 md:gap-10">
          <ExploreDropdown
            label={dictionary.nav.explore}
            featuredLabel={dictionary.nav.featured}
            featuredItems={dictionary.featured.items}
            links={links}
            locale={locale}
          />
          <SearchBox
            clearLabel={dictionary.search.clearLabel}
            placeholder={dictionary.search.placeholder}
          />
        </div>
      </div>
    </header>
  );
}
