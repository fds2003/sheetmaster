import { MetadataRoute } from 'next';
import { FORMULAS } from '@/lib/formulas';
import { SOLUTIONS } from '@/lib/solutions';
import { BLOG_POSTS } from '@/lib/posts';
import { USE_CASES } from '@/lib/use-cases';
import { TOOL_PAGES, STATIC_PAGES } from '@/lib/geo';

const BASE_URL = 'https://www.getsheetmaster.com';

/** Real dates only — fake `new Date()` lastmod trains crawlers to ignore the field. */
function entry(url: string, priority: number, lastModified?: string, changeFrequency: 'daily' | 'weekly' | 'monthly' | 'yearly' = 'weekly') {
    return {
        url,
        lastModified: lastModified ? new Date(lastModified) : new Date('2026-09-14'),
        changeFrequency,
        priority,
    };
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    // Static routes (no per-page date source — site-wide build date)
    const routes = [
        entry(BASE_URL, 1.0, undefined, 'daily'),
        entry(`${BASE_URL}/about`, 0.5, undefined, 'monthly'),
        entry(`${BASE_URL}/privacy`, 0.3, undefined, 'monthly'),
        entry(`${BASE_URL}/terms`, 0.3, undefined, 'monthly'),
        entry(`${BASE_URL}/blog`, 0.8),
        entry(`${BASE_URL}/resources`, 0.7),
        entry(`${BASE_URL}/tools`, 0.9),
        entry(`${BASE_URL}/use-cases`, 0.8),
        entry(`${BASE_URL}/solutions`, 0.8),
    ];

    const toolRoutes = TOOL_PAGES.map((t) =>
        entry(`${BASE_URL}/${t.path}`, 0.8)
    );

    const geoStaticRoutes = STATIC_PAGES.map((s) =>
        entry(`${BASE_URL}/${s.path}`, 0.8)
    );

    const useCaseRoutes = USE_CASES.map((uc) =>
        entry(`${BASE_URL}/use-cases/${uc.slug}`, 0.7)
    );

    const blogRoutes = BLOG_POSTS.map((post) =>
        entry(`${BASE_URL}/blog/${post.slug}`, 0.7, post.date)
    );

    const formulaRoutes = FORMULAS.map((formula) =>
        entry(`${BASE_URL}/formulas/${formula.slug}`, 0.8)
    );

    const solutionRoutes = SOLUTIONS.map((solution) =>
        entry(`${BASE_URL}/solutions/${solution.slug}`, 0.9)
    );

    return [...routes, ...toolRoutes, ...geoStaticRoutes, ...blogRoutes, ...useCaseRoutes, ...solutionRoutes, ...formulaRoutes];
}
