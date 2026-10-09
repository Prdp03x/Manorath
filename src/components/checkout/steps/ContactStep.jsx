import Field from '../Field.jsx'
import { card, sectionHead, badge, control, option, optionOn, optionOff, optionTitle, optionMeta, ctaBase, cta, notice } from '../checkoutStyles.js'
import { RiArrowLeftLine, RiArrowRightLine, RiWhatsappLine } from '@remixicon/react'

export default function ContactStep({form, set, goNext}) {
  return (
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
          value={form.email}
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
          value={form.phone}
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
  )
}
