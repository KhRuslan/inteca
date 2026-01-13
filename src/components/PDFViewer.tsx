import { useState, useEffect } from 'react'
import { useLanguage } from '../contexts/LanguageContext'

interface PDFViewerProps {
  src: string
  title: string
  className?: string
}

const PDFViewer = ({ src, title, className = '' }: PDFViewerProps) => {
  const { language } = useLanguage()
  const [isFullscreen, setIsFullscreen] = useState(false)

  const texts = {
    open: language === 'ru' ? 'Открыть' : language === 'kz' ? 'Ашу' : 'Open',
    download: language === 'ru' ? 'Скачать' : language === 'kz' ? 'Жүктеу' : 'Download',
    close: language === 'ru' ? 'Закрыть' : language === 'kz' ? 'Жабу' : 'Close'
  }

  const handleDownload = (e: React.MouseEvent) => {
    e.stopPropagation()
    const link = document.createElement('a')
    link.href = src
    link.download = title.replace(/\s+/g, '_') + '.pdf'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handleOpenFullscreen = () => {
    setIsFullscreen(true)
    document.body.style.overflow = 'hidden'
  }

  const handleCloseFullscreen = () => {
    setIsFullscreen(false)
    document.body.style.overflow = 'unset'
  }

  // Close on Escape key
  useEffect(() => {
    if (isFullscreen) {
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          handleCloseFullscreen()
        }
      }
      window.addEventListener('keydown', handleKeyDown)
      return () => window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isFullscreen])

  return (
    <>
      {/* Preview Card */}
      <div 
        className={`bg-white border-2 border-gray-200 rounded-lg p-3 shadow-lg hover:shadow-2xl transition-all cursor-pointer group flex flex-col ${className}`}
        onClick={handleOpenFullscreen}
      >
        {/* PDF Preview */}
        <div className={`relative flex-1 overflow-hidden rounded ${className.includes('h-full') ? '' : 'min-h-[450px]'}`}>
          <iframe
            src={`${src}#toolbar=0&navpanes=0&scrollbar=0&zoom=page-fit`}
            className="w-full h-full border-0 rounded"
            style={{ pointerEvents: 'none' }}
          />
          {/* Overlay with buttons */}
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all rounded flex items-center justify-center opacity-0 group-hover:opacity-100">
            <div className="flex gap-3">
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  handleOpenFullscreen()
                }}
                className="bg-white text-gray-900 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition shadow-lg"
              >
                {texts.open}
              </button>
              <button
                onClick={handleDownload}
                className="bg-[#DD0000] text-white px-4 py-2 rounded-lg font-semibold hover:bg-[#BB0000] transition shadow-lg"
              >
                {texts.download}
              </button>
            </div>
          </div>
        </div>
        <p className="text-xs text-center text-gray-600 mt-2">{title}</p>
      </div>

      {/* Fullscreen Modal */}
      {isFullscreen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4 animate-fadeIn"
          onClick={handleCloseFullscreen}
        >
          <div 
            className="relative w-full h-full max-w-7xl max-h-[95vh] bg-white rounded-lg shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header with title and close button */}
            <div className="absolute top-0 left-0 right-0 bg-black bg-opacity-75 text-white p-4 flex items-center justify-between z-10">
              <h3 className="text-lg font-semibold">{title}</h3>
              <div className="flex items-center gap-3">
                <button
                  onClick={handleDownload}
                  className="bg-[#DD0000] text-white px-4 py-2 rounded-lg font-semibold hover:bg-[#BB0000] transition text-sm"
                >
                  {texts.download}
                </button>
                <button
                  onClick={handleCloseFullscreen}
                  className="bg-gray-700 text-white px-4 py-2 rounded-lg font-semibold hover:bg-gray-600 transition text-sm"
                >
                  ✕ {texts.close}
                </button>
              </div>
            </div>

            {/* PDF Viewer */}
            <div className="w-full h-full pt-16">
              <iframe
                src={`${src}#toolbar=0&navpanes=1&scrollbar=1`}
                className="w-full h-full border-0"
                title={title}
              />
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default PDFViewer

