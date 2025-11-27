import { MetadataRoute } from 'next';
import { FORMULAS } from '@/lib/formulas';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = 'https://www.getsheetmaster.com';

    // Static routes
    const routes = [
        '',
        '/privacy',
        '/terms',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        priority: route === '' ? 1 : 0.8,
    }));

    // Dynamic routes from formulas
    const formulaRoutes = FORMULAS.map((formula) => ({
        url: `${baseUrl}/formulas/${formula.slug}`,
        lastModified: new Date(),
        priority: 0.8,
    }));

    return [...routes, ...formulaRoutes];
}
