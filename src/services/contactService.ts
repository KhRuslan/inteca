import { supabase, isSupabaseConfigured } from '../lib/supabase'

export interface ContactSubmission {
  id?: string
  name: string
  email: string
  phone?: string
  message: string
  created_at?: string
  updated_at?: string
  status?: 'new' | 'read' | 'replied' | 'archived'
}

export const contactService = {
  // Отправить заявку
  async submitContact(data: Omit<ContactSubmission, 'id' | 'created_at' | 'updated_at' | 'status'>): Promise<ContactSubmission> {
    if (!isSupabaseConfigured) {
      // Fallback: сохраняем в localStorage для тестирования
      const submission: ContactSubmission = {
        ...data,
        id: `local_${Date.now()}`,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        status: 'new'
      }
      const existing = JSON.parse(localStorage.getItem('contact_submissions') || '[]')
      existing.push(submission)
      localStorage.setItem('contact_submissions', JSON.stringify(existing))
      return submission
    }

    try {
      const { data: submission, error } = await supabase!
        .from('contact_submissions')
        .insert([{
          name: data.name,
          email: data.email,
          phone: data.phone || null,
          message: data.message,
          status: 'new'
        }])
        .select()
        .single()

      if (error) throw error
      return submission as ContactSubmission
    } catch (error) {
      console.error('Error submitting contact:', error)
      throw error
    }
  },

  // Получить все заявки
  async getAllSubmissions(): Promise<ContactSubmission[]> {
    if (!isSupabaseConfigured) {
      // Fallback: получаем из localStorage
      return JSON.parse(localStorage.getItem('contact_submissions') || '[]')
    }

    try {
      const { data, error } = await supabase!
        .from('contact_submissions')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      return data as ContactSubmission[]
    } catch (error) {
      console.error('Error fetching submissions:', error)
      return []
    }
  },

  // Обновить статус заявки
  async updateStatus(id: string, status: ContactSubmission['status']): Promise<void> {
    if (!isSupabaseConfigured) {
      // Fallback: обновляем в localStorage
      const submissions = JSON.parse(localStorage.getItem('contact_submissions') || '[]')
      const index = submissions.findIndex((s: ContactSubmission) => s.id === id)
      if (index !== -1) {
        submissions[index].status = status
        submissions[index].updated_at = new Date().toISOString()
        localStorage.setItem('contact_submissions', JSON.stringify(submissions))
      }
      return
    }

    try {
      const { error } = await supabase!
        .from('contact_submissions')
        .update({ status, updated_at: new Date().toISOString() })
        .eq('id', id)

      if (error) throw error
    } catch (error) {
      console.error('Error updating submission status:', error)
      throw error
    }
  },

  // Удалить заявку
  async deleteSubmission(id: string): Promise<void> {
    if (!isSupabaseConfigured) {
      // Fallback: удаляем из localStorage
      const submissions = JSON.parse(localStorage.getItem('contact_submissions') || '[]')
      const filtered = submissions.filter((s: ContactSubmission) => s.id !== id)
      localStorage.setItem('contact_submissions', JSON.stringify(filtered))
      return
    }

    try {
      const { error } = await supabase!
        .from('contact_submissions')
        .delete()
        .eq('id', id)

      if (error) throw error
    } catch (error) {
      console.error('Error deleting submission:', error)
      throw error
    }
  }
}

