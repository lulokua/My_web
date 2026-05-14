"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronDown, Bookmark } from "lucide-react";

import type { Locale } from "@/lib/i18n";

type ExploreLink = {
  label: string;
  href: string;
  active?: boolean;
};

type FeaturedItem = {
  title: string;
  createdAt: string;
  image: string;
};

type ExploreDropdownProps = {
  label: string;
  featuredLabel: string;
  featuredItems: readonly FeaturedItem[];
  links: readonly ExploreLink[];
  locale: Locale;
};

function pluralizeEnglish(value: number, unit: string): string {
  return `${value} ${unit}${value === 1 ? "" : "s"} ago`;
}

function formatTimeAgo(date: Date, locale: Locale): string {
  const now = new Date();
  const diffMs = Math.max(0, now.getTime() - date.getTime());
  const seconds = Math.floor(diffMs / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);

  if (locale === "zh") {
    if (seconds < 60) return "刚刚";
    if (minutes < 60) return `${minutes} 分钟前`;
    if (hours < 24) return `${hours} 小时前`;
    if (days < 7) return `${days} 天前`;
    if (weeks < 4) return `${weeks} 周前`;
    if (months < 12) return `${months} 个月前`;
    return `${years} 年前`;
  }

  if (seconds < 60) return "Just now";
  if (minutes < 60) return pluralizeEnglish(minutes, "minute");
  if (hours < 24) return pluralizeEnglish(hours, "hour");
  if (days < 7) return pluralizeEnglish(days, "day");
  if (weeks < 4) return pluralizeEnglish(weeks, "week");
  if (months < 12) return pluralizeEnglish(months, "month");
  return pluralizeEnglish(years, "year");
}

export default function ExploreDropdown({
  label,
  featuredLabel,
  featuredItems,
  links,
  locale,
}: ExploreDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set());
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    document.addEventListener("mousedown", handleClickOutside);
    
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="flex items-center" ref={dropdownRef}>
      <button
        onClick={() => {
          setIsOpen(!isOpen);
        }}
        className="flex items-center space-x-2 focus:outline-none group"
      >
        <span className="inline-block font-bold text-xl text-white group-hover:text-gray-300 transition-colors">
          {label}
        </span>
        <ChevronDown
          className={`w-5 h-5 text-white transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      <div
        className={`absolute left-0 top-16 sm:top-[84px] w-full bg-black shadow-2xl z-50 h-[calc(100dvh-64px)] sm:h-[calc(100dvh-84px)] overflow-y-auto transition-all duration-500 ease-in-out ${
          isOpen
            ? "opacity-100 visible translate-y-0 border-t border-gray-800"
            : "opacity-0 invisible -translate-y-4 border-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row py-6 sm:py-8 px-4 sm:px-6 lg:px-8 gap-8 md:gap-12">
          <div className="md:w-1/4 flex flex-col space-y-3 sm:space-y-4">
            {links.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`text-sm sm:text-base font-medium text-white hover:text-gray-300 w-fit ${
                  link.active ? "border-b-2 border-dotted border-white pb-0.5" : ""
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="md:w-3/4 flex flex-col">
            <h3 className="text-xs font-bold tracking-wider text-gray-400 mb-6 uppercase">
              {featuredLabel}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
              {featuredItems.map((item, index) => (
                <div key={index} className="flex flex-col group cursor-pointer">
                  <div className="relative w-full aspect-[16/9] sm:aspect-[4/3] overflow-hidden mb-3 sm:mb-4 rounded-sm bg-gray-900">
                    {!loadedImages.has(index) && (
                      <div className="absolute inset-0 overflow-hidden">
                        <div className="absolute inset-0 bg-gray-800" />
                        <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800" />
                      </div>
                    )}
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="(min-width: 768px) 25vw, 100vw"
                      onLoad={() => setLoadedImages((prev) => new Set(prev).add(index))}
                      className={`object-cover group-hover:scale-105 transition-all duration-500 ${
                        loadedImages.has(index) ? "opacity-100" : "opacity-0"
                      }`}
                    />
                  </div>
                  <div className="text-xs font-bold text-gray-400 mb-2 tracking-widest uppercase flex gap-4">
                    <span>{formatTimeAgo(new Date(item.createdAt), locale)}</span>
                  </div>
                  <h4 className="text-base sm:text-lg font-bold text-white group-hover:underline mb-2 sm:mb-4">
                    {item.title}
                  </h4>
                  <div className="mt-auto flex items-center text-xs text-gray-400 tracking-wider font-bold">
                    <Bookmark className="w-4 h-4 mr-2" />
                    <span className="uppercase">{formatTimeAgo(new Date(item.createdAt), locale)}</span>
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
