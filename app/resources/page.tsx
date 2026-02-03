import type { Metadata } from 'next';
import { LeadMagnetSignupForm } from '@/components/LeadMagnetSignupForm';

export const metadata: Metadata = {
  title: 'Free Resources',
  description: 'Free Excel and Google Sheets resources: formula cheat sheet, templates, and guides. Download from SheetMaster.',
  openGraph: {
    title: 'Free Resources | SheetMaster',
    description: 'Free Excel formula cheat sheet, templates, and guides.',
    url: 'https://www.getsheetmaster.com/resources',
    type: 'website',
    siteName: 'SheetMaster',
  },
  alternates: {
    canonical: 'https://www.getsheetmaster.com/resources',
  },
};

export default function ResourcesPage() {
  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Free Resources</h1>
      <p className="text-gray-600 mb-8">
        Download free Excel and Google Sheets resources to speed up your work.
      </p>

      {/* Subscribe for PDF — Lead Magnet signup */}
      <div className="mb-10 rounded-xl border border-green-200 bg-green-50/50 p-6">
        <h2 className="text-xl font-bold text-gray-900">
          Download the Ultimate Excel Cheat Sheet (Top 50 Formulas)
        </h2>
        <p className="mt-2 text-gray-600 text-sm">
          Join 5,000+ pros saving 2 hours a week. Get a one-page reference of VLOOKUP, IF, SUMIF, INDEX MATCH, XLOOKUP, and more.
        </p>
        <LeadMagnetSignupForm formAction={process.env.NEXT_PUBLIC_MAILCHIMP_FORM_ACTION} />
      </div>

      <div className="space-y-6 rounded-xl border border-gray-200 bg-gray-50/50 p-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Excel Formula Cheat Sheet (50+ formulas)</h2>
          <p className="mt-1 text-gray-600 text-sm">
            A one-page reference of the most useful Excel and Google Sheets formulas: VLOOKUP, IF, SUMIF, INDEX MATCH, XLOOKUP, and more.
          </p>
          <p className="mt-3 text-gray-600 text-sm">
            Enter your email above to receive the PDF. No spam — we&apos;ll only send the cheat sheet and occasional tips.
          </p>
        </div>
        <p className="text-sm text-gray-500">
          Prefer to build formulas now? Use our{' '}
          <a href="/" className="text-green-600 hover:underline">formula generators</a> to get instant results.
        </p>
      </div>
    </div>
  );
}
