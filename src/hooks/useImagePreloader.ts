import { useEffect, useState } from 'react'

/**
 * Предзагружает изображения и отслеживает состояние загрузки
 * @param imageUrls Массив URL изображений для предзагрузки
 * @returns Объект с состоянием загрузки и прогрессом
 */
export const useImagePreloader = (imageUrls: string[]) => {
  const [imagesLoaded, setImagesLoaded] = useState(false)
  const [progress, setProgress] = useState(0)
  const [loadedCount, setLoadedCount] = useState(0)

  useEffect(() => {
    if (imageUrls.length === 0) {
      setImagesLoaded(true)
      setProgress(100)
      return
    }

    let isMounted = true
    let loaded = 0
    let failed = 0

    const preloadImages = async () => {
      const imagePromises = imageUrls.map((url) => {
        return new Promise<void>((resolve) => {
          // Пропускаем пустые URL
          if (!url || url.trim() === '') {
            resolve()
            return
          }

          const img = new Image()
          
          // Устанавливаем decoding для лучшей производительности
          img.decoding = 'async'
          
          img.onload = () => {
            if (isMounted) {
              loaded++
              setLoadedCount(loaded)
              const total = loaded + failed
              setProgress(Math.round((total / imageUrls.length) * 100))
            }
            resolve()
          }
          
          img.onerror = () => {
            if (isMounted) {
              failed++
              const total = loaded + failed
              setProgress(Math.round((total / imageUrls.length) * 100))
            }
            // Разрешаем даже при ошибке, чтобы не блокировать загрузку
            resolve()
          }
          
          // Начинаем загрузку
          img.src = url
        })
      })

      try {
        await Promise.all(imagePromises)
        if (isMounted) {
          setImagesLoaded(true)
          setProgress(100)
        }
      } catch (error) {
        console.error('Ошибка предзагрузки изображений:', error)
        // Даже при ошибке показываем контент
        if (isMounted) {
          setImagesLoaded(true)
          setProgress(100)
        }
      }
    }

    preloadImages()

    return () => {
      isMounted = false
    }
  }, [imageUrls])

  return { imagesLoaded, progress, loadedCount, total: imageUrls.length }
}

