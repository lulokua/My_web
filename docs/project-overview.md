# 项目概览

## 1. 项目定位

这是一个基于 `React + TypeScript + Vite + Tailwind CSS` 的落地页项目，当前以首页展示为主，包含全局顶部导航、Explore 展开菜单、首屏视频 Hero 和首页社交入口。

项目目标不是把所有内容堆在一个页面文件里，而是保持：

- 应用级装配集中在 `src/app/`
- 全局复用组件集中在 `src/components/`
- 页面私有内容集中在 `src/pages/`
- 共享 hooks、常量集中在 `src/shared/`

## 2. 当前技术栈

- `React 19`
- `TypeScript 5`
- `Vite 8`
- `Tailwind CSS 4`
- `Framer Motion`
- `Lucide React`
- `Lenis`
- `ESLint`

## 3. 运行入口

- `src/main.tsx`：前端启动入口，挂载 React 根节点
- `src/App.tsx`：根兼容入口，转发到 `src/app/App.tsx`
- `src/app/App.tsx`：应用主装配入口，组合布局、页面和全局 Hook
- `src/Index.tsx`：首页兼容入口，转发到 `src/pages/home`

## 4. 当前页面与模块

### 首页模块

- `src/pages/home/HomePage.tsx`：首页组合入口
- `src/pages/home/components/HeroSection.tsx`：首页首屏视频区块
- `src/pages/home/components/HeroSocialLinks.tsx`：首屏底部社交按钮
- `src/pages/home/home.data.ts`：首页静态数据

### 全局导航模块

- `src/components/navigation/site-header/`：站点顶部栏壳层
- `src/components/navigation/explore/`：Explore 菜单模块
  - `ExploreNavigation.tsx`：Explore 触发和展开状态
  - `components/ExploreMenuPanel.tsx`：展开面板布局
  - `components/ExploreMenuItem.tsx`：递归菜单项
  - `explore-navigation.data.ts`：菜单与卡片数据
  - `types.ts`：模块共享类型

### 全局布局与共享能力

- `src/components/layout/app-layout/`：全局页面骨架
- `src/shared/hooks/useSmoothScroll.ts`：Lenis 平滑滚动 Hook
- `src/shared/constants/media.ts`：全局媒体地址常量

## 5. 文档入口

- `docs/project-overview.md`：项目概览
- `docs/project-structure.md`：目录与文件职责说明
- `docs/development-guide.md`：开发规范和新增文件流程
