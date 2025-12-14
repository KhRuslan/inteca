import { QueryClient } from '@tanstack/react-query'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Stale time - 5 минут (данные считаются свежими)
      staleTime: 5 * 60 * 1000,
      // Cache time - 10 минут (сколько хранить в кэше)
      gcTime: 10 * 60 * 1000,
      // Retry logic
      retry: 2,
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
      // Refetch on window focus (только если данные устарели)
      refetchOnWindowFocus: false,
      // Refetch on reconnect
      refetchOnReconnect: true,
      // Показываем старые данные пока грузятся новые
      placeholderData: (previousData: unknown) => previousData,
    },
    mutations: {
      // Retry mutations only once
      retry: 1,
    },
  },
})

