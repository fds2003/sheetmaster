import type { Metadata } from 'next';

const canonical = 'https://www.getsheetmaster.com/tools/excel-age-calculator';

export const metadata: Metadata = {
  title: 'Excel Age Calculator — DATEDIF Formula Generator',
  description:
    'Calculate age from a date of birth in Excel or Google Sheets. Instantly generate DATEDIF formulas for years, months, and days. Free, no signup.',
  alternates: { canonical },
  openGraph: {
    title: 'Excel Age Calculator — DATEDIF Formula Generator',
    description:
      'Free Excel age calculator. Enter a date of birth and get the DATEDIF formula for age in years, months, and days.',
    url: canonical,
    type: 'website',
    siteName: 'SheetMaster',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Excel Age Calculator — DATEDIF Formula Generator',
    description:
      'Generate Excel DATEDIF formulas for age from date of birth. Works with Excel and Google Sheets.',
  },
};

export default function ExcelAgeCalculatorLayout({ children }: { children: React.ReactNode }) {
  return children;
}
