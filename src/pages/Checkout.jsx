// import { useLayoutEffect, useRef, useState } from 'react'
// import { Link } from 'react-router-dom'
// import gsap from 'gsap'
// import { useCart } from '../hooks/useCart.jsx'
// import { CONFIG } from '../config'
// import { money, whatsappUrl } from '../utils'
// import {RiDeleteBin6Line, RiWhatsappLine} from '@remixicon/react'

// const STATES = ['Gujarat', 'Maharashtra', 'Rajasthan', 'Delhi', 'Karnataka', 'Tamil Nadu', 'West Bengal', 'Other']
// const OCCASIONS = ['Diwali', 'Wedding', 'Birthday', 'Corporate gifting', 'Other']
// const PAYMENTS = ['UPI', 'Card', 'Bank Transfer']

// const minDate = () => {
//   const d = new Date()
//   d.setDate(d.getDate() + 20)
//   return d.toISOString().slice(0, 10)
// }

// const initial = {
//   email: '', phone: '', name: '', address: '', city: '', state: '', pin: '',
//   deliveryDate: '', recipient: '', occasion: 'Diwali', message: '', custom: '', payment: 'UPI',
// }

// function Field({ id, label, full, children }) {
//   return (
//     <div className={'field' + (full ? ' full' : '')}>
//       <label htmlFor={id}>{label}</label>
//       {children}
//     </div>
//   )
// }

// export default function Checkout() {
//   const { lines, subtotal, advance, balance, setQty, clear } = useCart()
//   const [f, setF] = useState(initial)
//   const [coupon, setCoupon] = useState('')
//   const [couponMsg, setCouponMsg] = useState('')
//   const [sent, setSent] = useState(null)
//   const root = useRef(null)
//   const formRef = useRef(null)

//   useLayoutEffect(() => {
//     const ctx = gsap.context(() => {
//       gsap.from('.announcement', { y: -20, opacity: 0, duration: 0.6, ease: 'power3.out' })
//       gsap.from('.header', { y: -35, opacity: 0, duration: 0.8, delay: 0.1, ease: 'power3.out' })
//       gsap.from('h1', { y: 30, opacity: 0, duration: 1, delay: 0.2, ease: 'power3.out' })
//       gsap.from('.reveal', { y: 40, opacity: 0, duration: 0.8, stagger: 0.08, delay: 0.25, ease: 'power3.out' })
//     }, root)
//     return () => ctx.revert()
//   }, [lines.length === 0])

//   const set = (k) => (e) => setF((cur) => ({ ...cur, [k]: e.target.value }))

//   const itemsText = lines
//     .map((l, i) => `${i + 1}. ${l.product.name} × ${l.qty} — ${money(l.product.price * l.qty)}`)
//     .join('\n')

//   const orderMessage = () =>
//     [
//       `*New Manorath order*`,
//       ``,
//       `*Items*`,
//       itemsText,
//       ``,
//       `Catalogue subtotal: ${money(subtotal)} (GST & shipping extra)`,
//       `50% advance to confirm: ${money(advance)}`,
//       `Balance: ${money(balance)}`,
//       ``,
//       `*Customer*`,
//       `Name: ${f.name}`,
//       `Phone: ${f.phone}`,
//       `Email: ${f.email}`,
//       ``,
//       `*Delivery*`,
//       `${f.address}, ${f.city}, ${f.state} - ${f.pin}`,
//       f.deliveryDate ? `Preferred date: ${f.deliveryDate}` : '',
//       ``,
//       `*Gift details*`,
//       `Occasion: ${f.occasion}`,
//       f.recipient ? `Recipient: ${f.recipient}` : '',
//       f.message ? `Gift message: ${f.message}` : '',
//       f.custom ? `Customisation: ${f.custom}` : '',
//       ``,
//       `Preferred advance payment mode: ${f.payment}`,
//       `Please share the final quotation and payment details.`,
//     ]
//       .filter((l, i, a) => !(l === '' && a[i - 1] === ''))
//       .join('\n')

