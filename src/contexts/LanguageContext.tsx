import { createContext, useContext, useState, ReactNode } from 'react'
// Removed unused useEffect import

type Language = 'ru' | 'en' | 'kz'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

const STORAGE_KEY = 'inteca_language'

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    // Проверяем localStorage
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored && ['ru', 'en', 'kz'].includes(stored)) {
      return stored as Language
    }
    
    // Определяем по браузеру
    const browserLang = navigator.language.toLowerCase()
    if (browserLang.startsWith('kk') || browserLang.startsWith('kz')) {
      return 'kz'
    }
    if (browserLang.startsWith('en')) {
      return 'en'
    }
    
    // По умолчанию русский
    return 'ru'
  })

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    localStorage.setItem(STORAGE_KEY, lang)
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  )
}

export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider')
  }
  return context
}

// Хелпер для названий языков
export const languageNames: Record<Language, { native: string; english: string }> = {
  ru: { native: 'Русский', english: 'Russian' },
  en: { native: 'English', english: 'English' },
  kz: { native: 'Қазақша', english: 'Kazakh' },
}

