import { useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import TopBar from '../components/TopBar'
import Header from '../components/Header'
import Footer from '../components/Footer'
import PDFViewer from '../components/PDFViewer'
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
                  loading="lazy"
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
            {/* Grid Layout - Certificate + Content */}
            <div className="grid grid-cols-1 lg:grid-cols-[480px_1fr] gap-8 lg:gap-12 mb-8 sm:mb-12 items-stretch">
              {/* Harvard Certificate - Full Height */}
              <div className="order-2 lg:order-1 flex min-h-[620px]">
                <img
                  src="/cerft4.jpg"
                  alt="Harvard Leadership Development Certificate"
                  className="w-full h-full object-contain rounded-lg shadow-2xl hover:shadow-3xl transition-all duration-300"
                  loading="lazy"
                />
              </div>

              {/* Content */}
              <div className="order-1 lg:order-2 flex flex-col min-h-[620px]">
                {/* Title */}
                <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 mb-6 sm:mb-8">
                  {founderPage.practitionerTitle ? `${founderPage.practitionerTitle}. ` : ''}{founderPage.practitionerSubtitle}
                </h2>
                <div className="border-t-4 border-[#DD0000] w-32 sm:w-48 mb-8 sm:mb-12"></div>

                {/* Black Box with Description */}
                <div className="bg-black text-white p-8 sm:p-10 lg:p-12 rounded-lg flex-grow flex items-center">
                  <p className="text-base sm:text-lg lg:text-xl leading-relaxed">
                    {founderPage.practitionerDescription}
                  </p>
                </div>
              </div>
            </div>

            {/* Three Black Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
              {founderPage.cards.map((card, index) => (
                <div key={index} className="bg-black text-white p-5 sm:p-6 lg:p-7 rounded-lg flex flex-col">
                  <h3 className="text-xs sm:text-sm md:text-base font-bold mb-3 sm:mb-4 leading-tight">{card.title}</h3>
                  <p className="text-xs sm:text-sm lg:text-base mb-4 sm:mb-6 leading-relaxed flex-grow">
                    {card.description}
                  </p>
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

              {/* Grid Layout - Content + Certificates */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-6 sm:mb-8 items-stretch">
                {/* Text Content */}
                <div className="flex flex-col">
                  {/* Description */}
                  <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-4 sm:mb-6">
                    {founderPage.internationalCertificates.description}
                  </p>

                  {/* Certificate Text Box */}
                  <div className="bg-white border-2 border-[#DD0000] rounded-lg p-6 sm:p-8 shadow-lg mb-4 sm:mb-6">
                    <p className="text-sm sm:text-base lg:text-lg text-gray-800 leading-relaxed italic font-medium">
                      "{founderPage.internationalCertificates.certificateText}"
                    </p>
                  </div>

                  {/* Additional Text */}
                  <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                    {founderPage.internationalCertificates.certificationNote}
                  </p>
                </div>

                {/* Certificates Grid */}
                <div className="grid grid-cols-1 gap-6 h-full">
                  <div className="border-2 border-gray-200 rounded-lg shadow-lg hover:shadow-2xl transition-all overflow-hidden">
                    <img
                      src="/cerf.png"
                      alt="Harvard Case Teaching Certificate"
                      className="w-full h-auto block"
                      loading="lazy"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Career Path Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
              {language === 'ru' ? 'Путь от оперативной службы до управления крупными холдингами' : language === 'kz' ? 'Жедел қызметтен ірі холдингтерді басқаруға дейінгі жол' : 'From Law Enforcement to Managing Major Holdings'}
            </h2>
            <div className="w-16 sm:w-20 h-0.5 bg-[#DD0000] mb-8 sm:mb-10"></div>

            <div className="space-y-6 sm:space-y-8">
              {/* Step 1 */}
              <div className="border-l-4 border-[#DD0000] pl-4 sm:pl-6">
                <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-900 mb-2 sm:mb-3">
                  {language === 'ru' ? '1. Начало карьеры — государственная служба' : language === 'kz' ? '1. Мансаптың басталуы — мемлекеттік қызмет' : '1. Career Beginning — Government Service'}
                </h3>
                <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-3">
                  {language === 'ru' ? 'Преподаватель начал свой профессиональный путь с работы в органах внутренних дел:' : language === 'kz' ? 'Оқытушы өзінің кәсіби жолын ішкі қызмет органдарында бастады:' : 'The instructor began his professional career in internal security agencies:'}
                </p>
                <ul className="list-none space-y-2 sm:space-y-3 pl-0 mb-4">
                  {(language === 'ru' ? [
                    'Оперуполномоченный уголовного розыска',
                    'Руководитель отдела уголовного розыска',
                    'В управлении криминальной полиции — оперуполномоченный по особо важным делам по борьбе с киберпреступлениями'
                  ] : language === 'kz' ? [
                    'Қылмыстық іздестіру жедел уәкілі',
                    'Қылмыстық іздестіру бөлімінің басшысы',
                    'Криминалдық полиция басқармасында — киберқылмыстармен күрес бойынша аса маңызды істер жедел уәкілі'
                  ] : [
                    'Criminal Investigation Officer',
                    'Head of Criminal Investigation Department',
                    'In the Criminal Police Division — Senior Officer for Cybercrime Investigation'
                  ]).map((item, i) => (
                    <li key={i} className="flex items-start">
                      <span className="text-[#DD0000] mr-3 sm:mr-4 font-bold text-xl sm:text-2xl flex-shrink-0 mt-1">•</span>
                      <span className="text-base sm:text-lg text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="bg-gray-50 rounded-lg p-4 sm:p-5">
                  <p className="text-sm sm:text-base text-gray-600 italic">
                    {language === 'ru' ? 'Эти годы дали уникальный практический опыт: аналитика, работа с информацией, принятие решений в условиях давления, управление рисками и людьми.' : language === 'kz' ? 'Бұл жылдар бірегей тәжірибе берді: аналитика, ақпаратпен жұмыс, қысым жағдайында шешім қабылдау, тәуекелдер мен адамдарды басқару.' : 'These years provided unique practical experience: analytics, information management, decision-making under pressure, risk and people management.'}
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="border-l-4 border-[#DD0000] pl-4 sm:pl-6">
                <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-900 mb-2 sm:mb-3">
                  {language === 'ru' ? '2. Безопасность и управление рисками в частном секторе' : language === 'kz' ? '2. Жеке секторда қауіпсіздік және тәуекелдерді басқару' : '2. Security and Risk Management in the Private Sector'}
                </h3>
                <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-3">
                  {language === 'ru' ? 'После государственной службы преподаватель перешёл в корпоративный сектор и возглавил службу безопасности Каспийского банка.' : language === 'kz' ? 'Мемлекеттік қызметтен кейін оқытушы корпоративтік секторға ауысып, Каспий банкінің қауіпсіздік қызметін басқарды.' : 'After government service, the instructor transitioned to the corporate sector and headed the security division of Caspian Bank.'}
                </p>
                <div className="bg-gray-50 rounded-lg p-4 sm:p-5">
                  <p className="text-sm sm:text-base text-gray-600 italic">
                    {language === 'ru' ? 'Это дало понимание финансовых процессов, compliance, защиты данных, корпоративной культуры и работы с масштабными бизнес-процессами.' : language === 'kz' ? 'Бұл қаржылық процестерді, compliance, деректерді қорғау, корпоративтік мәдениет және ауқымды бизнес-процестермен жұмыс істеуді түсінуге мүмкіндік берді.' : 'This provided an understanding of financial processes, compliance, data protection, corporate culture, and managing large-scale business operations.'}
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="border-l-4 border-[#DD0000] pl-4 sm:pl-6">
                <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-900 mb-2 sm:mb-3">
                  {language === 'ru' ? '3. Управление производственными холдингами' : language === 'kz' ? '3. Өндірістік холдингтерді басқару' : '3. Managing Industrial Holdings'}
                </h3>
                <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-4">
                  {language === 'ru' ? 'Преподаватель занимал ключевые позиции в крупных отраслях национальной экономики:' : language === 'kz' ? 'Оқытушы ұлттық экономиканың ірі салаларында басты лауазымдарды атқарды:' : 'The instructor held key positions in major sectors of the national economy:'}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
                  <div className="bg-black text-white p-5 sm:p-6 rounded-lg">
                    <h4 className="text-sm sm:text-base font-bold mb-2">
                      {language === 'ru' ? 'Председатель Правления АО «АгромашХолдинг»' : language === 'kz' ? '«АгромашХолдинг» АҚ Басқарма Төрағасы' : 'Chairman of the Board, JSC "AgromashHolding"'}
                    </h4>
                    <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                      {language === 'ru' ? 'Крупнейший производитель зерноуборочной техники в Казахстане. Ответственность: производство, продажи и сервисная сеть по всей стране.' : language === 'kz' ? 'Қазақстандағы ең ірі астық жинау техникасының өндірушісі. Жауапкершілік: өндіріс, сату және бүкіл ел бойынша сервистік желі.' : 'The largest grain harvesting equipment manufacturer in Kazakhstan. Responsibility: production, sales, and a nationwide service network.'}
                    </p>
                  </div>

                  <div className="bg-black text-white p-5 sm:p-6 rounded-lg">
                    <h4 className="text-sm sm:text-base font-bold mb-2">
                      {language === 'ru' ? 'Президент АО «Аллюр Авто»' : language === 'kz' ? '«Аллюр Авто» АҚ Президенті' : 'President, JSC "Allur Auto"'}
                    </h4>
                    <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                      {language === 'ru' ? 'Производство и реализация автомобилей, грузовой и специальной техники. Работа на стыке индустрии, стратегии, маркетинга и операционного управления.' : language === 'kz' ? 'Автомобильдер, жүк және арнайы техника өндірісі мен сатуы. Индустрия, стратегия, маркетинг және операциялық басқару тоғысында жұмыс.' : 'Manufacturing and sales of automobiles, trucks, and special-purpose vehicles. Operating at the intersection of industry, strategy, marketing, and operations management.'}
                    </p>
                  </div>

                  <div className="bg-black text-white p-5 sm:p-6 rounded-lg">
                    <h4 className="text-sm sm:text-base font-bold mb-2">
                      {language === 'ru' ? 'Президент АО «Доступное жильё»' : language === 'kz' ? '«Қолжетімді баспана» АҚ Президенті' : 'President, JSC "Affordable Housing"'}
                    </h4>
                    <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                      {language === 'ru' ? 'Проект строительства индивидуальных жилых домов. Опыт в девелопменте, финансировании, логистике и работе с государственными программами.' : language === 'kz' ? 'Жеке тұрғын үйлер салу жобасы. Девелопмент, қаржыландыру, логистика және мемлекеттік бағдарламалармен жұмыс тәжірибесі.' : 'Individual housing construction project. Experience in development, financing, logistics, and government program coordination.'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Step 4 */}
              <div className="border-l-4 border-[#DD0000] pl-4 sm:pl-6">
                <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-900 mb-2 sm:mb-3">
                  {language === 'ru' ? '4. Член Правления многопрофильного холдинга Caspian Group' : language === 'kz' ? '4. Көпсалалы Caspian Group холдингінің Басқарма мүшесі' : '4. Board Member of the Diversified Caspian Group Holding'}
                </h3>
                <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-3">
                  {language === 'ru' ? 'Работа в холдинге с разными направлениями бизнеса дала:' : language === 'kz' ? 'Бизнестің әртүрлі бағыттары бар холдингтегі жұмыс мыналарды берді:' : 'Working in a holding with diverse business directions provided:'}
                </p>
                <ul className="list-none space-y-2 sm:space-y-3 pl-0">
                  {(language === 'ru' ? [
                    'стратегическое видение',
                    'навыки управления портфелем компаний',
                    'понимание корпоративного управления',
                    'опыт построения бизнес-моделей в разных отраслях',
                    'умение принимать решения на уровне совета директоров'
                  ] : language === 'kz' ? [
                    'стратегиялық көзқарас',
                    'компаниялар портфелін басқару дағдылары',
                    'корпоративтік басқаруды түсіну',
                    'әртүрлі салаларда бизнес-модельдер құру тәжірибесі',
                    'директорлар кеңесі деңгейінде шешім қабылдай білу'
                  ] : [
                    'strategic vision',
                    'portfolio management skills',
                    'understanding of corporate governance',
                    'experience in building business models across industries',
                    'ability to make decisions at the board of directors level'
                  ]).map((item, i) => (
                    <li key={i} className="flex items-start">
                      <span className="text-[#DD0000] mr-3 sm:mr-4 font-bold text-xl sm:text-2xl flex-shrink-0 mt-1">•</span>
                      <span className="text-base sm:text-lg text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Why This Experience Matters */}
            <div className="mt-10 sm:mt-12 bg-black text-white p-6 sm:p-8 lg:p-10 rounded-lg">
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4 sm:mb-6 pb-2 relative">
                {language === 'ru' ? 'Почему такой опыт важен для кейс-обучения' : language === 'kz' ? 'Неліктен мұндай тәжірибе кейс-оқыту үшін маңызды' : 'Why This Experience Matters for Case-Based Learning'}
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#DD0000]"></span>
              </h3>
              <p className="text-base sm:text-lg text-gray-300 mb-4">
                {language === 'ru' ? 'Преподаватель не просто модерирует обсуждение, а:' : language === 'kz' ? 'Оқытушы талқылауды жай ғана модерациялап қоймайды, ол:' : 'The instructor doesn\'t just moderate discussions — he:'}
              </p>
              <ul className="list-none space-y-2 sm:space-y-3 pl-0 mb-6">
                {(language === 'ru' ? [
                  'задаёт правильные вопросы',
                  'направляет дискуссию',
                  'объясняет логику решений',
                  'делится реальными ситуациями из практики',
                  'подсказывает, как действовать в сложных или спорных кейсах',
                  'помогает слушателям научиться мыслить как руководители'
                ] : language === 'kz' ? [
                  'дұрыс сұрақтар қояды',
                  'пікірталасты бағыттайды',
                  'шешімдердің логикасын түсіндіреді',
                  'тәжірибеден нақты жағдайлармен бөліседі',
                  'күрделі немесе даулы кейстерде қалай әрекет ету керектігін айтады',
                  'тыңдаушыларға басшы ретінде ойлауға үйренуге көмектеседі'
                ] : [
                  'asks the right questions',
                  'guides the discussion',
                  'explains the logic behind decisions',
                  'shares real situations from practice',
                  'advises on how to act in complex or controversial cases',
                  'helps participants learn to think like executives'
                ]).map((item, i) => (
                  <li key={i} className="flex items-start">
                    <span className="text-[#DD0000] mr-3 sm:mr-4 font-bold text-xl sm:text-2xl flex-shrink-0 mt-1">•</span>
                    <span className="text-base sm:text-lg text-gray-200">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="border-t border-gray-700 pt-4 sm:pt-6">
                <p className="text-base sm:text-lg text-white leading-relaxed italic">
                  {language === 'ru' ? 'Студенты получают не теоретическую абстракцию, а доступ к настоящему управленческому опыту — накопленному в госслужбе, банковской сфере, промышленности, автомобильной индустрии, девелопменте и холдинговом управлении.' : language === 'kz' ? 'Студенттер теориялық абстракция емес, нақты басқару тәжірибесіне — мемлекеттік қызметте, банк саласында, өнеркәсіпте, автомобиль индустриясында, девелопментте және холдингтік басқаруда жинақталған тәжірибеге қол жеткізеді.' : 'Students gain access not to theoretical abstraction, but to real management experience — accumulated in government service, banking, manufacturing, the automotive industry, real estate development, and holding company management.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

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

                <div className="space-y-4 sm:space-y-6 text-gray-700 text-base sm:text-lg lg:text-xl leading-relaxed mb-6">
                  <p>{getShortBiography()}</p>
                </div>

                {/* Media Publications */}
                <div className="mb-6">
                  <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 mb-4">
                    {language === 'ru' ? 'Публикации в СМИ' : language === 'kz' ? 'БАҚ жариялымдары' : 'Media Publications'}
                  </h3>
                  <div className="space-y-3">
                    <a 
                      href="https://www.koreilbo.com/news/razvitie_chelovecheskogo_kapitala_kak_investitsionnyy_proekt_intervyu_s_generalnym_direktorom_agents79/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-start gap-2 text-sm sm:text-base lg:text-lg text-[#DD0000] hover:underline transition"
                    >
                      <span className="flex-shrink-0 mt-1">→</span>
                      <span>
                        {language === 'ru' 
                          ? 'Развитие человеческого капитала – как инвестиционный проект (Korё ilbo)' 
                          : language === 'kz'
                          ? 'Адами капиталды дамыту – инвестициялық жоба ретінде (Korё ilbo)'
                          : 'Human capital development as an investment project (Korё ilbo)'}
                      </span>
                    </a>
                    <a 
                      href="https://almaty.atameken.kz/ru/projects/19830-luchshij-tovar-kazahstana-oleg-coj-nashi-avtomobili-vojdut-v-istoriyu" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-start gap-2 text-sm sm:text-base lg:text-lg text-[#DD0000] hover:underline transition"
                    >
                      <span className="flex-shrink-0 mt-1">→</span>
                      <span>
                        {language === 'ru' 
                          ? 'Лучший товар Казахстана: наши автомобили войдут в историю (Atameken)' 
                          : language === 'kz'
                          ? 'Қазақстанның үздік тауары: біздің автомобильдер тарихқа енеді (Atameken)'
                          : 'Best Product of Kazakhstan: our cars will go down in history (Atameken)'}
                      </span>
                    </a>
                    <a 
                      href="https://atameken.kz/ru/articles/23211-oleg-coj-glavnyj-orientir-vostrebovannost-avtomobilej" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-start gap-2 text-sm sm:text-base lg:text-lg text-[#DD0000] hover:underline transition"
                    >
                      <span className="flex-shrink-0 mt-1">→</span>
                      <span>
                        {language === 'ru' 
                          ? 'Главный ориентир – востребованность автомобилей (Atameken)' 
                          : language === 'kz'
                          ? 'Басты бағдар – автомобильдердің сұранысы (Atameken)'
                          : 'Main focus – demand for cars (Atameken)'}
                      </span>
                    </a>
                  </div>
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
                  loading="lazy"
                />
              </div>
            </div>

            {/* Educational Path Section */}
            <div className="mt-8 sm:mt-12">
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">
                {language === 'ru' ? 'Путь преподавателя в образовании' : language === 'kz' ? 'Оқытушының білім берудегі жолы' : 'The Instructor\'s Path in Education'}
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
                  {language === 'ru' ? 'Такой путь — от производственных площадок до Executive MBA — обеспечивает преподавателю исключительное понимание:' : language === 'kz' ? 'Мұндай жол — өндірістік алаңдардан Executive MBA-ға дейін — оқытушыға ерекше түсінік береді:' : 'This path — from production facilities to Executive MBA — provides the instructor with an exceptional understanding of:'}
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

                {/* Grid Layout - Certificate + Content */}
                <div className="grid grid-cols-1 lg:grid-cols-[400px_1fr] gap-6 sm:gap-8 items-stretch">
                  {/* Certificate PDF - LEFT */}
                  <div className="flex items-stretch justify-center order-2 lg:order-1">
                    <PDFViewer
                      src="/cerf5.pdf"
                      title="Academic Profile (English)"
                      className="w-full h-full"
                    />
                  </div>

                  {/* Text Content */}
                  <div className="order-1 lg:order-2">
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
                </div>
              </div>

              {/* Recommendation Letters */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6 sm:mb-8">
                {/* Academic Profile English */}
                <div className="bg-white border-2 border-gray-200 rounded-lg p-3 shadow-lg hover:shadow-2xl transition-all">
                  <img
                    src="/cerf1.jpg"
                    alt="Academic Profile (English)"
                    className="w-full h-[450px] object-contain rounded"
                    loading="lazy"
                  />
                </div>

                {/* Letter from Caspian University */}
                <PDFViewer
                  src="/cerf6.pdf"
                  title="Recommendation - Caspian University"
                />

                {/* Letter from Kaspi Bank */}
                <PDFViewer
                  src="/cerf7.pdf"
                  title="Recommendation - Kaspi Bank"
                />
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

                    {/* Grid Layout with Certificate */}
                    <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-6 lg:gap-8 mb-6 sm:mb-8">
                      {/* Left Column - Text Content */}
                      <div>
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
                        <p className="text-sm sm:text-base lg:text-lg text-gray-300 leading-relaxed">
                          {founderPage.preMBAProgram.role}
                        </p>
                      </div>

                      {/* Right Column - Certificate */}
                      <div className="flex items-start justify-center lg:justify-end order-first lg:order-last">
                        <img
                          src="/cerf3.jpg"
                          alt="London Business School Certificate"
                          className="w-full max-w-[400px] h-auto object-contain rounded-lg shadow-2xl hover:shadow-3xl transition-all duration-300"
                          loading="lazy"
                        />
                      </div>
                    </div>

                    {/* Disciplines */}
                    <div className="mb-6 sm:mb-8">
                      <p className="text-sm sm:text-base lg:text-lg font-semibold text-white mb-4 sm:mb-6">
                        {founderPage.preMBAProgram.disciplinesTitle}
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
                  {language === 'ru' ? 'Разнообразное и уникальное образование преподавателя. Наш преподаватель обладает редким сочетанием юридического, финансового, управленческого и международного бизнес-образования.' : language === 'kz' ? 'Оқытушының алуан түрлі және бірегей білімі. Біздің оқытушы заңгерлік, қаржылық, басқарушылық және халықаралық бизнес-білімнің сирек кездесетін үйлесімділігіне ие.' : 'The instructor\'s diverse and unique education. Our instructor possesses a rare combination of legal, financial, managerial, and international business education.'}
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

