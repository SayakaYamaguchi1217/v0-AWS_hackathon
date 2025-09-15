import { type NextRequest, NextResponse } from "next/server"
import { z } from "zod"

const loginSchema = z.object({
  email: z.string().email("有効なメールアドレスを入力してください"),
  password: z.string().min(6, "パスワードは6文字以上である必要があります"),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password } = loginSchema.parse(body)

    // TODO: 実際の認証ロジックを実装
    // データベースでユーザーを検索し、パスワードを検証

    // モックレスポンス
    if (email === "demo@example.com" && password === "password") {
      const token = "mock-jwt-token"

      return NextResponse.json({
        success: true,
        user: {
          id: "1",
          email,
          name: "デモユーザー",
          riskTolerance: "medium",
        },
        token,
      })
    }

    return NextResponse.json({ success: false, error: "認証に失敗しました" }, { status: 401 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ success: false, error: error.errors[0].message }, { status: 400 })
    }

    return NextResponse.json({ success: false, error: "サーバーエラーが発生しました" }, { status: 500 })
  }
}
