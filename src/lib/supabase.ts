/**
 * Supabase client configuration
 */

import { createBrowserClient } from "@supabase/ssr"

export function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  // Use dummy values if not configured (for development)
  const url = supabaseUrl && supabaseUrl !== "your_supabase_url_here"
    ? supabaseUrl
    : "https://placeholder.supabase.co"

  const key = supabaseKey && supabaseKey !== "your_supabase_anon_key_here"
    ? supabaseKey
    : "placeholder-key"

  return createBrowserClient(url, key)
}

export function isSupabaseConfigured(): boolean {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  return !!(
    supabaseUrl &&
    supabaseKey &&
    supabaseUrl !== "your_supabase_url_here" &&
    supabaseKey !== "your_supabase_anon_key_here"
  )
}

/**
 * Check if user is authorized admin
 */
export function isAuthorizedAdmin(email: string | undefined): boolean {
  if (!email) return false

  const adminEmails = process.env.ADMIN_EMAILS?.split(",").map((e) => e.trim()) || []
  return adminEmails.includes(email)
}
