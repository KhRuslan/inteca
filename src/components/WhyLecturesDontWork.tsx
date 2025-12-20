import { useContent } from '../hooks/useContentQuery'
import { useLanguage } from '../contexts/LanguageContext'
import { defaultContent } from '../types/content'

const WhyLecturesDontWork = () => {
  const { language } = useLanguage()
  const { data: content } = useContent(language)
  const whyLecturesContent = content?.whyLecturesDontWork || defaultContent.whyLecturesDontWork

  if (!whyLecturesContent) return null

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Main Black Card */}
          <div className="bg-black text-white p-8 sm:p-10 lg:p-12 rounded-lg mb-6 sm:mb-8">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold mb-6 sm:mb-8 pb-3 relative">
              {whyLecturesContent.title}
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#DD0000]"></span>
            </h2>
            <p className="text-lg sm:text-xl lg:text-2xl text-gray-300 leading-relaxed">
              {whyLecturesContent.description}
            </p>
          </div>

          {/* Visual Elements - Red accent lines */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            <div className="h-2 bg-[#DD0000] rounded-full"></div>
            <div className="h-2 bg-[#DD0000] rounded-full"></div>
            <div className="h-2 bg-[#DD0000] rounded-full"></div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default WhyLecturesDontWork

