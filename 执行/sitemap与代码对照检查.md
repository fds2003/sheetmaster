# Sitemap 与代码对照检查

**检查日期**：2026-02-01  
**文件**：`sheetmaster/app/sitemap.ts`、`app/robots.ts`、各 `lib/*.ts` 数据源

---

## 一、Sitemap 生成逻辑（sitemap.ts）

| 来源 | 数据 | 生成 URL 数量 | 对应路由 |
|------|------|----------------|----------|
| 静态列表 | 手写 | 10 | /, /privacy, /terms, /blog, /resources, /tools/remove-duplicates, /tools/split-text, /compare/vlookup-vs-xlookup, /use-cases, /solutions |
| POSTS | `lib/posts.ts` | 5 | /blog/[slug] |
| USE_CASES | `lib/use-cases.ts` | 2 | /use-cases/[slug] |
| SOLUTIONS | `lib/solutions.ts` | 6 | /solutions/[slug] |
| FORMULAS | `lib/formulas.ts` | 50 | /formulas/[slug] |

**合计**：10 + 5 + 2 + 6 + 50 = **73 条 URL**，域名统一为 `https://www.getsheetmaster.com`。

---

## 二、与 App 路由一致性

| App 路由 | 是否有页面 | Sitemap 是否包含 |
|----------|------------|------------------|
| `/` | ✅ app/page.tsx | ✅ 静态 |
| `/privacy` | ✅ app/privacy/page.tsx | ✅ 静态 |
| `/terms` | ✅ app/terms/page.tsx | ✅ 静态 |
| `/blog` | ✅ app/blog/page.tsx | ✅ 静态 |
| `/blog/[slug]` | ✅ app/blog/[slug]/page.tsx | ✅ 来自 POSTS（5 篇） |
| `/resources` | ✅ app/resources/page.tsx | ✅ 静态 |
| `/tools/remove-duplicates` | ✅ app/tools/remove-duplicates/page.tsx | ✅ 静态 |
| `/tools/split-text` | ✅ app/tools/split-text/page.tsx | ✅ 静态 |
| `/compare/vlookup-vs-xlookup` | ✅ app/compare/vlookup-vs-xlookup/page.tsx | ✅ 静态 |
| `/use-cases` | ✅ app/use-cases/page.tsx | ✅ 静态 |
| `/use-cases/[slug]` | ✅ app/use-cases/[slug]/page.tsx | ✅ 来自 USE_CASES（accountants, data-analysts） |
| `/solutions` | ✅ app/solutions/page.tsx | ✅ 静态 |
| `/solutions/[slug]` | ✅ app/solutions/[slug]/page.tsx | ✅ 来自 SOLUTIONS（6 个） |
| `/formulas/[slug]` | ✅ app/formulas/[slug]/page.tsx | ✅ 来自 FORMULAS（50 个） |

**结论**：所有内容页路由均在 sitemap 中有对应 URL，无遗漏。

---

## 三、数据源与 build 产出对照

| 数据源 | 条数 | 构建静态页数量（build 输出） |
|--------|------|------------------------------|
| FORMULAS | 50 | 50（/formulas/vlookup … +47 more） |
| SOLUTIONS | 6 | 6（data-cleaning, loan-calculator, seo-toolkit, … +3 more） |
| POSTS | 5 | 5（vlookup-vs-xlookup-2026, 5-excel-formulas-clean-data, … +2 more） |
| USE_CASES | 2 | 2（accountants, data-analysts） |

**结论**：sitemap 使用的数据源与 `generateStaticParams` / 实际生成页面一致。

---

## 四、robots.txt 与 sitemap

- **robots.ts**：`sitemap: 'https://www.getsheetmaster.com/sitemap.xml'` ✅  
- Next.js 默认将 `app/sitemap.ts` 暴露为 `/sitemap.xml`，无需额外配置。

---

## 五、检查清单（后续维护时核对）

1. **新增公式**：在 `lib/formulas.ts` 的 FORMULAS 中增加一条 → sitemap 与 `/formulas/[slug]` 自动包含。
2. **新增博客**：在 `lib/posts.ts` 的 POSTS 中增加一条 → sitemap 与 `/blog/[slug]` 自动包含。
3. **新增 Solution**：在 `lib/solutions.ts` 的 SOLUTIONS 中增加一条 → sitemap 与 `/solutions/[slug]` 自动包含；并沿用动态路由 `app/solutions/[slug]/page.tsx`。
4. **新增 Use-case**：在 `lib/use-cases.ts` 的 USE_CASES 中增加一条 → sitemap 与 `/use-cases/[slug]` 自动包含。
5. **新增静态页**（如新 compare、新 tools）：需在 `sitemap.ts` 的静态 `routes` 数组中增加对应 URL。

---

*检查完成；sitemap 与当前代码及数据源一致，无遗漏。*
