"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Auth } from "@supabase/auth-ui-react"
import { ThemeSupa } from "@supabase/auth-ui-shared"
import { supabase } from "@/lib/supabase"
import { Brain } from "lucide-react"

export default function LoginPage() {
  const router = useRouter()

  useEffect(() => {
    // Listen for auth events. If they successfully log in, redirect them back to the workspace!
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        router.push("/documents")
      }
    })

    return () => subscription.unsubscribe()
  }, [router])

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      
      {/* Background glow effects to match your app */}
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 left-1/4 size-[28rem] rounded-full bg-primary/10 blur-[120px]" />
      </div>

      <div className="w-full max-w-md rounded-2xl border border-border bg-card/50 p-8 shadow-2xl backdrop-blur-xl">
        <div className="mb-8 flex flex-col items-center text-center">
          <span className="mb-4 flex size-12 items-center justify-center rounded-xl bg-primary/15 text-primary ring-1 ring-primary/25">
            <Brain className="size-6" />
          </span>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Welcome to CortexOS</h1>
          <p className="mt-2 text-sm text-muted-foreground">Sign in to save your documents permanently.</p>
        </div>

        {/* The Magic Supabase Component */}
        <Auth
          supabaseClient={supabase}
          appearance={{ 
            theme: ThemeSupa,
            variables: {
              default: {
                colors: {
                  brand: 'hsl(var(--primary))',
                  brandAccent: 'hsl(var(--primary))',
                }
              }
            }
          }}
          theme="dark"
          providers={['google', 'github']} // You can remove this line if you only want Email/Password
        />
      </div>
    </div>
  )
}