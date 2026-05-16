import type { Locale } from "@/content/i18n";

function pluralizeEnglish(value: number, unit: string): string {
  return `${value} ${unit}${value === 1 ? "" : "s"} ago`;
}

export function formatRelativeTime(date: Date, locale: Locale): string {
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
