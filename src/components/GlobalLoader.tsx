import { useEffect, useState } from 'react'

interface GlobalLoaderProps {
  isLoading: boolean
  progress?: number
  onComplete?: () => void
}

const GlobalLoader = ({ isLoading, progress = 0, onComplete }: GlobalLoaderProps) => {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    if (!isLoading && progress >= 100) {
      // Небольшая задержка для плавного перехода
      const timer = setTimeout(() => {
        setIsVisible(false)
        onComplete?.()
      }, 300)
      return () => clearTimeout(timer)
    }
  }, [isLoading, progress, onComplete])

  if (!isVisible) return null

  return (
    <div
      className={`fixed inset-0 z-[9999] bg-white flex flex-col items-center justify-center transition-opacity duration-300 ${
        isLoading ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      {/* Логотип */}
      <div className="mb-8 animate-pulse">
        <img 
          src="/inTECA logo black.svg" 
          alt="INTECA" 
          className="h-24 sm:h-32 lg:h-40 w-auto"
        />
      </div>

      {/* Прогресс бар */}
      <div className="w-64 sm:w-80 max-w-[90%]">
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-[#DD0000] transition-all duration-300 ease-out rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-center text-sm text-gray-600 mt-4">
          {progress < 100 ? `Загрузка... ${progress}%` : 'Готово!'}
        </p>
      </div>

      {/* Индикатор загрузки */}
      <div className="mt-8 flex space-x-2">
        <div className="w-2 h-2 bg-[#DD0000] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
        <div className="w-2 h-2 bg-[#DD0000] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
        <div className="w-2 h-2 bg-[#DD0000] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
      </div>
    </div>
  )
}

export default GlobalLoader

