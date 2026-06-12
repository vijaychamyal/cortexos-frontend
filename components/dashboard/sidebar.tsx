"use client"

import { useState } from "react"
import {
  Home,
  FileText,
  Microscope,
  TrendingUp,
  Sparkles,
  FlaskConical,
  Settings,
  Menu,
  X,
} from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"

// Added hrefs to the navigation items
const navItems = [
  { label: "Home", icon: Home, href: "/dashboard", active: true },
  { label: "Documents", icon: FileText, href: "/documents" },
  { label: "Research", icon: Microscope, href: "#" },
  { label: "Stock Intelligence", icon: TrendingUp, href: "#" },
  { label: "SPARK Studio", icon: Sparkles, href: "#" },
  { label: "Labs", icon: FlaskConical, href: "#" },
]

function NavList({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <nav className="flex flex-1 flex-col gap-1 px-3" aria-label="Primary">
      {navItems.map((item) => (
        <Link
          key={item.label}
          href={item.href}
          onClick={onNavigate}
          aria-current={item.active ? "page" : undefined}
          className={cn(
            "group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
            item.active
              ? "bg-sidebar-accent text-sidebar-accent-foreground"
              : "text-muted-foreground hover:bg-sidebar-accent/60 hover:text-sidebar-foreground",
          )}
        >
          <item.icon
            className={cn(
              "size-[18px] shrink-0 transition-colors",
              item.active ? "text-primary" : "text-muted-foreground group-hover:text-foreground",
            )}
          />
          <span className="truncate">{item.label}</span>
          {item.active && <span className="ml-auto size-1.5 rounded-full bg-primary" aria-hidden />}
        </Link>
      ))}
    </nav>
  )
}

function Brand() {
  return (
    <Link href="/" className="flex items-center gap-3 px-5 py-6 transition-opacity hover:opacity-80">
      <div className="flex size-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent shadow-lg shadow-primary/30">
        <span className="text-sm font-bold text-primary-foreground">C</span>
      </div>
      <div className="leading-tight">
        <p className="text-sm font-semibold tracking-tight">CortexOS</p>
        <p className="text-xs text-muted-foreground">Intelligence Workspace</p>
      </div>
    </Link>
  )
}

function PlanCard() {
  return (
    <div className="mx-3 mb-3 rounded-2xl border border-border bg-gradient-to-br from-primary/15 to-accent/10 p-4">
      <p className="text-sm font-medium">Pro Plan</p>
      <p className="mt-1 text-xs text-muted-foreground">
        72% of monthly compute used
      </p>
      <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-muted">
        <div className="h-full w-[72%] rounded-full bg-gradient-to-r from-primary to-accent" />
      </div>
    </div>
  )
}

function SettingsItem({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <div className="px-3 pb-4">
      <button
        onClick={onNavigate}
        className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-sidebar-accent/60 hover:text-sidebar-foreground"
      >
        <Settings className="size-[18px]" />
        Settings
      </button>
    </div>
  )
}

export function Sidebar() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="glass fixed left-4 top-4 z-40 flex size-10 items-center justify-center rounded-xl lg:hidden"
        aria-label="Open navigation"
      >
        <Menu className="size-5" />
      </button>

      <aside className="sidebar-glass glass sticky top-0 hidden h-screen w-64 shrink-0 flex-col lg:flex">
        <Brand />
        <NavList />
        <PlanCard />
        <SettingsItem />
      </aside>

      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-background/70 backdrop-blur-sm"
            onClick={() => setOpen(false)}
            aria-hidden
          />
          <aside className="glass-strong absolute left-0 top-0 flex h-full w-72 flex-col">
            <div className="flex items-center justify-between pr-3">
              <Brand />
              <button
                onClick={() => setOpen(false)}
                className="flex size-9 items-center justify-center rounded-lg text-muted-foreground hover:bg-sidebar-accent hover:text-foreground"
                aria-label="Close navigation"
              >
                <X className="size-5" />
              </button>
            </div>
            <NavList onNavigate={() => setOpen(false)} />
            <PlanCard />
            <SettingsItem onNavigate={() => setOpen(false)} />
          </aside>
        </div>
      )}
    </>
  )
}