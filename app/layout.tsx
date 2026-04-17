import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import Link from "next/link";
import FeedbackWidget from "@/components/FeedbackWidget";
import { Analytics } from "@vercel/analytics/react";
import Script from "next/script";

/* Inter: SIL OFL 1.1 免费可商用 */
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

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
  description: "Free tools to generate Excel and Google Sheets formulas instantly. No AI, no signup. Master VLOOKUP, IF, SUMIF, and 50+ formulas.",
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
    description: "Generate Excel and Google Sheets formulas instantly. No AI, no signup. VLOOKUP, IF, SUMIF, and 50+ tools.",
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
    description: "Generate Excel and Google Sheets formulas instantly. No AI, no signup. Free formula generators.",
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
      <head>
        <script
          src="https://analytics.ahrefs.com/analytics.js"
          data-key="3o5w9cs2gv8DjY2Et/UkCw"
          async
        />
      </head>
      <body className={`${inter.variable} ${inter.className} bg-white`}>
        <nav className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-50 h-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
            <Link href="/" className="text-xl font-bold text-gray-900 hover:text-green-600 transition-colors">
              SheetMaster
            </Link>
            <div className="flex items-center gap-6">
              <Link href="/use-cases" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
                Use Cases
              </Link>
              <Link href="/blog" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
                Blog
              </Link>
              <Link href="/resources" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
                Resources
              </Link>
              <Link href="/vault" className="text-sm font-bold text-indigo-600 bg-indigo-50 px-3 py-1.5 rounded-full hover:bg-indigo-100 transition-colors flex items-center gap-1">
                ☁️ My Vault
              </Link>
            </div>
          </div>
        </nav>
        {/* IndexNow: Auto-submit current page URL on page load */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
(function() {
  var key = 'B4D1A61564BD21F77BDEC9F74D26FC75';
  var url = window.location.href;
  
  // Submit URL to IndexNow via our API endpoint
  fetch('/api/indexnow', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ key: key, url: url })
  }).catch(function(e) {
    // Silently fail - IndexNow is non-critical
  });
})();
            `.trim(),
          }}
        />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 pt-24 bg-white min-h-screen">
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
        <Script src="https://pl29172607.profitablecpmratenetwork.com/a9/4b/7e/a94b7ee0e1a59ee2004562ef5af5fc4e.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}
