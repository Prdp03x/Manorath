// import { useLayoutEffect, useRef, useState } from 'react'
// import { Link } from 'react-router-dom'
// import gsap from 'gsap'
// import { useCart } from '../hooks/useCart.jsx'
// import { CONFIG } from '../config'
// import { money, whatsappUrl } from '../utils'
// import { RiDeleteBin6Line, RiWhatsappLine } from '@remixicon/react'

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

// // ---- shared class strings -------------------------------------------------
// const cardBase = 'bg-paper border border-[rgba(84,24,39,.09)] rounded-[24px] shadow-[0_22px_70px_rgba(52,31,24,.10)] narrow:rounded-[20px]'
// const card = `${cardBase} p-7 narrow:p-5`
// const h1 = 'font-display font-medium text-[58px] leading-[.95] mt-[7px] tracking-[-0.04em] text-wine narrow:text-[45px]'
// const h2 = 'font-display font-medium leading-[.9] text-wine'
// const eyebrow = 'text-[11px] tracking-[.2em] uppercase text-gold font-bold'
// const sub = 'text-muted max-w-[570px] leading-[1.7] mt-3'
// const badge = 'text-[10px] tracking-[.14em] uppercase text-gold font-bold'
// const sectionHead = 'flex justify-between items-baseline mb-[22px]'
// const control = 'w-full border border-line bg-white rounded-[13px] px-[15px] py-3.5 outline-none transition-all duration-250 text-ink focus:border-wine focus:shadow-[0_0_0_3px_rgba(84,24,39,.08)]'
// const option = 'flex gap-[13px] items-start rounded-[17px] border p-[17px] text-[15px] font-normal normal-case tracking-normal text-ink transition-all duration-250'
// const optionOn = 'border-wine bg-[#fcf7f1] shadow-[0_8px_30px_rgba(84,24,39,.07)]'
// const optionOff = 'border-line bg-white'
// const optionTitle = 'font-bold text-[13px]'
// const optionMeta = 'text-[11px] text-muted mt-1 leading-[1.5]'
// const ctaBase = 'border-0 rounded-[15px] bg-wine text-white px-5 py-[17px] font-bold tracking-[.02em] shadow-[0_15px_35px_rgba(84,24,39,.22)] transition-all duration-250 hover:-translate-y-0.5 hover:bg-wine-2'
// const cta = `w-full ${ctaBase}`
// const ctaGhost = 'bg-white text-wine border border-[rgba(84,24,39,.25)] shadow-none'
// const notice = 'mt-[18px] px-4 py-[15px] rounded-[15px] bg-[#f5efe6] border border-[#e7ddd1] text-[11px] leading-[1.6] text-[#71665e]'
// const qtyBtn = 'w-[25px] h-[25px] bg-white rounded-lg'
// const row = 'flex justify-between gap-[15px] py-2 text-[#6f6660] text-[13px]'

// function Field({ id, label, full, children }) {
//   return (
//     <div className={'flex flex-col gap-[7px]' + (full ? ' col-span-full narrow:col-auto' : '')}>
//       <label className="text-[11px] tracking-[.08em] uppercase font-bold text-[#665d57]" htmlFor={id}>{label}</label>
//       {children}
//     </div>
//   )
// }

// export default function Checkout() {
//   const { lines, subtotal, gst, shipping, total, advance, balance, setQty, clear } = useCart()
//   const [f, setF] = useState(initial)
//   const [coupon, setCoupon] = useState('')
//   const [couponMsg, setCouponMsg] = useState('')
//   const [sent, setSent] = useState(null)
//   const root = useRef(null)
//   const formRef = useRef(null)

//   // `announcement`, `header` and `reveal` are kept as GSAP selector hooks (no CSS attached).
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
//       `Subtotal: ${money(subtotal)}`,
//       `GST (${CONFIG.gstPercent}%): ${money(gst)}`,
//       `Shipping: ${money(shipping)}`,
//       `*Order total: ${money(total)}*`,
//       `${CONFIG.advancePercent}% advance to confirm: ${money(advance)}`,
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
//     setSent({ url, advance, total })
//   }

//   const enquire = () => {
//     const msg = `Hello Manorath, I want to enquire about a gifting order. Name: ${f.name || 'Customer'}. Order total shown: ${money(total)}.${lines.length ? `\n${itemsText}` : ''}\nPlease share the final quotation and customization options.`
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
//       <div className="announcement bg-wine text-white text-center px-[18px] py-[9px] text-[11px] tracking-[.18em] uppercase">
//         PAN INDIA DELIVERY • BESPOKE GIFTING • MANORATH 2026
//       </div>
//       <header className="header bg-[rgba(255,253,249,.92)] backdrop-blur-[18px] border-b border-[rgba(84,24,39,.10)] sticky top-0 z-50">
//         <div className="max-w-[1240px] mx-auto px-7 py-[22px] flex items-center justify-between gap-5 narrow:px-[18px] narrow:py-4">
//           <Link to="/" className="flex items-center font-display text-[38px] font-bold tracking-[.05em] text-wine narrow:text-[31px]">
//           <img src='/assets/logo.png' className='w-10 h-10'/>
//           <img src='/assets/textlogo.svg' className='h-8'/>
//           </Link>
//           <div className="text-[12px] text-muted flex items-center gap-2 narrow:text-[10px]">
//             <span className="w-7 h-7 rounded-full bg-[#efe5d8] grid place-items-center">⌁</span> Order via WhatsApp
//           </div>
//         </div>
//       </header>
//     </>
//   )

//   const page = 'max-w-[1240px] mx-auto px-7 pt-12 pb-20 narrow:px-[15px] narrow:pt-[34px] narrow:pb-[55px]'

//   if (lines.length === 0 && !sent) {
//     return (
//       <div className="bg-cream text-ink text-[15px]" ref={root}>
//         {Header}
//         <main className={page}>
//           <div className={`${cardBase} reveal text-center px-5 py-[60px]`}>
//             <div className={eyebrow}>Your bag</div>
//             <h1 className={h1}>Nothing here yet.</h1>
//             <p className={`${sub} mx-auto`}>Pick a hamper from the collection and come back to place your order.</p>
//             <Link to="/#collection" className={`${ctaBase} inline-block mt-5`}>Browse the collection</Link>
//           </div>
//         </main>
//       </div>
//     )
//   }

