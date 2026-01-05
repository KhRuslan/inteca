import { useState, useEffect } from 'react'
import TopBar from '../components/TopBar'
import Header from '../components/Header'
import Footer from '../components/Footer'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../components/ui/accordion'
import { useContent } from '../hooks/useContentQuery'
import { useLanguage } from '../contexts/LanguageContext'
import { TrainingFormat } from '../types/content'

const ForCorporateClients = () => {
  const { language } = useLanguage()
  const { data: content } = useContent(language)
  const [selectedFormat, setSelectedFormat] = useState<TrainingFormat | null>(null)
  
  const forCorporateClientsPage = content?.forCorporateClientsPage || {
    hero: { title: '', subtitle: '', description: '' },
    whyCaseMethodWorks: { title: '', description: '', list: [], conclusion: '' },
    trainingFormatsTitle: '',
    trainingFormats: [],
    sampleCasesTitle: '',
    sampleCases: [],
    businessResultsTitle: '',
    businessResults: [],
    faqTitle: '',
    faq: [],
    cta: { buttonText: '' }
  }

  const pageContent = forCorporateClientsPage

  // Блокировка скролла при открытии модального окна
  useEffect(() => {
    if (selectedFormat) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [selectedFormat])

  // Функция для получения краткого текста
  const getShortDescription = (description: string) => {
    if (description.length > 100) {
      const cutPoint = description.substring(0, 100).lastIndexOf('.')
      if (cutPoint > 50) {
        return description.substring(0, cutPoint + 1)
      }
      const spacePoint = description.substring(0, 100).lastIndexOf(' ')
      if (spacePoint > 50) {
        return description.substring(0, spacePoint) + '...'
      }
      return description.substring(0, 80) + '...'
    }
    return description
  }

  return (
    <div className="min-h-screen bg-white">
      <TopBar />
      <Header />

      {/* Hero Section */}
      <section className="pt-8 sm:pt-12 lg:pt-16 pb-12 sm:pb-16 lg:pb-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            {/* Title with red underline */}
            <div className="mb-6 sm:mb-8">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 sm:mb-6 relative inline-block">
                <span className="absolute -top-6 sm:-top-8 left-0 w-full h-0.5 bg-[#DD0000]"></span>
                {pageContent.hero.title}
              </h1>
              
              {/* Hero Image - Mobile: immediately after title */}
              <div className="lg:hidden mt-4 sm:mt-6 mb-6 sm:mb-8">
                <img 
                  src="/for corp.png" 
                  alt="Corporate training"
                  loading="lazy" 
                  className="w-full h-auto rounded-lg object-cover"
                />
              </div>

              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-6 sm:mb-8">
                {pageContent.hero.subtitle}
              </h2>
              <p className="text-base sm:text-lg lg:text-xl text-gray-700 leading-relaxed max-w-4xl">
                {pageContent.hero.description}
              </p>
            </div>

            {/* Hero Image and Why Section - Two Column Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mt-8 sm:mt-12 items-start">
              {/* Left: Hero Image - Desktop only */}
              <div className="hidden lg:block">
                <img 
                  src="/for corp.png" 
                  alt="Corporate training"
                  loading="lazy" 
                  className="w-full h-auto rounded-lg object-cover"
                />
              </div>

              {/* Right: Why the Case Method Works */}
              <div className="flex flex-col">
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 sm:mb-6 relative inline-block pb-2">
                  {pageContent.whyCaseMethodWorks.title}
                  <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-[#DD0000]"></span>
                </h3>
                <p className="text-base sm:text-lg text-gray-700 mb-4 sm:mb-6">
                  {pageContent.whyCaseMethodWorks.description}
                </p>
                <ul className="list-disc list-inside text-base sm:text-lg text-gray-700 mb-4 sm:mb-6 space-y-2">
                  {pageContent.whyCaseMethodWorks.list.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
                <p className="text-base sm:text-lg text-gray-700">
                  {pageContent.whyCaseMethodWorks.conclusion}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What Education Gives Section */}
      {pageContent.whatEducationGives && (
        <section className="py-12 sm:py-16 lg:py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-6 sm:mb-8 relative inline-block">
                {pageContent.whatEducationGives.title}
                <span className="absolute -bottom-2 left-0 w-full h-0.5 bg-[#DD0000]"></span>
              </h2>
              <div className="bg-black text-white p-6 sm:p-8 lg:p-10 rounded-lg">
                <ul className="list-disc list-inside text-base sm:text-lg text-gray-300 space-y-3">
                  {pageContent.whatEducationGives.points.map((point, index) => (
                    <li key={index}>{point}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Training Formats Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-8 sm:mb-12 relative inline-block">
              <span className="absolute -top-6 sm:-top-8 left-0 w-full h-0.5 bg-[#DD0000]"></span>
              {pageContent.trainingFormatsTitle}
            </h2>

            <div className="space-y-6 sm:space-y-8">
              {/* First three cards in a row */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
                {pageContent.trainingFormats.slice(0, 3).map((format, index) => {
                  const isLongText = format.description.length > 100 || (format.list && format.list.length > 0)
                  
                  // Адаптируем текст для лучшего отображения в 3-4 строки
                  const getAdaptedDescription = (desc: string, cardIndex: number) => {
                    // Разбиваем по предложениям и запятым для более точного обрезания
                    const sentences = desc.split(/[.!?]+/).filter(s => s.trim().length > 0)
                    
                    // Для первой карточки (Case Learning Path) - берем начало с ключевой информацией
                    if (cardIndex === 0) {
                      // Берем начало до первого упоминания темы в скобках или первые 2 предложения
                      let text = desc
                      const bracketIndex = text.indexOf('(лидерство')
                      if (bracketIndex > 0 && bracketIndex < 200) {
                        text = text.substring(0, bracketIndex).trim()
                        // Добавляем начало скобки для контекста
                        text += ' (лидерство, продажи, стратегия,'
                        if (text.length > 180) {
                          text = text.substring(0, 180).trim()
                          const lastSpace = text.lastIndexOf(' ')
                          if (lastSpace > 150) {
                            text = text.substring(0, lastSpace)
                          }
                        }
                        text += '...'
                      } else {
                        // Если скобки нет, берем первые 2 предложения
                        text = sentences.slice(0, 2).join('. ')
                        if (text.length > 180) {
                          text = text.substring(0, 180).trim()
                          const lastSpace = text.lastIndexOf(' ')
                          if (lastSpace > 150) {
                            text = text.substring(0, lastSpace)
                          }
                          text += '...'
                        } else if (sentences.length > 2) {
                          text += '...'
                        }
                      }
                      return text
                    }
                    
                    // Для второй карточки (Сертификация)
                    if (cardIndex === 1) {
                      // Берем начало до упоминания Case Book или первые 2 предложения
                      let text = desc
                      const caseBookIndex = text.indexOf('Case Book')
                      if (caseBookIndex > 0 && caseBookIndex < 200) {
                        text = text.substring(0, caseBookIndex).trim()
                        // Добавляем контекст
                        text += ' сертификаты университета-партнёра (Caspian Business School). В обоих'
                        if (text.length > 170) {
                          text = text.substring(0, 170).trim()
                          const lastSpace = text.lastIndexOf(' ')
                          if (lastSpace > 140) {
                            text = text.substring(0, lastSpace)
                          }
                          text += '...'
                        }
                      } else {
                        text = sentences.slice(0, 2).join('. ')
                        if (text.length > 170) {
                          text = text.substring(0, 170).trim()
                          const lastSpace = text.lastIndexOf(' ')
                          if (lastSpace > 140) {
                            text = text.substring(0, lastSpace)
                          }
                          text += '...'
                        } else if (sentences.length > 2) {
                          text += '...'
                        }
                      }
                      return text
                    }
                    
                    // Для третьей карточки (Customer Program) - берем первые 2 предложения
                    let text = sentences.slice(0, 2).join('. ')
                    if (text.length > 160) {
                      text = text.substring(0, 160).trim()
                      const lastSpace = text.lastIndexOf(' ')
                      if (lastSpace > 120) {
                        text = text.substring(0, lastSpace)
                      }
                      text += '...'
                    } else if (sentences.length > 2) {
                      text += '...'
                    }
                    return text
                  }
                  
                  return (
                    <div key={index} className="bg-black text-white p-6 sm:p-8 rounded-lg flex flex-col h-full">
                      <h3 className="text-xl sm:text-2xl font-bold mb-4 pb-2 relative">
                        {format.title}
                        <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#DD0000]"></span>
                      </h3>
                      <p className="text-base sm:text-lg mb-4 flex-grow line-clamp-4 leading-relaxed">
                        {getAdaptedDescription(format.description, index)}
                      </p>
                      {isLongText && (
                        <button
                          onClick={() => setSelectedFormat(format)}
                          className="text-sm sm:text-base font-semibold text-white hover:text-[#DD0000] transition-colors inline-flex items-center gap-1 self-start mt-auto"
                        >
                          {language === 'ru' ? 'Подробнее' : language === 'kz' ? 'Толығырақ' : 'Learn more'}
                          <span>→</span>
                        </button>
                      )}
                    </div>
                  )
                })}
              </div>

              {/* Остальные карточки (если есть) */}
              {pageContent.trainingFormats.slice(4).map((format, index) => {
                const isLongText = format.description.length > 100 || (format.list && format.list.length > 0)
                const shortDescription = getShortDescription(format.description)
                
                return (
                  <div key={index + 4} className="bg-black text-white p-6 sm:p-8 rounded-lg flex flex-col">
                    <h3 className="text-xl sm:text-2xl font-bold mb-4 relative inline-block">
                      {format.title}
                      <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#DD0000]"></span>
                    </h3>
                    <p className="text-base sm:text-lg mb-4 flex-grow">
                      {isLongText ? shortDescription : format.description}
                    </p>
                    {isLongText && (
                      <button
                        onClick={() => setSelectedFormat(format)}
                        className="text-sm sm:text-base font-semibold text-[#DD0000] hover:underline inline-flex items-center gap-1 self-start mb-4"
                      >
                        {language === 'ru' ? 'Подробнее' : language === 'kz' ? 'Толығырақ' : 'Learn more'}
                        <span>→</span>
                      </button>
                    )}
                    {!isLongText && format.idealFor && (
                      <p className="text-sm sm:text-base text-gray-300 mb-2">{format.idealFor}</p>
                    )}
                    {!isLongText && format.list && format.list.length > 0 && (
                      <ul className="text-sm sm:text-base text-gray-300 space-y-1 list-disc list-inside">
                        {format.list.map((item, idx) => (
                          <li key={idx}>{item}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-8 sm:mb-12 relative inline-block">
              <span className="absolute -top-6 sm:-top-8 left-0 w-full h-0.5 bg-[#DD0000]"></span>
              {pageContent.faqTitle}
            </h2>
            
            <Accordion type="single" collapsible className="w-full" defaultValue="item-1">
              {pageContent.faq.map((item, index) => (
                <AccordionItem key={index} value={`item-${index + 1}`} className="border-b border-gray-200 pb-4">
                  <AccordionTrigger className="text-left text-lg sm:text-xl font-semibold py-4 hover:no-underline text-gray-900 data-[state=open]:text-[#DD0000] group">
                    <span className="mr-4 font-bold text-gray-400 group-data-[state=open]:text-[#DD0000]">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-base sm:text-lg text-gray-700 pt-4">
                    <div className="bg-white border-2 border-[#DD0000] rounded-lg p-4 sm:p-6">
                      {item.answer}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* Modal for Training Format Details */}
      {selectedFormat && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-2 sm:p-4 animate-fadeIn"
          onClick={() => setSelectedFormat(null)}
        >
          <div 
            className="bg-gray-50 rounded-lg max-w-4xl w-full max-h-[95vh] sm:max-h-[90vh] overflow-y-auto animate-slideUp"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 sm:p-6 lg:p-8 xl:p-12">
              <button
                onClick={() => setSelectedFormat(null)}
                className="mb-4 text-gray-600 hover:text-gray-900 transition flex items-center gap-2 text-sm font-semibold"
              >
                <span>←</span>
                {language === 'ru' ? 'Назад' : language === 'kz' ? 'Артқа' : 'Back'}
              </button>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                {selectedFormat.title}
              </h2>
              <div className="w-12 h-0.5 bg-[#DD0000] mb-6"></div>
              
              <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-6">
                {selectedFormat.description}
              </p>

              {selectedFormat.idealFor && (
                <p className="text-base sm:text-lg font-semibold text-gray-900 mb-3">
                  {selectedFormat.idealFor}
                </p>
              )}

              {selectedFormat.list && selectedFormat.list.length > 0 && (
                <ul className="text-base sm:text-lg text-gray-700 space-y-2 list-disc list-inside mb-6">
                  {selectedFormat.list.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  )
}

export default ForCorporateClients

