import { Link } from 'react-router-dom'
import { useContent } from '../hooks/useContentQuery'
import { useLanguage } from '../contexts/LanguageContext'
import { defaultContent } from '../types/content'

const Founder = () => {
  const { language } = useLanguage()
  const { data: content } = useContent(language)
  const founder = content?.founder || defaultContent.founder

  // Адаптивные размеры заголовка в зависимости от языка
  const getTitleClasses = () => {
    switch(language) {
      case 'ru':
        return 'text-3xl md:text-4xl font-bold text-gray-900 mb-4'
      case 'kz':
        return 'text-3xl md:text-4xl font-bold text-gray-900 mb-4'
      case 'en':
      default:
        return 'text-4xl md:text-5xl font-bold text-gray-900 mb-4'
    }
  }

  // Локализация надписи "Key Facts"
  const getKeyFactsLabel = () => {
    switch(language) {
      case 'ru':
        return 'Ключевые факты:'
      case 'kz':
        return 'Негізгі фактілер:'
      case 'en':
      default:
        return 'Key Facts:'
    }
  }

  return (
    <section className="py-8 sm:py-12 lg:py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-6 sm:gap-8 lg:gap-12 max-w-6xl mx-auto items-start">
          {/* Left side - Image - Компактная */}
          <div className="relative order-2 lg:order-1 flex-shrink-0">
            <img 
              src={founder.image}
              alt="Oleg Tsoy"
              loading="lazy"
              className="w-full lg:w-80 xl:w-96 h-auto rounded-lg"
            />
            <div className="absolute bottom-4 sm:bottom-6 right-0 bg-white py-2 sm:py-3 px-3 sm:px-4 flex items-center gap-2">
              <div className="w-0.5 sm:w-1 h-6 sm:h-8 bg-[#DD0000]"></div>
              <span className="font-bold text-sm sm:text-base text-gray-800">Oleg Tsoy</span>
            </div>
          </div>

          {/* Right side - Text content */}
          <div className="order-1 lg:order-2">
            <h2 className={getTitleClasses()}>
              {founder.title}
            </h2>
            <hr className="mb-4 sm:mb-6 border-t border-gray-300" />
            
            <p className="text-sm sm:text-base lg:text-lg text-gray-700 mb-4 sm:mb-6 leading-relaxed">
              {founder.description}
            </p>
            
            <hr className="mb-4 sm:mb-6 border-t-2 border-[#DD0000]" />
            
            <div className="mb-6 sm:mb-8">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">{getKeyFactsLabel()}</h3>
              <ul className="space-y-2 sm:space-y-3 text-sm sm:text-base text-gray-600">
                {founder.keyFacts.map((fact, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="text-gray-400 mt-1">•</span>
                    <span>{fact}</span>
                  </li>
                ))}
              </ul>
            </div>

            <hr className="mb-3 sm:mb-4 border-t border-gray-300" />
            
            <Link 
              to="/founder#hero"
              className="inline-flex items-center gap-2 text-sm sm:text-base text-gray-900 font-semibold hover:text-inteca-red transition"
            >
              {founder.linkText}
              <span className="text-[#DD0000]">→</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Founder

