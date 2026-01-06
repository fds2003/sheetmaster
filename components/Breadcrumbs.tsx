import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';

export interface BreadcrumbItem {
  name: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav className="flex items-center text-sm text-gray-500 mb-6" aria-label="Breadcrumb">
      <ol className="flex items-center space-x-1">
        {/* Home link */}
        <li className="flex items-center">
          <Link
            href="/"
            className="flex items-center hover:text-gray-900 transition-colors"
          >
            <Home className="w-4 h-4" />
            <span className="sr-only">Home</span>
          </Link>
        </li>

        {/* Breadcrumb items */}
        {items.map((item, index) => (
          <li key={index} className="flex items-center">
            <ChevronRight className="w-4 h-4 mx-1 text-gray-400" />
            {item.href ? (
              <Link
                href={item.href}
                className="hover:text-gray-900 transition-colors"
              >
                {item.name}
              </Link>
            ) : (
              <span className="text-gray-700 font-medium">{item.name}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

// JSON-LD Structured Data for Breadcrumbs
interface BreadcrumbJsonLdProps {
  items: BreadcrumbItem[];
}

export function BreadcrumbJsonLd({ items }: BreadcrumbJsonLdProps) {
  const baseUrl = 'https://www.getsheetmaster.com';
  
  const itemListElement = [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: baseUrl,
    },
    ...items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 2,
      name: item.name,
      ...(item.href && { item: `${baseUrl}${item.href}` }),
    })),
  ];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}


