import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import Link from "next/link";
import FeedbackWidget from "@/components/FeedbackWidget";
import EnhancedGARouteTracker from "@/components/EnhancedGARouteTracker";
import { Analytics } from "@vercel/analytics/react";
import Script from "next/script";

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "SheetMaster",
  "url": "https://www.getsheetmaster.com",
  "logo": "https://www.getsheetmaster.com/logo.png",
  "description": "Free Excel and Google Sheets formula generators. No AI, no signup.",
  "contactPoint": {
    "@type": "ContactPoint",
    "email": "support@getsheetmaster.com",
    "contactType": "customer support"
  },
  "sameAs": [],
};

/* Inter: SIL OFL 1.1 鍏嶈垂鍙晢鐢?*/
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://www.getsheetmaster.com"),
  title: {
    default: 'SheetMaster 鈥?Free Excel & Google Sheets Formula Generator (50+ Formulas)',
    template: "%s",
  },
  description: 'Free tools to generate Excel and Google Sheets formulas instantly. No AI, no signup. Master VLOOKUP, IF, SUMIF, XLOOKUP, and 50+ formulas.',
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
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
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
        <script
          type="text/javascript"
          dangerouslySetInnerHTML={{
            __html: `
              (function(c,l,a,r,i,t,y){
                  c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                  t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                  y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "ycc1p10y63");
            `,
          }}
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
              <Link href="/about" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
                About
              </Link>
              <Link href="/vault" className="text-sm font-bold text-indigo-600 bg-indigo-50 px-3 py-1.5 rounded-full hover:bg-indigo-100 transition-colors flex items-center gap-1">
                ☁️ My Vault
              </Link>
            </div>
          </div>
        </nav>
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 pt-24 bg-white min-h-screen">
          {children}
        </main>
        <footer className="bg-gray-50 border-t border-gray-200 py-8 mt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
                <p className="text-gray-500 text-sm">
                  © {new Date().getFullYear()} SheetMaster. All rights reserved.
                </p>
                <a
                  href="https://productwatch.io"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center hover:opacity-90 transition-opacity"
                >
                  <img
                    src="https://productwatch.io/backend/api/v1/badge/featured?productId=acb182f6-5121-4244-95bf-431f57cf5ec7&darkMode=false"
                    alt="SheetMaster"
                    style={{ maxWidth: "250px" }}
                    className="h-9 w-auto"
                  />
                </a>
              </div>
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        {/* Google Analytics */}
        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', {
                page_path: window.location.pathname + window.location.search,
              });
            `,
          }}
        />
        <FeedbackWidget />
        <EnhancedGARouteTracker />
        <Analytics />
      </body>
    </html>
  );
}



