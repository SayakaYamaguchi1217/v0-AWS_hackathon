import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const name = searchParams.get("name") || "^N225"
  const period = searchParams.get("period") || "1d"

  try {
    // TODO: 実際の指数データAPIを統合

    // モックデータ
    const generateTimeSeriesData = (periods: number) => {
      const data = []
      const baseValue = name === "^N225" ? 33000 : 4800
      let currentValue = baseValue

      for (let i = 0; i < periods; i++) {
        const change = (Math.random() - 0.5) * 100
        currentValue += change
        data.push({
          timestamp: new Date(Date.now() - (periods - i) * 60000).toISOString(),
          value: Math.round(currentValue),
          volume: Math.floor(Math.random() * 1000000),
        })
      }
      return data
    }

    const periods = period === "1d" ? 24 : period === "1w" ? 168 : 720
    const data = generateTimeSeriesData(periods)

    return NextResponse.json({
      success: true,
      symbol: name,
      period,
      data,
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: "指数データの取得に失敗しました" }, { status: 500 })
  }
}
