import Link from 'next/link';
import { BLOG_POSTS } from '@/lib/posts';
import { FORMULAS } from '@/lib/formulas';
import { notFound } from 'next/navigation';
import BlogPrimaryToolCta from '@/components/BlogPrimaryToolCta';
import type { Metadata } from 'next';

export async function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const post = BLOG_POSTS.find((p) => p.slug === params.slug);
  if (!post) {
    return { title: 'Post Not Found | SheetMaster' };
  }
  const url = `https://www.getsheetmaster.com/blog/${post.slug}`;
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: url },
    openGraph: {
      title: post.title,
      description: post.description,
      url,
      type: 'article',
      siteName: 'SheetMaster',
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
    },
  };
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = BLOG_POSTS.find((p) => p.slug === params.slug);
  if (!post) notFound();

  // NOTE: 仅当文章配置了 faqs 字段时才生成 FAQPage 结构化数据，
  // 避免空 schema 被搜索引擎误判为低质量数据。
  const faqJsonLd =
    post.faqs && post.faqs.length > 0
      ? {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: post.faqs.map((faq) => ({
            '@type': 'Question',
            name: faq.question,
            acceptedAnswer: {
              '@type': 'Answer',
              text: faq.answer,
            },
          })),
        }
      : null;

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post.title,
    "description": post.description,
    "datePublished": post.date,
    "author": {
      "@type": "Organization",
      "name": "SheetMaster",
      "url": "https://www.getsheetmaster.com",
    },
    "publisher": {
      "@type": "Organization",
      "name": "SheetMaster",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.getsheetmaster.com/logo.png",
      },
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://www.getsheetmaster.com/blog/${post.slug}`,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      {/* FAQPage JSON-LD — 仅有 faqs 字段时注入，提升搜索结果富摘要展示机会 */}
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}
      <article className="max-w-3xl mx-auto">
        <Link href="/blog" className="text-sm text-gray-500 hover:text-gray-900 mb-6 inline-block">
          ← Back to Blog
        </Link>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{post.title}</h1>
        <time className="block text-sm text-gray-500 mb-8" dateTime={post.date}>
          {new Date(post.date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </time>
        {post.toolCta ? (
          <BlogPrimaryToolCta
            href={post.toolCta.href}
            label={post.toolCta.label}
            subLink={post.toolCta.subLink}
          />
        ) : null}
        {post.content ? (
          <div
            className="prose prose-slate max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        ) : (
          <p className="text-gray-600">{post.description}</p>
        )}

        {/* Related Formulas — Drive traffic from blog to formula generator pages */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <h2 className="text-xl font-bold text-gray-900 mb-4">📋 Related Formula Tools</h2>
          <p className="text-sm text-gray-600 mb-4">
            Want to generate the formula directly? Try our free formula generators:
          </p>
          <div className="flex flex-wrap gap-2">
            {FORMULAS.slice(0, 12).map((f) => (
              <Link
                key={f.slug}
                href={`/formulas/${f.slug}`}
                className="inline-flex items-center rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-green-50 hover:border-green-200 hover:text-green-700 transition-colors"
              >
                {f.excelFunction}
              </Link>
            ))}
          </div>
        </div>

        {/* Newsletter CTA */}
        <div className="mt-8 rounded-xl bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-2">📬 Get Weekly Excel Tips</h3>
          <p className="text-sm text-gray-600 mb-4">
            Join thousands of Excel users who receive our weekly formula tips, tricks, and productivity hacks.
          </p>
          <Link
            href="https://mailchi.mp/getsheetmaster/subscribe"
            className="inline-flex items-center rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700 transition-colors"
          >
            Subscribe Free →
          </Link>
        </div>

        {/* Continue Reading */}
        <div className="mt-8 pt-8 border-t border-gray-200">
          <h2 className="text-xl font-bold text-gray-900 mb-4">📖 Continue Reading</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {BLOG_POSTS.filter(p => p.slug !== post.slug)
              .slice(0, 4)
              .map((relatedPost) => (
                <Link
                  key={relatedPost.slug}
                  href={`/blog/${relatedPost.slug}`}
                  className="block rounded-lg border border-gray-200 p-4 hover:border-green-300 hover:shadow-sm transition-all"
                >
                  <h3 className="text-sm font-semibold text-gray-900 mb-1 line-clamp-2">{relatedPost.title}</h3>
                  <p className="text-xs text-gray-500 line-clamp-2">{relatedPost.description}</p>
                </Link>
              ))}
          </div>
        </div>
      </article>
    </>
  );
}
