import type { Metadata } from 'next';
import RegexExtractClient from './RegexExtractClient';

export const metadata: Metadata = {
  title: 'RegexExtract Generator - Multi-Word Search | SheetMaster',
  description: 'Generate REGEXEXTRACT formulas to find and extract multiple specific words from a cell instantly. Fix case sensitivity and wildcard limitations.',
  openGraph: {
    title: 'RegexExtract Generator - Multi-Word Search | SheetMaster',
    description: 'Solve the problem of extracting multiple words from a cell without complex nested IF statements.',
    url: 'https://www.getsheetmaster.com/tools/regex-extract-generator',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.getsheetmaster.com/tools/regex-extract-generator',
  },
};

export default function RegexExtractPage() {
  return (
    <div className="max-w-5xl mx-auto py-8 px-4 sm:px-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">RegexExtract Formula Generator</h1>
      <p className="text-gray-600 max-w-3xl">
        Stop writing endless nested <code>FIND()</code> or <code>IF()</code> statements. Use this generator to extract multiple target words from a cell using Google Sheets' <code>REGEXEXTRACT</code> function. Perfect for categorizing chaotic data.
      </p>
      
      <RegexExtractClient />

      <div className="mt-12 pt-8 border-t border-gray-100">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Why use REGEXEXTRACT instead of wildcards?</h2>
        <div className="prose prose-slate max-w-none text-gray-600">
          <p>
            Standard Excel functions like <code>SEARCH</code> or <code>VLOOKUP</code> with wildcards (<code>*</code>) are often clumsy when you need to match against a list of 10 different words. 
            <strong>Google Sheets</strong> offers a native regex engine that allows evaluating conditional patterns like <code>(Apple|Banana|Orange)</code> in one go.
          </p>
          <p>
            If you're using Excel, consider using the new <code>REGEXEXTRACT</code> function (available in Excel for Microsoft 365) or bridging the gap with Power Query.
          </p>
        </div>
        
        {/* FAQ Schema Placeholder (injected in the main layout or here conceptually) */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [{
              "@type": "Question",
              "name": "Does REGEXEXTRACT work in Excel?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Native REGEXEXTRACT is available in Google Sheets. Microsoft recently introduced REGEXEXTRACT for Excel 365 Insiders, but for legacy Excel, you must use nested IF(ISNUMBER(SEARCH())) or Power Query."
              }
            }]
          })
        }} />
      </div>
    </div>
  );
}
