import { POSTS } from '@/lib/posts';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';

export async function generateStaticParams() {
  return POSTS.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const post = POSTS.find((p) => p.slug === params.slug);
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
  const post = POSTS.find((p) => p.slug === params.slug);
  if (!post) notFound();

  return (
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
      {post.content ? (
        <div
          className="prose prose-slate max-w-none"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      ) : (
        <p className="text-gray-600">{post.description}</p>
      )}
    </article>
  );
}
