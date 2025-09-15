"use client"

import { Bot, User } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { ChatSuggestions } from "./chat-suggestions"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
  suggestions?: string[]
}

interface ChatMessageProps {
  message: Message
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === "user"

  return (
    <div className={`flex items-start gap-3 ${isUser ? "flex-row-reverse" : ""}`}>
      <div className={`rounded-full p-2 ${isUser ? "bg-secondary" : "bg-primary"}`}>
        {isUser ? (
          <User className="h-4 w-4 text-secondary-foreground" />
        ) : (
          <Bot className="h-4 w-4 text-primary-foreground" />
        )}
      </div>
      <div className={`flex flex-col gap-2 max-w-[80%] ${isUser ? "items-end" : "items-start"}`}>
        <div className={`rounded-lg p-3 ${isUser ? "bg-secondary text-secondary-foreground" : "bg-muted"}`}>
          <div className="whitespace-pre-wrap text-sm leading-relaxed">{message.content}</div>
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span>{message.timestamp.toLocaleTimeString("ja-JP", { hour: "2-digit", minute: "2-digit" })}</span>
          {!isUser && (
            <Badge variant="outline" className="text-xs">
              AI
            </Badge>
          )}
        </div>
        {message.suggestions && message.suggestions.length > 0 && <ChatSuggestions suggestions={message.suggestions} />}
      </div>
    </div>
  )
}
