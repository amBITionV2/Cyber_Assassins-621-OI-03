"use client"
import { useState, useMemo } from "react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

type Tenure = "3m" | "6m" | "1y" | "3y" | "5y"

const DEFAULT_TENURE: Tenure = "6m"

// Small demo universe; replace with live search or your data source later.
const TICKERS = ["AAPL", "MSFT", "NVDA", "AMZN", "GOOGL", "META", "TSLA", "NFLX", "AMD", "AVGO"]

export default function MarketAssistantInline() {
  const [query, setQuery] = useState<string>("AAPL")
  const [tenure, setTenure] = useState<Tenure>(DEFAULT_TENURE)
  const [activeTicker, setActiveTicker] = useState<string>("AAPL")
  const [openList, setOpenList] = useState<boolean>(false)

  const filtered = useMemo(() => {
    if (!query) return TICKERS
    const q = query.toUpperCase()
    return TICKERS.filter((t) => t.includes(q))
  }, [query])

  function handlePick(t: string) {
    setActiveTicker(t)
    setQuery(t)
    setOpenList(false)
  }

  const summary = useMemo(() => {
    const verdict =
      tenure === "3m"
        ? "Short-term momentum observed."
        : tenure === "6m"
          ? "Mid-term stabilization trend."
          : tenure === "1y"
            ? "One-year performance indicates resilience."
            : tenure === "3y"
              ? "Three-year trend suggests steady growth."
              : "Long horizon shows compounding potential."

    return `Summary for ${activeTicker} over ${tenure.toUpperCase()}: ${verdict}`
  }, [activeTicker, tenure])

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col md:flex-row gap-3">
        <div className="relative w-full md:max-w-sm">
          <Input
            aria-label="Search ticker"
            placeholder="Search ticker (e.g., AAPL, NVDA)"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value)
              setOpenList(true)
            }}
            onFocus={() => setOpenList(true)}
            onBlur={() => setTimeout(() => setOpenList(false), 100)} // allow click
          />
          {openList && filtered.length > 0 ? (
            <div
              role="listbox"
              className="absolute z-10 mt-1 w-full rounded-md border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
            >
              <ul className="max-h-56 overflow-auto text-sm">
                {filtered.map((t) => (
                  <li key={t}>
                    <button
                      type="button"
                      className="w-full text-left px-3 py-2 hover:bg-accent hover:text-accent-foreground"
                      onClick={() => handlePick(t)}
                    >
                      {t}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>

        <div className="w-full md:w-40">
          <Select value={tenure} onValueChange={(v: Tenure) => setTenure(v)}>
            <SelectTrigger aria-label="Investment tenure">
              <SelectValue placeholder="Tenure" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="3m">3m</SelectItem>
              <SelectItem value="6m">6m</SelectItem>
              <SelectItem value="1y">1y</SelectItem>
              <SelectItem value="3y">3y</SelectItem>
              <SelectItem value="5y">5y</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="rounded-md border p-3">
        <p className="text-sm text-muted-foreground">{summary}</p>
      </div>
    </div>
  )
}
