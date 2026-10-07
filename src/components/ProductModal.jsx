import { useEffect, useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { money } from '../utils'
import { useCart } from '../hooks/useCart.jsx'

export default function ProductModal({ product, onClose }) {
  const { add } = useCart()
  const inner = useRef(null)

  useLayoutEffect(() => {
    if (!product) return
    const t = gsap.from(inner.current, { y: 50, opacity: 0, duration: 0.45, ease: 'power3.out' })
    return () => t.kill()
  }, [product])

  useEffect(() => {
    if (!product) return
    const key = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', key)
    return () => window.removeEventListener('keydown', key)
  }, [product, onClose])

  if (!product) return null
  return (
    <div className="pmodal show" onClick={(e) => e.target === e.currentTarget && onClose()} data-lenis-prevent>
      <div className="pmodal-inner" ref={inner}>
        <div className="pmodal-img"><img src={product.image} alt={product.name} /></div>
        <div className="pmodal-copy">
          <button className="close" aria-label="Close" onClick={onClose}>×</button>
          <div className="kicker">{product.category}</div>
          <h2 style={{ fontSize: 58 }}>{product.name}</h2>
          <p style={{ color: 'var(--muted)', lineHeight: 1.8 }}>{product.description}</p>
          <div style={{ fontSize: 20, fontWeight: 600, margin: '25px 0' }}>{money(product.price)}</div>
          <button className="hero-cta" style={{ background: 'var(--ink)', color: '#fff' }} onClick={() => { add(product.id); onClose() }}>
            Add to bag
          </button>
        </div>
      </div>
    </div>
  )
}
