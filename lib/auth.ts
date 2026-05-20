import { createClient } from './supabase/server';
import { redirect } from 'next/navigation';

type Role = 'is_admin' | 'is_pro';

/**
 * Verify the current user has a specific role on their profile.
 * Redirects to home if not authenticated or the role check fails.
 */
export async function requireRole(role: Role) {
  const supabase = createClient();

  const { data: { session }, error: sessionError } = await supabase.auth.getSession();

  if (sessionError || !session?.user) {
    console.warn(`[Auth] requireRole(${role}): no session, redirecting`);
    redirect('/');
  }

  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('is_admin, is_pro')
    .eq('id', session.user.id)
    .single();

  if (profileError || !profile || profile[role] !== true) {
    console.warn(`[Auth] requireRole(${role}): user ${session.user.id} lacks ${role}, redirecting`);
    redirect('/');
  }

  return session.user;
}

// ---- Backward-compatible convenience wrappers ----

export async function requireAdmin() {
  return requireRole('is_admin');
}

export async function requirePro() {
  return requireRole('is_pro');
}
