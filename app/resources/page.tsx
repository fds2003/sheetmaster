import type { Metadata } from 'next';
import { LeadMagnetSignupForm } from '@/components/LeadMagnetSignupForm';

export const metadata: Metadata = {
  title: 'Free Excel Cheat Sheet — 50+ Formulas, One Page | SheetMaster',
  description: 'Download the ultimate Excel formula cheat sheet — VLOOKUP, IF, SUMIF, INDEX MATCH, XLOOKUP & 45+ more on one page. Join 5,000+ professionals who save 2 hrs/week. Free PDF.',
  openGraph: {
    title: 'Free Excel Cheat Sheet — 50+ Formulas | SheetMaster',
    description: 'One-page PDF with 50+ Excel formulas. Join 5,000+ pros. Free download.',
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
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Free Excel Cheat Sheet (50+ Formulas)</h1>
      <p className="text-gray-600 mb-8">
        One page. Every formula you need. Download and keep it open next to your spreadsheet.
      </p>

      {/* Preview — what's inside before asking for email */}
      <div className="mb-8 rounded-xl border border-gray-200 bg-white p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-3">What&apos;s Inside:</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-sm text-gray-700">
          {['VLOOKUP', 'XLOOKUP', 'INDEX/MATCH', 'IF/IFS', 'SUMIF/SUMIFS', 'COUNTIF/COUNTIFS', 'LEFT/RIGHT/MID', 'CONCATENATE', 'DATEDIF', 'NETWORKDAYS', 'IFERROR', 'AND/OR'].map(f => (
            <div key={f} className="flex items-center gap-1.5">
              <span className="text-green-500 text-xs">●</span>
              <span>{f}</span>
            </div>
          ))}
        </div>
        <p className="text-xs text-gray-400 mt-3">...and 38 more formulas with syntax + examples</p>
      </div>

      {/* Subscribe for PDF — Lead Magnet signup */}
      <div className="mb-10 rounded-xl border border-green-200 bg-green-50/50 p-6">
        <h2 className="text-xl font-bold text-gray-900">
          📥 Download the Full Cheat Sheet (Free PDF)
        </h2>
        <p className="mt-2 text-gray-600 text-sm">
          Join 5,000+ pros saving 2 hours a week. One-page reference you can print or keep on your second screen.
        </p>
        <LeadMagnetSignupForm formAction={process.env.NEXT_PUBLIC_MAILCHIMP_FORM_ACTION} />
      </div>

      <p className="text-sm text-gray-500">
        Prefer to build formulas now? Use our{' '}
        <a href="/" className="text-green-600 hover:underline font-medium">formula generators</a> — instant results, no signup needed.
      </p>
    </div>
  );
}
