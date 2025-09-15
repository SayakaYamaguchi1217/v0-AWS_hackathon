"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis } from "recharts"

interface Holding {
  sector: string
  marketValue: number
}

interface AssetAllocationProps {
  holdings: Holding[]
}

export function AssetAllocation({ holdings }: AssetAllocationProps) {
  // セクター別集計
  const sectorData = holdings.reduce(
    (acc, holding) => {
      const existing = acc.find((item) => item.sector === holding.sector)
      if (existing) {
        existing.value += holding.marketValue
      } else {
        acc.push({ sector: holding.sector, value: holding.marketValue })
      }
      return acc
    },
    [] as { sector: string; value: number }[],
  )

  const colors = [
    "hsl(var(--chart-1))",
    "hsl(var(--chart-2))",
    "hsl(var(--chart-3))",
    "hsl(var(--chart-4))",
    "hsl(var(--chart-5))",
  ]

  const pieData = sectorData.map((item, index) => ({
    ...item,
    color: colors[index % colors.length],
  }))

  const totalValue = sectorData.reduce((sum, item) => sum + item.value, 0)

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>セクター別配分</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload
                      return (
                        <div className="bg-background border rounded-lg p-3 shadow-lg">
                          <p className="text-sm font-medium">{data.sector}</p>
                          <p className="text-sm">¥{data.value.toLocaleString()}</p>
                          <p className="text-xs text-muted-foreground">
                            {((data.value / totalValue) * 100).toFixed(1)}%
                          </p>
                        </div>
                      )
                    }
                    return null
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-4">
            {pieData.map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="text-sm">{item.sector}</span>
                <span className="text-xs text-muted-foreground ml-auto">
                  {((item.value / totalValue) * 100).toFixed(1)}%
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>セクター別評価額</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={sectorData} layout="horizontal">
                <XAxis
                  type="number"
                  tickFormatter={(value) => `¥${(value / 1000000).toFixed(1)}M`}
                  className="text-xs"
                />
                <YAxis type="category" dataKey="sector" className="text-xs" />
                <Tooltip
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-background border rounded-lg p-3 shadow-lg">
                          <p className="text-sm font-medium">{label}</p>
                          <p className="text-sm">¥{payload[0].value?.toLocaleString()}</p>
                        </div>
                      )
                    }
                    return null
                  }}
                />
                <Bar dataKey="value" fill="hsl(var(--primary))" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
