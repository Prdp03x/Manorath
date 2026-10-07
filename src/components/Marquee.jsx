import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'

const words = ['CURATED EMOTIONS', 'TIMELESS PRESENTATION', 'PREMIUM QUALITY', 'BESPOKE GIFTING']

export default function Marquee() {
  const track = useRef(null)
  useLayoutEffect(() => {
    const t = gsap.to(track.current, { xPercent: -20, duration: 18, repeat: -1, ease: 'none' })
    return () => t.kill()
  }, [])
  const items = [...words, ...words]
  return (
    <div className="overflow-hidden border-y border-line py-[18px] bg-[#f0e8dd]">
      <div className="flex whitespace-nowrap w-max font-display text-[29px] tracking-[.08em]" ref={track}>
        {items.map((w, i) => (
          <span className="px-[35px]" key={i}>{w} <b className="font-normal text-gold">✦</b></span>
        ))}
      </div>
    </div>
  )
}
