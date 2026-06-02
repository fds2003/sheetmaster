import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Excel Age Calculator from Date of Birth | SheetMaster',
  description: 'Free Excel age calculator. Enter a date of birth and instantly get the Excel DATEDIF formula to calculate age in years, months, and days.',
  openGraph: {
    title: 'Excel Age Calculator from Date of Birth | SheetMaster',
    description: 'Free Excel age calculator. Enter a date of birth and get the Excel DATEDIF formula instantly.',
    url: 'https://www.getsheetmaster.com/tools/excel-age-calculator',
    type: 'website',
    siteName: 'SheetMaster',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Excel Age Calculator from Date of Birth | SheetMaster',
    description: 'Free Excel age calculator. Get the DATEDIF formula instantly.',
  },
  alternates: {
    canonical: 'https://www.getsheetmaster.com/tools/excel-age-calculator',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
