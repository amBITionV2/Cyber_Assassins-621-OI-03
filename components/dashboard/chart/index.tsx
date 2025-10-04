"use client"

import * as React from "react"
import { XAxis, YAxis, CartesianGrid, Area, AreaChart, Line, LineChart } from "recharts"

import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import mockDataJson from "@/mock.json"
import { Bullet } from "@/components/ui/bullet"
import type { MockData, TimePeriod } from "@/types/dashboard"
import { Button } from "@/components/ui/button"
import { RefreshCw } from "lucide-react"

const mockData = mockDataJson as MockData

type ChartDataPoint = {
  date: string
  price: number
  volume: number
  marketCap: number
}

const chartConfig = {
  price: {
    label: "Price",
    color: "var(--chart-1)",
  },
  volume: {
    label: "Volume",
    color: "var(--chart-2)",
  },
  marketCap: {
    label: "Market Cap",
    color: "var(--chart-4)",
  },
} satisfies ChartConfig

export default function DashboardChart() {
  const [activeTab, setActiveTab] = React.useState<TimePeriod>("week")
  const [chartType, setChartType] = React.useState<"area" | "line">("area")
  const [visibleDatasets, setVisibleDatasets] = React.useState<Set<string>>(new Set(["price", "volume", "marketCap"]))
  const [isRefreshing, setIsRefreshing] = React.useState(false)

  const handleTabChange = (value: string) => {
    if (value === "day" || value === "week" || value === "month" || value === "year" || value === "max") {
      setActiveTab(value as TimePeriod)
    }
  }

  const toggleDataset = (dataset: string) => {
    setVisibleDatasets((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(dataset)) {
        newSet.delete(dataset)
      } else {
        newSet.add(dataset)
      }
      return newSet
    })
  }

  const handleRefresh = () => {
    setIsRefreshing(true)
    setTimeout(() => setIsRefreshing(false), 1000)
  }

  const formatYAxisValue = (value: number) => {
    if (value === 0) {
      return ""
    }

    if (value >= 1000000) {
      return `${(value / 1000000).toFixed(0)}M`
    } else if (value >= 1000) {
      return `${(value / 1000).toFixed(0)}K`
    }
    return value.toString()
  }

  const renderChart = (data: ChartDataPoint[]) => {
    const ChartComponent = chartType === "area" ? AreaChart : LineChart

    return (
      <div className="bg-accent rounded-lg p-3">
        <ChartContainer className="md:aspect-[3/1] w-full" config={chartConfig}>
          <ChartComponent
            accessibilityLayer
            data={data}
            margin={{
              left: -12,
              right: 12,
              top: 12,
              bottom: 12,
            }}
          >
            <defs>
              <linearGradient id="fillPrice" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-price)" stopOpacity={0.8} />
                <stop offset="95%" stopColor="var(--color-price)" stopOpacity={0.1} />
              </linearGradient>
              <linearGradient id="fillVolume" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-volume)" stopOpacity={0.8} />
                <stop offset="95%" stopColor="var(--color-volume)" stopOpacity={0.1} />
              </linearGradient>
              <linearGradient id="fillMarketCap" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-marketCap)" stopOpacity={0.8} />
                <stop offset="95%" stopColor="var(--color-marketCap)" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <CartesianGrid
              horizontal={false}
              strokeDasharray="8 8"
              strokeWidth={2}
              stroke="var(--muted-foreground)"
              opacity={0.3}
            />
            <XAxis
              dataKey="date"
              tickLine={false}
              tickMargin={12}
              strokeWidth={1.5}
              className="uppercase text-sm fill-muted-foreground"
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={0}
              tickCount={6}
              className="text-sm fill-muted-foreground"
              tickFormatter={formatYAxisValue}
              domain={[0, "dataMax"]}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" className="min-w-[200px] px-4 py-3" />}
            />
            {visibleDatasets.has("price") &&
              (chartType === "area" ? (
                <Area
                  dataKey="price"
                  type="linear"
                  fill="url(#fillPrice)"
                  fillOpacity={0.4}
                  stroke="var(--color-price)"
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 4 }}
                />
              ) : (
                <Line
                  dataKey="price"
                  type="linear"
                  stroke="var(--color-price)"
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 4 }}
                />
              ))}
            {visibleDatasets.has("volume") &&
              (chartType === "area" ? (
                <Area
                  dataKey="volume"
                  type="linear"
                  fill="url(#fillVolume)"
                  fillOpacity={0.4}
                  stroke="var(--color-volume)"
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 4 }}
                />
              ) : (
                <Line
                  dataKey="volume"
                  type="linear"
                  stroke="var(--color-volume)"
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 4 }}
                />
              ))}
            {visibleDatasets.has("marketCap") &&
              (chartType === "area" ? (
                <Area
                  dataKey="marketCap"
                  type="linear"
                  fill="url(#fillMarketCap)"
                  fillOpacity={0.4}
                  stroke="var(--color-marketCap)"
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 4 }}
                />
              ) : (
                <Line
                  dataKey="marketCap"
                  type="linear"
                  stroke="var(--color-marketCap)"
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 4 }}
                />
              ))}
          </ChartComponent>
        </ChartContainer>
      </div>
    )
  }

  return (
    <Tabs value={activeTab} onValueChange={handleTabChange} className="max-md:gap-4">
      <div className="flex items-center justify-between mb-4 max-md:contents flex-wrap gap-4">
        <TabsList className="max-md:w-full">
          <TabsTrigger value="day">DAY</TabsTrigger>
          <TabsTrigger value="week">WEEK</TabsTrigger>
          <TabsTrigger value="month">MONTH</TabsTrigger>
          <TabsTrigger value="year">YEAR</TabsTrigger>
          <TabsTrigger value="max">MAX</TabsTrigger>
        </TabsList>
        <div className="flex items-center gap-4 max-md:order-1 flex-wrap">
          <div className="flex items-center gap-3">
            {Object.entries(chartConfig).map(([key, value]) => (
              <button
                key={key}
                onClick={() => toggleDataset(key)}
                className={`flex items-center gap-2 uppercase transition-opacity ${
                  visibleDatasets.has(key) ? "opacity-100" : "opacity-30"
                }`}
              >
                <Bullet style={{ backgroundColor: value.color }} className="rotate-45" />
                <span className="text-sm font-medium text-muted-foreground">{value.label}</span>
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant={chartType === "area" ? "default" : "outline"}
              onClick={() => setChartType("area")}
              className="uppercase text-xs"
            >
              Area
            </Button>
            <Button
              size="sm"
              variant={chartType === "line" ? "default" : "outline"}
              onClick={() => setChartType("line")}
              className="uppercase text-xs"
            >
              Line
            </Button>
            <Button size="sm" variant="outline" onClick={handleRefresh} className="uppercase text-xs bg-transparent">
              <RefreshCw className={`size-4 ${isRefreshing ? "animate-spin" : ""}`} />
            </Button>
          </div>
        </div>
      </div>
      <TabsContent value="day" className="space-y-4">
        {renderChart(mockData.chartData.day)}
      </TabsContent>
      <TabsContent value="week" className="space-y-4">
        {renderChart(mockData.chartData.week)}
      </TabsContent>
      <TabsContent value="month" className="space-y-4">
        {renderChart(mockData.chartData.month)}
      </TabsContent>
      <TabsContent value="year" className="space-y-4">
        {renderChart(mockData.chartData.year)}
      </TabsContent>
      <TabsContent value="max" className="space-y-4">
        {renderChart(mockData.chartData.max)}
      </TabsContent>
    </Tabs>
  )
}
