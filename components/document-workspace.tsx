"use client"

import { useCallback, useState, useEffect } from "react"
import { Brain, Settings2, Sparkles, UserCircle } from "lucide-react"
import axios from "axios"
import { UploadPanel } from "@/components/upload-panel"
import { ChatPanel } from "@/components/chat-panel"
import { FilesPanel } from "@/components/files-panel"
import { getOrCreateWorkspaceSession } from "@/lib/supabase"
import {
  kindFromFileName,
  type ChatMessage,
  type FileKind,
  type UploadedFile,
} from "@/lib/documents"
import Link from "next/link"
import { supabase } from "@/lib/supabase"

let idCounter = 0
const uid = (prefix: string) => `${prefix}-${Date.now()}-${idCounter++}`

export function DocumentWorkspace() {
  const [files, setFiles] = useState<UploadedFile[]>([])
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [messages, setMessages] = useState<ChatMessage[]>([])
  
  // 1. STATE: Track the user's active session
  const [session, setSession] = useState<{ id: string; type: "guest" | "user" }>({ id: "", type: "guest" })

  // 2. EFFECT: Generate or load the UUID as soon as the page opens
  useEffect(() => {
    const activeSession = getOrCreateWorkspaceSession()
    setSession(activeSession)
  }, [])

  // 3. UPLOAD LOGIC
  const handleUpload = useCallback(
    (incoming: File[]) => {
      if (!session.id) return; // Wait until session loads

      incoming.forEach(async (file) => {
        const newFile: UploadedFile = {
          id: uid("file"),
          name: file.name,
          kind: kindFromFileName(file.name),
          size: file.size,
          pages: 1,
          uploadedAt: Date.now(),
          status: "processing",
        }

        setFiles((prev) => [newFile, ...prev])
        setSelectedId((currentId) => currentId || newFile.id)

        const formData = new FormData()
        formData.append("file", file)
        formData.append("user_id", session.id) // <-- Appends the dynamic user UUID to the FastAPI request

        try {
          await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/upload`, formData, {
            headers: { "Content-Type": "multipart/form-data" },
          })
          
          setFiles((prev) =>
            prev.map((f) => (f.id === newFile.id ? { ...f, status: "ready" } : f))
          )
        } catch (error) {
          console.error("Failed to upload file:", error)
          setFiles((prev) => prev.filter((f) => f.id !== newFile.id))
          alert(`Failed to upload ${file.name}. Is the FastAPI server running?`)
        }
      })
    },
    [session.id] // React watches the session
  )

  const handleRemove = useCallback((id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id))
    setSelectedId((cur) => (cur === id ? null : cur))
  }, [])

  // 4. CONTEXT-AWARE CHAT LOGIC
  const handleSend = useCallback(
    async (content: string) => {
      if (!session.id) return;
      
      const activeFile = files.find((f) => f.id === selectedId)

      const userMsg: ChatMessage = {
        id: uid("msg"),
        role: "user",
        content,
        createdAt: Date.now(),
      }
      const pendingId = uid("msg")
      
      setMessages((prev) => [
        ...prev,
        userMsg,
        {
          id: pendingId,
          role: "assistant",
          content: "",
          createdAt: Date.now(),
          pending: true,
        },
      ])

      try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/chat`, {
          question: content,
          filename: activeFile ? activeFile.name : null,
          user_id: session.id // <-- Sends the dynamic UUID so Qdrant isolates the search
        })

        setMessages((prev) =>
          prev.map((m) =>
            m.id === pendingId
              ? {
                  ...m,
                  pending: false,
                  content: response.data.answer,
                }
              : m
          )
        )
      } catch (error) {
        console.error("Chat Error:", error)
        setMessages((prev) =>
          prev.map((m) =>
            m.id === pendingId
              ? {
                  ...m,
                  pending: false,
                  content: "⚠️ Error connecting to CortexOS AI Engine. Please check the backend.",
                }
              : m
          )
        )
      }
    },
    [files, selectedId, session.id] // React watches the session
  )

  return (
    <div className="flex h-dvh flex-col bg-background">
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      >
        <div className="absolute -top-40 left-1/4 size-[28rem] rounded-full bg-primary/10 blur-[120px]" />
        <div className="absolute -bottom-40 right-1/4 size-[26rem] rounded-full bg-[oklch(0.6_0.13_270)]/10 blur-[120px]" />
      </div>

      <header className="flex items-center justify-between border-b border-border px-4 py-3">
        <div className="flex items-center gap-2.5">
          <span className="flex size-9 items-center justify-center rounded-xl bg-primary/15 text-primary ring-1 ring-primary/25">
            <Brain className="size-5" aria-hidden="true" />
          </span>
          <div className="leading-tight">
            <p className="flex items-center gap-1.5 text-sm font-semibold text-foreground">
              CortexOS
              <span className="rounded-full bg-primary/15 px-1.5 py-0.5 text-[10px] font-medium text-primary ring-1 ring-primary/25">
                Intelligence
              </span>
            </p>
            <p className="text-xs text-muted-foreground">
              Document understanding workspace
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          
          {/* SMART AUTH BUTTON */}
          {session.type === 'guest' ? (
            <Link 
              href="/login"
              className="flex items-center gap-1.5 rounded-lg border border-primary/30 bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary transition-colors hover:bg-primary/20 sm:flex"
            >
              <UserCircle className="size-3.5" aria-hidden="true" />
              Sign in to Save
            </Link>
          ) : (
            <button 
              onClick={async () => {
                await supabase.auth.signOut()
                window.location.reload() // Reload to reset back to guest mode
              }}
              className="flex items-center gap-1.5 rounded-lg border border-border bg-card/40 px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground sm:flex"
            >
              <UserCircle className="size-3.5 text-emerald-500" aria-hidden="true" />
              Sign Out
            </button>
          )}

          <button
            type="button"
            aria-label="Settings"
            className="flex size-9 items-center justify-center rounded-lg border border-border bg-card/40 text-muted-foreground transition-colors hover:text-foreground"
          >
            <Settings2 className="size-4" aria-hidden="true" />
          </button>
        </div>
      </header>

      <div className="grid min-h-0 flex-1 grid-cols-1 lg:grid-cols-[280px_minmax(0,1fr)_320px]">
        <div className="hidden border-r border-border lg:block">
          <UploadPanel onFiles={handleUpload} />
        </div>

        <main className="min-w-0 border-border">
          <ChatPanel
            messages={messages}
            fileCount={files.length}
            onSend={handleSend}
          />
        </main>

        <div className="hidden border-l border-border lg:block">
          <FilesPanel
            files={files}
            selectedId={selectedId}
            onSelect={setSelectedId}
            onRemove={handleRemove}
          />
        </div>
      </div>
    </div>
  )
}