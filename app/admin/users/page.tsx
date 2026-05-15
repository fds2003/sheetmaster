import React from 'react';
import { createClient } from '@supabase/supabase-js';

export const revalidate = 0; // Always fetch fresh user data

export default async function AdminUsersPage() {
  const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  // 1. Fetch raw auth users (getting emails and last sign in times)
  const { data: authData, error: authError } = await supabaseAdmin.auth.admin.listUsers({
    page: 1,
    perPage: 1000 // For MVP, grab up to 1000 users. Real scale needs pagination.
  });

  // 2. Fetch profiles to get is_pro and is_admin states
  const { data: profiles } = await supabaseAdmin
    .from('profiles')
    .select('*');

  if (authError) {
    return <div className="p-8 text-red-500">Error fetching users: {authError.message}</div>;
  }

  // Map and merge data
  const users = authData.users.map((authObj) => {
    const profileObj = profiles?.find((p) => p.id === authObj.id);
    return {
      id: authObj.id,
      email: authObj.email,
      last_sign_in_at: authObj.last_sign_in_at,
      created_at: authObj.created_at,
      is_pro: profileObj?.is_pro || false,
      is_admin: profileObj?.is_admin || false,
    };
  }).sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">User Management</h2>
      <div className="bg-white shadow-sm border border-gray-200 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b border-gray-200">
              <tr>
                <th scope="col" className="px-6 py-4 font-semibold">Email</th>
                <th scope="col" className="px-6 py-4 font-semibold">User ID</th>
                <th scope="col" className="px-6 py-4 font-semibold">Status</th>
                <th scope="col" className="px-6 py-4 font-semibold">Role</th>
                <th scope="col" className="px-6 py-4 font-semibold">Joined At</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id} className="bg-white border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-gray-900">
                    {u.email}
                  </td>
                  <td className="px-6 py-4 font-mono text-xs text-gray-400">
                    {u.id.substring(0, 13)}...
                  </td>
                  <td className="px-6 py-4">
                    {u.is_pro ? (
                      <span className="bg-indigo-100 text-indigo-700 px-2.5 py-1 rounded-full text-xs font-semibold whitespace-nowrap">
                        💎 PRO
                      </span>
                    ) : (
                      <span className="bg-gray-100 text-gray-600 px-2.5 py-1 rounded-full text-xs font-semibold whitespace-nowrap">
                        Free Trial
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {u.is_admin ? (
                      <span className="bg-red-100 text-red-700 px-2.5 py-1 rounded-full text-xs font-semibold whitespace-nowrap">
                        Admin
                      </span>
                    ) : (
                      <span className="text-gray-400">User</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-xs whitespace-nowrap">
                    {new Date(u.created_at).toLocaleString()}
                  </td>
                </tr>
              ))}
              {users.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-gray-400">
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
