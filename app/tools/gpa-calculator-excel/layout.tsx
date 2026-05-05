import type { Metadata } from 'next';

const canonical = 'https://www.getsheetmaster.com/tools/gpa-calculator-excel';

export const metadata: Metadata = {
  title: 'GPA Calculator Excel — Weighted GPA from Grades & Credits',
  description:
    'Compute weighted GPA in Excel or Google Sheets. Interactive GPA calculator with grade points and credit hours—free formulas, no signup.',
  alternates: { canonical },
  openGraph: {
    title: 'GPA Calculator Excel — Weighted GPA from Grades & Credits',
    description:
      'Free GPA calculator for spreadsheet users. Enter courses, grades, and credits to get weighted GPA formulas.',
    url: canonical,
    type: 'website',
    siteName: 'SheetMaster',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GPA Calculator Excel — Weighted GPA from Grades & Credits',
    description: 'Interactive GPA calculator with Excel-ready formulas for students and advisors.',
  },
};

export default function GpaCalculatorLayout({ children }: { children: React.ReactNode }) {
  return children;
}
