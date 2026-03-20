# 需求与代码对照：精品化公式页质量（add-boutique-formula-quality）

**编制日期**：2026-02-01  
**依据**：`执行/精品化与核心页整合方案.md`、`openspec/changes/add-boutique-formula-quality/`（proposal、design、spec deltas）

---

## 一、需求来源与范围

| 文档 | 范围 |
|------|------|
| 精品化与核心页整合方案 三、3.1 | 所有公式页：独有 Meta、OG=Meta、独有 FAQ（Hero 10 必填）、Common Errors 区块、场景化教程（Hero 10 须有 800–1000 字） |
| 整合方案 四、P0/P1 任务表 | P0：全站 Meta 定制、OG/Twitter=Meta、Hero 10 FAQ；P1：Common Errors 区块、Hero 10 场景化教程等 |
| OpenSpec design.md | **本变更**：独有 Meta、OG/Twitter=metaDescription、Hero 10 FAQ、Common Errors。**不包含**：Hero 10 的 800–1000 字 richContent、关键词映射表、新增 compare/use-cases |

---

## 二、逐项对照（功能代码 vs 需求）

### 2.1 公式页 Title / Meta Description 独有

| 需求 | 出处 | 代码实现 | 状态 |
|------|------|----------|------|
| 每个公式 title、metaDescription 独有，禁止仅换函数名套话 | 整合方案 3.1、P0-1；Spec formulas「Formula page unique metadata」 | **Hero 10**：在 `lib/formulas.ts` 中均为手写对象，title 与 metaDescription 均为独有表述（如 VLOOKUP、IF、SUMIF、COUNTIF、CONCATENATE、INDEX MATCH、XLOOKUP、SUMIFS、COUNTIFS、IFERROR）。 | ✅ 一致 |
| 同上（Essential 公式） | 整合方案 3.1、P0-1 | **Essential 公式**：多数通过 `createSimpleFormula` / `createSingleParamFormula` / `createTwoParamFormula` 生成，title 固定为 `Free ${excelFunction} Formula Generator`，metaDescription 为传入的短句或默认 `Generate ${excelFunction} formulas for Excel and Google Sheets.`，仍属「仅换函数名」的模板。 | ⚠️ 未覆盖 |
| 说明 | design.md、tasks.md | design 与 tasks 写明「Start with Hero 10 if needed, then extend to remaining formulas」。当前实现按「先 Hero 10」完成；Essential 公式独有 Meta 列为后续批次。 | 符合设计 |

**结论**：Hero 10 与需求一致；Essential 公式的独有 title/metaDescription 未在本变更中完成，需后续按 P0-1 扩展。

---

### 2.2 公式页 OG / Twitter description 与 Meta 一致

| 需求 | 出处 | 代码实现 | 状态 |
|------|------|----------|------|
| openGraph.description、twitter.description 使用 formula.metaDescription | 整合方案 3.1、P0-2；Spec seo「Open Graph」「Twitter Card」 | `app/formulas/[slug]/page.tsx`：`description = formula.metaDescription`；`openGraph.description`、`twitter.description` 均设为 `description`。 | ✅ 一致 |
| OG 图片的 description 参数不用通用句 | design.md、Spec seo | `ogDescriptionForImage = description.length > 120 ? description.slice(0,117)+'...' : description`；`ogImageUrl` 的 query 使用 `encodeURIComponent(ogDescriptionForImage)`，即来自 formula.metaDescription。 | ✅ 一致 |
| twitter:title 为公式相关 | Spec seo | `twitter.title` 使用 `title`（= formula.title），非硬编码「Generate X…」。 | ✅ 一致 |

**结论**：与需求一致，无遗漏。

---

### 2.3 Hero 10 FAQ 必填且公式特有

| 需求 | 出处 | 代码实现 | 状态 |
|------|------|----------|------|
| Hero 10 = vlookup, if, sumif, index-match, xlookup, sumifs, countif, countifs, iferror, concatenate 均有 faq[]，且≥5 条 | 整合方案 2.2、P0-3；Spec formulas「Core formula FAQ data」 | 上述 10 个 slug 在 `lib/formulas.ts` 中均配置了 `faq` 数组，每条为 `{ question, answer }`，数量≥5。 | ✅ 一致 |
| 问题须为该公式特有，禁止「什么是 X」类通用问 | 整合方案 3.1、P0-3；Spec「FAQ content relevance」 | VLOOKUP：Why #N/A?、Can VLOOKUP look left? 等；IF：嵌套、IF vs IFS；SUMIF/COUNTIF/SUMIFS/COUNTIFS/IFERROR/CONCATENATE 等均为该函数特有问题。 | ✅ 一致 |

**结论**：与需求一致，无遗漏。

---

### 2.4 Common Errors & Fixes 区块

| 需求 | 出处 | 代码实现 | 状态 |
|------|------|----------|------|
| 配置驱动，每公式页有独立区块，内容按公式差异化 | 整合方案 3.1、P1-4；Spec formulas「Common Errors and Fixes block」 | `FormulaConfig` 增加可选 `commonErrors?: Array<{ title?: string; causes: string[]; fixes: string[] }>`（`FormulaCommonError`）；`app/formulas/[slug]/page.tsx` 在 `formula.commonErrors && formula.commonErrors.length > 0` 时渲染「Common Errors & Fixes」区块，列表展示每条的 title、causes、fixes。 | ✅ 一致 |
| 有 commonErrors 则显示，无或空则不显示 | Spec「Block visible when commonErrors present」「Block hidden when commonErrors absent」 | 条件为 `formula.commonErrors && formula.commonErrors.length > 0`，无或空数组不渲染。 | ✅ 一致 |
| Hero 10 均有 commonErrors 数据 | 整合方案 2.2、P1-4；tasks 2.3 | vlookup, if, sumif, countif, concatenate, index-match, xlookup, sumifs, countifs, iferror 在 `lib/formulas.ts` 中均配置了 `commonErrors`（至少一条，含 causes/fixes）。 | ✅ 一致 |

