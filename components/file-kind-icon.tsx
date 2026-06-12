import {
  FileText,
  Presentation,
  FileType2,
  Sheet,
  ImageIcon,
  type LucideIcon,
} from "lucide-react"
import type { FileKind } from "@/lib/documents"

type KindMeta = {
  icon: LucideIcon
  label: string
  className: string // text color token utility
}

export const KIND_META: Record<FileKind, KindMeta> = {
  pdf: { icon: FileText, label: "PDF", className: "text-[oklch(0.7_0.18_25)]" },
  ppt: { icon: Presentation, label: "PPT", className: "text-[oklch(0.75_0.15_55)]" },
  docx: { icon: FileType2, label: "DOCX", className: "text-[oklch(0.7_0.12_230)]" },
  excel: { icon: Sheet, label: "XLS", className: "text-[oklch(0.72_0.16_150)]" },
  image: { icon: ImageIcon, label: "IMG", className: "text-[oklch(0.72_0.13_300)]" },
}

export function FileKindIcon({
  kind,
  className,
}: {
  kind: FileKind
  className?: string
}) {
  const Icon = KIND_META[kind].icon
  return <Icon className={className ?? "size-5"} aria-hidden="true" />
}
