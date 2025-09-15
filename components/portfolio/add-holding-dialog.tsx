"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface AddHoldingDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function AddHoldingDialog({ open, onOpenChange }: AddHoldingDialogProps) {
  const [formData, setFormData] = useState({
    symbol: "",
    shares: "",
    price: "",
    date: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: 実際の追加処理を実装
    console.log("Adding holding:", formData)
    onOpenChange(false)
    setFormData({ symbol: "", shares: "", price: "", date: "" })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>銘柄を追加</DialogTitle>
          <DialogDescription>新しい保有銘柄を追加します。</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="symbol">銘柄コード</Label>
              <Input
                id="symbol"
                placeholder="例: 7203, AAPL"
                value={formData.symbol}
                onChange={(e) => setFormData({ ...formData, symbol: e.target.value })}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="shares">株数</Label>
              <Input
                id="shares"
                type="number"
                placeholder="100"
                value={formData.shares}
                onChange={(e) => setFormData({ ...formData, shares: e.target.value })}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="price">取得価格</Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                placeholder="2650.00"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="date">取得日</Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                required
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              キャンセル
            </Button>
            <Button type="submit">追加</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
