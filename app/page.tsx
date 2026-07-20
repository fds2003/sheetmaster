import Link from 'next/link';
import { FORMULAS } from '../lib/formulas';
import { SOLUTIONS } from '../lib/solutions';
import FormulaGrid from '../components/FormulaGrid';
import SolutionCard from '../components/SolutionCard';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'SheetMaster — Free Excel & Google Sheets Formula Generator (50+ Formulas)',
  description: 'Generate Excel and Google Sheets formulas instantly. No signup, no AI errors. Master VLOOKUP, IF, SUMIF, XLOOKUP and 50+ formulas. Plus data cleaning tools and templates.',
  openGraph: {
    title: 'SheetMaster — Free Excel & Google Sheets Formula Generator (50+ Formulas)',
    description: 'Generate Excel and Google Sheets formulas instantly. No signup, no AI errors. Master VLOOKUP, IF, SUMIF, XLOOKUP and 50+ formulas. Plus data cleaning tools and templates.',
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
    title: 'SheetMaster — Free Excel & Google Sheets Formula Generator (50+ Formulas)',
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

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "SheetMaster",
  "url": "https://www.getsheetmaster.com",
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": "https://www.getsheetmaster.com/?q={search_term_string}",
    },
    "query-input": "required name=search_term_string",
  },
};

export default function Home() {
  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      {/* Hero Section */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
          Excel Formulas, Generated Instantly
        </h1>
        <p className="mt-4 text-lg text-gray-500 max-w-2xl mx-auto">
          Stop Googling syntax. Pick a formula, fill in the blanks, get the exact formula — working on your first try. <span className="text-green-600 font-medium">No signup. No AI errors.</span>
        </p>
      </div>

      {/* Formula Grid with Search (提至首屏) */}
      <div className="mb-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">📋 Formula Search & Generator</h2>
            <p className="text-sm text-gray-500 mt-1">Search 50+ formulas or choose a tool below</p>
          </div>
          {/* Quick Popular Formulas inside Search Area */}
          <div className="flex flex-wrap gap-2 items-center">
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Popular:</span>
            {['xlookup', 'vlookup', 'if', 'sumif', 'ifs'].map((slug) => {
              const formula = FORMULAS.find((f) => f.slug === slug);
              if (!formula) return null;
              return (
                <Link
                  key={slug}
                  href={`/formulas/${slug}`}
                  className="inline-flex items-center rounded bg-gray-100 hover:bg-gray-200 px-2 py-1 text-xs font-semibold text-gray-700 transition-colors"
                >
                  {formula.excelFunction}
                </Link>
              );
            })}
          </div>
        </div>
        <FormulaGrid formulas={formulaCards} />
      </div>


      {/* Most Popular Formulas — High-CTR pages */}
      <div className="mb-12 border-t pt-8 border-gray-100">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Most Popular Formulas</h2>
        <p className="text-sm text-gray-500 mb-5">Generate working formulas in seconds — no signup needed</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {[
            { slug: 'remove-first-3-chars', label: 'Remove First 3 Chars', icon: '✂️' },
            { slug: 'countifs', label: 'COUNTIFS', icon: '🔢' },
            { slug: 'sumifs', label: 'SUMIFS', icon: '➕' },
            { slug: 'xlookup', label: 'XLOOKUP', icon: '🔍' },
            { slug: 'if', label: 'IF', icon: '🔀' },
            { slug: 'vlookup', label: 'VLOOKUP', icon: '📊' },
            { slug: 'countif', label: 'COUNTIF', icon: '📋' },
            { slug: 'edate', label: 'EDATE', icon: '📅' },
            { slug: 'extract-domain', label: 'Extract Domain', icon: '🌐' },
            { slug: 'extract-email', label: 'Extract Email', icon: '📧' },
          ].map((item) => (
            <Link
              key={item.slug}
              href={`/formulas/${item.slug}`}
              className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm font-medium text-gray-700 hover:border-green-300 hover:bg-green-50 hover:text-green-700 hover:shadow-sm transition-all"
            >
              <span>{item.icon}</span>
              <span className="truncate">{item.label}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Scenarios Navigation (Intent-based) */}
      <div className="mb-12 border-t pt-8 border-gray-100">
        <h2 className="text-xl font-bold text-gray-900 mb-5 text-center">Not Sure Where to Start? Choose Your Scenario:</h2>
        <div className="flex flex-wrap justify-center gap-3">
          <Link href="/use-cases/ecommerce" className="inline-flex items-center rounded-full bg-blue-50 text-blue-700 px-5 py-2.5 text-sm font-medium hover:bg-blue-100 hover:shadow-sm transition-all border border-blue-100">
            📦 Ecommerce Sellers
          </Link>
          <Link href="/use-cases/hr" className="inline-flex items-center rounded-full bg-emerald-50 text-emerald-700 px-5 py-2.5 text-sm font-medium hover:bg-emerald-100 hover:shadow-sm transition-all border border-emerald-100">
            👥 HR Professionals
          </Link>
          <Link href="/use-cases/finance" className="inline-flex items-center rounded-full bg-indigo-50 text-indigo-700 px-5 py-2.5 text-sm font-medium hover:bg-indigo-100 hover:shadow-sm transition-all border border-indigo-100">
            💰 Finance & Accounting
          </Link>
          <Link href="/use-cases/marketing" className="inline-flex items-center rounded-full bg-purple-50 text-purple-700 px-5 py-2.5 text-sm font-medium hover:bg-purple-100 hover:shadow-sm transition-all border border-purple-100">
            📈 Marketers & SEO
          </Link>
        </div>
      </div>


      {/* Trending Tools */}
      <div className="mb-12 border-t pt-8 border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">🛠️ Trending Tools</h2>
            <p className="text-sm text-gray-500 mt-1">Interactive calculators and templates</p>
          </div>
          <Link href="/tools" className="text-sm text-green-600 hover:text-green-700 font-medium">
            View all tools →
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { slug: 'gpa-calculator-excel', title: 'GPA Calculator', desc: 'Weighted & unweighted GPA', icon: '🎓' },
            { slug: 'excel-gradebook-template', title: 'Gradebook Template', desc: 'Import, export & auto-calculate', icon: '📝' },
            { slug: 'regex-extract-generator', title: 'Regex Extractor', desc: 'Extract patterns with regex', icon: '🔧' },
            { slug: 'sumifs-across-sheets', title: 'SUMIFS Across Sheets', desc: 'Multi-sheet summation', icon: '📑' },
          ].map((tool) => (
            <Link
              key={tool.slug}
              href={`/tools/${tool.slug}`}
              className="flex items-start gap-3 rounded-xl border border-gray-200 bg-white p-4 hover:border-green-300 hover:shadow-sm transition-all"
            >
              <span className="text-2xl">{tool.icon}</span>
              <div>
                <p className="text-sm font-semibold text-gray-900">{tool.title}</p>
                <p className="text-xs text-gray-500 mt-0.5">{tool.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Industry Solutions */}
      <div className="mb-12 border-t pt-8 border-gray-100">
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

      {/* Why SheetMaster */}
      <div className="mb-6 rounded-xl bg-gray-50 border border-gray-100 p-6 sm:p-8">
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
    </div>
  );
}
