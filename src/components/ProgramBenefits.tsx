import { useContent } from '../hooks/useContentQuery'
import { useLanguage } from '../contexts/LanguageContext'
import { defaultContent, ProgramBenefit } from '../types/content'

interface ProgramBenefitsProps {
  onBenefitClick?: (benefit: ProgramBenefit) => void
}

const ProgramBenefits = ({ onBenefitClick }: ProgramBenefitsProps) => {
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
          {benefits.map((benefit, index) => {
            // Извлекаем первое предложение как catchy phrase
            const firstSentenceEnd = benefit.description.search(/[.!?]/)
            let catchyPhrase = ''
            let shortDescription = ''
            let isLongText = false

            if (firstSentenceEnd > 0 && firstSentenceEnd < benefit.description.length) {
              catchyPhrase = benefit.description.substring(0, firstSentenceEnd + 1).trim()
              const restOfText = benefit.description.substring(firstSentenceEnd + 1).trim()
              
              // Берем еще одно предложение для краткого описания
              const secondSentenceEnd = restOfText.search(/[.!?]/)
              if (secondSentenceEnd > 0) {
                shortDescription = restOfText.substring(0, secondSentenceEnd + 1).trim()
                isLongText = benefit.description.length > (catchyPhrase.length + shortDescription.length + 30)
              } else {
                // Если нет второго предложения, берем часть текста
                shortDescription = restOfText.substring(0, 80).trim()
                isLongText = benefit.description.length > (catchyPhrase.length + shortDescription.length + 30)
              }
            } else {
              // Если нет точки, берем первые 100 символов как catchy phrase
              catchyPhrase = benefit.description.substring(0, 100).trim()
              isLongText = benefit.description.length > 100
            }

            return (
              <div 
                key={index}
                className="bg-gray-50 border border-gray-200 p-4 sm:p-6 rounded-lg hover:shadow-lg transition flex flex-col h-full"
              >
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4 min-h-[3.5rem] sm:min-h-[4rem] flex items-start">
                  {benefit.title}
                </h3>
                <div className="flex-grow">
                  <p className="text-sm sm:text-base text-gray-900 font-semibold mb-2 leading-relaxed">
                    {catchyPhrase}
                  </p>
                  {isLongText && shortDescription && (
                    <p className="text-sm sm:text-base text-gray-700 mb-3 leading-relaxed">
                      {shortDescription}
                    </p>
                  )}
                </div>
                <div className="mt-auto pt-2">
                  {isLongText && onBenefitClick ? (
                    <button
                      onClick={() => onBenefitClick(benefit)}
                      className="text-sm font-semibold text-[#DD0000] hover:underline inline-flex items-center gap-1"
                    >
                      {language === 'ru' ? 'Подробнее' : language === 'kz' ? 'Толығырақ' : 'Learn more'}
                      <span>→</span>
                    </button>
                  ) : (
                    <div className="text-[#DD0000] text-lg sm:text-xl">→</div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default ProgramBenefits

