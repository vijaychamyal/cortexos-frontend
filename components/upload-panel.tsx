"use client"

import { useRef, useState, type DragEvent } from "react"
import { UploadCloud, Plus } from "lucide-react"
import { UPLOAD_TYPES, type FileKind } from "@/lib/documents"
import { KIND_META } from "@/components/file-kind-icon"
import { cn } from "@/lib/utils"

export function UploadPanel({
  onFiles,
}: {
  // 1. UPDATED: Now it explicitly expects an array of real File objects
  onFiles: (files: File[]) => void
}) {
  const [dragging, setDragging] = useState(false)
  const inputRefs = useRef<Record<string, HTMLInputElement | null>>({})
  const dropInputRef = useRef<HTMLInputElement | null>(null)

  function handleSelected(list: FileList | null, kind?: FileKind) {
    if (!list || list.length === 0) return
    
    // 2. UPDATED: Just convert the FileList to a normal Array and pass it up
    const files = Array.from(list)
    onFiles(files)
  }

  function handleDrop(e: DragEvent<HTMLDivElement>) {
    e.preventDefault()
    setDragging(false)
    handleSelected(e.dataTransfer.files)
  }

  return (
    <aside className="flex h-full flex-col gap-4 overflow-y-auto p-4">
      <div className="px-1">
        <h2 className="text-sm font-semibold text-foreground">Add documents</h2>
        <p className="mt-0.5 text-xs text-muted-foreground text-pretty">
          Drop files or pick a type. CortexOS will parse and index them.
        </p>
      </div>

      {/* Dropzone */}
      <div
        onDragOver={(e) => {
          e.preventDefault()
          setDragging(true)
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        onClick={() => dropInputRef.current?.click()}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") dropInputRef.current?.click()
        }}
        className={cn(
          "group glass flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-border px-4 py-7 text-center transition-colors outline-none",
          dragging
            ? "border-primary/70 bg-primary/5"
            : "hover:border-primary/40 focus-visible:border-primary/60",
        )}
      >
        <span className="flex size-11 items-center justify-center rounded-full bg-primary/15 text-primary ring-1 ring-primary/25">
          <UploadCloud className="size-5" aria-hidden="true" />
        </span>
        <span className="text-sm font-medium text-foreground">
          Drag &amp; drop files
        </span>
        <span className="text-xs text-muted-foreground">
          or click to browse from your device
        </span>
        <input
          ref={dropInputRef}
          type="file"
          multiple
          className="sr-only"
          onChange={(e) => handleSelected(e.target.files)}
        />
      </div>

      {/* Per-type upload buttons */}
      <div className="flex flex-col gap-2">
        {UPLOAD_TYPES.map((t) => {
          const meta = KIND_META[t.kind]
          const Icon = meta.icon
          return (
            <div key={t.kind}>
              <button
                type="button"
                onClick={() => inputRefs.current[t.kind]?.click()}
                className="glass group flex w-full items-center gap-3 rounded-xl border border-border px-3 py-2.5 text-left transition-colors hover:border-primary/40 hover:bg-accent/40"
              >
                <span
                  className={cn(
                    "flex size-9 items-center justify-center rounded-lg bg-muted/60 ring-1 ring-border",
                    meta.className,
                  )}
                >
                  <Icon className="size-[18px]" aria-hidden="true" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-medium text-foreground">
                    {t.label}
                  </span>
                  <span className="block truncate text-xs text-muted-foreground">
                    {t.hint}
                  </span>
                </span>
                <Plus className="size-4 shrink-0 text-muted-foreground transition-colors group-hover:text-primary" aria-hidden="true" />
              </button>
              <input
                ref={(el) => {
                  inputRefs.current[t.kind] = el
                }}
                type="file"
                multiple
                accept={t.accept}
                className="sr-only"
                onChange={(e) => handleSelected(e.target.files, t.kind)}
              />
            </div>
          )
        })}
      </div>
    </aside>
  )
}