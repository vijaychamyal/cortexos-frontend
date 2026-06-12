export type FileKind = "pdf" | "ppt" | "docx" | "excel" | "image"

export type UploadedFile = {
  id: string
  name: string
  kind: FileKind
  size: number // bytes
  pages?: number
  uploadedAt: number
  status: "processing" | "ready"
}

export type ChatRole = "user" | "assistant"

export type ChatMessage = {
  id: string
  role: ChatRole
  content: string
  createdAt: number
  pending?: boolean
}

export const UPLOAD_TYPES: {
  kind: FileKind
  label: string
  hint: string
  accept: string
}[] = [
  { kind: "pdf", label: "Upload PDF", hint: ".pdf documents", accept: ".pdf" },
  { kind: "ppt", label: "Upload PPT", hint: ".ppt, .pptx slides", accept: ".ppt,.pptx" },
  { kind: "docx", label: "Upload DOCX", hint: ".doc, .docx files", accept: ".doc,.docx" },
  { kind: "excel", label: "Upload Excel", hint: ".xls, .xlsx, .csv", accept: ".xls,.xlsx,.csv" },
  { kind: "image", label: "Upload Images", hint: ".png, .jpg, .webp", accept: "image/*" },
]

export const QUICK_ACTIONS: {
  id: string
  label: string
  prompt: string
}[] = [
  { id: "summarize", label: "Summarize", prompt: "Summarize the uploaded documents." },
  { id: "key-points", label: "Extract Key Points", prompt: "Extract the key points from the documents." },
  { id: "notes", label: "Generate Notes", prompt: "Generate structured study notes from the documents." },
  { id: "quiz", label: "Create Quiz", prompt: "Create a short quiz based on the documents." },
]

export function formatBytes(bytes: number): string {
  if (bytes === 0) return "0 B"
  const units = ["B", "KB", "MB", "GB"]
  const i = Math.floor(Math.log(bytes) / Math.log(1024))
  return `${(bytes / Math.pow(1024, i)).toFixed(i === 0 ? 0 : 1)} ${units[i]}`
}

export function kindFromFileName(name: string): FileKind {
  const ext = name.split(".").pop()?.toLowerCase() ?? ""
  if (ext === "pdf") return "pdf"
  if (["ppt", "pptx"].includes(ext)) return "ppt"
  if (["doc", "docx"].includes(ext)) return "docx"
  if (["xls", "xlsx", "csv"].includes(ext)) return "excel"
  return "image"
}

export function relativeTime(ts: number): string {
  const diff = Date.now() - ts
  const mins = Math.floor(diff / 60000)
  if (mins < 1) return "just now"
  if (mins < 60) return `${mins}m ago`
  const hours = Math.floor(mins / 60)
  if (hours < 24) return `${hours}h ago`
  return `${Math.floor(hours / 24)}d ago`
}

// Demo seed data so the interface is populated on first load.
export const SEED_FILES: UploadedFile[] = [
  {
    id: "seed-1",
    name: "Q4-Strategy-Deck.pptx",
    kind: "ppt",
    size: 4_820_000,
    pages: 42,
    uploadedAt: Date.now() - 1000 * 60 * 8,
    status: "ready",
  },
  {
    id: "seed-2",
    name: "Annual-Report-2025.pdf",
    kind: "pdf",
    size: 9_140_000,
    pages: 118,
    uploadedAt: Date.now() - 1000 * 60 * 41,
    status: "ready",
  },
  {
    id: "seed-3",
    name: "Revenue-Forecast.xlsx",
    kind: "excel",
    size: 1_280_000,
    pages: 6,
    uploadedAt: Date.now() - 1000 * 60 * 60 * 3,
    status: "ready",
  },
]
