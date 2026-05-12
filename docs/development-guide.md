# 开发规范

## 1. 目录与职责规范

- `src/app/` 只放应用装配代码
- `src/components/` 只放跨页面复用组件
- `src/pages/<page-name>/` 只放该页面自己的内容
- `src/shared/` 只放跨页面共享 hooks、constants、types、工具函数
- `docs/` 放项目说明、结构文档、开发规范文档

禁止为了临时方便创建语义模糊的文件，例如：

- `utils.ts`
- `common.tsx`
- `temp.ts`
- `test-data.ts`

创建前必须先判断它属于页面、全局组件还是 shared。

## 2. 命名规范

### React 组件

使用 `PascalCase`：

- `HomePage.tsx`
- `HeroSection.tsx`
- `ExploreNavigation.tsx`
- `SiteHeader.tsx`

### 页面目录

使用小写单词或小写短横线：

- `home/`
- `about/`
- `project-detail/`

### 数据文件

- 页面数据：`<page-name>.data.ts`
- 组件模块数据：`<module-name>.data.ts`

例如：

- `home.data.ts`
- `explore-navigation.data.ts`

### 类型文件

统一使用 `types.ts`，只存当前模块需要共享的类型。

### 统一出口

目录对外暴露能力时，使用 `index.ts` 统一导出。

## 3. 导入规范

### 跨模块导入

统一优先使用 `@/` 别名：

```ts
import { AppLayout } from "@/components/layout/app-layout";
import { HomePage } from "@/pages/home";
import { useSmoothScroll } from "@/shared/hooks/useSmoothScroll";
```

### 模块内部导入

同一模块内部优先使用相对路径：

```ts
import { HeroSocialLinks } from "./HeroSocialLinks";
import { heroSocialLinks } from "../home.data";
```

## 4. 新增页面规范

新增页面必须按下面结构创建：

```text
src/pages/about/
  components/
  about.data.ts
  AboutPage.tsx
  index.ts
```

要求：

- `AboutPage.tsx` 只做页面组合
- 页面区块放 `components/`
- 页面静态数据放 `about.data.ts`
- 只有确认会被多个页面复用，才允许提升到 `src/components/`

## 5. 新增全局组件规范

新增全局组件前先确认它是否真的会被多个页面复用。

推荐结构：

```text
src/components/navigation/example-nav/
  ExampleNav.tsx
  example-nav.data.ts
  types.ts
  index.ts
```

规则：

- 展示组件和数据分开
- 类型单独抽离
- 对外统一走 `index.ts`
- 不把复杂模块全部堆进一个 TSX 文件

## 6. 样式规范

- 保持 Tailwind CSS 写法
- 全局基础样式放 `src/index.css`
- 可复用样式类放 `@layer components`
- 字体统一使用 MiSans
- 不额外引入 UI 框架，除非明确有新要求

## 7. 文档规范

- 项目正式文档统一写进 `docs/`
- Markdown 文件名统一使用英文小写短横线
- 文档内容默认使用 UTF-8 编码
- 新增公共模块或新增页面后，要同步更新目录文档和开发规范文档

## 8. Git 提交规范

- 提交信息必须使用中文
- 提交信息要明确描述本次修改内容
- 尽量按功能或模块拆分提交，不要把大量无关改动混在一次提交里

示例：

- `重构全局导航模块并拆分 Explore 菜单组件`
- `整理首页目录结构并补充开发文档`
- `新增 about 页面并补齐页面数据模块`

## 9. 开发完成后的最低检查

每次提交前至少执行：

```bash
npm run lint
npm run build
```

同时确认：

- 新增文件是否放在正确目录
- 是否存在旧路径残留
- 是否补了 `index.ts`
- 是否把页面私有内容误放进了 `shared/`
- 是否更新了 `docs/` 相关文档
