import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { blogService } from '../services/blogService'
import { BlogPost } from '../types/blog'

const getBlogPostsKey = (language: string) => ['blog-posts', language]
const BLOG_POST_KEY = (id: string) => ['blog-post', id]

// Хук для получения всех постов для конкретного языка
export const useBlogPosts = (language: string = 'ru') => {
  return useQuery({
    queryKey: getBlogPostsKey(language),
    queryFn: () => blogService.getAllPosts(language),
    staleTime: 5 * 60 * 1000, // 5 минут
    gcTime: 15 * 60 * 1000, // 15 минут в кэше
  })
}

// Хук для получения одного поста
export const useBlogPost = (id: string) => {
  return useQuery({
    queryKey: BLOG_POST_KEY(id),
    queryFn: () => blogService.getPost(id),
    enabled: !!id, // Не запускаем если нет id
    staleTime: 10 * 60 * 1000, // 10 минут
  })
}

// Хук для создания поста с языком
export const useCreatePost = (language: string = 'ru') => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (post: Omit<BlogPost, 'id'>) => blogService.createPost(post, language),
    onSuccess: () => {
      // Инвалидируем список постов для этого языка
      queryClient.invalidateQueries({ queryKey: getBlogPostsKey(language) })
    },
  })
}

// Хук для обновления поста с языком
export const useUpdatePost = (language: string = 'ru') => {
  const queryClient = useQueryClient()
  const postsKey = getBlogPostsKey(language)

  return useMutation({
    mutationFn: ({ id, post }: { id: string; post: Partial<BlogPost> }) => 
      blogService.updatePost(id, post),
    // Оптимистичное обновление
    onMutate: async ({ id, post }) => {
      await queryClient.cancelQueries({ queryKey: BLOG_POST_KEY(id) })
      await queryClient.cancelQueries({ queryKey: postsKey })

      const previousPost = queryClient.getQueryData<BlogPost>(BLOG_POST_KEY(id))
      const previousPosts = queryClient.getQueryData<BlogPost[]>(postsKey)

      // Оптимистично обновляем
      if (previousPost) {
        queryClient.setQueryData<BlogPost>(
          BLOG_POST_KEY(id),
          { ...previousPost, ...post }
        )
      }

      if (previousPosts) {
        queryClient.setQueryData<BlogPost[]>(
          postsKey,
          previousPosts.map(p => p.id === id ? { ...p, ...post } : p)
        )
      }

      return { previousPost, previousPosts }
    },
    onError: (_err, variables, context) => {
      if (context?.previousPost) {
        queryClient.setQueryData(BLOG_POST_KEY(variables.id), context.previousPost)
      }
      if (context?.previousPosts) {
        queryClient.setQueryData(postsKey, context.previousPosts)
      }
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: BLOG_POST_KEY(variables.id) })
      queryClient.invalidateQueries({ queryKey: postsKey })
    },
  })
}

// Хук для удаления поста с языком
export const useDeletePost = (language: string = 'ru') => {
  const queryClient = useQueryClient()
  const postsKey = getBlogPostsKey(language)

  return useMutation({
    mutationFn: (id: string) => blogService.deletePost(id),
    // Оптимистичное удаление
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: postsKey })

      const previousPosts = queryClient.getQueryData<BlogPost[]>(postsKey)

      if (previousPosts) {
        queryClient.setQueryData<BlogPost[]>(
          postsKey,
          previousPosts.filter(p => p.id !== id)
        )
      }

      return { previousPosts }
    },
    onError: (_err, _id, context) => {
      if (context?.previousPosts) {
        queryClient.setQueryData(postsKey, context.previousPosts)
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: postsKey })
    },
  })
}

// Хук для поиска постов с языком
export const useSearchPosts = (query: string, language: string = 'ru') => {
  return useQuery({
    queryKey: ['blog-search', query, language],
    queryFn: () => blogService.searchPosts(query, language),
    enabled: query.length > 2, // Ищем только если > 2 символов
    staleTime: 2 * 60 * 1000, // 2 минуты для поиска
  })
}

