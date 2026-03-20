## Context (背景)
SheetMaster 是一个成熟的 Web 端公式生成工具。为了提高用户留存和效率，我们决定增加 Google Chrome 浏览器插件，让用户可以在活跃表格（Google Sheets 或 Excel Web）中，通过 Popup (弹窗) 或 Side Panel (侧边栏) 直接查阅、生成以及排查公式。

## Goals / Non-Goals (目标与非目标)
- **Goals (目标):**
  - 提供离线可用的纯前端公式生成，体验与 Web 端保持完全一致。
  - 支持 Chrome 的 Side Panel API，实现常驻使用。
  - 最大化 Next.js Web 项目与插件端代码的复用率。
- **Non-Goals (非目标):**
  - 自动向用户的表格内注入读写数据操作的 Content Script（延后至第二阶段实现）。
  - 用户账号系统与历史记录的云端同步（MVP 仅支持本地存储）。

## Decisions (决策)
- **决策**: 采用 Monorepo 架构（如果没有的话）或抽离公共代码的方式，共享 `lib/formulas.ts` 业务逻辑和 React UI 组件。
- **曾考虑的替代方案**: 将代码直接复制一份到插件目录——但因后续维护成本过高而被否决。
- **决策**: 插件强制使用 React 和 Tailwind CSS 进行开发，保证两端 100% 的视觉统一性。
- **决策**: 同时支持 Browser Action (Popup) 和 Side Panel。Side Panel 更贴合重度表格用户的办公习惯。

## Risks / Trade-offs (风险与权衡)
- **风险**: 为宽屏（Web）设计的 UI 组件在 400px 宽的侧边栏中可能产生拥挤或错位变形。
  - **缓解措施**: 重构部分 UI 组件，使其采用响应式设计，优先针对 `<400px` 宽度进行调试。
- **风险**: 引入插件的编译环节可能增加现有的 CI/CD 复杂度。
  - **缓解措施**: 保持插件的独立构建链路，初期使用手动打包发布至 Chrome Web Store 的方式。

## Migration Plan (迁移计划)
1. 重构 Web 应用的目录，将业务逻辑与通用组件彻底解耦。
2. 回归测试 Web 端各项功能是否正常。
3. 引入 Extension 应用并链接所有通用依赖包。

## Open Questions (待确认问题)
- 应该使用 Plasmo 还是自定义 Vite 配合 CRXJS？目前偏向于推荐使用 Plasmo，因为它对 React + Tailwind Chrome 插件的生态支持最为完善。
