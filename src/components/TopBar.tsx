import { Link } from 'react-router-dom'
import { useLanguage } from '../contexts/LanguageContext'

const TopBar = () => {
  const { language } = useLanguage()

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

  const links = navLinks[language]

  return (
    <div className="bg-black text-white py-2 sm:py-3">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center lg:justify-start">
          {/* Navigation links - smaller text on mobile to fit in one line */}
          <div className="flex items-center justify-center gap-2 sm:gap-3 lg:gap-6 text-[10px] sm:text-xs lg:text-sm font-medium whitespace-nowrap overflow-x-auto">
            <Link to="/for-universities" className="hover:text-gray-300 transition text-white px-1 sm:px-2 py-1 rounded hover:bg-gray-900 flex-shrink-0">
              {links.universities}
            </Link>
            <Link to="/for-corporate-clients" className="hover:text-gray-300 transition text-white px-1 sm:px-2 py-1 rounded hover:bg-gray-900 flex-shrink-0">
              {links.corporate}
            </Link>
            <Link to="/for-students" className="hover:text-gray-300 transition text-white px-1 sm:px-2 py-1 rounded hover:bg-gray-900 flex-shrink-0">
              {links.students}
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TopBar