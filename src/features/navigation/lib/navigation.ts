import { getLocalizedPath, type Dictionary, type Locale } from "@/content/i18n";

export type NavLink = {
  key: string;
  label: string;
  href: string;
  separator?: boolean;
};

export function buildNavbarLinks(locale: Locale, labels: Dictionary["nav"]["links"]): NavLink[] {
  return [
    {
      key: "home",
      label: labels.home,
      href: getLocalizedPath(locale),
    },
    {
      key: "daily-record",
      label: labels.dailyRecord,
      href: getLocalizedPath(locale, "/daily-record"),
    },
    {
      key: "photo",
      label: labels.photo,
      href: getLocalizedPath(locale, "/photo"),
    },
    {
      key: "video",
      label: labels.video,
      href: getLocalizedPath(locale, "/video"),
    },
    {
      key: "about",
      label: labels.aboutMe,
      href: getLocalizedPath(locale, "/about"),
    },
    {
      key: "core",
      label: labels.core,
      href: getLocalizedPath(locale, "/core"),
      separator: true,
    },
    {
      key: "web-log",
      label: labels.webLog,
      href: getLocalizedPath(locale, "/web-log"),
    },
  ];
}
