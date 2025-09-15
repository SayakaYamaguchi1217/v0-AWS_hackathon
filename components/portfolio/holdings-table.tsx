"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { TrendingUp, TrendingDown, MoreHorizontal } from "lucide-react"

interface Holding {
  id: string
  symbol: string
  name: string
  sector: string
  shares: number
  avgPrice: number
  currentPrice: number
  marketValue: number
  unrealizedGain: number
  unrealizedGainPercent: number
  todayChange: number
  weight: number
}

interface HoldingsTableProps {
  holdings: Holding[]
}

export function HoldingsTable({ holdings }: HoldingsTableProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>保有銘柄一覧</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-2 font-medium text-sm">銘柄</th>
                <th className="text-right py-3 px-2 font-medium text-sm">保有数</th>
                <th className="text-right py-3 px-2 font-medium text-sm">平均取得価格</th>
                <th className="text-right py-3 px-2 font-medium text-sm">現在価格</th>
                <th className="text-right py-3 px-2 font-medium text-sm">評価額</th>
                <th className="text-right py-3 px-2 font-medium text-sm">損益</th>
                <th className="text-right py-3 px-2 font-medium text-sm">当日変動</th>
                <th className="text-right py-3 px-2 font-medium text-sm">構成比</th>
                <th className="text-center py-3 px-2 font-medium text-sm">操作</th>
              </tr>
            </thead>
            <tbody>
              {holdings.map((holding) => (
                <tr key={holding.id} className="border-b hover:bg-muted/50">
                  <td className="py-4 px-2">
                    <div>
                      <div className="font-medium text-sm">{holding.name}</div>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline" className="text-xs">
                          {holding.symbol}
                        </Badge>
                        <span className="text-xs text-muted-foreground">{holding.sector}</span>
                      </div>
                    </div>
                  </td>
                  <td className="text-right py-4 px-2 text-sm">{holding.shares}</td>
                  <td className="text-right py-4 px-2 text-sm">¥{holding.avgPrice.toLocaleString()}</td>
                  <td className="text-right py-4 px-2 text-sm">¥{holding.currentPrice.toLocaleString()}</td>
                  <td className="text-right py-4 px-2 text-sm font-medium">¥{holding.marketValue.toLocaleString()}</td>
                  <td className="text-right py-4 px-2">
                    <div className={`text-sm ${holding.unrealizedGain > 0 ? "text-green-600" : "text-red-600"}`}>
                      {holding.unrealizedGain > 0 ? "+" : ""}¥{holding.unrealizedGain.toLocaleString()}
                    </div>
                    <div className={`text-xs ${holding.unrealizedGain > 0 ? "text-green-600" : "text-red-600"}`}>
                      ({holding.unrealizedGain > 0 ? "+" : ""}
                      {holding.unrealizedGainPercent.toFixed(2)}%)
                    </div>
                  </td>
                  <td className="text-right py-4 px-2">
                    <div className="flex items-center justify-end gap-1">
                      {holding.todayChange > 0 ? (
                        <TrendingUp className="h-3 w-3 text-green-600" />
                      ) : (
                        <TrendingDown className="h-3 w-3 text-red-600" />
                      )}
                      <span className={`text-xs ${holding.todayChange > 0 ? "text-green-600" : "text-red-600"}`}>
                        {holding.todayChange > 0 ? "+" : ""}
                        {holding.todayChange}%
                      </span>
                    </div>
                  </td>
                  <td className="text-right py-4 px-2 text-sm">{holding.weight}%</td>
                  <td className="text-center py-4 px-2">
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}