//   return (
//     <div className="bg-cream text-ink text-[15px]" ref={root}>
//       {Header}
//       <main className={page}>
//         <Link to="/" className="text-[12px] text-muted inline-block mb-[18px]">← Continue shopping</Link>
//         <div className="flex justify-between items-end gap-[25px] mb-[30px] narrow:block">
//           <div>
//             <div className={eyebrow}>Your gifting journey</div>
//             <h1 className={h1}>Complete your order.</h1>
//             <p className={sub}>Tell us where your Manorath gifting should go. We'll send your order to our team on WhatsApp, who confirm the final quotation and advance payment.</p>
//           </div>
//         </div>

//         <div className="grid grid-cols-[minmax(0,1.55fr)_minmax(330px,.85fr)] gap-7 items-start tablet:grid-cols-1">
//           <div>
//             <form ref={formRef} onSubmit={(e) => e.preventDefault()}>
//               <section className={`${card} mb-[18px] last:mb-0 reveal`}>
//                 <div className={sectionHead}><h2 className={`${h2} text-[30px]`}>Contact</h2><span className={badge}>01</span></div>
//                 <div className="grid grid-cols-2 gap-[15px] narrow:grid-cols-1">
//                   <Field id="email" label="Email address"><input className={control} id="email" type="email" placeholder="you@example.com" required value={f.email} onChange={set('email')} /></Field>
//                   <Field id="phone" label="Mobile number"><input className={control} id="phone" type="tel" placeholder="+91 98XXXXXXXX" required value={f.phone} onChange={set('phone')} /></Field>
//                 </div>
//               </section>

//               <section className={`${card} mb-[18px] last:mb-0 reveal`}>
//                 <div className={sectionHead}><h2 className={`${h2} text-[30px]`}>Delivery address</h2><span className={badge}>02</span></div>
//                 <div className="grid grid-cols-2 gap-[15px] narrow:grid-cols-1">
//                   <Field id="name" label="Full name" full><input className={control} id="name" type="text" placeholder="Recipient / contact person" required value={f.name} onChange={set('name')} /></Field>
//                   <Field id="address" label="Address" full><textarea className={`${control} min-h-[100px] resize-y`} id="address" placeholder="House / office / street / landmark" required value={f.address} onChange={set('address')} /></Field>
//                   <Field id="city" label="City"><input className={control} id="city" type="text" placeholder="City" required value={f.city} onChange={set('city')} /></Field>
//                   <Field id="state" label="State">
//                     <select className={control} id="state" required value={f.state} onChange={set('state')}>
//                       <option value="">Select state</option>
//                       {STATES.map((s) => <option key={s}>{s}</option>)}
//                     </select>
//                   </Field>
//                   <Field id="pin" label="PIN code"><input className={control} id="pin" inputMode="numeric" maxLength={6} pattern="[0-9]{6}" title="6-digit PIN code" placeholder="360001" required value={f.pin} onChange={set('pin')} /></Field>
//                   <Field id="deliveryDate" label="Preferred delivery date"><input className={control} id="deliveryDate" type="date" min={minDate()} value={f.deliveryDate} onChange={set('deliveryDate')} /></Field>
//                 </div>
//                 <div className={notice}>Catalogue terms specify a minimum processing time of 20 days after confirmation. Door-to-door delivery is available PAN India; a flat {money(CONFIG.shippingCharge)} shipping charge applies.</div>
//               </section>

//               <section className={`${card} mb-[18px] last:mb-0 reveal`}>
//                 <div className={sectionHead}><h2 className={`${h2} text-[30px]`}>Delivery method</h2><span className={badge}>03</span></div>
//                 <label className={`${option} ${optionOn}`}>
//                   <input className="mt-[3px] accent-wine flex-none" type="radio" name="delivery" defaultChecked readOnly />
//                   <div><div className={optionTitle}>PAN India door-to-door delivery</div><div className={optionMeta}>Flat {money(CONFIG.shippingCharge)} shipping charge, included in your order total.</div></div>
//                 </label>
//               </section>

//               <section className={`${card} mb-[18px] last:mb-0 reveal`}>
//                 <div className={sectionHead}><h2 className={`${h2} text-[30px]`}>Gift details</h2><span className={badge}>04</span></div>
//                 <div className="grid grid-cols-2 gap-[15px] narrow:grid-cols-1">
//                   <Field id="recipient" label="Recipient name"><input className={control} id="recipient" type="text" placeholder="Optional" value={f.recipient} onChange={set('recipient')} /></Field>
//                   <Field id="occasion" label="Occasion">
//                     <select className={control} id="occasion" value={f.occasion} onChange={set('occasion')}>{OCCASIONS.map((o) => <option key={o}>{o}</option>)}</select>
//                   </Field>
//                   <Field id="message" label="Gift message" full><textarea className={`${control} min-h-[100px] resize-y`} id="message" placeholder="Add a personal note for the recipient…" value={f.message} onChange={set('message')} /></Field>
//                   <Field id="custom" label="Customization / inclusion request" full><textarea className={`${control} min-h-[100px] resize-y`} id="custom" placeholder="Tell us if you want different jars, sweets, chocolates, candles, branding, etc." value={f.custom} onChange={set('custom')} /></Field>
//                 </div>
//               </section>

//               <section className={`${card} mb-[18px] last:mb-0 reveal`}>
//                 <div className={sectionHead}><h2 className={`${h2} text-[30px]`}>Advance payment</h2><span className={badge}>05</span></div>
//                 <div className="grid grid-cols-3 gap-2.5 tablet:grid-cols-1">
//                   {PAYMENTS.map((p) => (
//                     <label key={p} className={`${option} ${f.payment === p ? optionOn : optionOff}`}>
//                       <input className="mt-[3px] accent-wine flex-none" type="radio" name="payment" value={p} checked={f.payment === p} onChange={set('payment')} />
//                       <div><div className={optionTitle}>{p}</div><div className={optionMeta}>Preferred mode</div></div>
//                     </label>
//                   ))}
//                 </div>
//                 <div className={notice}><strong>{CONFIG.advancePercent}% advance:</strong> An order is confirmed after {CONFIG.advancePercent}% advance payment. No payment is collected on this site — our team shares payment details on WhatsApp after you place the order.</div>
//               </section>
//             </form>
//           </div>

