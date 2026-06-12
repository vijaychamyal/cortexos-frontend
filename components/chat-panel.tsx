"use client"

import {
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type KeyboardEvent,
} from "react"
import {
  Sparkles,
  FileText,
  ListChecks,
  NotebookPen,
  HelpCircle,
  ArrowUp,
  Brain,
  Paperclip,
  type LucideIcon,
} from "lucide-react"
import { QUICK_ACTIONS, type ChatMessage } from "@/lib/documents"
import { cn } from "@/lib/utils"

const ACTION_ICONS: Record<string, LucideIcon> = {
  summarize: FileText,
  "key-points": ListChecks,
  notes: NotebookPen,
  quiz: HelpCircle,
}

export function ChatPanel({
  messages,
  fileCount,
  onSend,
}: {
  messages: ChatMessage[]
  fileCount: number
  onSend: (content: string) => void
}) {
  const [input, setInput] = useState("")
  const scrollRef = useRef<HTMLDivElement | null>(null)
  const textareaRef = useRef<HTMLTextAreaElement | null>(null)

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    })
  }, [messages])

  function submit(value: string) {
    const text = value.trim()
    if (!text) return
    onSend(text)
    setInput("")
    if (textareaRef.current) textareaRef.current.style.height = "auto"
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    submit(input)
  }

  function handleKeyDown(e: KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      submit(input)
    }
  }

  const isEmpty = messages.length === 0

  return (
    <section className="flex h-full min-w-0 flex-col">
      {/* Top action bar */}
      <div className="flex items-center gap-2 overflow-x-auto border-b border-border px-4 py-3">
        <span className="mr-1 hidden shrink-0 items-center gap-1.5 text-xs font-medium text-muted-foreground sm:flex">
          <Sparkles className="size-3.5 text-primary" aria-hidden="true" />
          Actions
        </span>
        {QUICK_ACTIONS.map((a) => {
          const Icon = ACTION_ICONS[a.id]
          return (
            <button
              key={a.id}
              type="button"
              onClick={() => submit(a.prompt)}
              className="glass flex shrink-0 items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:border-primary/50 hover:bg-primary/10 hover:text-primary"
            >
              <Icon className="size-3.5" aria-hidden="true" />
              {a.label}
            </button>
          )
        })}
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-6">
        {isEmpty ? (
          <EmptyState onPick={submit} />
        ) : (
          <div className="mx-auto flex max-w-3xl flex-col gap-5">
            {messages.map((m) => (
              <MessageBubble key={m.id} message={m} />
            ))}
          </div>
        )}
      </div>

      {/* Composer */}
      <div className="px-4 pb-4">
        <form
          onSubmit={handleSubmit}
          className="glass-strong mx-auto flex max-w-3xl flex-col gap-2 rounded-2xl border border-border p-2.5 shadow-lg shadow-black/20 focus-within:border-primary/50"
        >
          <textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => {
              setInput(e.target.value)
              e.target.style.height = "auto"
              e.target.style.height = `${Math.min(e.target.scrollHeight, 160)}px`
            }}
            onKeyDown={handleKeyDown}
            rows={1}
            placeholder={
              fileCount > 0
                ? "Ask anything about your documents…"
                : "Upload a document, then ask a question…"
            }
            className="max-h-40 w-full resize-none bg-transparent px-2 py-1.5 text-sm text-foreground outline-none placeholder:text-muted-foreground"
          />
          <div className="flex items-center justify-between gap-2">
            <span className="flex items-center gap-1.5 px-1 text-xs text-muted-foreground">
              <Paperclip className="size-3.5" aria-hidden="true" />
              {fileCount} file{fileCount === 1 ? "" : "s"} in context
            </span>
            <button
              type="submit"
              disabled={!input.trim()}
              aria-label="Send message"
              className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ArrowUp className="size-4" aria-hidden="true" />
            </button>
          </div>
        </form>
      </div>
    </section>
  )
}

function EmptyState({ onPick }: { onPick: (v: string) => void }) {
  const suggestions = [
    "What are the main themes across these documents?",
    "Compare the revenue forecast with the annual report.",
    "Draft an executive summary I can share with the team.",
  ]
  return (
    <div className="mx-auto flex max-w-xl flex-col items-center justify-center gap-5 py-10 text-center">
      <span className="glass flex size-14 items-center justify-center rounded-2xl border border-border text-primary ring-1 ring-primary/20">
        <Brain className="size-7" aria-hidden="true" />
      </span>
      <div className="space-y-1.5">
        <h1 className="text-balance text-xl font-semibold text-foreground">
          Document intelligence, on demand
        </h1>
        <p className="text-pretty text-sm text-muted-foreground">
          Ask CortexOS to read, summarize, and reason across everything you
          upload. Start with a question or a quick action above.
        </p>
      </div>
      <div className="flex w-full flex-col gap-2">
        {suggestions.map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => onPick(s)}
            className="glass rounded-xl border border-border px-3.5 py-2.5 text-left text-sm text-foreground transition-colors hover:border-primary/40 hover:bg-accent/40"
          >
            {s}
          </button>
        ))}
      </div>
    </div>
  )
}

function MessageBubble({ message }: { message: ChatMessage }) {
  const isUser = message.role === "user"
  return (
    <div
      className={cn(
        "flex items-start gap-3",
        isUser ? "flex-row-reverse" : "flex-row",
      )}
    >
      <span
        className={cn(
          "flex size-8 shrink-0 items-center justify-center rounded-lg ring-1",
          isUser
            ? "bg-secondary text-secondary-foreground ring-border"
            : "bg-primary/15 text-primary ring-primary/25",
        )}
        aria-hidden="true"
      >
        {isUser ? (
          <span className="text-xs font-semibold">You</span>
        ) : (
          <Brain className="size-4" />
        )}
      </span>
      <div
        className={cn(
          "glass max-w-[80%] rounded-2xl border border-border px-4 py-2.5 text-sm leading-relaxed",
          isUser
            ? "rounded-tr-sm bg-primary/10 text-foreground"
            : "rounded-tl-sm text-foreground",
        )}
      >
        {message.pending ? (
          <span className="flex items-center gap-1.5 py-0.5 text-muted-foreground">
            <span className="size-1.5 animate-bounce rounded-full bg-primary [animation-delay:-0.3s]" />
            <span className="size-1.5 animate-bounce rounded-full bg-primary [animation-delay:-0.15s]" />
            <span className="size-1.5 animate-bounce rounded-full bg-primary" />
          </span>
        ) : (
          <p className="whitespace-pre-wrap text-pretty">{message.content}</p>
        )}
      </div>
    </div>
  )
}
