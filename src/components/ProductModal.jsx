import { useEffect, useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { money } from '../utils'
import { useCart } from '../hooks/useCart.jsx'
import { kicker, h2Base, heroCta } from '../ui'

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
    <div
      className="fixed inset-0 z-60 flex items-center justify-center p-5 bg-[rgba(20,15,15,.65)] phone:p-3 phone:overflow-y-auto"
      onClick={(e) => e.target === e.currentTarget && onClose()}
      data-lenis-prevent
    >
      <div
        className="w-full max-w-[900px] grid grid-cols-2 bg-white phone:flex phone:flex-col phone:max-w-[420px] phone:max-h-[calc(100dvh_-_24px)] phone:overflow-y-auto phone:rounded-[4px]"
        ref={inner}
      >
        <div className="min-h-[450px] bg-[#eee] phone:w-full phone:h-[min(42vw,260px)] phone:min-h-[450px] phone:shrink-0">
          <img className="w-full h-full object-cover phone:object-contain" src={product.image} alt={product.name} />
        </div>
        <div className="p-[45px] phone:relative phone:px-[18px] phone:pt-[18px] phone:pb-5">
          <button
            className="float-right border-0 bg-transparent text-[24px] phone:absolute phone:top-2.5 phone:right-3 phone:text-[26px] phone:leading-none phone:z-2"
            aria-label="Close"
            onClick={onClose}
          >
            ×
          </button>
          <div className={`${kicker} phone:pr-[35px]`}>{product.category}</div>
          <h2 className={`${h2Base} text-[58px] phone:text-[length:clamp(28px,8vw,38px)] phone:leading-[1.05] phone:mt-2 phone:mr-[35px] phone:mb-2.5 phone:ml-0`}>
            {product.name}
          </h2>
          <p className="text-muted leading-[1.8] my-[1em] phone:text-[13px] phone:leading-[1.55] phone:m-0">{product.description}</p>
          <div className="text-[20px] font-semibold my-[25px] phone:text-[17px] phone:my-3.5">{money(product.price)}</div>
          <button
            className={`${heroCta} bg-ink text-white phone:w-full phone:px-4 phone:py-3`}
            onClick={() => { add(product.id); onClose() }}
          >
            Add to bag
          </button>
        </div>
      </div>
    </div>
  )
}
