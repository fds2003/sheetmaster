import { NextRequest } from 'next/server';
import { BLOG_POSTS } from '@/lib/posts';
import { pageToMarkdown } from '@/lib/geo';

/**
 * Markdown mirror: GET /blog/[slug]/md
 * Returns the post as clean markdown with embedded source attribution,
 * so AI agents / LLM fetchers quote content *with* the citation.
 */

export async function GET(
    _request: NextRequest,
    { params }: { params: { slug: string } }
) {
    const slug = params.slug;
    const post = BLOG_POSTS.find((p) => p.slug === slug);
    if (!post) {
        return new Response('Not Found', { status: 404 });
    }

    const markdown = pageToMarkdown(`blog/${slug}`);
    if (!markdown) {
        return new Response('Not Found', { status: 404 });
    }

    return new Response(markdown, {
        headers: {
            'Content-Type': 'text/markdown; charset=utf-8',
            'X-Canonical-URL': `https://www.getsheetmaster.com/blog/${slug}`,
            'Cache-Control': 'public, max-age=3600, s-maxage=86400',
        },
    });
}
