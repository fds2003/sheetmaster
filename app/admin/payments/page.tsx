import React from 'react';
import Stripe from 'stripe';

export const revalidate = 0; // Don't cache payments data

export default async function AdminPaymentsPage() {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: '2024-06-20',
  });

  let sessions: Stripe.Checkout.Session[] = [];
  let fetchError = null;

  try {
    const response = await stripe.checkout.sessions.list({ limit: 100 });
    sessions = response.data;
  } catch (err: any) {
    fetchError = err.message;
  }

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Payment History</h2>
      
      {fetchError && (
        <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6 text-sm border border-red-200">
          <strong>Stripe fetch error:</strong> {fetchError}. Make sure your STRIPE_SECRET_KEY is configured correctly.
        </div>
      )}

      <div className="bg-white shadow-sm border border-gray-200 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b border-gray-200">
              <tr>
                <th scope="col" className="px-6 py-4 font-semibold">Session ID</th>
                <th scope="col" className="px-6 py-4 font-semibold">User ID</th>
                <th scope="col" className="px-6 py-4 font-semibold">Customer Email</th>
                <th scope="col" className="px-6 py-4 font-semibold">Status</th>
                <th scope="col" className="px-6 py-4 font-semibold">Amount</th>
                <th scope="col" className="px-6 py-4 font-semibold">Created</th>
              </tr>
            </thead>
            <tbody>
              {sessions.map((session) => (
                <tr key={session.id} className="bg-white border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-mono text-xs text-gray-400" title={session.id}>
                    {session.id.substring(0, 16)}...
                  </td>
                  <td className="px-6 py-4 font-mono text-xs text-blue-500" title={session.client_reference_id || 'N/A'}>
                    {session.client_reference_id ? `${session.client_reference_id.substring(0, 8)}...` : 'N/A'}
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-900">
                    {session.customer_details?.email || session.customer_email || 'N/A'}
                  </td>
                  <td className="px-6 py-4">
                    {session.payment_status === 'paid' ? (
                      <span className="bg-green-100 text-green-700 px-2.5 py-1 rounded-full text-xs font-semibold whitespace-nowrap">
                        Paid
                      </span>
                    ) : session.payment_status === 'unpaid' ? (
                      <span className="bg-amber-100 text-amber-700 px-2.5 py-1 rounded-full text-xs font-semibold whitespace-nowrap">
                        Unpaid
                      </span>
                    ) : (
                      <span className="bg-gray-100 text-gray-600 px-2.5 py-1 rounded-full text-xs font-semibold whitespace-nowrap">
                        {session.payment_status}
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-900">
                    ${((session.amount_total || 0) / 100).toFixed(2)}
                  </td>
                  <td className="px-6 py-4 text-xs whitespace-nowrap">
                    {new Date(session.created * 1000).toLocaleString()}
                  </td>
                </tr>
              ))}
              {sessions.length === 0 && !fetchError && (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-gray-400">
                    No transactions found.
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