//           <aside className={`${card} reveal sticky top-[116px] tablet:relative tablet:top-auto`}>
//             <h2 className={`${h2} text-[34px] mb-5`}>Your order</h2>
//             {lines.map(({ product, qty }) => (
//               <div className="grid grid-cols-[76px_1fr_auto] gap-[13px] items-center py-3 border-b border-[#e9e1d8] narrow:grid-cols-[65px_1fr_auto]" key={product.id}>
//                 <img className="w-[76px] h-[76px] object-cover rounded-[14px] bg-[#eee7dc] narrow:w-[65px] narrow:h-[65px]" src={product.image} alt={product.name} />
//                 <div>
//                   <div className="font-bold text-[13px]">{product.name}</div>
//                   <div className="text-[11px] text-muted mt-[5px]">{money(product.price)} each</div>
//                   <div className="flex items-center gap-2 mt-2">
//                     <button className={`${qtyBtn} border border-line`} type="button" aria-label="Decrease" onClick={() => setQty(product.id, qty - 1)}>−</button>
//                     <span>{qty}</span>
//                     <button className={`${qtyBtn} border border-line`} type="button" aria-label="Increase" onClick={() => setQty(product.id, qty + 1)}>+</button>
//                     <button
//                       className={`${qtyBtn} border-0`}
//                       type="button"
//                       aria-label={`Remove ${product.name}`}
//                       onClick={() => setQty(product.id, 0)}
//                     >
//                       <RiDeleteBin6Line size={12} color="red" />
//                     </button>
//                   </div>
//                 </div>
//                 <div className="font-bold text-[13px] whitespace-nowrap">{money(product.price * qty)}</div>
//               </div>
//             ))}

//             <div className="flex gap-2 my-[18px]">
//               <input className={`${control} px-[13px] py-3`} placeholder="Coupon code" value={coupon} onChange={(e) => setCoupon(e.target.value)} />
//               <button className="border border-wine text-wine bg-transparent rounded-[12px] px-4 font-bold" type="button" onClick={applyCoupon}>Apply</button>
//             </div>
//             {couponMsg && <div className="text-[11px] text-muted -mt-2.5 mb-3.5">{couponMsg}</div>}

//             <div className="mt-[17px]">
//               <div className={row}><span>Subtotal</span><strong>{money(subtotal)}</strong></div>
//               <div className={row}><span>GST ({CONFIG.gstPercent}%)</span><span>{money(gst)}</span></div>
//               <div className={row}><span>Shipping</span><span>{money(shipping)}</span></div>
//               <div className="flex justify-between gap-[15px] border-t border-line mt-2 pt-4 pb-2 text-ink font-bold text-[16px]"><span>Order total</span><strong>{money(total)}</strong></div>
//               <div className="flex justify-between gap-[15px] py-2 text-wine font-bold text-[17px]"><span>{CONFIG.advancePercent}% advance due</span><strong>{money(advance)}</strong></div>
//               <p className="text-[10px] text-muted mb-3 leading-[1.5]">After paying the advance, send the payment screenshot in the same WhatsApp chat so we can confirm your order.</p>
//               <div className={row}><span>Balance after advance</span><strong>{money(balance)}</strong></div>
//             </div>

//             <button
//               className={`${cta} flex items-center justify-center gap-2.5`}
//               type="button"
//               onClick={placeOrder}
//               disabled={!lines.length}
//             >
//               <RiWhatsappLine size={20} /> Place order on WhatsApp
//             </button>

//             <div className="flex justify-center gap-[18px] flex-wrap mt-[15px] text-[#837970] text-[10px] tracking-[.08em] uppercase"><span>Customisable</span><span>Pan India</span><span>20+ days</span></div>
//             <div className={notice}>Final pricing is subject to selected inclusions/customisation. Branding/customisation may be extra unless specifically included.</div>
//           </aside>
//         </div>
//       </main>

//       <footer className="px-7 pt-[30px] pb-[60px] text-center text-[#8c8179] text-[11px]">
//         <strong>MANORATH</strong> · Premium gifting · {CONFIG.contactPerson} · {CONFIG.phone}
//       </footer>

//       {sent && (
//         <div className="fixed inset-0 z-100 grid place-items-center p-5 bg-[rgba(27,16,12,.62)] backdrop-blur-[10px]">
//           <div className="w-full max-w-[510px] bg-paper rounded-[28px] p-9 shadow-[0_40px_100px_rgba(0,0,0,.28)] text-center">
//             <div className="w-[62px] h-[62px] rounded-full mx-auto mb-[18px] bg-[#e8efe9] text-green grid place-items-center text-[28px]">✓</div>
//             <div className={eyebrow}>Order ready</div>
//             <h2 className={`${h2} text-[42px]`}>Sent to WhatsApp.</h2>
//             <p className="text-muted leading-[1.65] my-[1em]">Your order details have been prepared in WhatsApp. Press send there so our team receives it — we'll reply with the final quotation and payment details.</p>
//             <p className="text-muted leading-[1.65] my-[1em]"><strong>Order total:</strong> {money(sent.total)}</p>
//             <p className="text-muted leading-[1.65] my-[1em]"><strong>{CONFIG.advancePercent}% advance to confirm:</strong> {money(sent.advance)}</p>
//             <div className="grid gap-2.5 mt-[18px]">
//               <a className={`${cta} block`} href={sent.url} target="_blank" rel="noreferrer">Open WhatsApp again</a>
//               <Link className={`${cta} ${ctaGhost} block`} to="/" onClick={done}>Done — back to store</Link>
//             </div>
//             <div className="text-[10px] tracking-[.12em] uppercase text-[#9b9189] mt-4">No payment was collected on this site</div>
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
import {
  RiDeleteBin6Line,
  RiWhatsappLine,
  RiArrowLeftLine,
  RiArrowRightLine,
  RiCheckLine,
} from '@remixicon/react'

const STATES = [
  'Gujarat',
  'Maharashtra',
  'Rajasthan',
  'Delhi',
  'Karnataka',
  'Tamil Nadu',
  'West Bengal',
  'Other',
]

const OCCASIONS = [
  'Diwali',
  'Wedding',
  'Birthday',
  'Corporate gifting',
  'Other',
]

const PAYMENTS = ['UPI', 'Card', 'Bank Transfer']

const STEPS = [
  { number: 1, label: 'Contact' },
  { number: 2, label: 'Delivery' },
  { number: 3, label: 'Gift' },
  { number: 4, label: 'Payment' },
]

