import DashboardCard from "@/components/dashboard/card"

type FundamentalsData = {
  symbol: string
  marketCap: string
  pe: string
  eps: string
  dividendYield: string
  beta: string
  range52W: string
  volume?: string
  avgVolume?: string
}

export default function Fundamentals({ data }: { data: FundamentalsData }) {
  return (
    <DashboardCard title="FUNDAMENTALS" intent="default">
      <div className="grid grid-cols-2 gap-3 text-sm">
        <div>
          <div className="opacity-60">SYMBOL</div>
          <div className="font-display text-lg">{data.symbol}</div>
        </div>
        <div>
          <div className="opacity-60">MARKET CAP</div>
          <div className="font-display text-lg">{data.marketCap}</div>
        </div>
        <div>
          <div className="opacity-60">P/E (TTM)</div>
          <div className="font-display text-lg">{data.pe}</div>
        </div>
        <div>
          <div className="opacity-60">EPS (TTM)</div>
          <div className="font-display text-lg">{data.eps}</div>
        </div>
        <div>
          <div className="opacity-60">DIV YIELD</div>
          <div className="font-display text-lg">{data.dividendYield}</div>
        </div>
        <div>
          <div className="opacity-60">BETA</div>
          <div className="font-display text-lg">{data.beta}</div>
        </div>
        <div className="col-span-2">
          <div className="opacity-60">52W RANGE</div>
          <div className="font-display text-lg">{data.range52W}</div>
        </div>
        {data.volume && (
          <div>
            <div className="opacity-60">VOLUME</div>
            <div className="font-display text-lg">{data.volume}</div>
          </div>
        )}
        {data.avgVolume && (
          <div>
            <div className="opacity-60">AVG VOLUME</div>
            <div className="font-display text-lg">{data.avgVolume}</div>
          </div>
        )}
      </div>
    </DashboardCard>
  )
}
