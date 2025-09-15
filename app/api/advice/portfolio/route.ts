import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { userId, horizon, constraints, considerations } = body

    // TODO: CoreAgentとの統合
    // TODO: ユーザーのリスク許容度とポートフォリオを考慮
    // TODO: 市場データとニュースを分析

    // モック提案結果
    const mockProposal = {
      proposal: [
        { assetClass: "日本株", weight: 0.45, currentWeight: 0.52 },
        { assetClass: "米国株", weight: 0.25, currentWeight: 0.24 },
        { assetClass: "欧州株", weight: 0.1, currentWeight: 0.0 },
        { assetClass: "債券", weight: 0.15, currentWeight: 0.08 },
        { assetClass: "現金", weight: 0.05, currentWeight: 0.16 },
      ],

      rationale: `現在の市場環境と${horizon === "mid" ? "中期" : "長期"}投資戦略を考慮した最適化提案です。

**主な調整点:**
1. **地域分散の強化**: 欧州株式への新規投資（10%）
2. **日本株比率の調整**: 52% → 45%に削減
3. **債券比率の増加**: リスク分散のため15%に引き上げ
4. **現金比率の最適化**: 16% → 5%に調整

**期待効果:**
- リスク分散によるボラティリティ低減
- 地域分散による安定性向上
- 金利上昇局面での債券ヘッジ効果`,

      stressTest: {
        "株式市場-10%": -6.5,
        "金利+1%": -2.3,
        "円高10%": -3.8,
      },

      recommendations: [
        {
          action: "売却",
          symbol: "一部日本株",
          amount: "¥875,000",
          reason: "比率調整のため",
        },
        {
          action: "購入",
          symbol: "欧州株ETF",
          amount: "¥1,250,000",
          reason: "地域分散強化",
        },
        {
          action: "購入",
          symbol: "日本国債ETF",
          amount: "¥875,000",
          reason: "リスクヘッジ",
        },
      ],

      generatedAt: new Date().toISOString(),
    }

    return NextResponse.json({
      success: true,
      data: mockProposal,
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: "ポートフォリオ提案の生成に失敗しました" }, { status: 500 })
  }
}
