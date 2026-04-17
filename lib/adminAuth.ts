import { createClient } from './supabase/server';
import { redirect } from 'next/navigation';

/**
 * 验证当前用户是否具有 Admin 权限。
 * 如果没有权限，将直接抛出重定向抛出到主页或登录页。
 * 如果有权限，返回用户数据。
 */
export async function requireAdmin() {
  const supabase = createClient();
  
  const { data: { session }, error: sessionError } = await supabase.auth.getSession();
  
  if (sessionError || !session?.user) {
    redirect('/'); // 或者转向 /login
  }

  // 二次验证 Profile 表中的 is_admin 资质
  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('is_admin')
    .eq('id', session.user.id)
    .single();

  if (profileError || !profile || profile.is_admin !== true) {
    redirect('/'); // 不是管理员，送回路人首页
  }

  return session.user;
}
