import Link from 'next/link';
import { FORMULAS } from '../lib/formulas';
import { ArrowRight } from 'lucide-react';
import AdUnit from '../components/AdUnit';

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
          SheetMaster - Free Excel Formula Generators
        </h1>
        <p className="mt-4 text-xl text-gray-500">
          Master Excel & Google Sheets Formulas. Select a tool below to generate code instantly.
        </p>
      </div>

      {/* Formula Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-12">
        {FORMULAS.map((formula) => (
          <Link
            key={formula.slug}
            href={`/formulas/${formula.slug}`}
            className="relative rounded-2xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer group"
          >
            {/* Category Badge */}
            <span className="text-xs font-medium px-2 py-1 bg-gray-100 rounded-full w-fit mb-2 inline-block">
              {formula.category}
            </span>

            {/* Title */}
            <h3 className="text-lg font-semibold leading-6 text-gray-900 mb-2 pr-16">
              {formula.excelFunction}
            </h3>

            {/* Description */}
            <p className="mt-2 text-sm leading-6 text-gray-600 line-clamp-3">
              {formula.description}
            </p>

            {/* Arrow Icon - Bottom Right */}
            <div className="absolute bottom-4 right-4">
              <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
            </div>
          </Link>
        ))}

        {/* Ad Unit */}
        <div className="sm:col-span-2 lg:col-span-3">
          <AdUnit />
        </div>
      </div>
    </div>
  );
}
