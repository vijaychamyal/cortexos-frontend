"use client"

import { Trash2, CheckCircle2, Loader2, Files, HardDrive } from "lucide-react"
import {
  formatBytes,
  relativeTime,
  type UploadedFile,
} from "@/lib/documents"
import { KIND_META } from "@/components/file-kind-icon"
import { cn } from "@/lib/utils"

export function FilesPanel({
  files,
  selectedId,
  onSelect,
  onRemove,
}: {
  files: UploadedFile[]
  selectedId: string | null
  onSelect: (id: string) => void
  onRemove: (id: string) => void
}) {
  const totalSize = files.reduce((acc, f) => acc + f.size, 0)
  const selected = files.find((f) => f.id === selectedId) ?? null

  return (
    <aside className="flex h-full flex-col overflow-hidden">
      <div className="flex items-center justify-between border-b border-border px-4 py-3.5">
        <div className="flex items-center gap-2">
          <Files className="size-4 text-primary" aria-hidden="true" />
          <h2 className="text-sm font-semibold text-foreground">Uploaded files</h2>
        </div>
        <span className="rounded-full bg-muted/60 px-2 py-0.5 text-xs font-medium text-muted-foreground ring-1 ring-border">
          {files.length}
        </span>
      </div>

      {/* File list */}
      <div className="flex-1 overflow-y-auto p-3">
        {files.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center gap-2 px-6 text-center">
            <Files className="size-8 text-muted-foreground/50" aria-hidden="true" />
            <p className="text-sm text-muted-foreground text-pretty">
              No files yet. Upload documents to see them listed here.
            </p>
          </div>
        ) : (
          <ul className="flex flex-col gap-2">
            {files.map((f) => {
              const meta = KIND_META[f.kind]
              const Icon = meta.icon
              const active = f.id === selectedId
              return (
                <li key={f.id}>
                  <button
                    type="button"
                    onClick={() => onSelect(f.id)}
                    className={cn(
                      "group glass flex w-full items-center gap-3 rounded-xl border px-3 py-2.5 text-left transition-colors",
                      active
                        ? "border-primary/60 bg-primary/5"
                        : "border-border hover:border-primary/30 hover:bg-accent/40",
                    )}
                  >
                    <span
                      className={cn(
                        "flex size-9 shrink-0 items-center justify-center rounded-lg bg-muted/60 ring-1 ring-border",
                        meta.className,
                      )}
                    >
                      <Icon className="size-[18px]" aria-hidden="true" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-medium text-foreground">
                        {f.name}
                      </span>
                      <span className="mt-0.5 flex items-center gap-1.5 text-xs text-muted-foreground">
                        <span>{formatBytes(f.size)}</span>
                        <span aria-hidden="true">·</span>
                        <span>{relativeTime(f.uploadedAt)}</span>
                      </span>
                    </span>
                    {f.status === "processing" ? (
                      <Loader2
                        className="size-4 shrink-0 animate-spin text-primary"
                        aria-label="Processing"
                      />
                    ) : (
                      <span
                        role="button"
                        tabIndex={0}
                        aria-label={`Remove ${f.name}`}
                        onClick={(e) => {
                          e.stopPropagation()
                          onRemove(f.id)
                        }}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            e.stopPropagation()
                            onRemove(f.id)
                          }
                        }}
                        className="flex size-7 shrink-0 items-center justify-center rounded-md text-muted-foreground opacity-0 transition-all hover:bg-destructive/15 hover:text-destructive group-hover:opacity-100"
                      >
                        <Trash2 className="size-4" aria-hidden="true" />
                      </span>
                    )}
                  </button>
                </li>
              )
            })}
          </ul>
        )}
      </div>

      {/* Metadata footer */}
      <div className="border-t border-border p-4">
        <h3 className="mb-2 text-xs font-semibold tracking-wide text-muted-foreground uppercase">
          File metadata
        </h3>
        {selected ? (
          <dl className="glass grid grid-cols-2 gap-x-3 gap-y-2.5 rounded-xl border border-border p-3 text-xs">
            <div className="col-span-2 flex items-center gap-2">
              <KindBadge kind={selected.kind} />
              <span className="truncate font-medium text-foreground">
                {selected.name}
              </span>
            </div>
            <MetaRow label="Type" value={KIND_META[selected.kind].label} />
            <MetaRow label="Size" value={formatBytes(selected.size)} />
            <MetaRow
              label={selected.kind === "excel" ? "Sheets" : selected.kind === "image" ? "Frames" : "Pages"}
              value={selected.pages ? String(selected.pages) : "—"}
            />
            <MetaRow label="Uploaded" value={relativeTime(selected.uploadedAt)} />
            <div className="col-span-2 flex items-center gap-1.5 pt-0.5 text-emerald-400">
              <CheckCircle2 className="size-3.5" aria-hidden="true" />
              <span className="font-medium">Indexed &amp; ready for queries</span>
            </div>
          </dl>
        ) : (
          <div className="glass flex items-center gap-2 rounded-xl border border-border p-3 text-xs text-muted-foreground">
            <HardDrive className="size-4 shrink-0" aria-hidden="true" />
            <span>
              {files.length} file{files.length === 1 ? "" : "s"} ·{" "}
              {formatBytes(totalSize)} total. Select a file for details.
            </span>
          </div>
        )}
      </div>
    </aside>
  )
}

function MetaRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-0.5">
      <dt className="text-muted-foreground">{label}</dt>
      <dd className="font-medium text-foreground">{value}</dd>
    </div>
  )
}

function KindBadge({ kind }: { kind: UploadedFile["kind"] }) {
  const meta = KIND_META[kind]
  const Icon = meta.icon
  return (
    <span
      className={cn(
        "flex size-7 items-center justify-center rounded-md bg-muted/60 ring-1 ring-border",
        meta.className,
      )}
    >
      <Icon className="size-4" aria-hidden="true" />
    </span>
  )
}
