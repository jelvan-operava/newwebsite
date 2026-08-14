import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Navigation from './components/Navigation'
import Footer from './components/Footer'
import Home from './pages/Home'
import About from './pages/About'
import ITServices from './pages/ITServices'
import BPOServices from './pages/BPOServices'
import ServiceDetail from './pages/ServiceDetail'
import Industries from './pages/Industries'
import Careers from './pages/Careers'
import Contact from './pages/Contact'
import Insights from './pages/Insights'
import Privacy from './pages/Privacy'
import Terms from './pages/Terms'
import NotFound from './pages/NotFound'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname])
  return null
}

function Layout() {
  return (
    <>
      <ScrollToTop />
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services/it" element={<ITServices />} />
        <Route path="/services/bpo" element={<BPOServices />} />
        <Route path="/services/it/:slug" element={<ServiceDetail />} />
        <Route path="/services/bpo/:slug" element={<ServiceDetail />} />
        <Route path="/services" element={<ITServices />} />
        <Route path="/industries" element={<Industries />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/insights" element={<Insights />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  )
}
