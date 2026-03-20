# GetSheetMaster.com 落实需求清单（开发任务）

**用途**: 与 sheetmaster 源码一一对应的开发任务清单，便于按优先级逐项实现。  
**对应方案**: `执行/GetSheetMaster.com 方案总览与落实需求.md`  
**按顺序执行**：见 `执行/GetSheetMaster.com 按顺序可执行方案.md`（阶段 1→2→3）

---

## Phase 1：技术 SEO + 首页（不改路由）

### 1.1 公式页 Meta 与 FAQ（lib/formulas.ts）

| 任务 ID | 公式 slug | 当前 title（示例） | 目标 title | 目标 metaDescription（要点） |
|---------|-----------|-------------------|------------|------------------------------|
| F1 | vlookup | 已有优化版 | Free VLOOKUP Generator - Excel & Google Sheets \| No Signup | 含 VLOOKUP、examples、error fixes、#N/A、No signup |
| F2 | if | Free IF Formula Generator | IF Formula Generator - Create IF-THEN Statements Free | IF-THEN、Excel & Sheets、free |
| F3 | sumif | Free SUMIF Formula Generator | SUMIF Generator - Sum with Conditions \| Excel & Sheets | conditional sum、SUMIF/SUMIFS |
| F4 | index-match | Free INDEX & MATCH Generator | INDEX MATCH Generator - More Powerful Than VLOOKUP | INDEX MATCH、VLOOKUP alternative |
| F5 | xlookup | Free XLOOKUP Formula Generator | XLOOKUP Generator - Modern VLOOKUP Replacement \| Free | XLOOKUP、VLOOKUP replacement |

**FAQ 数据**：为上述 5 个公式在 `lib/formulas.ts` 中增加 `faq: FormulaFAQ[]`，每项至少 5 个问答。示例（VLOOKUP）：
- What does VLOOKUP do in Excel?
- Why is my VLOOKUP returning #N/A?
- Can VLOOKUP look to the left?
- What is the difference between TRUE and FALSE in VLOOKUP?
- How do I use VLOOKUP with multiple criteria?

**验收**：`/formulas/vlookup` 等页面的 `<title>`、`<meta name="description">` 与需求一致；页面源码中含 FAQPage JSON-LD（JsonLd 组件已支持，只需在 formulas 中提供 faq）。

---

### 1.2 首页（app/page.tsx）

| 任务 ID | 位置 | 当前 | 目标 |
|---------|------|------|------|
| H1 | Hero H1 | SheetMaster - Free Excel Formula Generators | Free Excel & Google Sheets Formula Generator - 50+ Tools |
| H2 | Hero 副标题 | Master Excel & Google Sheets Formulas. Search or select... | 可加：No signup, instant results. Search or select a tool below. |
| H3 | 新增区块（Hero 与 Solutions 之间） | 无 | 「Why SheetMaster？」3 条卖点：Free / No signup、Not AI - full control、Learn every formula |
| H4 | 新增区块（FormulaGrid 前） | 无 | 「Most Popular Formulas」链接到 vlookup、if、sumif、index-match、xlookup |
| H5 | Solutions 区块标题 | 🔥 Popular Tools | 可保留或改为「Industry Solutions」+ 副标题 |

**验收**：首页 H1/副标题/新模块文案与方案一致；链接正确。

---

### 1.3 全局 Meta（app/layout.tsx）

| 任务 ID | 字段 | 当前 | 目标 |
|---------|------|------|------|
| L1 | description | 含 "AI-powered" | 改为强调 "No AI, no signup" 或 "Generate formulas instantly - no AI, no signup" |
| L2 | openGraph.description / twitter.description | 同上 | 与 default description 一致 |

**验收**：首页与公式页在社交分享时不再出现「AI-powered」，与「非 AI」定位一致。

---

## Phase 2：博客栏目

### 2.1 数据与类型（lib/posts.ts 新建）

| 任务 ID | 内容 |
|---------|------|
| P1 | 定义类型：`Post { slug, title, description, date, content? }` |
| P2 | 首批 5 篇：1) VLOOKUP vs XLOOKUP: Which Should You Use in 2026? 2) 5 Excel Formulas That Clean Messy Data 10x Faster 3) INDEX MATCH Complete Guide 4) Excel Formulas for E-commerce Inventory Management 5) SUMIF vs SUMIFS: When to Use Each (+Examples) |
| P3 | 每篇至少包含 title、description、date；content 可为 HTML 或 Markdown 路径，便于后续扩展 |

