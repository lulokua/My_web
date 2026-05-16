import {
  type Dictionary,
  type FeaturedItem,
  type Locale,
} from "@/content/i18n";
import LanguageSwitcher from "@/features/language-switcher/components/LanguageSwitcher";
import SearchBox from "@/features/search/components/SearchBox";

import ExploreDropdown from "./ExploreDropdown";
import { buildNavbarLinks } from "../lib/navigation";

type NavbarProps = {
  locale: Locale;
  navigation: Dictionary["nav"];
  search: Dictionary["search"];
  featuredItems: FeaturedItem[];
};

export default function Navbar({ locale, navigation, search, featuredItems }: NavbarProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-800 bg-black text-white">
      <div className="flex h-16 w-full items-center justify-between px-4 sm:h-[84px] sm:px-6">
        <div className="flex items-center gap-6 md:gap-10">
          <ExploreDropdown
            label={navigation.explore}
            featuredLabel={navigation.featured}
            featuredItems={featuredItems}
            links={buildNavbarLinks(locale, navigation.links)}
            locale={locale}
          />
          <SearchBox clearLabel={search.clearLabel} placeholder={search.placeholder} />
        </div>
        <div className="flex items-center gap-4">
          <LanguageSwitcher currentLocale={locale} />
        </div>
      </div>
    </header>
  );
}
