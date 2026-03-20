# Lead Magnet 对接说明

**用途**：Resources 页「订阅获取 PDF」表单与邮件服务（**推荐 Sender** / Brevo / MailerLite / Mailchimp / 自建 API）的对接方式、字段说明及测试步骤。  
**相关代码**：`sheetmaster/app/resources/page.tsx`、`sheetmaster/components/LeadMagnetSignupForm.tsx`  
**替代方案参考**：`需求/Mailchimp替代工具的免费计划详细对比表.md`

---

## 一、当前表单提交方式

- **表单位置**：`/resources` 页「Download the Ultimate Excel Cheat Sheet」区块。
- **提交目标**：由环境变量 **`NEXT_PUBLIC_MAILCHIMP_FORM_ACTION`** 指定（兼容任一提供 form action URL 的服务）。未设置时，表单 `action` 为 `#`（仅展示，不实际提交）。
- **提交方式**：`method="post"`，`target="_blank"`（新窗口打开目标页，适用于各服务托管感谢页）。

---

## 二、推荐邮件服务（替代 Mailchimp）

Mailchimp 免费计划**不支持自动化**（欢迎邮件、序列邮件需付费）。若需「订阅后自动发 PDF + 第 3/7 天再发」且零成本，建议选用以下之一（数据见《Mailchimp替代工具的免费计划详细对比表》）：

**首选推荐：Sender** — 2,500 联系人、15,000 封/月（免费计划中联系人与邮件量都高），免费计划**自动化支持较好**，适合中型订阅名单与 Lead Magnet 欢迎邮件 + 序列。

| 场景 | 推荐服务 | 免费额度要点 |
|------|----------|--------------|
| **首选：中型名单 + 自动化** | **Sender** | 2,500 联系人，15,000 封/月；**免费计划自动化支持较好** |
| **刚起步 / 联系人会涨、发送不频繁** | **Brevo**（原 Sendinblue） | 无限联系人，300 封/日（≈9,000/月）；支持简讯与**基础自动化** |
| **需要完整自动化 + 模板** | **MailerLite** | 500 联系人，12,000 封/月；**含自动化、模板、登陆页** |
| **联系人与邮件量都要高** | **EmailOctopus** | 2,500 联系人，10,000 封/月 |
| **仅需收集邮箱、后续自建发信** | 自建 API | 无限制，按自己后端与发信服务计费 |

**小结**：Lead Magnet 欢迎邮件 + 第 3/7 天序列在免费计划中**首选 Sender**，或选用 Brevo / MailerLite；Mailchimp 可作为备选（需接受免费版无自动化或付费升级）。

---

## 三、环境变量配置

| 变量名 | 说明 | 示例 |
|--------|------|------|
| `NEXT_PUBLIC_MAILCHIMP_FORM_ACTION` | 订阅表单的 action URL（推荐 Sender；或 Brevo / MailerLite / Mailchimp / 自建 API） | Sender / Brevo / Mailchimp 等各平台嵌入表单提供的 form action URL |

**配置位置**（任选其一）：

- **Vercel**：Project → Settings → Environment Variables → 添加上述变量（Production / Preview 按需勾选）。
- **本地**：在 `sheetmaster/.env.local` 中添加一行，值为所选服务的 form action URL。

---

## 四、表单字段（通用）

| 字段名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| `EMAIL` | email | 是 | 邮箱；Sender / Mailchimp / Brevo / MailerLite 等嵌入式表单通常接受 `name="EMAIL"`。 |

如需「姓名」等字段，可在 `LeadMagnetSignupForm.tsx` 中增加输入框；各服务合并字段名不同（Mailchimp: `MERGE0`/`MERGE1`；Sender / Brevo / MailerLite 见各自嵌入表单代码）。对接自建 API 时，字段名按后端约定修改即可。

---

## 五、获取 Form Action URL

### 5.1 Brevo（推荐，免费含自动化）

