"use client"

import { useMemo, useState } from "react"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"

type Stock = {
  symbol: string
  name: string
  sector?: string
}

const STOCKS: Stock[] = [
  { symbol: "AAPL", name: "Apple Inc.", sector: "Technology" },
  { symbol: "MSFT", name: "Microsoft Corporation", sector: "Technology" },
  { symbol: "GOOGL", name: "Alphabet Inc. Class A", sector: "Communication Services" },
  { symbol: "AMZN", name: "Amazon.com Inc.", sector: "Consumer Discretionary" },
  { symbol: "META", name: "Meta Platforms Inc.", sector: "Communication Services" },
  { symbol: "NVDA", name: "NVIDIA Corporation", sector: "Technology" },
  { symbol: "TSLA", name: "Tesla Inc.", sector: "Consumer Discretionary" },
  { symbol: "BRK.B", name: "Berkshire Hathaway Inc. Class B", sector: "Financials" },
  { symbol: "JPM", name: "JPMorgan Chase & Co.", sector: "Financials" },
  { symbol: "V", name: "Visa Inc. Class A", sector: "Financials" },
  { symbol: "UNH", name: "UnitedHealth Group Incorporated", sector: "Health Care" },
  { symbol: "XOM", name: "Exxon Mobil Corporation", sector: "Energy" },
  { symbol: "HD", name: "Home Depot Inc.", sector: "Consumer Discretionary" },
  { symbol: "PG", name: "Procter & Gamble Company", sector: "Consumer Staples" },
  { symbol: "KO", name: "Coca-Cola Company", sector: "Consumer Staples" },
]

const TENURES = ["1D", "1W", "1M", "3M", "6M", "1Y", "5Y", "Max"]

export function FloatingMarketAssistant({
  className,
  onPick,
}: {
  className?: string
  onPick?: (stock: Stock, tenure: string) => void
}) {
  const [query, setQuery] = useState("")
  const [tenure, setTenure] = useState("1M")

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return STOCKS
    return STOCKS.filter(
      (s) =>
        s.symbol.toLowerCase().includes(q) ||
        s.name.toLowerCase().includes(q) ||
        (s.sector?.toLowerCase().includes(q) ?? false),
    )
  }, [query])

  return (
    <div className={cn("fixed bottom-4 right-4 z-50 w-[min(96vw,560px)]", className)} aria-label="Market Assistant">
      <Card className="border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80 shadow-lg">
        <div className="flex flex-col gap-3 p-3">
          {/* Search + Tenure */}
          <div className="flex items-center gap-2">
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search stocks by symbol, name, or sector"
              aria-label="Search stocks"
              className="flex-1"
            />
            <Select value={tenure} onValueChange={setTenure}>
              <SelectTrigger className="w-[120px]" aria-label="Investment tenure">
                <SelectValue placeholder="Tenure" />
              </SelectTrigger>
              <SelectContent className="max-h-64">
                {TENURES.map((t) => (
                  <SelectItem key={t} value={t}>
                    {t}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Results list */}
          <ScrollArea className="h-56 rounded-md border">
            <ul className="divide-y">
              {results.map((s) => (
                <li key={s.symbol}>
                  <button
                    type="button"
                    className="flex w-full items-center justify-between gap-3 px-3 py-2 text-left hover:bg-accent"
                    onClick={() => onPick?.(s, tenure)}
                    aria-label={`Select ${s.symbol} ${s.name}`}
                  >
                    <div className="min-w-0">
                      <div className="font-mono text-sm font-medium">{s.symbol}</div>
                      <div className="truncate text-xs text-muted-foreground">{s.name}</div>
                    </div>
                    {s.sector ? (
                      <span className="rounded bg-secondary px-2 py-0.5 text-[10px] text-secondary-foreground">
                        {s.sector}
                      </span>
                    ) : null}
                  </button>
                </li>
              ))}
            </ul>
          </ScrollArea>
        </div>
      </Card>
    </div>
  )
}

export default FloatingMarketAssistant
