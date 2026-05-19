import type { Locale } from "./config";

export type FeaturedItem = {
  title: string;
  createdAt: string;
  image: string;
};

export type DailyRecordEntry = {
  id: number;
  date: string;
  timeAgo: string;
  author?: string;
  avatar?: string;
  location?: string;
  content: string;
  images?: string[];
};

export type Dictionary = {
  htmlLang: string;
  metadata: {
    title: string;
    description: string;
  };
  nav: {
    explore: string;
    featured: string;
    links: {
      home: string;
      dailyRecord: string;
      photo: string;
      video: string;
      plan: string;
      aboutMe: string;
      core: string;
      webLog: string;
      website: string;
    };
  };
  search: {
    placeholder: string;
    clearLabel: string;
  };
  home: {
    metadata: {
      title: string;
      description: string;
    };
    heroLine1: string;
    heroLine2: string;
  };
  featured: {
    items: FeaturedItem[];
  };
  dailyRecord: {
    metadata: {
      title: string;
      description: string;
    };
    title: string;
    subtitle: string;
    headerAlt: string;
    entries: DailyRecordEntry[];
  };
  core: {
    metadata: {
      title: string;
      description: string;
    };
    badge: string;
    productName: string;
    heroDescription: string;
    scrollHint: string;
    performance: {
      title: string;
      leadBefore: string;
      highlight: string;
      leadAfter: string;
      body: string;
    };
    architecture: {
      title: string;
      cards: Array<{
        title: string;
        body: string;
      }>;
    };
    native: {
      titleLine1: string;
      titleLine2: string;
      body: string;
    };
    developerExperience: {
      title: string;
      leadBefore: string;
      highlight: string;
      leadAfter: string;
      body: string;
    };
    security: {
      title: string;
      body: string;
    };
    design: {
      title: string;
      body: string;
    };
    accessibility: {
      titleLine1: string;
      titleLine2: string;
      body: string;
    };
    finalTitle: string;
    disclaimer: string;
  };
  about: {
    metadata: {
      title: string;
      description: string;
    };
    backHome: string;
    title: string;
    subtitle?: string;
    headerAlt: string;
    name: string;
    bio?: string;
    avatar: string;
    sections: {
      introduction: {
        title: string;
        content: string[];
      };
      educations: {
        title: string;
        items: Array<{
          school: string;
          duration: string;
        }>;
      };
      experiences: {
        title: string;
        items: Array<{
          content: string;
        }>;
      };
      publications: {
        title: string;
        description: string;
        items: Array<{
          title: string;
          venueAndYear: string;
          abstractLabel: string;
          abstract: string;
          linkText: string;
          linkUrl: string;
        }>;
      };
      dreamCompany: {
        title: string;
        company: string;
        nativeName?: string;
        description: string;
        goal: string;
      };
    };
  };
  plan: {
    metadata: {
      title: string;
      description: string;
    };
    backHome: string;
    title: string;
    subtitle: string;
    year: string;
    yearExpanded: string;
    mayJuly: {
      metadata: {
        title: string;
        description: string;
      };
      backLabel: string;
      title: string;
      subtitle: string;
      sections: {
        heading: string;
        items: string[];
      }[];
    };
  };
  website: {
    metadata: {
      title: string;
      description: string;
    };
    backHome: string;
    title: string;
    subtitle: string;
    body: string;
  };
  photo: {
    metadata: {
      title: string;
      description: string;
    };
    backHome: string;
    title: string;
    subtitle: string;
    empty: string;
  };
  video: {
    metadata: {
      title: string;
      description: string;
    };
    backHome: string;
    title: string;
    subtitle: string;
    empty: string;
  };
  webLog: {
    metadata: {
      title: string;
      description: string;
    };
    backHome: string;
    title: string;
    subtitle: string;
    unableToLoad: string;
    authorAvatar: string;
    dateFallback: string;
    separator: string;
  };
};

