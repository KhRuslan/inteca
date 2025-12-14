import { Link } from 'react-router-dom'
import { useContent } from '../hooks/useContentQuery'
import { useLanguage } from '../contexts/LanguageContext'
import { defaultContent } from '../types/content'

const HeroSection = () => {
  const { language } = useLanguage()
  const { data: content } = useContent(language)
  const hero = content?.hero || defaultContent.hero

  // Адаптивные размеры заголовка в зависимости от языка
  const getTitleClasses = () => {
    switch(language) {
      case 'ru':
        return 'text-base sm:text-xl md:text-2xl lg:text-3xl font-bold text-white mb-3 sm:mb-5 leading-tight text-center px-2'
      case 'kz':
        return 'text-base sm:text-xl md:text-2xl lg:text-3xl font-bold text-white mb-3 sm:mb-5 leading-tight text-center px-2'
      case 'en':
      default:
        // На мобильных убираем whitespace-nowrap, на десктопе (lg+) оставляем
        return 'text-base sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-white mb-3 sm:mb-5 leading-tight text-center px-2 lg:whitespace-nowrap'
    }
  }

  return (
    <section className="w-full mb-32 sm:mb-40 lg:mb-48 py-2 sm:py-4">
      <div className="container mx-auto px-2 sm:px-4">
        <div className="relative h-[300px] sm:h-[400px] lg:h-[550px]">
          {/* Background Image - фото с отступами */}
          <div 
            className="absolute inset-0 bg-cover bg-center bg-gray-700 rounded-lg sm:rounded-none"
            style={{
              backgroundImage: `url(${hero.backgroundImage})`
            }}
          ></div>

          {/* Черная плашка внизу - адаптивная */}
          <div className="absolute bottom-[-100px] sm:bottom-[-120px] lg:bottom-[-160px] left-1/2 transform -translate-x-1/2 w-[95%] sm:w-[90%] lg:w-[85%] bg-black px-4 sm:px-8 lg:px-12 py-4 sm:py-6 lg:py-8 z-10">
            {/* Заголовок - адаптивный размер в зависимости от языка */}
            <h1 className={getTitleClasses()}>
              {hero.title}
            </h1>
            
            {/* Подзаголовок - по центру */}
            <p className="text-xs sm:text-sm lg:text-base text-white mb-4 sm:mb-6 text-center leading-relaxed max-w-4xl mx-auto px-2">
              {hero.description}
            </p>
            
            {/* Кнопка - белая с красным текстом, отцентрирована */}
            <div className="flex justify-center">
              <Link 
                to="/contacts#hero"
                className="bg-white text-[#DD0000] px-4 sm:px-6 lg:px-8 py-2 sm:py-2.5 lg:py-3 rounded-md text-sm sm:text-base font-semibold hover:bg-gray-100 transition inline-block"
              >
                {hero.buttonText}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection

