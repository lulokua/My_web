# 目录结构说明

## 1. 目录树

```text
My_web/
  docs/
    development-guide.md
    project-overview.md
    project-structure.md
  public/
  src/
    app/
      App.tsx
    components/
      layout/
        app-layout/
          AppLayout.tsx
          index.ts
      navigation/
        explore/
          components/
            ExploreMenuItem.tsx
            ExploreMenuPanel.tsx
          ExploreNavigation.tsx
          explore-navigation.data.ts
          index.ts
          types.ts
        site-header/
          SiteHeader.tsx
          index.ts
    pages/
      home/
        components/
          HeroSection.tsx
          HeroSocialLinks.tsx
        home.data.ts
        HomePage.tsx
        index.ts
    shared/
      constants/
        media.ts
      hooks/
        useSmoothScroll.ts
    App.tsx
    Index.tsx
    index.css
    main.tsx
    vite-env.d.ts
  AGENTS.md
  README.md
  eslint.config.mjs
  index.html
  package.json
  postcss.config.mjs
  tsconfig.json
  vite.config.ts
```

## 2. `src/` 分层职责

### `src/app/`

应用级装配层，只放：

- 全局布局组合
- 全局 Hook 注册
- 未来的全局 Provider
- 页面路由或页面装配入口

不要把具体页面区块直接放进 `src/app/`。

### `src/components/`

跨页面复用组件层，只放会被多个页面复用的内容。

#### `src/components/layout/app-layout/`

- `AppLayout.tsx`：应用布局骨架，负责组合顶部栏和页面内容
- `index.ts`：布局模块统一导出入口

#### `src/components/navigation/site-header/`

- `SiteHeader.tsx`：站点顶部栏外壳
- `index.ts`：顶部栏统一导出入口

#### `src/components/navigation/explore/`

这是全局 Explore 菜单模块，内部继续拆分职责：

- `ExploreNavigation.tsx`：菜单开关状态、交互行为、动画容器
- `components/ExploreMenuPanel.tsx`：大面板布局和 Featured 卡片区
- `components/ExploreMenuItem.tsx`：递归渲染菜单项
- `explore-navigation.data.ts`：菜单数据、Featured 卡片数据
- `types.ts`：模块共享类型
- `index.ts`：对外导出入口

### `src/pages/`

页面模块层。每个页面必须有自己的独立目录。

#### `src/pages/home/`

- `HomePage.tsx`：首页组合入口
- `index.ts`：首页模块对外导出入口
- `home.data.ts`：首页自己的静态数据
- `components/HeroSection.tsx`：首页 Hero 区块
- `components/HeroSocialLinks.tsx`：首页社交按钮区块

页面自己的区块、静态数据、局部展示逻辑，都优先留在页面目录里，不要提前提升到全局。

### `src/shared/`

跨页面共享内容层。

#### `src/shared/constants/`

- `media.ts`：全局媒体地址、资源地址、配置常量

#### `src/shared/hooks/`

- `useSmoothScroll.ts`：跨页面复用的平滑滚动 Hook

只要某段逻辑仍然只服务一个页面，就不要放进 `shared/`。

## 3. 兼容入口文件职责

- `src/main.tsx`：浏览器真实启动入口
- `src/App.tsx`：历史兼容入口，只做转发，不写业务
- `src/Index.tsx`：首页兼容入口，只做转发，不写页面内容

这三个文件都不是堆业务逻辑的地方。

## 4. 根目录文件职责

- `README.md`：项目快速说明和文档入口
- `vite.config.ts`：Vite 配置、路径别名、开发日志插件
- `tsconfig.json`：TypeScript 编译配置
- `eslint.config.mjs`：ESLint 规则配置
- `postcss.config.mjs`：PostCSS 配置
- `index.html`：Vite HTML 模板
- `package.json`：依赖和 npm 脚本
- `AGENTS.md`：AI 协作约束

## 5. 文件放置判断规则

新增内容时按下面顺序判断放哪一层：

1. 只服务一个页面：放 `src/pages/<page-name>/`
2. 服务多个页面的可视组件：放 `src/components/`
3. 服务多个页面的 hooks、常量、工具、类型：放 `src/shared/`
4. 只负责应用装配：放 `src/app/`

如果一个文件的用途说不清，通常说明它的位置还没选对。
