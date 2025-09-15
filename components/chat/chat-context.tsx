"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, PieChart, AlertTriangle } from "lucide-react"

export function ChatContext() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm">コンテキスト情報</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <PieChart className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium">ポートフォリオ</span>
          </div>
          <div className="text-xs text-muted-foreground space-y-1">
            <div>総資産: ¥12,500,000</div>
            <div>リスク許容度: 中リスク</div>
            <div>投資期間: 長期（5年以上）</div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium">市場状況</span>
          </div>
          <div className="space-y-1">
            <Badge variant="secondary" className="text-xs">
              日経平均 +2.3%
            </Badge>
            <Badge variant="destructive" className="text-xs">
              S&P500 -0.8%
            </Badge>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-orange-500" />
            <span className="text-sm font-medium">注意事項</span>
          </div>
          <div className="text-xs text-muted-foreground">
            <div>• 米国金利動向に注意</div>
            <div>• 円安進行の影響</div>
            <div>• 決算シーズン到来</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
