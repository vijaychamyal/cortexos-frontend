import { FileText, FileSpreadsheet, Presentation, ImageIcon, Send, Sparkles, Brain } from "lucide-react"

const recentDocs = [
  { name: "Q4_Financial_Report.pdf", meta: "PDF · 4.2 MB", icon: FileText },
  { name: "Market_Forecast_2026.xlsx", meta: "Sheet · 1.1 MB", icon: FileSpreadsheet },
  { name: "Product_Roadmap.pptx", meta: "Slides · 8.7 MB", icon: Presentation },
  { name: "Brand_Concepts.png", meta: "Image · 2.4 MB", icon: ImageIcon },
]

const generatedImages = [
  { src: "/generated/spark-render.png", alt: "AI generated 3D product render" },
  { src: "/generated/spark-landscape.png", alt: "AI generated neon landscape" },
  { src: "/generated/spark-abstract.png", alt: "AI generated abstract liquid shapes" },
  { src: "/generated/spark-portrait.png", alt: "AI generated robot assistant concept" },
]

export function DashboardPreview() {
  return (
    <section className="px-4 pb-24" aria-label="Product dashboard preview">
      <div className="relative mx-auto max-w-6xl">
        {/* glow backdrop */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -inset-x-10 -top-10 -z-10 h-72 rounded-full opacity-25 blur-3xl"
          style={{
            background:
              "radial-gradient(closest-side, oklch(0.62 0.24 290), oklch(0.6 0.2 245), transparent)",
          }}
        />

        <div className="glass overflow-hidden rounded-3xl p-2 shadow-2xl">
          {/* window chrome */}
          <div className="flex items-center gap-2 px-4 py-3">
            <span className="size-3 rounded-full bg-destructive/70" aria-hidden="true" />
            <span className="size-3 rounded-full bg-chart-3/70" aria-hidden="true" />
            <span className="size-3 rounded-full bg-accent/70" aria-hidden="true" />
            <div className="ml-3 flex items-center gap-2 rounded-md bg-secondary/60 px-3 py-1 text-xs text-muted-foreground">
              <Brain className="size-3.5 text-primary" aria-hidden="true" />
              app.cortexos.ai / workspace
            </div>
          </div>

          {/* dashboard body */}
          <div className="grid gap-px overflow-hidden rounded-2xl bg-border/50 lg:grid-cols-[260px_1fr_300px]">
            {/* left: recent documents */}
            <aside className="bg-card/80 p-5">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Recent Documents
              </h3>
              <ul className="mt-4 flex flex-col gap-2">
                {recentDocs.map((doc) => (
                  <li
                    key={doc.name}
                    className="flex items-center gap-3 rounded-xl border border-border/60 bg-secondary/40 p-3"
                  >
                    <span className="gradient-accent flex size-9 shrink-0 items-center justify-center rounded-lg">
                      <doc.icon className="size-4 text-primary-foreground" aria-hidden="true" />
                    </span>
                    <span className="min-w-0">
                      <span className="block truncate text-sm font-medium">{doc.name}</span>
                      <span className="block text-xs text-muted-foreground">{doc.meta}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </aside>

            {/* center: chat interface */}
            <div className="flex min-h-[520px] flex-col bg-card/60">
              <div className="border-b border-border/60 px-6 py-4">
                <p className="text-sm font-semibold">Chat with Documents</p>
                <p className="text-xs text-muted-foreground">
                  Analyzing 4 sources · Q4_Financial_Report.pdf + 3 more
                </p>
              </div>

              <div className="flex flex-1 flex-col gap-5 overflow-hidden px-6 py-6">
                {/* user message */}
                <div className="flex justify-end">
                  <p className="max-w-[80%] rounded-2xl rounded-tr-sm bg-secondary px-4 py-2.5 text-sm">
                    What were the key revenue drivers in Q4 and how does the forecast look?
                  </p>
                </div>

                {/* AI response */}
                <div className="flex gap-3">
                  <span className="gradient-accent flex size-8 shrink-0 items-center justify-center rounded-lg">
                    <Sparkles className="size-4 text-primary-foreground" aria-hidden="true" />
                  </span>
                  <div className="max-w-[85%] rounded-2xl rounded-tl-sm border border-border/60 bg-secondary/40 px-4 py-3 text-sm leading-relaxed">
                    <p>
                      Q4 revenue grew <span className="font-semibold text-foreground">+28% YoY</span> to{" "}
                      <span className="font-semibold text-foreground">$48.2M</span>, driven by three factors:
                    </p>
                    <ul className="mt-2 flex flex-col gap-1.5 text-muted-foreground">
                      <li>• Enterprise expansion (+41% net new ARR)</li>
                      <li>• SPARK Studio upsell attach rate of 34%</li>
                      <li>• Reduced churn, down to 1.8% monthly</li>
                    </ul>
                    <p className="mt-2 text-muted-foreground">
                      The 2026 forecast projects <span className="font-semibold text-foreground">$214M</span>{" "}
                      with sustained momentum.{" "}
                      <span className="text-primary">[Q4_Financial_Report.pdf, p.12]</span>
                    </p>
                  </div>
                </div>
              </div>

              {/* input */}
              <div className="px-6 pb-6">
                <div className="flex items-center gap-3 rounded-xl border border-border/60 bg-secondary/50 px-4 py-3">
                  <span className="flex-1 text-sm text-muted-foreground">
                    Ask a follow-up question...
                  </span>
                  <span className="gradient-accent flex size-8 items-center justify-center rounded-lg">
                    <Send className="size-4 text-primary-foreground" aria-hidden="true" />
                  </span>
                </div>
              </div>
            </div>

            {/* right: generated images */}
            <aside className="bg-card/80 p-5">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Generated Images
              </h3>
              <p className="mt-1 text-xs text-muted-foreground">SPARK Studio · 4 results</p>
              <div className="mt-4 grid grid-cols-2 gap-2">
                {generatedImages.map((img) => (
                  <div
                    key={img.src}
                    className="overflow-hidden rounded-xl border border-border/60"
                  >
                    <img
                      src={img.src || "/placeholder.svg"}
                      alt={img.alt}
                      className="aspect-square h-full w-full object-cover"
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>
              <div className="mt-4 rounded-xl border border-border/60 bg-secondary/40 p-3">
                <p className="text-xs font-medium">Prompt enhanced</p>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                  "futuristic product render, purple-blue gradient lighting, studio backdrop"
                </p>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </section>
  )
}
