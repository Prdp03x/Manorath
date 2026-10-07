import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import useSmoothScroll, { lenis } from './hooks/useSmoothScroll'
import Home from './pages/Home.jsx'
import Checkout from './pages/Checkout.jsx'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    if (lenis) lenis.scrollTo(0, { immediate: true })
    else window.scrollTo(0, 0)
  }, [pathname])
  return null
}

export default function App() {
  useSmoothScroll()
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </>
  )
}
