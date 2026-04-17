import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  
  // Remember the path to redirect to. Default to home if none provided.
  const next = searchParams.get('next') ?? '/'

  if (code) {
    const supabase = createClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    if (!error) {
      // Successful login, redirect to the intended page (e.g., /formulas/vlookup)
      return NextResponse.redirect(`${origin}${next}`)
    }
  }

  // Return the user to an error page with some instructions
  return NextResponse.redirect(`${origin}/?error=auth_failed`)
}
