"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { type Locale } from "@/content/i18n";
import { Button } from "@/shared/ui/button";

type LanguageSwitcherProps = {
  currentLocale: Locale;
};

export default function LanguageSwitcher({ currentLocale }: LanguageSwitcherProps) {
  const pathname = usePathname();
  const targetLocale = currentLocale === "zh" ? "us" : "zh";

  const getTargetUrl = () => {
    if (!pathname) {
      return `/${targetLocale}`;
    }

    const segments = pathname.split("/");

    if (segments.length > 1 && (segments[1] === "us" || segments[1] === "zh")) {
      segments[1] = targetLocale;
      return segments.join("/");
    }

    return `/${targetLocale}${pathname}`;
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      asChild
      className="text-white/80 hover:bg-white/10 hover:text-white"
    >
      <Link
        href={getTargetUrl()}
        scroll={false}
        aria-label={currentLocale === "zh" ? "Switch to English" : "切换到中文"}
        title={currentLocale === "zh" ? "Switch to English" : "切换到中文"}
      >
        <span className="text-sm font-medium">{currentLocale === "zh" ? "EN" : "中"}</span>
      </Link>
    </Button>
  );
}