//   const placeOrder = () => {
//     if (!formRef.current.reportValidity()) return
//     const url = whatsappUrl(orderMessage())
//     window.open(url, '_blank')
//     setSent({ url, advance, subtotal })
//   }

//   const enquire = () => {
//     const msg = `Hello Manorath, I want to enquire about a gifting order. Name: ${f.name || 'Customer'}. Catalogue value shown: ${money(subtotal)}.${lines.length ? `\n${itemsText}` : ''}\nPlease share the final quotation and customization options.`
//     window.open(whatsappUrl(msg), '_blank')
//   }

//   const applyCoupon = () =>
//     setCouponMsg(coupon.trim() ? 'Coupon codes are not enabled yet — we apply any offers in your final quotation.' : 'Enter a coupon code.')

//   const done = () => {
//     clear()
//     setSent(null)
//   }

//   const Header = (
//     <>
//       <div className="announcement">PAN INDIA DELIVERY • BESPOKE GIFTING • MANORATH 2026</div>
//       <header className="header">
//         <div className="header-inner">
//           <Link to="/" className="logo">MANORATH</Link>
//           <div className="secure"><span className="lock">⌁</span> Order via WhatsApp</div>
//         </div>
//       </header>
//     </>
//   )

//   if (lines.length === 0 && !sent) {
//     return (
//       <div className="co" ref={root}>
//         {Header}
//         <main className="page">
//           <div className="card empty reveal">
//             <div className="eyebrow">Your bag</div>
//             <h1>Nothing here yet.</h1>
//             <p className="sub" style={{ margin: '12px auto 0' }}>Pick a hamper from the collection and come back to place your order.</p>
//             <Link to="/#collection" className="cta">Browse the collection</Link>
//           </div>
//         </main>
//       </div>
//     )
//   }

//   return (
//     <div className="co" ref={root}>
//       {Header}
//       <main className="page">
//         <Link to="/" className="back">← Continue shopping</Link>
//         <div className="title-row">
//           <div>
//             <div className="eyebrow">Your gifting journey</div>
//             <h1>Complete your order.</h1>
//             <p className="sub">Tell us where your Manorath gifting should go. We'll send your order to our team on WhatsApp, who confirm the final quotation and advance payment.</p>
//           </div>
//         </div>

//         <div className="layout">
//           <div>
//             <form ref={formRef} onSubmit={(e) => e.preventDefault()}>
//               <section className="card section reveal">
//                 <div className="section-head"><h2>Contact</h2><span className="badge">01</span></div>
//                 <div className="grid">
//                   <Field id="email" label="Email address"><input id="email" type="email" placeholder="you@example.com" required value={f.email} onChange={set('email')} /></Field>
//                   <Field id="phone" label="Mobile number"><input id="phone" type="tel" placeholder="+91 98XXXXXXXX" required value={f.phone} onChange={set('phone')} /></Field>
//                 </div>
//               </section>

//               <section className="card section reveal">
//                 <div className="section-head"><h2>Delivery address</h2><span className="badge">02</span></div>
//                 <div className="grid">
//                   <Field id="name" label="Full name" full><input id="name" type="text" placeholder="Recipient / contact person" required value={f.name} onChange={set('name')} /></Field>
//                   <Field id="address" label="Address" full><textarea id="address" placeholder="House / office / street / landmark" required value={f.address} onChange={set('address')} /></Field>
//                   <Field id="city" label="City"><input id="city" type="text" placeholder="City" required value={f.city} onChange={set('city')} /></Field>
//                   <Field id="state" label="State">
//                     <select id="state" required value={f.state} onChange={set('state')}>
//                       <option value="">Select state</option>
//                       {STATES.map((s) => <option key={s}>{s}</option>)}
//                     </select>
//                   </Field>
//                   <Field id="pin" label="PIN code"><input id="pin" inputMode="numeric" maxLength={6} pattern="[0-9]{6}" title="6-digit PIN code" placeholder="360001" required value={f.pin} onChange={set('pin')} /></Field>
//                   <Field id="deliveryDate" label="Preferred delivery date"><input id="deliveryDate" type="date" min={minDate()} value={f.deliveryDate} onChange={set('deliveryDate')} /></Field>
//                 </div>
//                 <div className="notice">Catalogue terms specify a minimum processing time of 20 days after confirmation. Door-to-door delivery is available PAN India; shipping is charged separately.</div>
//               </section>

