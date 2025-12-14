import { Link, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
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
            <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 mb-2 sm:mb-3">
              {founderPage.practitionerTitle}
            </h2>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 mb-6 sm:mb-8">
              {founderPage.practitionerSubtitle}
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
                  <div className="border-t border-gray-700 w-full mb-3 sm:mb-4"></div>
                  <Link 
                    to="/methodology#hero"
                    className="text-xs sm:text-sm lg:text-base font-semibold hover:underline flex items-center gap-2"
                  >
                    {card.linkText}
                    <span>→</span>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Certificates Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
              {/* Certificate 1 */}
              <div className="aspect-[3/4] overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition">
                <img
                  src="/cerf1.jpg"
                  alt="Certificate 1"
                  className="w-full h-full object-contain bg-white"
                />
              </div>

              {/* Certificate 2 */}
              <div className="aspect-[3/4] overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition">
                <img
                  src="/cerf2.PNG"
                  alt="Certificate 2"
                  className="w-full h-full object-contain bg-white"
                />
              </div>

              {/* Certificate 3 */}
              <div className="aspect-[3/4] overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition">
                <img
                  src="/cerf3.jpg"
                  alt="Certificate 3"
                  className="w-full h-full object-contain bg-white"
                />
              </div>

              {/* Certificate 4 */}
              <div className="aspect-[3/4] overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition">
                <img
                  src="/cerft4.jpg"
                  alt="Certificate 4"
                  className="w-full h-full object-contain bg-white"
                />
              </div>
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

                <div className="space-y-4 sm:space-y-6 text-gray-700 text-sm sm:text-base leading-relaxed">
                  <p>{founderPage.biography.paragraph1}</p>
                  <p>{founderPage.biography.paragraph2}</p>
                </div>
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

            {/* Black Box at Bottom */}
            <div className="mt-8 sm:mt-12 bg-black text-white p-6 sm:p-8 lg:p-10 rounded-lg">
              <p className="text-sm sm:text-base lg:text-lg leading-relaxed">
                {founderPage.biography.bottomText}
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default Founder

