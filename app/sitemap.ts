import { MetadataRoute } from 'next';
import { FORMULAS } from '@/lib/formulas';
import { SOLUTIONS } from '@/lib/solutions';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = 'https://www.getsheetmaster.com';

    // Static routes
    const routes = [
        {
            url: baseUrl,
            lastModified: new Date(),
            priority: 1,
        },
        {
            url: `${baseUrl}/privacy`,
            lastModified: new Date(),
            priority: 0.3,
        },
        {
            url: `${baseUrl}/terms`,
            lastModified: new Date(),
            priority: 0.3,
        },
    ];

    // Dynamic routes from formulas
    const formulaRoutes = FORMULAS.map((formula) => ({
        url: `${baseUrl}/formulas/${formula.slug}`,
        lastModified: new Date(),
        priority: 0.8,
    }));

    // Dynamic routes from solutions (高优先级专题页面)
    const solutionRoutes = SOLUTIONS.map((solution) => ({
        url: `${baseUrl}/solutions/${solution.slug}`,
        lastModified: new Date(),
        priority: 0.9,
    }));

    return [...routes, ...solutionRoutes, ...formulaRoutes];
}
