"use client"

import { useState, useEffect, useRef } from "react"
import { ChatMessage } from "@/components/chat-message"
import { ChatInput } from "@/components/chat-input"
import { ThemeToggle } from "@/components/theme-toggle"
import { LanguageToggle } from "@/components/language-toggle"
import { translations } from "@/lib/translations"
import { portfolioData } from "@/lib/portfolio-data"
import { Sparkles, Briefcase, GraduationCap, Code, FolderOpen, Contact, BookText } from "lucide-react"

export default function Home() {
  const [messages, setMessages] = useState<Array<{ role: "user" | "assistant"; content: string; timestamp: Date }>>([])
  const [language, setLanguage] = useState<"en" | "fr">("en")
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

  const generateResponse = (query: string, lang: "en" | "fr"): string => {
    const data = portfolioData[lang]
    if (
      query.includes("experience") ||
      query.includes("work") ||
      query.includes("expérience") ||
      query.includes("travail")
    ) {
      return data.experience
    } else if (
      query.includes("education") ||
      query.includes("study") ||
      query.includes("éducation") ||
      query.toLocaleLowerCase().includes("quelle formation") ||
      query.includes("études")
    ) {
      return data.education
    } else if (query.includes("skill") || query.includes("tech") || query.includes("compétence")) {
      return data.skills
    } else if (query.includes("project") || query.includes("portfolio") || query.includes("projet")) {
      return data.projects
    } else if (
      query.includes("about") ||
      query.includes("who") ||
      query.includes("à propos") || 
      query.includes("parler un peu de vous") ||
      query.includes("qui")
    ) {
      return data.about
    } else if (query.includes("contact") || query.includes("reach") || query.includes("email")) {
      return data.contact
    } else {
      return translations[lang].defaultResponse
    }
  }

  const handleSectionClick = (section: string) => {
    const sectionQueries: Record<string, string> = {
      experience:
        language === "en" ? "Tell me about your work experience" : "Pouvez-vous me parler de votre expérience professionnelle",
      skills: language === "en" ? "What are your skills?" : "Quelles sont tes compétences techniques?",
      education: language === "en" ? "Tell me about your education" : "Quelle formation avez-vous suivie ?",
      projects: language === "en" ? "Show me your projects" : "Est-ce que tu pourrais me montrer quelques-uns de tes projets ?",
      contact: language === "en" ? "I want to contact you" : "Je souhaiterais vous contacter",
      summary: language === "en" ? "Tell me about yourself" : "Pourriez-vous me parler un peu de vous ?",
    }
    handleSendMessage(sectionQueries[section])
  }

  return (
    <div className="flex flex-col h-screen relative">
      <div className="apple-gradient fixed inset-0 -z-10" />

      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 max-w-4xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-primary-foreground" />
            </div> */}
            <div>
              <h1 className="text-lg font-semibold text-foreground">{t.title}</h1>
              <p className="text-sm text-muted-foreground">{t.subtitle}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
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
            <button
              onClick={() => handleSectionClick("summary")}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/10 hover:bg-primary/20 text-primary transition-colors"
            >
              <BookText className="w-4 h-4" />
              <span className="text-sm font-medium">{language === "en" ? "Summary" : "Résumé"}</span>
            </button>
            <button
              onClick={() => handleSectionClick("education")}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/10 hover:bg-primary/20 text-primary transition-colors"
            >
              <GraduationCap className="w-4 h-4" />
              <span className="text-sm font-medium">{language === "en" ? "Education" : "Éducation"}</span>
            </button>
            <button
              onClick={() => handleSectionClick("experience")}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/10 hover:bg-primary/20 text-primary transition-colors"
            >
              <Briefcase className="w-4 h-4" />
              <span className="text-sm font-medium">{language === "en" ? "Experience" : "Expérience"}</span>
            </button>
            <button
              onClick={() => handleSectionClick("skills")}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/10 hover:bg-primary/20 text-primary transition-colors"
            >
              <Code className="w-4 h-4" />
              <span className="text-sm font-medium">{language === "en" ? "Skills" : "Compétences"}</span>
            </button>
            <button
              onClick={() => handleSectionClick("projects")}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/10 hover:bg-primary/20 text-primary transition-colors"
            >
              <FolderOpen className="w-4 h-4" />
              <span className="text-sm font-medium">{language === "en" ? "Projects" : "Projets"}</span>
            </button>
            <button
              onClick={() => handleSectionClick("contact")}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/10 hover:bg-primary/20 text-primary transition-colors"
            >
              <Contact className="w-4 h-4" />
              <span className="text-sm font-medium">{language === "en" ? "Contact" : "Contact"}</span>
            </button>
          </div>

          <ChatInput onSendMessage={handleSendMessage} placeholder={t.inputPlaceholder} />
        </div>
      </div>
    </div>
  )
}
