import type { Metadata } from 'next';
import SumifsAcrossClient from './SumifsAcrossClient';

export const metadata: Metadata = {
  title: 'SUMIFS Across Multiple Sheets Generator | SheetMaster',
  description: 'Easily generate the complex SUMPRODUCT + INDIRECT formula to sum ranges across multiple Excel sheets dynamically with conditions.',
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
