import { useState, useEffect } from 'react'
import TopBar from '../components/TopBar'
import Header from '../components/Header'
import HeroSection from '../components/HeroSection'
import ProgramBenefits from '../components/ProgramBenefits'
import WhoProgramFor from '../components/WhoProgramFor'
import CaseBasedLearning from '../components/CaseBasedLearning'
import WhyLecturesDontWork from '../components/WhyLecturesDontWork'
import KeyBenefits from '../components/KeyBenefits'
import Founder from '../components/Founder'
import Footer from '../components/Footer'
import { useLanguage } from '../contexts/LanguageContext'
import { ProgramBenefit } from '../types/content'

const Home = () => {
  const { language } = useLanguage()
  const [selectedBenefit, setSelectedBenefit] = useState<ProgramBenefit | null>(null)

  // Блокировка скролла при открытии модального окна
  useEffect(() => {
    if (selectedBenefit) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [selectedBenefit])

  return (
    <div className="min-h-screen bg-white">
      <TopBar />
      <Header />
      <HeroSection />
      <ProgramBenefits onBenefitClick={setSelectedBenefit} />
      <WhoProgramFor />
      <CaseBasedLearning />
      <WhyLecturesDontWork />
      <KeyBenefits />
      <Founder />
      <Footer />

      {/* Modal for Program Benefit Details */}
      {selectedBenefit && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-2 sm:p-4 animate-fadeIn"
          onClick={() => setSelectedBenefit(null)}
        >
          <div 
            className="bg-gray-50 rounded-lg max-w-4xl w-full max-h-[95vh] sm:max-h-[90vh] overflow-y-auto animate-slideUp"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 sm:p-6 lg:p-8 xl:p-12">
              <button
                onClick={() => setSelectedBenefit(null)}
                className="mb-4 text-gray-600 hover:text-gray-900 transition flex items-center gap-2 text-sm font-semibold"
              >
                <span>←</span>
                {language === 'ru' ? 'Назад' : language === 'kz' ? 'Артқа' : 'Back'}
              </button>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                {selectedBenefit.title}
              </h2>
              <div className="border-b-2 border-[#DD0000] w-16 sm:w-20 mb-6"></div>
              
              <p className="text-base sm:text-lg text-gray-700 leading-relaxed whitespace-pre-line">
                {selectedBenefit.description}
              </p>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}

export default Home

