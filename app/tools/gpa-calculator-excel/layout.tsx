import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'GPA Calculator Excel Template | SheetMaster',
  description: 'Free GPA calculator Excel template. Enter your courses and grades, instantly calculate weighted GPA with the corresponding Excel formulas.',
  openGraph: {
    title: 'GPA Calculator Excel Template | SheetMaster',
    description: 'Free interactive GPA calculator. Enter courses and grades to get your weighted GPA with Excel formulas.',
    url: 'https://www.getsheetmaster.com/tools/gpa-calculator-excel',
    type: 'website',
    siteName: 'SheetMaster',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GPA Calculator Excel Template | SheetMaster',
    description: 'Free interactive GPA calculator with Excel formulas.',
  },
  alternates: {
    canonical: 'https://www.getsheetmaster.com/tools/gpa-calculator-excel',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
