import { useLanguage } from '../contexts/LanguageContext'

const Footer = () => {
  const { language } = useLanguage()

  // Локализация футера
  const getTexts = () => {
    switch(language) {
      case 'ru':
        return {
          contacts: 'Контакты',
          navigation: 'Навигация',
          home: 'Главная',
          program: 'Программа',
          blog: 'Блог',
          founder: 'Основатель',
          cases: 'Кейсы',
          contactsLink: 'Контакты',
          rights: '© 2026 iNTECA Все права защищены.'
        }
      case 'kz':
        return {
          contacts: 'Байланыс',
          navigation: 'Навигация',
          home: 'Басты бет',
          program: 'Бағдарлама',
          blog: 'Блог',
          founder: 'Негізін қалаушы',
          cases: 'Кейстер',
          contactsLink: 'Байланыс',
          rights: '© 2026 iNTECA Барлық құқықтар қорғалған.'
        }
      case 'en':
      default:
        return {
          contacts: 'Contacts',
          navigation: 'Navigation',
          home: 'Home',
          program: 'Program',
          blog: 'Blog',
          founder: 'Founder',
          cases: 'Cases',
          contactsLink: 'Contacts',
          rights: '© 2026 iNTECA All rights reserved.'
        }
    }
  }

  const texts = getTexts()

  return (
    <footer className="bg-black text-white py-8 sm:py-12">
      <div className="container mx-auto px-4">
        {/* Logo and Slogan */}
        <div className="mb-8 sm:mb-12">
          <div className="mb-3 sm:mb-4">
            <img 
              src="/inTECA logo white.svg" 
              alt="INTECA Logo" 
              className="h-16 sm:h-20 lg:h-24"
            />
          </div>
          
          {/* Слоган */}
          <div>
            <p className="text-white text-xs sm:text-sm font-medium tracking-wide">
              InTECA — INTELLEGENCE<span className="text-[#DD0000]">|</span>EDUCATION<span className="text-[#DD0000]">|</span>AMBITIONS
            </p>
          </div>
        </div>

        {/* Contacts and Navigation on same level */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 mb-8 sm:mb-12">
          {/* Contacts */}
          <div>
            <h3 className="font-bold mb-3 sm:mb-4 text-sm sm:text-base">{texts.contacts}</h3>
            <p className="text-gray-300 mb-1 text-sm sm:text-base">Inteca.kz@gmail.com </p>
            <p className="text-gray-300 mb-4 sm:mb-6 text-sm sm:text-base">+7 (708) 647 5295</p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-bold mb-3 sm:mb-4 text-sm sm:text-base">{texts.navigation}</h3>
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <div className="space-y-1.5 sm:space-y-2">
                <a href="/" className="block text-sm sm:text-base text-gray-300 hover:text-white transition">{texts.home}</a>
                <a href="/about" className="block text-sm sm:text-base text-gray-300 hover:text-white transition">{texts.program}</a>
                <a href="/blog" className="block text-sm sm:text-base text-gray-300 hover:text-white transition">{texts.blog}</a>
                <a href="/contacts" className="block text-sm sm:text-base text-gray-300 hover:text-white transition">{texts.contactsLink}</a>
              </div>
              <div className="space-y-1.5 sm:space-y-2">
                <a href="/founder" className="block text-sm sm:text-base text-gray-300 hover:text-white transition">{texts.founder}</a>
                <a href="/methodology" className="block text-sm sm:text-base text-gray-300 hover:text-white transition">{texts.cases}</a>
                <a href="/for-corporate-clients" className="block text-sm sm:text-base text-gray-300 hover:text-white transition">{language === 'ru' ? 'Для корпоративных клиентов' : language === 'kz' ? 'Корпоративтік клиенттер үшін' : 'For Corporate Clients'}</a>
                <a href="/for-students" className="block text-sm sm:text-base text-gray-300 hover:text-white transition">{language === 'ru' ? 'Для студентов' : language === 'kz' ? 'Студенттер үшін' : 'For Students'}</a>
                <a href="/for-universities" className="block text-sm sm:text-base text-gray-300 hover:text-white transition">{language === 'ru' ? 'Для университетов' : language === 'kz' ? 'Университеттер үшін' : 'For Universities'}</a>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 pt-6 sm:pt-8 text-center">
          <p className="text-xs sm:text-sm text-gray-400">
            {texts.rights}
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer

