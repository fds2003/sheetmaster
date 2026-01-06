'use client';

import { Search, X } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  resultCount: number;
  totalCount: number;
}

export default function SearchBar({ value, onChange, resultCount, totalCount }: SearchBarProps) {
  return (
    <div className="w-full max-w-2xl mx-auto mb-8">
      {/* Search Input */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Search formulas... (e.g., VLOOKUP, SUM, Text)"
          className="block w-full pl-12 pr-12 py-3 border border-gray-200 rounded-xl bg-white shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-400 transition-shadow"
        />
        {value && (
          <button
            onClick={() => onChange('')}
            className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Clear search"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>

      {/* Results Count */}
      <div className="mt-3 text-center text-sm text-gray-500">
        {value ? (
          <span>
            Showing <span className="font-medium text-gray-700">{resultCount}</span> of {totalCount} formulas
          </span>
        ) : (
          <span>
            Showing all <span className="font-medium text-gray-700">{totalCount}</span> formulas
          </span>
        )}
      </div>
    </div>
  );
}

