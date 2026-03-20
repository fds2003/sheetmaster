# 精品化SEO改进意见与方案 vs core_pages_sitemap 对比

**编制日期**：2026-02-01  
**对比文件**：`执行/精品化SEO改进意见与方案.md`、`执行/core_pages_sitemap.md`

---

## 一、策略一致性

| 维度 | 精品化SEO改进意见与方案 | core_pages_sitemap |
|------|-------------------------|---------------------|
| **核心策略** | 质量大于数量；一个关键词组一个极致页面；拒绝模板化 | Boutique Vertical Site (Quality > Quantity)；~50 核心页；每页需独有 inputs / FAQ / scenario |
| **页面规模** | 约 50–80 个高质量页（50 核心公式 + 6–10 行业 + 10–20 对比/教程） | 约 50 核心页（首页 + 10 Hero 公式 + 6 Solutions + 约 30 长尾公式 + 对比/替代） |
| **新增页面原则** | 不做「查找替换」式批量生成；每页独有 Meta、FAQ、输入、错误排查 | 不自动生成列表外页面；新页须走「Boutique」流程：独有参数、独有 FAQ、独有场景案例 |

**结论**：两案在「精品化、控量、每页独有」上一致，可合并执行。

---

## 二、页面结构与清单对比

### 2.1 首页

| 项目 | 精品化方案 | core_pages_sitemap |
|------|------------|---------------------|
| URL | `/`（未单独展开） | `/` |
| 关键词 | 未单独列 | `excel formula generator`, `google sheets formula generator`, `free excel formula maker` |
| USP | 未单独列 | "100% Free, No Signup, Visual Formula Builder" |

**建议**：以 core_pages 的首页关键词与 USP 为落地标准，精品化方案侧重全站 Meta/FAQ 等质量约束。

### 2.2 核心公式页（Hero / 前 10 大）

| 项目 | 精品化方案 | core_pages_sitemap |
|------|------------|---------------------|
| 数量 | 前 10 大公式 | Top 10 "Hero" Formula Pages |
| 名单（精品化） | VLOOKUP, IF, SUMIF, INDEX MATCH, XLOOKUP, IFERROR, SUMIFS, COUNTIF, REGEX 相关, **PMT** | vlookup, if, sumif, index-match, xlookup, **sumifs**, **countif**, **countifs**, iferror, **concatenate** |
| 名单（core_pages） | — | 同上（无 REGEX 单页、无 PMT 单页；PMT 在 loan-calculator 中） |
| 差异化要求（精品化） | 独有 Meta、独有 FAQ、独有错误排查、可选场景化教程 | 每页明确 **USP + 交互形态**（如 VLOOKUP: Wizard Mode + #N/A；IF: Nested Logic Builder） |

**差异**：

- **Hero 名单不完全一致**：精品化含 REGEX、PMT；core_pages 含 SUMIFS、COUNTIF、COUNTIFS、CONCATENATE。PMT 在 core_pages 里归入 `/solutions/loan-calculator`，不单独公式页。
- **精品化**：偏「内容与 SEO 质量」（Meta、FAQ、Common Errors、教程）。
- **core_pages**：偏「产品形态与交互」（Wizard、Criteria Selector、Visual Counter 等）。

**建议**：  
- 统一「前 10 / Hero」名单：以 core_pages 的 10 个为主（与现有路由一致），REGEX 相关用现有 extract-email 等 solutions 覆盖，PMT 保留在 loan-calculator。  
- 精品化负责：这 10 页的 Meta 定制、FAQ 去通用化、Common Errors 区块、场景化教程。  
- core_pages 负责：这 10 页的 USP 与交互形态（若要做 Wizard / Nested Logic Builder 等，再拆开发任务）。

### 2.3 Solutions / 行业场景

| 项目 | 精品化方案 | core_pages_sitemap |
|------|------------|---------------------|
| 类型 | 行业场景页（use-cases）6–10 个 | 高价值 Solution 页（solutions）6 个 |
| URL（精品化） | `/use-cases/[slug]`（如 accountants, data-analysts, hr, 电商…） | — |
| URL（core_pages） | — | `/solutions/data-cleaning`, `loan-calculator`, `seo-toolkit`, `extract-email`, `inventory-manager`, `grade-calculator` |
| 定位（精品化） | 痛点 + 推荐公式/工具 + CTA | — |
| 定位（core_pages） | — | 每页有 Core Keyword + USP / Tool Feature（如 Data Scrubber、Financial Calculator） |

