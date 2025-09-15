import { type NextRequest, NextResponse } from "next/server"
import { z } from "zod"

const signupSchema = z.object({
  email: z.string().email("有効なメールアドレスを入力してください"),
  password: z.string().min(6, "パスワードは6文字以上である必要があります"),
  riskTolerance: z.enum(["low", "medium", "high"], {
    required_error: "リスク許容度を選択してください",
  }),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password, riskTolerance } = signupSchema.parse(body)

    // TODO: 実際のユーザー作成ロジックを実装
    // データベースにユーザーを作成し、パスワードをハッシュ化

    // モックレスポンス
    const userId = Date.now().toString()
    const token = "mock-jwt-token"

    return NextResponse.json({
      success: true,
      user: {
        id: userId,
        email,
        name: "新規ユーザー",
        riskTolerance,
      },
      token,
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ success: false, error: error.errors[0].message }, { status: 400 })
    }

    return NextResponse.json({ success: false, error: "サーバーエラーが発生しました" }, { status: 500 })
  }
}
