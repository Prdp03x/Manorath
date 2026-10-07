import { Link } from 'react-router-dom'
import { useCart } from '../hooks/useCart.jsx'
import { money } from '../utils'

export default function CartDrawer() {
  const { lines, subtotal, open, setOpen, setQty } = useCart()
  return (
    <div className={'cart' + (open ? ' open' : '')} aria-hidden={!open}>
      <div className="cart-head">
        <strong>Your Bag</strong>
        <button className="close" aria-label="Close bag" onClick={() => setOpen(false)}>×</button>
      </div>
      <div className="cart-items" data-lenis-prevent>
        {lines.length === 0 && <div className="empty-cart">Your bag is empty.</div>}
        {lines.map(({ product, qty }) => (
          <div className="cart-item" key={product.id}>
            <div className="ci-name">
              {product.name}
              <div className="ci-qty">
                <button aria-label="Decrease" onClick={() => setQty(product.id, qty - 1)}>−</button>
                <span>{qty}</span>
                <button aria-label="Increase" onClick={() => setQty(product.id, qty + 1)}>+</button>
              </div>
            </div>
            <strong>{money(product.price * qty)}</strong>
          </div>
        ))}
      </div>
      <div className="cart-total-row"><span>Total</span><span>{money(subtotal)}</span></div>
      <p className="cart-note">GST &amp; shipping extra. Order confirmed after 50% advance.</p>
      {lines.length ? (
        <Link className="checkout" to="/checkout" onClick={() => setOpen(false)} style={{ display: 'block', textAlign: 'center' }}>
          Checkout &amp; order on WhatsApp
        </Link>
      ) : (
        <button className="checkout" disabled style={{ opacity: 0.5 }}>Checkout</button>
      )}
    </div>
  )
}