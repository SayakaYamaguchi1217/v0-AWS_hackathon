"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  ArrowLeft,
  Settings,
  User,
  Bell,
  Shield,
  Palette,
  Database,
  Key,
  Trash2,
  Save,
  AlertTriangle,
  CheckCircle,
  ExternalLink,
} from "lucide-react"

export default function SettingsPage() {
  const [profile, setProfile] = useState({
    name: "田中太郎",
    email: "tanaka@example.com",
    riskTolerance: "medium",
    investmentHorizon: "long",
    monthlyInvestment: "100000",
  })

  const [notifications, setNotifications] = useState({
    priceAlerts: true,
    portfolioUpdates: true,
    marketNews: false,
    weeklyReports: true,
    emailNotifications: true,
    pushNotifications: false,
  })

  const [preferences, setPreferences] = useState({
    theme: "light",
    language: "ja",
    currency: "JPY",
    timezone: "Asia/Tokyo",
  })

  const [apiConnections, setApiConnections] = useState({
    yahooFinance: { connected: true, status: "active" },
    alphaVantage: { connected: false, status: "inactive" },
    bloomberg: { connected: false, status: "inactive" },
  })

  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved" | "error">("idle")

  const handleSave = async () => {
    setSaveStatus("saving")
    try {
      // TODO: 実際の保存処理を実装
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setSaveStatus("saved")
      setTimeout(() => setSaveStatus("idle"), 2000)
    } catch (error) {
      setSaveStatus("error")
      setTimeout(() => setSaveStatus("idle"), 2000)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* ヘッダー */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/dashboard">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <div className="flex items-center space-x-2">
              <div className="bg-primary rounded-full p-2">
                <Settings className="h-5 w-5 text-primary-foreground" />
              </div>
              <h1 className="text-xl font-serif font-bold">設定</h1>
            </div>
          </div>
          <Button onClick={handleSave} disabled={saveStatus === "saving"}>
            {saveStatus === "saving" ? (
              <>保存中...</>
            ) : saveStatus === "saved" ? (
              <>
                <CheckCircle className="h-4 w-4 mr-2" />
                保存済み
              </>
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" />
                保存
              </>
            )}
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="profile">プロファイル</TabsTrigger>
            <TabsTrigger value="notifications">通知</TabsTrigger>
            <TabsTrigger value="preferences">表示設定</TabsTrigger>
            <TabsTrigger value="integrations">API連携</TabsTrigger>
            <TabsTrigger value="security">セキュリティ</TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  基本情報
                </CardTitle>
                <CardDescription>アカウントの基本情報を管理します</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">氏名</Label>
                    <Input
                      id="name"
                      value={profile.name}
                      onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">メールアドレス</Label>
                    <Input
                      id="email"
                      type="email"
                      value={profile.email}
                      onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>投資プロファイル</CardTitle>
                <CardDescription>投資スタイルとリスク許容度を設定します</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="riskTolerance">リスク許容度</Label>
                    <Select
                      value={profile.riskTolerance}
                      onValueChange={(value) => setProfile({ ...profile, riskTolerance: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">低リスク（安定重視）</SelectItem>
                        <SelectItem value="medium">中リスク（バランス重視）</SelectItem>
                        <SelectItem value="high">高リスク（成長重視）</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="investmentHorizon">投資期間</Label>
                    <Select
                      value={profile.investmentHorizon}
                      onValueChange={(value) => setProfile({ ...profile, investmentHorizon: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="short">短期（1年未満）</SelectItem>
                        <SelectItem value="medium">中期（1-5年）</SelectItem>
                        <SelectItem value="long">長期（5年以上）</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="monthlyInvestment">月間投資予算（円）</Label>
                  <Input
                    id="monthlyInvestment"
                    type="number"
                    value={profile.monthlyInvestment}
                    onChange={(e) => setProfile({ ...profile, monthlyInvestment: e.target.value })}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  通知設定
                </CardTitle>
                <CardDescription>受け取りたい通知の種類を選択してください</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>価格アラート</Label>
                      <p className="text-sm text-muted-foreground">保有銘柄の価格変動通知</p>
                    </div>
                    <Switch
                      checked={notifications.priceAlerts}
                      onCheckedChange={(checked) => setNotifications({ ...notifications, priceAlerts: checked })}
                    />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>ポートフォリオ更新</Label>
                      <p className="text-sm text-muted-foreground">ポートフォリオの変動通知</p>
                    </div>
                    <Switch
                      checked={notifications.portfolioUpdates}
                      onCheckedChange={(checked) => setNotifications({ ...notifications, portfolioUpdates: checked })}
                    />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>市場ニュース</Label>
                      <p className="text-sm text-muted-foreground">重要な市場ニュースの通知</p>
                    </div>
                    <Switch
                      checked={notifications.marketNews}
                      onCheckedChange={(checked) => setNotifications({ ...notifications, marketNews: checked })}
                    />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>週次レポート</Label>
                      <p className="text-sm text-muted-foreground">週次パフォーマンスレポート</p>
                    </div>
                    <Switch
                      checked={notifications.weeklyReports}
                      onCheckedChange={(checked) => setNotifications({ ...notifications, weeklyReports: checked })}
                    />
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h4 className="text-sm font-medium">配信方法</h4>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>メール通知</Label>
                      <p className="text-sm text-muted-foreground">メールでの通知受信</p>
                    </div>
                    <Switch
                      checked={notifications.emailNotifications}
                      onCheckedChange={(checked) => setNotifications({ ...notifications, emailNotifications: checked })}
                    />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>プッシュ通知</Label>
                      <p className="text-sm text-muted-foreground">ブラウザプッシュ通知</p>
                    </div>
                    <Switch
                      checked={notifications.pushNotifications}
                      onCheckedChange={(checked) => setNotifications({ ...notifications, pushNotifications: checked })}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="preferences" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Palette className="h-5 w-5" />
                  表示設定
                </CardTitle>
                <CardDescription>アプリケーションの表示設定をカスタマイズします</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="theme">テーマ</Label>
                    <Select
                      value={preferences.theme}
                      onValueChange={(value) => setPreferences({ ...preferences, theme: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="light">ライト</SelectItem>
                        <SelectItem value="dark">ダーク</SelectItem>
                        <SelectItem value="system">システム設定に従う</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="language">言語</Label>
                    <Select
                      value={preferences.language}
                      onValueChange={(value) => setPreferences({ ...preferences, language: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ja">日本語</SelectItem>
                        <SelectItem value="en">English</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="currency">通貨</Label>
                    <Select
                      value={preferences.currency}
                      onValueChange={(value) => setPreferences({ ...preferences, currency: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="JPY">日本円 (¥)</SelectItem>
                        <SelectItem value="USD">米ドル ($)</SelectItem>
                        <SelectItem value="EUR">ユーロ (€)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="timezone">タイムゾーン</Label>
                    <Select
                      value={preferences.timezone}
                      onValueChange={(value) => setPreferences({ ...preferences, timezone: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Asia/Tokyo">東京 (JST)</SelectItem>
                        <SelectItem value="America/New_York">ニューヨーク (EST)</SelectItem>
                        <SelectItem value="Europe/London">ロンドン (GMT)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="integrations" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="h-5 w-5" />
                  API連携
                </CardTitle>
                <CardDescription>外部データプロバイダーとの連携を管理します</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {Object.entries(apiConnections).map(([key, connection]) => (
                  <div key={key} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="bg-primary/10 rounded-full p-2">
                        <Database className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">
                          {key === "yahooFinance" && "Yahoo Finance"}
                          {key === "alphaVantage" && "Alpha Vantage"}
                          {key === "bloomberg" && "Bloomberg"}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {key === "yahooFinance" && "株価・指数データ"}
                          {key === "alphaVantage" && "時系列データ・テクニカル指標"}
                          {key === "bloomberg" && "ニュース・金利情報"}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={connection.connected ? "default" : "secondary"}>
                        {connection.connected ? "接続済み" : "未接続"}
                      </Badge>
                      <Button variant="outline" size="sm">
                        {connection.connected ? "設定" : "接続"}
                        <ExternalLink className="h-3 w-3 ml-1" />
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  セキュリティ
                </CardTitle>
                <CardDescription>アカウントのセキュリティ設定を管理します</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">パスワード変更</p>
                      <p className="text-sm text-muted-foreground">最終更新: 2024年1月15日</p>
                    </div>
                    <Button variant="outline">
                      <Key className="h-4 w-4 mr-2" />
                      変更
                    </Button>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">二段階認証</p>
                      <p className="text-sm text-muted-foreground">追加のセキュリティ層を有効化</p>
                    </div>
                    <Button variant="outline">設定</Button>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">ログイン履歴</p>
                      <p className="text-sm text-muted-foreground">最近のログイン活動を確認</p>
                    </div>
                    <Button variant="outline">表示</Button>
                  </div>
                </div>

                <Alert>
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription>
                    セキュリティを強化するため、定期的なパスワード変更と二段階認証の有効化を推奨します。
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>

            <Card className="border-destructive">
              <CardHeader>
                <CardTitle className="text-destructive flex items-center gap-2">
                  <Trash2 className="h-5 w-5" />
                  危険な操作
                </CardTitle>
                <CardDescription>これらの操作は元に戻すことができません</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">データのエクスポート</p>
                    <p className="text-sm text-muted-foreground">すべてのデータをダウンロード</p>
                  </div>
                  <Button variant="outline">エクスポート</Button>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-destructive">アカウント削除</p>
                    <p className="text-sm text-muted-foreground">すべてのデータが永久に削除されます</p>
                  </div>
                  <Button variant="destructive">削除</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
