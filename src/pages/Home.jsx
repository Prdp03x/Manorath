import { useRef } from 'react'
import { useLocation } from 'react-router-dom'
import Nav from '../components/Nav.jsx'
import Hero from '../components/Hero.jsx'
import Marquee from '../components/Marquee.jsx'
import Collection from '../components/Collection.jsx'
import CartDrawer from '../components/CartDrawer.jsx'
import { Intro, Story, Inclusions, Contact, Footer, useHeadingReveals } from '../components/Sections.jsx'
import { useEffect } from 'react'
import { lenis } from '../hooks/useSmoothScroll'

export default function Home() {
  const root = useRef(null)
  const { hash } = useLocation()
  useHeadingReveals(root)

  useEffect(() => {
    if (!hash) return
    const el = document.querySelector(hash)
    if (el) setTimeout(() => (lenis ? lenis.scrollTo(el) : el.scrollIntoView()), 50)
  }, [hash])

  return (
    <div ref={root}>
      <Nav />
      <Hero />
      <Marquee />
      <Intro />
      <Collection />
      <Story />
      <Inclusions />
      <Contact />
      <Footer />
      <CartDrawer />
    </div>
  )
}
