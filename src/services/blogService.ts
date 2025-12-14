import { supabase, isSupabaseConfigured } from '../lib/supabase'
import { BlogPost, defaultBlogPosts } from '../types/blog'

const LOCALSTORAGE_KEY = 'inteca_blog_posts'

// Fallback на localStorage если Supabase не настроен
export const blogService = {
  // Получить все посты для конкретного языка
  async getAllPosts(language: string = 'ru'): Promise<BlogPost[]> {
    if (!isSupabaseConfigured) {
      const stored = localStorage.getItem(LOCALSTORAGE_KEY)
      return stored ? JSON.parse(stored) : defaultBlogPosts
    }

    try {
      const { data, error } = await supabase!
        .from('blog_posts')
        .select('*')
        .eq('published', true)
        .eq('language', language)
        .order('date', { ascending: false })

      if (error) {
        console.error('Error fetching posts:', error)
        const stored = localStorage.getItem(LOCALSTORAGE_KEY)
        return stored ? JSON.parse(stored) : defaultBlogPosts
      }

      // Преобразуем к нужному формату
      const posts = data.map(post => ({
        id: post.id,
        title: post.title,
        excerpt: post.excerpt,
        content: post.content,
        author: post.author,
        date: post.date,
        tags: post.tags,
        image: post.image,
        featured: post.featured,
      }))

      // Кэшируем
      localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(posts))
      
      return posts
    } catch (error) {
      console.error('Unexpected error:', error)
      const stored = localStorage.getItem(LOCALSTORAGE_KEY)
      return stored ? JSON.parse(stored) : defaultBlogPosts
    }
  },

  // Получить один пост
  async getPost(id: string): Promise<BlogPost | null> {
    if (!isSupabaseConfigured) {
      const stored = localStorage.getItem(LOCALSTORAGE_KEY)
      const posts = stored ? JSON.parse(stored) : defaultBlogPosts
      return posts.find((p: BlogPost) => p.id === id) || null
    }

    try {
      const { data, error } = await supabase!
        .from('blog_posts')
        .select('*')
        .eq('id', id)
        .single()

      if (error) throw error

      // Увеличиваем счетчик просмотров
      await supabase!
        .from('blog_posts')
        .update({ views: (data.views || 0) + 1 })
        .eq('id', id)

      return {
        id: data.id,
        title: data.title,
        excerpt: data.excerpt,
        content: data.content,
        author: data.author,
        date: data.date,
        tags: data.tags,
        image: data.image,
        featured: data.featured,
      }
    } catch (error) {
      console.error('Error fetching post:', error)
      return null
    }
  },

  // Создать пост с языком
  async createPost(post: Omit<BlogPost, 'id'>, language: string = 'ru'): Promise<BlogPost> {
    if (!isSupabaseConfigured) {
      const newPost: BlogPost = {
        ...post,
        id: Date.now().toString(),
      }
      const stored = localStorage.getItem(LOCALSTORAGE_KEY)
      const posts = stored ? JSON.parse(stored) : defaultBlogPosts
      const updated = [newPost, ...posts]
      localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(updated))
      return newPost
    }

    try {
      const { data, error } = await supabase!
        .from('blog_posts')
        .insert([{
          title: post.title,
          excerpt: post.excerpt,
          content: post.content,
          author: post.author,
          date: post.date,
          tags: post.tags,
          image: post.image,
          featured: post.featured,
          published: true,
          language: language,
        }])
        .select()
        .single()

      if (error) throw error

      // Инвалидируем кэш
      localStorage.removeItem(LOCALSTORAGE_KEY)

      return {
        id: data.id,
        title: data.title,
        excerpt: data.excerpt,
        content: data.content,
        author: data.author,
        date: data.date,
        tags: data.tags,
        image: data.image,
        featured: data.featured,
      }
    } catch (error) {
      console.error('Error creating post:', error)
      throw error
    }
  },

  // Обновить пост
  async updatePost(id: string, post: Partial<BlogPost>): Promise<void> {
    if (!isSupabaseConfigured) {
      const stored = localStorage.getItem(LOCALSTORAGE_KEY)
      const posts = stored ? JSON.parse(stored) : defaultBlogPosts
      const updated = posts.map((p: BlogPost) => 
        p.id === id ? { ...p, ...post } : p
      )
      localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(updated))
      return
    }

    try {
      const { error } = await supabase!
        .from('blog_posts')
        .update(post)
        .eq('id', id)

      if (error) throw error

      // Инвалидируем кэш
      localStorage.removeItem(LOCALSTORAGE_KEY)
    } catch (error) {
      console.error('Error updating post:', error)
      throw error
    }
  },

  // Удалить пост
  async deletePost(id: string): Promise<void> {
    if (!isSupabaseConfigured) {
      const stored = localStorage.getItem(LOCALSTORAGE_KEY)
      const posts = stored ? JSON.parse(stored) : defaultBlogPosts
      const updated = posts.filter((p: BlogPost) => p.id !== id)
      localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(updated))
      return
    }

    try {
      const { error } = await supabase!
        .from('blog_posts')
        .delete()
        .eq('id', id)

      if (error) throw error

      // Инвалидируем кэш
      localStorage.removeItem(LOCALSTORAGE_KEY)
    } catch (error) {
      console.error('Error deleting post:', error)
      throw error
    }
  },

  // Поиск постов по языку
  async searchPosts(query: string, language: string = 'ru'): Promise<BlogPost[]> {
    if (!isSupabaseConfigured) {
      const posts = await this.getAllPosts(language)
      return posts.filter(post => 
        post.title.toLowerCase().includes(query.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(query.toLowerCase())
      )
    }

    try {
      const { data, error } = await supabase!
        .from('blog_posts')
        .select('*')
        .eq('published', true)
        .eq('language', language)
        .textSearch('search_vector', query)
        .order('date', { ascending: false })

      if (error) throw error

      return data.map(post => ({
        id: post.id,
        title: post.title,
        excerpt: post.excerpt,
        content: post.content,
        author: post.author,
        date: post.date,
        tags: post.tags,
        image: post.image,
        featured: post.featured,
      }))
    } catch (error) {
      console.error('Error searching posts:', error)
      return []
    }
  },
}

