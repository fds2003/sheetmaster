import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'COUNTIF vs COUNTIFS: Difference & When to Use Each | SheetMaster',
  description: 'COUNTIF counts with 1 condition; COUNTIFS handles 2+ with AND logic. Use =COUNTIFS(A:A,"East",B:B,">500") for multiple criteria. Full syntax comparison inside.',
  openGraph: {
    title: 'COUNTIF vs COUNTIFS: Difference & When to Use Each | SheetMaster',
    description: 'COUNTIF counts with 1 condition; COUNTIFS handles 2+ with AND logic. Syntax table, OR-logic workarounds, and copy-paste examples.',
    url: 'https://www.getsheetmaster.com/compare/countif-vs-countifs',
    images: ['/api/og?title=COUNTIF%20vs%20COUNTIFS&description=Which%20one%20to%20use%2C%20syntax%20table%2C%20OR-logic%20workarounds'],
    type: 'website',
    siteName: 'SheetMaster',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'COUNTIF vs COUNTIFS: Difference & When to Use Each | SheetMaster',
    description: 'COUNTIF = 1 condition. COUNTIFS = 2+ conditions with AND logic. Syntax table + examples.',
  },
  alternates: {
    canonical: 'https://www.getsheetmaster.com/compare/countif-vs-countifs',
  },
};

const faqs = [
  {
    question: 'What is the difference between COUNTIF and COUNTIFS?',
    answer: 'COUNTIF counts cells that meet exactly ONE condition: =COUNTIF(A:A, "East"). COUNTIFS counts rows meeting TWO or more conditions at once (AND logic): =COUNTIFS(A:A, "East", B:B, ">500"). COUNTIFS also accepts a single condition, so it can do everything COUNTIF does — use COUNTIFS when you might add conditions later.',
  },
  {
    question: 'When should I use COUNTIFS instead of COUNTIF?',
    answer: 'Use COUNTIFS whenever you have more than one condition, e.g. counting orders where region is "East" AND amount is over 500. Use COUNTIF for a quick single-condition count. A practical rule: default to COUNTIFS — it works with one criterion too, and your formula stays consistent when criteria are added later.',
  },
  {
    question: 'Can COUNTIFS do OR logic?',
    answer: 'No — COUNTIFS applies AND logic across all criteria pairs: every condition must be true for a row to be counted. For OR logic, add multiple COUNTIFS together: =COUNTIFS(A:A, "East", B:B, ">500") + COUNTIFS(A:A, "West", B:B, ">500"). Each COUNTIFS handles one branch of the OR, and the sums combine them.',
  },
  {
    question: 'Why does my COUNTIFS return 0?',
    answer: 'The three most common causes: (1) criteria ranges have different row counts — all ranges must be the same size, e.g. A1:A100 with B1:B100; (2) text criteria missing quotes — use "Completed" not Completed; (3) no row matches ALL conditions at once — test with a single criterion first to isolate the problem.',
  },
];

