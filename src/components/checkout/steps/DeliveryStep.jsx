import Field from '../Field.jsx'
import { card, sectionHead, badge, control, option, optionOn, optionOff, optionTitle, optionMeta, ctaBase, cta, notice } from '../checkoutStyles.js'
import { RiArrowLeftLine, RiArrowRightLine, RiWhatsappLine } from '@remixicon/react'
import { STATES, minDate } from '../checkoutOptions.js'
import { CONFIG } from '../../../config'
import { money } from '../../../utils'

export default function DeliveryStep({form, set, goNext, goBack}) {
  return (
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
          value={form.name}
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
          value={form.address}
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
          value={form.city}
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
          value={form.state}
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
          value={form.pin}
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
          value={form.deliveryDate}
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
  )
}
