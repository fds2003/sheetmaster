import React from 'react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { requirePro } from '@/lib/proAuth';
import { FORMULAS } from '@/lib/formulas';
import { FolderOpen, Clock, ArrowRight, Trash2 } from 'lucide-react';
import { revalidatePath } from 'next/cache';

export const revalidate = 0;

export default async function VaultPage() {
  const user = await requirePro();
  const supabase = createClient();

  const { data: vaults, error } = await supabase
    .from('saved_formulas')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });

  // Add a server action dummy for deleting to refresh the path
  async function deleteVault(formData: FormData) {
      'use server';
      const id = formData.get('id');
      if (!id) return;
      const sb = createClient();
      await sb.from('saved_formulas').delete().eq('id', id);
      revalidatePath('/vault');
  }

  if (error) {
    return <div className="text-red-500">Error loading vault: {error.message}</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Your Saved Configurations</h2>
      </div>

      {vaults.length === 0 ? (
        <div className="bg-white border text-center border-gray-200 rounded-xl p-12 shadow-sm">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-50 mb-4">
            <FolderOpen className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">Vault is empty</h3>
          <p className="text-gray-500 mb-6 max-w-md mx-auto">
            You haven't saved any formulas yet. Generate a formula and click "Save Configuration" to keep it here for future use.
          </p>
          <Link href="/formulas/vlookup" className="inline-flex items-center justify-center bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-lg font-medium transition-colors">
            Go to Calculators
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {vaults.map((vault) => {
            const formulaDef = FORMULAS.find(f => f.slug === vault.formula_slug);
            const badgeLabel = formulaDef?.excelFunction || vault.formula_slug;
            
            return (
              <div key={vault.id} className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col h-full group relative">
                <div className="flex justify-between items-start mb-4">
                  <span className="bg-indigo-50 text-indigo-700 text-xs font-bold px-2.5 py-1 rounded-md mb-2 inline-block font-mono">
                    {badgeLabel}
                  </span>
                  <form action={deleteVault}>
                    <input type="hidden" name="id" value={vault.id} />
                    <button type="submit" className="text-gray-300 hover:text-red-500 transition-colors p-1" title="Delete configuration">
                       <Trash2 className="w-4 h-4" />
                    </button>
                  </form>
                </div>
                
                <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-1" title={vault.name}>
                  {vault.name}
                </h3>
                
                <div className="text-sm text-gray-500 mb-6 flex-grow flex flex-col gap-1.5">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    {new Date(vault.created_at).toLocaleDateString()}
                  </div>
                  <div className="text-xs bg-gray-50 p-2 rounded text-gray-600 font-mono mt-2 line-clamp-2">
                    {Object.keys(vault.settings).length} parameters saved
                  </div>
                </div>
                
                <Link 
                  href={`/formulas/${vault.formula_slug}?vault=${vault.id}`}
                  className="mt-auto w-full inline-flex items-center justify-center gap-2 bg-gray-50 hover:bg-indigo-50 text-gray-700 hover:text-indigo-700 px-4 py-2.5 rounded-lg font-medium transition-colors border border-gray-200 hover:border-indigo-200"
                >
                  Load Configuration <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
