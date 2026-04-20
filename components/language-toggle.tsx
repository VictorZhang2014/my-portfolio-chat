"use client"

import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

interface LanguageToggleProps {
  language: "en" | "de" | "fr"
  onLanguageChange: (lang: "en" | "de" | "fr") => void
}

export function LanguageToggle({ language, onLanguageChange }: LanguageToggleProps) {
  const [open, setOpen] = useState(false)
  const languages = [
    { code: "en" as const, label: "English", flag: "🇬🇧" },
    { code: "de" as const, label: "Deutsch", flag: "🇩🇪" },
    { code: "fr" as const, label: "Français", flag: "🇫🇷" },
  ] 

  const getLangLabel = () => {
    if (language == "en") {
      return `${languages[0].flag} ${languages[0].label}`;
    } else if (language == "de") {
      return `${languages[1].flag} ${languages[1].label}`;
    }
    return `${languages[2].flag} ${languages[2].label}`;
  }

  const changeLanguage = (lang: "en" | "de" | "fr") => {
    setOpen(false)
    onLanguageChange(lang)
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="sm" className="rounded-lg gap-2">
          <span className="text-sm font-medium">{getLangLabel()}</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-48 p-2">
        <div className="space-y-1">
          {languages.map((lang) => (
            <Button
              key={lang.code}
              variant={language === lang.code ? "secondary" : "ghost"}
              size="sm"
              className="w-full justify-start gap-2 h-16"
              onClick={() => changeLanguage(lang.code)}
            >
              <span>{lang.flag}</span>
              <span>{lang.label}</span>
            </Button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  )
}
