"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bookmark, ChevronDown } from "lucide-react";
import { useLenis } from "lenis/react";

import type { FeaturedItem, Locale } from "@/content/i18n";

import { formatRelativeTime } from "../lib/formatRelativeTime";
import type { NavLink } from "../lib/navigation";

type ExploreDropdownProps = {
  label: string;
  featuredLabel: string;
  featuredItems: readonly FeaturedItem[];
  links: readonly NavLink[];
  locale: Locale;
};

function isActiveLink(pathname: string, href: string) {
  if (pathname === href) {
    return true;
  }

  const isLocaleHome = href.split("/").length === 2;

  if (isLocaleHome) {
    return false;
  }

  return pathname.startsWith(`${href}/`);
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
  const lenis = useLenis();
  const pathname = usePathname() ?? "";

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      lenis?.stop();
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    } else {
      lenis?.start();
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, lenis]);

  return (
    <div className="flex items-center" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen((current) => !current)}
        className="group flex items-center space-x-2 focus:outline-none"
      >
        <span className="inline-block text-xl font-bold text-white transition-colors group-hover:text-gray-300">
          {label}
        </span>
        <ChevronDown
          className={`h-5 w-5 text-white transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      <div
        data-lenis-prevent="true"
        className={`absolute left-0 top-16 z-50 h-[calc(100dvh-64px)] w-full overflow-y-auto bg-black shadow-2xl transition-all duration-500 ease-in-out sm:top-[84px] sm:h-[calc(100dvh-84px)] ${
          isOpen
            ? "visible translate-y-0 border-t border-gray-800 opacity-100"
            : "invisible -translate-y-4 border-transparent opacity-0"
        }`}
      >
        <div className="mx-auto flex max-w-7xl flex-col gap-8 px-4 py-6 sm:px-6 sm:py-8 lg:px-8 md:flex-row md:gap-12">
          <div className="flex flex-col space-y-3 md:w-1/4 sm:space-y-4">
            {links.map((link) => {
              const active = isActiveLink(pathname, link.href);

              return (
                <div key={link.key} className="flex flex-col">
                  {link.separator ? (
                    <div className="mb-3 w-full border-t border-dashed border-gray-700 sm:mb-4" />
                  ) : null}
                  <Link
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`w-fit text-sm font-medium text-white hover:text-gray-300 sm:text-base ${
                      active ? "border-b-2 border-dotted border-white pb-0.5" : ""
                    }`}
                  >
                    {link.label}
                  </Link>
                </div>
              );
            })}
          </div>

          <div className="flex flex-col md:w-3/4">
            <h3 className="mb-6 text-xs font-bold tracking-wider text-gray-400 uppercase">{featuredLabel}</h3>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 md:grid-cols-3">
              {featuredItems.map((item, index) => (
                <div key={`${item.title}-${index}`} className="group flex cursor-pointer flex-col">
                  <div className="relative mb-3 aspect-[16/9] w-full overflow-hidden rounded-sm bg-gray-900 sm:mb-4 sm:aspect-[4/3]">
                    {!loadedImages.has(index) ? (
                      <div className="absolute inset-0 overflow-hidden">
                        <div className="absolute inset-0 bg-gray-800" />
                        <div className="animate-shimmer absolute inset-0 bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800" />
                      </div>
                    ) : null}
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="(min-width: 768px) 25vw, 100vw"
                      onLoad={() =>
                        setLoadedImages((prev) => {
                          const next = new Set(prev);
                          next.add(index);
                          return next;
                        })
                      }
                      className={`object-cover transition-all duration-500 group-hover:scale-105 ${
                        loadedImages.has(index) ? "opacity-100" : "opacity-0"
                      }`}
                    />
                  </div>
                  <div className="mb-2 flex gap-4 text-xs font-bold tracking-widest text-gray-400 uppercase">
                    <span>{formatRelativeTime(new Date(item.createdAt), locale)}</span>
                  </div>
                  <h4 className="mb-2 text-base font-bold text-white group-hover:underline sm:mb-4 sm:text-lg">
                    {item.title}
                  </h4>
                  <div className="mt-auto flex items-center text-xs font-bold tracking-wider text-gray-400">
                    <Bookmark className="mr-2 h-4 w-4" />
                    <span className="uppercase">{formatRelativeTime(new Date(item.createdAt), locale)}</span>
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
