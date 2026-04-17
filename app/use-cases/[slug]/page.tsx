import { notFound } from 'next/navigation';
import { USE_CASES } from '../../../lib/use-cases';
import { FORMULAS } from '../../../lib/formulas';
import Link from 'next/link';

export function generateStaticParams() {
  return USE_CASES.map((uc) => ({
    slug: uc.slug,
  }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const uc = USE_CASES.find((u) => u.slug === params.slug);
  if (!uc) return { title: 'Not Found' };
  
  return {
    title: `${uc.title} - Excel & Google Sheets Automation | SheetMaster`,
    description: `Free spreadsheet tools and formulas specifically designed ${uc.title.toLowerCase()}. ${uc.description}`,
  };
}

export default function UseCaseView({ params }: { params: { slug: string } }) {
  const uc = USE_CASES.find((u) => u.slug === params.slug);
  if (!uc) notFound();

  // Find all formulas matching this use case
  const matchingFormulas = FORMULAS.filter(f => uc.formulaSlugs.includes(f.slug));

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="text-5xl mb-4">{uc.icon}</div>
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4">{uc.title}</h1>
        <p className="text-xl text-gray-500 max-w-2xl mx-auto">{uc.description}</p>
      </div>

      {/* God Mode CTA / Founder Access Teaser */}
      <div className="bg-blue-600 rounded-2xl p-8 text-white shadow-lg mb-12 flex flex-col md:flex-row items-center justify-between text-left">
        <div>
           <span className="bg-blue-900 text-blue-200 text-xs font-bold px-2 py-1 rounded-md uppercase mb-3 inline-block">Pro Feature</span>
           <h2 className="text-2xl font-bold mb-2">Run the All-in-One Data Cleaner</h2>
           <p className="text-blue-100 max-w-lg">Process 10,000+ rows instantly. Clean whitespace, fix emails, and normalize data perfectly with one click.</p>
        </div>
        <Link href="/formulas/vlookup" className="mt-6 md:mt-0 bg-white text-blue-700 px-6 py-3 rounded-xl font-bold whitespace-nowrap hover:bg-gray-50 shadow-md transition-colors flex items-center gap-2" title="Requires Founder Access">
           💎 Unlock Founder Access
        </Link>
      </div>

      {/* Formula Grid */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Essential Tools for {uc.title.replace('For ', '')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {matchingFormulas.map(formula => (
            <Link key={formula.slug} href={`/formulas/${formula.slug}`} className="group block p-6 bg-white border border-gray-200 rounded-xl hover:shadow-lg hover:border-blue-400 transition-all flex flex-col h-full">
               <div className="font-mono text-sm font-bold text-blue-600 mb-3 bg-blue-50 w-fit px-2 py-1 rounded">{formula.excelFunction}</div>
               <h3 className="text-lg font-bold text-gray-900 mb-2">{formula.title.split('-')[0]}</h3>
               <p className="text-gray-500 text-sm mb-4 flex-grow">{formula.description}</p>
               <span className="text-sm font-semibold text-gray-900 group-hover:text-blue-600">Open Generator →</span>
            </Link>
          ))}
        </div>
      </div>
      
      {/* Consultation Anchor */}
      <div className="border-t border-gray-200 pt-12 text-center">
         <p className="text-gray-500 mb-4">Want these calculators custom-branded on your own intranet?</p>
         <Link href="mailto:support@getsheetmaster.com" className="text-blue-600 font-bold hover:underline">Get a B2B Consultation Quote</Link>
      </div>
    </div>
  );
}
