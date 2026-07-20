'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, Suspense } from 'react';

/**
 * Enhanced GA4 event tracker for SheetMaster.
 * Tracks: page views with page type, formula interactions, tool usage, CTA clicks.
 */

declare global {
  interface Window {
    dataLayer: any[];
    gtag?: (...args: any[]) => void;
  }
}

// Detect page type from pathname
function detectPageType(pathname: string): string {
  if (pathname.startsWith('/formulas/')) return 'formula';
  if (pathname.startsWith('/blog/')) return 'blog';
  if (pathname.startsWith('/solutions/')) return 'solution';
  if (pathname.startsWith('/tools/')) return 'tool';
  if (pathname.startsWith('/use-cases/')) return 'use-case';
  if (pathname === '/' || pathname === '') return 'homepage';
  return 'other';
}

// Extract formula slug from pathname
function extractFormulaSlug(pathname: string): string | null {
  const match = pathname.match(/^\/formulas\/([^/]+)/);
  return match ? match[1] : null;
}

// Extract blog slug from pathname
function extractBlogSlug(pathname: string): string | null {
  const match = pathname.match(/^\/blog\/([^/]+)/);
  return match ? match[1] : null;
}

// Extract tool slug from pathname
function extractToolSlug(pathname: string): string | null {
  const match = pathname.match(/^\/tools\/([^/]+)/);
  return match ? match[1] : null;
}

/**
 * Send a custom GA4 event.
 */
function sendGAEvent(eventName: string, params: Record<string, any> = {}) {
  if (typeof window === 'undefined' || !window.gtag) return;
  window.gtag('event', eventName, {
    ...params,
    send_to: process.env.NEXT_PUBLIC_GA_ID,
  });
}

/**
 * Track page view with enhanced metadata.
 */
function trackPageView(pathname: string) {
  const pageType = detectPageType(pathname);
  const formulaSlug = extractFormulaSlug(pathname);
  const blogSlug = extractBlogSlug(pathname);
  const toolSlug = extractToolSlug(pathname);

  sendGAEvent('page_view', {
    page_type: pageType,
    formula_name: formulaSlug,
    article_slug: blogSlug,
    tool_name: toolSlug,
    page_path: pathname + window.location.search,
  });
}

/**
 * Track formula generation event.
 */
export function trackFormulaGenerated(formulaName: string, criteriaCount: number = 0) {
  sendGAEvent('formula_generated', {
    formula_name: formulaName,
    criteria_count: criteriaCount,
    page_type: 'formula',
  });
}

/**
 * Track formula copy event.
 */
export function trackFormulaCopied(formulaName: string, copyMethod: string = 'button_click') {
  sendGAEvent('formula_copied', {
    formula_name: formulaName,
    copy_method: copyMethod,
    page_type: 'formula',
  });
}

/**
 * Track CTA click event.
 */
export function trackCtaClick(ctaText: string, location: string) {
  sendGAEvent('cta_clicked', {
    cta_text: ctaText,
    location: location,
  });
}

/**
 * Track search performed event.
 */
export function trackSearch(searchQuery: string, resultsCount: number) {
  sendGAEvent('search_performed', {
    search_query: searchQuery,
    results_count: resultsCount,
  });
}

/**
 * Track FAQ expand event.
 */
export function trackFaqExpand(questionText: string) {
  sendGAEvent('faq_expanded', {
    question: questionText.substring(0, 100),
  });
}

/**
 * Track scroll depth.
 */
export function trackScrollDepth(depth: number) {
  sendGAEvent('scroll_depth', {
    depth_percent: depth,
  });
}

// --- Client Component: Enhanced Route Tracker ---

function EnhancedRouteTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (typeof window === 'undefined' || !window.gtag || !pathname) return;

    const url = pathname + (searchParams?.toString() ? '?' + searchParams.toString() : '');

    // Standard page_view
    window.gtag('config', process.env.NEXT_PUBLIC_GA_ID || '', {
      page_path: url,
    });

    // Enhanced page_view with custom dimensions
    const pageType = detectPageType(pathname);
    const formulaSlug = extractFormulaSlug(pathname);
    const blogSlug = extractBlogSlug(pathname);
    const toolSlug = extractToolSlug(pathname);

    window.gtag('event', 'page_view', {
      page_type: pageType,
      formula_name: formulaSlug,
      article_slug: blogSlug,
      tool_name: toolSlug,
    });

    // Scroll depth tracking
    let lastDepth = 0;
    const handleScroll = () => {
      const scrollPercent = Math.round(
        ((window.innerHeight + window.scrollY) / document.documentElement.scrollHeight) * 100
      );
      const depthBuckets = [25, 50, 75, 100];
      for (const bucket of depthBuckets) {
        if (scrollPercent >= bucket && lastDepth < bucket) {
          lastDepth = bucket;
          window.gtag('event', 'scroll_depth', {
            depth_percent: bucket,
          });
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [pathname, searchParams]);

  return null;
}

export default function EnhancedGARouteTracker() {
  return (
    <Suspense>
      <EnhancedRouteTracker />
    </Suspense>
  );
}
