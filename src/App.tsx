import { BrowserRouter, Routes, Route } from 'react-router-dom'
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
  return (
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
  )
}

export default App

