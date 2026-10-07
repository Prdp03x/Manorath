import { CONFIG } from './config'
import { products } from './data/products'

export const money = (n) => '₹' + n.toLocaleString('en-IN')

export const productById = (id) => products.find((p) => p.id === id)

export const whatsappUrl = (text) =>
  `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(text)}`

export function totals(lines) {
  const subtotal = lines.reduce((s, l) => s + l.product.price * l.qty, 0)
  const gst = Math.round((subtotal * CONFIG.gstPercent) / 100)
  const shipping = lines.length ? CONFIG.shippingCharge : 0
  const total = subtotal + gst + shipping
  const advance = Math.round((total * CONFIG.advancePercent) / 100)
  return { subtotal, gst, shipping, total, advance, balance: total - advance }
}
