# 精品化 SEO 改进意见与方案

> **整合说明**：本方案已与 `执行/core_pages_sitemap.md` 整合为 **`执行/精品化与核心页整合方案.md`**。执行时请以整合方案为单一依据；本文档保留作质量要求与改进思路参考。

**编制日期**：2026-02-01  
**依据**：`需求/精品化垂直站SEO重构路线图.md`、`需求/SEO 精品化战略：拒绝模板化与提升页面权重.md`  
**对照**：getsheetmaster.com 网站目标、`sheetmaster/` 目录代码现状

---

## 一、两份需求文档核心要点

### 1.1 精品化垂直站路线图（四阶段）

| 阶段 | 目标 | 关键动作 |
|------|------|----------|
| **第一阶段** | 做减法与定义「灵魂」 | 关键词清洗与合并（同义词合并到一页，避免内竞）；为前 10 大公式定义「独有痛点」与差异化配置 |
| **第二阶段** | 技术重构与交互差异化 | 动态 Meta 必须**定制**（Description 不能只换公式名）；FAQ Schema 用**真实高频问题**（如 VLOOKUP: "Why #N/A?"）；交互组件**参数化**（VLOOKUP 4 个框 / TEXTSPLIT 2 框+开关） |
| **第三阶段** | 内容填充与场景化 | 工具下方 800–1000 字「场景+案例+截图」教程；每页底部「Common Errors & Fixes」**按公式差异化**（VLOOKUP 写格式不匹配，INDEX MATCH 写范围高度不一致） |
| **第四阶段** | 验证与外部信号 | Sitemap 提交 GSC/Bing；Reddit 回答中链到**具体工具页**；Lead Magnet 留存 |

### 1.2 SEO 精品化战略（纠偏原则）

- **一个关键词组 = 一个极致页面**：不做 /vlookup-tool、/vlookup-generator、/vlookup-calculator 三个页，只做一个 /formulas/vlookup，在该页覆盖 generator、tool、how to、syntax。
- **拒绝「填空题」模板**：每个页面须具备**独有**元素——独有输入参数、独有 FAQ Schema、独有错误排查；不能只替换公式名。
- **目的明确**：为流量而非任务数量；50–80 个高质量页优于 1000 个 60 分页；Bing 对内容农场敏感，结构雷同会不收录甚至屏蔽。

---

## 二、当前 sheetmaster 代码与站点现状

### 2.1 已做得好的部分

| 项目 | 现状 | 说明 |
|------|------|------|
| **一页一词组** | ✅ | 公式页统一为 `/formulas/[slug]`，无多 URL 竞争同一关键词 |
| **动态 Meta** | ✅ | `generateMetadata` 使用 `formula.title`、`formula.metaDescription`；核心 5 个（vlookup/if/sumif/index-match/xlookup）已定制 title/description |
| **差异化输入** | ✅ | 每个公式在 `lib/formulas.ts` 有独立 `inputs[]`（VLOOKUP 4 个、TEXTSPLIT 等不同）；部分公式用 InteractiveFormulaBuilder（vlookup/xlookup/index-match/if/extract-email/extract-domain），其余用 FormulaBuilder（均按配置渲染） |
| **FAQ Schema** | ✅ 部分 | JsonLd 已支持 FAQPage；核心 5 个公式已配置 `faq[]`，问题针对性强（如 #N/A、look left） |
| **结构化数据** | ✅ | SoftwareApplication、HowTo（有 howToSteps 时）、FAQPage（有 faq 时）、Breadcrumb |
| **Sitemap / 博客 / 工具 / 对比 / 行业页** | ✅ | 已有 blog、resources、tools、compare、use-cases；Lead Magnet 订阅已接 |

### 2.2 与精品化要求仍有差距的部分

