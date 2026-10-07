import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { Link } from 'react-router-dom'
import { heroCta } from '../ui'

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

  // `hero-copy` and `hero-orb` are kept as GSAP selector hooks (no CSS attached).
  // The orb's rotation uses `transform` (not Tailwind's `rotate`) so GSAP reads and animates it correctly.
  return (
    <header
      ref={root}
      className="relative min-h-svh overflow-hidden bg-[linear-gradient(120deg,#2a1718,#6a2930_52%,#b98b57)] before:content-[''] before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_70%_40%,rgba(255,221,160,.24),transparent_34%),linear-gradient(90deg,rgba(20,10,10,.78),rgba(20,10,10,.12))]"
    >
      <div className="hero-orb absolute right-[7vw] bottom-[7vh] w-[36vw] h-[55vh] rounded-[48%_48%_12%_12%] bg-[linear-gradient(145deg,rgba(255,255,255,.2),rgba(0,0,0,.2)),url('/assets/blue-sandook.jpg')] bg-center bg-cover shadow-[20px_30px_90px_rgba(0,0,0,.35)] [transform:rotate(5deg)] saturate-85 tablet:w-[58vw] tablet:h-[48vh] tablet:-right-[5vw] tablet:opacity-50 phone:hidden" />
      <div className="relative z-2 min-h-svh pt-[170px] pb-[70px] px-[8vw] flex items-center phone:pt-[145px] phone:pb-[55px] phone:px-[7vw]">
        <div className="hero-copy max-w-[760px] text-white tablet:max-w-[650px]">
          <div className="text-[11px] tracking-[.25em] uppercase mb-[22px] text-[#e9c88d]">MANORATH 2026 • DIWALI GIFTING</div>
          <h1 className="font-display font-medium text-[length:clamp(64px,10vw,148px)] leading-[.78] mb-[35px] tracking-[-0.04em]">
            Gift<br />with<br />intention.
          </h1>
          <p className="max-w-[560px] text-[17px] leading-[1.8] text-[#f4e9dc] my-[1em]">Premium hampers, signature rigid boxes, rattan baskets and bespoke creations — curated to turn celebrations into memories.</p>
          <Link className={`${heroCta} bg-[#f5eadb] text-ink`} to="/#collection">Explore the collection ↓</Link>
        </div>
      </div>
    </header>
  )
}
