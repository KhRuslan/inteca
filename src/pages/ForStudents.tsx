import { Link } from 'react-router-dom'
import TopBar from '../components/TopBar'
import Header from '../components/Header'
import Footer from '../components/Footer'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../components/ui/accordion'
import { useContent } from '../hooks/useContentQuery'
import { useLanguage } from '../contexts/LanguageContext'
import { defaultContent } from '../types/content'

const ForStudents = () => {
  const { language } = useLanguage()
  const { data: content } = useContent(language)
  const forStudentsPage = content?.forStudentsPage || defaultContent.forStudentsPage!

  return (
    <div className="min-h-screen bg-white">
      <TopBar />
      <Header />

      {/* Hero Section */}
      <section className="pt-8 sm:pt-12 lg:pt-16 pb-8 sm:pb-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            {/* Title with red underline */}
            <div className="mb-6 sm:mb-8">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 sm:mb-8 relative inline-block">
                <span className="absolute -top-6 sm:-top-8 left-0 w-full h-0.5 bg-[#DD0000]"></span>
                {forStudentsPage.hero.title}
              </h1>
            </div>
            
            {/* Hero Image */}
            <div className="relative w-full mb-6 sm:mb-8 rounded-lg overflow-hidden">
              <img 
                src={forStudentsPage.hero.image}
                alt="Students group" 
                className="w-full h-auto object-cover min-h-[400px] sm:min-h-[500px] lg:min-h-[600px]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* What Education Gives Section */}
      {forStudentsPage.whatEducationGives && (
        <section className="py-12 sm:py-16 lg:py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-6 sm:mb-8 relative inline-block">
                {forStudentsPage.whatEducationGives.title}
                <span className="absolute -bottom-2 left-0 w-full h-0.5 bg-[#DD0000]"></span>
              </h2>
              <div className="bg-black text-white p-6 sm:p-8 lg:p-10 rounded-lg">
                <ul className="list-disc list-inside text-base sm:text-lg text-gray-300 space-y-3">
                  {forStudentsPage.whatEducationGives.points.map((point, index) => (
                    <li key={index}>{point}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Case Learning Path Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 sm:mb-8 relative inline-block">
              <span className="absolute -top-6 sm:-top-8 left-0 w-full h-0.5 bg-[#DD0000]"></span>
              {forStudentsPage.caseLearningPath.title}
            </h2>
            
            <p className="text-lg sm:text-xl text-gray-700 mb-8 sm:mb-10 leading-relaxed">
              {forStudentsPage.caseLearningPath.intro}
            </p>

            {/* How It Works - Black Card */}
            <div className="bg-black text-white p-6 sm:p-8 lg:p-10 rounded-lg mb-6 sm:mb-8">
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4 sm:mb-6 pb-2 relative">
                {forStudentsPage.caseLearningPath.howItWorks.title}
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#DD0000]"></span>
              </h3>
              <p className="text-base sm:text-lg text-gray-300 mb-4">
                {forStudentsPage.caseLearningPath.howItWorks.description}
              </p>
              <ul className="list-disc list-inside text-base sm:text-lg text-gray-300 mb-4 space-y-2">
                <li>{forStudentsPage.caseLearningPath.howItWorks.lightPace}</li>
                <li>{forStudentsPage.caseLearningPath.howItWorks.mediumPace}</li>
              </ul>
              <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
                {forStudentsPage.caseLearningPath.howItWorks.conclusion}
              </p>
            </div>

            {/* Why Valuable - Black Card */}
            <div className="bg-black text-white p-6 sm:p-8 lg:p-10 rounded-lg mb-6 sm:mb-8">
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4 sm:mb-6 pb-2 relative">
                {forStudentsPage.caseLearningPath.whyValuable.title}
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#DD0000]"></span>
              </h3>
              <p className="text-base sm:text-lg text-gray-300 mb-4">
                {forStudentsPage.caseLearningPath.whyValuable.description}
              </p>
              <ul className="list-disc list-inside text-base sm:text-lg text-gray-300 space-y-2 mb-4">
                {forStudentsPage.caseLearningPath.whyValuable.points.map((point, index) => (
                  <li key={index}>{point}</li>
                ))}
              </ul>
              <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
                Человек, идущий по Case Learning Path, становится всё более востребованным на рынке. Его воспринимают как профессионала, который инвестирует в себя и непрерывно расширяет свои компетенции.
              </p>
            </div>

            {/* What Develops - Black Card with Grid */}
            <div className="bg-black text-white p-6 sm:p-8 lg:p-10 rounded-lg mb-6 sm:mb-8">
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4 sm:mb-6 pb-2 relative">
                {forStudentsPage.caseLearningPath.whatDevelops.title}
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#DD0000]"></span>
              </h3>
              <p className="text-base sm:text-lg text-gray-300 mb-4">
                {forStudentsPage.caseLearningPath.whatDevelops.description}
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4 mb-4">
                {forStudentsPage.caseLearningPath.whatDevelops.directions.map((direction, index) => (
                  <div key={index} className="bg-gray-900 rounded-lg p-3 sm:p-4 text-center">
                    <p className="text-sm sm:text-base text-white font-medium">
                      {direction.replace(/[,.]/g, '')}
                    </p>
                  </div>
                ))}
              </div>
              <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
                {forStudentsPage.caseLearningPath.whatDevelops.conclusion}
              </p>
            </div>

            {/* Ecosystem - Black Card */}
            <div className="bg-black text-white p-6 sm:p-8 lg:p-10 rounded-lg mb-6 sm:mb-8">
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4 sm:mb-6 pb-2 relative">
                {forStudentsPage.caseLearningPath.ecosystem.title}
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#DD0000]"></span>
              </h3>
              <p className="text-base sm:text-lg text-gray-300 mb-4">
                {forStudentsPage.caseLearningPath.ecosystem.description}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 mb-4">
                {forStudentsPage.caseLearningPath.ecosystem.competencies.map((competency, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <span className="text-[#DD0000] text-xl">•</span>
                    <p className="text-base sm:text-lg text-gray-300">{competency}</p>
                  </div>
                ))}
              </div>
              <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
                {forStudentsPage.caseLearningPath.ecosystem.conclusion}
              </p>
            </div>

            {/* Benefits - Grid of Black Cards */}
            <div className="mt-12 sm:mt-16 lg:mt-20 mb-6 sm:mb-8">
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 sm:mb-8 relative inline-block">
                <span className="absolute -top-6 sm:-top-8 left-0 w-full h-0.5 bg-[#DD0000]"></span>
                Дополнительные преимущества Case Learning Path
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {forStudentsPage.caseLearningPath.benefits.map((benefit, index) => (
                  <div key={index} className="bg-black text-white p-5 sm:p-6 rounded-lg flex flex-col h-full">
                    <h4 className="text-lg sm:text-xl font-bold mb-3 flex items-start">
                      <span className="text-[#DD0000] mr-2 text-xl">{index + 1}.</span>
                      <span>{benefit.title}</span>
                    </h4>
                    <p className="text-sm sm:text-base text-gray-300 leading-relaxed flex-grow">
                      {benefit.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Practical Skills Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-8 sm:mb-12 relative inline-block">
              <span className="absolute -top-6 sm:-top-8 left-0 w-full h-0.5 bg-[#DD0000]"></span>
              {forStudentsPage.practicalSkills.title}
            </h2>
            
            <div className="bg-black text-white p-6 sm:p-8 lg:p-10 rounded-lg">
              <p className="text-base sm:text-lg text-gray-300 mb-6 sm:mb-8">
                {forStudentsPage.practicalSkills.description}
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 mb-6 sm:mb-8">
                {forStudentsPage.practicalSkills.skills.map((skill, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <span className="text-[#DD0000] text-xl font-bold mt-1">•</span>
                    <p className="text-base sm:text-lg text-gray-300">{skill}</p>
                  </div>
                ))}
              </div>
              
              <div className="w-full h-0.5 bg-[#DD0000] mb-4"></div>
              <p className="text-lg sm:text-xl text-white leading-relaxed">
                {forStudentsPage.practicalSkills.conclusion}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Investment in Leadership Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-8 sm:mb-12 relative inline-block">
              <span className="absolute -top-6 sm:-top-8 left-0 w-full h-0.5 bg-[#DD0000]"></span>
              {forStudentsPage.investmentInLeadership.title}
            </h2>
            
            <div className="bg-black text-white p-6 sm:p-8 lg:p-10 rounded-lg mb-6 sm:mb-8">
              <p className="text-base sm:text-lg text-gray-300 mb-6 sm:mb-8">
                {forStudentsPage.investmentInLeadership.intro}
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 mb-6 sm:mb-8">
                {forStudentsPage.investmentInLeadership.understanding.map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <span className="text-[#DD0000] text-xl font-bold mt-1">•</span>
                    <p className="text-base sm:text-lg text-gray-300">{item}</p>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-black text-white p-6 sm:p-8 lg:p-10 rounded-lg mb-6 sm:mb-8">
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4 sm:mb-6 pb-2 relative">
                {forStudentsPage.investmentInLeadership.futureLeadership.title}
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#DD0000]"></span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                {forStudentsPage.investmentInLeadership.futureLeadership.points.map((point, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <span className="text-[#DD0000] text-xl font-bold mt-1">•</span>
                    <p className="text-base sm:text-lg text-gray-300">{point}</p>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-black text-white p-6 sm:p-8 lg:p-10 rounded-lg">
              <p className="text-lg sm:text-xl text-white leading-relaxed">
                {forStudentsPage.investmentInLeadership.conclusion}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Certificates Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-start">
              {/* Left: Text */}
              <div className="space-y-4 sm:space-y-6 flex flex-col h-full">
                <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 sm:mb-8">
                  {language === 'ru' ? 'Сертификаты' : language === 'kz' ? 'Сертификаттар' : forStudentsPage.certificates.title}
                </h2>
                <p className="text-lg sm:text-xl lg:text-2xl text-gray-700 leading-relaxed">
                  {forStudentsPage.certificates.description1}
                </p>
                <div className="flex flex-col flex-grow justify-end">
                  <p className="text-lg sm:text-xl lg:text-2xl text-gray-700 leading-relaxed mb-4">
                    {(() => {
                      const text = forStudentsPage.certificates.description2;
                      const patterns = ['personalized Case Book', 'персонализированную Кейс-книгу', 'жеке Кейс-кітап'];
                      const pattern = patterns.find(p => text.includes(p));
                      if (pattern) {
                        const parts = text.split(pattern);
                        return (
                          <>
                            {parts[0]}
                            <span className="font-bold">{pattern}</span>
                            {parts[1]}
                          </>
                        );
                      }
                      return text;
                    })()}
                  </p>
                  <div className="w-full h-0.5 bg-[#DD0000]"></div>
                </div>
              </div>

              {/* Right: Image */}
              <div className="w-full">
                <img 
                  src={forStudentsPage.certificates.image}
                  alt="Students with certificates" 
                  className="w-full h-auto rounded-lg object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-8 sm:mb-12 relative inline-block">
              <span className="absolute -top-6 sm:-top-8 left-0 w-full h-0.5 bg-[#DD0000]"></span>
              {forStudentsPage.faqTitle}
            </h2>
            
            <Accordion type="single" collapsible className="w-full" defaultValue="item-1">
              {forStudentsPage.faq.map((item, index) => (
                <AccordionItem key={index} value={`item-${index + 1}`} className="border-b border-gray-200 pb-4">
                  <AccordionTrigger className="text-left text-lg sm:text-xl font-semibold py-4 hover:no-underline text-gray-900 data-[state=open]:text-[#DD0000] group">
                    <span className="mr-4 font-bold text-gray-400 group-data-[state=open]:text-[#DD0000]">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-base sm:text-lg text-gray-700 pt-4">
                    <div className="bg-white border-2 border-[#DD0000] rounded-lg p-4 sm:p-6">
                      {item.answer}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto flex justify-center">
            <Link
              to="/contacts#hero"
              className="bg-black text-white px-8 sm:px-12 lg:px-16 py-4 sm:py-5 lg:py-6 rounded-lg text-base sm:text-lg lg:text-xl font-semibold hover:bg-gray-800 transition inline-flex items-center gap-2"
            >
              {forStudentsPage.cta.buttonText}
              <span className="text-[#DD0000]">→</span>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default ForStudents

