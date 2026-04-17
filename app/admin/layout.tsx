import React from 'react';
import Link from 'next/link';
import { requireAdmin } from '@/lib/adminAuth';
import { LayoutDashboard, Users, CreditCard, ArrowLeft } from 'lucide-react';

export const metadata = {
  title: 'Admin Dashboard | SheetMaster',
};

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  // 强校验权限：任何非Admin人员在这个阶段就会被弹飞
  const user = await requireAdmin();

  return (
    <div className="flex h-screen bg-gray-50 flex-col md:flex-row">
      {/* 侧边导航栏 */}
      <aside className="w-full md:w-64 bg-gray-900 border-r border-gray-800 flex-shrink-0 flex flex-col hidden md:flex">
        <div className="p-6 border-b border-gray-800">
          <h1 className="text-xl font-bold text-white flex items-center gap-2">
            <span className="bg-blue-600 rounded p-1">⚡</span>
            Admin Center
          </h1>
          <p className="text-gray-400 text-xs mt-1 truncate">{user.email}</p>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <Link href="/admin" className="flex items-center gap-3 text-gray-300 hover:text-white hover:bg-gray-800 px-3 py-2.5 rounded-lg transition-colors">
            <LayoutDashboard className="w-5 h-5" />
            <span className="font-medium text-sm">Dashboard</span>
          </Link>
          <Link href="/admin/users" className="flex items-center gap-3 text-gray-300 hover:text-white hover:bg-gray-800 px-3 py-2.5 rounded-lg transition-colors">
            <Users className="w-5 h-5" />
            <span className="font-medium text-sm">Users</span>
          </Link>
          <Link href="/admin/payments" className="flex items-center gap-3 text-gray-300 hover:text-white hover:bg-gray-800 px-3 py-2.5 rounded-lg transition-colors">
            <CreditCard className="w-5 h-5" />
            <span className="font-medium text-sm">Payments</span>
          </Link>
        </nav>
        <div className="p-4 border-t border-gray-800">
          <Link href="/" className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors py-2">
             <ArrowLeft className="w-4 h-4" /> 回到前台
          </Link>
        </div>
      </aside>

      {/* 移动端顶栏 (极简适配) */}
      <header className="md:hidden bg-gray-900 p-4 flex items-center justify-between">
          <h1 className="text-lg font-bold text-white flex items-center gap-2">Admin Center</h1>
          <div className="flex gap-4">
             <Link href="/admin" className="text-gray-300 hover:text-white"><LayoutDashboard className="w-5 h-5" /></Link>
             <Link href="/admin/users" className="text-gray-300 hover:text-white"><Users className="w-5 h-5" /></Link>
             <Link href="/admin/payments" className="text-gray-300 hover:text-white"><CreditCard className="w-5 h-5" /></Link>
          </div>
      </header>

      {/* 主视图区 */}
      <main className="flex-1 overflow-y-auto w-full">
        {children}
      </main>
    </div>
  );
}
