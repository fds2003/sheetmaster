import { MetadataRoute } from 'next';
import { FORMULAS } from '@/lib/formulas';
import { SOLUTIONS } from '@/lib/solutions';
import { BLOG_POSTS } from '@/lib/posts';
import { USE_CASES } from '@/lib/use-cases';

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
        {
            url: `${baseUrl}/blog`,
            lastModified: new Date(),
            priority: 0.7,
        },
        {
            url: `${baseUrl}/resources`,
            lastModified: new Date(),
            priority: 0.7,
        },
        {
            url: `${baseUrl}/tools/remove-duplicates`,
            lastModified: new Date(),
            priority: 0.7,
        },
        {
            url: `${baseUrl}/tools/split-text`,
            lastModified: new Date(),
            priority: 0.7,
        },
        {
            url: `${baseUrl}/tools/excel-age-calculator`,
            lastModified: new Date(),
            priority: 0.8,
        },
        {
            url: `${baseUrl}/tools/gpa-calculator-excel`,
            lastModified: new Date(),
            priority: 0.8,
        },
        {
            url: `${baseUrl}/tools/excel-gradebook-template`,
            lastModified: new Date(),
            priority: 0.8,
        },
        {
            url: `${baseUrl}/tools/bom-inventory`,
            lastModified: new Date(),
            priority: 0.8,
        },
        {
            url: `${baseUrl}/tools/regex-extract-generator`,
            lastModified: new Date(),
            priority: 0.8,
        },
        {
            url: `${baseUrl}/tools/sumifs-across-sheets`,
            lastModified: new Date(),
            priority: 0.8,
        },
        {
            url: `${baseUrl}/compare/vlookup-vs-xlookup`,
            lastModified: new Date(),
            priority: 0.7,
        },
        {
            url: `${baseUrl}/use-cases`,
            lastModified: new Date(),
            priority: 0.7,
        },
        {
            url: `${baseUrl}/solutions`,
            lastModified: new Date(),
            priority: 0.7,
        },
    ];

    // Use-case (industry) routes
    const useCaseRoutes = USE_CASES.map((uc) => ({
        url: `${baseUrl}/use-cases/${uc.slug}`,
        lastModified: new Date(),
        priority: 0.7,
    }));

    // Blog post routes
    const blogRoutes = BLOG_POSTS.map((post) => ({
        url: `${baseUrl}/blog/${post.slug}`,
        lastModified: new Date(),
        priority: 0.7,
    }));

    // Dynamic routes from formulas
    const formulaRoutes = FORMULAS.map((formula) => ({
        url: `${baseUrl}/formulas/${formula.slug}`,
        lastModified: new Date(),
        priority: 0.8,
    }));

    // Dynamic routes from solutions (high priority industry tools)
    const solutionRoutes = SOLUTIONS.map((solution) => ({
        url: `${baseUrl}/solutions/${solution.slug}`,
        lastModified: new Date(),
        priority: 0.9,
    }));

    return [...routes, ...blogRoutes, ...useCaseRoutes, ...solutionRoutes, ...formulaRoutes];
}
