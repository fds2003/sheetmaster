# GetSheetMaster.com 方案总览与落实需求

**编制日期**: 2026-02-01  
**依据**: `需求/` 目录下多平台分析报告与 `sheetmaster/` 源码现状  
**目标**: 将各平台建议收敛为可执行方案，并与代码库对齐的落实需求

---

## 一、需求分析摘要（来自各平台报告）

### 1.1 共识结论

| 维度 | 现状 | 各报告一致建议 |
|------|------|----------------|
| **技术基础** | Next.js 14 + 动态元数据 + Sitemap + Vercel Analytics + Ahrefs | 保持；补全 FAQ Schema、核心页 Meta 优化 |
| **产品功能** | 50+ 公式生成器 + 6 个 Solutions（数据清洗、贷款等） | 扩展专用工具页（去重、文本分割）、博客、行业专题 |
| **内容生态** | 无博客/教程/资源中心 | **P0**：建博客栏目 + Lead Magnet（速查表 PDF）+ 邮件订阅 |
| **用户留存** | 无邮件订阅、无模板下载 | **P0**：邮件订阅漏斗 + 免费资源下载 |
| **社交与传播** | 无分享按钮、无社媒链接 | **P1**：分享按钮 + Reddit/LinkedIn 运营 |
| **外链与曝光** | 未系统提交目录、无客座博客 | **P1**：Product Hunt / AlternativeTo / G2 等目录 + Reddit 回答 |
| **差异化** | 与 AI 公式生成器功能重叠 | 强调「非 AI、精准控制、教育价值」 |

### 1.2 优先级（各报告交叉验证）

- **P0（立刻执行）**  
  - 技术 SEO：5 个核心公式页 Meta 优化、FAQ Schema 补全  
  - 内容入口：博客栏目搭建 + 首批 5 篇「how to」文章  
  - 留存：Lead Magnet（Excel 公式速查表 PDF）+ 邮件订阅  

- **P1（2–4 周内）**  
  - 工具目录提交（Product Hunt、AlternativeTo、Capterra、G2 等）  
  - Reddit/社区营销（r/excel、r/googlesheets）  
  - 社交分享按钮（Twitter、LinkedIn、Copy Link）  

- **P2（1–3 个月）**  
  - 新增专用工具页：去重、文本分割、公式解释器  
  - 对比页（VLOOKUP vs XLOOKUP 等）、行业专题（use-cases）  
  - 持续博客 + 外链建设  

### 1.3 需规避

- 不堆「1000 页」薄内容，避免被判 Thin Content  
- 不主攻「AI formula generator」红海，改用「error-proof / formula generator」等  
- 文档与命名统一：产品名 **SheetMaster**，站点 **getsheetmaster.com**

---

## 二、可执行方案（分阶段）

### 阶段一：技术 SEO + 快速内容（第 1–2 周）

| 行动项 | 目标 | 产出 |
|--------|------|------|
| 优化 5 个核心公式页 Meta | 提高点击率 | VLOOKUP / IF / SUMIF / INDEX MATCH / XLOOKUP 的 title、metaDescription 按关键词清单优化 |
| 为核心公式补全 FAQ Schema | 富结果/问答框 | 在 `lib/formulas.ts` 为上述 5 个公式增加 `faq[]`，JsonLd 已支持输出 FAQPage |
| 首页 H1 与模块优化 | 首页关键词与转化 | H1 含「Free Excel & Google Sheets Formula Generator」；新增 Why SheetMaster、Most Popular、Industry Solutions 模块 |
| 提交工具目录 | 外链 + 曝光 | 准备统一 Tagline/Short Description，提交 5–10 个目录 |

### 阶段二：内容营销 + 留存（第 3–6 周）

| 行动项 | 目标 | 产出 |
|--------|------|------|
| 博客栏目 | 捕获 how-to 长尾流量 | 路由 `/blog`、`/blog/[slug]`，数据源 `lib/posts.ts`，首批 5 篇文章 |
| Lead Magnet + 邮件订阅 | 留存与复访 | 速查表 PDF；首页/工具页订阅入口；欢迎邮件序列（**推荐 Sender**，免费 2,500 联系人、15,000 封/月且含自动化；或 Brevo / MailerLite / Mailchimp / 自建 API） |
| Reddit 社区营销 | 精准流量 + 品牌 | 固定节奏：每周回答 5 个问题，每月 1 篇教程帖，模板化回答+工具链接 |

### 阶段三：功能扩展与行业深耕（第 2–3 个月）

