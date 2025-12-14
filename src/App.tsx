import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useContent } from './hooks/useContentQuery'
import { useLanguage } from './contexts/LanguageContext'
import { useImagePreloader } from './hooks/useImagePreloader'
import { collectAllImages } from './utils/imageCollector'
import GlobalLoader from './components/GlobalLoader'
import Home from './pages/Home'
import Blog from './pages/Blog'
import BlogPost from './pages/BlogPost'
import About from './pages/About'
import Founder from './pages/Founder'
import MethodologyCases from './pages/MethodologyCases'
import Contacts from './pages/Contacts'
import ForUniversities from './pages/ForUniversities'
import ForCorporateClients from './pages/ForCorporateClients'
import ForStudents from './pages/ForStudents'
import Admin from './pages/Admin'

function App() {
  const { language } = useLanguage()
  const { data: content, isLoading: contentLoading } = useContent(language)
  
  // Проверяем, была ли уже первая загрузка в этой сессии
  const [isInitialLoad, setIsInitialLoad] = useState(() => {
    // Проверяем sessionStorage - если уже была загрузка в этой сессии, не показываем loader
    const hasLoadedBefore = sessionStorage.getItem('inteca_initial_load_complete')
    return !hasLoadedBefore
  })
  
  // Собираем все изображения для предзагрузки (только при первой загрузке)
  const allImages = isInitialLoad ? collectAllImages(content) : []
  const { imagesLoaded, progress } = useImagePreloader(allImages)

  // Проверяем, завершена ли полная загрузка (только при первой загрузке)
  const isFullyLoaded = !isInitialLoad || (!contentLoading && imagesLoaded && progress >= 100)

  useEffect(() => {
    if (isFullyLoaded && isInitialLoad) {
      // Небольшая задержка для плавного перехода
      const timer = setTimeout(() => {
        setIsInitialLoad(false)
        // Сохраняем в sessionStorage, что первая загрузка завершена
        sessionStorage.setItem('inteca_initial_load_complete', 'true')
      }, 500)
      return () => clearTimeout(timer)
    }
  }, [isFullyLoaded, isInitialLoad])

  return (
    <>
      <GlobalLoader 
        isLoading={isInitialLoad} 
        progress={progress}
      />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:id" element={<BlogPost />} />
          <Route path="/about" element={<About />} />
          <Route path="/founder" element={<Founder />} />
          <Route path="/methodology" element={<MethodologyCases />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/for-universities" element={<ForUniversities />} />
          <Route path="/for-corporate-clients" element={<ForCorporateClients />} />
          <Route path="/for-students" element={<ForStudents />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App

