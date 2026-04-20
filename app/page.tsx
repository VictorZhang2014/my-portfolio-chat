"use client"

import { useState, useEffect, useRef } from "react"
import { ChatMessage } from "@/components/chat-message"
import { ChatInput } from "@/components/chat-input"
import { ThemeToggle } from "@/components/theme-toggle"
import { LanguageToggle } from "@/components/language-toggle"
import { translations, type Language, type SectionKey } from "@/lib/translations"
import { portfolioData } from "@/lib/portfolio-data"
import { Sparkles, Briefcase, GraduationCap, Code, FolderOpen, Contact, BookText, type LucideIcon } from "lucide-react"

const sectionButtons: Array<{ key: SectionKey; icon: LucideIcon }> = [
  { key: "summary", icon: BookText },
  { key: "education", icon: GraduationCap },
  { key: "experience", icon: Briefcase },
  { key: "skills", icon: Code },
  { key: "projects", icon: FolderOpen },
  { key: "contact", icon: Contact },
]

export default function Home() {
  const [messages, setMessages] = useState<Array<{ role: "user" | "assistant"; content: string; timestamp: Date }>>([])
  const [language, setLanguage] = useState<Language>("en")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const t = translations[language]

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, isTyping])

  useEffect(() => {
    // Initial greeting message
    const timer = setTimeout(() => {
      setMessages([
        {
          role: "assistant",
          content: t.greeting,
          timestamp: new Date(),
        },
      ])
    }, 500)

    return () => clearTimeout(timer)
  }, [language, t.greeting])

  useEffect(() => {
    fetch("https://ipapi.co/json/")
      .then(res => res.json())
      .then(data => {
        data.country_code === "FR" ? setLanguage("fr") : setLanguage("en"); 
      });
  }, []);

  const handleSendMessage = async (message: string) => {
    const userMessage = { role: "user" as const, content: message, timestamp: new Date() }
    setMessages((prev) => [...prev, userMessage])
    setIsTyping(true)

    // Simulate AI response delay
    await new Promise((resolve) => setTimeout(resolve, 1000 + Math.random() * 1000))

    const response = generateResponse(message.toLowerCase(), language)
    setIsTyping(false)
    setMessages((prev) => [...prev, { role: "assistant", content: response, timestamp: new Date() }])
  }

  const generateResponse = (query: string, lang: Language): string => {
    const data = portfolioData[lang]
    if (
      query.includes("experience") ||
      query.includes("work") ||
      query.includes("erfahrung") ||
      query.includes("berufserfahrung") ||
      query.includes("expérience") ||
      query.includes("travail")
    ) {
      return data.experience
    } else if (
      query.includes("education") ||
      query.includes("study") ||
      query.includes("ausbildung") ||
      query.includes("studium") ||
      query.includes("éducation") ||
      query.toLocaleLowerCase().includes("quelle formation") ||
      query.includes("études")
    ) {
      return data.education
    } else if (
      query.includes("skill") ||
      query.includes("tech") ||
      query.includes("fähigkeit") ||
      query.includes("fähigkeiten") ||
      query.includes("kompetenz") ||
      query.includes("compétence")
    ) {
      return data.skills
    } else if (
      query.includes("project") ||
      query.includes("portfolio") ||
      query.includes("projekt") ||
      query.includes("projet")
    ) {
      return data.projects
    } else if (
      query.includes("about") ||
      query.includes("who") ||
      query.includes("über sich") ||
      query.includes("ueber sich") ||
      query.includes("wer") ||
      query.includes("à propos") || 
      query.includes("parler un peu de vous") ||
      query.includes("qui")
    ) {
      return data.about
    } else if (
      query.includes("contact") ||
      query.includes("reach") ||
      query.includes("email") ||
      query.includes("kontakt") ||
      query.includes("kontaktieren")
    ) {
      return data.contact
    } else {
      return translations[lang].defaultResponse
    }
  }

  const handleSectionClick = (section: SectionKey) => {
    handleSendMessage(t.sectionQueries[section])
  }

  return (
    <div className="flex flex-col h-screen relative">
      <div className="apple-gradient fixed inset-0 -z-10" />

      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-2 sm:py-4 max-w-4xl flex items-center justify-between gap-3">
          <div className="flex min-w-0 flex-1 items-center gap-3">
            {/* <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-primary-foreground" />
            </div> */}
            <div className="min-w-0">
              <h1 className="truncate text-lg font-semibold text-foreground">{t.title}</h1>
              <p className="text-sm text-muted-foreground sm:whitespace-normal whitespace-nowrap overflow-hidden text-ellipsis">{t.subtitle}</p>
            </div>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <LanguageToggle language={language} onLanguageChange={(lang) => setLanguage(lang)} />
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Chat Messages */}
      <main className="flex-1 overflow-y-auto">
        <div className="container mx-auto px-4 py-6 max-w-4xl">
          <div className="space-y-6">
            {messages.map((message, index) => (
              <ChatMessage key={index} role={message.role} content={message.content} timestamp={message.timestamp} />
            ))}
            {isTyping && <ChatMessage role="assistant" content="" timestamp={new Date()} isTyping />}
            <div ref={messagesEndRef} />
          </div>
        </div>
      </main>

      {/* Chat Input */}
      <div className="border-t border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 pt-3 max-w-4xl">
          <div className="mb-3 flex flex-wrap gap-2">
            {sectionButtons.map(({ key, icon: Icon }) => (
              <button
                key={key}
                onClick={() => handleSectionClick(key)}
                className="flex items-center gap-1 rounded-lg bg-primary/10 px-2 py-1 text-xs text-primary transition-colors hover:bg-primary/20 sm:gap-2 sm:px-4 sm:py-2 sm:text-sm"
              >
                <Icon className="h-3 w-3 sm:h-4 sm:w-4" />
                <span className="text-[11px] font-medium sm:text-sm">{t.sectionLabels[key]}</span>
              </button>
            ))}
          </div>

          <ChatInput onSendMessage={handleSendMessage} placeholder={t.inputPlaceholder} />
        </div>
      </div>
    </div>
  )
}
