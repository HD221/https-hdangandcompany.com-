import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Services from './pages/Services'
import ServiceDetail from './pages/ServiceDetail'
import Industries from './pages/Industries'
import HowWeWork from './pages/HowWeWork'
import Firm from './pages/Firm'
import Insights from './pages/Insights'
import Article from './pages/Article'
import Contact from './pages/Contact'
import Legal from './pages/Legal'
import NotFound from './pages/NotFound'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="services" element={<Services />} />
        <Route path="services/:slug" element={<ServiceDetail />} />
        <Route path="industries" element={<Industries />} />
        <Route path="how-we-work" element={<HowWeWork />} />
        <Route path="the-firm" element={<Firm />} />
        <Route path="insights" element={<Insights />} />
        <Route path="insights/:slug" element={<Article />} />
        <Route path="contact" element={<Contact />} />
        <Route path="disclaimer" element={<Legal doc="disclaimer" />} />
        <Route path="privacy-policy" element={<Legal doc="privacy-policy" />} />
        <Route path="terms-of-use" element={<Legal doc="terms-of-use" />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
