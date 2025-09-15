import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const symbols = searchParams.get("symbols")?.split(",") || []

  try {
    // TODO: 実際の市場データAPIを統合
    // Yahoo Finance, Alpha Vantage等からデータを取得

    // モックデータ
    const mockData = symbols.map((symbol) => {
      const basePrice = Math.random() * 5000 + 1000
      const change = (Math.random() - 0.5) * 200
      const changePercent = (change / basePrice) * 100

      return {
        symbol: symbol.trim(),
        price: Math.round(basePrice),
        change: Math.round(change),
        changePercent: Math.round(changePercent * 100) / 100,
        volume: Math.floor(Math.random() * 1000000),
        timestamp: new Date().toISOString(),
      }
    })

    return NextResponse.json({
      success: true,
      data: mockData,
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: "市場データの取得に失敗しました" }, { status: 500 })
  }
}