**结论**：与需求一致，无遗漏。

---

### 2.5 公式配置结构（可选字段 commonErrors）

| 需求 | 出处 | 代码实现 | 状态 |
|------|------|----------|------|
| FormulaConfig 可包含 commonErrors：optional title，causes[]，fixes[] | Spec formulas「Formula Configuration Structure」Optional formula fields；design 3 | `lib/formulas.ts`：`FormulaCommonError` 含 `title?: string`、`causes: string[]`、`fixes: string[]`；`FormulaConfig` 含 `commonErrors?: FormulaCommonError[]`。 | ✅ 一致 |

**结论**：与需求一致。

---

### 2.6 场景化教程（Hero 10 约 800–1000 字 richContent）

| 需求 | 出处 | 代码实现 | 状态 |
|------|------|----------|------|
| Hero 10 须有约 800–1000 字 richContent（场景+案例） | 整合方案 3.1、P1-5 | 部分 Hero 10 已有 richContent（如 VLOOKUP、IF、XLOOKUP、SUMIFS、IFERROR），字数未统一要求；design **Non-Goals** 明确「不在此变更中实现 Hero 10 的 800–1000 字场景化教程」。 | ✅ 符合设计 |
| 说明 | design.md、tasks.md | 本变更不包含 P1-5；列为 P1「2–3 周内」任务。 | 非本次范围 |

**结论**：与 design 一致，无遗漏。

---

### 2.7 其他（canonical、JsonLd、输入参数）

| 需求 | 出处 | 代码实现 | 状态 |
|------|------|----------|------|
| 公式页 canonical URL | 原 SEO spec | `alternates.canonical: url`（https://www.getsheetmaster.com/formulas/${slug}）。 | ✅ 一致 |
| FAQPage JSON-LD | 原 SEO spec | `components/JsonLd.tsx` 在 `formula.faq` 存在且非空时输出 FAQPage schema；Hero 10 均有 faq，故会输出。 | ✅ 一致 |
| 每公式独立 inputs[] | 整合方案 3.1 | 各公式在 `lib/formulas.ts` 均有独立 `inputs` 数组，无共用模板。 | ✅ 一致 |

**结论**：与需求一致。

---

## 三、遗漏与后续建议

### 3.1 本变更内无遗漏

- 公式页 OG/Twitter 使用 `formula.metaDescription`（含 OG 图片 description 参数）。
- Hero 10 独有 title/metaDescription、≥5 条公式专属 FAQ、commonErrors 数据与页面区块。
- FormulaConfig 支持 optional commonErrors；有则显示、无则不显示。

### 3.2 按设计刻意未做（非遗漏）

- **Essential 公式独有 Meta**：仅完成 Hero 10；其余公式仍用 create* 的 title/metaDescription 模板，按 tasks「Start with Hero 10, then extend」列为后续。
- **Hero 10 场景化教程 800–1000 字**：按 design Non-Goals 不在此变更实现，属 P1-5。

### 3.3 后续待办（已纳入规范文档）

后续需安排做的需求已写入 **`执行/精品化-后续待办需求.md`**，每条含编号、优先级、需求描述、验收标准、主要文件、依赖、产出物、状态；与《精品化与核心页整合方案》四、任务表一一对应。

| 本表原建议项 | 后续待办文档中的编号 | 概要 |
|--------------|----------------------|------|
| Essential 公式独有 title/metaDescription | **BQ-P0-1** | Essential 公式页 title/metaDescription 独有化 |
| Hero 10 richContent 字数与场景化 | **BQ-P1-1** | Hero 10 场景化教程 800–1000 字 |
| — | BQ-P1-2、BQ-P1-3、BQ-P2-1～BQ-P2-5 | 关键词映射表、Hero 10 交互、行业页、对比页、Essential FAQ/commonErrors、alternatives、Reddit/GSC 等 |

排期与验收以 **`执行/精品化-后续待办需求.md`** 为准；完成某条后更新该文档状态并同步《精品化与核心页整合方案》任务表。

---

## 四、文件级对照

| 需求/任务 | 主要文件 | 实现要点 |
|-----------|----------|----------|
| 全站公式页 Meta 定制（Hero 10 完成） | `lib/formulas.ts` | Hero 10 为手写对象，title/metaDescription 独有；FormulaCommonError 类型与 commonErrors 数据。 |
| 公式页 OG/Twitter=Meta、OG 图片 description | `app/formulas/[slug]/page.tsx` | generateMetadata 中 description=formula.metaDescription，openGraph.description、twitter.description、ogImageUrl 的 description 参数均用该值。 |
| Hero 10 FAQ 与去通用化 | `lib/formulas.ts` | 10 个公式均有 faq[]（≥5 条），问题为该公式特有。 |
| Common Errors 区块 | `lib/formulas.ts`、`app/formulas/[slug]/page.tsx` | 类型与数据在 formulas.ts；页面条件渲染「Common Errors & Fixes」，展示 title/causes/fixes。 |

---

*对照完成时间：2026-02-01；变更 ID：add-boutique-formula-quality*
