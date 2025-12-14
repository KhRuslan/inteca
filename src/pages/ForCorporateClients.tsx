import { Link } from 'react-router-dom'
import TopBar from '../components/TopBar'
import Header from '../components/Header'
import Footer from '../components/Footer'
import BusinessResults from '../components/ui/BusinessResults'
import { useContent } from '../hooks/useContentQuery'
import { useLanguage } from '../contexts/LanguageContext'

const ForCorporateClients = () => {
  const { language } = useLanguage()
  const { data: content } = useContent(language)
  
  const forCorporateClientsPage = content?.forCorporateClientsPage || {
    hero: { title: '', subtitle: '', description: '' },
    whyCaseMethodWorks: { title: '', description: '', list: [], conclusion: '' },
    trainingFormatsTitle: '',
    trainingFormats: [],
    sampleCasesTitle: '',
    sampleCases: [],
    businessResultsTitle: '',
    businessResults: [],
    cta: { buttonText: '' }
  }

  const pageContent = forCorporateClientsPage

  return (
    <div className="min-h-screen bg-white">
      <TopBar />
      <Header />

      {/* Hero Section */}
      <section className="pt-8 sm:pt-12 lg:pt-16 pb-12 sm:pb-16 lg:pb-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            {/* Title with red underline */}
            <div className="mb-6 sm:mb-8">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 sm:mb-6 relative inline-block">
                <span className="absolute -top-6 sm:-top-8 left-0 w-full h-0.5 bg-[#DD0000]"></span>
                {pageContent.hero.title}
              </h1>
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-6 sm:mb-8">
                {pageContent.hero.subtitle}
              </h2>
              <p className="text-base sm:text-lg lg:text-xl text-gray-700 leading-relaxed max-w-4xl">
                {pageContent.hero.description}
              </p>
            </div>

            {/* Hero Image and Why Section - Two Column Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mt-8 sm:mt-12 items-start">
              {/* Left: Hero Image */}
              <div className="order-2 lg:order-1">
                <img 
                  src="/for corp.png" 
                  alt="Corporate training" 
                  className="w-full h-auto rounded-lg object-cover"
                />
              </div>

              {/* Right: Why the Case Method Works */}
              <div className="order-1 lg:order-2 flex flex-col">
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 sm:mb-6 relative inline-block pb-2">
                  {pageContent.whyCaseMethodWorks.title}
                  <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-[#DD0000]"></span>
                </h3>
                <p className="text-base sm:text-lg text-gray-700 mb-4 sm:mb-6">
                  {pageContent.whyCaseMethodWorks.description}
                </p>
                <ul className="list-disc list-inside text-base sm:text-lg text-gray-700 mb-4 sm:mb-6 space-y-2">
                  {pageContent.whyCaseMethodWorks.list.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
                <p className="text-base sm:text-lg text-gray-700">
                  {pageContent.whyCaseMethodWorks.conclusion}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Training Formats Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-8 sm:mb-12 relative inline-block">
              <span className="absolute -top-6 sm:-top-8 left-0 w-full h-0.5 bg-[#DD0000]"></span>
              {pageContent.trainingFormatsTitle}
            </h2>

            <div className="space-y-6 sm:space-y-8">
              {/* First three cards in a row */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
                {pageContent.trainingFormats.slice(0, 3).map((format, index) => (
                  <div key={index} className="bg-black text-white p-6 sm:p-8 rounded-lg">
                    <h3 className="text-xl sm:text-2xl font-bold mb-4">
                      <span className="relative inline-block">
                        {index + 1}. {format.title.split(' ')[0]}
                        <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#DD0000]"></span>
                      </span>
                      <span className="ml-2">{format.title.split(' ').slice(1).join(' ')}</span>
                    </h3>
                    <p className="text-base sm:text-lg mb-4">{format.description}</p>
                    {format.idealFor && (
                      <p className="text-sm sm:text-base text-gray-300 mb-2">{format.idealFor}</p>
                    )}
                    {format.list && format.list.length > 0 && (
                      <ul className="text-sm sm:text-base text-gray-300 space-y-1 list-disc list-inside">
                        {format.list.map((item, idx) => (
                          <li key={idx}>{item}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>

              {/* Card 4: Integration into MBA - Full width */}
              {pageContent.trainingFormats[3] && (
                <div className="bg-black text-white p-6 sm:p-8 rounded-lg">
                  <h3 className="text-xl sm:text-2xl font-bold mb-4 relative inline-block">
                    {pageContent.trainingFormats[3].title}
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#DD0000]"></span>
                  </h3>
                  <p className="text-sm sm:text-base text-gray-300">
                    {pageContent.trainingFormats[3].description}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Sample Case Examples Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-8 sm:mb-12 relative inline-block">
              <span className="absolute -top-6 sm:-top-8 left-0 w-full h-0.5 bg-[#DD0000]"></span>
              {pageContent.sampleCasesTitle}
            </h2>

            {/* Unified black block with content and image */}
            <div className="bg-black rounded-lg overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-0">
                {/* Left: Content block */}
                <div className="text-white p-6 sm:p-8 lg:p-10">
                  <div className="space-y-6 sm:space-y-8">
                    {pageContent.sampleCases.map((example, index) => (
                      <div key={index}>
                        <h3 className="text-lg sm:text-xl font-bold mb-2">{example.title}</h3>
                        <p className="text-sm sm:text-base text-gray-300">
                          {example.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right: Compact Image */}
                <div className="flex items-center justify-center bg-black p-4 sm:p-6 lg:p-8">
                  <img 
                    src="/for corp2.png" 
                    alt="Case examples" 
                    className="w-full h-full max-h-[500px] object-cover rounded-lg"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Business Results Section */}
      <BusinessResults 
        title={pageContent.businessResultsTitle}
        results={pageContent.businessResults.map((result, index) => ({
          id: index + 1,
          title: result.title,
          description: result.description,
          icon: index === 0 ? 'check' : index === 1 ? 'arrow' : 'users',
          metrics: result.metrics
        }))}
      />

      {/* CTA Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto flex justify-center">
            <Link
              to="/contacts#hero"
              className="bg-black text-white px-8 sm:px-12 lg:px-16 py-4 sm:py-5 lg:py-6 rounded-lg text-base sm:text-lg lg:text-xl font-semibold hover:bg-gray-800 transition inline-flex items-center gap-2"
            >
              {pageContent.cta.buttonText}
              <span className="text-[#DD0000]">→</span>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default ForCorporateClients

