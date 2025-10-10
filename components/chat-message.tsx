import DOMPurify from "dompurify";
import { Bot, User } from "lucide-react"
import { cn } from "@/lib/utils"

interface ChatMessageProps {
  role: "user" | "assistant"
  content: string
  timestamp: Date
  isTyping?: boolean
}

export function ChatMessage({ role, content, timestamp, isTyping }: ChatMessageProps) {
  const isUser = role === "user"
  // Sanitize the content to prevent XSS attacks
  const sanitizedContent = DOMPurify.sanitize(content);
  return (
    <div className={cn("flex gap-4 items-start", isUser && "flex-row-reverse")}>
      <div
        className={cn(
          "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0",
          isUser ? "bg-chat-user text-chat-user-foreground" : "bg-chat-assistant text-chat-assistant-foreground",
        )}
      >
        {isUser ? 
        <User className="w-6 h-6" /> : 
        // <Bot className="w-6 h-6" />
        (
          <img
            src="/favicon.png"
            alt="Bot Logo"
            className="w-8 h-8 rounded-full"
          />
        )
        }
      </div>
      <div className={cn("flex-1 space-y-2", isUser && "flex flex-col items-end")}>
        <div
          className={cn(
            "inline-block px-4 py-3 rounded-2xl max-w-[85%]",
            isUser
              ? "bg-chat-user text-chat-user-foreground rounded-tr-sm"
              : "bg-chat-assistant text-chat-assistant-foreground rounded-tl-sm",
          )}
        >
          {isTyping ? (
            <div className="flex gap-1">
              <span className="w-2 h-2 rounded-full bg-current opacity-50 animate-bounce [animation-delay:-0.3s]"></span>
              <span className="w-2 h-2 rounded-full bg-current opacity-50 animate-bounce [animation-delay:-0.15s]"></span>
              <span className="w-2 h-2 rounded-full bg-current opacity-50 animate-bounce"></span>
            </div>
          ) : (
            <p className="text-sm leading-relaxed whitespace-pre-wrap"
              dangerouslySetInnerHTML={{ __html: sanitizedContent }}
            ></p>
          )}
        </div>
        {!isTyping && (
          <span className={cn("text-xs text-muted-foreground px-1", isUser && "text-right")}>
            {timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
          </span>
        )}
      </div>
    </div>
  )
}
