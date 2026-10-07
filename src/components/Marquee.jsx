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
    <div className="marquee">
      <div className="marquee-track" ref={track}>
        {items.map((w, i) => (
          <span key={i}>{w} <b>✦</b></span>
        ))}
      </div>
    </div>
  )
}
