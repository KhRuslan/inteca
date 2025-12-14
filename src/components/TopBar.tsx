import { Link } from 'react-router-dom'
import { useLanguage } from '../contexts/LanguageContext'

type Language = 'ru' | 'en' | 'kz'

const TopBar = () => {
  const { language, setLanguage } = useLanguage()

  const navLinks = {
    ru: {
      universities: 'Для университетов',
      corporate: 'Для корпоративных клиентов',
      students: 'Для студентов'
    },
    en: {
      universities: 'For Universities',
      corporate: 'For Corporate Clients',
      students: 'For Students'
    },
    kz: {
      universities: 'Университеттер үшін',
      corporate: 'Корпоративтік клиенттер үшін',
      students: 'Студенттер үшін'
    }
  }

  const langMap: Record<string, Language> = {
    'KZ': 'kz',
    'RU': 'ru',
    'EN': 'en'
  }

  const reverseLangMap: Record<Language, string> = {
    'kz': 'KZ',
    'ru': 'RU',
    'en': 'EN'
  }

  const links = navLinks[language]

  return (
    <div className="bg-black text-white py-2">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center gap-2">
          {/* Left side - Navigation links */}
          {/* Mobile: centered, no scroll */}
          {/* Desktop: left aligned */}
          <div className="flex-1 lg:flex-initial flex items-center justify-center lg:justify-start gap-1.5 sm:gap-2 lg:gap-6 text-[10px] sm:text-xs lg:text-sm whitespace-nowrap">
            <Link to="/for-universities" className="hover:text-gray-300 transition">{links.universities}</Link>
            <Link to="/for-corporate-clients" className="hover:text-gray-300 transition">{links.corporate}</Link>
            <Link to="/for-students" className="hover:text-gray-300 transition">{links.students}</Link>
          </div>

          {/* Right side - Language selector (Desktop only) */}
          <div className="hidden lg:flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
            {['KZ', 'RU', 'EN'].map((lang) => (
              <button
                key={lang}
                onClick={() => setLanguage(langMap[lang])}
                className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-white flex items-center justify-center text-xs font-medium transition ${
                  reverseLangMap[language] === lang
                    ? 'bg-white text-gray-900'
                    : 'bg-transparent text-white hover:bg-gray-800'
                }`}
              >
                {lang}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default TopBar

