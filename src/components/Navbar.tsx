import Link from "next/link";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-800 bg-black text-white">
      <div className="container mx-auto flex h-[84px] items-center justify-between px-2 sm:px-4">
        {/* Logo/Brand */}
        <div className="flex gap-6 md:gap-10">
          <Link href="/" className="flex items-center space-x-2">
            <span className="inline-block font-bold text-xl text-white">
              Explore
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
}