| 行动项 | 目标 | 产出 |
|--------|------|------|
| 专用工具页 | 高搜索量关键词 | `/tools/remove-duplicates`、`/tools/split-text`（需求文档已给数据结构） |
| 对比页 | 对比类关键词 | `/compare/vlookup-vs-xlookup` 等，对比表 + 双生成器嵌入 |
| 行业专题 | 垂直场景 | `/use-cases/accountants`、`data-analysts`、`hr`、`e-commerce`、`marketing` |
| 公式解释器（可选） | 长尾与留存 | `/tools/formula-explainer`：输入公式，输出分步解释 |

---

## 三、与 sheetmaster 源码对齐的落实需求

### 3.1 代码库现状摘要

| 模块 | 路径 | 现状 |
|------|------|------|
| 全局 Meta | `app/layout.tsx` | 已有 metadataBase、keywords、OpenGraph、Twitter、robots |
| 首页 | `app/page.tsx` | 有 metadata、Hero、Solutions、FormulaGrid；H1 未按需求优化，缺「Why SheetMaster」等模块 |
| 公式详情 | `app/formulas/[slug]/page.tsx` | generateMetadata 动态、canonical、OG；已用 JsonLd + BreadcrumbJsonLd |
| 结构化数据 | `components/JsonLd.tsx` | 已支持 SoftwareApplication、HowTo、**FAQPage**（依赖 formula.faq） |
| 公式配置 | `lib/formulas.ts` | 含 title、metaDescription、faq、howToSteps 等；部分公式缺 faq 或 faq 不足 |
| Solutions | `app/solutions/[slug]/page.tsx`、`lib/solutions.ts` | 已有 6 个解决方案，sitemap 已包含 |
| Sitemap | `app/sitemap.ts` | 已包含首页、privacy、terms、所有 formulas、所有 solutions |
| Robots | `app/robots.ts` | 已配置 |
| 导航 | `app/layout.tsx` | 仅 Logo，无主导航（Home/Tools/Blog/About 等） |

### 3.2 落实需求清单（按实现位置）

#### A. 立即可做（不改路由，只改配置与文案）

| # | 需求 | 文件/位置 | 具体改动 |
|---|------|-----------|----------|
| A1 | 5 个核心公式页 Meta 优化 | `lib/formulas.ts` | 对 slug 为 vlookup、if、sumif、index-match、xlookup 的项，将 `title`、`metaDescription` 改为需求文档中的优化版本（含关键词、No Signup、Excel & Google Sheets） |
| A2 | 上述 5 个公式补全 FAQ | `lib/formulas.ts` | 为每项增加 `faq: FormulaFAQ[]`，至少 5–8 个问答（如 What does VLOOKUP do? Why #N/A? Can VLOOKUP look left?），与需求/功能优化文档中的 FAQ 示例一致 |
| A3 | 首页 H1 与副标题优化 | `app/page.tsx` | H1 改为「Free Excel & Google Sheets Formula Generator - 50+ Tools」；副标题可强调「No signup, instant results」 |
| A4 | 首页「Why SheetMaster」模块 | `app/page.tsx` | 在 Hero 与 Solutions 之间新增一节：3 条卖点（免费、无需注册、非 AI/精准控制），可配简短图标或列表 |
| A5 | 首页「Most Popular Formulas」模块 | `app/page.tsx` | 在 FormulaGrid 前增加一节，链接到 VLOOKUP、IF、SUMIF 等 3–5 个公式页 |
| A6 | 首页「Industry Solutions」模块 | `app/page.tsx` | 已有 Solutions 区块，可改标题为「Industry Solutions」并加副标题，强调 6 个解决方案入口 |
| A7 | 全局 description 去「AI-powered」 | `app/layout.tsx` | 定位为「非 AI」时，将 default description 中的「AI-powered」改为「No AI, no signup」等表述，与定位语一致 |

#### B. 新增路由与数据（博客、工具页、对比页、资源页）

| # | 需求 | 文件/位置 | 具体改动 |
|---|------|-----------|----------|
| B1 | 博客列表页 | `app/blog/page.tsx`（新建） | 从 `lib/posts.ts` 读取列表，展示标题、摘要、日期；metadata、canonical、OG |
| B2 | 博客文章页 | `app/blog/[slug]/page.tsx`（新建） | generateStaticParams 从 posts 生成；generateMetadata 动态；正文 markdown 或 HTML；可选 JsonLd Article |
| B3 | 博客数据源 | `lib/posts.ts`（新建） | 类型 Post{ slug, title, description, date, content 或 body }；首批 5 篇与「优先行动」文档中的标题一致 |
| B4 | Sitemap 包含博客 | `app/sitemap.ts` | 增加 blog 与 blog/[slug] 的 URL，priority 约 0.7 |
| B5 | 专用工具：去重 | `app/tools/remove-duplicates/page.tsx`（新建）+ 可选 `lib/tools/remove-duplicates.ts` | 页面含多子工具（Unique、Keep First、Keep Latest、Count Duplicates 等），公式生成逻辑可参考需求/功能优化文档中的代码片段 |
| B6 | 专用工具：文本分割 | `app/tools/split-text/page.tsx`（新建）+ 可选 `lib/tools/split-text.ts` | TEXTSPLIT、Extract First/Last Name、Split by comma 等，同上参考需求文档 |
| B7 | 对比页：VLOOKUP vs XLOOKUP | `app/compare/vlookup-vs-xlookup/page.tsx`（新建） | 对比表、适用场景、嵌入两个生成器或链接到 /formulas/vlookup 与 /formulas/xlookup；metadata 针对 "vlookup vs xlookup" |
| B8 | 资源/Lead Magnet 页 | `app/resources/page.tsx`（新建） | 列出速查表 PDF 等资源；下载 CTA；邮件订阅表单（form action 接**推荐 Sender** / Brevo / MailerLite / Mailchimp 或自建 API，见 Lead-Magnet-对接说明） |
| B9 | 导航增加 Blog / Resources | `app/layout.tsx` | 在 nav 中增加 Blog、Resources 链接（及可选 Tools、Compare） |

