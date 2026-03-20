# Tasks: Add Lead Magnet subscription form

## 1. Resources page subscription form
- [x] 1.1 In `app/resources/page.tsx`: add a "Subscribe for PDF" block above or beside the first lead magnet: headline (e.g. "Download the Ultimate Excel Cheat Sheet (Top 50 Formulas)"), sub-headline (e.g. "Join 5,000+ pros saving 2 hours a week."), email input, submit button ("Send me the PDF"); copy per 高转化率Excel速查表设计指南.
- [x] 1.2 Form action SHALL point to a configurable endpoint (e.g. `process.env.NEXT_PUBLIC_MAILCHIMP_FORM_ACTION` or doc placeholder); use method="post" and field name compatible with Mailchimp (e.g. EMAIL) when using Mailchimp.

## 2. Lead Magnet对接说明 document
- [x] 2.1 Create `执行/Lead-Magnet-对接说明.md`: document the signup endpoint (Mailchimp or custom API), required fields (email, optional name), how to connect welcome email + PDF delivery, and test steps (e.g. receive email within 1 minute after submit).

## 3. Validation
- [x] 3.1 Run `openspec validate add-lead-magnet-signup --strict` and fix any issues.
- [x] 3.2 Run `npm run build` and confirm no errors; verify `/resources` renders the subscription form.
