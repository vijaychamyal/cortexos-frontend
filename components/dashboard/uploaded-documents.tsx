import Link from "next/link"
import { FileText, FileType, FileSpreadsheet, FileImage } from "lucide-react"
import { DashboardCard } from "./dashboard-card"

const documents = [
  { name: "Q4 Market Outlook.pdf", meta: "2.4 MB · 2h ago", icon: FileText, tint: "text-chart-1" },
  { name: "Acme Merger Brief.docx", meta: "880 KB · 5h ago", icon: FileType, tint: "text-chart-2" },
  { name: "Portfolio Model.xlsx", meta: "1.1 MB · Yesterday", icon: FileSpreadsheet, tint: "text-chart-3" },
  { name: "Brand Concepts.png", meta: "4.7 MB · 2d ago", icon: FileImage, tint: "text-chart-4" },
]

export function UploadedDocuments() {
  return (
    <DashboardCard title="Uploaded Documents" icon={<FileText className="size-[18px]" />} action="View all">
      <ul className="flex flex-col gap-1.5">
        {documents.map((doc) => (
          <li key={doc.name}>
            {/* Swapped the <button> for a <Link> pointing to your workspace */}
            <Link 
              href="/documents"
              className="flex w-full items-center gap-3 rounded-xl px-2 py-2 text-left transition-colors hover:bg-muted/50"
            >
              <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-muted/60">
                <doc.icon className={`size-[18px] ${doc.tint}`} />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-sm font-medium">{doc.name}</span>
                <span className="block text-xs text-muted-foreground">{doc.meta}</span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </DashboardCard>
  )
}