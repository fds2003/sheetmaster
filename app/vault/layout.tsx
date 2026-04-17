import React from 'react';
import Link from 'next/link';
import { requirePro } from '@/lib/proAuth';
import { Cloud, ArrowLeft, History } from 'lucide-react';

export const metadata = {
  title: 'My Vault | SheetMaster',
};

export default async function VaultLayout({ children }: { children: React.ReactNode }) {
  // Enforce PRO access
  const user = await requirePro();

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link href="/" className="text-gray-400 hover:text-gray-600 transition-colors">
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <div className="w-px h-6 bg-gray-200"></div>
              <h1 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <Cloud className="w-6 h-6 text-indigo-600" />
                My Vault
              </h1>
            </div>
            
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium text-gray-500 hidden sm:block truncate max-w-[200px]">
                {user.email}
              </span>
              <span className="bg-indigo-100 text-indigo-700 text-xs px-2.5 py-1 rounded-full font-bold">
                PRO Member
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Main View */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
}
