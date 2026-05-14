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
        dailyRecord: "Daily Record",
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
    dailyRecord: {
      metadata: {
        title: "Daily Record | My Web",
        description: "A record of daily thoughts and moments.",
      },
      title: "Daily Record",
      subtitle: "Capturing the little things in life.",
      topText: "Share life anytime, anywhere",
      aboutMe: "About Me",
      backHome: "Back to Home",
      entries: [
        {
          id: 1,
          date: "2026-05-15",
          timeAgo: "Just now",
          author: "lokua",
          avatar: "https://avatars.githubusercontent.com/u/237419681?s=48&v=4",
          location: "Pingnan",
          content: "The website is finally getting ready for release!!!",
        },
        {
          id: 2,
          date: "2026-05-14",
          timeAgo: "1 day ago",
          author: "lokua",
          avatar: "https://avatars.githubusercontent.com/u/237419681?s=48&v=4",
          location: "Pingnan",
          content: "Feeling emo.",
          images: ["https://my-blog.cn-nb1.rains3.com/My_web/%20Featured/1.jpg"],
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
        dailyRecord: "日常记录",
        webLog: "网站日志",
      },
    },
    search: {
      placeholder: "搜索这里的一切。",
      clearLabel: "清空搜索",
    },
    home: {
      heroLine1: "生而",
      heroLine2: "探索",
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
    dailyRecord: {
      metadata: {
        title: "日常记录 | 我的网站",
        description: "日常想法与生活瞬间的记录。",
      },
      title: "即刻短文",
      subtitle: "咸鱼的日常生活。",
      topText: "随时随地，分享生活",
      aboutMe: "关于我",
      backHome: "返回首页",
      entries: [
        {
          id: 1,
          date: "2026-05-15",
          timeAgo: "刚刚",
          author: "lokua",
          avatar: "https://avatars.githubusercontent.com/u/237419681?s=48&v=4",
          location: "平南",
          content: "网站准备开发完成啦！！！",
        },
        {
          id: 2,
          date: "2026-05-14",
          timeAgo: "昨天",
          author: "lokua",
          avatar: "https://avatars.githubusercontent.com/u/237419681?s=48&v=4",
          location: "平南",
          content: "emo中",
          images: ["https://my-blog.cn-nb1.rains3.com/My_web/%20Featured/1.jpg"],
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
