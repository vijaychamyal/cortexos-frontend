const steps = [
  {
    number: "01",
    title: "Connect your sources",
    description:
      "Drag in documents, link your data, and connect the tools you already use. CortexOS indexes everything securely in minutes.",
  },
  {
    number: "02",
    title: "Ask, generate, analyze",
    description:
      "Chat naturally across documents, markets, and research. Spin up drafts in SPARK Studio or dig deep with the Research Assistant.",
  },
  {
    number: "03",
    title: "Ship with confidence",
    description:
      "Get source-backed answers and polished output you can trust — then share, export, or push it straight into your workflow.",
  },
]

export function HowItWorks() {
  return (
    <section id="how-it-works" className="px-4 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-balance text-3xl font-semibold tracking-tight md:text-4xl">
            How it <span className="gradient-text">works</span>
          </h2>
          <p className="mt-4 text-pretty text-muted-foreground">
            From setup to insight in three simple steps.
          </p>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {steps.map((step) => (
            <div key={step.number} className="glass rounded-2xl p-6 md:p-8">
              <span className="gradient-text text-4xl font-semibold tracking-tight">
                {step.number}
              </span>
              <h3 className="mt-4 text-xl font-semibold tracking-tight">
                {step.title}
              </h3>
              <p className="mt-2 leading-relaxed text-muted-foreground">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
