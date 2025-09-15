"use client"

import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const data = [
  { time: "09:00", nikkei: 33500, sp500: 4920 },
  { time: "10:00", nikkei: 33600, sp500: 4910 },
  { time: "11:00", nikkei: 33550, sp500: 4900 },
  { time: "12:00", nikkei: 33700, sp500: 4890 },
  { time: "13:00", nikkei: 33750, sp500: 4885 },
  { time: "14:00", nikkei: 33800, sp500: 4890 },
  { time: "15:00", nikkei: 33750, sp500: 4890 },
]

export function MarketSummaryChart() {
  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id="nikkei" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
              <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="sp500" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(var(--secondary))" stopOpacity={0.3} />
              <stop offset="95%" stopColor="hsl(var(--secondary))" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="time" axisLine={false} tickLine={false} className="text-xs" />
          <YAxis hide />
          <Tooltip
            content={({ active, payload, label }) => {
              if (active && payload && payload.length) {
                return (
                  <div className="bg-background border rounded-lg p-3 shadow-lg">
                    <p className="text-sm font-medium">{label}</p>
                    {payload.map((entry, index) => (
                      <p key={index} className="text-sm" style={{ color: entry.color }}>
                        {entry.dataKey === "nikkei" ? "日経平均" : "S&P 500"}: {entry.value?.toLocaleString()}
                      </p>
                    ))}
                  </div>
                )
              }
              return null
            }}
          />
          <Area
            type="monotone"
            dataKey="nikkei"
            stroke="hsl(var(--primary))"
            fillOpacity={1}
            fill="url(#nikkei)"
            strokeWidth={2}
          />
          <Area
            type="monotone"
            dataKey="sp500"
            stroke="hsl(var(--secondary))"
            fillOpacity={1}
            fill="url(#sp500)"
            strokeWidth={2}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
