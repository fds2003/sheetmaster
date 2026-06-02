import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Excel Gradebook Template for Teachers | SheetMaster',
  description: 'Free Excel gradebook template for teachers. Interactive demo with automatic averages, letter grades, and percentages. Download ready-to-use template.',
  openGraph: {
    title: 'Excel Gradebook Template for Teachers | SheetMaster',
    description: 'Free interactive gradebook template. Automatic averages, letter grades, and downloadable template.',
    url: 'https://www.getsheetmaster.com/tools/excel-gradebook-template',
    type: 'website',
    siteName: 'SheetMaster',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Excel Gradebook Template for Teachers | SheetMaster',
    description: 'Free interactive gradebook template with automatic grading.',
  },
  alternates: {
    canonical: 'https://www.getsheetmaster.com/tools/excel-gradebook-template',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
