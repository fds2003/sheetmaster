import { MetadataRoute } from 'next';
import { FORMULAS } from '@/lib/formulas';
import { SOLUTIONS } from '@/lib/solutions';
import { BLOG_POSTS } from '@/lib/posts';
import { USE_CASES } from '@/lib/use-cases';

const BASE_URL = 'https://www.getsheetmaster.com';

function entry(url: string, priority: number, changeFreq: 'daily' | 'weekly' | 'monthly' | 'yearly' = 'weekly') {
    return { url, lastModified: new Date(), changeFrequency: changeFreq, priority };
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    // Static routes
    const routes = [
        entry(BASE_URL, 1.0, 'daily'),
        entry(`${BASE_URL}/about`, 0.5, 'monthly'),
        entry(`${BASE_URL}/privacy`, 0.3, 'monthly'),
        entry(`${BASE_URL}/terms`, 0.3, 'monthly'),
        entry(`${BASE_URL}/blog`, 0.8, 'daily'),
        entry(`${BASE_URL}/resources`, 0.7, 'weekly'),
        entry(`${BASE_URL}/tools`, 0.9, 'weekly'),
        entry(`${BASE_URL}/tools/remove-duplicates`, 0.8, 'weekly'),
        entry(`${BASE_URL}/tools/split-text`, 0.8, 'weekly'),
        entry(`${BASE_URL}/tools/excel-age-calculator`, 0.8, 'weekly'),
        entry(`${BASE_URL}/tools/gpa-calculator-excel`, 0.9, 'weekly'),
        entry(`${BASE_URL}/tools/excel-gradebook-template`, 0.9, 'weekly'),
        entry(`${BASE_URL}/tools/bom-inventory`, 0.8, 'weekly'),
        entry(`${BASE_URL}/tools/regex-extract-generator`, 0.8, 'weekly'),
        entry(`${BASE_URL}/tools/sumifs-across-sheets`, 0.8, 'weekly'),
        entry(`${BASE_URL}/tools/formula-comparator`, 0.8, 'weekly'),
        entry(`${BASE_URL}/compare/vlookup-vs-xlookup`, 0.8, 'weekly'),
        entry(`${BASE_URL}/use-cases`, 0.8, 'weekly'),
        entry(`${BASE_URL}/solutions`, 0.8, 'weekly'),
    ];
    const useCaseRoutes = USE_CASES.map((uc) =>
        entry(`${BASE_URL}/use-cases/${uc.slug}`, 0.7, 'weekly')
    );

    const blogRoutes = BLOG_POSTS.map((post) =>
        entry(`${BASE_URL}/blog/${post.slug}`, 0.7, 'weekly')
    );

    const formulaRoutes = FORMULAS.map((formula) =>
        entry(`${BASE_URL}/formulas/${formula.slug}`, 0.8, 'weekly')
    );

    const solutionRoutes = SOLUTIONS.map((solution) =>
        entry(`${BASE_URL}/solutions/${solution.slug}`, 0.9, 'weekly')
    );

    return [...routes, ...blogRoutes, ...useCaseRoutes, ...solutionRoutes, ...formulaRoutes];
}
