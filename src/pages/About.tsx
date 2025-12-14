import { Link } from 'react-router-dom'
import TopBar from '../components/TopBar'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { useContent } from '../hooks/useContentQuery'
import { useLanguage } from '../contexts/LanguageContext'
import { defaultContent } from '../types/content'

const About = () => {
  const { language } = useLanguage()
  const { data: content } = useContent(language)
  const about = content?.about || defaultContent.about!

  // Локализация заголовков секций (не редактируются в админке)
  const getSectionTitles = () => {
    switch(language) {
      case 'ru':
        return {
          managementChallengesTitle: 'Программа охватывает широкий спектр управленческих задач, включая:',
        }
      case 'kz':
        return {
          managementChallengesTitle: 'Бағдарлама басқару міндеттерінің кең ауқымын қамтиды, оның ішінде:',
        }
      case 'en':
      default:
        return {
          managementChallengesTitle: 'The program covers a wide range of management challenges, including:',
        }
    }
  }

  const titles = getSectionTitles()

  return (
    <div className="min-h-screen bg-white">
      <TopBar />
      <Header />

      {/* About the Program Section */}
      <section className="pt-24 sm:pt-28 lg:pt-32 pb-16 sm:pb-20 lg:pb-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              {/* Left side - Text */}
              <div>
                {/* Верхняя линия - очень короткая */}
                <hr className="border-t border-gray-300 w-16 sm:w-20 mb-8" />
                
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 mb-8 leading-tight">
                  {about.hero.title}
                </h1>
                
                <p className="text-lg sm:text-xl lg:text-2xl text-gray-700 mb-12 leading-relaxed">
                  {about.hero.description}
                </p>
                
                {/* Нижняя линия - акцентный цвет, на всю ширину */}
                <hr className="border-t-2 border-[#DD0000] mb-8" />
                
                <div className="text-sm sm:text-base lg:text-lg xl:text-xl text-gray-900 font-semibold">
                  <div className="flex flex-wrap lg:flex-nowrap items-center gap-1 sm:gap-2">
                    {about.hero.formula.split(' → ').map((word, index, array) => (
                      <span key={index} className="flex items-center gap-1 sm:gap-2">
                        <span className="whitespace-nowrap">{word}</span>
                        {index < array.length - 1 && <span className="text-gray-400">→</span>}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right side - Image */}
              <div className="order-first lg:order-last">
                <img
                  src={about.hero.image}
                  alt="Program instructor"
                  className="w-full h-auto rounded-lg shadow-xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Management Challenges Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-10 sm:mb-12">
              {titles.managementChallengesTitle}
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {about.managementChallenges.map((challenge, index) => (
                <div key={index} className="bg-black text-white p-6 rounded-lg">
                  <h3 className="text-lg sm:text-xl font-bold mb-2">{challenge.title}</h3>
                  <p className="text-sm text-gray-300">{challenge.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Flexible Formats Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              {language === 'en' ? (
                <><span className="border-b-2 border-[#DD0000] pb-1">Flexible Formats</span> for Different Teams</>
              ) : language === 'ru' ? (
                <><span className="border-b-2 border-[#DD0000] pb-1">Гибкие форматы</span> для разных команд</>
              ) : (
                <><span className="border-b-2 border-[#DD0000] pb-1">Икемді форматтар</span> әртүрлі командалар үшін</>
              )}
            </h2>
            <p className="text-base sm:text-lg text-gray-600 mb-10 sm:mb-12">
              {about.flexibleFormatsSubtitle}
            </p>

            <div className="space-y-8">
              {about.flexibleFormats.map((format, index) => (
              <div key={index} className={`pb-8 ${index < about.flexibleFormats.length - 1 ? 'border-b border-gray-200' : ''}`}>
                <div className="flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-8">
                  <div className="sm:w-1/3">
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
                      <span className="border-b-2 border-[#DD0000] pb-0.5">{format.title}</span> —
                    </h3>
                    <p className="text-sm text-gray-600">
                      <span className="font-semibold">{format.subtitle}</span>
                    </p>
                  </div>
                  <div className="sm:w-2/3">
                    <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                      {format.description}
                    </p>
                  </div>
                </div>
              </div>
              ))}
            </div>

            {/* Button */}
            <div className="mt-10 sm:mt-12 text-center">
              <Link 
                to="/for-universities#hero"
                className="inline-block bg-black text-white px-8 py-3 rounded-md font-semibold hover:bg-gray-800 transition"
              >
                {about.formatButtonText}
              </Link>
            </div>

            <p className="text-center text-sm text-gray-500 mt-6">
              {about.formatFooterText}
            </p>
          </div>
        </div>
      </section>

      {/* After Completing Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              {/* Left side - Text */}
              <div>
                {/* Верхняя линия - короткая серая */}
                <hr className="border-t border-gray-300 w-16 sm:w-20 mb-8" />
                
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                  {language === 'en' ? (
                    <>After completing the program,<br className="hidden sm:block" /> participants will:</>
                  ) : language === 'ru' ? (
                    <>После завершения программы,<br className="hidden sm:block" /> участники смогут:</>
                  ) : (
                    <>Бағдарламаны аяқтағаннан кейін,<br className="hidden sm:block" /> қатысушылар:</>
                  )}
                </h2>
                <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-8">
                  {about.afterCompleting.description}
                </p>
                
                {/* Нижняя линия - красная */}
                <hr className="border-t-2 border-[#DD0000] mb-6 w-[300px]" />
                
                <Link 
                  to="/contacts#hero"
                  className="inline-flex items-center gap-2 text-gray-900 font-semibold hover:underline"
                >
                  {about.afterCompleting.buttonText}
                  <span>→</span>
                </Link>
              </div>

              {/* Right side - Image */}
              <div>
                <img
                  src={about.afterCompleting.image}
                  alt="Program participants"
                  className="w-full h-auto rounded-lg shadow-xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Competencies Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-10 sm:mb-12">
              <span className="border-b-2 border-[#DD0000] pb-1">{about.coreCompetenciesTitle}</span> 
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              {about.coreCompetencies.map((competency, index) => (
              <div key={index} className="border border-gray-200 p-8 sm:p-10 lg:p-12 rounded-lg hover:shadow-lg transition">
                <div className="text-sm text-gray-600 mb-3">{competency.category}</div>
                <h3 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                  {competency.mainTitle}
                  <span className="text-[#DD0000] text-3xl sm:text-4xl">↗</span>
                </h3>
                <div className="mb-4">
                  <div className="text-sm font-semibold text-gray-900 mb-2">{competency.subtitle}</div>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {competency.description}
                  </p>
                </div>
                <Link 
                  to="/for-universities#hero"
                  className="inline-flex items-center gap-1 text-sm text-[#DD0000] font-semibold hover:underline"
                >
                  {competency.linkText}
                  <span>→</span>
                </Link>
              </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default About

