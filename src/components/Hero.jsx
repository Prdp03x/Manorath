import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { Link } from 'react-router-dom'

export default function Hero() {
  const root = useRef(null)
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.hero-copy > *', { y: 45, opacity: 0, duration: 1.05, stagger: 0.11, delay: 0.25, ease: 'power3.out' })
      gsap.to('.hero-orb', {
        y: -35, rotate: 8,
        scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: 1 },
      })
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <header className="hero" ref={root}>
      <div className="hero-orb" />
      <div className="hero-inner">
        <div className="hero-copy">
          <div className="hero-eyebrow">MANORATH 2026 • DIWALI GIFTING</div>
          <h1>Gift<br />with<br />intention.</h1>
          <p>Premium hampers, signature rigid boxes, rattan baskets and bespoke creations — curated to turn celebrations into memories.</p>
          <Link className="hero-cta" to="/#collection">Explore the collection ↓</Link>
        </div>
      </div>
    </header>
  )
}
