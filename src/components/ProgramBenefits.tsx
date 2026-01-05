import { useState, useEffect } from 'react'
import { useContent } from '../hooks/useContentQuery'
import { useLanguage } from '../contexts/LanguageContext'
import { defaultContent, ProgramBenefit } from '../types/content'

const ProgramBenefits = () => {
  const { language } = useLanguage()
  const { data: content } = useContent(language)
  const benefits = content?.programBenefits || defaultContent.programBenefits
  const [selectedBenefit, setSelectedBenefit] = useState<ProgramBenefit | null>(null)

  // Блокировка скролла при открытии модального окна
  useEffect(() => {
    if (selectedBenefit) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [selectedBenefit])

  // Локализация заголовка
  const getTitle = () => {
    switch(language) {
      case 'ru':
        return 'Кейс-метод обучение'
      case 'kz':
        return 'Кейс-әдіс оқыту'
      case 'en':
      default:
        return 'Case Method Learning'
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
            // Проверяем, есть ли полное описание или структурированный контент
            const hasFullContent = benefit.fullDescription || benefit.structuredContent
            // Используем краткое описание из description
            const shortDescription = benefit.description

            return (
              <div 
                key={index}
                className="bg-gray-50 border border-gray-200 p-4 sm:p-6 rounded-lg hover:shadow-lg transition flex flex-col h-full"
              >
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4 min-h-[3.5rem] sm:min-h-[4rem] flex items-start">
                  {benefit.title}
                </h3>
                <div className="flex-grow">
                  <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                    {shortDescription}
                  </p>
                </div>
                <div className="mt-auto pt-2">
                  {hasFullContent ? (
                    <button
                      onClick={() => setSelectedBenefit(benefit)}
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

      {/* Detail Modal */}
      {selectedBenefit && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-2 sm:p-4 animate-fadeIn"
          onClick={() => setSelectedBenefit(null)}
        >
          <div 
            className="bg-gray-50 rounded-lg max-w-4xl w-full max-h-[95vh] sm:max-h-[90vh] overflow-y-auto animate-slideUp"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 sm:p-6 lg:p-8 xl:p-12">
              {/* Back Button */}
              <button
                onClick={() => setSelectedBenefit(null)}
                className="mb-3 sm:mb-4 lg:mb-6 text-gray-600 hover:text-gray-900 transition flex items-center gap-2 text-xs sm:text-sm font-semibold"
              >
                <span>←</span>
                {language === 'ru' ? 'Назад' : language === 'kz' ? 'Артқа' : 'Back'}
              </button>

              {/* Title */}
              <h2 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-bold text-gray-900 mb-2 sm:mb-3 lg:mb-4 leading-tight">
                {selectedBenefit.title}
              </h2>
              <div className="border-b-2 sm:border-b-4 border-[#DD0000] w-16 sm:w-20 lg:w-24 mb-4 sm:mb-6 lg:mb-8"></div>

              {/* Content */}
              {selectedBenefit.structuredContent ? (
                // Structured content with sections
                <div className="space-y-6 sm:space-y-8 lg:space-y-10">
                  {selectedBenefit.structuredContent.sections.map((section, sIndex) => (
                    <div key={sIndex} className={sIndex > 0 ? 'border-t-2 border-gray-200 pt-6 sm:pt-8' : ''}>
                      {/* Section Title */}
                      <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-4 sm:mb-5">
                        {section.title}
                      </h3>
                      
                      {/* Section Content */}
                      {section.content && (
                        <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-4">
                          {section.content}
                        </p>
                      )}
                      
                      {/* Section Items */}
                      {section.items && section.items.length > 0 && (
                        <ul className="space-y-3 mb-6">
                          {section.items.map((item, iIndex) => (
                            <li key={iIndex} className="flex items-start">
                              <span className="text-[#DD0000] mr-3 sm:mr-4 font-bold text-xl sm:text-2xl flex-shrink-0 mt-1">•</span>
                              <span className="text-base sm:text-lg text-gray-700">{item}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                      
                      {/* Subsections */}
                      {section.subsections && section.subsections.length > 0 && (
                        <div className="space-y-5">
                          {section.subsections.map((subsection, subIndex) => (
                            <div key={subIndex}>
                              {/* Subsection Title */}
                              {subsection.title && (
                                <h4 className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-900 mb-3">
                                  {subsection.title}
                                </h4>
                              )}
                              
                              {/* Subsection Content */}
                              {subsection.content && (
                                <p className={`text-base sm:text-lg leading-relaxed ${
                                  subsection.emphasis 
                                    ? 'italic text-gray-800 bg-gray-100 p-4 rounded-lg border-l-4 border-[#DD0000]' 
                                    : 'text-gray-700'
                                } ${subsection.items ? 'mb-3' : ''}`}>
                                  {subsection.content}
                                </p>
                              )}
                              
                              {/* Subsection Items */}
                              {subsection.items && subsection.items.length > 0 && (
                                <ul className="space-y-2 mt-3">
                                  {subsection.items.map((item, itemIndex) => (
                                    <li key={itemIndex} className="flex items-start">
                                      <span className="text-[#DD0000] mr-3 font-bold text-lg flex-shrink-0 mt-1">•</span>
                                      <span className="text-base sm:text-lg text-gray-700">{item}</span>
                                    </li>
                                  ))}
                                </ul>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                      
                      {/* Highlighted Blocks */}
                      {section.highlightedBlocks && section.highlightedBlocks.length > 0 && (
                        <div className="space-y-4 mt-6">
                          {section.highlightedBlocks.map((block, blockIndex) => (
                            <div key={blockIndex} className="bg-gray-100 p-4 rounded-lg border-l-4 border-[#DD0000]">
                              <p className="text-base sm:text-lg text-gray-800 italic">{block}</p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : selectedBenefit.fullDescription ? (
                // Full description as plain text
                <div className="text-base sm:text-lg text-gray-700 leading-relaxed whitespace-pre-line">
                  {selectedBenefit.fullDescription}
                </div>
              ) : (
                // Fallback to description
                <div className="text-base sm:text-lg text-gray-700 leading-relaxed">
                  {selectedBenefit.description}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

export default ProgramBenefits

