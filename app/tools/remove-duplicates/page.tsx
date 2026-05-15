import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Remove Duplicates in Excel - Free Formula Tool | SheetMaster',
  description: 'Remove duplicate values in Excel and Google Sheets with formulas. Keep first, keep latest, or count duplicates. Free tool with examples. How to remove duplicates in excel.',
  openGraph: {
    title: 'Remove Duplicates in Excel - Free Formula Tool | SheetMaster',
    description: 'Remove duplicate values in Excel and Google Sheets with formulas. Keep first, keep latest, or count duplicates.',
    url: 'https://www.getsheetmaster.com/tools/remove-duplicates',
    type: 'website',
    siteName: 'SheetMaster',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Remove Duplicates in Excel - Free Formula Tool | SheetMaster',
    description: 'Remove duplicate values with formulas. Keep first, keep latest, or count duplicates.',
  },
  alternates: {
    canonical: 'https://www.getsheetmaster.com/tools/remove-duplicates',
  },
};

const TOOLS = [
  { id: 'unique', name: 'Get Unique Values', desc: 'Extract unique values from a list.', formula: '=UNIQUE(A:A)' },
  { id: 'keep-first', name: 'Remove Duplicates (Keep First)', desc: 'Remove duplicates, keeping the first occurrence.', formula: '=UNIQUE(A:A)' },
  { id: 'keep-latest', name: 'Remove Duplicates (Keep Latest Date)', desc: 'Remove duplicates but keep the row with the latest date.', formula: '=SORT(UNIQUE(FILTER(A:C, COUNTIF(A:A, A:A)=1)), 3, -1)' },
  { id: 'count', name: 'Count Duplicates', desc: 'Count how many times each value appears.', formula: '=COUNTIF(A:A, A2)' },
  { id: 'highlight', name: 'Find Duplicates (TRUE/FALSE)', desc: 'Mark cells that have duplicates.', formula: '=COUNTIF(A:A, A2)>1' },
];

export default function RemoveDuplicatesPage() {
  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Remove Duplicates in Excel & Google Sheets</h1>
      <p className="text-gray-600 mb-8">
        Use formulas to get unique values, remove duplicates (keep first or latest), count duplicates, or highlight them. No signup required.
      </p>
      <div className="space-y-6">
        {TOOLS.map((tool) => (
          <div key={tool.id} className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900 mb-1">{tool.name}</h2>
            <p className="text-sm text-gray-600 mb-4">{tool.desc}</p>
            <div className="bg-gray-900 rounded-lg p-4">
              <code className="block font-mono text-sm text-green-400 break-all">{tool.formula}</code>
            </div>
          </div>
        ))}
      </div>
      <p className="mt-8 text-sm text-gray-500">
        For more lookup and data tools, see <Link href="/formulas/vlookup" className="text-green-600 hover:underline">VLOOKUP</Link>,{' '}
        <Link href="/formulas/xlookup" className="text-green-600 hover:underline">XLOOKUP</Link>, and{' '}
        <Link href="/solutions/data-cleaning" className="text-green-600 hover:underline">Data Cleaning</Link>.
      </p>
    </div>
  );
}
