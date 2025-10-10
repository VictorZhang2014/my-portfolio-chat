"use client"

import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

interface LanguageToggleProps {
  language: "en" | "fr"
  onLanguageChange: (lang: "en" | "fr") => void
}

export function LanguageToggle({ language, onLanguageChange }: LanguageToggleProps) {
  const languages = [
    { code: "en" as const, label: "English", flag: "🇬🇧" },
    { code: "fr" as const, label: "Français", flag: "🇫🇷" },
  ] 

  const getLangLabel = () => {
    if (language == "en") {
      return `${languages[1].flag} ${languages[1].label}`;
    }
    return `${languages[0].flag} ${languages[0].label}`;
  }

  const changeLanguage = (lang: "en" | "fr") => {
    onLanguageChange(lang)
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="sm" className="rounded-lg gap-2"
        onClick={() => changeLanguage(language === "en" ? "fr" : "en")}>
          {/* <Languages className="w-4 h-4" /> */}
          <span className="text-sm font-medium">{getLangLabel()}</span>
        </Button>
      </PopoverTrigger> 
    </Popover>
  )
}
