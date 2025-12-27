import { Link, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import TopBar from '../components/TopBar'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { useContent } from '../hooks/useContentQuery'
import { useLanguage } from '../contexts/LanguageContext'
import { defaultContent } from '../types/content'

const Founder = () => {
  const { language } = useLanguage()
  const { data: content } = useContent(language)
  const founderPage = content?.founderPage || defaultContent.founderPage!
  const location = useLocation()
  const [isBiographyModalOpen, setIsBiographyModalOpen] = useState(false)

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
    if (isBiographyModalOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isBiographyModalOpen])

  // Функция для получения краткого текста биографии
  const getShortBiography = () => {
    // Берем только первые два предложения из paragraph1
    const firstSentenceEnd = founderPage.biography.paragraph1.indexOf('.')
    if (firstSentenceEnd > 0) {
      const firstPart = founderPage.biography.paragraph1.substring(0, firstSentenceEnd + 1)
      const secondSentenceEnd = founderPage.biography.paragraph1.indexOf('.', firstSentenceEnd + 1)
      if (secondSentenceEnd > 0) {
        return founderPage.biography.paragraph1.substring(0, secondSentenceEnd + 1)
      }
      return firstPart
    }
    // Если нет точки, берем первые 200 символов
    return founderPage.biography.paragraph1.substring(0, 200) + '...'
  }

  return (
    <div className="min-h-screen bg-white">
      <TopBar />
      <Header />

      {/* Hero Section */}
      <section id="hero" className="pt-16 sm:pt-20 lg:pt-24 pb-16 sm:pb-20 lg:pb-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-[480px_1fr] gap-8 lg:gap-12 items-start">
              {/* Image - увеличенная */}
              <div className="w-full max-w-md lg:max-w-none mx-auto lg:mx-0">
                <img
                  src={founderPage.hero.image}
                  alt="Oleg Tsoy"
                  className="w-full h-auto rounded-lg"
                />
              </div>

              {/* Content */}
              <div>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-black text-gray-900 mb-2 whitespace-nowrap">
                  {founderPage.hero.title}
                </h1>
                <div className="border-t border-[#DD0000] w-24 sm:w-32 lg:w-40 mb-4 sm:mb-6"></div>

                <p className="text-sm sm:text-base lg:text-lg xl:text-xl text-gray-700 mb-4 sm:mb-6 leading-relaxed">
                  {founderPage.hero.description}
                </p>

                <p className="text-xs sm:text-sm lg:text-base xl:text-lg text-gray-600 mb-6 sm:mb-8 leading-relaxed">
                  {founderPage.hero.secondaryDescription}
                </p>

                {/* Key Facts */}
                <div>
                  <h3 className="text-base sm:text-lg lg:text-xl font-bold text-gray-900 mb-3 sm:mb-4">{founderPage.hero.keyFactsTitle}</h3>
                  <ul className="space-y-2 sm:space-y-3 text-gray-700 text-xs sm:text-sm lg:text-base">
                    {founderPage.hero.keyFacts.map((fact, index) => (
                      <li key={index} className="flex items-start">
                        <span className="mr-2 sm:mr-3 mt-1">•</span>
                        <span>{fact}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Case Method Practitioner Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Title */}
            <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 mb-6 sm:mb-8">
              {founderPage.practitionerTitle ? `${founderPage.practitionerTitle}. ` : ''}{founderPage.practitionerSubtitle}
            </h2>
            <div className="border-t-4 border-[#DD0000] w-32 sm:w-48 mb-8 sm:mb-12"></div>

            {/* Black Box with Description */}
            <div className="bg-black text-white p-6 sm:p-8 lg:p-10 rounded-lg mb-6 sm:mb-8">
              <p className="text-sm sm:text-base lg:text-lg leading-relaxed">
                {founderPage.practitionerDescription}
              </p>
            </div>

            {/* Three Black Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
              {founderPage.cards.map((card, index) => (
                <div key={index} className="bg-black text-white p-5 sm:p-6 lg:p-7 rounded-lg flex flex-col">
                  <h3 className="text-xs sm:text-sm md:text-base font-bold mb-3 sm:mb-4 leading-tight">{card.title}</h3>
                  <p className="text-xs sm:text-sm lg:text-base mb-4 sm:mb-6 leading-relaxed flex-grow">
                    {card.description}
                  </p>
                  {/* Убрана ссылка, так как информация уже полная в карточке */}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* International Certificates Section */}
      {founderPage.internationalCertificates && (
        <section className="py-12 sm:py-16 lg:py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              {/* Title */}
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2 sm:mb-3">
                {founderPage.internationalCertificates.title}
              </h2>
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-gray-800 mb-4 sm:mb-6">
                {founderPage.internationalCertificates.subtitle}
              </h3>
              <div className="w-16 sm:w-20 h-0.5 bg-[#DD0000] mb-6 sm:mb-8"></div>

              {/* Description */}
              <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-4 sm:mb-6">
                {founderPage.internationalCertificates.description}
              </p>

              {/* Certificate Text Box */}
              <div className="bg-white border-2 border-[#DD0000] rounded-lg p-6 sm:p-8 mb-6 sm:mb-8 shadow-lg">
                <p className="text-sm sm:text-base lg:text-lg text-gray-800 leading-relaxed italic font-medium">
                  "{founderPage.internationalCertificates.certificateText}"
                </p>
              </div>

              {/* Conclusion */}
              <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                {founderPage.internationalCertificates.conclusion}
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Teacher Role in Case Learning Section */}
      {founderPage.teacherRoleInCaseLearning && (
        <section className="py-12 sm:py-16 lg:py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              {/* Title */}
              <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
                {founderPage.teacherRoleInCaseLearning.title}
              </h2>
              <div className="w-16 sm:w-20 h-0.5 bg-[#DD0000] mb-6 sm:mb-8"></div>

              {/* Introduction */}
              <p className="text-base sm:text-lg lg:text-xl text-gray-700 leading-relaxed mb-8 sm:mb-10">
                {founderPage.teacherRoleInCaseLearning.introduction}
              </p>

              {/* Steps */}
              <div className="space-y-6 sm:space-y-8">
                {founderPage.teacherRoleInCaseLearning.steps.map((step, index) => {
                  const descriptionParts = step.description.split('\n')
                  const mainDescription = descriptionParts[0]
                  const bulletPoints = descriptionParts.slice(1).filter(p => p.trim())

                  return (
                    <div key={index} className="border-l-4 border-[#DD0000] pl-4 sm:pl-6">
                      <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-900 mb-2 sm:mb-3">
                        {step.title}
                      </h3>
                      {mainDescription && (
                        <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-2">
                          {mainDescription}
                        </p>
                      )}
                      {bulletPoints.length > 0 && (
                        <ul className="list-none space-y-2 sm:space-y-3 mt-3 sm:mt-4 pl-0">
                          {bulletPoints.map((point, pIndex) => (
                            <li key={pIndex} className="flex items-start">
                              <span className="text-[#DD0000] mr-3 sm:mr-4 font-bold text-xl sm:text-2xl flex-shrink-0 mt-1">•</span>
                              <span className="text-base sm:text-lg text-gray-700">{point.trim()}</span>
                            </li>
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
      )}

      {/* Certificates Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
              {/* Certificate 1 */}
              <img
                src="/cerf1.jpg"
                alt="Certificate 1"
                className="w-full h-auto object-cover rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-110 hover:z-10 cursor-pointer"
              />

              {/* Certificate 2 */}
              <img
                src="/cerf.png"
                alt="Certificate 2"
                className="w-full h-auto object-cover rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-110 hover:z-10 cursor-pointer"
              />

              {/* Certificate 3 */}
              <img
                src="/cerf3.jpg"
                alt="Certificate 3"
                className="w-full h-auto object-cover rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-110 hover:z-10 cursor-pointer"
              />

              {/* Certificate 4 */}
              <img
                src="/cerft4.jpg"
                alt="Certificate 4"
                className="w-full h-auto object-cover rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-110 hover:z-10 cursor-pointer"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Biography Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_600px] gap-12 lg:gap-16 items-stretch">
              {/* Text Content */}
              <div className="flex flex-col">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 mb-2">
                  {founderPage.biography.title}
                </h2>
                <div className="border-t border-[#DD0000] w-24 sm:w-32 mb-6 sm:mb-8"></div>

                <div className="space-y-4 sm:space-y-6 text-gray-700 text-base sm:text-lg lg:text-xl leading-relaxed mb-4">
                  <p>{getShortBiography()}</p>
                </div>

                <button
                  onClick={() => setIsBiographyModalOpen(true)}
                  className="text-sm sm:text-base font-semibold text-[#DD0000] hover:underline inline-flex items-center gap-1 self-start"
                >
                  {language === 'ru' ? 'Подробнее' : language === 'kz' ? 'Толығырақ' : 'Learn more'}
                  <span>→</span>
                </button>
              </div>

              {/* Image - на всю высоту */}
              <div className="w-full max-w-lg lg:max-w-none mx-auto lg:mx-0 h-full">
                <img
                  src={founderPage.biography.image}
                  alt="Oleg Tsoy Biography"
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
            </div>

            {/* Educational Path Section */}
            <div className="mt-8 sm:mt-12">
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">
                Путь преподавателя в образовании
              </h3>
              <div className="bg-black text-white p-6 sm:p-8 lg:p-10 rounded-lg mb-6 sm:mb-8">
                <p className="text-sm sm:text-base lg:text-lg leading-relaxed">
                  {founderPage.biography.bottomText}
                </p>
              </div>
              
              {/* Why Teaching Experience Important */}
              <div className="bg-black text-white p-6 sm:p-8 lg:p-10 rounded-lg mb-6 sm:mb-8">
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4 sm:mb-6 pb-2 relative">
                  {founderPage.biography.whyTeachingExperienceImportant.title}
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#DD0000]"></span>
                </h3>
                <p className="text-base sm:text-lg text-gray-300 mb-4">
                  Такой путь — от производственных площадок до Executive MBA — обеспечивает преподавателю исключительное понимание:
                </p>
                <ul className="list-disc list-inside text-base sm:text-lg text-gray-300 space-y-2">
                  {founderPage.biography.whyTeachingExperienceImportant.points.map((point, index) => (
                    <li key={index}>{point}</li>
                  ))}
                </ul>
              </div>

              {/* Why Experience Important for Case Learning */}
              <div className="bg-black text-white p-6 sm:p-8 lg:p-10 rounded-lg mb-6 sm:mb-8">
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4 sm:mb-6 pb-2 relative">
                  {founderPage.biography.whyExperienceImportant.title}
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#DD0000]"></span>
                </h3>
                <p className="text-base sm:text-lg text-gray-300 mb-4">
                  {founderPage.biography.whyExperienceImportant.description}
                </p>
                <ul className="list-disc list-inside text-base sm:text-lg text-gray-300 mb-4 space-y-2">
                  {founderPage.biography.whyExperienceImportant.points.map((point, index) => (
                    <li key={index}>{point}</li>
                  ))}
                </ul>
                <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
                  {founderPage.biography.whyExperienceImportant.conclusion}
                </p>
              </div>

              {/* PreMBA Program Section */}
              {founderPage.preMBAProgram && (
                <div className="bg-black text-white rounded-lg overflow-hidden shadow-xl">
                  <div className="p-6 sm:p-8 lg:p-10 xl:p-12">
                    {/* Program Title */}
                    <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-4 sm:mb-6 pb-2 relative text-white">
                      {founderPage.preMBAProgram.title}
                      <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#DD0000]"></span>
                    </h3>

                    {/* Description */}
                    <p className="text-sm sm:text-base lg:text-lg text-gray-300 leading-relaxed mb-6 sm:mb-8">
                      {founderPage.preMBAProgram.description}
                    </p>

                    {/* Participants */}
                    <div className="bg-gray-900 rounded-lg p-4 sm:p-6 mb-6 sm:mb-8">
                      <p className="text-base sm:text-lg lg:text-xl font-semibold text-white">
                        {founderPage.preMBAProgram.participants}
                      </p>
                    </div>

                    {/* Role */}
                    <p className="text-sm sm:text-base lg:text-lg text-gray-300 leading-relaxed mb-6 sm:mb-8">
                      {founderPage.preMBAProgram.role}
                    </p>

                    {/* Disciplines */}
                    <div className="mb-6 sm:mb-8">
                      <p className="text-sm sm:text-base lg:text-lg font-semibold text-white mb-4 sm:mb-6">
                        Он лично ведёт три ключевые дисциплины:
                      </p>
                      <ul className="space-y-3 sm:space-y-4">
                        {founderPage.preMBAProgram.disciplines.map((discipline, index) => (
                          <li key={index} className="flex items-start">
                            <span className="text-[#DD0000] mr-4 sm:mr-5 font-bold text-lg sm:text-xl flex-shrink-0 mt-1">•</span>
                            <span className="text-white text-base sm:text-lg lg:text-xl">{discipline}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Conclusion */}
                    <div className="border-t border-gray-700 pt-6 sm:pt-8">
                      <p className="text-sm sm:text-base lg:text-lg text-white leading-relaxed italic">
                        {founderPage.preMBAProgram.conclusion}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Modal for Biography Details */}
      {isBiographyModalOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-2 sm:p-4 animate-fadeIn"
          onClick={() => setIsBiographyModalOpen(false)}
        >
          <div 
            className="bg-gray-50 rounded-lg max-w-4xl w-full max-h-[95vh] sm:max-h-[90vh] overflow-y-auto animate-slideUp"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 sm:p-6 lg:p-8 xl:p-12">
              <button
                onClick={() => setIsBiographyModalOpen(false)}
                className="mb-4 text-gray-600 hover:text-gray-900 transition flex items-center gap-2 text-sm font-semibold"
              >
                <span>←</span>
                {language === 'ru' ? 'Назад' : language === 'kz' ? 'Артқа' : 'Back'}
              </button>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                {founderPage.biography.title}
              </h2>
              <div className="border-b-2 border-[#DD0000] w-16 sm:w-20 mb-6"></div>
              
              <div className="space-y-4 sm:space-y-6 text-gray-700 leading-relaxed">
                <p className="text-lg sm:text-xl lg:text-2xl font-semibold">
                  Разнообразное и уникальное образование преподавателя. Наш преподаватель обладает редким сочетанием юридического, финансового, управленческого и международного бизнес-образования.
                </p>
                <p className="text-base sm:text-lg">
                  {founderPage.biography.paragraph1}
                </p>
                <p className="text-base sm:text-lg">{founderPage.biography.paragraph2}</p>
                
                {/* Education Timeline */}
                <div className="mt-8 sm:mt-12">
                  <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-6 sm:mb-8 relative inline-block">
                    {founderPage.biography.educationTimeline.title}
                    <span className="absolute -bottom-2 left-0 w-full h-0.5 bg-[#DD0000]"></span>
                  </h3>
                  
                  <div className="relative">
                    {/* Vertical Timeline Line */}
                    <div className="absolute left-4 sm:left-6 top-0 bottom-0 w-0.5 bg-[#DD0000]"></div>
                    
                    {/* Timeline Items */}
                    <div className="space-y-8 sm:space-y-10">
                      {founderPage.biography.educationTimeline.items.map((item, index) => (
                        <div key={index} className="relative pl-12 sm:pl-16">
                          {/* Timeline Dot */}
                          <div className="absolute left-2 sm:left-4 top-2 w-4 h-4 sm:w-5 sm:h-5 bg-[#DD0000] rounded-full border-4 border-white shadow-lg"></div>
                          
                          {/* Content Card */}
                          <div className="bg-white border-2 border-gray-200 rounded-lg p-4 sm:p-6 hover:border-[#DD0000] transition-all duration-300 hover:shadow-lg">
                            {item.period && (
                              <div className="text-lg sm:text-xl font-bold text-[#DD0000] mb-2">
                                {item.period}
                              </div>
                            )}
                            <h4 className="text-base sm:text-lg lg:text-xl font-bold text-gray-900 mb-2">
                              {item.institution}
                            </h4>
                            {item.specialty && (
                              <p className="text-sm sm:text-base text-gray-600 mb-2 font-medium">
                                {item.specialty}
                              </p>
                            )}
                            {item.details && (
                              <p className="text-sm sm:text-base text-gray-500 mb-2 italic">
                                {item.details}
                              </p>
                            )}
                            <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                              {item.description}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  )
}

export default Founder

