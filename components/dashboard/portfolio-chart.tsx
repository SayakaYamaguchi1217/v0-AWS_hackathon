"use client"

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts"

const data = [
  { name: "日本株", value: 6550000, color: "hsl(var(--chart-1))" },
  { name: "米国株", value: 3000000, color: "hsl(var(--chart-2))" },
  { name: "ETF", value: 2000000, color: "hsl(var(--chart-3))" },
  { name: "現金", value: 950000, color: "hsl(var(--chart-4))" },
]

export function PortfolioChart() {
  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie data={data} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={2} dataKey="value">
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                const data = payload[0].payload
                return (
                  <div className="bg-background border rounded-lg p-3 shadow-lg">
                    <p className="text-sm font-medium">{data.name}</p>
                    <p className="text-sm">¥{data.value.toLocaleString()}</p>
                    <p className="text-xs text-muted-foreground">{((data.value / 12500000) * 100).toFixed(1)}%</p>
                  </div>
                )
              }
              return null
            }}
          />
        </PieChart>
      </ResponsiveContainer>
      <div className="grid grid-cols-2 gap-4 mt-4">
        {data.map((item, index) => (
          <div key={index} className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
            <span className="text-sm">{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
