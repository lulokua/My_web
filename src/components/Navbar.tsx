import Link from "next/link";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-800 bg-black text-white">
      <div className="container mx-auto flex h-[84px] items-center justify-between px-4 sm:px-8">
        {/* Logo/Brand */}
        <div className="flex gap-6 md:gap-10">
          <Link href="/" className="flex items-center space-x-2">
            <span className="inline-block font-bold text-xl text-white">
              Explore
            </span>
          </Link>
        </div>

        {/* Right side actions */}
        <div className="flex flex-1 items-center justify-end gap-4">
          <nav className="flex items-center gap-2">
            <Link 
              href="/login" 
              className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white transition-colors"
            >
              登录
            </Link>
            <Link 
              href="/signup" 
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors shadow-sm"
            >
              注册
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