**差异**：  
- **精品化**：强调「行业」维度（use-cases），已落地 2 个（accountants, data-analysts），计划扩到 6–10。  
- **core_pages**：强调「解决方案」维度（solutions），列明 6 个现有 solution 的 keyword + USP，未提 use-cases。

**建议**：  
- 两套都保留：**solutions** = 工具型解决方案（去重、贷款、SEO、提取邮箱等）；**use-cases** = 行业入口（会计、数据分析、HR 等）。  
- 行业页扩展按精品化方案做到 6–10 个；solutions 的 keyword/USP 按 core_pages 做文案与功能强化。

### 2.4 长尾公式页（约 30 个）

| 项目 | 精品化方案 | core_pages_sitemap |
|------|------------|---------------------|
| 数量 | 约 50 个核心公式页（含前 10） | 10 Hero + 「Essential Formula Pages」约 30 个（Lookup/Text/Date/Math） |
| 清单 | 未逐条列，只强调「全公式 Meta 定制」「前 10 FAQ」 | 列出具体 slug：match, indirect, offset, choose, hlookup, left/right/mid, trim, substitute, textjoin, len, datedif, networkdays, eomonth, today/now, year/month/day, average/averageif, min/max, rank, round 等 |

**建议**：以 **core_pages_sitemap** 的「Essential Formula Pages」清单为「约 50 核心页」中的长尾部分，精品化方案对这些页做：Meta 定制、FAQ 按需补全、Common Errors 按需加、避免模板化。

### 2.5 对比页 / 替代页

| 项目 | 精品化方案 | core_pages_sitemap |
|------|------------|---------------------|
| 类型 | 公式 vs 公式（如 VLOOKUP vs XLOOKUP） | 公式 vs 公式 + **产品替代**（vs GPT Excel, FormulaBot） |
| URL（精品化） | `/compare/vlookup-vs-xlookup` 等，计划新增 2–5 个 | `/compare/` 未列；列了 `/alternatives/gptexcel`, `/alternatives/formulabot`；`/blog/vlookup-vs-xlookup`, `/blog/sumif-vs-sumifs` |
| 数量（精品化） | 2–5 个对比页 | 2 个 alternatives + 2 篇 blog（vlookup-vs-xlookup, sumif-vs-sumifs） |

**差异**：  
- **精品化**：只有「公式对比」，且放在 `/compare/`（与当前实现一致）。  
- **core_pages**：多了「替代竞品」页 `/alternatives/*`，且把部分「对比」放在 `/blog/`。

**建议**：  
- **公式 vs 公式**：统一用 `/compare/[slug]`（vlookup-vs-xlookup、index-match-vs-vlookup、sumif-vs-sumifs、if-vs-ifs 等），与现有实现一致；是否同步发一篇 blog 可另定。  
- **产品替代**：若要做「Free vs Paid AI」等，可新增 `/alternatives/gptexcel`、`/alternatives/formulabot`，并在 sitemap 中加入；与精品化「对比页 2–5 个」不冲突（精品化指公式对比，alternatives 单独算一类）。

---

## 三、内容与 SEO 要求对比

| 要求项 | 精品化方案 | core_pages_sitemap |
|--------|------------|---------------------|
| **Meta 定制** | P0：全公式 title/metaDescription 独有，禁止只换函数名 | 未单独列；执行 note 要求「独有」 |
| **OG/Twitter 描述** | P0：与 metaDescription 一致，避免雷同 | 未提 |
| **FAQ Schema** | P0：前 10 大公式必填；P1：去通用化（该公式真实高频问题） | 执行 note：每页「unique FAQ schema」 |
| **Common Errors 区块** | P1：每公式页独立「Common Errors & Fixes」，按公式写 | 未提 |
| **场景化教程** | P1：前 10 大公式 800–1000 字，场景+案例+截图 | 执行 note：「unique business scenario case」 |
| **关键词与 URL 映射** | P1：约 50 个核心 URL，关键词组→唯一 URL，防内竞 | 每页有 Core Keyword，但无单独映射表文档 |

**结论**：精品化方案在 Meta、OG、FAQ、Common Errors、教程体量、映射表上更具体、可执行；core_pages 在「每页 USP 与交互」上更具体。两者互补。

