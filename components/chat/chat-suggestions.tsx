"use client"

import { Button } from "@/components/ui/button"

interface ChatSuggestionsProps {
  suggestions: string[]
  onSuggestionClick?: (suggestion: string) => void
}

export function ChatSuggestions({ suggestions, onSuggestionClick }: ChatSuggestionsProps) {
  return (
    <div className="flex flex-wrap gap-2 mt-2">
      {suggestions.map((suggestion, index) => (
        <Button
          key={index}
          variant="outline"
          size="sm"
          className="text-xs h-7 bg-transparent"
          onClick={() => onSuggestionClick?.(suggestion)}
        >
          {suggestion}
        </Button>
      ))}
    </div>
  )
}
