# Git 提交规范

本文档用于统一本项目的 Git 提交信息格式，以及说明如何将本地代码提交并推送到 GitHub。

## 提交信息模板

本项目提交信息推荐使用以下格式：

```text
type(scope): 一句话说明本次提交内容

- 变更点 1
- 变更点 2
- 变更点 3
```

## 字段说明

- **type**：本次提交类型，例如 `feat`、`fix`、`docs`、`style`、`refactor`、`chore`
- **scope**：本次修改影响的范围，例如 `navbar`、`search`、`docs`、`config`
- **一句话说明**：用简短中文说明本次提交主要做了什么
- **更新日志列表**：每一行用 `-` 开头，说明具体修改内容

## 常用 type

| type | 说明 |
| --- | --- |
| `feat` | 新增功能 |
| `fix` | 修复问题 |
| `docs` | 文档修改 |
| `style` | 样式或格式调整，不影响逻辑 |
| `refactor` | 代码重构，不新增功能也不修复 bug |
| `chore` | 构建、依赖、配置、脚手架等杂项修改 |

## 提交信息示例

### 新增功能

```text
feat(navbar): 新增顶部搜索框及聚焦时的全局模糊动画效果

- 新建 SearchBox 组件，支持搜索表单提交（暂以 console.log 占位）
- 聚焦输入框时显示 fixed 全屏模糊遮罩（backdrop-blur-md + bg-black/30），淡入淡出 300ms
- 表单使用 relative z-10 保持搜索框自身清晰可见
- 点击遮罩区域时主动 blur 输入框，自然关闭模糊效果
- 引入 shadcn/ui Input 组件、cn 工具函数及配套 Tailwind 主题、CSS 变量
- Navbar 集成 SearchBox 并调整左侧间距
```

### 修复问题

```text
fix(navbar): 修复搜索动画、下拉菜单链接与依赖审计问题

- 修复 SearchBox 打字机占位符与提交日志逻辑，补齐清空按钮和按键脉冲动画
- 新增 ExploreDropdown 真实导航链接，修复 Español 文案与分隔符显示
- 将菜单图片切换为 next/image，并配置 Unsplash 远程图片白名单
- 使用 npm overrides 固定 postcss@8.5.14，消除 Next 内置 postcss 审计告警
- 替换 next lint 为 ESLint flat config，补齐 Next/TypeScript lint 配置
- 修复 Tailwind 插件导入方式，确保 lint、audit 和 build 检查通过
```

### 文档修改

```text
docs(git): 新增 Git 提交规范和 GitHub 推送流程

- 新增提交信息模板，统一 type(scope): 标题格式
- 补充更新日志列表写法，保持每条变更一行
- 记录本地提交、检查和推送到 GitHub 的常用命令
```

## 提交前检查流程

在项目根目录执行以下命令：

```bash
git status --short
npm run lint
npm audit
npm run build
```

- **git status --short**：查看当前有哪些文件被修改
- **npm run lint**：检查代码规范
- **npm audit**：检查依赖漏洞
- **npm run build**：确认生产构建可以通过

如果只是修改文档，可以根据实际情况跳过 `npm run build`。

## 提交到本地 Git

### 1. 查看改动文件

```bash
git status --short
```

### 2. 查看具体差异

```bash
git diff
```

### 3. 暂存需要提交的文件

如果只提交指定文件：

```bash
git add docs/Git提交规范.md
```

如果确认所有改动都属于本次提交：

```bash
git add .
```

### 4. 检查暂存区

```bash
git diff --cached --stat
git diff --cached --check
```

- **git diff --cached --stat**：查看将要提交的文件统计
- **git diff --cached --check**：检查是否有尾随空格等格式问题

### 5. 创建提交

推荐使用模板格式：

```bash
git commit -m "docs(git): 新增 Git 提交规范和 GitHub 推送流程" -m "- 新增提交信息模板，统一 type(scope): 标题格式
- 补充更新日志列表写法，保持每条变更一行
- 记录本地提交、检查和推送到 GitHub 的常用命令"
```

也可以直接执行：

```bash
git commit
```

然后在编辑器中按模板填写多行提交信息。

## 推送到 GitHub

### 1. 确认当前分支

```bash
git branch --show-current
```

### 2. 确认远程仓库

```bash
git remote -v
```

### 3. 推送到 GitHub

如果当前分支是 `main`：

```bash
git push origin main
```

如果当前分支是其他分支，例如 `feature/search-box`：

```bash
git push origin feature/search-box
```

### 4. 推送后确认状态

```bash
git status --short --branch
git log -1 --oneline
```

正常情况下，`git status --short --branch` 应显示本地分支与远端分支同步，没有未提交文件。

## 推荐完整流程

```bash
git status --short
npm run lint
npm audit
npm run build
git add 需要提交的文件
git diff --cached --stat
git diff --cached --check
git commit -m "type(scope): 一句话说明本次提交内容" -m "- 变更点 1
- 变更点 2
- 变更点 3"
git push origin main
git status --short --branch
```

## 注意事项

- **一次提交只做一类事情**：不要把无关修改混在一个提交里
- **提交标题要简短明确**：优先说明结果，而不是描述过程
- **更新日志要具体**：每条说明一个明确变更点
- **提交前先检查**：尽量保证 `lint`、`audit`、`build` 通过
- **不要提交敏感信息**：不要把 API Key、密码、私钥等写入仓库
