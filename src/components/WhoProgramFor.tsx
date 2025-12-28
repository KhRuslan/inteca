import { useContent } from '../hooks/useContentQuery'
import { useLanguage } from '../contexts/LanguageContext'
import { defaultContent } from '../types/content'

const WhoProgramFor = () => {
  const { language } = useLanguage()
  const { data: content } = useContent(language)
  const cards = content?.whoProgramFor || defaultContent.whoProgramFor

  // Локализация заголовка
  const getTitle = () => {
    switch(language) {
      case 'ru':
        return 'Для кого программа:'
      case 'kz':
        return 'Бағдарлама кімге арналған:'
      case 'en':
      default:
        return 'Who the Program Is For:'
    }
  }

  return (
    <section className="py-8 sm:py-12 lg:py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center text-gray-900 mb-8 sm:mb-10 lg:mb-12">
          {getTitle()}
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
          {cards.map((card, index) => {
            // Иконки в едином стиле с MethodologyCases
            const renderIcon = () => {
              if (index === 0) {
                // Companies - grid SVG (красная сетка)
                return (
                  <svg className="w-10 h-10 text-[#DD0000]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M4 4h4v4H4V4zm6 0h4v4h-4V4zm6 0h4v4h-4V4zM4 10h4v4H4v-4zm6 0h4v4h-4v-4zm6 0h4v4h-4v-4zM4 16h4v4H4v-4zm6 0h4v4h-4v-4zm6 0h4v4h-4v-4z"/>
                  </svg>
                )
              } else if (index === 1) {
                // Students - graduation cap PNG
                return (
                  <img 
                    src="/fi-rr-graduation-cap.png" 
                    alt="" 
                    className="w-10 h-10 object-contain"
                    loading="lazy"
                  />
                )
              } else {
                // Universities - heart SVG (красное сердце)
                return (
                  <svg className="w-10 h-10 text-[#DD0000]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                  </svg>
                )
              }
            }

            return (
              <div 
                key={index}
                className="bg-white p-6 sm:p-8 rounded-lg shadow-md text-center hover:shadow-xl transition border-2 border-transparent hover:border-[#DD0000]"
              >
                <div className="flex justify-center mb-3 sm:mb-4">
                  <div className="w-20 h-20 bg-black rounded-full flex items-center justify-center">
                    {renderIcon()}
                  </div>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">
                  {card.title}
                </h3>
                <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                  {card.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default WhoProgramFor

