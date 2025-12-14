import { useState, useEffect } from 'react'
import { useLocation, Link } from 'react-router-dom'
import TopBar from '../components/TopBar'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { useContent } from '../hooks/useContentQuery'
import { useLanguage } from '../contexts/LanguageContext'
import { defaultContent, MethodologyCase } from '../types/content'

const MethodologyCases = () => {
  const { language } = useLanguage()
  const { data: content } = useContent(language)
  const methodologyPage = content?.methodologyPage || defaultContent.methodologyPage!
  const [selectedCase, setSelectedCase] = useState<MethodologyCase | null>(null)
  const location = useLocation()

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

  // Блокировка скролла при открытии модального окна
  useEffect(() => {
    if (selectedCase) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [selectedCase])

  // Переводы для легенды диаграммы
  const getLegendLabels = () => {
    switch(language) {
      case 'ru':
        return {
          strategicLearning: 'Стратегическое обучение',
          leadershipTraining: 'Обучение лидерству',
          advisoryTransformation: 'Консалтинг и трансформация'
        }
      case 'kz':
        return {
          strategicLearning: 'Стратегиялық оқыту',
          leadershipTraining: 'Көшбасшылыққа оқыту',
          advisoryTransformation: 'Консалтинг және трансформация'
        }
      case 'en':
      default:
        return {
          strategicLearning: 'Strategic Learning',
          leadershipTraining: 'Leadership Training',
          advisoryTransformation: 'Advisory & Transformation'
        }
    }
  }

  const legendLabels = getLegendLabels()

  return (
    <div className="min-h-screen bg-white">
      <TopBar />
      <Header />

      {/* Hero Section */}
      <section id="hero" className="pt-24 sm:pt-28 lg:pt-32 pb-8 sm:pb-10 lg:pb-12 min-h-screen flex items-start bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-12 lg:gap-16 items-start">
              {/* Text Content */}
              <div>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 mb-6 leading-tight">
                  {methodologyPage.hero.title}
                </h1>
                <div className="border-t-2 border-[#DD0000] w-full mb-8"></div>

                <p className="text-xl sm:text-2xl lg:text-3xl text-gray-700 mb-10 leading-relaxed">
                  {methodologyPage.hero.description}
                </p>

                <Link to="/contacts#hero" className="text-2xl sm:text-3xl font-bold text-gray-900 hover:text-[#DD0000] transition inline-flex items-center gap-3 border-b-2 border-[#DD0000] pb-1">
                  {methodologyPage.hero.buttonText}
                  <span>→</span>
                </Link>
              </div>

              {/* Donut Chart */}
              <div className="relative mx-auto bg-black p-10 rounded-lg flex flex-col items-center justify-center">
                <div className="w-64 h-64 relative mb-6">
                  {/* Donut chart visualization */}
                  <svg viewBox="0 0 100 100" className="w-full h-full">
                    <circle cx="50" cy="50" r="40" fill="none" stroke="#4B5563" strokeWidth="20"/>
                    <circle cx="50" cy="50" r="40" fill="none" stroke="#9CA3AF" strokeWidth="20" 
                            strokeDasharray="75 251" strokeDashoffset="0" transform="rotate(-90 50 50)"/>
                    <circle cx="50" cy="50" r="40" fill="none" stroke="#DD0000" strokeWidth="20" 
                            strokeDasharray="100 251" strokeDashoffset="-75" transform="rotate(-90 50 50)"/>
                  </svg>
                </div>
                {/* Legend */}
                <div className="space-y-3 text-base sm:text-lg text-white w-full max-w-sm">
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 flex-shrink-0 bg-[#DD0000]"></div>
                    <span className="leading-tight">{legendLabels.strategicLearning}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 flex-shrink-0 bg-gray-400"></div>
                    <span className="leading-tight">{legendLabels.leadershipTraining}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 flex-shrink-0 bg-gray-600"></div>
                    <span className="leading-tight">{legendLabels.advisoryTransformation}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-8 sm:py-10 lg:py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto space-y-10">
            {methodologyPage.benefits.map((benefit, index) => {
              // SVG icons для каждой секции
              const icons = [
                // Real Decision-Making - shield
                <path key="shield" d="M12 2L3 7v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-9-5z"/>,
                // Structured Thinking First - grid
                <path key="grid" d="M4 4h4v4H4V4zm6 0h4v4h-4V4zm6 0h4v4h-4V4zM4 10h4v4H4v-4zm6 0h4v4h-4v-4zm6 0h4v4h-4v-4zM4 16h4v4H4v-4zm6 0h4v4h-4v-4zm6 0h4v4h-4v-4z"/>,
                // Leadership Under Pressure - heart
                <path key="heart" d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>,
                // Global → Local - globe
                <path key="globe" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
              ]

              // Функция для рендера заголовка с красной стрелкой для "Global → Local"
              const renderTitle = (title: string) => {
                if (title.includes('→')) {
                  const parts = title.split('→')
                  return (
                    <>
                      {parts[0].trim()} <span className="text-[#DD0000]">→</span> {parts[1].trim()}
                    </>
                  )
                }
                return title
              }

              return (
                <div key={index} className="flex items-center gap-3 sm:gap-4 lg:gap-6">
              <div className="flex-1 min-w-0">
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 block">
                      {renderTitle(benefit.title)}
                </h2>
                    <p className="text-base sm:text-lg lg:text-xl text-gray-700 leading-relaxed mb-3">
                      {benefit.description}
                </p>
                    <div className="border-t-2 border-[#DD0000] w-full"></div>
              </div>
                  <div className="flex-shrink-0 w-20 h-20 bg-black rounded-full flex items-center justify-center">
                    {index === 0 ? (
                      // Первая иконка - graduation cap (PNG)
                      <img 
                        src="/fi-rr-graduation-cap.png" 
                        alt="" 
                        className="w-10 h-10 object-contain"
                      />
                    ) : (
                      // Остальные иконки - SVG
                      <svg className="w-10 h-10 text-[#DD0000]" fill="currentColor" viewBox="0 0 24 24">
                        {icons[index]}
                      </svg>
                    )}
              </div>
              </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Methodology & Cases Section */}
      <section className="py-16 sm:py-20 lg:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 mb-12 text-center">
              {methodologyPage.casesTitle}
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {methodologyPage.cases.map((caseItem, index) => (
                <div 
                  key={index} 
                  className={`bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition cursor-pointer ${
                    index === methodologyPage.cases.length - 1 ? 'sm:col-span-2 lg:col-span-3' : ''
                  }`}
                >
                <h3 className="text-xl font-bold text-gray-900 mb-2 border-b-2 border-[#DD0000] pb-2 inline-block">
                    {caseItem.title}
                </h3>
                <p className="text-sm text-gray-600 mt-4 mb-4 leading-relaxed">
                    {caseItem.description}
                </p>
                  <button 
                    onClick={() => setSelectedCase(caseItem)}
                    className="text-sm font-semibold text-gray-900 hover:text-[#DD0000] transition flex items-center gap-2"
                  >
                    {caseItem.linkText}
                  <span>→</span>
                </button>
              </div>
              ))}
            </div>
              </div>
              </div>
      </section>

      {/* Detail Modal */}
      {selectedCase && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-2 sm:p-4 animate-fadeIn"
          onClick={() => setSelectedCase(null)}
        >
          <div 
            className="bg-gray-50 rounded-lg max-w-4xl w-full max-h-[95vh] sm:max-h-[90vh] overflow-y-auto animate-slideUp"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 sm:p-6 lg:p-8 xl:p-12">
              {/* Back Button */}
              <button
                onClick={() => setSelectedCase(null)}
                className="mb-3 sm:mb-4 lg:mb-6 text-gray-600 hover:text-gray-900 transition flex items-center gap-2 text-xs sm:text-sm font-semibold"
              >
                <span>←</span>
                {language === 'ru' ? 'Назад' : language === 'kz' ? 'Артқа' : 'Back'}
                </button>

              {/* Title */}
              <h2 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-bold text-gray-900 mb-2 sm:mb-3 lg:mb-4 leading-tight">
                {selectedCase.title}
              </h2>
              <div className="border-b-2 sm:border-b-4 border-[#DD0000] w-16 sm:w-20 lg:w-24 mb-4 sm:mb-6 lg:mb-8"></div>

              {/* Detailed Description */}
              <div className="mb-4 sm:mb-6 lg:mb-8">
                <p className="text-sm sm:text-base lg:text-lg text-gray-700 leading-relaxed mb-3 sm:mb-4 lg:mb-6">
                  {selectedCase.detailedDescription || selectedCase.description}
                </p>

                {selectedCase.keyFacts && selectedCase.keyFacts.length > 0 && (
                  <>
                    <p className="text-base sm:text-lg font-semibold text-gray-900 mb-2 sm:mb-3 lg:mb-4">
                      {language === 'ru' ? 'Ключевые факты' : language === 'kz' ? 'Негізгі фактілер' : 'Key Facts'}
                    </p>
                    <ul className="space-y-1.5 sm:space-y-2 mb-3 sm:mb-4 lg:mb-6">
                      {selectedCase.keyFacts.map((fact, index) => (
                        <li key={index} className="flex items-start text-sm sm:text-base text-gray-700">
                          <span className="mr-2 sm:mr-3 text-[#DD0000] font-bold flex-shrink-0">—</span>
                          <span>{fact}</span>
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </div>

              {/* Call to Action */}
              {selectedCase.callToAction && (
                <Link 
                  to="/contacts#hero"
                  onClick={() => setSelectedCase(null)}
                  className="bg-white p-3 sm:p-4 lg:p-6 rounded-lg border-l-2 sm:border-l-4 border-[#DD0000] block hover:bg-gray-50 transition cursor-pointer"
                >
                  <p className="text-sm sm:text-base lg:text-lg font-semibold text-gray-900">
                    {selectedCase.callToAction}
                  </p>
                </Link>
              )}
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  )
}

export default MethodologyCases

