import type { Metadata } from 'next';

const canonical = 'https://www.getsheetmaster.com/tools/excel-gradebook-template';

export const metadata: Metadata = {
  title: 'Excel Gradebook Template for Teachers — Letter Grades & Averages',
  description:
    'Interactive gradebook demo for Excel and Google Sheets: letter grades, weighted averages, and class stats. Copy the formulas—free, no signup.',
  alternates: { canonical },
  openGraph: {
    title: 'Excel Gradebook Template for Teachers — Letter Grades & Averages',
    description:
      'Teacher-friendly gradebook with IFS letter grades and averages. Build your sheet with ready-to-copy formulas.',
    url: canonical,
    type: 'website',
    siteName: 'SheetMaster',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Excel Gradebook Template for Teachers — Letter Grades & Averages',
    description: 'Gradebook formulas for classrooms—letter grades, averages, pass rates.',
  },
};

export default function GradebookTemplateLayout({ children }: { children: React.ReactNode }) {
  return children;
}
