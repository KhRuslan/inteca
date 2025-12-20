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
            // Показываем полный текст, так как он уже оптимизирован
            return (
              <div 
                key={index}
                className="bg-white p-6 sm:p-8 rounded-lg shadow-md text-center hover:shadow-xl transition border-2 border-transparent hover:border-[#DD0000]"
              >
                <div className="text-4xl sm:text-5xl mb-3 sm:mb-4">{card.icon}</div>
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

