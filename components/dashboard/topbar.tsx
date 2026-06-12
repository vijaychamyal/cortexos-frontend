"use client"

import { Search, Bell, Command } from "lucide-react"

export function Topbar() {
  return (
    <header className="sticky top-0 z-30 flex items-center gap-3 py-4 lg:gap-4">
      <div className="ml-12 flex-1 lg:ml-0">
        <label htmlFor="global-search" className="sr-only">
          Search CortexOS
        </label>
        <div className="glass flex items-center gap-3 rounded-xl px-4 py-2.5">
          <Search className="size-[18px] shrink-0 text-muted-foreground" />
          <input
            id="global-search"
            type="search"
            placeholder="Search documents, chats, research…"
            className="w-full bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
          />
          <kbd className="hidden items-center gap-1 rounded-md border border-border bg-muted/60 px-1.5 py-0.5 text-[11px] font-medium text-muted-foreground sm:flex">
            <Command className="size-3" />K
          </kbd>
        </div>
      </div>

      <button
        className="glass relative flex size-10 shrink-0 items-center justify-center rounded-xl text-muted-foreground transition-colors hover:text-foreground"
        aria-label="Notifications"
      >
        <Bell className="size-[18px]" />
        <span className="absolute right-2.5 top-2.5 size-2 rounded-full bg-accent ring-2 ring-background" />
      </button>

      {/* Personalized Profile Button */}
      <button className="glass flex shrink-0 items-center gap-3 rounded-xl py-1.5 pl-1.5 pr-3 transition-colors hover:bg-card">
        <span className="flex size-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-accent text-xs font-semibold text-primary-foreground">
          VC
        </span>
        <span className="hidden text-left leading-tight sm:block">
          <span className="block text-sm font-medium">Vijay Chamyal</span>
          <span className="block text-xs text-muted-foreground">Pro</span>
        </span>
      </button>
    </header>
  )
}