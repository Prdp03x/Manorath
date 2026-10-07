import { Link } from 'react-router-dom'
import { useCart } from '../hooks/useCart.jsx'
import { money } from '../utils'
import { RiShoppingBagLine } from '@remixicon/react'

export default function CartDrawer() {
  const { lines, subtotal, open, setOpen, setQty, count } = useCart()
  const showFab = count > 0 && !open
  return (
    <>
      <div
        className={
          'fixed z-50 right-5 bottom-5 w-[min(390px,calc(100vw_-_40px))] bg-white border border-line p-5 ' +
          'shadow-[0_25px_80px_rgba(0,0,0,.25)] [transition:translate_.5s_cubic-bezier(.2,.8,.2,1),opacity_.4s] ' +
          (open ? 'translate-y-0 opacity-100 pointer-events-auto' : 'translate-y-[130%] opacity-0 pointer-events-none')
        }
        aria-hidden={!open}
      >
        <div className="flex justify-between">
          <strong>Your Bag</strong>
          <button className="border-0 bg-transparent text-[24px]" aria-label="Close bag" onClick={() => setOpen(false)}>×</button>
        </div>
        <div className="max-h-60 overflow-auto my-[15px]" data-lenis-prevent>
          {lines.length === 0 && <div className="text-[#777] py-5 text-[13px]">Your bag is empty.</div>}
          {lines.map(({ product, qty }) => (
            <div className="flex justify-between items-center gap-2.5 py-2.5 border-b border-line text-[12px]" key={product.id}>
              <div className="flex-1">
                {product.name}
                <div className="flex items-center gap-1.5 mt-1">
                  <button className="w-[22px] h-[22px] border border-line bg-white" aria-label="Decrease" onClick={() => setQty(product.id, qty - 1)}>−</button>
                  <span>{qty}</span>
                  <button className="w-[22px] h-[22px] border border-line bg-white" aria-label="Increase" onClick={() => setQty(product.id, qty + 1)}>+</button>
                </div>
              </div>
              <strong>{money(product.price * qty)}</strong>
            </div>
          ))}
        </div>
        <div className="flex justify-between font-semibold my-3"><span>Total</span><span>{money(subtotal)}</span></div>
        <p className="text-[10px] text-muted mb-3 leading-[1.5]">GST &amp; shipping extra. Order confirmed after 50% advance.</p>
        {lines.length ? (
          <Link
            className="block w-full p-3.5 text-center bg-ink text-white tracking-[.1em] uppercase text-[11px]"
            to="/checkout"
            onClick={() => setOpen(false)}
          >
            Checkout &amp; order on WhatsApp
          </Link>
        ) : (
          <button className="w-full p-3.5 border-0 bg-ink text-white tracking-[.1em] uppercase text-[11px] opacity-50" disabled>Checkout</button>
        )}
      </div>
      <button
  className={
    'fixed z-50 right-6 bottom-6 w-14 h-14 rounded-full bg-wine text-white grid place-items-center ' +
    'shadow-[0_12px_30px_rgba(0,0,0,.25)] transition-[opacity,scale] duration-300 phone:right-4 phone:bottom-4 ' +
    (showFab
      ? 'opacity-100 scale-100 hover:scale-105 pointer-events-auto'
      : 'opacity-0 scale-75 pointer-events-none')
  }
  aria-label="Open bag"
  aria-hidden={!showFab}
  tabIndex={showFab ? 0 : -1}
  onClick={() => setOpen(true)}
>
        <RiShoppingBagLine size={22} />
        <span className="absolute -top-1 -right-1 min-w-[22px] h-[22px] px-1.5 rounded-full bg-ink text-[11px] grid place-items-center">
          {count}
        </span>
      </button>
    </>
  )
}
