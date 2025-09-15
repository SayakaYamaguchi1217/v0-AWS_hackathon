import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    // TODO: 認証ヘッダーからユーザーIDを取得
    // const userId = getUserIdFromToken(request)

    // TODO: データベースからポートフォリオデータを取得

    // モックポートフォリオデータ
    const mockPortfolio = {
      userId: "1",
      totalValue: 12500000,
      totalCost: 11800000,
      totalGain: 700000,
      totalGainPercent: 5.93,
      todayChange: 125000,
      todayChangePercent: 1.02,
      cashBalance: 950000,
      holdings: [
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
      ],
      lastUpdated: new Date().toISOString(),
    }

    return NextResponse.json({
      success: true,
      data: mockPortfolio,
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: "ポートフォリオの取得に失敗しました" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { symbol, shares, price, date } = body

    // TODO: 認証とバリデーション
    // TODO: データベースに新しい保有銘柄を追加

    // モックレスポンス
    const newHolding = {
      id: Date.now().toString(),
      symbol,
      shares: Number.parseInt(shares),
      avgPrice: Number.parseFloat(price),
      purchaseDate: date,
      createdAt: new Date().toISOString(),
    }

    return NextResponse.json({
      success: true,
      data: newHolding,
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: "銘柄の追加に失敗しました" }, { status: 500 })
  }
}
