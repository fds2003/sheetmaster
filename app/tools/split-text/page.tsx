import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Split Text in Excel - TEXTSPLIT & Text to Columns | SheetMaster',
  description: 'Split text by delimiter in Excel and Google Sheets. Extract first name, last name, split by comma, space, or custom delimiter. Free formula generator. Text to columns excel formula.',
  openGraph: {
    title: 'Split Text in Excel - TEXTSPLIT & Text to Columns | SheetMaster',
    description: 'Split text by delimiter in Excel and Google Sheets. Extract first name, last name, split by comma or space.',
    url: 'https://www.getsheetmaster.com/tools/split-text',
    type: 'website',
    siteName: 'SheetMaster',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Split Text in Excel - TEXTSPLIT & Text to Columns | SheetMaster',
    description: 'Split text by delimiter, extract first/last name, or split by comma. Free formulas.',
  },
  alternates: {
    canonical: 'https://www.getsheetmaster.com/tools/split-text',
  },
};

const TOOLS = [
  { id: 'textsplit', name: 'Split by Delimiter', desc: 'Split text using TEXTSPLIT (Excel 365 / Google Sheets).', formula: '=TEXTSPLIT(A2, ", ")' },
  { id: 'first-name', name: 'Extract First Name', desc: 'Get the first word (first name) from full name.', formula: '=LEFT(A2, FIND(" ", A2)-1)' },
  { id: 'last-name', name: 'Extract Last Name', desc: 'Get the last word (last name) from full name.', formula: '=RIGHT(A2, LEN(A2)-FIND("*", SUBSTITUTE(A2, " ", "*", LEN(A2)-LEN(SUBSTITUTE(A2, " ", "")))))' },
  { id: 'split-comma', name: 'Split by Comma', desc: 'Split comma-separated values into columns.', formula: '=TRIM(MID(SUBSTITUTE(A2, ",", REPT(" ", 100)), (1-1)*100+1, 100))' },
];

export default function SplitTextPage() {
  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Split Text in Excel & Google Sheets</h1>
      <p className="text-gray-600 mb-8">
        Split text by delimiter, extract first or last name, or split by comma. Free formula examples. No signup required.
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
        For more text functions, see <Link href="/formulas/trim" className="text-green-600 hover:underline">TRIM</Link>,{' '}
        <Link href="/formulas/left" className="text-green-600 hover:underline">LEFT</Link>,{' '}
        <Link href="/formulas/right" className="text-green-600 hover:underline">RIGHT</Link>, and{' '}
        <Link href="/solutions/data-cleaning" className="text-green-600 hover:underline">Data Cleaning</Link>.
      </p>
    </div>
  );
}
