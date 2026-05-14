export const locales = ["zh", "us"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "us";

export function isLocale(value: string | undefined): value is Locale {
  return locales.includes(value as Locale);
}

export function getLocalizedPath(locale: Locale, path = "/"): string {
  if (!path || path === "/") {
    return `/${locale}`;
  }

  return `/${locale}${path.startsWith("/") ? path : `/${path}`}`;
}

export const dictionaries = {
  us: {
    htmlLang: "en-US",
    metadata: {
      title: "My Web",
      description: "Built with Next.js + TypeScript + Tailwind CSS",
    },
    nav: {
      explore: "Explore",
      featured: "Featured",
      links: {
        home: "Home",
        webLog: "Web Log",
      },
    },
    search: {
      placeholder: "Search everything about here.",
      clearLabel: "Clear search",
    },
    home: {
      heroLine1: "Born to",
      heroLine2: "Explore.",
    },
    featured: {
      items: [
        {
          title: "A New Week, New Experiences, New Perspectives",
          createdAt: "2026-05-15T19:48:00",
          image: "https://my-blog.cn-nb1.rains3.com/My_web/%20Featured/1.jpg",
        },
      ],
    },
    webLog: {
      metadata: {
        title: "Web Log | My Web",
        description: "GitHub commit log rendered on the server.",
      },
      backHome: "Back to Home",
      title: "Web Log",
      subtitle: "A chronological timeline of updates and improvements to the project.",
      unableToLoad: "Unable to load Web Log",
      authorAvatar: "Author Avatar",
      dateFallback: "Unknown date",
      separator: ".",
    },
  },
  zh: {
    htmlLang: "zh-CN",
    metadata: {
      title: "我的网站",
      description: "使用 Next.js + TypeScript + Tailwind CSS 构建",
    },
    nav: {
      explore: "探索",
      featured: "精选",
      links: {
        home: "首页",
        webLog: "网站日志",
      },
    },
    search: {
      placeholder: "搜索这里的一切。",
      clearLabel: "清空搜索",
    },
    home: {
      heroLine1: "生而",
      heroLine2: "探索。",
    },
    featured: {
      items: [
        {
          title: "新的一周，新的体验，新的感受",
          createdAt: "2026-05-15T19:48:00",
          image: "https://my-blog.cn-nb1.rains3.com/My_web/%20Featured/1.jpg",
        },
      ],
    },
    webLog: {
      metadata: {
        title: "网站日志 | 我的网站",
        description: "在服务器端渲染的 GitHub 提交日志。",
      },
      backHome: "返回首页",
      title: "网站日志",
      subtitle: "按时间顺序记录这个项目的更新与改进。",
      unableToLoad: "无法加载网站日志",
      authorAvatar: "作者头像",
      dateFallback: "未知日期",
      separator: ".",
    },
  },
} as const;

export type Dictionary = (typeof dictionaries)[Locale];

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}