| 差距 | 现状 | 需求侧要求 |
|------|------|------------|
| **Meta 定制覆盖** | 仅核心 5 个公式有深度定制的 title/metaDescription；其余多数为 `createSimpleFormula` 生成的通用句 | 每个页 Description **必须定制**（如 VLOOKUP 写 "Handle approximate & exact matches"，SUMIF 写 "Sum cells based on single criterion"） |
| **FAQ 覆盖与质量** | 约 5 个公式有 faq；其余无；需核对是否仍有「什么是 X」类通用问法 | 前 10 大公式均应有 FAQ；且为**该公式真实高频问题**（如 IF 嵌套层数、REGEX 文本提取） |
| **Common Errors 模块** | 仅个别公式在 `richContent` 里含 "Common Errors to Watch Out For" 的 HTML，非统一模块 | 每个公式页底部应有**独立「Common Errors & Fixes」区块**，内容按公式差异化（VLOOKUP：#N/A/格式；INDEX MATCH：范围高度等） |
| **场景化教程体量** | 部分公式有 `richContent`，长度与场景化程度不一 | 前 10 大公式应有 800–1000 字「场景+案例+截图」教程（如 VLOOKUP 用 SKU 价格查询，PMT 用房贷月供） |
| **OG 描述差异化** | `formulas/[slug]/page.tsx` 中 OG 的 description 仍用 `"Generate " + formula.excelFunction + " formulas..."` | 应与 `formula.metaDescription` 一致，避免所有公式页 OG 文案雷同 |
| **行业/对比页数量** | use-cases 仅 2 个（accountants, data-analysts）；compare 仅 1 个（vlookup-vs-xlookup） | 路线图建议 6–10 个行业场景页、10–20 个对比/教程页（可按优先级分批上） |

---

## 三、改进意见（按优先级）

### P0：立即做（防降权、提升收录与点击）

1. **全站公式页 Meta 审计与定制**  
   - **动作**：遍历 `lib/formulas.ts` 中所有公式，确保每个 `title` 与 `metaDescription` 均为**独有表述**，不出现仅替换函数名的套话。  
   - **标准**：Description 中体现该函数的**典型用途或痛点**（如 VLOOKUP：approximate & exact match、#N/A；SUMIF：single criterion sum；IF：nested logic）。  
   - **产出**：一份「公式 slug → 建议 title / metaDescription」清单；在 `lib/formulas.ts` 中逐条替换（含目前用 `createSimpleFormula` 默认生成的那些）。

2. **公式页 OG 与 Twitter 描述与 Meta 一致**  
   - **动作**：在 `app/formulas/[slug]/page.tsx` 的 `generateMetadata` 中，将 `openGraph.description`、`twitter.description` 以及 OG 图片的 `description` 参数改为使用 `formula.metaDescription`（或与 title 一致的短句），避免所有公式页分享文案雷同。  
   - **文件**：`sheetmaster/app/formulas/[slug]/page.tsx`。

3. **前 10 大公式 FAQ 补全且「去通用化」**  
   - **动作**：在 `lib/formulas.ts` 为前 10 大公式（如 VLOOKUP, IF, SUMIF, INDEX MATCH, XLOOKUP, IFERROR, SUMIFS, COUNTIF, REGEX 相关, PMT 等）补全或改写 `faq`，确保每题均为**该公式特有**的高频问题（如 VLOOKUP：#N/A、look left；IF：嵌套层数；INDEX MATCH：为何优于 VLOOKUP）。  
   - **禁止**：「什么是 X」「怎么用 X」等可套用到任何公式的通用问法。  
   - **文件**：`sheetmaster/lib/formulas.ts`；前端已支持 JsonLd FAQ，无需改组件。

### P1：2–3 周内（内容深度与差异化）

4. **每公式页独立「Common Errors & Fixes」区块**  
   - **动作**：在 `FormulaConfig` 中增加可选字段，如 `commonErrors?: { title: string; causes: string[]; fixes: string[] }[]`，或在现有 `richContent` 前增加一段由配置驱动的「Common Errors & Fixes」区块。  
   - **要求**：每个公式的报错原因与修复建议**按公式写**（VLOOKUP：格式不匹配、列号错误；INDEX MATCH：范围高度不一致等）。  
   - **文件**：`sheetmaster/lib/formulas.ts`（扩展类型与数据）；`sheetmaster/app/formulas/[slug]/page.tsx`（在 richContent 上方或下方渲染该区块）。

5. **前 10 大公式场景化教程（800–1000 字）**  
   - **动作**：为 VLOOKUP、IF、SUMIF、INDEX MATCH、XLOOKUP、IFERROR、SUMIFS、COUNTIF、PMT、REGEX 等前 10 大公式撰写或配置 `richContent`，结构为「场景 + 案例 + 可选截图位置」。  
   - **示例**：VLOOKUP 用电商 SKU 价格查询；PMT 用房贷月供计算；IF 用多条件分级。可配合《GetSheetMaster.com功能优化与新增建议》等文档中的案例。  
   - **文件**：`sheetmaster/lib/formulas.ts` 中对应公式的 `richContent`。

6. **关键词与 URL 映射表（做减法、防内竞）**  
   - **动作**：整理一份「目标关键词组 → 唯一 URL」表（约 50 个核心 URL），确保同义词/近义词合并到同一页（如 remove duplicates excel → /tools/remove-duplicates；vlookup generator/syntax/tool → /formulas/vlookup）。  
   - **产出**：`执行/关键词与URL映射表.md`（可勾选），便于后续新增页面时不再创造内部竞争。

