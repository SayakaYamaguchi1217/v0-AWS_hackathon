import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, MessageSquare, PieChart, Settings, Shield, Zap } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted">
      {/* ヘッダー */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="bg-primary rounded-full p-2">
              <TrendingUp className="h-5 w-5 text-primary-foreground" />
            </div>
            <h1 className="text-xl font-serif font-bold">パーソナル投資アシスタント</h1>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/auth/login">
              <Button variant="ghost">ログイン</Button>
            </Link>
            <Link href="/auth/signup">
              <Button>新規登録</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* メインコンテンツ */}
      <main className="container mx-auto px-4 py-16">
        {/* ヒーローセクション */}
        <section className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-serif font-bold mb-6 text-balance">
            AI投資アシスタントで
            <br />
            <span className="text-primary">賢い投資判断</span>を
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto text-pretty">
            市場データの分析から個別相談まで、あなたの投資をサポートする パーソナルAIアシスタント
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/signup">
              <Button size="lg" className="text-lg px-8">
                無料で始める
              </Button>
            </Link>
            <Link href="/auth/login">
              <Button size="lg" variant="outline" className="text-lg px-8 bg-transparent">
                ログイン
              </Button>
            </Link>
          </div>
        </section>

        {/* 機能紹介 */}
        <section className="mb-16">
          <h3 className="text-3xl font-serif font-bold text-center mb-12">主な機能</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <div className="bg-primary/10 rounded-full p-3 w-fit">
                  <MessageSquare className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>AI投資相談</CardTitle>
                <CardDescription>自然言語でAIに投資相談。短期トレードから長期資産形成まで対応</CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <div className="bg-primary/10 rounded-full p-3 w-fit">
                  <PieChart className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>ポートフォリオ管理</CardTitle>
                <CardDescription>保有資産の可視化と最適化提案。リスク分析も含めた総合管理</CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <div className="bg-primary/10 rounded-full p-3 w-fit">
                  <TrendingUp className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>市場分析</CardTitle>
                <CardDescription>リアルタイム市場データとニュース分析で投資判断をサポート</CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <div className="bg-primary/10 rounded-full p-3 w-fit">
                  <Settings className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>パーソナライズ</CardTitle>
                <CardDescription>あなたのリスク許容度と投資履歴に基づいた個別提案</CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <div className="bg-primary/10 rounded-full p-3 w-fit">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>セキュリティ</CardTitle>
                <CardDescription>金融グレードのセキュリティでデータを保護。安心してご利用いただけます</CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <div className="bg-primary/10 rounded-full p-3 w-fit">
                  <Zap className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>リアルタイム更新</CardTitle>
                <CardDescription>株価や市場情報をリアルタイムで取得。最新情報に基づく判断が可能</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </section>

        {/* CTA セクション */}
        <section className="text-center">
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="text-2xl font-serif">今すぐ始めましょう</CardTitle>
              <CardDescription className="text-lg">
                無料でアカウントを作成して、AI投資アシスタントを体験してください
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/auth/signup">
                <Button size="lg" className="text-lg px-12">
                  無料で始める
                </Button>
              </Link>
            </CardContent>
          </Card>
        </section>
      </main>

      {/* フッター */}
      <footer className="border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 mt-16">
        <div className="container mx-auto px-4 py-8 text-center text-muted-foreground">
          <p>&copy; 2024 パーソナル投資アシスタント. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
