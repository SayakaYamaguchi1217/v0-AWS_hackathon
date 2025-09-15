"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { useState } from "react"

const performanceData = {
  "1M": [
    { date: "2024-01-01", portfolio: 11800000, benchmark: 11800000 },
    { date: "2024-01-08", portfolio: 11950000, benchmark: 11850000 },
    { date: "2024-01-15", portfolio: 12100000, benchmark: 11900000 },
    { date: "2024-01-22", portfolio: 12200000, benchmark: 11950000 },
    { date: "2024-01-29", portfolio: 12500000, benchmark: 12000000 },
  ],
  "3M": [
    { date: "2023-11-01", portfolio: 11500000, benchmark: 11500000 },
    { date: "2023-11-15", portfolio: 11600000, benchmark: 11550000 },
    { date: "2023-12-01", portfolio: 11750000, benchmark: 11700000 },
    { date: "2023-12-15", portfolio: 11800000, benchmark: 11750000 },
    { date: "2024-01-01", portfolio: 11800000, benchmark: 11800000 },
    { date: "2024-01-29", portfolio: 12500000, benchmark: 12000000 },
  ],
  "1Y": [
    { date: "2023-02-01", portfolio: 10000000, benchmark: 10000000 },
    { date: "2023-05-01", portfolio: 10500000, benchmark: 10300000 },
    { date: "2023-08-01", portfolio: 11000000, benchmark: 10800000 },
    { date: "2023-11-01", portfolio: 11500000, benchmark: 11200000 },
    { date: "2024-01-29", portfolio: 12500000, benchmark: 12000000 },
  ],
}

export function PerformanceChart() {
  const [selectedPeriod, setSelectedPeriod] = useState<"1M" | "3M" | "1Y">("1M")

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>パフォーマンス推移</CardTitle>
          <div className="flex gap-2">
            {(["1M", "3M", "1Y"] as const).map((period) => (
              <Button
                key={period}
                variant={selectedPeriod === period ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedPeriod(period)}
              >
                {period}
              </Button>
            ))}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={performanceData[selectedPeriod]}>
              <XAxis
                dataKey="date"
                tickFormatter={(value) =>
                  new Date(value).toLocaleDateString("ja-JP", { month: "short", day: "numeric" })
                }
                axisLine={false}
                tickLine={false}
                className="text-xs"
              />
              <YAxis
                tickFormatter={(value) => `¥${(value / 1000000).toFixed(1)}M`}
                axisLine={false}
                tickLine={false}
                className="text-xs"
              />
              <Tooltip
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-background border rounded-lg p-3 shadow-lg">
                        <p className="text-sm font-medium">{new Date(label).toLocaleDateString("ja-JP")}</p>
                        {payload.map((entry, index) => (
                          <p key={index} className="text-sm" style={{ color: entry.color }}>
                            {entry.dataKey === "portfolio" ? "ポートフォリオ" : "ベンチマーク"}: ¥
                            {entry.value?.toLocaleString()}
                          </p>
                        ))}
                      </div>
                    )
                  }
                  return null
                }}
              />
              <Line
                type="monotone"
                dataKey="portfolio"
                stroke="hsl(var(--primary))"
                strokeWidth={2}
                dot={false}
                name="ポートフォリオ"
              />
              <Line
                type="monotone"
                dataKey="benchmark"
                stroke="hsl(var(--muted-foreground))"
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={false}
                name="ベンチマーク"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="flex items-center justify-center gap-6 mt-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-0.5 bg-primary" />
            <span className="text-sm">ポートフォリオ</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-0.5 bg-muted-foreground border-dashed border-t" />
            <span className="text-sm">ベンチマーク</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
