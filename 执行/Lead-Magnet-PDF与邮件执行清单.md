# Lead Magnet PDF 与邮件执行清单

**用途**：将阶段 2b（速查表 PDF 内容、版式、欢迎邮件序列、可选弹窗）展开为可勾选步骤，便于设计与运营按项执行。  
**依据**：`需求/高转化率Excel速查表设计指南.md`、`执行/GetSheetMaster.com 按顺序可执行方案.md` 第三节 2b  
**邮件服务**：欢迎邮件 + 序列需**自动化**；Mailchimp 免费计划无自动化，**首选 Sender**（2,500 联系人、15,000 封/月、自动化支持较好），或 Brevo / MailerLite（见 `需求/Mailchimp替代工具的免费计划详细对比表.md`、`执行/Lead-Magnet-对接说明.md`）。

---

## 一、2b.1 速查表 PDF 内容与结构

**目标**：4–8 页、A4 或 Letter、高对比度、可打印；按「场景」分类，不按 A–Z。

### 内容模块（按优先级勾选）

- [ ] **The Big 5（必杀技区）** — 第一页最显眼位置  
  - [ ] VLOOKUP（查找）+ 参数图解（如 Look_value = "你要找谁？"）  
  - [ ] IF（逻辑）  
  - [ ] SUMIF（条件求和）  
  - [ ] INDEX MATCH（高级查找）  
  - [ ] XLOOKUP（现代查找）  

- [ ] **数据清洗急救包 (Data Cleaning Kit)**  
  - [ ] TRIM（去空格）  
  - [ ] 去重思路（REMOVE DUPLICATES / UNIQUE）  
  - [ ] TEXTSPLIT（分列）  
  - [ ] PROPER / UPPER（大小写规范）  

- [ ] **时间与日期管家**  
  - [ ] DATEDIF（算工龄）  
  - [ ] NETWORKDAYS（算工作日）  
  - [ ] EOMONTH（算到期日）  

- [ ] **报错自查表 (Troubleshooting)**  
  - [ ] #N/A 常见原因及一句话修复  
  - [ ] #VALUE! 常见原因及修复  
  - [ ] #REF! 常见原因及修复  

- [ ] **快捷键附录**  
  - [ ] Top 10 快捷键一页图（Windows / Mac 对照）  

### 进阶（可选）

- [ ] **Bonus：3 个模板链接**（Finance、HR、Inventory）— 提升感知价值，见设计指南 5

### 格式与体量

- [ ] 总页数控制在 4–8 页  
- [ ] 尺寸：A4 或 Letter，保留适当页边距  
- [ ] 配色：高对比度（黑/白/品牌色），避免深色背景（省墨、易读）

### PDF 源文件与导出

- **源文件**：`sheetmaster/public/cheat-sheet.html`（已按 2b.1 内容与 2b.2 版式生成）
- **导出 PDF**：用浏览器打开该 HTML → **打印 (Ctrl+P / Cmd+P)** → 目标选「**另存为 PDF**」→ 保存后上传至邮件服务或 CDN，用于欢迎邮件中的下载链接/附件。

---

## 二、2b.2 版式与品牌

**目标**：PDF 终稿与网站「非 AI」定位一致，强调可打印性。

- [ ] **页眉或页脚**：标注 **"SheetMaster - Precise formulas, not AI guesswork"**（精准公式，拒绝 AI 瞎猜）  
- [ ] **可打印性**：白底或浅色底、清晰字体、适合打印后放桌边  
- [ ] **品牌一致**：与 getsheetmaster.com 主色/字体风格一致（可选）

---

## 三、2b.3 欢迎邮件序列

**目标**：订阅后 1 分钟内收到首封邮件；第 3 天、第 7 天再发一封，巩固留存。

### 立即发送（第 0 天）

- [ ] **邮件标题**：*"Here is your Cheat Sheet! (+ a surprise inside)"*（或等价英文）  
- [ ] **正文**：含速查表 PDF 下载链接（或附件）  
- [ ] **自动化**：在邮件服务（**首选 Sender**；或 Brevo / MailerLite，免费支持自动化）中配置「新订阅者加入即触发」  
- [ ] **测试**：用真实邮箱订阅，确认 1 分钟内收到

### 第 3 天

- [ ] **邮件标题**：如 *"3 VLOOKUP hacks most people don't know"*  
- [ ] **正文**：链回网站博客（如 /blog/vlookup-vs-xlookup-2026 或相关文章）  
- [ ] **自动化**：在 Sender / Brevo / MailerLite 的 Automation 中设置「订阅后第 3 天」发送

### 第 7 天

- [ ] **邮件标题**：如 *"One template to rule your inventory"*（或等价）  
- [ ] **正文**：分享一个真实案例模板（如库存管理表）或链到 /solutions/inventory-manager  
- [ ] **自动化**：在 Sender / Brevo / MailerLite 的 Automation 中设置「订阅后第 7 天」发送

### 验收

- [ ] 至少完成「立即发送」+ 一次测试（1 分钟内收到）  
- [ ] 第 3 天、第 7 天邮件已配置并测试（可选）

---

## 四、2b.4 弹窗 / 侧栏（可选）

**目标**：若使用 Hello Bar 或邮件服务内置弹窗，与 2a 表单统一 endpoint，避免重复配置。

- [ ] **触发方式**（任选）：  
  - [ ] Exit Intent Pop-up（退出意图弹窗）  
  - [ ] 侧栏悬浮（教程页/博客右侧常驻）  
- [ ] **文案**：主标题用 "Stop Googling Formulas Every Time" 或 "Download the Ultimate Excel Cheat Sheet (Top 50 Formulas)"；CTA "Send me the PDF"  
- [ ] **Endpoint**：与 `/resources` 页表单一致（同一 List/同一 API），见 `执行/Lead-Magnet-对接说明.md`  
- [ ] **工具**：Hello Bar 免费版 或 Brevo / MailerLite / Mailchimp 内置弹窗（按需选择）

---

## 五、总体验收（阶段 2）

- [ ] **2b.1** 内容大纲已定稿，PDF 初稿至少含 The Big 5 + 报错自查表  
- [ ] **2b.2** PDF 终稿已输出，页眉/页脚含 SheetMaster Slogan  
- [ ] **2b.3** 欢迎邮件「立即发送」已上线并测试通过；第 3/7 天已配置（可选）  
- [ ] **2b.4** 弹窗/侧栏已配置（可选）且 endpoint 与 2a 统一  

---

## 六、参考文档

- 需求/高转化率Excel速查表设计指南.md  
- 执行/GetSheetMaster.com 按顺序可执行方案.md（第三节 2b）  
- 执行/Lead-Magnet-对接说明.md（endpoint、首选 Sender / Brevo/MailerLite/Mailchimp、测试步骤）
- 需求/Mailchimp替代工具的免费计划详细对比表.md  

---

*文档生成时间：2026-02-01*