1. 登录 [Brevo](https://www.brevo.com)（原 Sendinblue）→ Contacts → Signup forms → 创建或编辑表单。
2. 选择「Embedded form」或「External form」，复制 `<form action="...">` 中的 **action** URL。
3. 将该 URL 填入 `NEXT_PUBLIC_MAILCHIMP_FORM_ACTION`。
4. 在 Automation 中配置「新联系人加入 → 发送欢迎邮件（含 PDF 链接）」及第 3/7 天邮件。

### 5.3 MailerLite（推荐，免费含自动化与模板）

1. 登录 [MailerLite](https://www.mailerlite.com) → Subscribers → Signup forms → 创建 Embedded 表单。
2. 复制表单代码中的 **form action** URL。
3. 将该 URL 填入 `NEXT_PUBLIC_MAILCHIMP_FORM_ACTION`。
4. 在 Automations 中配置欢迎邮件与序列（第 3/7 天）。

### 5.3 Mailchimp

1. 登录 [Mailchimp](https://mailchimp.com) → Audience → Signup forms → Embedded forms。
2. 选择对应 List，复制「Form action」中的 URL（形如 `https://xxx.us1.list-manage.com/subscribe/post?u=xxx&id=xxx`）。
3. 将该 URL 填入 `NEXT_PUBLIC_MAILCHIMP_FORM_ACTION`。
4. **注意**：免费计划无 Automation；欢迎邮件/序列需付费或改用 Brevo / MailerLite。

### 5.5 其他（EmailOctopus、Zoho Campaigns 等）

各平台均在「Signup form / Embedded form」中提供 form 的 **action** URL，复制后填入同一环境变量即可。

---

## 六、与欢迎邮件 + PDF 的串联

1. **即时欢迎邮件**：在所选邮件服务（**Brevo / MailerLite** 免费支持，Mailchimp 免费不支持）中为该 List 配置「新订阅者加入即触发」的欢迎邮件，正文中含速查表 PDF 下载链接（或附件）。
2. **PDF 存放**：将 PDF 上传至该服务的 File/Image 并取链接，或上传至本站/CDN，在欢迎邮件中插入该链接。
3. **后续序列**（可选）：在 Brevo / MailerLite 的 Automation 中设置「订阅后第 3 天」「第 7 天」再发一封，链回博客或模板，见《Lead-Magnet-PDF与邮件执行清单》2b.3。

---

## 七、自建 API 方式

若使用自建后端接收订阅：

1. 将 `NEXT_PUBLIC_MAILCHIMP_FORM_ACTION` 设为你的 API 地址（如 `https://api.yoursite.com/subscribe`）。
2. 后端接收 `POST`，body 为 `application/x-www-form-urlencoded`，至少解析 `EMAIL`；然后写入自己的数据库/邮件服务，并触发欢迎邮件（含 PDF 链接）。
3. 后端返回 302 重定向到感谢页，或 200 + 前端跳转；若需在当前窗口跳转，可考虑将表单改为客户端提交（fetch）并自行处理跳转。

---

## 八、测试步骤

1. **配置 endpoint**：在对应环境（本地或 Vercel）设置 `NEXT_PUBLIC_MAILCHIMP_FORM_ACTION` 为有效 form action URL（Brevo / MailerLite / Mailchimp / 自建 API）。
2. **访问**：打开 `https://www.getsheetmaster.com/resources`（或本地 `/resources`）。
3. **提交**：输入有效邮箱，点击「Send me the PDF」。
4. **预期**：
   - 使用 Sender / Brevo / MailerLite / Mailchimp：浏览器在新标签页打开该服务的感谢页，邮箱出现在对应 Audience/List 中；若已配置欢迎邮件，约 1 分钟内送达。
   - 使用自建 API：按你设计的感谢页或返回结果验证。
5. **未配置时**：不设置环境变量时，表单仍展示，但提交后不会发往任何服务（action 为 `#`）；仅用于上线前占位。

---

## 九、参考文档

- 需求/高转化率Excel速查表设计指南.md（诱饵文案、欢迎邮件序列）
- 需求/Mailchimp替代工具的免费计划详细对比表.md（免费额度与自动化支持）
- 执行/GetSheetMaster.com 按顺序可执行方案.md（阶段 2a、2b）
- 执行/Lead-Magnet-PDF与邮件执行清单.md（2b.3 欢迎邮件步骤）

---

*文档生成时间：2026-02-01；已按 Mailchimp 替代工具对比表优化并补充 Brevo / MailerLite 推荐。*
