"use client"

import { useState, useCallback, useMemo } from "react"
import Link from "next/link"
import axios from "axios"
import { Brain, LineChart, Send, TrendingUp, Sparkles, Loader2 } from "lucide-react"

const API = process.env.NEXT_PUBLIC_API_URL

type Metrics = { rmse: number; mae: number; mape: number; accuracy: number }
type Prediction = {
  ticker: string
  model: string
  history: { dates: string[]; prices: number[] }
  forecast: { dates: string[]; prices: number[] }
  metrics: Metrics
  current_price: number
  next_day: number
}
type ChatMsg = { role: "user" | "assistant"; content: string; ticker?: string | null }

let idc = 0
const uid = () => `s-${Date.now()}-${idc++}`

function ForecastChart({ data }: { data: Prediction }) {
  // Build a combined series: tail of history + forecast.
  const histPrices = data.history.prices.slice(-60)
  const histDates = data.history.dates.slice(-60)
  const all = [...histPrices, ...data.forecast.prices]
  const min = Math.min(...all)
  const max = Math.max(...all)
  const range = max - min || 1

  const W = 720
  const H = 260
  const padX = 8
  const padY = 16
  const n = all.length
  const x = (i: number) => padX + (i / (n - 1)) * (W - padX * 2)
  const y = (v: number) => padY + (1 - (v - min) / range) * (H - padY * 2)

  const histPath = histPrices
    .map((v, i) => `${i === 0 ? "M" : "L"}${x(i).toFixed(1)},${y(v).toFixed(1)}`)
    .join(" ")
  const splitIdx = histPrices.length - 1
  const fcPath = data.forecast.prices
    .map((v, i) => {
      const gi = histPrices.length + i
      // connect to last historical point
      if (i === 0)
        return `M${x(splitIdx).toFixed(1)},${y(histPrices[splitIdx]).toFixed(1)} L${x(gi).toFixed(1)},${y(v).toFixed(1)}`
      return `L${x(gi).toFixed(1)},${y(v).toFixed(1)}`
    })
    .join(" ")

  return (
    <div className="w-full overflow-x-auto">
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ minWidth: 480 }}>
        {/* gridlines */}
        {[0, 0.25, 0.5, 0.75, 1].map((t) => (
          <line
            key={t}
            x1={padX}
            x2={W - padX}
            y1={padY + t * (H - padY * 2)}
            y2={padY + t * (H - padY * 2)}
            stroke="currentColor"
            className="text-border"
            strokeWidth={0.5}
            opacity={0.4}
          />
        ))}
        <path d={histPath} fill="none" stroke="#22d3ee" strokeWidth={2} />
        <path d={fcPath} fill="none" stroke="#ff2d78" strokeWidth={2} strokeDasharray="5 4" />
      </svg>
      <div className="mt-2 flex items-center justify-center gap-5 text-xs text-muted-foreground">
        <span className="flex items-center gap-1.5">
          <span className="inline-block h-0.5 w-4" style={{ background: "#22d3ee" }} /> History
        </span>
        <span className="flex items-center gap-1.5">
          <span className="inline-block h-0.5 w-4" style={{ background: "#ff2d78" }} /> 7-Day Forecast
        </span>
      </div>
    </div>
  )
}

