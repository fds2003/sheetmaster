import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    default: 'Free Excel & Google Sheets Tools | SheetMaster',
    template: '%s | SheetMaster',
  },
  description: 'Free Excel and Google Sheets tools for data cleaning, age calculation, GPA, inventory management, and more. No signup required.',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'SheetMaster',
    title: 'Free Excel & Google Sheets Tools | SheetMaster',
    description: 'Free tools for Excel and Google Sheets. No signup required.',
    images: [
      {
        url: '/api/og?title=Free%20Excel%20Tools&description=Data%20cleaning%2C%20calculators%2C%20and%20more',
        width: 1200,
        height: 630,
        alt: 'SheetMaster Tools',
      },
    ],
  },
  alternates: {
    canonical: 'https://www.getsheetmaster.com/tools',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function ToolsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
