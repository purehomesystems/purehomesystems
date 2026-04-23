import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { lazy, Suspense, useEffect, useLayoutEffect } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

const Home = lazy(() => import('./pages/Home'))
const Products = lazy(() => import('./pages/Products'))
const ProductDetail = lazy(() => import('./pages/ProductDetail'))
const HowItWorks = lazy(() => import('./pages/HowItWorks'))
const About = lazy(() => import('./pages/About'))
const GetRecommendation = lazy(() => import('./pages/GetRecommendation'))
const RentalPlans = lazy(() => import('./pages/RentalPlans'))
const FAQ = lazy(() => import('./pages/FAQ'))
const Guides = lazy(() => import('./pages/Guides'))
const GuideArticle = lazy(() => import('./pages/GuideArticle'))
const Promotions = lazy(() => import('./pages/Promotions'))
const Author = lazy(() => import('./pages/Author'))
const EditorialPolicy = lazy(() => import('./pages/EditorialPolicy'))
const InstallationAvailability = lazy(() => import('./pages/InstallationAvailability'))
const BestWaterPurifierForHome = lazy(() => import('./pages/BestWaterPurifierForHome'))
const WaterPurifierCost = lazy(() => import('./pages/WaterPurifierCost'))

function ScrollToTop() {
  const { pathname, search } = useLocation()

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual'
    }
  }, [])

  useLayoutEffect(() => {
    const html = document.documentElement
    const body = document.body
    const previousScrollBehavior = html.style.scrollBehavior
    const previousBodyScrollBehavior = body.style.scrollBehavior
    html.style.scrollBehavior = 'auto'
    body.style.scrollBehavior = 'auto'
    window.scrollTo(0, 0)
    html.scrollTop = 0
    body.scrollTop = 0
    html.style.scrollBehavior = previousScrollBehavior
    body.style.scrollBehavior = previousBodyScrollBehavior
  }, [pathname, search])
  return null
}

function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <ScrollToTop />
      <Navbar />
      <main className="flex-1">
        <Suspense fallback={<div className="pt-16 min-h-[40vh]" />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:slug" element={<ProductDetail />} />
            <Route path="/how-it-works" element={<HowItWorks />} />
            <Route path="/about" element={<About />} />
            <Route path="/get-recommendation" element={<GetRecommendation />} />
            <Route path="/rental-plans" element={<RentalPlans />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/guides" element={<Guides />} />
            <Route path="/guides/:slug" element={<GuideArticle />} />
            <Route path="/promotions" element={<Promotions />} />
            <Route path="/author" element={<Author />} />
            <Route path="/editorial-policy" element={<EditorialPolicy />} />
            <Route path="/installation-availability" element={<InstallationAvailability />} />
            <Route path="/best-water-purifier-for-home" element={<BestWaterPurifierForHome />} />
            <Route path="/water-purifier-cost" element={<WaterPurifierCost />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  )
}
