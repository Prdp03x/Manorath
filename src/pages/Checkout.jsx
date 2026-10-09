import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { useCart } from '../hooks/useCart.jsx'
import { CONFIG } from '../config'
import { money, whatsappUrl } from '../utils'
import Field from '../components/checkout/Field.jsx'
import ProgressSteps from '../components/checkout/ProgressSteps.jsx'
import ContactStep from '../components/checkout/steps/ContactStep.jsx'
import DeliveryStep from '../components/checkout/steps/DeliveryStep.jsx'
import GiftDetailsStep from '../components/checkout/steps/GiftDetailsStep.jsx'
import PaymentStep from '../components/checkout/steps/PaymentStep.jsx'
import {
  RiDeleteBin6Line,
  RiWhatsappLine,
  RiArrowLeftLine,
  RiArrowRightLine,
} from '@remixicon/react'

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

// -----------------------------------------------------------------------------
// Progress indicator
// -----------------------------------------------------------------------------

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
  const [detailsStarted, setDetailsStarted] = useState(false)
  const [navScrolled, setNavScrolled] = useState(false)

  const root = useRef(null)
  const formRef = useRef(null)
  const stepContentRef = useRef(null)

  // Floating glass checkout navbar: wide at the top, pill-shaped on scroll.
  useEffect(() => {
    const onScroll = () => setNavScrolled(window.scrollY > 60)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

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
      <div className="announcement relative z-[51] bg-wine text-white text-center px-[18px] py-[9px] text-[11px] tracking-[.18em] uppercase narrow:text-[9px]">
        PAN INDIA DELIVERY • BESPOKE GIFTING • MANORATH 2026
      </div>

      <header
        className={
          'header fixed z-50 isolate flex items-center justify-between border ' +
          '[transition:top_.65s_cubic-bezier(.22,1,.36,1),left_.65s_cubic-bezier(.22,1,.36,1),right_.65s_cubic-bezier(.22,1,.36,1),height_.65s_cubic-bezier(.22,1,.36,1),padding_.65s_cubic-bezier(.22,1,.36,1),border-radius_.65s_cubic-bezier(.22,1,.36,1),background-color_.45s_ease,color_.45s_ease,box-shadow_.65s_ease,border-color_.45s_ease] ' +
          (navScrolled
            ? 'top-4 left-6 right-6 h-16 rounded-full pl-7 pr-7 bg-[rgba(251,248,243,0.32)] text-wine border-white/60 shadow-[0_18px_50px_rgba(30,20,20,.16),inset_0_1px_0_rgba(255,255,255,.7)] backdrop-blur-[24px] backdrop-saturate-150 narrow:top-3 narrow:left-3 narrow:right-3 narrow:h-[58px] narrow:pl-[18px] narrow:pr-[18px]'
            : 'top-[36px] left-0 right-0 h-[76px] px-[5vw] rounded-none bg-[rgba(251,248,243,0.18)] text-wine border-transparent shadow-none backdrop-blur-[18px] backdrop-saturate-150 narrow:top-[34px] narrow:h-[66px] narrow:px-[18px]')
        }
      >
        <Link
          to="/"
          aria-label="Manorath home"
          className={
            'flex items-center gap-1 font-display font-semibold tracking-[.16em] ' +
            'transition-[font-size] duration-500 ' +
            (navScrolled ? 'text-[26px] narrow:text-[22px]' : 'text-[31px] narrow:text-[25px]')
          }
        >
          <img src="/assets/logo.png" className="w-10 h-10 narrow:w-8 narrow:h-8" alt="" />
          <img src="/assets/textlogo.svg" className="h-8 narrow:h-7" alt="Manorath" />
        </Link>

        <div className="flex items-center gap-2 text-[12px] text-muted narrow:gap-1.5 narrow:text-[10px]">
          <span className="grid h-8 w-8 place-items-center rounded-full bg-[#efe5d8] narrow:h-7 narrow:w-7">
            ⌁
          </span>
          <span>Order via WhatsApp</span>
        </div>
      </header>
    </>
  )

  const page =
    'max-w-[1240px] mx-auto px-7 pt-[132px] pb-20 narrow:px-[15px] narrow:pt-[116px] narrow:pb-[55px]'

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

  const OrderSummary = ({ onAddDetails, mobile = false }) => (
    <aside className={`${card} reveal`}>
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

      <button
        className={`${cta} mt-5 flex items-center justify-center gap-2`}
        type="button"
        onClick={onAddDetails}
      >
        Add Details <RiArrowRightLine size={18} />
      </button>
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

        <section className="mb-7">
          <OrderSummary onAddDetails={() => setDetailsStarted(true)} />
        </section>

        {detailsStarted && (
          <div className="max-w-[850px] mx-auto">
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
                  <ContactStep form={f} set={set} goNext={goNext} />
                )}

                {/* ===========================================================
                    STEP 2 — DELIVERY
                =========================================================== */}

                {step === 2 && (
                  <DeliveryStep form={f} set={set} goNext={goNext} goBack={goBack} />
                )}

                {/* ===========================================================
                    STEP 3 — GIFT DETAILS
                =========================================================== */}

                {step === 3 && (
                  <GiftDetailsStep form={f} set={set} goNext={goNext} goBack={goBack} skipGift={skipGift} />
                )}

                {/* ===========================================================
                    STEP 4 — PAYMENT
                =========================================================== */}

                {step === 4 && (
                  <PaymentStep form={f} set={set} goBack={goBack} placeOrder={placeOrder} lines={lines} total={total} advance={advance} balance={balance} />
                )}
              </div>
            </form>
          </div>
        )}

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
                className={`${ctaBase} bg-white block`}
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

