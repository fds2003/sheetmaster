import Link from 'next/link';
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
    'free Excel tools',
    'email extraction',
    'loan calculator',
    'mortgage calculator',
    'data cleaning',
    'URL slug generator',
    'inventory management',
    'subscription tracker',
    'grade calculator',
    'SEO tools',
  ],
  openGraph: {
    title: 'SheetMaster - Free Excel & Google Sheets Formula Generators',
    description: 'Generate Excel and Google Sheets formulas instantly. Plus SEO tools, inventory management, loan calculators, and grading tools.',
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
          Free Excel & Google Sheets Formula Generator - 50+ Tools
        </h1>
        <p className="mt-4 text-xl text-gray-500">
          No signup, instant results. Search or select a tool below to generate formulas instantly.
        </p>
      </div>

      {/* Why SheetMaster */}
      <div className="mb-12 rounded-xl bg-gray-50 border border-gray-100 p-6 sm:p-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Why SheetMaster?</h2>
        <ul className="grid gap-4 sm:grid-cols-3 text-left">
          <li className="flex gap-3">
            <span className="text-green-600 font-semibold shrink-0">✓</span>
            <span><strong>Free & no signup</strong> — Use every tool without an account.</span>
          </li>
          <li className="flex gap-3">
            <span className="text-green-600 font-semibold shrink-0">✓</span>
            <span><strong>Not AI — full control</strong> — You choose parameters; we build the exact formula.</span>
          </li>
          <li className="flex gap-3">
            <span className="text-green-600 font-semibold shrink-0">✓</span>
            <span><strong>Learn every formula</strong> — See how each function works with examples.</span>
          </li>
        </ul>
      </div>

      {/* Industry Solutions */}
      <div className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Industry Solutions</h2>
          <span className="text-sm text-gray-500">Solve common problems fast</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
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
        <p className="mt-4 text-sm">
          <Link href="/use-cases" className="text-green-600 hover:text-green-700 font-medium hover:underline">
            Browse by industry →
          </Link>
        </p>
      </div>

      {/* Most Popular Formulas */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Most Popular Formulas</h2>
        <div className="flex flex-wrap gap-3">
          {['vlookup', 'if', 'sumif', 'index-match', 'xlookup'].map((slug) => {
            const formula = FORMULAS.find((f) => f.slug === slug);
            if (!formula) return null;
            return (
              <a
                key={slug}
                href={`/formulas/${slug}`}
                className="inline-flex items-center rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 hover:border-gray-300 transition-colors"
              >
                {formula.excelFunction}
              </a>
            );
          })}
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
