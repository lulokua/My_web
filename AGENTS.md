# Project Notes

This is a React + TypeScript + Vite + Tailwind CSS landing page.

- App entry: `src/main.tsx`
- App composition: `src/app/App.tsx`
- Root compatibility entry: `src/App.tsx`
- Home page compatibility entry: `src/Index.tsx`
- Page modules: `src/pages/`
- Global reusable components: `src/components/`
- Shared hooks/constants: `src/shared/`


开发要求：
1、网站的字体如果没有要求，统一使用，我下面的字体
英文:https://my-blog.cn-nb1.rains3.com/my-blog-fonts/MiSans-Bold.woff2
https://my-blog.cn-nb1.rains3.com/my-blog-fonts/MiSans-Regular.woff2
中文:https://my-blog.cn-nb1.rains3.com/my-blog-fonts/MiSans-Demibold.woff2
https://my-blog.cn-nb1.rains3.com/my-blog-fonts/MiSans-Light.woff2

2、项目目录必须按职责分层，不要把所有页面、导航、数据和工具逻辑全部摊在一个文件里。后续开发优先遵守下面结构：

```text
src/
  app/                  # 应用级组合：全局布局、全局 hook/provider、路由入口组合
  components/           # 跨页面复用组件
    layout/             # 全局布局外壳，例如 AppLayout
    navigation/         # 全局导航，例如 ExploreNavigation
  pages/                # 页面模块，每个页面一个独立文件夹
    home/               # 首页模块
      components/       # 只服务首页的组件区块
      home.data.ts      # 首页专属数据
      HomePage.tsx      # 首页组合入口
  shared/               # 不属于某个页面的共享内容
    constants/          # 全局常量、媒体地址、配置值
    hooks/              # 全局复用 hooks
```

3、文件夹职责要求：
- `src/app/` 只放应用级装配代码，例如 `App.tsx`、全局 provider、全局 layout 组合，不放具体页面区块。
- `src/components/` 只放多个页面都会用到的通用组件。像顶部导航、Explore 菜单、全站布局这类全局内容都放这里。
- `src/pages/<page-name>/` 放单个页面自己的内容。页面内部区块放 `components/`，页面数据放 `<page-name>.data.ts`。
- `src/shared/` 放跨页面复用的 hooks、constants、工具函数和类型。不要把只服务某一个页面的东西放进 `shared`。
- `src/Index.tsx` 只作为首页兼容入口，后续不要继续把首页内容堆在这里。

4、命名规则：
- React 组件文件使用 PascalCase，例如 `HomePage.tsx`、`HeroSection.tsx`、`ExploreNavigation.tsx`。
- 页面文件夹使用小写短横线或单词小写，例如 `home/`、`about/`、`project-detail/`。
- 页面专属数据文件使用 `<page-name>.data.ts`，例如 `home.data.ts`。
- 类型文件使用 `types.ts`，只放当前模块需要公开或共享的 TypeScript 类型。
- 文件夹内如需对外导出组件，使用 `index.ts` 做统一出口，例如 `components/navigation/explore/index.ts`。

5、新增页面时的要求：
- 新页面必须创建 `src/pages/<page-name>/`，并提供 `<PageName>Page.tsx` 作为页面入口。
- 页面自己的 section、card、panel 等组件放在该页面的 `components/` 目录。
- 页面自己的静态数据、菜单数据、卡片数据放在该页面的 `.data.ts` 文件。
- 只有确认会被多个页面复用的组件，才提升到 `src/components/`。
- 只有确认跨页面复用的 hook、常量、工具函数，才提升到 `src/shared/`。

6、全局导航和 Explore 菜单要求：
- Explore 属于全局导航模块，放在 `src/components/navigation/explore/`。
- Explore 的 UI 组件、数据、类型要分开存放，不要全部写在一个 TSX 文件里。
- 如果以后 Explore 菜单项、Featured 卡片、路由入口变多，优先改对应 `.data.ts`，不要直接在 JSX 里堆数组。

7、代码组织要求：
- 单个 TSX 文件尽量保持单一职责。页面入口负责组合，组件文件负责展示，数据文件负责数据。
- 不要在页面入口里直接写大量图标数组、卡片数组、导航数组；这些应放到 `.data.ts`。
- 不要为了临时方便创建杂乱的 `utils.ts`、`common.tsx`。必须先判断它属于页面、组件模块还是 shared。
- 保持现有 Tailwind CSS 写法，不新增额外 UI 框架，除非用户明确要求。

8、Git提交到Github要求：
- Git提交信息时必须使用中文描述
- 要严格遵守Git显示方便用户查看
- 要写清楚每次的Git提交修改了什么
