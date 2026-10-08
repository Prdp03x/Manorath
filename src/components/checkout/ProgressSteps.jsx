import { RiCheckLine } from '@remixicon/react'

const STEPS = [
  { number: 1, label: 'Contact' },
  { number: 2, label: 'Delivery' },
  { number: 3, label: 'Gift' },
  { number: 4, label: 'Payment' },
]

export default function ProgressSteps({ step }) {
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
