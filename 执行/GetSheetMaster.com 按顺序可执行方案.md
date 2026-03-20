# GetSheetMaster.com 按顺序可执行方案

**编制日期**: 2026-02-01  
**用途**: 在既有方案与落实需求基础上，将「行业专题页 → Lead Magnet 闭环 → 工具目录提交」整合为**严格按顺序可执行**的行动清单。  
**依据**: `执行/GetSheetMaster.com 方案总览与落实需求.md`、`执行/GetSheetMaster.com 落实需求清单（开发任务）.md`、`需求/高转化率Excel速查表设计指南.md`、`需求/Excel公式工具SEO与增长执行方案.md`

---

## 一、执行状态总览

| 阶段 | 内容 | 状态 | 说明 |
|------|------|------|------|
| **阶段 0** | 技术 SEO + 首页 + 博客 + 资源页 + 工具页 + 对比页 + 分享与相关公式 | ✅ 已完成 | Meta、FAQ、首页模块、/blog、/resources、/tools、/compare、分享按钮、Related Formulas 已落地 |
| **阶段 1** | 行业专题页 | ⬜ 待执行 | 见下文第二节 |
| **阶段 2** | Lead Magnet 闭环（订阅入口 + PDF 与邮件） | ⬜ 待执行 | 见下文第三节 |
| **阶段 3** | 工具目录提交 | ⬜ 待执行 | 见下文第四节 |

**执行原则**：按 1 → 2 → 3 顺序执行；阶段 2 内先做 2a（订阅入口与对接），再做 2b（PDF 与邮件执行清单）。

---

## 二、阶段 1：行业专题页（先做）

**目标**：与首页「Industry Solutions」衔接，做垂直场景落地页，提升 SEO 与转化价值。

### 2.1 路由与数据结构

| 序号 | 任务 | 文件/位置 | 具体内容 |
|------|------|-----------|----------|
| 1.1 | 行业数据源 | `lib/use-cases.ts`（新建） | 类型 `UseCase { slug, title, description, metaDescription?, formulas[], tools[], painPoints?, ctaText? }`；首批 2 个：`accountants`、`data-analysts`（可再扩展 hr、e-commerce、marketing） |
| 1.2 | 行业列表页 | `app/use-cases/page.tsx`（新建） | 列出所有 use-cases，标题「Industry Solutions」或「Use Cases」，卡片链接到 /use-cases/[slug]；metadata、canonical、OG |
| 1.3 | 行业详情页 | `app/use-cases/[slug]/page.tsx`（新建） | generateStaticParams 从 use-cases 生成；generateMetadata(slug) 动态；内容：痛点简述、推荐公式与工具（链接到 /formulas/xxx、/tools/xxx）、CTA（如「Try [Formula]」） |
| 1.4 | Sitemap | `app/sitemap.ts` | 增加 /use-cases、/use-cases/[slug] 的 URL，priority 约 0.7 |
| 1.5 | 导航/首页入口 | `app/layout.tsx` 或 `app/page.tsx` | 首页「Industry Solutions」区块中的卡片链接到 /use-cases/[slug]（若当前链到 solutions 可保留，新增或改为 use-cases）；导航可选增加「Use Cases」链接到 /use-cases |

### 2.2 首批行业页内容要点（供 lib/use-cases.ts 填写）

| slug | 标题（示例） | 推荐公式/工具 |
|------|--------------|----------------|
| accountants | Excel for Accountants | VLOOKUP, SUMIF, IF, 贷款/摊销类 solutions |
| data-analysts | Excel for Data Analysts | INDEX MATCH, XLOOKUP, 去重 /tools/remove-duplicates，文本分割 /tools/split-text |

### 2.3 验收与自检

- [ ] `/use-cases` 可访问，列表展示至少 2 个行业
- [ ] `/use-cases/accountants`、`/use-cases/data-analysts` 可访问，含推荐公式与工具链接
- [ ] `sitemap.xml` 包含上述 URL
- [ ] 首页 Industry Solutions 可跳转到对应 use-case 或保留现有 solutions 并增加 use-cases 入口

