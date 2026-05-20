import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { env } from '@/lib/config';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let adminClient: SupabaseClient<any> | null = null;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getSupabaseAdmin(): SupabaseClient<any> {
  if (!adminClient) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    adminClient = createClient<any>(env.supabaseUrl, env.supabaseServiceRoleKey);
  }
  return adminClient;
}
