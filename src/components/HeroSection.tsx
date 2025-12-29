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
        return 'text-base sm:text-xl md:text-2xl lg:text-3xl font-bold text-white leading-tight text-center px-2'
      case 'kz':
        return 'text-base sm:text-xl md:text-2xl lg:text-3xl font-bold text-white leading-tight text-center px-2'
      case 'en':
      default:
        // На мобильных убираем whitespace-nowrap, на десктопе (lg+) оставляем
        return 'text-base sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-white leading-tight text-center px-2 lg:whitespace-nowrap'
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
          <div className="absolute bottom-[-60px] sm:bottom-[-75px] lg:bottom-[-100px] left-1/2 transform -translate-x-1/2 w-[95%] sm:w-[90%] lg:w-[85%] bg-black px-4 sm:px-8 lg:px-12 py-4 sm:py-6 lg:py-8 z-10 flex items-center justify-center min-h-[80px] sm:min-h-[100px] lg:min-h-[120px]">
            {/* Заголовок - адаптивный размер в зависимости от языка */}
            <h1 className={getTitleClasses()}>
              {hero.title}
            </h1>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection

