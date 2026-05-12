import SearchBox from "@/components/SearchBox";
import ExploreDropdown from "@/components/ExploreDropdown";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-800 bg-black text-white relative">
      <div className="flex w-full h-[84px] items-center justify-between px-4 sm:px-6">
        {/* Logo/Brand */}
        <div className="flex items-center gap-6 md:gap-10">
          <ExploreDropdown />
          <SearchBox />
        </div>
      </div>
    </header>
  );
}
