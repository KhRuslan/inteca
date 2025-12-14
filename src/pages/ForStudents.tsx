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
            
            {/* Hero Image with overlay */}
            <div className="relative w-full mb-6 sm:mb-8 rounded-lg overflow-hidden">
              <img 
                src={forStudentsPage.hero.image}
                alt="Students group" 
                className="w-full h-auto object-cover min-h-[400px] sm:min-h-[500px] lg:min-h-[600px]"
              />
              
              {/* Dark overlay */}
              <div className="absolute inset-0 bg-black bg-opacity-40"></div>
              
              {/* Black div on image at the bottom - centered with better spacing */}
              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-90 px-6 sm:px-8 lg:px-12 py-8 sm:py-5 lg:py-6">
                <h2 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-white text-center leading-tight">
                  {forStudentsPage.hero.whatYouGainTitle.split(' ').slice(0, 4).join(' ')}<br className="sm:hidden" /> {forStudentsPage.hero.whatYouGainTitle.split(' ').slice(4).join(' ')}
                </h2>
              </div>
            </div>

            {/* Black div below image with rounded corners */}
            <div className="bg-black rounded-lg px-6 sm:px-8 lg:px-10 py-6 sm:py-8 lg:py-10">
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-4 sm:mb-6">
                {forStudentsPage.whatYouGain.intro}
              </h3>
              <div className="w-full h-0.5 bg-[#DD0000] mb-4 sm:mb-6"></div>
              <ul className="list-disc list-inside text-base sm:text-lg lg:text-xl text-white mb-4 sm:mb-6 space-y-2 sm:space-y-3">
                {forStudentsPage.whatYouGain.list.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
              <p className="text-lg sm:text-xl lg:text-2xl text-white mb-4 sm:mb-6">
                {forStudentsPage.whatYouGain.conclusion}
              </p>
              <div className="w-full h-0.5 bg-gray-400"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills You Will Develop Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-8 sm:mb-12 relative inline-block">
              <span className="absolute -top-6 sm:-top-8 left-0 w-full h-0.5 bg-[#DD0000]"></span>
              {forStudentsPage.skillsTitle}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {forStudentsPage.skills.map((skill, index) => (
                <div key={index} className="bg-gray-100 border-2 border-gray-300 p-6 sm:p-8 rounded-lg">
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">
                    {skill.title}
                  </h3>
                  <p className="text-base sm:text-lg text-gray-700">
                    {skill.description}
                  </p>
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
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-start">
              {/* Left: Text */}
              <div className="space-y-4 sm:space-y-6 flex flex-col h-full">
                <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 sm:mb-8">
                  {forStudentsPage.certificates.title}
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