---

### 2.2 路由与页面

| 任务 ID | 文件 | 说明 |
|---------|------|------|
| P4 | `app/blog/page.tsx` | 列表页：从 lib/posts 读取，展示标题、摘要、日期；generateMetadata 固定；sitemap 需包含 /blog |
| P5 | `app/blog/[slug]/page.tsx` | 详情页：generateStaticParams 从 posts 生成；generateMetadata(slug) 动态；正文渲染 content；可选 Article JsonLd |
| P6 | `app/sitemap.ts` | 增加 blog、blog/[slug] 的 URL，priority 0.7 |

**验收**：/blog 可访问列表；/blog/[slug] 可访问 5 篇文章；sitemap.xml 含上述 URL。

---

## Phase 3：导航、资源页、分享与相关公式

### 3.1 导航（app/layout.tsx）

| 任务 ID | 内容 |
|---------|------|
| N1 | 在 nav 中增加链接：Blog（/blog）、Resources（/resources）；可选：Formulas（/）、Solutions 下拉或链接 |

---

### 3.2 资源页（app/resources/page.tsx 新建）

| 任务 ID | 内容 |
|---------|------|
| R1 | 页面标题：Resources 或 Free Resources |
| R2 | 列出 Lead Magnet：如「Excel 公式速查表 PDF（50 个常用公式）」 |
| R3 | CTA：下载或「订阅获取」；表单 action 接**推荐 Sender** / Brevo / MailerLite / Mailchimp 或自建 API（见 Lead-Magnet-对接说明） |
| R4 | metadata、canonical、OG |

---

### 3.3 分享按钮（FormulaBuilder / InteractiveFormulaBuilder）

| 任务 ID | 内容 |
|---------|------|
| S1 | 在「Copy」按钮旁增加：Share to Twitter、Share to LinkedIn、Copy Link |
| S2 | Twitter 分享 URL：`https://twitter.com/intent/tweet?text=...`，文案含公式摘要 + getsheetmaster.com |
| S3 | LinkedIn：`https://www.linkedin.com/sharing/share-offsite/?url=...` |
| S4 | Copy Link：复制当前页面 URL |

---

### 3.4 相关公式（app/formulas/[slug]/page.tsx）

| 任务 ID | 内容 |
|---------|------|
| R5 | 页底增加「Related Formulas」区块：根据 formula.category 或预定义映射（如 vlookup → index-match, xlookup, iferror）展示 3–5 个公式卡片/链接 |

---

## Phase 4：专用工具页与对比页（已完成）

*本 Phase 已实现；以下为任务记录供对照。*

### 4.1 去重工具（app/tools/remove-duplicates/page.tsx + lib/tools/remove-duplicates.ts）

| 任务 ID | 内容 |
|---------|------|
| T1 | 页面 title/metaDescription 针对 "remove duplicates excel formula"、"how to remove duplicates in excel" |
| T2 | 子工具：Get Unique、Remove Duplicates (Keep First)、Keep Latest Date、Count Duplicates、Highlight Duplicates；每项有简短说明与公式生成（可参考需求/功能优化文档中的代码片段） |
| T3 | sitemap 增加 /tools/remove-duplicates |

---

### 4.2 文本分割工具（app/tools/split-text/page.tsx + lib/tools/split-text.ts）

| 任务 ID | 内容 |
|---------|------|
| T4 | 页面针对 "split text in excel"、"text to columns excel formula" |
| T5 | 子工具：Split by Delimiter (TEXTSPLIT)、Extract First Name、Extract Last Name、Split by Comma 等 |
| T6 | sitemap 增加 /tools/split-text |

---

### 4.3 对比页（app/compare/vlookup-vs-xlookup/page.tsx）

| 任务 ID | 内容 |
|---------|------|
| T7 | 对比表：功能、语法、适用场景、错误处理等 |
| T8 | 嵌入或链接到 /formulas/vlookup 与 /formulas/xlookup |
| T9 | metadata 针对 "vlookup vs xlookup"；sitemap 增加 /compare/vlookup-vs-xlookup |

