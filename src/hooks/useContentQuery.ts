import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { contentService } from '../services/contentService'
import { SiteContent } from '../types/content'

const getContentQueryKey = (language: string) => ['site-content', language]

// Хук для получения контента (с кэшированием) для конкретного языка
export const useContent = (language: string = 'ru') => {
  return useQuery({
    queryKey: getContentQueryKey(language),
    queryFn: () => contentService.getContent(language),
    staleTime: 0, // Всегда считаем данные устаревшими, чтобы загружать свежие при смене языка
    gcTime: 30 * 60 * 1000, // 30 минут в кэше
    refetchOnMount: true, // Всегда перезагружать при монтировании
    refetchOnWindowFocus: false, // Не перезагружать при фокусе окна
  })
}

// Хук для обновления контента (оптимистичные обновления) для конкретного языка
export const useUpdateContent = (language: string = 'ru') => {
  const queryClient = useQueryClient()
  const queryKey = getContentQueryKey(language)

  return useMutation({
    mutationFn: (newContent: Partial<SiteContent>) => 
      contentService.updateContent(newContent, language),
    // Оптимистичное обновление
    onMutate: async (newContent) => {
      // Отменяем текущие запросы
      await queryClient.cancelQueries({ queryKey })

      // Сохраняем предыдущие данные
      const previousContent = queryClient.getQueryData<SiteContent>(queryKey)

      // Оптимистично обновляем UI
      if (previousContent) {
        queryClient.setQueryData<SiteContent>(
          queryKey,
          { ...previousContent, ...newContent }
        )
      }

      return { previousContent }
    },
    // Если ошибка - откатываем
    onError: (err, newContent, context) => {
      if (context?.previousContent) {
        queryClient.setQueryData(queryKey, context.previousContent)
      }
    },
    // После успеха - обновляем кэш
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey })
    },
  })
}

// Хук для сброса контента для конкретного языка
export const useResetContent = (language: string = 'ru') => {
  const queryClient = useQueryClient()
  const queryKey = getContentQueryKey(language)

  return useMutation({
    mutationFn: () => contentService.resetContent(language),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey })
    },
  })
}

