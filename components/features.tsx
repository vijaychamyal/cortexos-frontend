import { FileText, LineChart, Wand2, Search } from "lucide-react"

const features = [
  {
    icon: FileText,
    title: "Chat with Documents",
    description:
      "Upload PDFs, PPTs, DOCX files, spreadsheets and images. Ask questions and get instant answers.",
  },
  {
    icon: Search,
    title: "Research Assistant",
    description:
      "Summarize reports, extract key insights and accelerate research workflows.",
  },
  {
    icon: LineChart,
    title: "Stock Intelligence",
    description:
      "Forecast trends, analyze market sentiment and explore financial insights.",
  },
  {
    icon: Wand2,
    title: "SPARK Studio",
    description:
      "Generate faster images, enhance prompts and create visual content with optimized AI pipelines.",
  },
]

export function Features() {
  return (
    <section id="features" className="px-4 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-balance text-3xl font-semibold tracking-tight md:text-4xl">
            Everything your team needs, <span className="gradient-text">unified</span>
          </h2>
          <p className="mt-4 text-pretty text-muted-foreground">
            Four powerful AI modules working together in a single workspace — no
            tab-switching, no context loss.
          </p>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2">
          {features.map((feature) => (
            <article
              key={feature.title}
              className="glass group rounded-2xl p-6 transition-colors hover:border-primary/40 md:p-8"
            >
              <span className="gradient-accent mb-5 inline-flex size-12 items-center justify-center rounded-xl">
                <feature.icon
                  className="size-6 text-primary-foreground"
                  aria-hidden="true"
                />
              </span>
              <h3 className="text-xl font-semibold tracking-tight">
                {feature.title}
              </h3>
              <p className="mt-2 leading-relaxed text-muted-foreground">
                {feature.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
