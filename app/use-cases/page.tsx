import Link from 'next/link';
import { USE_CASES } from '@/lib/use-cases';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Use Cases',
  description:
    'Excel and Google Sheets by industry: formulas and tools for accountants, data analysts, and more. Free generators, no signup.',
  openGraph: {
    title: 'Use Cases | SheetMaster',
    description:
      'Excel and Google Sheets by industry: formulas and tools for accountants, data analysts, and more.',
    url: 'https://www.getsheetmaster.com/use-cases',
    type: 'website',
    siteName: 'SheetMaster',
  },
  alternates: {
    canonical: 'https://www.getsheetmaster.com/use-cases',
  },
};

export default function UseCasesPage() {
  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Industry Solutions</h1>
      <p className="text-gray-600 mb-8">
        Formulas and tools grouped by role: find what you need for your job.
      </p>
      <ul className="space-y-4">
        {USE_CASES.map((uc) => (
          <li key={uc.slug}>
            <Link
              href={`/use-cases/${uc.slug}`}
              className="group block rounded-xl border border-gray-200 bg-gray-50/50 p-5 hover:border-green-300 hover:bg-green-50/50 transition-colors"
            >
              <h2 className="text-xl font-semibold text-gray-900 group-hover:text-green-700 transition-colors">
                {uc.title}
              </h2>
              <p className="mt-1 text-gray-600 text-sm">{uc.description}</p>
              <span className="mt-3 inline-flex items-center text-sm font-medium text-green-600 group-hover:underline">
                View formulas & tools →
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
