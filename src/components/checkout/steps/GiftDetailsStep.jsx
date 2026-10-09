import Field from '../Field.jsx'
import { card, sectionHead, badge, control, option, optionOn, optionOff, optionTitle, optionMeta, ctaBase, cta, notice } from '../checkoutStyles.js'
import { RiArrowLeftLine, RiArrowRightLine, RiWhatsappLine } from '@remixicon/react'
import { OCCASIONS } from '../checkoutOptions.js'

export default function GiftDetailsStep({form, set, goNext, goBack, skipGift}) {
  return (
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
          value={form.recipient}
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
          value={form.occasion}
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
          value={form.message}
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
          value={form.custom}
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
  )
}
