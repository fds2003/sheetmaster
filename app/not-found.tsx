import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center">
      <h1 className="text-6xl font-extrabold text-gray-900 mb-2">404</h1>
      <p className="text-xl text-gray-600 mb-6">This page could not be found.</p>
      <p className="text-gray-500 mb-8 max-w-md">
        The page you&apos;re looking for might have been moved or doesn&apos;t exist. Try one of these:
      </p>
      <div className="flex flex-wrap gap-3 justify-center">
        <Link
          href="/"
          className="inline-flex items-center rounded-lg bg-green-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-green-700 transition-colors"
        >
          Home
        </Link>
        <Link
          href="/use-cases"
          className="inline-flex items-center rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 hover:border-green-300 transition-colors"
        >
          Use Cases
        </Link>
        <Link
          href="/blog"
          className="inline-flex items-center rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 hover:border-green-300 transition-colors"
        >
          Blog
        </Link>
        <Link
          href="/resources"
          className="inline-flex items-center rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 hover:border-green-300 transition-colors"
        >
          Resources
        </Link>
      </div>
    </div>
  );
}
