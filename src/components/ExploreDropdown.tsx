"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronDown, Bookmark } from "lucide-react";

const links = [
  { label: "Home", href: "/" },
  { label: "Missions", href: "https://www.nasa.gov/missions/" },
  { label: "Humans in Space", href: "https://www.nasa.gov/humans-in-space/" },
  { label: "Earth", href: "https://www.nasa.gov/earth/" },
  { label: "The Solar System", href: "https://science.nasa.gov/solar-system/" },
  { label: "The Universe", href: "https://science.nasa.gov/universe/" },
  { label: "Science", href: "https://science.nasa.gov/" },
  { label: "Aeronautics", href: "https://www.nasa.gov/aeronautics/" },
  { label: "Technology", href: "https://www.nasa.gov/technology/" },
  { label: "Learning Resources", href: "https://www.nasa.gov/learning-resources/" },
  { label: "About NASA", href: "https://www.nasa.gov/about/" },
  { label: "Español", href: "https://www.nasa.gov/es/" }
];

const featuredItems = [
  {
    title: "NASA's Perseverance Rover Snaps Selfie in Mars' Western Frontier",
    readTime: "6 MIN READ",
    type: "ARTICLE",
    timeAgo: "3 HOURS AGO",
    image: "https://images.unsplash.com/photo-1614728263952-84ea256f9679?q=80&w=600&auto=format&fit=crop"
  },
  {
    title: "NASA Pushes Next-Gen Mars Helicopter Rotor Blades Past Mach 1",
    readTime: "6 MIN READ",
    type: "ARTICLE",
    timeAgo: "5 DAYS AGO",
    image: "https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?q=80&w=600&auto=format&fit=crop"
  },
  {
    title: "What's Up: May 2026 Skywatching Tips from NASA",
    readTime: "3 MIN READ",
    type: "ARTICLE",
    timeAgo: "2 WEEKS AGO",
    image: "https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?q=80&w=600&auto=format&fit=crop"
  }
];

export default function ExploreDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex items-center" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 focus:outline-none group"
      >
        <span className="inline-block font-bold text-xl text-white group-hover:text-gray-300 transition-colors">
          Explore
        </span>
        <ChevronDown
          className={`w-5 h-5 text-white transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Mega Menu Dropdown */}
      <div
        className={`absolute left-0 top-[84px] w-full bg-black shadow-2xl z-50 h-[calc(100vh-84px)] overflow-y-auto transition-all duration-500 ease-in-out ${
          isOpen
            ? "opacity-100 visible translate-y-0 border-t border-gray-800"
            : "opacity-0 invisible -translate-y-4 border-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row py-8 px-4 sm:px-6 lg:px-8 gap-12">

            {/* Sidebar Links */}
            <div className="md:w-1/4 flex flex-col space-y-4">
              {links.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`text-base font-medium text-white hover:text-gray-300 w-fit ${
                    link.label === "Home" ? "border-b-2 border-dotted border-white pb-0.5" : ""
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Featured Section */}
            <div className="md:w-3/4 flex flex-col">
              <h3 className="text-xs font-bold tracking-wider text-gray-400 mb-6 uppercase">
                Featured
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {featuredItems.map((item, index) => (
                  <div key={index} className="flex flex-col group cursor-pointer">
                    <div className="relative w-full aspect-square md:aspect-[4/3] overflow-hidden mb-4">
                      {/* External image optimization is configured in next.config.ts */}
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        sizes="(min-width: 768px) 25vw, 100vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="text-xs font-bold text-gray-400 mb-2 tracking-widest uppercase flex gap-4">
                      <span>{item.readTime}</span>
                    </div>
                    <h4 className="text-lg font-bold text-white group-hover:underline mb-4">
                      {item.title}
                    </h4>
                    <div className="mt-auto flex items-center text-xs text-gray-400 tracking-wider font-bold">
                      <Bookmark className="w-4 h-4 mr-2" />
                      <span className="uppercase">{item.type}</span>
                      <span className="mx-2">•</span>
                      <span className="uppercase">{item.timeAgo}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
    </div>
  );
}
