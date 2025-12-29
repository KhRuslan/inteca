import { Link } from 'react-router-dom'
import { useContent } from '../hooks/useContentQuery'
import { useLanguage } from '../contexts/LanguageContext'
import { defaultContent } from '../types/content'

const CaseBasedLearning = () => {
  const { language } = useLanguage()
  const { data: content } = useContent(language)
  const caseContent = content?.caseBasedLearning || defaultContent.caseBasedLearning

  return (
    <section className="py-8 sm:py-12 lg:py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 max-w-6xl mx-auto items-stretch">
          {/* Left side - Image */}
          <div className="flex order-2 lg:order-1">
            <img 
              src={caseContent.image}
              alt="Case-based learning"
              className="w-full h-full object-cover rounded-lg shadow-lg"
              loading="lazy"
            />
          </div>

          {/* Right side - Text content */}
          <div className="order-1 lg:order-2">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
              {caseContent.title}
            </h2>
            <p className="text-sm sm:text-base lg:text-lg text-gray-700 mb-4 sm:mb-6 leading-relaxed">
              {(() => {
                const shortPhrase = 'Если лекция показывает о чём думать, то кейс-метод учит как думать'
                const fullPhrase = 'Если лекция показывает о чём думать, то кейс-метод учит как думать: как анализировать ситуацию, находить причинно-следственные связи, принимать управленческие решения и видеть несколько вариантов развития событий.'
                
                // Проверяем, есть ли полная фраза в тексте
                if (caseContent.description.includes(fullPhrase)) {
                  const parts = caseContent.description.split(fullPhrase)
                  const continuation = ': как анализировать ситуацию, находить причинно-следственные связи, принимать управленческие решения и видеть несколько вариантов развития событий.'
                  
                  return (
                    <>
                      {parts[0]}
                      <span className="underline decoration-[#DD0000] decoration-2 underline-offset-4 font-bold">
                        {shortPhrase}
                      </span>
                      {continuation}
                      {parts[1]}
                    </>
                  )
                }
                // Если полной фразы нет, проверяем короткую
                if (caseContent.description.includes(shortPhrase)) {
                  const parts = caseContent.description.split(shortPhrase)
                  return (
                    <>
                      {parts[0]}
                      <span className="underline decoration-[#DD0000] decoration-2 underline-offset-4 font-bold">
                        {shortPhrase}
                      </span>
                      {parts[1]}
                    </>
                  )
                }
                return caseContent.description
              })()}
            </p>
            
            {/* Красная линия после основного текста */}
            <hr className="mb-4 sm:mb-6 lg:mb-8 border-t-2 border-[#DD0000]" />
            
            {/* Ссылки с серыми линиями */}
            <div className="space-y-4 sm:space-y-6">
              <div>
                <Link 
                  to="/methodology"
                  className="inline-flex items-center gap-2 text-sm sm:text-base text-gray-900 font-semibold hover:text-inteca-red transition"
                >
                  <span className="break-words">{caseContent.link1Text}</span>
                  <span className="text-[#DD0000] flex-shrink-0">→</span>
                </Link>
                <hr className="mt-3 sm:mt-4 border-t border-gray-300" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CaseBasedLearning

