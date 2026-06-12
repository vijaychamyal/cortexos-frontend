import {
  FileText,
  Search,
  LineChart,
  Wand2,
  TrendingUp,
  TrendingDown,
  Sparkles,
  Quote,
} from "lucide-react"

/* --- Mockup 1: Chat with Documents --- */
function ChatMockup() {
  return (
    <div className="flex h-full flex-col gap-3 p-5">
      <div className="flex items-center gap-2 rounded-lg border border-border/60 bg-secondary/40 px-3 py-2">
        <FileText className="size-4 text-primary" aria-hidden="true" />
        <span className="text-xs font-medium">Annual_Report_2025.pdf</span>
        <span className="ml-auto text-[10px] text-muted-foreground">142 pages</span>
      </div>
      <div className="ml-auto max-w-[80%] rounded-2xl rounded-tr-sm bg-secondary px-3 py-2 text-xs">
        Summarize the risk factors section
      </div>
      <div className="flex gap-2">
        <span className="gradient-accent flex size-6 shrink-0 items-center justify-center rounded-md">
          <Sparkles className="size-3 text-primary-foreground" aria-hidden="true" />
        </span>
        <div className="rounded-2xl rounded-tl-sm border border-border/60 bg-secondary/40 px-3 py-2 text-xs leading-relaxed text-muted-foreground">
          Three primary risks were identified: supply chain exposure, FX
          volatility, and regulatory shifts in the EU market.{" "}
          <span className="text-primary">[p.88]</span>
        </div>
      </div>
    </div>
  )
}

/* --- Mockup 2: Research Assistant --- */
function ResearchMockup() {
  return (
    <div className="flex h-full flex-col gap-3 p-5">
      <div className="flex items-center gap-2">
        <Search className="size-4 text-primary" aria-hidden="true" />
        <span className="text-xs font-medium">Deep research · 18 sources</span>
      </div>
      <div className="rounded-xl border border-border/60 bg-secondary/40 p-3">
        <p className="text-xs font-semibold">Key Insights</p>
        <ul className="mt-2 flex flex-col gap-2">
          {[
            "Market grew 32% YoY across all segments",
            "Adoption highest among mid-market teams",
            "Latency cited as top switching factor",
          ].map((line) => (
            <li key={line} className="flex items-start gap-2 text-[11px] text-muted-foreground">
              <span className="mt-1 size-1.5 shrink-0 rounded-full bg-primary" aria-hidden="true" />
              {line}
            </li>
          ))}
        </ul>
      </div>
      <div className="flex flex-wrap gap-1.5">
        {["McKinsey", "Statista", "a16z", "+15"].map((src) => (
          <span
            key={src}
            className="rounded-md border border-border/60 bg-secondary/40 px-2 py-0.5 text-[10px] text-muted-foreground"
          >
            {src}
          </span>
        ))}
      </div>
    </div>
  )
}

/* --- Mockup 3: Stock Intelligence --- */
function StockMockup() {
  const bars = [40, 55, 48, 70, 62, 85, 78, 95]
  return (
    <div className="flex h-full flex-col gap-3 p-5">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold">NVDA</p>
          <p className="text-[10px] text-muted-foreground">NVIDIA Corp.</p>
        </div>
        <div className="flex items-center gap-1 rounded-md bg-accent/15 px-2 py-1 text-[11px] font-medium text-accent">
          <TrendingUp className="size-3" aria-hidden="true" />
          +4.8%
        </div>
      </div>
      <div className="flex h-24 items-end gap-1.5">
        {bars.map((h, i) => (
          <div
            key={i}
            className="gradient-accent flex-1 rounded-t-sm"
            style={{ height: `${h}%` }}
            aria-hidden="true"
          />
        ))}
      </div>
      <div className="grid grid-cols-2 gap-2">
        <div className="rounded-lg border border-border/60 bg-secondary/40 p-2">
          <p className="text-[10px] text-muted-foreground">Sentiment</p>
          <p className="text-xs font-semibold text-accent">Bullish 82%</p>
        </div>
        <div className="rounded-lg border border-border/60 bg-secondary/40 p-2">
          <p className="text-[10px] text-muted-foreground">Forecast</p>
          <p className="flex items-center gap-1 text-xs font-semibold">
            <TrendingDown className="size-3 text-destructive" aria-hidden="true" />
            $128 → $141
          </p>
        </div>
      </div>
    </div>
  )
}

/* --- Mockup 4: SPARK Studio --- */
function SparkMockup() {
  const imgs = [
    "/generated/spark-render.png",
    "/generated/spark-abstract.png",
    "/generated/spark-landscape.png",
    "/generated/spark-portrait.png",
  ]
  return (
    <div className="flex h-full flex-col gap-3 p-5">
      <div className="flex items-center gap-2 rounded-lg border border-border/60 bg-secondary/40 px-3 py-2">
        <Wand2 className="size-4 text-primary" aria-hidden="true" />
        <span className="truncate text-[11px] text-muted-foreground">
          "futuristic product render, neon gradient"
        </span>
      </div>
      <div className="grid flex-1 grid-cols-2 gap-2">
        {imgs.map((src) => (
          <div key={src} className="overflow-hidden rounded-lg border border-border/60">
            <img
              src={src || "/placeholder.svg"}
              alt="SPARK Studio generated visual"
              className="aspect-square h-full w-full object-cover"
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </div>
  )
}

const showcase = [
  {
    icon: FileText,
    title: "Chat with Documents",
    description:
      "Upload PDFs, PPTs, DOCX files, spreadsheets and images. Ask questions and get instant answers.",
    Mockup: ChatMockup,
  },
  {
    icon: Search,
    title: "Research Assistant",
    description:
      "Summarize reports, extract key insights and accelerate research workflows.",
    Mockup: ResearchMockup,
  },
  {
    icon: LineChart,
    title: "Stock Intelligence",
    description:
      "Forecast trends, analyze market sentiment and explore financial insights.",
    Mockup: StockMockup,
  },
  {
    icon: Wand2,
    title: "SPARK Studio",
    description:
      "Generate faster images, enhance prompts and create visual content with optimized AI pipelines.",
    Mockup: SparkMockup,
  },
]

export function ProductShowcase() {
  return (
    <section id="product" className="px-4 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <span className="glass mb-5 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium text-muted-foreground">
            <Quote className="size-3.5 text-primary" aria-hidden="true" />
            One workspace, every workflow
          </span>
          <h2 className="text-balance text-3xl font-semibold tracking-tight md:text-4xl">
            See <span className="gradient-text">CortexOS</span> in action
          </h2>
          <p className="mt-4 text-pretty text-muted-foreground">
            Purpose-built modules with realtime, source-backed output — explore
            how each one transforms the way your team works.
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {showcase.map((item) => (
            <article
              key={item.title}
              className="glass group overflow-hidden rounded-3xl transition-colors hover:border-primary/40"
            >
              {/* screenshot mockup */}
              <div className="relative m-3 mb-0 h-64 overflow-hidden rounded-2xl border border-border/60 bg-background/60">
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent"
                />
                <item.Mockup />
              </div>

              {/* description */}
              <div className="p-6">
                <div className="flex items-center gap-3">
                  <span className="gradient-accent flex size-10 items-center justify-center rounded-xl">
                    <item.icon className="size-5 text-primary-foreground" aria-hidden="true" />
                  </span>
                  <h3 className="text-lg font-semibold tracking-tight">{item.title}</h3>
                </div>
                <p className="mt-3 leading-relaxed text-muted-foreground">
                  {item.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