---

## 四、执行优先级与合并建议

### 4.1 合并后的优先级（建议）

| 优先级 | 内容 | 主要依据 | 产出/动作 |
|--------|------|----------|-----------|
| **P0** | 全公式 Meta 定制；公式页 OG/Twitter 与 Meta 一致；前 10 大公式 FAQ 补全且去通用化 | 精品化 | 改 `lib/formulas.ts`、`app/formulas/[slug]/page.tsx` |
| **P1** | 前 10 Hero 页 USP/交互对齐 core_pages（Wizard、Nested Logic 等可按资源分批）；每公式页 Common Errors 区块；前 10 场景化教程 800–1000 字；关键词与 URL 映射表 | 精品化 + core_pages | 扩展 FormulaConfig、公式页渲染；`执行/关键词与URL映射表.md` |
| **P2** | 行业页扩至 6–10；对比页新增 2–5（/compare/）；可选 /alternatives/；Reddit + GSC/Bing | 精品化 + core_pages | `lib/use-cases.ts`、`app/compare/*`、sitemap、运营 |

### 4.2 以谁为「页面清单」主文档

- **core_pages_sitemap.md**：作为**核心页面清单与每页 USP/关键词**的主文档（首页、10 Hero、6 Solutions、约 30 Essential、对比/替代）。
- **精品化SEO改进意见与方案.md**：作为**质量标准与改进任务**的主文档（Meta、FAQ、Common Errors、教程、OG、映射表、行业/对比扩展）。

两文档同时保留，执行时：  
- 新增/删页、Hero 名单、Solutions 名单、长尾公式列表 → 以 core_pages 为准并更新该文件。  
- 每页质量（Meta、FAQ、错误排查、教程、OG）→ 以精品化方案为准并勾选其可执行表。

### 4.3 冲突与取舍

| 冲突点 | 建议 |
|--------|------|
| Hero 前 10 名单不一致（REGEX/PMT vs SUMIFS/COUNTIF/CONCAT 等） | 以 **core_pages** 的 10 个为准（与现有路由一致）；REGEX 由 solutions 覆盖；PMT 保留在 loan-calculator。精品化「前 10 大」在落地时与 core_pages 的 Hero 10 对齐。 |
| 对比页放在 /compare 还是 /blog | **公式 vs 公式** 用 `/compare/`；若需「长文对比」可再发 blog 并链回 compare。core_pages 中的 `/blog/vlookup-vs-xlookup` 可与 `/compare/vlookup-vs-xlookup` 二选一或并存（blog 链到 compare 作为工具入口）。 |
| alternatives 是否做 | 若做竞品对比（Free vs Paid AI），用 **core_pages** 的 `/alternatives/*`；不做则暂不建路由。 |

---

## 五、总结表

| 维度 | 精品化SEO改进意见与方案 | core_pages_sitemap | 合并建议 |
|------|-------------------------|---------------------|----------|
| **策略** | 质量>数量，一页一词组，拒绝模板 | 同左，~50 核心页 | 一致，合并执行 |
| **页面清单** | 未列齐 50 个 URL | 列出首页+10 Hero+6 Solutions+约30 公式+对比/替代 | 以 core_pages 为清单主文档 |
| **Hero 名单** | 前 10 含 REGEX、PMT | 前 10 含 SUMIFS、COUNTIF、COUNTIFS、CONCAT | 以 core_pages 为准；精品化「前10」与之对齐 |
| **质量要求** | Meta/FAQ/OG/Common Errors/教程/映射表 | 独有 inputs/FAQ/scenario；每页 USP+交互 | 以精品化方案为质量标准；以 core_pages 为 USP/交互定义 |
| **Solutions vs Use-cases** | 行业页 use-cases 6–10 | Solutions 6 个（工具型） | 两套并存：solutions 工具，use-cases 行业 |
| **对比/替代** | 公式对比 /compare/ 2–5 个 | /alternatives/ 竞品 + blog 对比 | 公式对比用 /compare/；竞品用 /alternatives/（可选） |

**一句话**：**core_pages_sitemap** 定「有哪些页、每页关键词与 USP」；**精品化SEO改进意见与方案** 定「每页要做到什么质量、先做哪几项」。两案互补，建议同时沿用，按上表合并执行。

---

*文档生成时间：2026-02-01*
