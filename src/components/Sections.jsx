import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { inclusions } from '../data/products'
import { CONFIG } from '../config'
import { whatsappUrl } from '../utils'

export function Intro() {
  return (
    <section className="sec">
      <div className="intro">
        <div><div className="kicker">The Manorath edit</div><h2>More than a gift.<br />A feeling.</h2></div>
        <p>At Manorath, a gift is a reflection of love, care and appreciation — a silent language of the heart. From signature rigid boxes and rattan totes to bespoke floral creations, every piece is thoughtfully designed for Diwali, weddings, birthdays and corporate gratitude.</p>
      </div>
    </section>
  )
}

export function Story() {
  return (
    <section className="story" id="story">
      <div className="story-copy">
        <div className="kicker">Why Manorath</div>
        <h2>Designed for the moment.</h2>
        <p>Every collection is crafted for diverse tastes, premium quality and timeless presentation. Inclusions can be customised according to your choice, making every hamper personal.</p>
        <p>Processing time: minimum 20 days after confirmation. Orders are confirmed after 50% advance payment. Door-to-door delivery is available PAN India.</p>
      </div>
      <div className="story-art" />
    </section>
  )
}

export function Inclusions() {
  return (
    <section className="sec inclusions" id="inclusions">
      <div className="kicker">Build your hamper</div>
      <h2>Choose your inclusions.</h2>
      <p style={{ maxWidth: 700, color: 'var(--muted)', lineHeight: 1.8 }}>The catalogue includes a wide mix of premium snacks, nuts, sweets, candles, fragrances, beverages and personalised gifting accessories.</p>
      <div className="chips">{inclusions.map((x) => <span className="chip" key={x}>{x}</span>)}</div>
    </section>
  )
}

export function Contact() {
  return (
    <section className="sec" id="contact">
      <div className="contact">
        <div>
          <div className="kicker">Let's create something memorable</div>
          <h2>Talk to<br />Manorath.</h2>
          <p style={{ color: 'var(--muted)', lineHeight: 1.8, maxWidth: 540 }}>Message us on WhatsApp for custom inclusions, bulk and corporate orders, or a final quotation.</p>
          <a className="hero-cta" style={{ background: 'var(--ink)', color: '#fff' }} href={whatsappUrl('Hello Manorath, I would like to enquire about gifting.')} target="_blank" rel="noreferrer">Chat on WhatsApp</a>
        </div>
        <div className="contact-box">
          <div><span className="label">Contact person</span>{CONFIG.contactPerson}</div>
          <div><span className="label">Phone / WhatsApp</span><a href={`tel:${CONFIG.phone.replace(/\s/g, '')}`}>{CONFIG.phone}</a></div>
          <div><span className="label">Email</span><a href={`mailto:${CONFIG.email}`}>{CONFIG.email}</a></div>
          <div><span className="label">Address</span>{CONFIG.address}</div>
          <div><span className="label">Service</span>PAN India Door-to-Door Delivery</div>
        </div>
      </div>
    </section>
  )
}

export function Footer() {
  return (
    <footer className="footer">
      <strong>MANORATH</strong>
      <span>Premium gifting • 2026 Catalogue</span>
      <span>GST &amp; shipping extra • Customisation available</span>
    </footer>
  )
}

/** Reveals every h2 inside .sec as it scrolls into view */
export function useHeadingReveals(scope) {
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray('.sec h2').forEach((el) =>
        gsap.from(el, { y: 60, opacity: 0, duration: 0.9, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 85%' } })
      )
    }, scope)
    return () => ctx.revert()
  }, [scope])
}

/** Reveals every h2 inside .sec, then moves it up/down with scroll (parallax) */
// export function useHeadingReveals(scope) {
//   useLayoutEffect(() => {
//     const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
//     const ctx = gsap.context(() => {
//       gsap.utils.toArray('.sec h2').forEach((el) => {
//         // 1) reveal (animates y + opacity)
//         gsap.from(el, { y: 60, opacity: 0, duration: 0.9, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 85%' } })

//         // 2) parallax (animates yPercent, so it doesn't fight the reveal's y)
//         if (!reduce) {
//           gsap.fromTo(
//             el,
//             { yPercent: 35 },
//             {
//               yPercent: -35,
//               ease: 'none',
//               scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true },
//             }
//           )
//         }
//       })
//     }, scope)
//     return () => ctx.revert()
//   }, [scope])
// }