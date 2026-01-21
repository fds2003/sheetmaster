import { FORMULAS } from '../lib/formulas';
import { SOLUTIONS } from '../lib/solutions';
import FormulaGrid from '../components/FormulaGrid';
import SolutionCard from '../components/SolutionCard';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'SheetMaster - Free Excel & Google Sheets Formula Generators',
  description: 'Generate Excel and Google Sheets formulas instantly. Master VLOOKUP, IF, SUMIF, INDEX MATCH, and 50+ formulas. Plus data cleaning, loan calculators, and HR tools.',
  keywords: [
    'Excel formula generator',
    'Google Sheets formulas',
    'VLOOKUP generator',
    'IF statement generator',
    'SUMIF formula builder',
    'INDEX MATCH generator',
    'spreadsheet formulas',
    'Excel functions',
    'Google Sheets functions',
    'free Excel tools',
    'formula helper',
    'Excel tutorial',
    'email extraction',
    'loan calculator',
    'working days calculator',
    'mortgage calculator',
    'data cleaning',
  ],
  openGraph: {
    title: 'SheetMaster - Free Excel & Google Sheets Formula Generators',
    description: 'Generate complex Excel and Google Sheets formulas instantly. Plus data cleaning, loan calculators, and HR time tools.',
    url: 'https://www.getsheetmaster.com',
    type: 'website',
    siteName: 'SheetMaster',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'SheetMaster - Excel & Google Sheets Formula Generators',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SheetMaster - Free Excel & Google Sheets Formula Generators',
    description: 'Generate Excel and Google Sheets formulas instantly. Data cleaning, loan calculators, and more.',
    images: ['/og-image.png'],
  },
  alternates: {
    canonical: 'https://www.getsheetmaster.com',
  },
};

// 提取可序列化的公式数据（不包含函数）
const formulaCards = FORMULAS.map((formula) => ({
  slug: formula.slug,
  excelFunction: formula.excelFunction,
  category: formula.category,
  description: formula.description,
}));

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
          SheetMaster - Free Excel Formula Generators
        </h1>
        <p className="mt-4 text-xl text-gray-500">
          Master Excel & Google Sheets Formulas. Search or select a tool below to generate code instantly.
        </p>
      </div>

      {/* Solutions Section */}
      <div className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">🔥 Popular Tools</h2>
          <span className="text-sm text-gray-500">Solve common problems fast</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {SOLUTIONS.map((solution) => (
            <SolutionCard
              key={solution.slug}
              slug={solution.slug}
              title={solution.title}
              description={solution.description}
              icon={solution.icon}
            />
          ))}
        </div>
      </div>

      {/* Formula Grid with Search */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">📋 All Formula Tools</h2>
        <FormulaGrid formulas={formulaCards} />
      </div>
    </div>
  );
}