export function StockWorkspace() {
  const [ticker, setTicker] = useState("AAPL")
  const [predicting, setPredicting] = useState(false)
  const [prediction, setPrediction] = useState<Prediction | null>(null)
  const [predError, setPredError] = useState<string | null>(null)

  const [messages, setMessages] = useState<ChatMsg[]>([
    {
      role: "assistant",
      content:
        "Hi! I'm Capital Pulse. Ask me about any stock — e.g. \"Why did Apple drop?\" or \"What's happening with Tesla?\"",
    },
  ])
  const [input, setInput] = useState("")
  const [chatting, setChatting] = useState(false)

  const runPredict = useCallback(async () => {
    if (!API) {
      setPredError("API URL is not configured.")
      return
    }
    const t = ticker.trim().toUpperCase()
    if (!t) return
    setPredicting(true)
    setPredError(null)
    try {
      const res = await axios.post(
        `${API}/stock/predict`,
        { ticker: t, horizon: 7 },
        { timeout: 60_000 },
      )
      setPrediction(res.data)
    } catch (e: any) {
      setPrediction(null)
      setPredError(e.response?.data?.detail || "Could not fetch a forecast. Try another ticker.")
    } finally {
      setPredicting(false)
    }
  }, [ticker])

  const sendChat = useCallback(async () => {
    const q = input.trim()
    if (!q || chatting) return
    if (!API) return
    setInput("")
    setMessages((p) => [...p, { role: "user", content: q }])
    setChatting(true)
    try {
      const res = await axios.post(`${API}/stock/chat`, { question: q }, { timeout: 90_000 })
      setMessages((p) => [
        ...p,
        { role: "assistant", content: res.data.answer, ticker: res.data.ticker },
      ])
    } catch (e: any) {
      setMessages((p) => [
        ...p,
        {
          role: "assistant",
          content:
            "⚠️ " + (e.response?.data?.detail || "Could not reach the analysis engine. Try again."),
        },
      ])
    } finally {
      setChatting(false)
    }
  }, [input, chatting])

  const changePct = useMemo(() => {
    if (!prediction) return 0
    return ((prediction.next_day - prediction.current_price) / prediction.current_price) * 100
  }, [prediction])

  return (
    <div className="flex min-h-dvh flex-col bg-background">
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 left-1/4 size-[28rem] rounded-full bg-primary/10 blur-[120px]" />
        <div className="absolute -bottom-40 right-1/4 size-[26rem] rounded-full bg-[oklch(0.6_0.13_270)]/10 blur-[120px]" />
      </div>

      {/* header */}
      <header className="flex items-center justify-between border-b border-border px-4 py-3">
        <Link
          href="/"
          aria-label="Go to CortexOS home"
          className="flex items-center gap-2.5 rounded-xl outline-none transition-opacity hover:opacity-80 focus-visible:ring-2 focus-visible:ring-primary/50"
        >
          <span className="flex size-9 items-center justify-center rounded-xl bg-primary/15 text-primary ring-1 ring-primary/25">
            <Brain className="size-5" aria-hidden="true" />
          </span>
          <div className="leading-tight">
            <p className="flex items-center gap-1.5 text-sm font-semibold text-foreground">
              CortexOS
              <span className="rounded-full bg-primary/15 px-1.5 py-0.5 text-[10px] font-medium text-primary ring-1 ring-primary/25">
                Capital Pulse
              </span>
            </p>
            <p className="text-xs text-muted-foreground">Stock intelligence workspace</p>
          </div>
        </Link>
        <Link
          href="/documents"
          className="rounded-lg border border-border bg-card/40 px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
        >
          Documents →
        </Link>
      </header>

      <main className="mx-auto grid w-full max-w-6xl flex-1 gap-5 p-4 lg:grid-cols-5">
        {/* Prediction panel */}
        <section className="lg:col-span-3">
          <div className="glass rounded-2xl p-5">
            <div className="flex items-center gap-2">
              <TrendingUp className="size-5 text-primary" />
              <h2 className="text-base font-semibold">Price Forecast</h2>
            </div>
            <p className="mt-1 text-xs text-muted-foreground">
              7-day forecast with backtested accuracy metrics. Powered by live Yahoo Finance data.
            </p>

            <div className="mt-4 flex gap-2">
              <input
                value={ticker}
                onChange={(e) => setTicker(e.target.value.toUpperCase())}
                onKeyDown={(e) => e.key === "Enter" && runPredict()}
                placeholder="Ticker e.g. AAPL"
                className="w-40 rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
              />
              <button
                onClick={runPredict}
                disabled={predicting}
                className="gradient-accent inline-flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-60"
              >
                {predicting ? <Loader2 className="size-4 animate-spin" /> : <LineChart className="size-4" />}
                {predicting ? "Forecasting…" : "Forecast"}
              </button>
            </div>

            {predError && (
              <p className="mt-4 rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
                {predError}
              </p>
            )}

            {prediction && (
              <div className="mt-5">
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                  <Stat label="Current" value={`$${prediction.current_price}`} />
                  <Stat
                    label="Next Day"
                    value={`$${prediction.next_day}`}
                    sub={`${changePct >= 0 ? "+" : ""}${changePct.toFixed(2)}%`}
                    positive={changePct >= 0}
                  />
                  <Stat label="Accuracy" value={`${prediction.metrics.accuracy}%`} />
                  <Stat label="RMSE" value={`${prediction.metrics.rmse}`} />
                </div>

                <div className="mt-5 rounded-xl border border-border bg-card/30 p-3">
                  <ForecastChart data={prediction} />
                </div>

                <div className="mt-4">
                  <h3 className="text-sm font-medium">7-Day Forecast</h3>
                  <div className="mt-2 overflow-hidden rounded-lg border border-border">
                    <table className="w-full text-sm">
                      <thead className="bg-muted/40 text-xs text-muted-foreground">
                        <tr>
                          <th className="px-3 py-2 text-left font-medium">Date</th>
                          <th className="px-3 py-2 text-right font-medium">Predicted Price</th>
                        </tr>
                      </thead>
                      <tbody>
                        {prediction.forecast.dates.map((d, i) => (
                          <tr key={d} className="border-t border-border">
                            <td className="px-3 py-2">{d}</td>
                            <td className="px-3 py-2 text-right font-medium">
                              ${prediction.forecast.prices[i]}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <p className="mt-3 text-[11px] leading-relaxed text-muted-foreground">
                    Model: {prediction.model}. Forecasts are statistical estimates, not financial
                    advice.
                  </p>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Chatbot panel */}
        <section className="lg:col-span-2">
          <div className="glass flex h-full min-h-[28rem] flex-col rounded-2xl p-5">
            <div className="flex items-center gap-2">
              <Sparkles className="size-5 text-primary" />
              <h2 className="text-base font-semibold">Analytical Chatbot</h2>
            </div>
            <p className="mt-1 text-xs text-muted-foreground">
              Ask why a stock moved — answers cite live price action & news.
            </p>

            <div className="mt-4 flex-1 space-y-3 overflow-y-auto pr-1">
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={m.role === "user" ? "flex justify-end" : "flex justify-start"}
                >
                  <div
                    className={
                      m.role === "user"
                        ? "max-w-[85%] rounded-2xl rounded-br-sm bg-primary/15 px-3 py-2 text-sm text-foreground ring-1 ring-primary/25"
                        : "max-w-[90%] whitespace-pre-wrap rounded-2xl rounded-bl-sm border border-border bg-card/40 px-3 py-2 text-sm text-foreground"
                    }
                  >
                    {m.ticker ? (
                      <span className="mb-1 block text-[10px] font-semibold uppercase tracking-wide text-primary">
                        {m.ticker}
                      </span>
                    ) : null}
                    {m.content}
                  </div>
                </div>
              ))}
              {chatting && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Loader2 className="size-4 animate-spin" /> Analyzing…
                </div>
              )}
            </div>

            <div className="mt-3 flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendChat()}
                placeholder="e.g. Why did Tesla move recently?"
                className="flex-1 rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
              />
              <button
                onClick={sendChat}
                disabled={chatting || !input.trim()}
                className="gradient-accent inline-flex items-center justify-center rounded-lg px-3 py-2 text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-60"
                aria-label="Send"
              >
                <Send className="size-4" />
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

function Stat({
  label,
  value,
  sub,
  positive,
}: {
  label: string
  value: string
  sub?: string
  positive?: boolean
}) {
  return (
    <div className="rounded-xl border border-border bg-card/30 p-3">
      <p className="text-[11px] uppercase tracking-wide text-muted-foreground">{label}</p>
      <p className="mt-1 text-lg font-semibold">{value}</p>
      {sub && (
        <p className={`text-xs font-medium ${positive ? "text-emerald-500" : "text-destructive"}`}>
          {sub}
        </p>
      )}
    </div>
  )
}
