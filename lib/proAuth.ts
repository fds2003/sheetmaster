import { createClient } from './supabase/server';
import { redirect } from 'next/navigation';

/**
 * Validates if the current user has PRO status.
 * Returns the user session if valid, redirects to home otherwise.
 */
export async function requirePro() {
  const supabase = createClient();
  
  const { data: { session }, error: sessionError } = await supabase.auth.getSession();
  
  if (sessionError || !session?.user) {
    redirect('/'); 
  }

  // Double check the profile for is_pro
  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('is_pro')
    .eq('id', session.user.id)
    .single();

  if (profileError || !profile || profile.is_pro !== true) {
    redirect('/'); 
  }

  return session.user;
}