//               <section className="card section reveal">
//                 <div className="section-head"><h2>Delivery method</h2><span className="badge">03</span></div>
//                 <label className="delivery-option selected">
//                   <input className="radio" type="radio" name="delivery" defaultChecked readOnly />
//                   <div><div className="option-title">PAN India door-to-door delivery</div><div className="option-meta">Shipping calculated separately and confirmed with your final quotation.</div></div>
//                 </label>
//               </section>

//               <section className="card section reveal">
//                 <div className="section-head"><h2>Gift details</h2><span className="badge">04</span></div>
//                 <div className="grid">
//                   <Field id="recipient" label="Recipient name"><input id="recipient" type="text" placeholder="Optional" value={f.recipient} onChange={set('recipient')} /></Field>
//                   <Field id="occasion" label="Occasion">
//                     <select id="occasion" value={f.occasion} onChange={set('occasion')}>{OCCASIONS.map((o) => <option key={o}>{o}</option>)}</select>
//                   </Field>
//                   <Field id="message" label="Gift message" full><textarea id="message" placeholder="Add a personal note for the recipient…" value={f.message} onChange={set('message')} /></Field>
//                   <Field id="custom" label="Customization / inclusion request" full><textarea id="custom" placeholder="Tell us if you want different jars, sweets, chocolates, candles, branding, etc." value={f.custom} onChange={set('custom')} /></Field>
//                 </div>
//               </section>

//               <section className="card section reveal">
//                 <div className="section-head"><h2>Advance payment</h2><span className="badge">05</span></div>
//                 <div className="payment-grid">
//                   {PAYMENTS.map((p) => (
//                     <label key={p} className={'payment-option' + (f.payment === p ? ' selected' : '')}>
//                       <input className="radio" type="radio" name="payment" value={p} checked={f.payment === p} onChange={set('payment')} />
//                       <div><div className="option-title">{p}</div><div className="option-meta">Preferred mode</div></div>
//                     </label>
//                   ))}
//                 </div>
//                 <div className="notice"><strong>50% advance:</strong> An order is confirmed after 50% advance payment. No payment is collected on this site — our team shares payment details on WhatsApp after you place the order.</div>
//               </section>
//             </form>
//           </div>

//           <aside className="card summary reveal">
//             <h2 className="summary-title">Your order</h2>
//             {lines.map(({ product, qty }) => (
//               <div className="product" key={product.id}>
//                 <img src={product.image} alt={product.name} />
//                 <div>
//                   <div className="product-name">{product.name}</div>
//                   <div className="product-meta">{money(product.price)} each</div>
//                   <div className="qty">
//                     <button type="button" aria-label="Decrease" onClick={() => setQty(product.id, qty - 1)}>−</button>
//                     <span>{qty}</span>
//                     <button type="button" aria-label="Increase" onClick={() => setQty(product.id, qty + 1)}>+</button>
//                     <button style={{border: "none", textDecoration: "underline", fontSize: "12px"}} type="button" className="" onClick={() => setQty(product.id, 0)}>
//                       <RiDeleteBin6Line size={12} color='red'/>
//                     </button>
//                   </div>
//                 </div>
//                 <div className="price">{money(product.price * qty)}</div>
//               </div>
//             ))}

//             <div className="coupon">
//               <input placeholder="Coupon code" value={coupon} onChange={(e) => setCoupon(e.target.value)} />
//               <button className="btn-small" type="button" onClick={applyCoupon}>Apply</button>
//             </div>
//             {couponMsg && <div className="coupon-msg">{couponMsg}</div>}

