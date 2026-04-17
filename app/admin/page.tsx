import React from 'react';
import { Users, Crown, DollarSign } from 'lucide-react';
import { createClient } from '@supabase/supabase-js';

// Revalidate this page every 60 seconds (optional, keeps data fresh without hammering DB on every load)
export const revalidate = 60;

export default async function AdminDashboardPage() {
  // Use service role to bypass RLS and fetch global stats
  const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  // 1. Fetch total users (from auth.users via admin api, or just count profiles)
  const { count: totalUsers } = await supabaseAdmin
    .from('profiles')
    .select('*', { count: 'exact', head: true });

  // 2. Fetch total PRO users
  const { count: proUsers } = await supabaseAdmin
    .from('profiles')
    .select('*', { count: 'exact', head: true })
    .eq('is_pro', true);

  // 3. For MVP, revenue is statically calculated based on $4.99 * proUsers
  // Real implementation would pull from Stripe API (Stripe balance or checkout sessions)
  const estimatedRevenue = (proUsers || 0) * 4.99;

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Dashboard Overview</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Metric Card 1 */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 uppercase">Total Users</p>
              <h3 className="text-3xl font-bold text-gray-900">{totalUsers || 0}</h3>
            </div>
          </div>
        </div>

        {/* Metric Card 2 */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center">
              <Crown className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 uppercase">Pro Subscribers</p>
              <h3 className="text-3xl font-bold text-gray-900">{proUsers || 0}</h3>
            </div>
          </div>
        </div>

        {/* Metric Card 3 */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center">
              <DollarSign className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 uppercase">Estimated Revenue</p>
              <h3 className="text-3xl font-bold text-gray-900">${estimatedRevenue.toFixed(2)}</h3>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center text-gray-500">
        <p className="mb-2">Admin Engine Active.</p>
        <p className="text-sm">Use the sidebar to view detailed User Lists and Stripe Payments.</p>
      </div>
    </div>
  );
}
