"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, PieChart, Plus, Search, Download, RefreshCw, AlertTriangle, Target } from "lucide-react"
import { PortfolioOverview } from "@/components/portfolio/portfolio-overview"
import { HoldingsTable } from "@/components/portfolio/holdings-table"
import { PerformanceChart } from "@/components/portfolio/performance-chart"
import { AssetAllocation } from "@/components/portfolio/asset-allocation"
import { AddHoldingDialog } from "@/components/portfolio/add-holding-dialog"

// モックデータ
const mockPortfolioData = {
  totalValue: 12500000,
  totalCost: 11800000,
  totalGain: 700000,
  totalGainPercent: 5.93,
  todayChange: 125000,
  todayChangePercent: 1.02,
  cashBalance: 950000,
}

const mockHoldings = [
  {
    id: "1",
    symbol: "7203",
    name: "トヨタ自動車",
    sector: "自動車",
    shares: 100,
    avgPrice: 2650,
    currentPrice: 2800,
    marketValue: 280000,
    unrealizedGain: 15000,
    unrealizedGainPercent: 5.66,
    todayChange: 2.1,
    weight: 22.4,
  },
  {
    id: "2",
    symbol: "6758",
    name: "ソニーグループ",
    sector: "電機",
    shares: 50,
    avgPrice: 3800,
    currentPrice: 3900,
    marketValue: 195000,
    unrealizedGain: 5000,
    unrealizedGainPercent: 2.63,
    todayChange: -1.2,
    weight: 15.6,
  },
  {
    id: "3",
    symbol: "9984",
    name: "ソフトバンクグループ",
    sector: "通信",
    shares: 30,
    avgPrice: 5800,
    currentPrice: 6000,
    marketValue: 180000,
    unrealizedGain: 6000,
    unrealizedGainPercent: 3.45,
    todayChange: 3.5,
    weight: 14.4,
  },
  {
    id: "4",
    symbol: "SPY",
    name: "SPDR S&P 500 ETF",
    sector: "ETF",
    shares: 25,
    avgPrice: 4600,
    currentPrice: 4800,
    marketValue: 120000,
    unrealizedGain: 5000,
    unrealizedGainPercent: 4.35,
    todayChange: -0.8,
    weight: 9.6,
  },
  {
    id: "5",
    symbol: "VTI",
    name: "バンガード・トータル・ストック・マーケットETF",
    sector: "ETF",
    shares: 40,
    avgPrice: 2200,
    currentPrice: 2300,
    marketValue: 92000,
    unrealizedGain: 4000,
    unrealizedGainPercent: 4.55,
    todayChange: -0.5,
    weight: 7.4,
  },
]

export default function PortfolioPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedSector, setSelectedSector] = useState("all")
  const [showAddDialog, setShowAddDialog] = useState(false)

  const filteredHoldings = mockHoldings.filter((holding) => {
    const matchesSearch =
      holding.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      holding.symbol.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesSector = selectedSector === "all" || holding.sector === selectedSector
    return matchesSearch && matchesSector
  })

  const sectors = Array.from(new Set(mockHoldings.map((h) => h.sector)))

  return (
    <div className="min-h-screen bg-background">
      {/* ヘッダー */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/dashboard">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <div className="flex items-center space-x-2">
              <div className="bg-primary rounded-full p-2">
                <PieChart className="h-5 w-5 text-primary-foreground" />
              </div>
              <h1 className="text-xl font-serif font-bold">ポートフォリオ管理</h1>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              エクスポート
            </Button>
            <Button variant="outline" size="sm">
              <RefreshCw className="h-4 w-4 mr-2" />
              更新
            </Button>
            <Button size="sm" onClick={() => setShowAddDialog(true)}>
              <Plus className="h-4 w-4 mr-2" />
              銘柄追加
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        {/* ポートフォリオ概要 */}
        <PortfolioOverview data={mockPortfolioData} />

        {/* メインコンテンツ */}
        <div className="mt-6">
          <Tabs defaultValue="holdings" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="holdings">保有銘柄</TabsTrigger>
              <TabsTrigger value="performance">パフォーマンス</TabsTrigger>
              <TabsTrigger value="allocation">資産配分</TabsTrigger>
              <TabsTrigger value="analysis">分析</TabsTrigger>
            </TabsList>

            <TabsContent value="holdings" className="space-y-6">
              {/* 検索・フィルター */}
              <Card>
                <CardContent className="pt-6">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1">
                      <Label htmlFor="search">銘柄検索</Label>
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="search"
                          placeholder="銘柄名またはシンボルで検索..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="pl-10"
                        />
                      </div>
                    </div>
                    <div className="sm:w-48">
                      <Label htmlFor="sector">セクター</Label>
                      <select
                        id="sector"
                        value={selectedSector}
                        onChange={(e) => setSelectedSector(e.target.value)}
                        className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm"
                      >
                        <option value="all">すべて</option>
                        {sectors.map((sector) => (
                          <option key={sector} value={sector}>
                            {sector}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* 保有銘柄テーブル */}
              <HoldingsTable holdings={filteredHoldings} />
            </TabsContent>

            <TabsContent value="performance" className="space-y-6">
              <PerformanceChart />
            </TabsContent>

            <TabsContent value="allocation" className="space-y-6">
              <AssetAllocation holdings={mockHoldings} />
            </TabsContent>

            <TabsContent value="analysis" className="space-y-6">
              {/* リスク分析 */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <AlertTriangle className="h-5 w-5 text-orange-500" />
                      リスク分析
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm">ポートフォリオβ値</span>
                        <span className="text-sm font-medium">1.15</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">年間ボラティリティ</span>
                        <span className="text-sm font-medium">18.5%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">シャープレシオ</span>
                        <span className="text-sm font-medium">0.85</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">最大ドローダウン</span>
                        <span className="text-sm font-medium text-red-600">-12.3%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Target className="h-5 w-5 text-primary" />
                      推奨アクション
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="p-3 bg-orange-50 dark:bg-orange-950/20 rounded-lg">
                      <p className="text-sm font-medium text-orange-800 dark:text-orange-200">地域分散の改善</p>
                      <p className="text-xs text-orange-600 dark:text-orange-300 mt-1">
                        欧州株式への投資を検討してください
                      </p>
                    </div>
                    <div className="p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                      <p className="text-sm font-medium text-blue-800 dark:text-blue-200">現金比率の調整</p>
                      <p className="text-xs text-blue-600 dark:text-blue-300 mt-1">
                        現金比率を10-15%に引き上げることを推奨
                      </p>
                    </div>
                    <div className="p-3 bg-green-50 dark:bg-green-950/20 rounded-lg">
                      <p className="text-sm font-medium text-green-800 dark:text-green-200">リバランス時期</p>
                      <p className="text-xs text-green-600 dark:text-green-300 mt-1">
                        四半期末のリバランスを検討してください
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* 銘柄追加ダイアログ */}
      <AddHoldingDialog open={showAddDialog} onOpenChange={setShowAddDialog} />
    </div>
  )
}
