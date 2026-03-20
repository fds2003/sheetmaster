# Change: 添加浏览器插件 (Add Browser Extension)

## Why
目前用户如果在 Excel Web 或 Google Sheets 中工作，需要不断切换标签页才能使用 SheetMaster 获取和复制公式。提供浏览器插件能让用户在不离开当前工作环境的前提下直接使用功能，从而极大提升用户体验和生产力。

## What Changes
- 添加一个新的 Chrome 浏览器插件项目，复用现有的核心 Web 逻辑。
- 支持 Popup（弹出窗口）和 Side Panel（侧边栏）两种交互模式，实现快速生成公式。
- 在插件内实现公式导航、交互式公式构建器以及一键复制功能。
- 在插件内直接提供对应的公式常见问题解答 (FAQ) 和错误排查 (Common Errors)。

## Impact
- 影响的 Specs: `browser-extension` (新增)
- 影响的代码: 新增插件目录（例如 `packages/extension` 或 `apps/extension`）；提取 `lib/formulas.ts` 及核心 UI 组件为通用模块。
