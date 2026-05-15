import Link from 'next/link';
import { USE_CASES } from '../../lib/use-cases';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Excel & Google Sheets Solutions by Industry',
  description: 'Browse all 50+ free formula tools categorized by industry: Ecommerce, HR, Finance, and Marketing.',
  alternates: {
    canonical: 'https://www.getsheetmaster.com/use-cases',
  },
  openGraph: {
    title: 'Solutions by Industry | SheetMaster',
    description: 'Free formula tools for Ecommerce, HR, Finance, and Marketing. No signup.',
    url: 'https://www.getsheetmaster.com/use-cases',
    type: 'website',
    siteName: 'SheetMaster',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Solutions by Industry | SheetMaster',
    description: 'Free formula tools for Ecommerce, HR, Finance, and Marketing. No signup.',
  },
};

export default function UseCasesPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Solutions by Industry</h1>
        <p className="text-xl text-gray-500">Pick your field to see the most relevant automated tools.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
        {USE_CASES.map(uc => (
          <Link key={uc.slug} href={`/use-cases/${uc.slug}`} className="block p-8 bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md hover:border-blue-300 transition-all">
            <div className="text-4xl mb-4">{uc.icon}</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">{uc.title}</h2>
            <p className="text-gray-600 font-medium">{uc.description}</p>
          </Link>
        ))}
      </div>

      {/* The B2B/God Mode CTA */}
      <div className="bg-gradient-to-r from-gray-900 to-indigo-900 rounded-3xl p-10 text-center text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">Need a Custom Automated Solution?</h2>
          <p className="text-indigo-100 text-lg mb-8">Stop wrangling formulas. We build complex, robust Excel/Sheets architectures directly for your business operations.</p>
          <a href="mailto:support@getsheetmaster.com" className="inline-block bg-white text-indigo-900 px-8 py-3 rounded-full font-bold text-lg hover:bg-indigo-50 transition-colors shadow-md">
            Get a Free Consultation
          </a>
        </div>
      </div>
    </div>
  );
}
