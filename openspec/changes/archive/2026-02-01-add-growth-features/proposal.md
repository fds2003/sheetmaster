# Change: Add growth features (SEO, blog, resources, tools, compare, share)

## Why
GetSheetMaster.com 方案总览与落实需求指出：内容生态缺失（无博客/教程）、用户留存为零（无邮件/资源下载）、社交传播缺失（无分享）、外链与曝光未系统化。技术基础（Next.js、动态元数据、Sitemap）已就绪，需在不动大架构的前提下补齐 P0/P1 能力，以提升有机流量与留存。

## What Changes
1. **技术 SEO 与首页**：全局 description 去「AI-powered」改为「No AI, no signup」；首页 H1 与副标题优化；新增「Why SheetMaster」「Most Popular Formulas」「Industry Solutions」模块；核心公式页（VLOOKUP/IF/SUMIF/INDEX MATCH/XLOOKUP）Meta 与 FAQ 数据补全；公式页输出 FAQPage 结构化数据（JsonLd 已支持，仅补数据）；Sitemap 包含 blog、resources、tools、compare；主导航增加 Blog、Resources 链接。
2. **博客栏目**：新增 `/blog`、`/blog/[slug]`；数据源 `lib/posts.ts`（Post 类型）；首批 5 篇文章；列表页与文章页 metadata、canonical、OG。
3. **资源页**：新增 `/resources`；列出 Lead Magnet（如速查表 PDF）；下载/订阅 CTA；metadata、canonical、OG。
4. **专用工具页**：新增 `/tools/remove-duplicates`、`/tools/split-text`；每页含多子工具与公式生成；针对高搜索量关键词的 title/metaDescription；Sitemap 包含上述 URL。
5. **对比页**：新增 `/compare/vlookup-vs-xlookup`；对比表、适用场景、链接或嵌入两公式生成器；metadata 针对 "vlookup vs xlookup"；Sitemap 包含。
6. **公式页增强**：结果区增加 Share to Twitter、Share to LinkedIn、Copy Link；页底增加「Related Formulas」区块（按 category 或预定义映射展示 3–5 个公式链接）。

## Impact
- **Affected specs**: `seo` (MODIFIED + ADDED), `formulas` (MODIFIED + ADDED)
- **New specs**: `blog`, `resources`, `tools`, `compare`
- **Affected code**:
  - `app/layout.tsx` (description, nav links)
  - `app/page.tsx` (H1, hero, Why SheetMaster, Most Popular, Industry Solutions)
  - `lib/formulas.ts` (core formula title/metaDescription/faq)
  - `app/formulas/[slug]/page.tsx` (Related Formulas block)
  - `components/FormulaBuilder.tsx` or `InteractiveFormulaBuilder.tsx` (share buttons)
  - `app/sitemap.ts` (blog, resources, tools, compare)
- **New files**:
  - `lib/posts.ts`, `app/blog/page.tsx`, `app/blog/[slug]/page.tsx`
  - `app/resources/page.tsx`
  - `app/tools/remove-duplicates/page.tsx`, `lib/tools/remove-duplicates.ts` (or inline)
  - `app/tools/split-text/page.tsx`, `lib/tools/split-text.ts` (or inline)
  - `app/compare/vlookup-vs-xlookup/page.tsx`

## References
- 执行/GetSheetMaster.com 方案总览与落实需求.md
- 执行/GetSheetMaster.com 落实需求清单（开发任务）.md
