'use client';

/**
 * Lead Magnet signup form: email + submit.
 * Form action is configurable via NEXT_PUBLIC_MAILCHIMP_FORM_ACTION (recommended: Sender; or Brevo / MailerLite / Mailchimp / custom API).
 * See 执行/Lead-Magnet-对接说明.md for setup; 需求/Mailchimp替代工具的免费计划详细对比表.md for provider comparison.
 */
export function LeadMagnetSignupForm({
  formAction,
}: {
  /** Form action URL from Sender (recommended), Brevo, MailerLite, Mailchimp, or custom API. When empty, form submits to # (configure via env). */
  formAction?: string;
}) {
  const action = formAction && formAction !== '' ? formAction : '#';

  return (
    <form
      action={action}
      method="post"
      target="_blank"
      rel="noopener noreferrer"
      className="mt-4 flex flex-col sm:flex-row gap-3 max-w-md"
      aria-label="Subscribe for Excel cheat sheet PDF"
    >
      <label htmlFor="lead-magnet-email" className="sr-only">
        Email address
      </label>
      <input
        id="lead-magnet-email"
        type="email"
        name="EMAIL"
        required
        placeholder="you@example.com"
        className="flex-1 min-w-0 rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 placeholder-gray-500 focus:border-green-500 focus:ring-1 focus:ring-green-500"
      />
      <button
        type="submit"
        className="shrink-0 rounded-lg bg-green-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-green-700 transition-colors"
      >
        Send me the PDF
      </button>
    </form>
  );
}
