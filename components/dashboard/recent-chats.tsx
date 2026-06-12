import { MessageSquare, Sparkles } from "lucide-react"
import { DashboardCard } from "./dashboard-card"

const chats = [
  { title: "Summarize the Q4 outlook", meta: "12 messages · 1h ago" },
  { title: "Compare NVDA vs AMD fundamentals", meta: "28 messages · 3h ago" },
  { title: "Draft investor update email", meta: "7 messages · Yesterday" },
  { title: "Explain the merger risk factors", meta: "15 messages · 2d ago" },
]

export function RecentChats() {
  return (
    <DashboardCard title="Recent Chats" icon={<MessageSquare className="size-[18px]" />} action="History">
      <ul className="flex flex-col gap-1.5">
        {chats.map((chat) => (
          <li key={chat.title}>
            <button className="flex w-full items-center gap-3 rounded-xl px-2 py-2 text-left transition-colors hover:bg-muted/50">
              <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-primary/25 to-accent/20">
                <Sparkles className="size-4 text-primary" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-sm font-medium">{chat.title}</span>
                <span className="block text-xs text-muted-foreground">{chat.meta}</span>
              </span>
            </button>
          </li>
        ))}
      </ul>
    </DashboardCard>
  )
}