export const dictionaries: Record<Locale, Dictionary> = {
  us: {
    htmlLang: "en-US",
    metadata: {
      title: "My Web",
      description: "Built with Next.js, TypeScript, and Tailwind CSS.",
    },
    nav: {
      explore: "Explore",
      featured: "Featured",
      links: {
        home: "Home",
        dailyRecord: "Daily Record",
        photo: "Photo",
        video: "Video",
        plan: "Plan",
        aboutMe: "About Me",
        core: "Website Core",
        webLog: "Web Log",
        website: "Website",
      },
    },
    search: {
      placeholder: "Search everything here.",
      clearLabel: "Clear search",
    },
    home: {
      metadata: {
        title: "Home | My Web",
        description: "Personal website home page.",
      },
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
      subtitle: "Small moments, quietly archived.",
      headerAlt: "Daily Record Header",
      entries: [
        {
          id: 1,
          date: "2026-05-15",
          timeAgo: "Just now",
          author: "lokua",
          avatar: "https://q.qlogo.cn/headimg_dl?dst_uin=1639622785&spec=640&img_type=jpg",
          location: "Pingnan",
          content: "The website is finally getting ready for release.",
        },
        {
          id: 2,
          date: "2026-05-14",
          timeAgo: "1 day ago",
          author: "lokua",
          avatar: "https://q.qlogo.cn/headimg_dl?dst_uin=1639622785&spec=640&img_type=jpg",
          location: "Pingnan",
          content: "Feeling a little emo today.",
          images: ["https://my-blog.cn-nb1.rains3.com/My_web/%20Featured/1.jpg"],
        },
      ],
    },
    core: {
      metadata: {
        title: "Website Core | My Web",
        description: "The core ideas and pillars of this site.",
      },
      badge: "Newly Released",
      productName: "Hyper Core",
      heroDescription: "Self-developed Next.js architecture. Reimagine everything.",
      scrollHint: "Scroll to explore",
      performance: {
        title: "Lightning Fast.",
        leadBefore: "Compared to traditional Next.js, rendering performance increased by ",
        highlight: "15%",
        leadAfter: ".",
        body: "A custom scheduling strategy and optimized streaming flow make every page load feel closer to a native application.",
      },
      architecture: {
        title: "Pro Architecture",
        cards: [
          {
            title: "Smart Preloading",
            body: "Predict user behavior and prepare resources before the click happens, so navigation feels instant.",
          },
          {
            title: "Edge Computing",
            body: "Push core request handling closer to the user and keep response latency consistently low.",
          },
        ],
      },
      native: {
        titleLine1: "Infinitely close to",
        titleLine2: "Native Feel.",
        body: "A rewritten scrolling engine combined with motion-driven interactions gives each swipe and click real weight.",
      },
      developerExperience: {
        title: "Ultimate DX.",
        leadBefore: "Write less, ",
        highlight: "do more",
        leadAfter: ".",
        body: "Fast feedback loops, clear error states, and composable infrastructure make complex pages easier to ship.",
      },
      security: {
        title: "Military-grade Security",
        body: "A safer data flow, defensive defaults, and end-to-end protection keep the platform resilient as it grows.",
      },
      design: {
        title: "Pixel Perfect.",
        body: "A meticulous design system where every component, color, and spacing is thoughtfully crafted for visual harmony.",
      },
      accessibility: {
        titleLine1: "Design for",
        titleLine2: "Everyone.",
        body: "Built-in screen reader support, keyboard navigation, and high contrast modes ensure a seamless experience for all users.",
      },
      finalTitle: "This is Hyper Core.",
      disclaimer: "Content is for entertainment purposes only.",
    },
    about: {
      metadata: {
        title: "About Me | My Web",
        description: "A little bit about the person behind this site.",
      },
      backHome: "Back to Home",
      title: "About Me",
      headerAlt: "About Me Header",
      name: "Andi Lu",
      avatar: "https://q.qlogo.cn/headimg_dl?dst_uin=1639622785&spec=640&img_type=jpg",
      sections: {
        introduction: {
          title: "Introduction",
          content: [
            "My research mainly focuses on natural language processing and code intelligence to enable computers to intelligently process, understand and generate both natural language and programming language. The long-term research goal is to develop artificial general intelligence to revolutionize the way computers interact with humans and handle complex tasks.",
            "My research areas currently include: (1) Large Language Model; (2) Full-Stack Developer;"
          ]
        },
        educations: {
          title: "Educations",
          items: [
            {
              school: "Jiangbin High School in Pingnan, Guigang, Guangxi",
              duration: "2025-2027"
            }
          ]
        },
        experiences: {
          title: "Experiences",
          items: [
            {
              content: "(1). On September 23, 2024, I published my first paper, “Technology for Watermelon Ripeness Assessment Based on Machine Vision.”"
            },
            {
              content: "(2). In September 2025, I launched my first website, WarmPrompt, and shared it on Douyin at the same time. By March 23, 2026, the video had reached 3.659 million views, with over 170,000 likes, 29,000 saves, and 16,000 comments. On February 10, 2026, I released the first official version of WarmPrompt, which was built with Next.js."
            }
          ]
        },
        publications: {
          title: "Publications",
          description: "Below you can find highlighted publications and the full list of my publications.",
          items: [
            {
              title: "Watermelon Maturity Assessment Technology Based on Machine Vision",
              venueAndYear: "Arxiv · 2024",
              abstractLabel: "Abstract: ",
              abstract: "Use computer vision and deep learning methods to determine whether a watermelon is ripe. The core idea is to use a pre-trained VGG16 model to extract features from watermelon images, and then apply techniques such as Data Augmentation, Dropout, and L2 Regularization to mitigate overfitting caused by small-sample training.",
              linkText: "📄 Read Paper →",
              linkUrl: "https://blog.lokua.top/2024/09/23/watermelon-maturity-assessment/"
            }
          ]
        },
        dreamCompany: {
          title: "Dream Company",
          company: "Xiaomi",
          nativeName: "Xiaomi (小米)",
          description: "In the future, I hope to join Xiaomi and contribute to building amazing products.",
          goal: "✨ Goal: Looking forward to participating in Large Language Model (LLM) R&D / 期待参加大模型研发。"
        }
      }
    },
    plan: {
      metadata: {
        title: "Plan | My Web",
        description: "Plans and goals for this year.",
      },
      backHome: "Back to Home",
      title: "Plan",
      subtitle: "To reach the places I’ve long dreamed of,\nand meet the people I’ve long held in my heart.",
      year: "2026",
      yearExpanded: "May - July",
      mayJuly: {
        metadata: {
          title: "May - July Plan | My Web",
          description: "Detailed plan for May to July 2026.",
        },
        backLabel: "Back to Plan",
        title: "May - July",
        subtitle: "Theme: No Compromises.",
        sections: [
          {
            heading: "Action Plan",
            items: [
              "Lose 10 kg (approx. 22 lbs).",
              "Memorize 200 vocabulary words (including sentences).",
              "Review all Pinyin.",
              "Review all phonetic symbols.",
              "Start reviewing Math, Chinese, Chemistry, and Physics: Review each subject starting from the first year of high school. Study at least 5 units per subject, and ensure the generalization and integration of past knowledge.",
            ],
          },
        ],
      },
    },
    website: {
      metadata: {
        title: "Website | My Web",
        description: "Website-related information and resources.",
      },
      backHome: "Back to Home",
      title: "Website",
      subtitle: "How this project is built and maintained.",
      body: "This section is reserved for architecture notes, infrastructure details, and future operational records for the site.",
    },
    photo: {
      metadata: {
        title: "Photo | My Web",
        description: "A gallery of photos.",
      },
      backHome: "Back to Home",
      title: "Photo",
      subtitle: "Moments captured in frames.",
      empty: "No photos yet.",
    },
    video: {
      metadata: {
        title: "Video | My Web",
        description: "A collection of videos.",
      },
      backHome: "Back to Home",
      title: "Video",
      subtitle: "Stories told in motion.",
      empty: "No videos yet.",
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
      separator: "·",
    },
  },
  zh: {
    htmlLang: "zh-CN",
    metadata: {
      title: "我的网站",
      description: "使用 Next.js、TypeScript 和 Tailwind CSS 构建。",
    },
    nav: {
      explore: "探索",
      featured: "精选",
      links: {
        home: "首页",
        dailyRecord: "日常记录",
        photo: "照片",
        video: "视频",
        plan: "计划",
        aboutMe: "关于我",
        core: "网站核心",
        webLog: "网站日志",
        website: "网站",
      },
    },
    search: {
      placeholder: "搜索这里的一切。",
      clearLabel: "清空搜索",
    },
    home: {
      metadata: {
        title: "首页 | 我的网站",
        description: "个人网站首页。",
      },
      heroLine1: "生而为",
      heroLine2: "探索",
    },
    featured: {
      items: [
        {
          title: "新的一周，新的体验，新的视角",
          createdAt: "2026-05-15T19:48:00",
          image: "https://my-blog.cn-nb1.rains3.com/My_web/%20Featured/1.jpg",
        },
      ],
    },
    dailyRecord: {
      metadata: {
        title: "日常记录 | 我的网站",
        description: "记录日常想法与生活片段。",
      },
      title: "日常记录",
      subtitle: "把细碎生活认真归档。",
      headerAlt: "日常记录头图",
      entries: [
        {
          id: 1,
          date: "2026-05-15",
          timeAgo: "刚刚",
          author: "lokua",
          avatar: "https://q.qlogo.cn/headimg_dl?dst_uin=1639622785&spec=640&img_type=jpg",
          location: "平南",
          content: "网站终于快准备发布了。",
        },
        {
          id: 2,
          date: "2026-05-14",
          timeAgo: "昨天",
          author: "lokua",
          avatar: "https://q.qlogo.cn/headimg_dl?dst_uin=1639622785&spec=640&img_type=jpg",
          location: "平南",
          content: "今天有点 emo。",
          images: ["https://my-blog.cn-nb1.rains3.com/My_web/%20Featured/1.jpg"],
        },
      ],
    },
    core: {
      metadata: {
        title: "网站核心 | 我的网站",
        description: "这个网站背后的核心理念与技术支撑。",
      },
      badge: "全新发布",
      productName: "Hyper Core",
      heroDescription: "自研 Next.js 架构，重新想象网站体验。",
      scrollHint: "向下滚动探索",
      performance: {
        title: "快如闪电",
        leadBefore: "相比传统 Next.js，渲染性能提升高达 ",
        highlight: "15%",
        leadAfter: "",
        body: "通过自定义调度策略和优化后的流式渲染，让每一次页面加载都更接近原生应用的顺滑体验。",
      },
      architecture: {
        title: "专业级架构",
        cards: [
          {
            title: "智能预加载",
            body: "在用户点击前预判访问路径并提前准备资源，让页面切换几乎无感。",
          },
          {
            title: "边缘计算增强",
            body: "将核心请求处理推向更靠近用户的位置，在全球范围内保持更低延迟。",
          },
        ],
      },
      native: {
        titleLine1: "无限接近",
        titleLine2: "原生手感",
        body: "重写滚动引擎并结合具有物理感的动效系统，让每次滑动和点击都更有重量感。",
      },
      developerExperience: {
        title: "极致开发体验",
        leadBefore: "写得更少，",
        highlight: "做得更多",
        leadAfter: "。",
        body: "更快的反馈、更清晰的错误提示，以及可组合的基础设施，让复杂页面也能稳定迭代。",
      },
      security: {
        title: "企业级安全",
        body: "更稳健的数据流、更安全的默认配置和端到端保护机制，为后续扩展保留安全边界。",
      },
      design: {
        title: "像素级打磨",
        body: "经过深思熟虑的设计系统，每一个组件、色彩与间距都为视觉和谐而生。",
      },
      accessibility: {
        titleLine1: "为所有人",
        titleLine2: "设计",
        body: "内置屏幕阅读器支持、纯键盘导航与高对比度模式，确保每位用户都能获得无缝体验。",
      },
      finalTitle: "这就是 Hyper Core。",
      disclaimer: "内容仅供娱乐",
    },
    about: {
      metadata: {
        title: "关于我 | 我的网站",
        description: "关于这个网站背后的人。",
      },
      backHome: "返回首页",
      title: "关于我",
      headerAlt: "关于我头图",
      name: "吕桉迪",
      avatar: "https://q.qlogo.cn/headimg_dl?dst_uin=1639622785&spec=640&img_type=jpg",
      sections: {
        introduction: {
          title: "简介",
          content: [
            "我的研究主要集中在自然语言处理和代码智能，使计算机能够智能地处理、理解和生成自然语言和编程语言。长期研究目标是开发通用人工智能，以彻底改变计算机与人交互和处理复杂任务的方式。",
            "我目前的研究领域包括：(1) 大语言模型；(2) 全栈开发；"
          ]
        },
        educations: {
          title: "教育经历",
          items: [
            {
              school: "广西贵港市平南县江南中学",
              duration: "2025-2027"
            }
          ]
        },
        experiences: {
          title: "个人经历",
          items: [
            {
              content: "(1). 2024 年 9 月 23 日，我发表了第一篇论文《基于机器视觉的西瓜成熟度评估技术》。"
            },
            {
              content: "(2). 2025 年 9 月，我上线了第一个网站 WarmPrompt，并同步在抖音分享。截至 2026 年 3 月 23 日，视频播放量达到 365.9 万，点赞超 17 万，收藏 2.9 万，评论 1.6 万。2026 年 2 月 10 日，我发布了由 Next.js 构建的 WarmPrompt 首个正式版本。"
            }
          ]
        },
        publications: {
          title: "出版物",
          description: "以下是我的部分精选及完整出版物列表。",
          items: [
            {
              title: "基于机器视觉的西瓜成熟度评估技术",
              venueAndYear: "Arxiv · 2024",
              abstractLabel: "摘要：",
              abstract: "利用计算机视觉和深度学习方法来判断西瓜是否成熟。核心思想是使用预训练的 VGG16 模型提取西瓜图像的特征，然后应用数据增强、Dropout 和 L2 正则化等技术来减轻由小样本训练引起的过拟合。",
              linkText: "📄 阅读论文 →",
              linkUrl: "https://blog.lokua.top/2024/09/23/watermelon-maturity-assessment/"
            }
          ]
        },
        dreamCompany: {
          title: "梦想公司",
          company: "Xiaomi",
          nativeName: "小米",
          description: "在未来，我希望能加入小米，为打造令人惊叹的产品贡献力量。",
          goal: "✨ 目标：期待参加大模型研发 / Looking forward to participating in Large Language Model (LLM) R&D。"
        }
      }
    },
    plan: {
      metadata: {
        title: "计划 | 我的网站",
        description: "今年的计划与目标。",
      },
      backHome: "返回首页",
      title: "计划",
      subtitle: "去想去的地方，去见想见的人！",
      year: "2026",
      yearExpanded: "五月 - 七月",
      mayJuly: {
        metadata: {
          title: "五月 - 七月计划 | 我的网站",
          description: "2026 年 5 月到 7 月的详细计划。",
        },
        backLabel: "返回计划",
        title: "五月 - 七月",
        subtitle: "主题：不将就",
        sections: [
          {
            heading: "行动计划",
            items: [
              "减肥 20 斤。",
              "背 200 个单词（包含语句）。",
              "全部拼音复习。",
              "全部音标复习。",
              "开始复习数学、语文、化学、物理：要求每个科目都在高一开始重新复习，每个科目至少要学习 5 个单元，并且做到泛化回以前的知识。",
            ],
          },
        ],
      },
    },
    website: {
      metadata: {
        title: "网站 | 我的网站",
        description: "与网站本身相关的信息与资料。",
      },
      backHome: "返回首页",
      title: "网站",
      subtitle: "记录这个项目如何构建、如何维护。",
      body: "这里将逐步沉淀网站的架构说明、基础设施信息，以及后续的维护与演进记录。",
    },
    photo: {
      metadata: {
        title: "照片 | 我的网站",
        description: "照片集。",
      },
      backHome: "返回首页",
      title: "照片",
      subtitle: "定格每一个瞬间。",
      empty: "暂时还没有照片。",
    },
    video: {
      metadata: {
        title: "视频 | 我的网站",
        description: "视频合集。",
      },
      backHome: "返回首页",
      title: "视频",
      subtitle: "用影像讲述故事。",
      empty: "暂时还没有视频。",
    },
    webLog: {
      metadata: {
        title: "网站日志 | 我的网站",
        description: "在服务端渲染的 GitHub 提交日志。",
      },
      backHome: "返回首页",
      title: "网站日志",
      subtitle: "按时间顺序记录这个项目的更新与改进。",
      unableToLoad: "无法加载网站日志",
      authorAvatar: "作者头像",
      dateFallback: "未知日期",
      separator: "·",
    },
  },
};

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}
