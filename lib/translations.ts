export type Language = "en" | "de" | "fr"
export type SectionKey = "summary" | "education" | "experience" | "skills" | "projects" | "contact"

interface TranslationEntry {
  title: string
  subtitle: string
  greeting: string
  inputPlaceholder: string
  quickPrompts: string[]
  defaultResponse: string
  sectionLabels: Record<SectionKey, string>
  sectionQueries: Record<SectionKey, string>
}

export const translations: Record<Language, TranslationEntry> = {
  en: {
    title: "Mr. Qiang Zhang",
    subtitle: "Ask me anything about my CV here",
    greeting:
      "Hello! 👋 I'm Qiang Zhang. I can tell you about my work experience, education, skills, projects, preferred work, and more. What would you like to know?",
    inputPlaceholder: "Ask me about my experience, skills, projects...",
    quickPrompts: [
      "Tell me about your experience",
      "What are your skills?",
      "Show me your projects",
      "Your education background",
    ],
    defaultResponse:
      "That's an interesting question! You can ask me about my work experience, education, skills, projects, or how to contact me. What would you like to know?",
    sectionLabels: {
      summary: "Summary",
      education: "Education",
      experience: "Experience",
      skills: "Skills",
      projects: "Projects",
      contact: "Contact",
    },
    sectionQueries: {
      summary: "Tell me about yourself",
      education: "Tell me about your education",
      experience: "Tell me about your work experience",
      skills: "What are your skills?",
      projects: "Show me your projects",
      contact: "I want to contact you",
    },
  },
  de: {
    title: "Herr Qiang Zhang",
    subtitle: "Fragen Sie mich alles über mein CV hier",
    greeting:
      "Hallo! 👋 Ich bin Qiang Zhang. Ich kann Ihnen über meine Berufserfahrung, Ausbildung, Fähigkeiten, Projekte, bevorzugte Arbeit und mehr erzählen. Was möchten Sie wissen?",
    inputPlaceholder: "Fragen Sie mich über meine Erfahrung, Fähigkeiten, Projekte...",
    quickPrompts: [
      "Erzählen Sie mir über Ihre Erfahrung",
      "Was sind Ihre Fähigkeiten?",
      "Zeigen Sie mir Ihre Projekte",
      "Ihre Bildungshintergrund",
    ],
    defaultResponse:
      "Das ist eine interessante Frage! Sie können mich nach meiner Berufserfahrung, Ausbildung, meinen Fähigkeiten, meinen Projekten oder meinen Kontaktmöglichkeiten fragen. Was möchten Sie wissen?",
    sectionLabels: {
      summary: "Überblick",
      education: "Ausbildung",
      experience: "Erfahrung",
      skills: "Fähigkeiten",
      projects: "Projekte",
      contact: "Kontakt",
    },
    sectionQueries: {
      summary: "Erzählen Sie mir etwas über sich",
      education: "Erzählen Sie mir von Ihrer Ausbildung",
      experience: "Erzählen Sie mir von Ihrer Berufserfahrung",
      skills: "Was sind Ihre technischen Fähigkeiten?",
      projects: "Zeigen Sie mir Ihre Projekte",
      contact: "Ich möchte Sie kontaktieren",
    },
  },
  fr: {
    title: "M. Qiang (François) Zhang",
    subtitle: "Posez-moi des questions sur mon CV ici",
    greeting:
      "Bonjour ! 👋 Je suis Qiang (François) Zhang. Je peux vous parler de mon expérience professionnelle, de ma formation, de mes compétences, de mes projets, de mon travail préféré et plus encore. Que souhaitez-vous savoir ?",
    inputPlaceholder: "Posez-moi des questions sur mon expérience, compétences, projets...",
    quickPrompts: [
      "Parlez-moi de votre expérience",
      "Quelles sont vos compétences ?",
      "Montrez-moi vos projets",
      "Votre parcours éducatif",
    ],
    defaultResponse:
      "C'est une question intéressante ! Vous pouvez me poser des questions sur mon expérience professionnelle, ma formation, mes compétences, mes projets ou comment me contacter. Que souhaitez-vous savoir ?",
    sectionLabels: {
      summary: "Sommaire",
      education: "Éducation",
      experience: "Expérience",
      skills: "Compétences",
      projects: "Projets",
      contact: "Contact",
    },
    sectionQueries: {
      summary: "Pourriez-vous me parler un peu de vous ?",
      education: "Quelle formation avez-vous suivie ?",
      experience: "Pouvez-vous me parler de votre expérience professionnelle",
      skills: "Quelles sont tes compétences techniques?",
      projects: "Est-ce que tu pourrais me montrer quelques-uns de tes projets ?",
      contact: "Je souhaiterais vous contacter",
    },
  },
}
