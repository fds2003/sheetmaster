# 变更建议：增强 SEO 结构与公式交互性

## 变更原因 (Why)
当前的公式页面缺乏丰富搜索结果所需的 Schema Markup（如 "HowTo" 步骤）。此外，通用的公式构建器虽然功能正常，但缺乏留住用户（特别是针对 VLOOKUP 等复杂公式）所需的视觉吸引力和引导性。这些改进直接支持增长策略，旨在增加自然流量和用户停留时间。

## 变更内容 (What Changes)
- **SEO Schema**：根据 `richContent` 或结构化数据，为公式页面实现动态的 `HowTo` 和 `FAQPage` schema。
- **交互式 UI**：为关键公式（VLOOKUP, IF, XLOOKUP, REGEX）引入专门的“向导”界面，提供视觉提示（如表格网格预览），而不仅仅是文本输入。
- **内容结构**：确保公式配置支持用于生成 Schema 的丰富元数据。

## 影响范围 (Impact)
- **涉及规范**：`seo`, `formulas`
- **涉及代码**：`components/JsonLd.tsx`, `lib/formulas.ts` (schema), `components/InteractiveFormulaBuilder.tsx` (新组件), `app/formulas/[slug]/page.tsx`
