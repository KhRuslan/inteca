import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { BlogPost, defaultBlogPosts } from '../types/blog'

interface BlogContextType {
  posts: BlogPost[]
  addPost: (post: Omit<BlogPost, 'id'>) => void
  updatePost: (id: string, post: Partial<BlogPost>) => void
  deletePost: (id: string) => void
  getPost: (id: string) => BlogPost | undefined
}

const BlogContext = createContext<BlogContextType | undefined>(undefined)

const BLOG_STORAGE_KEY = 'inteca_blog_posts'

export const BlogProvider = ({ children }: { children: ReactNode }) => {
  const [posts, setPosts] = useState<BlogPost[]>(() => {
    const stored = localStorage.getItem(BLOG_STORAGE_KEY)
    return stored ? JSON.parse(stored) : defaultBlogPosts
  })

  useEffect(() => {
    localStorage.setItem(BLOG_STORAGE_KEY, JSON.stringify(posts))
  }, [posts])

  const addPost = (post: Omit<BlogPost, 'id'>) => {
    const newPost: BlogPost = {
      ...post,
      id: Date.now().toString()
    }
    setPosts(prev => [newPost, ...prev])
  }

  const updatePost = (id: string, updatedPost: Partial<BlogPost>) => {
    setPosts(prev => prev.map(post => 
      post.id === id ? { ...post, ...updatedPost } : post
    ))
  }

  const deletePost = (id: string) => {
    setPosts(prev => prev.filter(post => post.id !== id))
  }

  const getPost = (id: string) => {
    return posts.find(post => post.id === id)
  }

  return (
    <BlogContext.Provider value={{ posts, addPost, updatePost, deletePost, getPost }}>
      {children}
    </BlogContext.Provider>
  )
}

export const useBlog = () => {
  const context = useContext(BlogContext)
  if (!context) {
    throw new Error('useBlog must be used within BlogProvider')
  }
  return context
}





