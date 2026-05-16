# AGENTS.md

本文件是给 AI 代理和自动化开发工具使用的执行规则。修改本项目时，默认必须遵守以下约束。

## 1. 结构判断

先判断改动属于哪一层，再下手：

- `app/`：只放路由入口、layout、metadata、redirect、api
- `sections/`：页面主体区块
- `features/`：可复用业务模块
- `shared/`：全局复用能力
- `content/`：文案和静态内容

禁止把复杂实现直接写进 `app/*/page.tsx`。

## 2. 新功能落点

### 新页面

必须按这个顺序建：

1. `src/app/[locale]/xxx/page.tsx`
2. `src/sections/xxx/XxxSection.tsx`
3. 若有复用业务逻辑，再拆到 `src/features/xxx/`
4. 文案写入 `src/content/i18n/dictionaries.ts`

### 新公共组件

- 所有页面都可能复用：放 `src/shared/`
- 业务复用：放 `src/features/`
- 只服务单页：放 `src/sections/`

## 3. 命名规则

- 目录：`kebab-case`
- React 组件文件：`PascalCase.tsx`
- 工具文件：语义化英文名
- 源码目录不允许中文名
- 不允许拼音目录和无意义缩写

## 4. 国际化规则

- 所有文案必须走 `src/content/i18n/dictionaries.ts`
- 新增文案必须同时补齐 `zh` 和 `us`
- 站内链接必须使用 `getLocalizedPath(locale, path)`
- 不允许在组件里散落大段中英文条件分支

## 5. 依赖方向

严格遵守：

- `app -> sections -> features -> shared`
- `content` 可被所有层读取

禁止：

- `shared` 引用 `features` 或 `sections`
- `features` 引用 `sections`
- `content` 引用组件

## 6. 页面实现要求

`app/[locale]/*/page.tsx` 应只做这些事：

- 读取 locale
- 读取 dictionary
- 生成 metadata
- 获取必要数据
- 渲染对应 section

不要把动画、卡片、表单、列表实现直接写在 route 文件里。

## 7. 重构优先级

如果发现旧代码不符合当前结构，优先按下面顺序整理：

1. 把页面实现搬出 `app/`
2. 把公共 UI 收敛到 `shared/`
3. 把重复业务逻辑收敛到 `features/`
4. 把文案收口到 `content/`
5. 删除无用旧文件和旧 import

## 8. 提交前最低验证

每次改动后至少执行：

```bash
npm run lint
npm run build
```

如果改动涉及导航、国际化或页面结构，还要额外检查：

- `/us`
- `/zh`
- `/us/web-log`
- `/zh/web-log`

## 9. 本项目当前约定

- 默认语言前缀：`/us`
- 中文语言前缀：`/zh`
- 顶部栏属于全站公共导航功能：`features/navigation`
- 搜索、语言切换、导航下拉属于 feature
- 首页、关于页、日志页等主体内容属于 section
