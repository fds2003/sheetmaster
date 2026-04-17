import type { Metadata } from 'next';
import BOMClient from './BOMClient';

export const metadata: Metadata = {
  title: 'BOM Inventory Template & ArrayFormula Generator | SheetMaster',
  description: 'Download the Reddit-famous BOM inventory tracker template. Automatically deduct raw materials when a finished good is sold using ArrayFormulas and MMULT.',
  openGraph: {
    title: 'BOM Inventory Tracker & Formula Template | SheetMaster',
    description: 'Avoid nested IFs. Deduct inventory components instantly.',
    url: 'https://www.getsheetmaster.com/tools/bom-inventory',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.getsheetmaster.com/tools/bom-inventory',
  },
};

export default function BOMPage() {
  return (
    <div className="max-w-5xl mx-auto py-8 px-4 sm:px-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Bill of Materials (BOM) Inventory Tracker</h1>
      <p className="text-gray-600 max-w-3xl">
        A common Reddit question: <em>"If I sell 1 Burger, how do I automatically deduct 2 Buns and 1 Meat patty?"</em><br/>
        This page provides the exact matrix math formula and a downloadable Excel/Google Sheets template to solve complex raw material deductions automatically.
      </p>
      
      <BOMClient />
      
      {/* FAQ Schema Placeholder (injected in the main layout or here conceptually) */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [{
            "@type": "Question",
            "name": "How to automatically deduct raw materials from finished goods in Excel?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "The most efficient way to deduct multiple raw materials based on a recipe or Bill of Materials (BOM) is to use the MMULT (Matrix Multiplication) function along with TRANSPOSE in Excel. You multiply the vector of sales quantities by your resource mapping matrix."
            }
          }]
        })
      }} />
    </div>
  );
}
