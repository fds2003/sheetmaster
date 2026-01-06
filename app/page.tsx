import { FORMULAS } from '../lib/formulas';
import FormulaGrid from '../components/FormulaGrid';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'SheetMaster - Free Excel & Google Sheets Formula Generators',
  description: 'Generate Excel and Google Sheets formulas instantly. Master VLOOKUP, IF statements, SUMIF, INDEX MATCH, and 50+ more formulas with our free generator tools.',
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
  ],
  openGraph: {
    title: 'SheetMaster - Free Excel & Google Sheets Formula Generators',
    description: 'Generate complex Excel and Google Sheets formulas instantly. Master VLOOKUP, IF, SUMIF, and 50+ more formulas.',
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
    description: 'Generate Excel and Google Sheets formulas instantly. Free AI-powered tools.',
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

      {/* Formula Grid with Search */}
      <FormulaGrid formulas={formulaCards} />
    </div>
  );
}
