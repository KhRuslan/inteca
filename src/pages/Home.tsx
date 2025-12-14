import TopBar from '../components/TopBar'
import Header from '../components/Header'
import HeroSection from '../components/HeroSection'
import ProgramBenefits from '../components/ProgramBenefits'
import WhoProgramFor from '../components/WhoProgramFor'
import CaseBasedLearning from '../components/CaseBasedLearning'
import KeyBenefits from '../components/KeyBenefits'
import Founder from '../components/Founder'
import CTABanner from '../components/CTABanner'
import Footer from '../components/Footer'

const Home = () => {
  return (
    <div className="min-h-screen bg-white">
      <TopBar />
      <Header />
      <HeroSection />
      <ProgramBenefits />
      <WhoProgramFor />
      <CaseBasedLearning />
      <KeyBenefits />
      <Founder />
      <CTABanner />
      <Footer />
    </div>
  )
}

export default Home

