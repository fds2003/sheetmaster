import Link from 'next/link';

export interface BlogToolCtaProps {
  href: string;
  label: string;
  subLink?: { href: string; label: string };
}

/**
 * Single primary CTA for blog → formula tool funnel (SEO internal link + engagement).
 * One button per post; optional text sub-link (e.g. compare page).
 */
export default function BlogPrimaryToolCta({ href, label, subLink }: BlogToolCtaProps) {
  return (
    <div className="my-8 rounded-xl border border-emerald-200 bg-gradient-to-br from-emerald-50 to-white p-5 shadow-sm ring-1 ring-emerald-100/80">
      <p className="text-xs font-semibold uppercase tracking-wide text-emerald-800/90 mb-2">
        Free formula generator
      </p>
      <Link
        href={href}
        className="inline-flex w-full sm:w-auto items-center justify-center rounded-lg bg-emerald-600 px-5 py-3 text-base font-semibold text-white shadow-md transition hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
      >
        {label}
      </Link>
      {subLink ? (
        <p className="mt-3 text-sm text-gray-600">
          Also see:{' '}
          <Link href={subLink.href} className="font-medium text-emerald-700 underline decoration-emerald-300 hover:text-emerald-900">
            {subLink.label}
          </Link>
        </p>
      ) : null}
    </div>
  );
}
