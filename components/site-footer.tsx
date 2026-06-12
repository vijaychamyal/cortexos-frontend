import { Brain } from "lucide-react"

const links = [
  { label: "Product", href: "#product" },
  { label: "GitHub", href: "#" },
  { label: "Documentation", href: "#" },
  { label: "Contact", href: "#" },
]

export function SiteFooter() {
  return (
    <footer className="px-4 pb-10 pt-16">
      <div className="glass mx-auto max-w-6xl rounded-3xl p-8 md:p-12">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <a href="#" className="flex items-center gap-2" aria-label="CortexOS home">
            <span className="gradient-accent flex size-8 items-center justify-center rounded-lg">
              <Brain className="size-5 text-primary-foreground" aria-hidden="true" />
            </span>
            <span className="text-lg font-semibold tracking-tight">CortexOS</span>
          </a>

          <nav aria-label="Footer">
            <ul className="flex flex-wrap items-center justify-center gap-6">
              {links.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-border pt-6 text-sm text-muted-foreground sm:flex-row">
          <p>© {new Date().getFullYear()} CortexOS. All rights reserved.</p>
          <p>Your AI workspace. One platform.</p>
        </div>
      </div>
    </footer>
  )
}