### P2：1–2 个月（规模与权威）

7. **行业场景页扩展**  
   - **动作**：在 `lib/use-cases.ts` 中增加 4–8 个行业（如 HR、财务、电商、营销、教育等），每页保持「痛点 + 推荐公式/工具 + CTA」结构。  
   - **文件**：`sheetmaster/lib/use-cases.ts`；`sheetmaster/app/use-cases/[slug]/page.tsx` 已支持动态。

8. **对比页扩展**  
   - **动作**：新增 2–5 个对比页（如 VLOOKUP vs INDEX MATCH、SUMIF vs SUMIFS、IF vs IFS），结构参考现有 `/compare/vlookup-vs-xlookup`，metadata 与正文针对对应关键词。  
   - **文件**：`sheetmaster/app/compare/` 下新建路由；`sheetmaster/app/sitemap.ts` 增加 URL。

9. **Reddit 外链与监控**  
   - **动作**：按《Reddit驱动的表格工具流量提升方案》等，在 r/excel、r/googlesheets 等回答中链到**具体工具页**（如 /formulas/vlookup、/tools/remove-duplicates），并记录在案；同时在 GSC/Bing 监控索引与点击。

---

## 四、可执行方案（与 OpenSpec / 按顺序可执行方案衔接）

| 序号 | 改进项 | 类型 | 主要文件 | 验收标准 |
|------|--------|------|----------|----------|
| 1 | 全公式 Meta 定制 | 数据/配置 | `lib/formulas.ts` | 每个公式的 title、metaDescription 独有，无仅换函数名的套话 |
| 2 | 公式页 OG/Twitter 描述与 Meta 一致 | 代码 | `app/formulas/[slug]/page.tsx` | OG 与 Twitter description 使用 formula.metaDescription或等价短句 |
| 3 | 前 10 大公式 FAQ 补全且去通用化 | 数据 | `lib/formulas.ts` | 前 10 大公式均有 faq[]，且问题为该公式特有 |
| 4 | Common Errors & Fixes 区块 | 类型+数据+页面 | `lib/formulas.ts`、`app/formulas/[slug]/page.tsx` | 每公式页有独立错误排查区块，内容按公式差异化 |
| 5 | 前 10 大公式场景化教程 | 内容 | `lib/formulas.ts` richContent | 每篇约 800–1000 字，场景+案例（+ 截图占位） |
| 6 | 关键词与 URL 映射表 | 文档 | `执行/关键词与URL映射表.md` | 约 50 个核心 URL，关键词组与之一一对应，无内竞 |
| 7 | 行业页扩展至 6–10 个 | 数据+路由 | `lib/use-cases.ts`、sitemap | use-cases 列表含 6–10 个行业，sitemap 含新 URL |
| 8 | 对比页新增 2–5 个 | 路由+内容 | `app/compare/*`、sitemap | 新对比页 metadata 与正文针对对应关键词 |
| 9 | Reddit 外链与 GSC/Bing 监控 | 运营 | 文档记录 + GSC/Bing | 回答中链到具体工具页；定期看索引与点击 |

建议**先做 1–3（P0）**，再按资源做 4–6（P1），最后做 7–9（P2）。可与现有《按顺序可执行方案》中的「阶段 3：工具目录提交」并行。

---

## 五、总结

- **原则**：质量大于数量；一个关键词组一个极致页面；每个页面具备独有 Meta、独有 FAQ、独有输入与独有错误排查，拒绝「只换公式名」的模板化。  
- **现状**：站点已具备单页一词组、差异化输入、部分定制 Meta 与 FAQ、结构化数据与 Sitemap；差距主要在**全公式 Meta 定制、FAQ 覆盖与去通用化、Common Errors 独立区块、场景化教程体量、OG 描述差异化**。  
- **下一步**：优先完成 P0（Meta 审计与定制、OG 与 Meta 一致、前 10 大公式 FAQ 补全），再按上表推进 P1/P2，并与既有执行文档和 OpenSpec 变更对齐（必要时为「精品化 Meta/FAQ/Errors」单独建 change 或任务清单）。

---

**参考文档**

- 需求/精品化垂直站SEO重构路线图.md  
- 需求/SEO 精品化战略：拒绝模板化与提升页面权重.md  
- 执行/GetSheetMaster.com 按顺序可执行方案.md  
- 执行/GetSheetMaster.com 方案总览与落实需求.md  

---

*文档生成时间：2026-02-01*
