import { useContent } from '../hooks/useContentQuery'
import { useLanguage } from '../contexts/LanguageContext'
import { defaultContent } from '../types/content'

const ProgramBenefits = () => {
  const { language } = useLanguage()
  const { data: content } = useContent(language)
  const benefits = content?.programBenefits || defaultContent.programBenefits

  // Локализация заголовка
  const getTitle = () => {
    switch(language) {
      case 'ru':
        return 'Преимущества программы'
      case 'kz':
        return 'Бағдарлама артықшылықтары'
      case 'en':
      default:
        return 'Program Benefits'
    }
  }

  return (
    <section className="py-8 sm:py-12 lg:py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center text-gray-900 mb-8 sm:mb-10 lg:mb-12">
          {getTitle()}
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-6xl mx-auto">
          {benefits.map((benefit, index) => (
            <div 
              key={index}
              className="bg-gray-50 border border-gray-200 p-4 sm:p-6 rounded-lg hover:shadow-lg transition"
            >
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3">
                {benefit.title}
              </h3>
              <p className="text-sm sm:text-base text-gray-700 mb-3 sm:mb-4 leading-relaxed">
                {benefit.description}
              </p>
              <div className="text-[#DD0000] text-lg sm:text-xl">→</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ProgramBenefits

