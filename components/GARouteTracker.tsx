'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, Suspense } from 'react';

/**
 * Track page views on client-side route changes for Next.js App Router.
 * Sends a page_view event to GA4 whenever the pathname or search params change.
 */
function RouteTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (typeof window === 'undefined' || !window.gtag || !pathname) return;

    const url = pathname + (searchParams?.toString() ? '?' + searchParams.toString() : '');
    window.gtag('config', process.env.NEXT_PUBLIC_GA_ID || '', {
      page_path: url,
    });
  }, [pathname, searchParams]);

  return null;
}

/**
 * Suspense boundary wrapper for RouteTracker to avoid SSR issues.
 */
export default function GARouteTracker() {
  return (
    <Suspense>
      <RouteTracker />
    </Suspense>
  );
}
