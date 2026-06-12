import { BarChart3, ArrowUp } from "lucide-react"
import { DashboardCard } from "./dashboard-card"

const weekly = [
  { day: "M", value: 42 },
  { day: "T", value: 58 },
  { day: "W", value: 35 },
  { day: "T", value: 72 },
  { day: "F", value: 64 },
  { day: "S", value: 88 },
  { day: "S", value: 51 },
]

const stats = [
  { label: "Queries", value: "12.4k", delta: "+18%" },
  { label: "Tokens", value: "3.2M", delta: "+9%" },
]

export function UsageStatistics() {
  const max = Math.max(...weekly.map((d) => d.value))

  return (
    <DashboardCard title="Usage Statistics" icon={<BarChart3 className="size-[18px]" />} action="Report">
      <div className="mb-5 grid grid-cols-2 gap-3">
        {stats.map((s) => (
          <div key={s.label} className="rounded-xl bg-muted/50 p-3">
            <p className="text-xs text-muted-foreground">{s.label}</p>
            <div className="mt-1 flex items-baseline gap-2">
              <span className="text-xl font-semibold tracking-tight">{s.value}</span>
              <span className="flex items-center text-xs font-medium text-chart-3">
                <ArrowUp className="size-3" />
                {s.delta}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="flex h-28 items-end justify-between gap-2" aria-hidden>
        {weekly.map((d, i) => (
          <div key={i} className="flex flex-1 flex-col items-center gap-2">
            <div className="flex w-full flex-1 items-end">
              <div
                className="w-full rounded-t-md bg-gradient-to-t from-primary/40 to-accent transition-all"
                style={{ height: `${(d.value / max) * 100}%` }}
              />
            </div>
            <span className="text-[11px] text-muted-foreground">{d.day}</span>
          </div>
        ))}
      </div>
      <p className="sr-only">
        Weekly usage chart showing compute consumption peaking on Saturday.
      </p>
    </DashboardCard>
  )
}