---

## Phase 5：行业专题页（按顺序可执行方案 · 阶段 1）

| 任务 ID | 文件/位置 | 说明 |
|---------|-----------|------|
| U1 | `lib/use-cases.ts`（新建） | 类型 UseCase{ slug, title, description, metaDescription?, formulas[], tools[], painPoints?, ctaText? }；首批 accountants、data-analysts |
| U2 | `app/use-cases/page.tsx`（新建） | 列表页：Industry Solutions / Use Cases，卡片链到 /use-cases/[slug]；metadata、canonical、OG |
| U3 | `app/use-cases/[slug]/page.tsx`（新建） | generateStaticParams、generateMetadata；痛点 + 推荐公式/工具链接 + CTA |
| U4 | `app/sitemap.ts` | 增加 /use-cases、/use-cases/[slug]，priority 约 0.7 |
| U5 | `app/page.tsx` 或 `app/layout.tsx` | 首页 Industry Solutions 链到 /use-cases/[slug]；导航可选「Use Cases」→ /use-cases |

**验收**：/use-cases、/use-cases/accountants、/use-cases/data-analysts 可访问；sitemap 含上述 URL。

---

## Phase 6：Lead Magnet 闭环（按顺序可执行方案 · 阶段 2）

**2a：订阅入口与对接**

| 任务 ID | 文件/位置 | 说明 |
|---------|-----------|------|
| L1 | `app/resources/page.tsx` | 订阅表单：邮箱 + 提交；action 指向**推荐 Sender** / Brevo / MailerLite / Mailchimp 或 API（Sender 免费 2,500 联系人、15,000 封/月且含自动化）；文案见《高转化率速查表设计指南》 |
| L2 | `app/page.tsx` 或公式页（可选） | CTA「下载速查表 PDF」链到 /resources 或嵌入式表单 |
| L3 | `执行/Lead-Magnet-对接说明.md`（新建） | endpoint、字段、与欢迎邮件串联、测试步骤 |

**2b：PDF 与邮件**（见 `执行/GetSheetMaster.com 按顺序可执行方案.md` 第三节 2b + 待建 `执行/Lead-Magnet-PDF与邮件执行清单.md`）

---

## Phase 7：工具目录提交（按顺序可执行方案 · 阶段 3）

| 任务 ID | 产出 | 说明 |
|---------|------|------|
| D1 | Tagline / Short Description / 功能点 | 统一文案，见按顺序可执行方案 4.1 |
| D2 | `执行/工具目录提交清单与文案.md`（新建） | 5–10 个目录、所需材料、提交状态 |
| D3 | 截图与素材 | 首页、公式页、工具页截图；Logo；OG 图建议 |

---

## 自检清单（按 Phase 勾选）

**Phase 1**（已完成）  
- [x] F1–F5：5 个公式的 title、metaDescription、faq 已更新  
- [x] H1–H5：首页 H1、副标题、Why SheetMaster、Most Popular、Industry Solutions 已实现  
- [x] L1–L2：layout 的 description 已去「AI-powered」  

**Phase 2**（已完成）  
- [x] P1–P3：lib/posts.ts 已建，5 篇文章数据就绪  
- [x] P4–P6：/blog、/blog/[slug]、sitemap 已实现  

**Phase 3**（已完成）  
- [x] N1：导航已加 Blog、Resources  
- [x] R1–R4：/resources 页已建  
- [x] S1–S4：分享按钮已加  
- [x] R5：公式页底「Related Formulas」已加  

**Phase 4**（已完成）  
- [x] T1–T3：/tools/remove-duplicates 已建  
- [x] T4–T6：/tools/split-text 已建  
- [x] T7–T9：/compare/vlookup-vs-xlookup 已建  

**Phase 5**（待执行 · 阶段 1）  
- [ ] U1–U5：行业专题页数据、列表、详情、sitemap、首页/导航衔接  

**Phase 6**（待执行 · 阶段 2）  
- [ ] L1–L3：订阅入口与对接说明；2b 见按顺序可执行方案  

**Phase 7**（待执行 · 阶段 3）  
- [ ] D1–D3：工具目录文案与提交清单  

---

*文档生成时间：2026-02-01；Phase 5–7 与按顺序可执行方案同步更新：2026-02-01*
