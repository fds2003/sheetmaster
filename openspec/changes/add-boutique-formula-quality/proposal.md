# Change: Add boutique formula page quality (unique Meta, OG=Meta, Hero 10 FAQ, Common Errors block)

## Why
执行/精品化与核心页整合方案要求：每个公式页须具备独有 Meta、独有 FAQ、独有错误排查（Common Errors）；公式页 OG/Twitter 描述须与 metaDescription 一致，避免全站分享文案雷同；Hero 10 公式须有公式特有问题（非通用「什么是 X」）。当前仅核心 5 个公式有深度定制 Meta/FAQ，且公式页 OG 描述仍用通用句，无统一 Common Errors 区块。

## What Changes
1. **公式页唯一 Meta**：每个公式的 title 与 metaDescription 须为独有表述，体现该函数用途或痛点；禁止仅替换函数名的套话（数据在 `lib/formulas.ts`）。
2. **公式页 OG/Twitter 与 Meta 一致**：公式页的 openGraph.description 与 twitter.description 须使用 formula.metaDescription（或等价短句），不再使用通用 "Generate X formulas..."（实现于 `app/formulas/[slug]/page.tsx`）。
3. **Hero 10 FAQ 扩展与去通用化**：Hero 10 公式（vlookup, if, sumif, index-match, xlookup, sumifs, countif, countifs, iferror, concatenate）须均有 faq 数组，且问题须为该公式特有（如 VLOOKUP: Why #N/A?；IF: 嵌套层数）；禁止「什么是 X」类通用问法（数据在 `lib/formulas.ts`）。
4. **Common Errors & Fixes 区块**：FormulaConfig 支持可选 commonErrors 配置；公式详情页在存在该配置时须渲染「Common Errors & Fixes」区块，内容按公式差异化（实现于 `lib/formulas.ts` 类型与数据、`app/formulas/[slug]/page.tsx` 渲染）。

## Impact
- **Affected specs**: `formulas` (MODIFIED + ADDED), `seo` (MODIFIED)
- **Affected code**:
  - `lib/formulas.ts` (Meta 定制、Hero 10 FAQ、commonErrors 类型与数据)
  - `app/formulas/[slug]/page.tsx` (generateMetadata 使用 formula.metaDescription 作为 OG/Twitter description；渲染 Common Errors 区块)

## References
- 执行/精品化与核心页整合方案.md（P0/P1 任务 1–4）
