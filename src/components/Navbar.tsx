import Link from "next/link";

import SearchBox from "@/components/SearchBox";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-800 bg-black text-white">
      <div className="flex w-full h-[84px] items-center justify-between px-4 sm:px-6">
        {/* Logo/Brand */}
        <div className="flex items-center gap-6 md:gap-10">
          <Link href="/" className="flex items-center space-x-2">
            <span className="inline-block font-bold text-xl text-white">
              Explore
            </span>
          </Link>
          <SearchBox />
        </div>
      </div>
    </header>
  );
}