//             <div className="rows">
//               <div className="row"><span>Catalogue subtotal</span><strong>{money(subtotal)}</strong></div>
//               <div className="row"><span>GST <span className="extra">EXTRA</span></span><span>Calculated separately</span></div>
//               <div className="row"><span>Shipping <span className="extra">EXTRA</span></span><span>Calculated separately</span></div>
//               <div className="row total"><span>Order value</span><strong>{money(subtotal)}</strong></div>
//               <div className="row advance"><span>{CONFIG.advancePercent}% advance due</span><strong>{money(advance)}</strong></div>
//               <div className="row"><span>Balance after advance</span><strong>{money(balance)}</strong></div>
//             </div>

//             <button className="cta" type="button" onClick={placeOrder} disabled={!lines.length} style={{display: "flex", alignItems: "center", justifyContent: "center", gap: "10px"}}>
//               <RiWhatsappLine size={20} /> Place order on WhatsApp
//               </button>
//             <button className="cta whatsapp" type="button" onClick={enquire}>Just enquire on WhatsApp</button>

//             <div className="trust"><span>Customisable</span><span>Pan India</span><span>20+ days</span></div>
//             <div className="notice">Final pricing is subject to selected inclusions/customisation. Branding/customisation may be extra unless specifically included.</div>
//           </aside>
//         </div>
//       </main>

//       <footer>
//         <strong>MANORATH</strong> · Premium gifting · {CONFIG.contactPerson} · {CONFIG.phone}
//       </footer>

//       {sent && (
//         <div className="modal show">
//           <div className="modal-box">
//             <div className="check">✓</div>
//             <div className="eyebrow">Order ready</div>
//             <h2>Sent to WhatsApp.</h2>
//             <p>Your order details have been prepared in WhatsApp. Press send there so our team receives it — we'll reply with the final quotation and payment details.</p>
//             <p><strong>50% advance to confirm:</strong> {money(sent.advance)}</p>
//             <div className="modal-actions">
//               <a className="cta" style={{ textDecoration: 'none', display: 'block' }} href={sent.url} target="_blank" rel="noreferrer">Open WhatsApp again</a>
//               <Link className="cta whatsapp" style={{ textDecoration: 'none', display: 'block', marginTop: 0 }} to="/" onClick={done}>Done — back to store</Link>
//             </div>
//             <div className="demo-note">No payment was collected on this site</div>
//           </div>
//         </div>
//       )}
//     </div>
//   )
// }

import { useLayoutEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { useCart } from '../hooks/useCart.jsx'
import { CONFIG } from '../config'
import { money, whatsappUrl } from '../utils'
import { RiDeleteBin6Line, RiWhatsappLine } from '@remixicon/react'

const STATES = ['Gujarat', 'Maharashtra', 'Rajasthan', 'Delhi', 'Karnataka', 'Tamil Nadu', 'West Bengal', 'Other']
const OCCASIONS = ['Diwali', 'Wedding', 'Birthday', 'Corporate gifting', 'Other']
const PAYMENTS = ['UPI', 'Card', 'Bank Transfer']

const minDate = () => {
  const d = new Date()
  d.setDate(d.getDate() + 20)
  return d.toISOString().slice(0, 10)
}

const initial = {
  email: '', phone: '', name: '', address: '', city: '', state: '', pin: '',
  deliveryDate: '', recipient: '', occasion: 'Diwali', message: '', custom: '', payment: 'UPI',
}

function Field({ id, label, full, children }) {
  return (
    <div className={'field' + (full ? ' full' : '')}>
      <label htmlFor={id}>{label}</label>
      {children}
    </div>
  )
}

export default function Checkout() {
  const { lines, subtotal, gst, shipping, total, advance, balance, setQty, clear } = useCart()
  const [f, setF] = useState(initial)
  const [coupon, setCoupon] = useState('')
  const [couponMsg, setCouponMsg] = useState('')
  const [sent, setSent] = useState(null)
  const root = useRef(null)
  const formRef = useRef(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.announcement', { y: -20, opacity: 0, duration: 0.6, ease: 'power3.out' })
      gsap.from('.header', { y: -35, opacity: 0, duration: 0.8, delay: 0.1, ease: 'power3.out' })
      gsap.from('h1', { y: 30, opacity: 0, duration: 1, delay: 0.2, ease: 'power3.out' })
      gsap.from('.reveal', { y: 40, opacity: 0, duration: 0.8, stagger: 0.08, delay: 0.25, ease: 'power3.out' })
    }, root)
    return () => ctx.revert()
  }, [lines.length === 0])

  const set = (k) => (e) => setF((cur) => ({ ...cur, [k]: e.target.value }))

  const itemsText = lines
    .map((l, i) => `${i + 1}. ${l.product.name} × ${l.qty} — ${money(l.product.price * l.qty)}`)
    .join('\n')

  const orderMessage = () =>
    [
      `*New Manorath order*`,
      ``,
      `*Items*`,
      itemsText,
      ``,
      `Subtotal: ${money(subtotal)}`,
      `GST (${CONFIG.gstPercent}%): ${money(gst)}`,
      `Shipping: ${money(shipping)}`,
      `*Order total: ${money(total)}*`,
      `${CONFIG.advancePercent}% advance to confirm: ${money(advance)}`,
      `Balance: ${money(balance)}`,
      ``,
      `*Customer*`,
      `Name: ${f.name}`,
      `Phone: ${f.phone}`,
      `Email: ${f.email}`,
      ``,
      `*Delivery*`,
      `${f.address}, ${f.city}, ${f.state} - ${f.pin}`,
      f.deliveryDate ? `Preferred date: ${f.deliveryDate}` : '',
      ``,
      `*Gift details*`,
      `Occasion: ${f.occasion}`,
      f.recipient ? `Recipient: ${f.recipient}` : '',
      f.message ? `Gift message: ${f.message}` : '',
      f.custom ? `Customisation: ${f.custom}` : '',
      ``,
      `Preferred advance payment mode: ${f.payment}`,
      `Please share the final quotation and payment details.`,
    ]
      .filter((l, i, a) => !(l === '' && a[i - 1] === ''))
      .join('\n')

  const placeOrder = () => {
    if (!formRef.current.reportValidity()) return
    const url = whatsappUrl(orderMessage())
    window.open(url, '_blank')
    setSent({ url, advance, total })
  }

  const enquire = () => {
    const msg = `Hello Manorath, I want to enquire about a gifting order. Name: ${f.name || 'Customer'}. Order total shown: ${money(total)}.${lines.length ? `\n${itemsText}` : ''}\nPlease share the final quotation and customization options.`
    window.open(whatsappUrl(msg), '_blank')
  }

  const applyCoupon = () =>
    setCouponMsg(coupon.trim() ? 'Coupon codes are not enabled yet — we apply any offers in your final quotation.' : 'Enter a coupon code.')

  const done = () => {
    clear()
    setSent(null)
  }

  const Header = (
    <>
      <div className="announcement">PAN INDIA DELIVERY • BESPOKE GIFTING • MANORATH 2026</div>
      <header className="header">
        <div className="header-inner">
          <Link to="/" className="logo">MANORATH</Link>
          <div className="secure"><span className="lock">⌁</span> Order via WhatsApp</div>
        </div>
      </header>
    </>
  )

  if (lines.length === 0 && !sent) {
    return (
      <div className="co" ref={root}>
        {Header}
        <main className="page">
          <div className="card empty reveal">
            <div className="eyebrow">Your bag</div>
            <h1>Nothing here yet.</h1>
            <p className="sub" style={{ margin: '12px auto 0' }}>Pick a hamper from the collection and come back to place your order.</p>
            <Link to="/#collection" className="cta">Browse the collection</Link>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="co" ref={root}>
      {Header}
      <main className="page">
        <Link to="/" className="back">← Continue shopping</Link>
        <div className="title-row">
          <div>
            <div className="eyebrow">Your gifting journey</div>
            <h1>Complete your order.</h1>
            <p className="sub">Tell us where your Manorath gifting should go. We'll send your order to our team on WhatsApp, who confirm the final quotation and advance payment.</p>
          </div>
        </div>

        <div className="layout">
          <div>
            <form ref={formRef} onSubmit={(e) => e.preventDefault()}>
              <section className="card section reveal">
                <div className="section-head"><h2>Contact</h2><span className="badge">01</span></div>
                <div className="grid">
                  <Field id="email" label="Email address"><input id="email" type="email" placeholder="you@example.com" required value={f.email} onChange={set('email')} /></Field>
                  <Field id="phone" label="Mobile number"><input id="phone" type="tel" placeholder="+91 98XXXXXXXX" required value={f.phone} onChange={set('phone')} /></Field>
                </div>
              </section>

              <section className="card section reveal">
                <div className="section-head"><h2>Delivery address</h2><span className="badge">02</span></div>
                <div className="grid">
                  <Field id="name" label="Full name" full><input id="name" type="text" placeholder="Recipient / contact person" required value={f.name} onChange={set('name')} /></Field>
                  <Field id="address" label="Address" full><textarea id="address" placeholder="House / office / street / landmark" required value={f.address} onChange={set('address')} /></Field>
                  <Field id="city" label="City"><input id="city" type="text" placeholder="City" required value={f.city} onChange={set('city')} /></Field>
                  <Field id="state" label="State">
                    <select id="state" required value={f.state} onChange={set('state')}>
                      <option value="">Select state</option>
                      {STATES.map((s) => <option key={s}>{s}</option>)}
                    </select>
                  </Field>
                  <Field id="pin" label="PIN code"><input id="pin" inputMode="numeric" maxLength={6} pattern="[0-9]{6}" title="6-digit PIN code" placeholder="360001" required value={f.pin} onChange={set('pin')} /></Field>
                  <Field id="deliveryDate" label="Preferred delivery date"><input id="deliveryDate" type="date" min={minDate()} value={f.deliveryDate} onChange={set('deliveryDate')} /></Field>
                </div>
                <div className="notice">Catalogue terms specify a minimum processing time of 20 days after confirmation. Door-to-door delivery is available PAN India; a flat {money(CONFIG.shippingCharge)} shipping charge applies.</div>
              </section>

              <section className="card section reveal">
                <div className="section-head"><h2>Delivery method</h2><span className="badge">03</span></div>
                <label className="delivery-option selected">
                  <input className="radio" type="radio" name="delivery" defaultChecked readOnly />
                  <div><div className="option-title">PAN India door-to-door delivery</div><div className="option-meta">Flat {money(CONFIG.shippingCharge)} shipping charge, included in your order total.</div></div>
                </label>
              </section>

              <section className="card section reveal">
                <div className="section-head"><h2>Gift details</h2><span className="badge">04</span></div>
                <div className="grid">
                  <Field id="recipient" label="Recipient name"><input id="recipient" type="text" placeholder="Optional" value={f.recipient} onChange={set('recipient')} /></Field>
                  <Field id="occasion" label="Occasion">
                    <select id="occasion" value={f.occasion} onChange={set('occasion')}>{OCCASIONS.map((o) => <option key={o}>{o}</option>)}</select>
                  </Field>
                  <Field id="message" label="Gift message" full><textarea id="message" placeholder="Add a personal note for the recipient…" value={f.message} onChange={set('message')} /></Field>
                  <Field id="custom" label="Customization / inclusion request" full><textarea id="custom" placeholder="Tell us if you want different jars, sweets, chocolates, candles, branding, etc." value={f.custom} onChange={set('custom')} /></Field>
                </div>
              </section>

              <section className="card section reveal">
                <div className="section-head"><h2>Advance payment</h2><span className="badge">05</span></div>
                <div className="payment-grid">
                  {PAYMENTS.map((p) => (
                    <label key={p} className={'payment-option' + (f.payment === p ? ' selected' : '')}>
                      <input className="radio" type="radio" name="payment" value={p} checked={f.payment === p} onChange={set('payment')} />
                      <div><div className="option-title">{p}</div><div className="option-meta">Preferred mode</div></div>
                    </label>
                  ))}
                </div>
                <div className="notice"><strong>{CONFIG.advancePercent}% advance:</strong> An order is confirmed after {CONFIG.advancePercent}% advance payment. No payment is collected on this site — our team shares payment details on WhatsApp after you place the order.</div>
              </section>
            </form>
          </div>

          <aside className="card summary reveal">
            <h2 className="summary-title">Your order</h2>
            {lines.map(({ product, qty }) => (
              <div className="product" key={product.id}>
                <img src={product.image} alt={product.name} />
                <div>
                  <div className="product-name">{product.name}</div>
                  <div className="product-meta">{money(product.price)} each</div>
                  <div className="qty">
                    <button type="button" aria-label="Decrease" onClick={() => setQty(product.id, qty - 1)}>−</button>
                    <span>{qty}</span>
                    <button type="button" aria-label="Increase" onClick={() => setQty(product.id, qty + 1)}>+</button>
                    <button
                      style={{ border: 'none', textDecoration: 'underline', fontSize: '12px' }}
                      type="button"
                      aria-label={`Remove ${product.name}`}
                      onClick={() => setQty(product.id, 0)}
                    >
                      <RiDeleteBin6Line size={12} color="red" />
                    </button>
                  </div>
                </div>
                <div className="price">{money(product.price * qty)}</div>
              </div>
            ))}

            <div className="coupon">
              <input placeholder="Coupon code" value={coupon} onChange={(e) => setCoupon(e.target.value)} />
              <button className="btn-small" type="button" onClick={applyCoupon}>Apply</button>
            </div>
            {couponMsg && <div className="coupon-msg">{couponMsg}</div>}

            <div className="rows">
              <div className="row"><span>Subtotal</span><strong>{money(subtotal)}</strong></div>
              <div className="row"><span>GST ({CONFIG.gstPercent}%)</span><span>{money(gst)}</span></div>
              <div className="row"><span>Shipping</span><span>{money(shipping)}</span></div>
              <div className="row total"><span>Order total</span><strong>{money(total)}</strong></div>
              <div className="row advance"><span>{CONFIG.advancePercent}% advance due</span><strong>{money(advance)}</strong></div>
              <p className="cart-note">After paying the advance, send the payment screenshot in the same WhatsApp chat so we can confirm your order.</p>
              <div className="row"><span>Balance after advance</span><strong>{money(balance)}</strong></div>
            </div>

            <button
              className="cta"
              type="button"
              onClick={placeOrder}
              disabled={!lines.length}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}
            >
              <RiWhatsappLine size={20} /> Place order on WhatsApp
            </button>
            <button className="cta whatsapp" type="button" onClick={enquire}>Just enquire on WhatsApp</button>

            <div className="trust"><span>Customisable</span><span>Pan India</span><span>20+ days</span></div>
            <div className="notice">Final pricing is subject to selected inclusions/customisation. Branding/customisation may be extra unless specifically included.</div>
          </aside>
        </div>
      </main>

      <footer>
        <strong>MANORATH</strong> · Premium gifting · {CONFIG.contactPerson} · {CONFIG.phone}
      </footer>

      {sent && (
        <div className="modal show">
          <div className="modal-box">
            <div className="check">✓</div>
            <div className="eyebrow">Order ready</div>
            <h2>Sent to WhatsApp.</h2>
            <p>Your order details have been prepared in WhatsApp. Press send there so our team receives it — we'll reply with the final quotation and payment details.</p>
            <p><strong>Order total:</strong> {money(sent.total)}</p>
            <p><strong>{CONFIG.advancePercent}% advance to confirm:</strong> {money(sent.advance)}</p>
            <div className="modal-actions">
              <a className="cta" style={{ textDecoration: 'none', display: 'block' }} href={sent.url} target="_blank" rel="noreferrer">Open WhatsApp again</a>
              <Link className="cta whatsapp" style={{ textDecoration: 'none', display: 'block', marginTop: 0 }} to="/" onClick={done}>Done — back to store</Link>
            </div>
            <div className="demo-note">No payment was collected on this site</div>
          </div>
        </div>
      )}
    </div>
  )
}