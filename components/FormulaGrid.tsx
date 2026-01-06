'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { ArrowRight, SearchX } from 'lucide-react';
import SearchBar from './SearchBar';
import AdUnit from './AdUnit';

// 简化的公式数据类型（不包含函数）
export interface FormulaCardData {
  slug: string;
  excelFunction: string;
  category: string;
  description: string;
}

interface FormulaGridProps {
  formulas: FormulaCardData[];
}

export default function FormulaGrid({ formulas }: FormulaGridProps) {
  const [searchQuery, setSearchQuery] = useState('');

  // Filter formulas based on search query
  const filteredFormulas = useMemo(() => {
    if (!searchQuery.trim()) {
      return formulas;
    }

    const query = searchQuery.toLowerCase().trim();
    return formulas.filter((formula) => {
      const nameMatch = formula.excelFunction.toLowerCase().includes(query);
      const descMatch = formula.description.toLowerCase().includes(query);
      const categoryMatch = formula.category.toLowerCase().includes(query);
      const slugMatch = formula.slug.toLowerCase().includes(query);
      return nameMatch || descMatch || categoryMatch || slugMatch;
    });
  }, [formulas, searchQuery]);

  return (
    <>
      {/* Search Bar */}
      <SearchBar
        value={searchQuery}
        onChange={setSearchQuery}
        resultCount={filteredFormulas.length}
        totalCount={formulas.length}
      />

      {/* Formula Grid */}
      {filteredFormulas.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredFormulas.map((formula) => (
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
      ) : (
        /* No Results */
        <div className="text-center py-16">
          <SearchX className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No formulas found for &quot;{searchQuery}&quot;
          </h3>
          <p className="text-gray-500 mb-6">
            Try searching for VLOOKUP, SUM, IF, or browse by category
          </p>
          <button
            onClick={() => setSearchQuery('')}
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
          >
            Clear search
          </button>
        </div>
      )}
    </>
  );
}
