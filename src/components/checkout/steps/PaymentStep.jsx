import Field from '../Field.jsx'
import { card, sectionHead, badge, control, option, optionOn, optionOff, optionTitle, optionMeta, ctaBase, cta, notice } from '../checkoutStyles.js'
import { RiArrowLeftLine, RiArrowRightLine, RiWhatsappLine } from '@remixicon/react'
import { PAYMENTS } from '../checkoutOptions.js'
import { CONFIG } from '../../../config'
import { money } from '../../../utils'

export default function PaymentStep({form, set, goBack, placeOrder, lines, total, advance, balance}) {
  return (
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
          form.payment === payment
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
            form.payment === payment
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
  )
}
