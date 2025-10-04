"use client"
import DashboardCard from "@/components/dashboard/card"
import { Badge } from "@/components/ui/badge"
import { Sparkles } from "lucide-react"

type StockSummaryData = {
  symbol: string
  summary: string
}

export default function StockSummary({ data }: { data: StockSummaryData }) {
  return (
    <DashboardCard
      title="AI STOCK SUMMARY"
      intent="default"
      addon={
        <Badge variant="outline">
          <Sparkles className="size-3 mr-1" />
          INSIGHTS
        </Badge>
      }
    >
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <span className="font-display text-2xl text-primary">{data.symbol}</span>
        </div>
        <p className="text-sm leading-relaxed text-foreground/90">{data.summary}</p>
      </div>
    </DashboardCard>
  )
}
