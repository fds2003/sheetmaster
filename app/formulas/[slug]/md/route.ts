import { NextRequest } from 'next/server';
import { FORMULAS } from '@/lib/formulas';
import { pageToMarkdown } from '@/lib/geo';

/**
 * Markdown mirror: GET /formulas/[slug]/md
 * Returns the page as clean markdown with embedded source attribution,
 * so AI agents / Perplexity fetchers quote content *with* the citation.
 */

export async function GET(
    _request: NextRequest,
    { params }: { params: { slug: string } }
) {
    const slug = params.slug;
    const formula = FORMULAS.find((f) => f.slug === slug);
    if (!formula) {
        return new Response('Not Found', { status: 404 });
    }

    const markdown = pageToMarkdown(`formulas/${slug}`);
    if (!markdown) {
        return new Response('Not Found', { status: 404 });
    }

    return new Response(markdown, {
        headers: {
            'Content-Type': 'text/markdown; charset=utf-8',
            'X-Canonical-URL': `https://www.getsheetmaster.com/formulas/${slug}`,
            'Cache-Control': 'public, max-age=3600, s-maxage=86400',
        },
    });
}
