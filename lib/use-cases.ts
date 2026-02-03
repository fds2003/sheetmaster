/**
 * Use-case (industry) landing page configuration.
 * Each use-case aggregates recommended formulas and tools for a vertical (e.g. accountants, data analysts).
 */

export interface UseCase {
  slug: string;
  title: string;
  description: string;
  metaDescription?: string;
  /** Formula slugs to link to /formulas/[slug] */
  formulas: string[];
  /** Tool or solution paths, e.g. /tools/remove-duplicates, /solutions/data-cleaning */
  tools: { label: string; href: string }[];
  painPoints?: string[];
  ctaText?: string;
}

export const USE_CASES: UseCase[] = [
  {
    slug: 'accountants',
    title: 'Excel for Accountants',
    description:
      'Formulas and tools that accountants use daily: lookups, conditional sums, date math, and loan/amortization helpers.',
    metaDescription:
      'Excel and Google Sheets formulas for accountants: VLOOKUP, SUMIF, IF, loan calculators, and amortization. Free generators, no signup.',
    formulas: ['vlookup', 'sumif', 'if', 'sumifs', 'xlookup'],
    tools: [
      { label: 'Loan Calculator', href: '/solutions/loan-calculator' },
      { label: 'Subscription Tracker', href: '/solutions/subscription-tracker' },
    ],
    painPoints: [
      'Match client IDs or account codes across sheets',
      'Sum by category, period, or condition',
      'Calculate loan payments and amortization',
    ],
    ctaText: 'Try a formula',
  },
  {
    slug: 'data-analysts',
    title: 'Excel for Data Analysts',
    description:
      'Lookups, deduplication, text splitting, and conditional logic to clean and analyze data without leaving the sheet.',
    metaDescription:
      'Excel and Google Sheets for data analysts: INDEX MATCH, XLOOKUP, remove duplicates, split text. Free formula generators, no signup.',
    formulas: ['index-match', 'xlookup', 'vlookup', 'sumif', 'if'],
    tools: [
      { label: 'Remove Duplicates', href: '/tools/remove-duplicates' },
      { label: 'Split Text', href: '/tools/split-text' },
      { label: 'Data Cleaning', href: '/solutions/data-cleaning' },
    ],
    painPoints: [
      'Look up values from any column (including left)',
      'Deduplicate lists and keep first or latest',
      'Split names, emails, or delimited text into columns',
    ],
    ctaText: 'Try a formula',
  },
];