export default function CompareCountifCountifsPage() {
  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">COUNTIF vs COUNTIFS</h1>
      <p className="text-gray-600 mb-8">
        COUNTIF counts cells matching one condition. COUNTIFS counts rows matching two or more
        conditions at once (AND logic). Here&apos;s the full comparison, OR-logic workarounds, and when to use each.
      </p>

      <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 mb-8">
        <p className="text-sm text-blue-900">
          <strong>Quick answer:</strong> One condition → <code className="bg-blue-100 px-1.5 py-0.5 rounded text-xs">=COUNTIF(A:A, &quot;East&quot;)</code>.
          Two or more → <code className="bg-blue-100 px-1.5 py-0.5 rounded text-xs">=COUNTIFS(A:A, &quot;East&quot;, B:B, &quot;&gt;500&quot;)</code>.
        </p>
      </div>

      <div className="overflow-x-auto rounded-xl border border-gray-200 mb-8">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Feature</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">COUNTIF</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">COUNTIFS</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            <tr>
              <td className="px-4 py-3 text-sm text-gray-700">Conditions</td>
              <td className="px-4 py-3 text-sm text-gray-600">Exactly 1</td>
              <td className="px-4 py-3 text-sm text-gray-600">1 to 127 range/criteria pairs</td>
            </tr>
            <tr>
              <td className="px-4 py-3 text-sm text-gray-700">Multiple criteria (AND)</td>
              <td className="px-4 py-3 text-sm text-gray-600">No — needs SUMPRODUCT workarounds</td>
              <td className="px-4 py-3 text-sm text-gray-600">Yes — built in</td>
            </tr>
            <tr>
              <td className="px-4 py-3 text-sm text-gray-700">OR logic</td>
              <td className="px-4 py-3 text-sm text-gray-600">No</td>
              <td className="px-4 py-3 text-sm text-gray-600">Not directly — sum multiple COUNTIFS</td>
            </tr>
            <tr>
              <td className="px-4 py-3 text-sm text-gray-700">Syntax</td>
              <td className="px-4 py-3 text-sm text-gray-600">=COUNTIF(range, criteria)</td>
              <td className="px-4 py-3 text-sm text-gray-600">=COUNTIFS(range1, criteria1, range2, criteria2, ...)</td>
            </tr>
            <tr>
              <td className="px-4 py-3 text-sm text-gray-700">Excel version</td>
              <td className="px-4 py-3 text-sm text-gray-600">All versions</td>
              <td className="px-4 py-3 text-sm text-gray-600">Excel 2007+ / all Google Sheets</td>
            </tr>
            <tr>
              <td className="px-4 py-3 text-sm text-gray-700">Wildcards (* ?)</td>
              <td className="px-4 py-3 text-sm text-gray-600">Yes</td>
              <td className="px-4 py-3 text-sm text-gray-600">Yes</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="space-y-4 mb-8">
        <h2 className="text-xl font-semibold text-gray-900">When to use COUNTIF</h2>
        <p className="text-gray-600">
          Use COUNTIF for a quick single-condition count: how many cells say &quot;Completed&quot;, how
          many values exceed 100, how many cells are blank. It&apos;s the simplest way to count with a
          condition and works in every Excel version.
        </p>

        <h2 className="text-xl font-semibold text-gray-900">When to use COUNTIFS</h2>
        <p className="text-gray-600">
          Use COUNTIFS when two or more conditions must hold at the same time — region = &quot;East&quot;{' '}
          <em>and</em> sales &gt; 500 <em>and</em> status = &quot;Completed&quot;. Each (range, criteria) pair adds
          one filter, and all ranges must be the same size. Because COUNTIFS also accepts a single
          pair, it can replace COUNTIF everywhere.
        </p>

        <h2 className="text-xl font-semibold text-gray-900">OR logic with COUNTIFS</h2>
        <p className="text-gray-600">
          COUNTIFS is AND-only. To count rows matching <em>either</em> condition, add the branches:
        </p>
        <pre className="bg-gray-900 text-gray-100 text-sm rounded-lg p-4 overflow-x-auto">
          {`=COUNTIFS(A:A, "East", B:B, ">500")\n+ COUNTIFS(A:A, "West", B:B, ">500")`}
        </pre>
        <p className="text-gray-600">
          This counts rows where (Region = East AND Sales &gt; 500) OR (Region = West AND Sales &gt; 500).
        </p>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faqs.map((f) => ({
              '@type': 'Question',
              name: f.question,
              acceptedAnswer: { '@type': 'Answer', text: f.answer },
            })),
          }),
        }}
      />

      <div className="flex flex-wrap gap-4">
        <Link href="/formulas/countif" className="inline-flex items-center rounded-lg bg-green-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-green-700 transition-colors">
          COUNTIF Generator
        </Link>
        <Link href="/formulas/countifs" className="inline-flex items-center rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
          COUNTIFS Generator
        </Link>
      </div>
    </div>
  );
}
