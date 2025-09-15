"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, DollarSign, Wallet, Target } from "lucide-react"

interface PortfolioData {
  totalValue: number
  totalCost: number
  totalGain: number
  totalGainPercent: number
  todayChange: number
  todayChangePercent: number
  cashBalance: number
}

interface PortfolioOverviewProps {
  data: PortfolioData
}

export function PortfolioOverview({ data }: PortfolioOverviewProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">総資産</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">¥{data.totalValue.toLocaleString()}</div>
          <div className="flex items-center gap-2 mt-2">
            <div className="flex items-center gap-1">
              {data.todayChange > 0 ? (
                <TrendingUp className="h-3 w-3 text-green-600" />
              ) : (
                <TrendingDown className="h-3 w-3 text-red-600" />
              )}
              <span className={`text-xs ${data.todayChange > 0 ? "text-green-600" : "text-red-600"}`}>
                {data.todayChange > 0 ? "+" : ""}¥{data.todayChange.toLocaleString()}
              </span>
            </div>
            <Badge variant={data.todayChangePercent > 0 ? "default" : "destructive"} className="text-xs">
              {data.todayChangePercent > 0 ? "+" : ""}
              {data.todayChangePercent}%
            </Badge>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">総損益</CardTitle>
          <Target className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className={`text-2xl font-bold ${data.totalGain > 0 ? "text-green-600" : "text-red-600"}`}>
            {data.totalGain > 0 ? "+" : ""}¥{data.totalGain.toLocaleString()}
          </div>
          <div className="flex items-center gap-2 mt-2">
            <Badge variant={data.totalGainPercent > 0 ? "default" : "destructive"} className="text-xs">
              {data.totalGainPercent > 0 ? "+" : ""}
              {data.totalGainPercent}%
            </Badge>
            <span className="text-xs text-muted-foreground">投資開始から</span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">投資元本</CardTitle>
          <Wallet className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">¥{data.totalCost.toLocaleString()}</div>
          <p className="text-xs text-muted-foreground mt-2">累計投資額</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">現金残高</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">¥{data.cashBalance.toLocaleString()}</div>
          <p className="text-xs text-muted-foreground mt-2">
            {((data.cashBalance / data.totalValue) * 100).toFixed(1)}% of portfolio
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
