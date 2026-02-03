import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'VLOOKUP vs XLOOKUP: Which Should You Use? | SheetMaster',
  description: 'Compare VLOOKUP and XLOOKUP: syntax, use cases, and when to use each in Excel and Google Sheets. Vlookup vs xlookup.',
  openGraph: {
    title: 'VLOOKUP vs XLOOKUP: Which Should You Use? | SheetMaster',
    description: 'Compare VLOOKUP and XLOOKUP: syntax, use cases, and when to use each.',
    url: 'https://www.getsheetmaster.com/compare/vlookup-vs-xlookup',
    type: 'website',
    siteName: 'SheetMaster',
  },
  alternates: {
    canonical: 'https://www.getsheetmaster.com/compare/vlookup-vs-xlookup',
  },
};

export default function CompareVlookupXlookupPage() {
  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">VLOOKUP vs XLOOKUP</h1>
      <p className="text-gray-600 mb-8">
        Both look up a value and return a result. Here’s how they differ and when to use each.
      </p>

      <div className="overflow-x-auto rounded-xl border border-gray-200 mb-8">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Feature</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">VLOOKUP</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">XLOOKUP</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            <tr>
              <td className="px-4 py-3 text-sm text-gray-700">Look left</td>
              <td className="px-4 py-3 text-sm text-gray-600">No</td>
              <td className="px-4 py-3 text-sm text-gray-600">Yes</td>
            </tr>
            <tr>
              <td className="px-4 py-3 text-sm text-gray-700">Column index</td>
              <td className="px-4 py-3 text-sm text-gray-600">Required (number)</td>
              <td className="px-4 py-3 text-sm text-gray-600">Not needed (separate return array)</td>
            </tr>
            <tr>
              <td className="px-4 py-3 text-sm text-gray-700">If not found</td>
              <td className="px-4 py-3 text-sm text-gray-600">Returns #N/A</td>
              <td className="px-4 py-3 text-sm text-gray-600">Optional 4th argument (e.g. &quot;Not Found&quot;)</td>
            </tr>
            <tr>
              <td className="px-4 py-3 text-sm text-gray-700">Default match</td>
              <td className="px-4 py-3 text-sm text-gray-600">Approximate (TRUE) unless you use FALSE</td>
              <td className="px-4 py-3 text-sm text-gray-600">Exact match</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="space-y-4 mb-8">
        <h2 className="text-xl font-semibold text-gray-900">When to use VLOOKUP</h2>
        <p className="text-gray-600">
          Use VLOOKUP when you have a simple table with the lookup value in the first column and you need a value to the right. It’s widely supported in older Excel versions.
        </p>
        <h2 className="text-xl font-semibold text-gray-900">When to use XLOOKUP</h2>
        <p className="text-gray-600">
          Use XLOOKUP when you need to look left, when columns might be inserted (no column index to break), or when you want built-in if-not-found. Available in Excel 365 and Google Sheets.
        </p>
      </div>

      <div className="flex flex-wrap gap-4">
        <Link href="/formulas/vlookup" className="inline-flex items-center rounded-lg bg-green-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-green-700 transition-colors">
          VLOOKUP Generator
        </Link>
        <Link href="/formulas/xlookup" className="inline-flex items-center rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
          XLOOKUP Generator
        </Link>
      </div>
    </div>
  );
}
