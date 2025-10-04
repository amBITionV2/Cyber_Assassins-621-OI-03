import type React from "react"
import { Roboto_Mono } from "next/font/google"
import "./globals.css"
import type { Metadata } from "next"
import { V0Provider } from "@/lib/v0-context"
import localFont from "next/font/local"
import { SidebarProvider } from "@/components/ui/sidebar"
import { MobileHeader } from "@/components/dashboard/mobile-header"
import Notifications from "@/components/dashboard/notifications"
import { MobileChat } from "@/components/chat/mobile-chat"
import Chat from "@/components/chat"
import RebelsRanking from "@/components/dashboard/rebels-ranking"
import Fundamentals from "@/components/dashboard/fundamentals"
import Image from "next/image"
import mockDataJson from "@/mock.json"
import type { MockData } from "@/types/dashboard"
import MarketAssistantInline from "@/components/dashboard/market-assistant-inline"
import StockSummary from "@/components/dashboard/stock-summary"

const mockData = mockDataJson as MockData

const robotoMono = Roboto_Mono({
  variable: "--font-roboto-mono",
  subsets: ["latin"],
})

const rebelGrotesk = localFont({
  src: "../public/fonts/Rebels-Fett.woff2",
  variable: "--font-rebels",
  display: "swap",
})

const isV0 = process.env["VERCEL_URL"]?.includes("vusercontent.net") ?? false

export const metadata: Metadata = {
  title: {
    template: "%s – StockScope",
    default: "StockScope",
  },
  description: "Real-time stock analysis dashboard for investors.",
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preload" href="/fonts/Rebels-Fett.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
      </head>
      <body className={`${rebelGrotesk.variable} ${robotoMono.variable} antialiased`}>
        <V0Provider isV0={isV0}>
          <SidebarProvider>
            {/* Mobile Header - only visible on mobile */}
            <MobileHeader mockData={mockData} />

            {/* Desktop Layout */}
            <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-gap lg:px-sides">
              <div className="hidden lg:block col-span-2 top-0 relative">
                <div className="space-y-3 sticky top-0">
                  <div className="flex items-center gap-3 p-3 rounded bg-sidebar-accent">
                    <div className="shrink-0 overflow-clip rounded bg-sidebar-primary text-sidebar-primary-foreground">
                      <Image src={"/avatars/user_krimson.png"} alt={"KRIMSON"} width={56} height={56} />
                    </div>
                    <div className="min-w-0">
                      <div className="text-xl font-display truncate">KRIMSON</div>
                      <div className="text-xs uppercase opacity-60 truncate">krimson@joyco.studio</div>
                    </div>
                  </div>

                  {/* Top Gainers */}
                  <div>
                    <RebelsRanking rebels={mockData.rebelsRanking} type="gainers" />
                  </div>

                  {/* Top Losers */}
                  <div>
                    <RebelsRanking rebels={mockData.losers} type="losers" />
                  </div>

                  {/* Fundamentals */}
                  <div>
                    <Fundamentals data={mockData.fundamentals} />
                  </div>
                </div>
              </div>

              <div className="col-span-1 lg:col-span-7">{children}</div>

              <div className="col-span-3 hidden lg:block">
                <div className="space-y-gap py-sides min-h-screen max-h-screen sticky top-0 overflow-clip">
                  <StockSummary data={mockData.stockSummary} />
                  <Notifications initialNotifications={mockData.notifications} />
                  <MarketAssistantInline />
                  <Chat />
                </div>
              </div>
            </div>

            {/* Mobile Chat - floating CTA with drawer */}
            <MobileChat />
          </SidebarProvider>
        </V0Provider>
      </body>
    </html>
  )
}
