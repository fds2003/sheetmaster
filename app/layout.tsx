import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import Link from "next/link";
import FeedbackWidget from "@/components/FeedbackWidget";
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({ subsets: ["latin"] });

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://www.getsheetmaster.com"),
  title: {
    default: "SheetMaster - Free Excel & Google Sheets Formula Generators",
    template: "%s | SheetMaster",
  },
  description: "Free tools to generate complex Excel and Google Sheets formulas instantly. Master VLOOKUP, IF, SUMIF, and more with our AI-powered generators.",
  keywords: [
    "Excel formula generator",
    "Google Sheets formulas",
    "VLOOKUP generator",
    "IF statement generator",
    "SUMIF formula",
    "spreadsheet formulas",
    "Excel functions",
    "Google Sheets functions",
  ],
  authors: [{ name: "SheetMaster" }],
  creator: "SheetMaster",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.getsheetmaster.com",
    siteName: "SheetMaster",
    title: "SheetMaster - Free Excel & Google Sheets Formula Generators",
    description: "Generate complex Excel and Google Sheets formulas instantly. AI-powered tools for VLOOKUP, IF, SUMIF, and more.",
    images: [
      {
        url: "/api/og?title=SheetMaster&description=Free%20Excel%20%26%20Google%20Sheets%20Formula%20Generators",
        width: 1200,
        height: 630,
        alt: "SheetMaster - Excel & Google Sheets Formula Generators",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SheetMaster - Free Excel & Google Sheets Formula Generators",
    description: "Generate complex Excel and Google Sheets formulas instantly. AI-powered tools for productivity.",
    images: ["/api/og?title=SheetMaster&description=Free%20Excel%20%26%20Google%20Sheets%20Formula%20Generators"],
  },
  alternates: {
    canonical: "https://www.getsheetmaster.com",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-white`}>
        <nav className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-50 h-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
            <Link href="/" className="text-xl font-bold text-gray-900 hover:text-green-600 transition-colors">
              SheetMaster
            </Link>
          </div>
        </nav>
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 pt-24">
          {children}
        </main>
        <footer className="bg-gray-50 border-t border-gray-200 py-8 mt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-center text-gray-500 text-sm">
                © {new Date().getFullYear()} SheetMaster. All rights reserved.
              </p>
              <div className="flex items-center gap-6">
                <Link href="/privacy" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
                  Privacy Policy
                </Link>
                <Link href="/terms" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
                  Terms of Service
                </Link>
                <a href="mailto:support@getsheetmaster.com" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
                  Contact
                </a>
              </div>
            </div>
          </div>
        </footer>
        <FeedbackWidget />
        <Analytics />
      </body>
    </html>
  );
}