const minDate = () => {
  const d = new Date()
  d.setDate(d.getDate() + 20)
  return d.toISOString().slice(0, 10)
}

const initial = {
  email: '',
  phone: '',
  name: '',
  address: '',
  city: '',
  state: '',
  pin: '',
  deliveryDate: '',
  recipient: '',
  occasion: 'Diwali',
  message: '',
  custom: '',
  payment: 'UPI',
}

// -----------------------------------------------------------------------------
// Shared styles
// -----------------------------------------------------------------------------

const cardBase =
  'bg-paper border border-[rgba(84,24,39,.09)] rounded-[24px] shadow-[0_22px_70px_rgba(52,31,24,.10)] narrow:rounded-[20px]'

const card = `${cardBase} p-7 narrow:p-5`

const h1 =
  'font-display font-medium text-[58px] leading-[.95] mt-[7px] tracking-[-0.04em] text-wine narrow:text-[45px]'

const h2 = 'font-display font-medium leading-[.9] text-wine'

const eyebrow =
  'text-[11px] tracking-[.2em] uppercase text-gold font-bold'

const sub = 'text-muted max-w-[570px] leading-[1.7] mt-3'

const badge = 'text-[10px] tracking-[.14em] uppercase text-gold font-bold'

const sectionHead =
  'flex justify-between items-baseline mb-[22px]'

const control =
  'w-full border border-line bg-white rounded-[13px] px-[15px] py-3.5 outline-none transition-all duration-250 text-ink focus:border-wine focus:shadow-[0_0_0_3px_rgba(84,24,39,.08)]'

const option =
  'flex gap-[13px] items-start rounded-[17px] border p-[17px] text-[15px] font-normal normal-case tracking-normal text-ink transition-all duration-250'

const optionOn =
  'border-wine bg-[#fcf7f1] shadow-[0_8px_30px_rgba(84,24,39,.07)]'

const optionOff = 'border-line bg-white'

const optionTitle = 'font-bold text-[13px]'

const optionMeta = 'text-[11px] text-muted mt-1 leading-[1.5]'

const ctaBase =
  'border-0 rounded-[15px] bg-wine text-white px-5 py-[17px] font-bold tracking-[.02em] shadow-[0_15px_35px_rgba(84,24,39,.22)] transition-all duration-250 hover:-translate-y-0.5 hover:bg-wine-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0'

const cta = `w-full ${ctaBase}`

const ctaGhost =
  'bg-white text-wine border border-[rgba(84,24,39,.25)] shadow-none'

const notice =
  'mt-[18px] px-4 py-[15px] rounded-[15px] bg-[#f5efe6] border border-[#e7ddd1] text-[11px] leading-[1.6] text-[#71665e]'

const qtyBtn = 'w-[25px] h-[25px] bg-white rounded-lg'

const row =
  'flex justify-between gap-[15px] py-2 text-[#6f6660] text-[13px]'

// -----------------------------------------------------------------------------
// Field
// -----------------------------------------------------------------------------

function Field({ id, label, full, children }) {
  return (
    <div
      className={
        'flex flex-col gap-[7px]' +
        (full ? ' col-span-full narrow:col-auto' : '')
      }
    >
      <label
        className="text-[11px] tracking-[.08em] uppercase font-bold text-[#665d57]"
        htmlFor={id}
      >
        {label}
      </label>

      {children}
    </div>
  )
}

// -----------------------------------------------------------------------------
// Progress indicator
// -----------------------------------------------------------------------------

