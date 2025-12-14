import { Link } from 'react-router-dom'
import { useContent } from '../hooks/useContentQuery'
import { useLanguage } from '../contexts/LanguageContext'
import { defaultContent } from '../types/content'

const CTABanner = () => {
  const { language } = useLanguage()
  const { data: content } = useContent(language)
  const cta = content?.cta || defaultContent.cta

  return (
    <section className="py-8 sm:py-12 lg:py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="relative bg-black py-12 sm:py-16 lg:py-20 overflow-hidden rounded-lg">
      {/* Decorative dots pattern - левый угол (скрыты на мобильных) */}
      <div className="hidden sm:block absolute top-4 sm:top-8 left-4 sm:left-8 opacity-20">
        <div className="grid grid-cols-5 sm:grid-cols-7 gap-1 sm:gap-2">
          {Array.from({ length: 35 }).map((_, i) => (
            <div key={i} className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white rounded-full"></div>
          ))}
        </div>
      </div>
      
      {/* Волнистый декоративный элемент - правый верхний угол (скрыт на мобильных) */}
      <div className="hidden md:block absolute top-4 sm:top-8 right-4 sm:right-8">
        <svg width="100" height="35" viewBox="0 0 120 40" className="sm:w-[120px] sm:h-[40px]" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path 
            d="M 0 20 Q 10 10, 20 20 T 40 20 T 60 20 T 80 20 T 100 20 T 120 20" 
            stroke="white" 
            strokeWidth="4" 
            fill="none"
            opacity="0.3"
            strokeLinecap="round"
          />
          <circle cx="10" cy="20" r="5" fill="white" opacity="0.3"/>
          <circle cx="110" cy="20" r="5" fill="white" opacity="0.3"/>
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-4 text-center">
        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-6 sm:mb-8 max-w-3xl mx-auto leading-tight px-2">
          {cta.title}
        </h2>
        <Link 
          to="/contacts#hero"
          className="bg-white text-[#DD0000] px-6 sm:px-8 lg:px-10 py-2.5 sm:py-3 text-sm sm:text-base font-bold hover:bg-gray-100 transition rounded inline-block"
        >
          {cta.buttonText}
        </Link>
      </div>
        </div>
      </div>
    </section>
  )
}

export default CTABanner

