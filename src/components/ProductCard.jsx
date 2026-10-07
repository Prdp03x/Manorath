import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { money } from '../utils'

export default function ProductCard({ product, index, onOpen, onAdd }) {
  const ref = useRef(null)
  useLayoutEffect(() => {
  const ctx = gsap.context(() => {
    gsap.from(ref.current, {
      y: 35,
      opacity: 0,
      duration: 0.65,
      delay: index * 0.035,
      ease: 'power3.out',
      clearProps: 'transform,opacity', // optional: removes inline styles after finishing
    })
  }, ref)
  return () => ctx.revert()
}, [index])

  return (
    <article className="pcard" ref={ref}>
      <div className="media" onClick={() => onOpen(product)} style={{ cursor: 'pointer' }}>
        <img loading="lazy" src={product.image} alt={product.name} />
      </div>
      <div className="tag">{product.category}</div>
      <div className="info">
        <h3>{product.name}</h3>
        <div className="desc">{product.description}</div>
        <div className="prow">
          <span className="pprice">{money(product.price)}</span>
          <button className="add" onClick={() => onAdd(product.id)}>Add +</button>
        </div>
      </div>
    </article>
  )
}
