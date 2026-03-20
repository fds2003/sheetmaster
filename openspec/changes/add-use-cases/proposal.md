# Change: Add use-case (industry) landing pages

## Why
按顺序可执行方案阶段 1 要求：与首页「Industry Solutions」衔接，提供垂直场景落地页（行业专题页），提升 SEO 与转化价值。当前仅有 solutions（交互式工具），缺少按行业聚合公式与工具入口的静态落地页。

## What Changes
1. **新增 use-cases 能力**：`lib/use-cases.ts` 定义 UseCase 类型与首批 2 个行业（accountants、data-analysts）；每项含 slug、title、description、metaDescription、formulas[]（公式 slug）、tools[]（工具页路径）、可选 painPoints、ctaText。
2. **新增路由**：`/use-cases` 列表页、`/use-cases/[slug]` 详情页；列表展示卡片链到详情；详情页含痛点简述、推荐公式与工具链接、CTA（如 Try [Formula]）；generateStaticParams、generateMetadata、metadata/canonical/OG。
3. **Sitemap**：增加 `/use-cases` 及所有 `/use-cases/[slug]`，priority 约 0.7。
4. **首页/导航衔接**：首页「Industry Solutions」保留现有 solutions 区块；可选增加「Use Cases」入口（如链接到 /use-cases 或区块内增加 use-case 卡片）；导航可选增加「Use Cases」链到 /use-cases。

## Impact
- **New spec**: `use-cases`
- **Affected specs**: `seo` (MODIFIED — sitemap 须包含 use-cases URL)
- **New code**:
  - `lib/use-cases.ts`
  - `app/use-cases/page.tsx`
  - `app/use-cases/[slug]/page.tsx`
- **Modified code**:
  - `app/sitemap.ts`（增加 use-cases 路由）
  - `app/page.tsx` 或 `app/layout.tsx`（可选：Use Cases 入口或导航链接）

## References
- 执行/GetSheetMaster.com 按顺序可执行方案.md（阶段 1）
- 执行/GetSheetMaster.com 落实需求清单（开发任务）.md（Phase 5）
