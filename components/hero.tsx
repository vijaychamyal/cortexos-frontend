import { ArrowRight, Sparkles } from "lucide-react"
import Link from "next/link"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function Hero() {
  return (
    <section className="relative overflow-hidden px-4 pb-24 pt-40 md:pt-48">
      {/* gradient glow backdrop */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[600px] w-[900px] max-w-[120vw] -translate-x-1/2 rounded-full opacity-30 blur-3xl"
        style={{
          background:
            "radial-gradient(closest-side, oklch(0.62 0.24 290), oklch(0.6 0.2 245), transparent)",
        }}
      />

      <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
        <span className="glass mb-6 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium text-muted-foreground">
          <Sparkles className="size-3.5 text-primary" aria-hidden="true" />
          Introducing CortexOS — the unified AI workspace
        </span>

        <h1 className="text-balance text-4xl font-semibold leading-tight tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
          Your AI Workspace.{" "}
          <span className="gradient-text">One Platform.</span>
        </h1>

        <p className="mt-6 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
          Chat with your documents, decode market intelligence, generate with
          SPARK Studio, and run deep research — all powered by one cohesive AI
          workspace built for serious work.
        </p>

        <div className="mt-10 flex w-full flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/documents"
            className={cn(
              buttonVariants({ size: "lg" }),
              "gradient-accent w-full font-medium text-primary-foreground hover:opacity-90 sm:w-auto",
            )}
          >
            Get Started Free
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>

        <p className="mt-4 text-xs text-muted-foreground">
          No credit card required · Free forever plan
        </p>
      </div>
    </section>
  )
}
