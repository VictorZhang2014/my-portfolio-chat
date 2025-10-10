"use client"

import type React from "react"

import { useState } from "react"
import { Send } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ChatInputProps {
  onSendMessage: (message: string) => void
  placeholder: string
}

export function ChatInput({ onSendMessage, placeholder }: ChatInputProps) {
  const [input, setInput] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (input.trim()) {
      onSendMessage(input.trim())
      setInput("")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder={placeholder}
        className="flex-1 px-4 py-3 rounded-xl bg-secondary text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
      />
      <Button type="submit" size="icon" className="w-12 h-12 rounded-xl" disabled={!input.trim()}>
        <Send className="w-5 h-5" />
      </Button>
    </form>
  )
}
