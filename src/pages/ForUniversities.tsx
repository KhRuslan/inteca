import { Link, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
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
import { defaultContent, ForUniversitiesBenefit } from '../types/content'

const ForUniversities = () => {
  const { language } = useLanguage()
  const { data: content } = useContent(language)
  const location = useLocation()
  const [selectedBenefit, setSelectedBenefit] = useState<ForUniversitiesBenefit | null>(null)

  // Плавный скролл к hero section при переходе по ссылке с якорем
  useEffect(() => {
    if (location.hash === '#hero') {
      setTimeout(() => {
        const heroElement = document.getElementById('hero')
        if (heroElement) {
          heroElement.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
      }, 100)
    }
  }, [location.hash])
  
  
  const forUniversitiesPage = content?.forUniversitiesPage || defaultContent.forUniversitiesPage!

  // Используем данные из БД
  const pageContent = forUniversitiesPage

  // Helper для получения integrationFormats
  const getIntegrationFormats = () => {
    if (pageContent.integrationFormats && pageContent.integrationFormats.length > 0) {
      return pageContent.integrationFormats
    }
    return []
  }

  // Helper для получения processSteps
  const getProcessSteps = () => {
    if (pageContent.processSteps && pageContent.processSteps.length > 0) {
      return pageContent.processSteps
    }
    return []
  }

  const integrationFormats = getIntegrationFormats()
  const processSteps = getProcessSteps()

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

  // Функция для получения краткого текста - только ключевая информация
  const getShortDescription = (description: string) => {
    // Берем только первое предложение или первые 80-100 символов
    const firstSentenceEnd = description.indexOf('.')
    if (firstSentenceEnd > 0 && firstSentenceEnd < 100) {
      return description.substring(0, firstSentenceEnd + 1)
    }
    // Если первое предложение слишком длинное, берем первые 80 символов
    if (description.length > 80) {
      const cutPoint = description.substring(0, 80).lastIndexOf(' ')
      if (cutPoint > 50) {
        return description.substring(0, cutPoint) + '...'
      }
      return description.substring(0, 70) + '...'
    }
    return description
  }

  return (
    <div className="min-h-screen bg-white">
      <TopBar />
      <Header />

      {/* Hero Section */}
      <section id="hero" className="pt-4 sm:pt-8 lg:pt-12 pb-6 sm:pb-8 lg:pb-12 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-7xl mx-auto">
            <div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 mb-4 sm:mb-6 lg:mb-8 relative inline-block">
                <span className="absolute -top-4 sm:-top-6 lg:-top-8 left-0 w-full h-0.5 bg-[#DD0000]"></span>
                {pageContent.hero.title}
              </h1>
            </div>
            <p className="text-sm sm:text-base lg:text-lg xl:text-xl text-gray-700 mb-6 sm:mb-8 lg:mb-12 leading-relaxed max-w-4xl">
              {pageContent.hero.description}
            </p>

            {/* Image Banner with Overlay and Cards */}
            <div className="relative mb-6 sm:mb-8 lg:mb-12">
              {/* Image Container */}
              <div className="relative w-full min-h-[400px] sm:min-h-[500px] lg:min-h-[700px] xl:min-h-[800px] rounded-lg overflow-hidden">
                {/* Background Image */}
                <img 
                  src="/for uni.JPG" 
                  alt="University students"
                  loading="lazy" 
                  className="w-full h-full object-cover absolute inset-0"
                />
                
                {/* Dark Overlay for entire image - отдельный элемент */}
                <div className="absolute inset-0 bg-black bg-opacity-50 z-0"></div>
                
                {/* Title - всегда на изображении (только на мобильных) */}
                <div className="lg:hidden absolute bottom-0 left-0 right-0 z-10 px-4 sm:px-6 pb-4 sm:pb-6">
                  <h2 className="text-lg sm:text-xl font-bold text-white">
                    {pageContent.benefitsTitle}
                  </h2>
                </div>

                {/* Cards - только на десктопе внутри изображения */}
                <div className="hidden lg:block absolute bottom-0 left-0 right-0 z-10 px-8 xl:px-12 pb-8 xl:pb-12">
                  <div className="mb-4 lg:mb-6 xl:mb-8">
                    <h2 className="text-2xl xl:text-3xl font-bold text-white">
                      {pageContent.benefitsTitle}
                    </h2>
                  </div>
                  <div className="grid grid-cols-4 gap-6">
                    {(pageContent.benefits || []).map((benefit, index) => {
                      const isLongText = benefit.description.length > 80 || (benefit.list && benefit.list.length > 0)
                      const shortDescription = getShortDescription(benefit.description)
                      
                      return (
                        <div key={index} className="bg-white p-6 lg:p-8 rounded-lg shadow-lg flex flex-col h-full">
                          <h3 className="text-base lg:text-lg font-bold text-gray-900 mb-3 min-h-[3rem] flex items-start">
                            {benefit.title}
                          </h3>
                          <div className="w-12 h-0.5 bg-[#DD0000] mb-4 flex-shrink-0"></div>
                          <div className="flex-grow flex flex-col">
                            <p className="text-sm lg:text-base text-gray-700 mb-3 leading-relaxed min-h-[3rem]">
                              {isLongText ? shortDescription : benefit.description}
                            </p>
                            <div className="mt-auto pt-2">
                              {isLongText && (
                                <button
                                  onClick={() => setSelectedBenefit(benefit)}
                                  className="text-sm font-semibold text-[#DD0000] hover:underline inline-flex items-center gap-1"
                                >
                                  {language === 'ru' ? 'Подробнее' : language === 'kz' ? 'Толығырақ' : 'Learn more'}
                                  <span>→</span>
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>

              {/* Cards - только на мобильных ниже изображения */}
              <div className="lg:hidden mt-4 sm:mt-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  {(pageContent.benefits || []).map((benefit, index) => {
                    const isLongText = benefit.description.length > 80 || (benefit.list && benefit.list.length > 0)
                    const shortDescription = getShortDescription(benefit.description)
                    
                    return (
                      <div key={index} className="bg-white p-4 sm:p-6 rounded-lg shadow-lg flex flex-col h-full">
                        <h3 className="text-sm sm:text-base font-bold text-gray-900 mb-2 sm:mb-3 min-h-[2.5rem] flex items-start">
                          {benefit.title}
                        </h3>
                        <div className="w-10 sm:w-12 h-0.5 bg-[#DD0000] mb-2 sm:mb-3 flex-shrink-0"></div>
                        <div className="flex-grow flex flex-col">
                          <p className="text-xs sm:text-sm text-gray-700 mb-2 sm:mb-3 leading-relaxed min-h-[2.5rem]">
                            {isLongText ? shortDescription : benefit.description}
                          </p>
                          <div className="mt-auto pt-2">
                            {isLongText && (
                              <button
                                onClick={() => setSelectedBenefit(benefit)}
                                className="text-xs sm:text-sm font-semibold text-[#DD0000] hover:underline inline-flex items-center gap-1"
                              >
                                {language === 'ru' ? 'Подробнее' : language === 'kz' ? 'Толығырақ' : 'Learn more'}
                                <span>→</span>
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Benefits Section */}
      {pageContent.additionalBenefitsTitle && pageContent.additionalBenefits && pageContent.additionalBenefits.length > 0 && (
        <section className="py-8 sm:py-12 lg:py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 mb-6 sm:mb-8 lg:mb-12">
                {pageContent.additionalBenefitsTitle}
              </h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
                {pageContent.additionalBenefits.map((benefit, index) => (
                  <div key={index} className="bg-white p-6 lg:p-8 rounded-lg shadow-lg flex flex-col h-full border-2 border-gray-100 hover:border-[#DD0000] transition-all">
                    <h3 className="text-base lg:text-lg font-bold text-gray-900 mb-3 min-h-[3rem] flex items-start">
                      {benefit.title}
                    </h3>
                    <div className="w-12 h-0.5 bg-[#DD0000] mb-4 flex-shrink-0"></div>
                    <div className="flex-grow flex flex-col">
                      <p className="text-sm lg:text-base text-gray-700 leading-relaxed">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Integration Formats Section */}
      <section className="py-8 sm:py-12 lg:py-16 xl:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 mb-6 sm:mb-8 lg:mb-12">
              {pageContent.integrationFormatsTitle}
            </h2>

            <div className="space-y-4 sm:space-y-6 lg:space-y-8">
              {integrationFormats.map((format, index) => (
                <div key={index} className="bg-gray-100 p-4 sm:p-6 lg:p-8 xl:p-10 rounded-lg">
                  <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-2 sm:mb-3 lg:mb-4">
                    {format.title}
                  </h3>
                  <div className="w-10 sm:w-12 h-0.5 bg-[#DD0000] mb-3 sm:mb-4 lg:mb-6"></div>
                  <p className="text-sm sm:text-base lg:text-lg font-semibold text-gray-900 mb-2">
                    {format.bestFor} <span className="font-normal">{format.bestForText}</span>
                  </p>
                  <p className="text-sm sm:text-base lg:text-lg text-gray-700 mb-4 sm:mb-6 leading-relaxed">
                    {format.description}
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
                    {format.howUsed && (
                      <div>
                        <p className="text-sm sm:text-base lg:text-lg font-semibold text-gray-900 mb-2 sm:mb-3">
                          {format.howUsed.header}
                        </p>
                        <ul className="space-y-1.5 sm:space-y-2 text-sm sm:text-base lg:text-lg text-gray-700">
                          {format.howUsed.list.map((item, idx) => (
                            <li key={idx} className="flex items-start">
                              <span className="text-gray-400 mr-2 flex-shrink-0">•</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {format.whatWeManage && (
                      <div>
                        <p className="text-sm sm:text-base lg:text-lg font-semibold text-gray-900 mb-2 sm:mb-3">
                          {format.whatWeManage.header}
                        </p>
                        <ul className="space-y-1.5 sm:space-y-2 text-sm sm:text-base lg:text-lg text-gray-700">
                          {format.whatWeManage.list.map((item, idx) => (
                            <li key={idx} className="flex items-start">
                              <span className="text-gray-400 mr-2 flex-shrink-0">•</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {format.themes && (
                      <div>
                        <p className="text-sm sm:text-base lg:text-lg font-semibold text-gray-900 mb-2 sm:mb-3">
                          {format.themes.header}
                        </p>
                        <ul className="space-y-1.5 sm:space-y-2 text-sm sm:text-base lg:text-lg text-gray-700">
                          {format.themes.list.map((item, idx) => (
                            <li key={idx} className="flex items-start">
                              <span className="text-gray-400 mr-2 flex-shrink-0">•</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {format.idealUses && (
                      <div>
                        <p className="text-sm sm:text-base lg:text-lg font-semibold text-gray-900 mb-2 sm:mb-3">
                          {format.idealUses.header}
                        </p>
                        <ul className="space-y-1.5 sm:space-y-2 text-sm sm:text-base lg:text-lg text-gray-700">
                          {format.idealUses.list.map((item, idx) => (
                            <li key={idx} className="flex items-start">
                              <span className="text-gray-400 mr-2 flex-shrink-0">•</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {format.integration && (
                      <div>
                        <p className="text-sm sm:text-base lg:text-lg font-semibold text-gray-900 mb-2 sm:mb-3">
                          {format.integration.header}
                        </p>
                        <ul className="space-y-1.5 sm:space-y-2 text-sm sm:text-base lg:text-lg text-gray-700">
                          {format.integration.list.map((item, idx) => (
                            <li key={idx} className="flex items-start">
                              <span className="text-gray-400 mr-2 flex-shrink-0">•</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {format.includes && (
                      <div>
                        <p className="text-sm sm:text-base lg:text-lg font-semibold text-gray-900 mb-2 sm:mb-3">
                          {format.includes.header}
                        </p>
                        <ul className="space-y-1.5 sm:space-y-2 text-sm sm:text-base lg:text-lg text-gray-700">
                          {format.includes.list.map((item, idx) => (
                            <li key={idx} className="flex items-start">
                              <span className="text-gray-400 mr-2 flex-shrink-0">•</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                  {format.note && (
                    <p className="text-sm sm:text-base lg:text-lg text-gray-700 mt-4 sm:mt-6 lg:mt-8 font-bold">
                      {format.note}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How the Process Works Section with CTA */}
      <section className="py-8 sm:py-12 lg:py-16 xl:py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-7xl mx-auto">
            {/* Title */}
            <div className="mb-6 sm:mb-8 lg:mb-12">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-black mb-2 sm:mb-3 lg:mb-4 inline-block">
                {pageContent.processTitle}
              </h2>
              <div className="w-10 sm:w-12 h-0.5 sm:h-1 bg-[#DD0000]"></div>
            </div>

            {/* 2x3 Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6 mb-8 sm:mb-12 lg:mb-16">
              {processSteps.map((step, index) => (
                <div key={index} className="bg-black p-4 sm:p-6 lg:p-8 rounded-lg">
                  <h3 className="text-white text-xs sm:text-sm lg:text-base font-semibold mb-2">Step {index + 1}</h3>
                  <h4 className="text-white text-base sm:text-lg lg:text-xl font-bold mb-2 sm:mb-3 lg:mb-4">
                    {step.title}
                    <div className="w-10 sm:w-12 h-0.5 bg-[#DD0000] mt-2"></div>
                  </h4>
                  {step.header && (
                    <p className="text-white text-xs sm:text-sm lg:text-base font-semibold mb-2">
                      {step.header}
                    </p>
                  )}
                  {step.description && (
                    <p className="text-white text-xs sm:text-sm lg:text-base leading-relaxed">
                      {step.description}
                    </p>
                  )}
                  {step.list && step.list.length > 0 && (
                    <ul className="space-y-1 text-xs sm:text-sm lg:text-base text-white">
                      {step.list.map((item, idx) => (
                        <li key={idx} className="flex items-start">
                          <span className="text-white mr-2 flex-shrink-0">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>

            {/* CTA Banner */}
            <div className="bg-black p-6 sm:p-8 lg:p-12 xl:p-16 text-center rounded-lg">
              <h2 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-white mb-3 sm:mb-4 lg:mb-6 max-w-4xl mx-auto px-2">
                {pageContent.cta.title}
              </h2>
              <p className="text-sm sm:text-base lg:text-lg xl:text-xl text-white mb-4 sm:mb-6 lg:mb-8 max-w-3xl mx-auto px-2">
                {pageContent.cta.subtitle}
              </p>
              <Link 
                to="/contacts#hero"
                className="inline-block text-white text-sm sm:text-base lg:text-lg font-bold hover:opacity-80 transition underline decoration-[#DD0000] decoration-2 underline-offset-2 sm:underline-offset-4 px-2"
              >
                {pageContent.cta.buttonText}
              </Link>
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

      {/* Modal for Benefit Details */}
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
              <button
                onClick={() => setSelectedBenefit(null)}
                className="mb-4 text-gray-600 hover:text-gray-900 transition flex items-center gap-2 text-sm font-semibold"
              >
                <span>←</span>
                {language === 'ru' ? 'Назад' : language === 'kz' ? 'Артқа' : 'Back'}
              </button>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                {selectedBenefit.title}
              </h2>
              <div className="w-12 h-0.5 bg-[#DD0000] mb-6"></div>
              
              <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-6">
                {selectedBenefit.description}
              </p>

              {selectedBenefit.list && selectedBenefit.list.length > 0 && (
                <ul className="space-y-2 text-base sm:text-lg text-gray-700">
                  {selectedBenefit.list.map((item, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="text-gray-700 mr-2 flex-shrink-0">—</span>
                      <span>{item}</span>
                    </li>
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

export default ForUniversities