---

## 三、阶段 2：Lead Magnet 闭环

**目标**：让访客留下邮箱，通过速查表 PDF + 欢迎邮件建立留存与复访。

### 3.1 阶段 2a：邮件订阅入口与对接（先做）

| 序号 | 任务 | 文件/位置 | 具体内容 |
|------|------|-----------|----------|
| 2a.1 | Resources 页订阅表单 | `app/resources/page.tsx` | 在 Lead Magnet 列表上方或每个资源卡片旁增加「订阅获取 PDF」：输入邮箱 + 提交按钮；表单 action 指向 Brevo / MailerLite / Mailchimp signup URL 或后端 API（见 2a.3） |
| 2a.2 | 首页/公式页入口（可选） | `app/page.tsx` 或 `app/formulas/[slug]/page.tsx` | 在合适位置增加轻量 CTA：「下载 Excel 速查表 PDF →」链接到 /resources，或嵌入式简短表单（与 2a.1 一致） |
| 2a.3 | 对接说明文档 | `执行/Lead-Magnet-对接说明.md`（新建） | 写明：当前表单提交到哪个 endpoint（推荐 Brevo / MailerLite，免费含自动化；或 Mailchimp / 自建 API）；所需字段（email、可选 name）；如何与「欢迎邮件 + PDF 附件/链接」串联；测试步骤（提交后 1 分钟内收到邮件）。见《Mailchimp替代工具的免费计划详细对比表》 |

**文案建议**（与《高转化率Excel速查表设计指南》一致）  
- 主标题："Download the Ultimate Excel Cheat Sheet (Top 50 Formulas)" 或 "Stop Googling Formulas Every Time"  
- 副标题："Join 5,000+ pros saving 2 hours a week."（可按实际调整）  
- CTA 按钮："Send me the PDF" 或「发送 PDF 给我」

### 3.2 阶段 2b：PDF 与邮件执行清单（文档，运营执行）

| 序号 | 任务 | 产出 | 具体内容 |
|------|------|------|----------|
| 2b.1 | 速查表 PDF 内容与结构 | 内容大纲/清单 | 按《高转化率Excel速查表设计指南》：The Big 5（VLOOKUP/IF/SUMIF/INDEX MATCH/XLOOKUP）、数据清洗急救包、时间与日期、报错自查表、快捷键附录；4–8 页，A4/Letter，高对比度、可打印 |
| 2b.2 | 版式与品牌 | PDF 终稿 | 页眉/页脚标注 "SheetMaster - Precise formulas, not AI guesswork"；与网站「非 AI」定位一致 |
| 2b.3 | 欢迎邮件序列 | 邮件标题 + 正文要点 | 立即发送：标题 "Here is your Cheat Sheet! (+ a surprise inside)"，正文含 PDF 下载链接；第 3 天：如 "3 VLOOKUP hacks most people don't know" 链回博客；第 7 天：案例模板（如库存管理）巩固留存 |
| 2b.4 | 弹窗/侧栏（可选） | 配置说明 | 若使用 Hello Bar 或邮件服务弹窗（推荐 Sender / Brevo / MailerLite 等）：Exit Intent 文案、侧栏常驻页；与 2a 表单统一 endpoint |

**执行清单文档**：建议新建 `执行/Lead-Magnet-PDF与邮件执行清单.md`，将 2b.1–2b.4 展开为可勾选步骤，便于设计与运营按项执行。

### 3.3 验收与自检（阶段 2）

- [ ] /resources 页有订阅表单，提交后能到达推荐 Sender / Brevo / MailerLite / Mailchimp 或指定 API
- [ ] 对接说明文档已编写，含 endpoint、字段、测试步骤
- [ ] （2b）PDF 内容清单与欢迎邮件序列已写入执行清单文档；PDF 终稿与自动回复按清单配置

---

## 四、阶段 3：工具目录提交

