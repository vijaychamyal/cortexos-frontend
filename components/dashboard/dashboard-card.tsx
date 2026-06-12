import type { ReactNode } from "react"
import { ArrowUpRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface DashboardCardProps {
  title: string
  icon: ReactNode
  action?: string
  children: ReactNode
  className?: string
}

export function DashboardCard({ title, icon, action, children, className }: DashboardCardProps) {
  return (
    <section
      className={cn(
        "glass group relative flex flex-col overflow-hidden rounded-2xl p-5 transition-colors hover:border-primary/30",
        className,
      )}
    >
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <span className="flex size-9 items-center justify-center rounded-xl bg-muted/60 text-primary">
            {icon}
          </span>
          <h2 className="text-sm font-semibold tracking-tight">{title}</h2>
        </div>
        {action && (
          <button className="flex items-center gap-1 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground">
            {action}
            <ArrowUpRight className="size-3.5" />
          </button>
        )}
      </div>
      {children}
    </section>
  )
}
