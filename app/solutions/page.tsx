import { SOLUTIONS } from '@/lib/solutions';
import SolutionCard from '@/components/SolutionCard';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Formula Tools by Topic',
  description:
    'Excel and Google Sheets tools by topic: data cleaning, loan calculator, SEO, inventory, subscriptions, grading. Free generators, no signup.',
  openGraph: {
    title: 'Formula Tools | SheetMaster',
    description:
      'Excel and Google Sheets tools by topic. Free formula generators, no signup.',
    url: 'https://www.getsheetmaster.com/solutions',
    type: 'website',
    siteName: 'SheetMaster',
  },
  alternates: {
    canonical: 'https://www.getsheetmaster.com/solutions',
  },
};

export default function SolutionsPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Formula Tools by Topic</h1>
      <p className="text-gray-600 mb-8">
        Browse tools by topic: data cleaning, loans, SEO, inventory, subscriptions, and more.
      </p>
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
    </div>
  );
}
