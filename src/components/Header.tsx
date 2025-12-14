import { useState, useEffect, useRef } from 'react'
import { useLanguage } from '../contexts/LanguageContext'

type Language = 'ru' | 'en' | 'kz'

const Header = () => {
  const { language, setLanguage } = useLanguage()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [languageMenuOpen, setLanguageMenuOpen] = useState(false)
  const languageMenuRef = useRef<HTMLDivElement>(null)

  // Close language menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (languageMenuRef.current && !languageMenuRef.current.contains(event.target as Node)) {
        setLanguageMenuOpen(false)
      }
    }

    if (languageMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [languageMenuOpen])

  // Removed unused langMap and reverseLangMap

  const languageLabels = {
    ru: { full: 'Русский', short: 'RU' },
    kz: { full: 'Қазақша', short: 'KZ' },
    en: { full: 'English', short: 'EN' }
  }

  // Локализация навигации
  const getNav = () => {
    switch(language) {
      case 'ru':
        return {
          home: 'Главная',
          blog: 'Блог',
          about: 'О нас',
          founder: 'Основатель',
          methodology: 'Методология и кейсы',
          contacts: 'Контакты'
        }
      case 'kz':
        return {
          home: 'Басты бет',
          blog: 'Блог',
          about: 'Біз туралы',
          founder: 'Негізін қалаушы',
          methodology: 'Әдістеме және кейстер',
          contacts: 'Байланыстар'
        }
      case 'en':
      default:
        return {
          home: 'Home',
          blog: 'Blog',
          about: 'About',
          founder: 'Founder',
          methodology: 'Methodology & Cases',
          contacts: 'Contacts'
        }
    }
  }

  const nav = getNav()

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-3">
          {/* Logo */}
          <div className="flex items-center -my-4">
            <a href="/">
              <img 
                src="/inTECA logo black.svg" 
                alt="INTECA Logo" 
                className="h-20 sm:h-24 lg:h-32"
              />
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-4 xl:gap-8">
            <a href="/" className="text-sm xl:text-base text-gray-900 font-medium hover:text-inteca-red transition whitespace-nowrap">
              {nav.home}
            </a>
            <a href="/blog" className="text-sm xl:text-base text-gray-900 font-medium hover:text-inteca-red transition whitespace-nowrap">
              {nav.blog}
            </a>
            <a href="/about" className="text-sm xl:text-base text-gray-900 font-medium hover:text-inteca-red transition whitespace-nowrap">
              {nav.about}
            </a>
            <a href="/founder" className="text-sm xl:text-base text-gray-900 font-medium hover:text-inteca-red transition whitespace-nowrap">
              {nav.founder}
            </a>
            <a href="/methodology" className="text-sm xl:text-base text-gray-900 font-medium hover:text-inteca-red transition whitespace-nowrap">
              {nav.methodology}
            </a>
            <a href="/contacts" className="text-sm xl:text-base text-gray-900 font-medium hover:text-inteca-red transition whitespace-nowrap">
              {nav.contacts}
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-gray-900 hover:text-inteca-red transition"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <nav className="lg:hidden pb-4 border-t border-gray-200 mt-3 pt-3">
            <div className="flex flex-col space-y-3">
              {/* Language Selector - Mobile only */}
              <div className="relative mb-2" ref={languageMenuRef}>
                <button
                  onClick={() => setLanguageMenuOpen(!languageMenuOpen)}
                  className="w-full flex items-center justify-between text-gray-900 font-medium hover:text-inteca-red transition py-2 px-2 border border-gray-300 rounded-md"
                >
                  <span>{languageLabels[language].full}</span>
                  <svg
                    className={`w-5 h-5 transition-transform ${languageMenuOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {/* Language Dropdown */}
                {languageMenuOpen && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-md shadow-lg z-10">
                    {(['ru', 'kz', 'en'] as Language[]).map((lang) => (
                      <button
                        key={lang}
                        onClick={() => {
                          setLanguage(lang)
                          setLanguageMenuOpen(false)
                        }}
                        className={`w-full text-left px-4 py-2 hover:bg-gray-100 transition ${
                          language === lang ? 'bg-inteca-red text-white hover:bg-inteca-red' : 'text-gray-900'
                        } ${lang === 'ru' ? 'rounded-t-md' : ''} ${lang === 'en' ? 'rounded-b-md' : ''}`}
                      >
                        {languageLabels[lang].full}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <a href="/" className="text-gray-900 font-medium hover:text-inteca-red transition py-2" onClick={() => setMobileMenuOpen(false)}>
                {nav.home}
              </a>
              <a href="/blog" className="text-gray-900 font-medium hover:text-inteca-red transition py-2" onClick={() => setMobileMenuOpen(false)}>
                {nav.blog}
              </a>
              <a href="/about" className="text-gray-900 font-medium hover:text-inteca-red transition py-2" onClick={() => setMobileMenuOpen(false)}>
                {nav.about}
              </a>
              <a href="/founder" className="text-gray-900 font-medium hover:text-inteca-red transition py-2" onClick={() => setMobileMenuOpen(false)}>
                {nav.founder}
              </a>
              <a href="/methodology" className="text-gray-900 font-medium hover:text-inteca-red transition py-2" onClick={() => setMobileMenuOpen(false)}>
                {nav.methodology}
              </a>
              <a href="/contacts" className="text-gray-900 font-medium hover:text-inteca-red transition py-2" onClick={() => setMobileMenuOpen(false)}>
                {nav.contacts}
              </a>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}

export default Header

