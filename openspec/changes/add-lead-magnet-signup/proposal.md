# Change: Add Lead Magnet subscription form on Resources page

## Why
按顺序可执行方案阶段 2a 要求：在 Resources 页提供「订阅获取 PDF」入口（输入邮箱 + 提交），表单提交至 Mailchimp 或指定 API，并编写对接说明文档，为后续欢迎邮件 + PDF 交付闭环做准备。

## What Changes
1. **Resources 页订阅表单**：在 Lead Magnet 列表上方（或首块资源旁）增加「订阅获取 PDF」区块：主标题（如 "Download the Ultimate Excel Cheat Sheet (Top 50 Formulas)"）、副标题（如 "Join 5,000+ pros saving 2 hours a week."）、邮箱输入框、提交按钮（"Send me the PDF"）；表单 action 指向可配置的 endpoint（如 Mailchimp signup URL），通过环境变量或占位配置，具体见对接说明文档。
2. **对接说明文档**：新建 `执行/Lead-Magnet-对接说明.md`，写明：当前表单提交到哪个 endpoint（Mailchimp / 自建 API）、所需字段（email、可选 name）、如何与欢迎邮件 + PDF 串联、测试步骤（提交后 1 分钟内收到邮件）。

## Impact
- **Affected specs**: `resources` (MODIFIED — 增加订阅表单需求与场景)
- **Modified code**: `app/resources/page.tsx`（增加表单 UI 与可配置 action）
- **New file**: `执行/Lead-Magnet-对接说明.md`

## References
- 执行/GetSheetMaster.com 按顺序可执行方案.md（阶段 2a）
- 需求/高转化率Excel速查表设计指南.md（诱饵文案）
