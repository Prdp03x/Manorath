import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { inclusions } from '../data/products'
import { CONFIG } from '../config'
import { whatsappUrl } from '../utils'
import { kicker, h2, h2Base, heroCta } from '../ui'

export function Intro() {
  return (
    <section className="sec py-[110px] px-[6vw] tablet:py-20 tablet:px-[5vw]">
      <div className="grid grid-cols-[1fr_1.5fr] gap-[8vw] items-end tablet:grid-cols-1">
        <div><div className={kicker}>The Manorath edit</div><h2 className={h2}>More than a gift.<br />A feeling.</h2></div>
        <p className="text-[17px] leading-[1.9] text-muted max-w-[680px] my-[1em]">At Manorath, a gift is a reflection of love, care and appreciation — a silent language of the heart. From signature rigid boxes and rattan totes to bespoke floral creations, every piece is thoughtfully designed for Diwali, weddings, birthdays and corporate gratitude.</p>
      </div>
    </section>
  )
}

export function Story() {
  return (
    <section className="grid grid-cols-2 min-h-[620px] bg-ink text-[#f8eee0] tablet:grid-cols-1" id="story">
      <div className="p-[10vw] pt-25">
        <div className={kicker}>Why Manorath</div>
        <h2 className={`${h2Base} text-[length:clamp(54px,6vw,90px)]`}>Designed for the moment.</h2>
        <p className="leading-[1.9] text-[#d7c9bc] my-[1em]">Every collection is crafted for diverse tastes, premium quality and timeless presentation. Inclusions can be customised according to your choice, making every hamper personal.</p>
        <p className="leading-[1.9] text-[#d7c9bc] my-[1em]">Processing time: minimum 20 days after confirmation. Orders are confirmed after 50% advance payment. Door-to-door delivery is available PAN India.</p>
      </div>
      <div className="min-h-[500px] bg-[url('/assets/storyboard.jpg')] bg-center bg-cover saturate-80 tablet:min-h-[380px]" />
    </section>
  )
}

export function Inclusions() {
  return (
    <section className="sec py-[110px] px-[6vw] bg-cream tablet:py-20 tablet:px-[5vw]" id="inclusions">
      <div className={kicker}>Build your hamper</div>
      <h2 className={h2}>Choose your inclusions.</h2>
      <p className="max-w-[700px] text-muted leading-[1.8] my-[1em]">The catalogue includes a wide mix of premium snacks, nuts, sweets, candles, fragrances, beverages and personalised gifting accessories.</p>
      <div className="flex flex-wrap gap-2.5 mt-[35px]">{inclusions.map((x) => <span className="px-4 py-3 border border-[#d8cbbb] bg-white text-[12px]" key={x}>{x}</span>)}</div>
    </section>
  )
}

const label = 'block mb-[5px] text-[10px] tracking-[.14em] uppercase text-gold'

export function Contact() {
  return (
    <section className="sec py-[110px] px-[6vw] tablet:py-20 tablet:px-[5vw]" id="contact">
      <div className="grid grid-cols-[1.1fr_.9fr] gap-[7vw] items-start tablet:grid-cols-1">
        <div>
          <div className={kicker}>Let's create something memorable</div>
          <h2 className={h2}>Talk to<br />Manorath.</h2>
          <p className="text-muted leading-[1.8] max-w-[540px] my-[1em]">Message us on WhatsApp for custom inclusions, bulk and corporate orders, or a final quotation.</p>
          <a className={`${heroCta} bg-ink text-white`} href={whatsappUrl('Hello Manorath, I would like to enquire about gifting.')} target="_blank" rel="noreferrer">Chat on WhatsApp</a>
        </div>
        <div className="bg-white border border-line p-[35px] [&>div]:py-[15px] [&>div]:border-b [&>div]:border-line [&>div:last-child]:border-b-0">
          <div><span className={label}>Contact person</span>{CONFIG.contactPerson}</div>
          <div><span className={label}>Phone / WhatsApp</span><a href={`tel:${CONFIG.phone.replace(/\s/g, '')}`}>{CONFIG.phone}</a></div>
          <div><span className={label}>Email</span><a href={`mailto:${CONFIG.email}`}>{CONFIG.email}</a></div>
          <div><span className={label}>Address</span>{CONFIG.address}</div>
          <div><span className={label}>Service</span>PAN India Door-to-Door Delivery</div>
        </div>
      </div>
    </section>
  )
}

export function Footer() {
  return (
    <footer className="flex justify-between gap-[30px] px-[6vw] py-[55px] bg-[#181213] text-[#d8cbc1] text-[12px] phone:flex-col">
      <strong className="flex items-center font-display text-[28px] text-white">
        <img src="/assets/logo.png" className='w-10 h-10' />
        <img src="/assets/textlogo.png" alt="" className='h-10' />
        </strong>
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