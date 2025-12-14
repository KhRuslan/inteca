import { useContent } from '../hooks/useContentQuery'
import { useLanguage } from '../contexts/LanguageContext'
import { defaultContent } from '../types/content'

const KeyBenefits = () => {
  const { language } = useLanguage()
  const { data: content } = useContent(language)
  const benefits = content?.keyBenefits || defaultContent.keyBenefits

  const radius = 100
  const circumference = 2 * Math.PI * radius
  const strokeWidth = 50

  // Локализация заголовка
  const getTitle = () => {
    switch(language) {
      case 'ru':
        return 'Ключевые преимущества обучения на основе кейсов'
      case 'kz':
        return 'Кейс негізіндегі оқытудың негізгі артықшылықтары'
      case 'en':
      default:
        return 'Key Benefits of Case-Based Learning'
    }
  }

  // Calculate dash arrays and offsets
  const calculateDashArray = (percentage: number) => {
    const dashLength = (circumference * percentage) / 100
    return `${dashLength} ${circumference}`
  }

  let cumulativeOffset = 0

  return (
    <section className="py-8 sm:py-12 lg:py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* Блок с рамкой */}
        <div className="max-w-6xl mx-auto border border-gray-300 p-4 sm:p-8 lg:p-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 sm:mb-8 lg:mb-12">
            {getTitle()}
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
            {/* Left side - Chart */}
            <div className="flex justify-center">
              <div className="relative w-48 h-48 sm:w-64 sm:h-64 lg:w-80 lg:h-80">
                <svg className="transform -rotate-90 w-full h-full" viewBox="0 0 256 256">
                  {/* Segments */}
                  {benefits.map((benefit, index) => {
                    const dashArray = calculateDashArray(benefit.percentage)
                    const offset = cumulativeOffset
                    cumulativeOffset -= (circumference * benefit.percentage) / 100
                    
                    return (
                      <circle
                        key={index}
                        cx="128"
                        cy="128"
                        r={radius}
                        fill="none"
                        stroke={benefit.color}
                        strokeWidth={strokeWidth}
                        strokeDasharray={dashArray}
                        strokeDashoffset={offset}
                      />
                    )
                  })}
                </svg>
              </div>
            </div>

            {/* Right side - List */}
            <div className="space-y-4 sm:space-y-6 lg:space-y-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2 sm:gap-3 lg:gap-4 min-w-0 flex-1">
                    <div 
                      className="w-4 h-4 sm:w-5 sm:h-5 rounded-full flex-shrink-0" 
                      style={{ backgroundColor: benefit.color }}
                    ></div>
                    <span className="text-sm sm:text-base lg:text-xl text-gray-900 break-words">{benefit.label}</span>
                  </div>
                  <span className="text-sm sm:text-base lg:text-xl text-gray-900 font-semibold flex-shrink-0">{benefit.percentage}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default KeyBenefits