**目标**：获取外链与曝光，提升域名权威（DR）。

### 4.1 提交清单与文案模板

| 序号 | 任务 | 产出 | 具体内容 |
|------|------|------|----------|
| 3.1 | 统一文案 | Tagline / Short Description / 功能点列表 | 一句话：如 "Free Excel & Google Sheets formula generator. No signup, no AI—precise formulas in seconds."；短描述 2–3 句；5–8 条功能点（50+ 公式、去重/分列工具、速查表下载等） |
| 3.2 | 平台清单 | 提交清单文档 | 列出 Product Hunt、AlternativeTo、G2、Capterra、SaaSHub 等 5–10 个目录；每项注明：链接、所需材料（截图/Logo/描述）、提交状态（待提交/已提交/已上线） |
| 3.3 | 截图与素材 | 素材包 | 首页、公式生成器、工具页各 1–2 张截图；Logo 透明底；统一尺寸建议（如 1200×630 OG 图） |

**执行文档**：建议新建 `执行/工具目录提交清单与文案.md`，将 3.1–3.3 合并为一份可勾选、带填空的模板，便于按平台逐项提交。

### 4.2 验收与自检

- [ ] 统一 Tagline/Short Description/功能点已定稿
- [ ] 工具目录提交清单文档已创建，至少 5 个平台已列明
- [ ] 至少 2 个平台已实际提交（如 Product Hunt、AlternativeTo）

---

## 五、按顺序执行的总清单（勾选用）

**阶段 1：行业专题页**  
- [ ] 1.1 创建 `lib/use-cases.ts`，至少 2 个行业数据  
- [ ] 1.2 创建 `app/use-cases/page.tsx`  
- [ ] 1.3 创建 `app/use-cases/[slug]/page.tsx`  
- [ ] 1.4 更新 `app/sitemap.ts`  
- [ ] 1.5 首页/导航与 use-cases 入口衔接  

**阶段 2a：订阅入口与对接**  
- [ ] 2a.1 Resources 页订阅表单  
- [ ] 2a.2 首页或公式页 CTA（可选）  
- [ ] 2a.3 编写 `执行/Lead-Magnet-对接说明.md`  

**阶段 2b：PDF 与邮件**  
- [ ] 2b.1 编写 `执行/Lead-Magnet-PDF与邮件执行清单.md` 并填写内容结构  
- [ ] 2b.2 制作速查表 PDF 终稿  
- [ ] 2b.3 配置欢迎邮件序列（第 0/3/7 天）  
- [ ] 2b.4 弹窗/侧栏配置（可选）  

**阶段 3：工具目录提交**  
- [ ] 3.1 定稿 Tagline、Short Description、功能点  
- [ ] 3.2 编写 `执行/工具目录提交清单与文案.md`  
- [ ] 3.3 准备截图与素材  
- [ ] 3.4 至少提交 2 个目录并记录状态  

---

## 六、成功指标（与方案总览一致）

| 时间 | 有机流量 | 关键词/索引 | 留存 |
|------|----------|-------------|------|
| 1 个月 | +15–20% | 5–8 个长尾词 Top 20 | 邮件订阅 100–200 |
| 2–3 个月 | +35–40% | 12–15 个词 Top 10 | 500–800 订阅 |
| 4–6 个月 | +60%+ | 20+ 词 Top 5 | 1,500–2,500 订阅 |

---

## 七、参考文档

- 方案总览：`执行/GetSheetMaster.com 方案总览与落实需求.md`  
- 开发任务清单：`执行/GetSheetMaster.com 落实需求清单（开发任务）.md`  
- 高转化率速查表设计：`需求/高转化率Excel速查表设计指南.md`  
- Lead Magnet 对接与邮件服务选择：`执行/Lead-Magnet-对接说明.md`；`需求/Mailchimp替代工具的免费计划详细对比表.md`  
- SEO 与增长执行方案：`需求/Excel公式工具SEO与增长执行方案.md`  

---

*文档生成时间：2026-02-01*
