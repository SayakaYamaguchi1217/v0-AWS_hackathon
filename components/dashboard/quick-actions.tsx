"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { MessageSquare, PieChart, Settings, TrendingUp } from "lucide-react"

export function QuickActions() {
  return (
    <div className="flex flex-wrap gap-2">
      <Link href="/chat">
        <Button size="sm" variant="outline">
          <MessageSquare className="h-4 w-4 mr-2" />
          AI相談
        </Button>
      </Link>
      <Link href="/portfolio">
        <Button size="sm" variant="outline">
          <PieChart className="h-4 w-4 mr-2" />
          ポートフォリオ
        </Button>
      </Link>
      <Link href="/analysis">
        <Button size="sm" variant="outline">
          <TrendingUp className="h-4 w-4 mr-2" />
          分析
        </Button>
      </Link>
      <Link href="/settings">
        <Button size="sm" variant="outline">
          <Settings className="h-4 w-4 mr-2" />
          設定
        </Button>
      </Link>
    </div>
  )
}