#### C. 交互与传播

| # | 需求 | 文件/位置 | 具体改动 |
|---|------|-----------|----------|
| C1 | 公式结果区分享按钮 | `components/FormulaBuilder.tsx` 或 `InteractiveFormulaBuilder.tsx` | 在「Copy」旁增加「Share to Twitter」「Share to LinkedIn」「Copy Link」，文案可固定为「Just generated this [FUNC] formula with SheetMaster…」 |
| C2 | 相关公式推荐 | `app/formulas/[slug]/page.tsx` 或新组件 | 页底增加「Related Formulas」：根据 category 或预定义映射展示 3–5 个公式链接 |

#### D. 与 openspec 的对应关系

| 需求/方案项 | openspec 引用 |
|-------------|----------------|
| 博客栏目 | 可对应 `openspec/changes/add-solution-pages` 或新建 change「add-blog」 |
| Solutions、公式页 SEO | 已有 `openspec/specs/seo/spec.md`、`openspec/specs/formulas/spec.md`、`openspec/specs/solutions/spec.md` |
| FAQ Schema | `openspec/specs/seo/spec.md` 可补充「FAQPage 结构化数据」场景；实现已在 JsonLd + formulas.faq |

---

## 四、执行顺序建议

1. **本周**：完成 A1–A7（Meta、FAQ、首页模块与文案），无需新路由。  
2. **第 2 周**：完成 B1–B4（博客栏目 + sitemap），可选先发 2 篇博客。  
3. **第 3–4 周**：完成 B8–B9、C1–C2（Resources 页、导航、分享与相关公式）。  
4. **第 5 周起**：B5–B7（去重/分割工具、对比页），并按节奏发布博客与 Reddit/目录推广。

---

## 五、成功指标（与各报告对齐）

| 时间 | 有机流量 | 关键词/索引 | 留存 |
|------|----------|-------------|------|
| 1 个月 | +15–20% | 5–8 个长尾词 Top 20，GSC 监控 | 邮件订阅 100–200 |
| 2–3 个月 | +35–40% | 12–15 个词 Top 10 | 500–800 订阅 |
| 4–6 个月 | +60%+ | 20+ 词 Top 5 | 1,500–2,500 订阅 |

---

## 六、参考文档索引

- **按顺序可执行方案**（推荐优先使用）：`执行/GetSheetMaster.com 按顺序可执行方案.md`  
- 落实需求清单（开发任务）：`执行/GetSheetMaster.com 落实需求清单（开发任务）.md`  
- 高转化率速查表设计：`需求/高转化率Excel速查表设计指南.md`  
- Lead Magnet 对接与邮件服务：`执行/Lead-Magnet-对接说明.md`；邮件服务对比：`需求/Mailchimp替代工具的免费计划详细对比表.md`  
- SEO 与增长执行方案：`需求/Excel公式工具SEO与增长执行方案.md`  
- 需求总览与优先行动：`需求/GetSheetMaster.com网站分析与优先行动建议.md`  
- 需求分析总结与文档结构建议：`需求/GetSheetMaster.com需求分析总结与完善方案.md`  
- 功能与 SEO 优化细节：`需求/GetSheetMaster.com功能优化与新增建议.md`  
- 技术 SEO与体验：`需求/GetSheetMaster.com 技术SEO与用户体验优化.md`  
- 精准关键词与 30 天执行清单：`需求/GetSheetMaster.com精准SEO关键词策略(可直接执行).md`  
- 流量提升三阶段：`需求/GetSheetMaster.com流量提升策略.md`  
- 项目与 SEO 规范：`openspec/project.md`、`openspec/specs/seo/spec.md`

---

*文档生成时间：2026-02-01；执行状态与后续顺序更新：2026-02-01*
