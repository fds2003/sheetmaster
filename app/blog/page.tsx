import Link from 'next/link';
import { POSTS } from '@/lib/posts';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Excel and Google Sheets tips, formula guides, and how-to articles. Free resources from SheetMaster.',
  openGraph: {
    title: 'Blog | SheetMaster',
    description: 'Excel and Google Sheets tips, formula guides, and how-to articles.',
    url: 'https://www.getsheetmaster.com/blog',
    type: 'website',
    siteName: 'SheetMaster',
  },
  alternates: {
    canonical: 'https://www.getsheetmaster.com/blog',
  },
};

export default function BlogPage() {
  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Blog</h1>
      <p className="text-gray-600 mb-8">
        Excel and Google Sheets tips, formula guides, and how-to articles.
      </p>
      <ul className="space-y-6">
        {POSTS.map((post) => (
          <li key={post.slug} className="border-b border-gray-100 pb-6 last:border-0">
            <Link href={`/blog/${post.slug}`} className="group">
              <h2 className="text-xl font-semibold text-gray-900 group-hover:text-green-600 transition-colors">
                {post.title}
              </h2>
              <p className="mt-1 text-gray-600 text-sm">{post.description}</p>
              <time className="mt-2 block text-xs text-gray-500" dateTime={post.date}>
                {new Date(post.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </time>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
