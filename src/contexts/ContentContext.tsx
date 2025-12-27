import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { SiteContent, defaultContent } from '../types/content'

interface ContentContextType {
  content: SiteContent
  updateContent: (newContent: Partial<SiteContent>) => void
  resetContent: () => void
}

const ContentContext = createContext<ContentContextType | undefined>(undefined)

const STORAGE_KEY = 'inteca_site_content'

export const ContentProvider = ({ children }: { children: ReactNode }) => {
  const [content, setContent] = useState<SiteContent>(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) : defaultContent
  })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(content))
  }, [content])

  const updateContent = (newContent: Partial<SiteContent>) => {
    setContent(prev => ({
      ...prev,
      ...newContent
    }))
  }

  const resetContent = () => {
    setContent(defaultContent)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultContent))
  }

  return (
    <ContentContext.Provider value={{ content, updateContent, resetContent }}>
      {children}
    </ContentContext.Provider>
  )
}

export const useContent = () => {
  const context = useContext(ContentContext)
  if (!context) {
    throw new Error('useContent must be used within ContentProvider')
  }
  return context
}





