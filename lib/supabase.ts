import { createClient } from '@supabase/supabase-js'

// Safe fallbacks to prevent empty string crashes during initialization
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

/**
 * Gets or creates a local tracking ID for guest users safely.
 */
export function getOrCreateWorkspaceSession(): { id: string; type: 'guest' | 'user' } {
  // Guard clause for Next.js Server-Side Rendering (SSR)
  if (typeof window === 'undefined') {
    return { id: '', type: 'guest' }
  }

  try {
    // 1. Safe parsing of the Supabase Project ID to locate auth cookies/tokens
    if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_URL.includes('//')) {
      const projectId = process.env.NEXT_PUBLIC_SUPABASE_URL.split('//')[1]?.split('.')[0]
      const storageKey = `sb-${projectId}-auth-token`
      const token = localStorage.getItem(storageKey)
      
      if (token) {
        const session = JSON.parse(token)
        if (session?.user?.id) {
          return { id: session.user.id, type: 'user' }
        }
      }
    }
  } catch (error) {
    console.error("Error reading authentication session:", error)
  }

  // 2. Fallback to a stable, persistent Guest tracking ID
  // 2. Fallback to a stable, persistent Guest tracking ID
  try {
    // Changed the key name to force the browser to forget the old 'guest_' string
    let guestId = localStorage.getItem('cortex_workspace_uuid') 
    if (!guestId) {
      // Generate a pure UUID without the "guest_" prefix
      guestId = crypto.randomUUID() 
      localStorage.setItem('cortex_workspace_uuid', guestId)
    }
    return { id: guestId, type: 'guest' }
  } catch (error) {
    console.error("Error managing guest workspace token:", error)
    return { id: crypto.randomUUID(), type: 'guest' }
  }
}