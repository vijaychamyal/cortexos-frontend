"use client"

import { useState } from "react"
import { Brain, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
const navLinks = [
  { label: "Features", href: "#features" },
  { label: "Product", href: "#product" },
  { label: "How it works", href: "#how-it-works" },
  { label: "Dashboard", href: "/dashboard" },
]

export function SiteNavbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4">
      <nav className="glass mx-auto flex max-w-6xl items-center justify-between rounded-2xl px-4 py-3 md:px-6">
        <a href="#" className="flex items-center gap-2" aria-label="CortexOS home">
          <span className="gradient-accent flex size-8 items-center justify-center rounded-lg">
            <Brain className="size-5 text-primary-foreground" aria-hidden="true" />
          </span>
          <span className="text-lg font-semibold tracking-tight">CortexOS</span>
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
            key={link.href}
            href={link.href}
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
           {link.label}
          </Link>
          ))}
        </div>

        <div className="hidden items-center gap-2 md:flex">
          <Button variant="ghost" className="text-sm">
            Sign In
          </Button>
          <Button className="gradient-accent text-sm font-medium text-primary-foreground hover:opacity-90">
            Get Started
          </Button>
        </div>

        <button
          type="button"
          className="flex size-9 items-center justify-center rounded-lg text-foreground md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </nav>

      {open && (
        <div className="glass mx-auto mt-2 flex max-w-6xl flex-col gap-1 rounded-2xl p-4 md:hidden">
          {navLinks.map((link) => (
            <Link
  key={link.href}
  href={link.href}
  onClick={() => setOpen(false)}
  className="rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
>
  {link.label}
</Link>
          ))}
          <div className="mt-2 flex flex-col gap-2">
            <Button variant="ghost" className="w-full justify-center">
              Sign In
            </Button>
            <Button className="gradient-accent w-full justify-center font-medium text-primary-foreground hover:opacity-90">
              Get Started
            </Button>
          </div>
        </div>
      )}
    </header>
  )
}
