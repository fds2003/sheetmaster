// Runtime-validated environment variables

function requireEnv(key: string): string {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return value;
}

function optionalEnv(key: string, defaultValue?: string): string | undefined {
  return process.env[key] || defaultValue;
}

export const env = {
  // Supabase (required)
  supabaseUrl: requireEnv('NEXT_PUBLIC_SUPABASE_URL'),
  supabaseAnonKey: requireEnv('NEXT_PUBLIC_SUPABASE_ANON_KEY'),
  supabaseServiceRoleKey: requireEnv('SUPABASE_SERVICE_ROLE_KEY'),

  // Stripe (required for payments)
  stripeSecretKey: requireEnv('STRIPE_SECRET_KEY'),
  stripeWebhookSecret: optionalEnv('STRIPE_WEBHOOK_SECRET'),

  // Email (optional)
  resendApiKey: optionalEnv('RESEND_API_KEY'),
  resendFromEmail: optionalEnv('RESEND_FROM_EMAIL', 'hello@getsheetmaster.com'),

  // Site
  siteUrl: optionalEnv('NEXT_PUBLIC_SITE_URL', 'https://www.getsheetmaster.com'),
  gaId: optionalEnv('NEXT_PUBLIC_GA_ID'),
  mailchimpFormAction: optionalEnv('NEXT_PUBLIC_MAILCHIMP_FORM_ACTION'),
} as const;
