import type { Metadata } from 'next';
import SumifsAcrossClient from './SumifsAcrossClient';

export const metadata: Metadata = {
  title: 'SUMIFS Across Multiple Sheets Generator | SheetMaster',
  description:
    'Excel SUMIFS syntax plus multi-sheet sums: SUMPRODUCT + INDIRECT patterns for Jan/Feb/Mar tabs. Generator + step-by-step explanation.',
  openGraph: {
    title: 'SUMIFS Across Multiple Sheets - Excel Formula Generator',
    description: 'Sum data across Jan, Feb, Mar tabs instantly using INDIRECT arrays.',
    url: 'https://www.getsheetmaster.com/tools/sumifs-across-sheets',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.getsheetmaster.com/tools/sumifs-across-sheets',
  },
};

export default function SumifsAcrossPage() {
  return (
    <div className="max-w-5xl mx-auto py-8 px-4 sm:px-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">SUMIFS Across Multiple Sheets (Tabs)</h1>
      <p className="text-gray-600 max-w-3xl">
        Standard SUMIFS doesn't support 3D references across multiple worksheets. Combine <code>SUMPRODUCT</code>, <code>SUMIFS</code>, and an array of <code>INDIRECT</code> sheet names to solve this layout issue instantly.
      </p>

      <section className="mt-10 prose prose-slate max-w-none text-gray-700">
        <h2 className="text-xl font-bold text-gray-900 not-prose mb-3">
          Excel SUMIFS syntax (single sheet) vs this multi-sheet pattern
        </h2>
        <p>
          Searches like <strong>excel sumifs syntax</strong> usually point to the same core rule:{' '}
          <strong>SUMIFS</strong> always starts with the range you want to add up, then alternating{' '}
          <em>criteria_range</em> and <em>criteria</em> pairs. Excel&apos;s signature is:
        </p>
        <pre className="bg-gray-900 text-green-300 rounded-lg p-4 text-sm overflow-x-auto not-prose">
          <code>
            {`=SUMIFS(sum_range, criteria_range1, criteria1, [criteria_range2, criteria2], …)`}
          </code>
        </pre>
        <p>
          Example: sum column <code>C</code> where column <code>A</code> is <code>"North"</code> and column{' '}
          <code>B</code> is <code>"Q1"</code>:
        </p>
        <pre className="bg-gray-900 text-green-300 rounded-lg p-4 text-sm overflow-x-auto not-prose">
          <code>{`=SUMIFS(C:C, A:A, "North", B:B, "Q1")`}</code>
        </pre>
        <p>
          That pattern works on <strong>one</strong> worksheet. If your data lives on separate tabs
          (January, February, March, or regions), native SUMIFS cannot reference{' '}
          <code>Jan:Mar!C:C</code> the way SUM might—so we build one SUMIFS per sheet with{' '}
          <code>INDIRECT</code> and collapse the results with <code>SUMPRODUCT</code>. This keeps the
          same logical filters (your criteria range and criteria) while repeating them across each
          sheet name you list.
        </p>
        <p>
          For a plain one-sheet formula with form fields and copy-ready output, use the{' '}
          <a href="/formulas/sumifs" className="text-blue-600 hover:underline">
            SUMIFS formula generator
          </a>
          — this page focuses on the cross-tab variant.
        </p>

        <h3 className="text-lg font-semibold text-gray-900 not-prose mt-8 mb-2">
          How to use this generator (steps)
        </h3>
        <ol className="list-decimal pl-5 space-y-2">
          <li>
            <strong>List sheet names</strong> exactly as they appear on the tab bar, comma-separated
            (e.g. <code>Jan, Feb, Mar</code>). Spaces in names are fine; avoid trailing commas.
          </li>
          <li>
            <strong>Set the sum range</strong> on each sheet relative to that sheet—often a column
            of amounts (e.g. <code>C:C</code> or <code>Sales!$E$2:$E$500</code> if you use the same
            layout on every tab).
          </li>
          <li>
            <strong>Set the criteria range</strong> to the column you filter on (e.g. product or
            region), matching the same column address on each sheet.
          </li>
          <li>
            <strong>Enter the condition</strong> as a quoted value (<code>&quot;Apple&quot;</code>)
            or a cell reference (<code>$F$1</code>) so every sheet uses the same rule.
          </li>
          <li>
            <strong>Copy the generated formula</strong> into a summary workbook cell. If Excel asks
            for array confirmation on older versions, use Ctrl+Shift+Enter only when the formula is a
            legacy array type; the generator targets modern dynamic evaluation where possible.
          </li>
          <li>
            <strong>Prefer performance?</strong> On Excel 365 you can sometimes replace INDIRECT
            stacks with <code>VSTACK</code> of ranges; INDIRECT is still the most portable pattern for
            variable sheet lists.
          </li>
        </ol>
        <p>
          Together, the syntax section and steps align this URL with long-tail queries about{' '}
          <strong>excel sumifs syntax</strong> while staying consistent with the actual tool output
          below.
        </p>
      </section>

      <SumifsAcrossClient />
      
      <div className="mt-12 pt-8 border-t border-gray-100">
        <h2 className="text-xl font-bold text-gray-900 mb-4">How does the cross-sheet formula work?</h2>
        <div className="prose prose-slate max-w-none text-gray-600">
          <p>
            When managing monthly or regional sheets (like "Jan," "Feb," "Mar"), you can't just type <code>=SUMIFS(Jan:Mar!B:B...)</code>. 
            Instead, we wrap an array of sheet names in the <code>INDIRECT</code> function. 
            <strong>SUMIFS</strong> evaluates each sheet and returns an array of totals. <strong>SUMPRODUCT</strong> then adds up that array to give your final total.
          </p>
          <p>
            For large datasets, newer Excel functions like <code>VSTACK</code> can be more performant than volatile <code>INDIRECT</code> functions. 
            But <code>SUMPRODUCT(SUMIFS(INDIRECT()))</code> remains highly compatible across older versions and Google Sheets.
          </p>
        </div>
        
        {/* FAQ Schema Placeholder (injected in the main layout or here conceptually) */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [{
              "@type": "Question",
              "name": "Can I use standard SUMIFS across multiple sheets?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "No, SUMIFS natively does not support 3D referencing across multiple sheets. You must use SUMPRODUCT bundled with INDIRECT sheet arrays or use VSTACK in modern Excel to stack the ranges first."
              }
            }]
          })
        }} />
      </div>
    </div>
  );
}