function ProgressSteps({ step }) {
  return (
    <div className="mb-9 narrow:mb-7">
      <div className="flex items-start w-full">
        {STEPS.map((item, index) => {
          const completed = step > item.number
          const active = step === item.number

          return (
            <div
              key={item.number}
              className="flex items-start flex-1 last:flex-none"
            >
              <div className="flex flex-col items-center min-w-[48px]">
                <div
                  className={`w-9 h-9 rounded-full grid place-items-center text-[12px] font-bold transition-all duration-300 ${
                    completed || active
                      ? 'bg-wine text-white shadow-[0_7px_20px_rgba(84,24,39,.2)]'
                      : 'bg-[#eee5db] text-muted'
                  }`}
                >
                  {completed ? <RiCheckLine size={16} /> : item.number}
                </div>

                <span
                  className={`mt-2 text-[9px] tracking-[.1em] uppercase whitespace-nowrap transition-colors duration-300 ${
                    active || completed
                      ? 'text-wine font-bold'
                      : 'text-muted'
                  }`}
                >
                  {item.label}
                </span>
              </div>

              {index < STEPS.length - 1 && (
                <div
                  className={`h-px flex-1 mt-[18px] mx-1 transition-colors duration-300 ${
                    completed ? 'bg-wine' : 'bg-[#ddd4ca]'
                  }`}
                />
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

// -----------------------------------------------------------------------------
// Main Checkout
// -----------------------------------------------------------------------------

export default function Checkout() {
  const {
    lines,
    subtotal,
    gst,
    shipping,
    total,
    advance,
    balance,
    setQty,
    clear,
  } = useCart()

  const [f, setF] = useState(initial)

  const [coupon, setCoupon] = useState('')
  const [couponMsg, setCouponMsg] = useState('')

  const [sent, setSent] = useState(null)

  const [step, setStep] = useState(1)

  const root = useRef(null)
  const formRef = useRef(null)
  const stepContentRef = useRef(null)

  // ---------------------------------------------------------------------------
  // GSAP
  // ---------------------------------------------------------------------------

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.announcement', {
        y: -20,
        opacity: 0,
        duration: 0.6,
        ease: 'power3.out',
      })

      gsap.from('.header', {
        y: -35,
        opacity: 0,
        duration: 0.8,
        delay: 0.1,
        ease: 'power3.out',
      })

      gsap.from('h1', {
        y: 30,
        opacity: 0,
        duration: 1,
        delay: 0.2,
        ease: 'power3.out',
      })

      gsap.from('.reveal', {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.08,
        delay: 0.25,
        ease: 'power3.out',
      })
    }, root)

    return () => ctx.revert()
  }, [lines.length === 0])

  // Animate each step
  useLayoutEffect(() => {
    if (!stepContentRef.current) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        stepContentRef.current,
        {
          opacity: 0,
          x: 25,
        },
        {
          opacity: 1,
          x: 0,
          duration: 0.45,
          ease: 'power3.out',
        }
      )

      gsap.fromTo(
        '.step-item',
        {
          opacity: 0,
          y: 15,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
          stagger: 0.05,
          delay: 0.05,
          ease: 'power3.out',
        }
      )
    }, stepContentRef)

    return () => ctx.revert()
  }, [step])

  // ---------------------------------------------------------------------------
  // Form setter
  // ---------------------------------------------------------------------------

  const set = (key) => (e) => {
    setF((current) => ({
      ...current,
      [key]: e.target.value,
    }))
  }

  // ---------------------------------------------------------------------------
  // Order text
  // ---------------------------------------------------------------------------

  const itemsText = lines
    .map(
      (line, index) =>
        `${index + 1}. ${line.product.name} × ${line.qty} — ${money(
          line.product.price * line.qty
        )}`
    )
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
      f.deliveryDate
        ? `Preferred date: ${f.deliveryDate}`
        : '',
      ``,
      `*Gift details*`,
      `Occasion: ${f.occasion}`,
      f.recipient
        ? `Recipient: ${f.recipient}`
        : '',
      f.message
        ? `Gift message: ${f.message}`
        : '',
      f.custom
        ? `Customisation: ${f.custom}`
        : '',
      ``,
      `Preferred advance payment mode: ${f.payment}`,
      `Please share the final quotation and payment details.`,
    ]
      .filter(
        (line, index, array) =>
          !(line === '' && array[index - 1] === '')
      )
      .join('\n')

  // ---------------------------------------------------------------------------
  // Validation
  // ---------------------------------------------------------------------------

  const validateCurrentStep = () => {
    if (!formRef.current) return true

    const currentFields =
      formRef.current.querySelectorAll(
        `[data-step="${step}"] input, [data-step="${step}"] textarea, [data-step="${step}"] select`
      )

    for (const field of currentFields) {
      if (!field.checkValidity()) {
        field.reportValidity()
        return false
      }
    }

    return true
  }

  // ---------------------------------------------------------------------------
  // Navigation
  // ---------------------------------------------------------------------------

  const goNext = () => {
    if (!validateCurrentStep()) return

    setStep((current) => Math.min(current + 1, 4))
  }

  const goBack = () => {
    setStep((current) => Math.max(current - 1, 1))
  }

  const skipGift = () => {
    setStep(4)
  }

  // ---------------------------------------------------------------------------
  // Place order
  // ---------------------------------------------------------------------------

  const placeOrder = () => {
    if (!validateCurrentStep()) return

    const url = whatsappUrl(orderMessage())

    window.open(url, '_blank')

    setSent({
      url,
      advance,
      total,
    })
  }

  // ---------------------------------------------------------------------------
  // Enquire
  // ---------------------------------------------------------------------------

  const enquire = () => {
    const msg =
      `Hello Manorath, I want to enquire about a gifting order. ` +
      `Name: ${f.name || 'Customer'}. ` +
      `Order total shown: ${money(total)}.` +
      `${lines.length ? `\n${itemsText}` : ''}\n` +
      `Please share the final quotation and customization options.`

    window.open(whatsappUrl(msg), '_blank')
  }

  // ---------------------------------------------------------------------------
  // Coupon
  // ---------------------------------------------------------------------------

  const applyCoupon = () => {
    setCouponMsg(
      coupon.trim()
        ? 'Coupon codes are not enabled yet — we apply any offers in your final quotation.'
        : 'Enter a coupon code.'
    )
  }

  // ---------------------------------------------------------------------------
  // Done
  // ---------------------------------------------------------------------------

  const done = () => {
    clear()
    setSent(null)
  }

  // ---------------------------------------------------------------------------
  // Header
  // ---------------------------------------------------------------------------

  const Header = (
    <>
      <div className="announcement bg-wine text-white text-center px-[18px] py-[9px] text-[11px] tracking-[.18em] uppercase">
        PAN INDIA DELIVERY • BESPOKE GIFTING • MANORATH 2026
      </div>

      <header className="header bg-[rgba(255,253,249,.92)] backdrop-blur-[18px] border-b border-[rgba(84,24,39,.10)] sticky top-0 z-50">
        <div className="max-w-[1240px] mx-auto px-7 py-[22px] flex items-center justify-between gap-5 narrow:px-[18px] narrow:py-4">
          <Link
            to="/"
            className="flex items-center font-display text-[38px] font-bold tracking-[.05em] text-wine narrow:text-[31px]"
          >
            <img
              src="/assets/logo.png"
              className="w-10 h-10"
              alt="Manorath"
            />

            <img
              src="/assets/textlogo.svg"
              className="h-8"
              alt="Manorath"
            />
          </Link>

          <div className="text-[12px] text-muted flex items-center gap-2 narrow:text-[10px]">
            <span className="w-7 h-7 rounded-full bg-[#efe5d8] grid place-items-center">
              ⌁
            </span>

            Order via WhatsApp
          </div>
        </div>
      </header>
    </>
  )

  const page =
    'max-w-[1240px] mx-auto px-7 pt-12 pb-20 narrow:px-[15px] narrow:pt-[34px] narrow:pb-[55px]'

  // ---------------------------------------------------------------------------
  // Empty cart
  // ---------------------------------------------------------------------------

  if (lines.length === 0 && !sent) {
    return (
      <div
        className="bg-cream text-ink text-[15px]"
        ref={root}
      >
        {Header}

        <main className={page}>
          <div
            className={`${cardBase} reveal text-center px-5 py-[60px]`}
          >
            <div className={eyebrow}>Your bag</div>

            <h1 className={h1}>
              Nothing here yet.
            </h1>

            <p className={`${sub} mx-auto`}>
              Pick a hamper from the collection and come back
              to place your order.
            </p>

            <Link
              to="/#collection"
              className={`${ctaBase} inline-block mt-5`}
            >
              Browse the collection
            </Link>
          </div>
        </main>
      </div>
    )
  }

  // ---------------------------------------------------------------------------
  // Order summary
  // ---------------------------------------------------------------------------

  const OrderSummary = ({ mobile = false }) => (
    <aside
      className={`${card} ${
        mobile ? '' : 'sticky top-[116px] tablet:relative tablet:top-auto'
      } reveal`}
    >
      <h2
        className={`${h2} text-[34px] mb-5`}
      >
        Your order
      </h2>

      {lines.map(({ product, qty }) => (
        <div
          className="grid grid-cols-[76px_1fr_auto] gap-[13px] items-center py-3 border-b border-[#e9e1d8] narrow:grid-cols-[65px_1fr_auto]"
          key={product.id}
        >
          <img
            className="w-[76px] h-[76px] object-cover rounded-[14px] bg-[#eee7dc] narrow:w-[65px] narrow:h-[65px]"
            src={product.image}
            alt={product.name}
          />

          <div>
            <div className="font-bold text-[13px]">
              {product.name}
            </div>

            <div className="text-[11px] text-muted mt-[5px]">
              {money(product.price)} each
            </div>

            <div className="flex items-center gap-2 mt-2">
              <button
                className={`${qtyBtn} border border-line`}
                type="button"
                aria-label="Decrease"
                onClick={() =>
                  setQty(product.id, qty - 1)
                }
              >
                −
              </button>

              <span>{qty}</span>

              <button
                className={`${qtyBtn} border border-line`}
                type="button"
                aria-label="Increase"
                onClick={() =>
                  setQty(product.id, qty + 1)
                }
              >
                +
              </button>

              <button
                className={`${qtyBtn} border-0`}
                type="button"
                aria-label={`Remove ${product.name}`}
                onClick={() =>
                  setQty(product.id, 0)
                }
              >
                <RiDeleteBin6Line
                  size={12}
                  color="red"
                />
              </button>
            </div>
          </div>

          <div className="font-bold text-[13px] whitespace-nowrap">
            {money(product.price * qty)}
          </div>
        </div>
      ))}

      <div className="flex gap-2 my-[18px]">
        <input
          className={`${control} px-[13px] py-3`}
          placeholder="Coupon code"
          value={coupon}
          onChange={(e) =>
            setCoupon(e.target.value)
          }
        />

        <button
          className="border border-wine text-wine bg-transparent rounded-[12px] px-4 font-bold"
          type="button"
          onClick={applyCoupon}
        >
          Apply
        </button>
      </div>

      {couponMsg && (
        <div className="text-[11px] text-muted -mt-2.5 mb-3.5">
          {couponMsg}
        </div>
      )}

      <div className="mt-[17px]">
        <div className={row}>
          <span>Subtotal</span>
          <strong>{money(subtotal)}</strong>
        </div>

        <div className={row}>
          <span>
            GST ({CONFIG.gstPercent}%)
          </span>

          <span>{money(gst)}</span>
        </div>

        <div className={row}>
          <span>Shipping</span>
          <span>{money(shipping)}</span>
        </div>

        <div className="flex justify-between gap-[15px] border-t border-line mt-2 pt-4 pb-2 text-ink font-bold text-[16px]">
          <span>Order total</span>
          <strong>{money(total)}</strong>
        </div>

        <div className="flex justify-between gap-[15px] py-2 text-wine font-bold text-[17px]">
          <span>
            {CONFIG.advancePercent}% advance due
          </span>

          <strong>{money(advance)}</strong>
        </div>

        <p className="text-[10px] text-muted mb-3 leading-[1.5]">
          After paying the advance, send the payment
          screenshot in the same WhatsApp chat so we can
          confirm your order.
        </p>

        <div className={row}>
          <span>Balance after advance</span>
          <strong>{money(balance)}</strong>
        </div>
      </div>
    </aside>
  )

  // ---------------------------------------------------------------------------
  // Main
  // ---------------------------------------------------------------------------

  return (
    <div
      className="bg-cream text-ink text-[15px]"
      ref={root}
    >
      {Header}

      <main className={page}>
        <Link
          to="/"
          className="text-[12px] text-muted inline-block mb-[18px]"
        >
          ← Continue shopping
        </Link>

        <div className="flex justify-between items-end gap-[25px] mb-[30px] narrow:block">
          <div>
            <div className={eyebrow}>
              Your gifting journey
            </div>

            <h1 className={h1}>
              Complete your order.
            </h1>

            <p className={sub}>
              Tell us where your Manorath gifting should go.
              We'll send your order to our team on WhatsApp,
              who confirm the final quotation and advance
              payment.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-[minmax(0,1.55fr)_minmax(330px,.85fr)] gap-7 items-start tablet:grid-cols-1">
          {/* -----------------------------------------------------------------
              LEFT / STEPS
          ----------------------------------------------------------------- */}

          <div>
            <ProgressSteps step={step} />

            <form
              ref={formRef}
              onSubmit={(e) =>
                e.preventDefault()
              }
            >
              <div ref={stepContentRef}>
                {/* ===========================================================
                    STEP 1 — CONTACT
                =========================================================== */}

                {step === 1 && (
                  <section
                    className={`${card} mb-[18px] reveal`}
                    data-step="1"
                  >
                    <div className={sectionHead}>
                      <div>
                        <div className={badge}>
                          STEP 01
                        </div>

                        <h2 className="font-display font-medium leading-[.9] text-wine text-[36px] mt-2">
                          Contact details
                        </h2>

                        <p className="text-muted text-[12px] mt-3 leading-[1.6]">
                          We'll use these details to contact
                          you about your order.
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-[15px] narrow:grid-cols-1">
                      <div className="step-item">
                        <Field
                          id="email"
                          label="Email address"
                        >
                          <input
                            className={control}
                            id="email"
                            type="email"
                            placeholder="you@example.com"
                            required
                            value={f.email}
                            onChange={set('email')}
                          />
                        </Field>
                      </div>

                      <div className="step-item">
                        <Field
                          id="phone"
                          label="Mobile number"
                        >
                          <input
                            className={control}
                            id="phone"
                            type="tel"
                            placeholder="+91 98XXXXXXXX"
                            required
                            value={f.phone}
                            onChange={set('phone')}
                          />
                        </Field>
                      </div>
                    </div>

                    <div className="flex justify-end mt-7">
                      <button
                        className={`${ctaBase} flex items-center justify-center gap-2 w-full`}
                        type="button"
                        onClick={goNext}
                      >
                        Continue
                        <RiArrowRightLine size={18} />
                      </button>
                    </div>
                  </section>
                )}

                {/* ===========================================================
                    STEP 2 — DELIVERY
                =========================================================== */}

                {step === 2 && (
                  <section
                    className={`${card} mb-[18px] reveal`}
                    data-step="2"
                  >
                    <div className={sectionHead}>
                      <div>
                        <div className={badge}>
                          STEP 02
                        </div>

                        <h2 className="font-display font-medium leading-[.9] text-wine text-[36px] mt-2">
                          Delivery address
                        </h2>

                        <p className="text-muted text-[12px] mt-3 leading-[1.6]">
                          Where should we deliver your Manorath
                          order?
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-[15px] narrow:grid-cols-1">
                      <div className="step-item">
                        <Field
                          id="name"
                          label="Full name"
                          full
                        >
                          <input
                            className={control}
                            id="name"
                            type="text"
                            placeholder="Recipient / contact person"
                            required
                            value={f.name}
                            onChange={set('name')}
                          />
                        </Field>
                      </div>

                      <div className="step-item">
                        <Field
                          id="address"
                          label="Address"
                          full
                        >
                          <textarea
                            className={`${control} min-h-[100px] resize-y`}
                            id="address"
                            placeholder="House / office / street / landmark"
                            required
                            value={f.address}
                            onChange={set('address')}
                          />
                        </Field>
                      </div>

                      <div className="step-item">
                        <Field
                          id="city"
                          label="City"
                        >
                          <input
                            className={control}
                            id="city"
                            type="text"
                            placeholder="City"
                            required
                            value={f.city}
                            onChange={set('city')}
                          />
                        </Field>
                      </div>

                      <div className="step-item">
                        <Field
                          id="state"
                          label="State"
                        >
                          <select
                            className={control}
                            id="state"
                            required
                            value={f.state}
                            onChange={set('state')}
                          >
                            <option value="">
                              Select state
                            </option>

                            {STATES.map((state) => (
                              <option
                                key={state}
                                value={state}
                              >
                                {state}
                              </option>
                            ))}
                          </select>
                        </Field>
                      </div>

                      <div className="step-item">
                        <Field
                          id="pin"
                          label="PIN code"
                        >
                          <input
                            className={control}
                            id="pin"
                            inputMode="numeric"
                            maxLength={6}
                            pattern="[0-9]{6}"
                            title="6-digit PIN code"
                            placeholder="360001"
                            required
                            value={f.pin}
                            onChange={set('pin')}
                          />
                        </Field>
                      </div>

                      <div className="step-item">
                        <Field
                          id="deliveryDate"
                          label="Preferred delivery date"
                        >
                          <input
                            className={control}
                            id="deliveryDate"
                            type="date"
                            min={minDate()}
                            value={f.deliveryDate}
                            onChange={set(
                              'deliveryDate'
                            )}
                          />
                        </Field>
                      </div>
                    </div>

                    <div className={notice}>
                      Catalogue terms specify a minimum
                      processing time of 20 days after
                      confirmation. Door-to-door delivery is
                      available PAN India; a flat{' '}
                      {money(CONFIG.shippingCharge)} shipping
                      charge applies.
                    </div>

                    <div className="flex justify-between gap-3 mt-7 narrow:flex-col-reverse">
                      <button
                        className={`${ctaBase} flex items-center justify-center gap-2`}
                        type="button"
                        onClick={goBack}
                      >
                        <RiArrowLeftLine size={18} />
                        Back
                      </button>

                      <button
                        className={`${ctaBase} flex items-center justify-center gap-2`}
                        type="button"
                        onClick={goNext}
                      >
                        Continue
                        <RiArrowRightLine size={18} />
                      </button>
                    </div>
                  </section>
                )}

                {/* ===========================================================
                    STEP 3 — GIFT DETAILS
                =========================================================== */}

                {step === 3 && (
                  <section
                    className={`${card} mb-[18px] reveal`}
                    data-step="3"
                  >
                    <div className={sectionHead}>
                      <div>
                        <div className={badge}>
                          STEP 03 · OPTIONAL
                        </div>

                        <h2 className="font-display font-medium leading-[.9] text-wine text-[36px] mt-2">
                          Gift details
                        </h2>

                        <p className="text-muted text-[12px] mt-3 leading-[1.6]">
                          Add a personal touch to your gifting.
                          You can also skip this step.
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-[15px] narrow:grid-cols-1">
                      <div className="step-item">
                        <Field
                          id="recipient"
                          label="Recipient name"
                        >
                          <input
                            className={control}
                            id="recipient"
                            type="text"
                            placeholder="Optional"
                            value={f.recipient}
                            onChange={set(
                              'recipient'
                            )}
                          />
                        </Field>
                      </div>

                      <div className="step-item">
                        <Field
                          id="occasion"
                          label="Occasion"
                        >
                          <select
                            className={control}
                            id="occasion"
                            value={f.occasion}
                            onChange={set(
                              'occasion'
                            )}
                          >
                            {OCCASIONS.map((occasion) => (
                              <option
                                key={occasion}
                                value={occasion}
                              >
                                {occasion}
                              </option>
                            ))}
                          </select>
                        </Field>
                      </div>

                      <div className="step-item">
                        <Field
                          id="message"
                          label="Gift message"
                          full
                        >
                          <textarea
                            className={`${control} min-h-[100px] resize-y`}
                            id="message"
                            placeholder="Add a personal note for the recipient…"
                            value={f.message}
                            onChange={set(
                              'message'
                            )}
                          />
                        </Field>
                      </div>

                      <div className="step-item">
                        <Field
                          id="custom"
                          label="Customization / inclusion request"
                          full
                        >
                          <textarea
                            className={`${control} min-h-[100px] resize-y`}
                            id="custom"
                            placeholder="Different jars, sweets, chocolates, candles, branding, etc."
                            value={f.custom}
                            onChange={set(
                              'custom'
                            )}
                          />
                        </Field>
                      </div>
                    </div>

                    <div className={notice}>
                      Gift details are optional. You can skip
                      this step and discuss customization with
                      our team on WhatsApp.
                    </div>

                    <div className="flex justify-between gap-3 mt-7 narrow:flex-col-reverse">
                      <button
                        className={`${ctaBase} flex items-center justify-center gap-2`}
                        type="button"
                        onClick={goBack}
                      >
                        <RiArrowLeftLine size={18} />
                        Back
                      </button>

                      <div className="flex gap-3 narrow:flex-col">
                        <button
                          className={`${ctaBase} `}
                          type="button"
                          onClick={skipGift}
                        >
                          Skip
                        </button>

                        <button
                          className={`${ctaBase} flex items-center justify-center gap-2`}
                          type="button"
                          onClick={goNext}
                        >
                          Continue
                          <RiArrowRightLine size={18} />
                        </button>
                      </div>
                    </div>
                  </section>
                )}

                {/* ===========================================================
                    STEP 4 — PAYMENT
                =========================================================== */}

                {step === 4 && (
                  <section
                    className={`${card} mb-[18px] reveal`}
                    data-step="4"
                  >
                    <div className={sectionHead}>
                      <div>
                        <div className={badge}>
                          STEP 04
                        </div>

                        <h2 className="font-display font-medium leading-[.9] text-wine text-[36px] mt-2">
                          Advance payment preference
                        </h2>

                        <p className="text-muted text-[12px] mt-3 leading-[1.6]">
                          Choose how you would prefer to pay
                          the advance after our team confirms
                          your quotation.
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-2.5 tablet:grid-cols-1">
                      {PAYMENTS.map((payment) => (
                        <label
                          key={payment}
                          className={`${option} ${
                            f.payment === payment
                              ? optionOn
                              : optionOff
                          } cursor-pointer`}
                        >
                          <input
                            className="mt-[3px] accent-wine flex-none"
                            type="radio"
                            name="payment"
                            value={payment}
                            checked={
                              f.payment === payment
                            }
                            onChange={set(
                              'payment'
                            )}
                          />

                          <div>
                            <div
                              className={
                                optionTitle
                              }
                            >
                              {payment}
                            </div>

                            <div
                              className={
                                optionMeta
                              }
                            >
                              Preferred mode
                            </div>
                          </div>
                        </label>
                      ))}
                    </div>

                    <div className={notice}>
                      <strong>
                        {CONFIG.advancePercent}% advance:
                      </strong>{' '}
                      An order is confirmed after{' '}
                      {CONFIG.advancePercent}% advance payment.
                      No payment is collected on this site —
                      our team shares payment details on
                      WhatsApp after you place the order.
                    </div>

                    {/* Final total preview */}
                    <div className="mt-6 p-5 rounded-[18px] bg-[#fcf7f1] border border-[#e8ddd1]">
                      <div className="flex justify-between items-center gap-3">
                        <span className="text-[12px] text-muted">
                          Order total
                        </span>

                        <strong className="text-[20px] text-wine">
                          {money(total)}
                        </strong>
                      </div>

                      <div className="flex justify-between items-center gap-3 mt-2">
                        <span className="text-[12px] text-muted">
                          {CONFIG.advancePercent}% advance
                        </span>

                        <strong className="text-[16px]">
                          {money(advance)}
                        </strong>
                      </div>

                      <div className="flex justify-between items-center gap-3 mt-2">
                        <span className="text-[12px] text-muted">
                          Balance
                        </span>

                        <strong className="text-[14px]">
                          {money(balance)}
                        </strong>
                      </div>
                    </div>

                    <div className="flex justify-between gap-3 mt-7 narrow:flex-col-reverse">
                      <button
                        className={`${ctaBase} flex items-center justify-center gap-2`}
                        type="button"
                        onClick={goBack}
                      >
                        <RiArrowLeftLine size={18} />
                        Back
                      </button>

                      <button
                        className={`${cta} flex items-center justify-center gap-2`}
                        type="button"
                        onClick={placeOrder}
                        disabled={!lines.length}
                      >
                        <RiWhatsappLine size={20} />
                        Place order on WhatsApp
                      </button>
                    </div>

                    <div className="flex justify-center gap-[18px] flex-wrap mt-[15px] text-[#837970] text-[10px] tracking-[.08em] uppercase">
                      <span>Customisable</span>
                      <span>Pan India</span>
                      <span>20+ days</span>
                    </div>

                    <div className={notice}>
                      Final pricing is subject to selected
                      inclusions/customisation. Branding and
                      customisation may be extra unless
                      specifically included.
                    </div>
                  </section>
                )}
              </div>
            </form>
          </div>

          {/* -----------------------------------------------------------------
              DESKTOP ORDER SUMMARY
          ----------------------------------------------------------------- */}

          <div className="tablet:hidden">
            <OrderSummary />
          </div>
        </div>

        {/* -------------------------------------------------------------------
            MOBILE ORDER SUMMARY
        ------------------------------------------------------------------- */}

        <div className="hidden tablet:block mt-5">
          <OrderSummary mobile />
        </div>
      </main>

      {/* ---------------------------------------------------------------------
          FOOTER
      --------------------------------------------------------------------- */}

      <footer className="px-7 pt-[30px] pb-[60px] text-center text-[#8c8179] text-[11px]">
        <strong>MANORATH</strong> · Premium gifting ·{' '}
        {CONFIG.contactPerson} · {CONFIG.phone}
      </footer>

      {/* ---------------------------------------------------------------------
          SUCCESS MODAL
      --------------------------------------------------------------------- */}

      {sent && (
        <div className="fixed inset-0 z-[100] grid place-items-center p-5 bg-[rgba(27,16,12,.62)] backdrop-blur-[10px]">
          <div className="w-full max-w-[510px] bg-paper rounded-[28px] p-9 shadow-[0_40px_100px_rgba(0,0,0,.28)] text-center narrow:p-6">
            <div className="w-[62px] h-[62px] rounded-full mx-auto mb-[18px] bg-[#e8efe9] text-green grid place-items-center text-[28px]">
              ✓
            </div>

            <div className={eyebrow}>
              Order ready
            </div>

            <h2
              className={`${h2} text-[42px] narrow:text-[34px]`}
            >
              Sent to WhatsApp.
            </h2>

            <p className="text-muted leading-[1.65] my-[1em]">
              Your order details have been prepared in
              WhatsApp. Press send there so our team
              receives it — we'll reply with the final
              quotation and payment details.
            </p>

            <p className="text-muted leading-[1.65] my-[1em]">
              <strong>Order total:</strong>{' '}
              {money(sent.total)}
            </p>

            <p className="text-muted leading-[1.65] my-[1em]">
              <strong>
                {CONFIG.advancePercent}% advance to confirm:
              </strong>{' '}
              {money(sent.advance)}
            </p>

            <div className="grid gap-2.5 mt-[18px]">
              <a
                className={`${cta} block`}
                href={sent.url}
                target="_blank"
                rel="noreferrer"
              >
                Open WhatsApp again
              </a>

              <Link
                className={`${cta} ${ctaGhost} block`}
                to="/"
                onClick={done}
              >
                Done — back to store
              </Link>
            </div>

            <div className="text-[10px] tracking-[.12em] uppercase text-[#9b9189] mt-4">
              No payment was collected on this site
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

