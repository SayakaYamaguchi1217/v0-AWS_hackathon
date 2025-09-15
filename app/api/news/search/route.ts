import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get("q") || ""
  const limit = Number.parseInt(searchParams.get("limit") || "10")

  try {
    // TODO: 実際のニュースAPIを統合
    // Bloomberg, Reuters等からニュースを取得

    // モックニュースデータ
    const mockNews = [
      {
        id: "1",
        title: "日銀、金利政策の見直しを示唆",
        summary: "日本銀行は次回の金融政策決定会合で、現行の金利政策について議論する方針を明らかにした。",
        source: "日経新聞",
        publishedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        url: "https://example.com/news/1",
        relevanceScore: 0.95,
        impact: "high",
      },
      {
        id: "2",
        title: "米国インフレ率、予想を下回る",
        summary: "米労働省が発表した消費者物価指数は前年同月比で予想を下回り、市場に安堵感が広がった。",
        source: "Bloomberg",
        publishedAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
        url: "https://example.com/news/2",
        relevanceScore: 0.88,
        impact: "medium",
      },
      {
        id: "3",
        title: "トヨタ、EV戦略を発表",
        summary: "トヨタ自動車は2030年までの電気自動車戦略を発表し、新たな投資計画を明らかにした。",
        source: "Reuters",
        publishedAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
        url: "https://example.com/news/3",
        relevanceScore: 0.75,
        impact: "low",
      },
    ]

    const filteredNews = query
      ? mockNews.filter(
          (news) =>
            news.title.toLowerCase().includes(query.toLowerCase()) ||
            news.summary.toLowerCase().includes(query.toLowerCase()),
        )
      : mockNews

    return NextResponse.json({
      success: true,
      data: filteredNews.slice(0, limit),
      total: filteredNews.length,
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: "ニュースの取得に失敗しました" }, { status: 500 })
  }
}
