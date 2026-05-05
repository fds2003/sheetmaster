import { NextResponse } from 'next/server';

const RESEND_API = 'https://api.resend.com/emails';

const MAX_FORMULA_LEN = 16_000;
const MAX_TITLE_LEN = 500;

function isValidEmail(email: string): boolean {
  const trimmed = email.trim();
  if (trimmed.length > 254) return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed);
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export async function POST(req: Request) {
  try {
    const key = process.env.RESEND_API_KEY;
    if (!key) {
      console.error('formula-email: RESEND_API_KEY is not set');
      return NextResponse.json(
        { error: 'Email delivery is not configured.' },
        { status: 503 }
      );
    }

    const body = await req.json();
    const email = typeof body.email === 'string' ? body.email : '';
    const formulaSlug = typeof body.formulaSlug === 'string' ? body.formulaSlug : '';
    const formulaText = typeof body.formulaText === 'string' ? body.formulaText : '';
    let formulaTitle =
      typeof body.formulaTitle === 'string' ? body.formulaTitle : 'Your formula';

    if (!isValidEmail(email)) {
      return NextResponse.json({ error: 'Invalid email address.' }, { status: 400 });
    }
    if (!formulaSlug || formulaSlug.length > 200) {
      return NextResponse.json({ error: 'Invalid formula reference.' }, { status: 400 });
    }
    if (!formulaText.trim() || formulaText.length > MAX_FORMULA_LEN) {
      return NextResponse.json({ error: 'Formula text is missing or too long.' }, { status: 400 });
    }
    if (formulaTitle.length > MAX_TITLE_LEN) {
      formulaTitle = formulaTitle.slice(0, MAX_TITLE_LEN);
    }

    const siteUrl =
      process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') ||
      'https://www.getsheetmaster.com';
    const pageUrl = `${siteUrl}/formulas/${encodeURIComponent(formulaSlug)}`;

    const from =
      process.env.RESEND_FROM_EMAIL ||
      'SheetMaster <onboarding@resend.dev>';

    const subject = `Your SheetMaster formula: ${formulaTitle}`;
    const html = `
      <p>Hi,</p>
      <p>Here is the formula you generated on <strong>SheetMaster</strong>:</p>
      <pre style="background:#0f172a;color:#4ade80;padding:16px;border-radius:8px;overflow:auto;font-size:14px;">${escapeHtml(
        formulaText
      )}</pre>
      <p><a href="${escapeHtml(pageUrl)}">Open this formula page</a></p>
      <p style="color:#64748b;font-size:12px;">You requested this email from getsheetmaster.com. We will not spam you.</p>
    `.trim();

    const res = await fetch(RESEND_API, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${key}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from,
        to: [email.trim()],
        subject,
        html,
      }),
    });

    if (!res.ok) {
      const errText = await res.text();
      console.error('Resend error:', res.status, errText);
      return NextResponse.json(
        { error: 'Could not send email. Please try again later.' },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('formula-email:', err);
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    );
  }
}
