import { supabase, isSupabaseConfigured } from '../lib/supabase'
import { SiteContent, defaultContent } from '../types/content'

const getContentKey = (language: string) => `site_content_${language}`
const getLocalStorageKey = (language: string) => `inteca_site_content_${language}`

// Fallback на localStorage если Supabase не настроен
export const contentService = {
  // Получить контент для конкретного языка
  async getContent(language: string = 'ru'): Promise<SiteContent> {
    const contentKey = getContentKey(language)
    const localStorageKey = getLocalStorageKey(language)

    if (!isSupabaseConfigured) {
      // Fallback на localStorage
      const stored = localStorage.getItem(localStorageKey)
      return stored ? JSON.parse(stored) : defaultContent
    }

    try {
      const { data, error } = await supabase!
        .from('site_content')
        .select('data')
        .eq('key', contentKey)
        .single()

      if (error) {
        console.error('Error fetching content:', error)
        // Если ошибка "не найдено" (PGRST116) - удаляем кэш и возвращаем defaultContent
        if (error.code === 'PGRST116' || error.message?.includes('No rows')) {
          localStorage.removeItem(localStorageKey)
          return defaultContent
        }
        // Для других ошибок - fallback на localStorage
        const stored = localStorage.getItem(localStorageKey)
        return stored ? JSON.parse(stored) : defaultContent
      }

      // Если данные есть - кэшируем в localStorage на случай offline
      if (data && data.data) {
        localStorage.setItem(localStorageKey, JSON.stringify(data.data))
        return data.data as SiteContent
      }

      // Если данных нет - удаляем кэш и возвращаем defaultContent
      localStorage.removeItem(localStorageKey)
      return defaultContent
    } catch (error) {
      console.error('Unexpected error:', error)
      // При неожиданной ошибке - fallback на localStorage
      const stored = localStorage.getItem(localStorageKey)
      return stored ? JSON.parse(stored) : defaultContent
    }
  },

  // Обновить контент для конкретного языка
  async updateContent(content: Partial<SiteContent>, language: string = 'ru'): Promise<void> {
    const contentKey = getContentKey(language)
    const localStorageKey = getLocalStorageKey(language)

    if (!isSupabaseConfigured) {
      // Fallback на localStorage
      const current = JSON.parse(localStorage.getItem(localStorageKey) || JSON.stringify(defaultContent))
      const updated = { ...current, ...content }
      localStorage.setItem(localStorageKey, JSON.stringify(updated))
      return
    }

    try {
      // Сначала получаем текущий контент
      const currentContent = await this.getContent(language)
      const updatedContent = { ...currentContent, ...content }

      const { error } = await supabase!
        .from('site_content')
        .upsert({
          key: contentKey,
          data: updatedContent,
        })

      if (error) throw error

      // Обновляем localStorage кэш
      localStorage.setItem(localStorageKey, JSON.stringify(updatedContent))
    } catch (error) {
      console.error('Error updating content:', error)
      throw error
    }
  },

  // Сбросить контент к дефолтному для конкретного языка
  async resetContent(language: string = 'ru'): Promise<void> {
    const contentKey = getContentKey(language)
    const localStorageKey = getLocalStorageKey(language)

    if (!isSupabaseConfigured) {
      localStorage.setItem(localStorageKey, JSON.stringify(defaultContent))
      return
    }

    try {
      const { error } = await supabase!
        .from('site_content')
        .upsert({
          key: contentKey,
          data: defaultContent,
        })

      if (error) throw error

      localStorage.setItem(localStorageKey, JSON.stringify(defaultContent))
    } catch (error) {
      console.error('Error resetting content:', error)
      throw error
    }
  },
}

