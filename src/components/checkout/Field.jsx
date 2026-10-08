export default function Field({ id, label, full = false, children }) {
  return (
    <div className={'flex flex-col gap-[7px]' + (full ? ' col-span-full narrow:col-auto' : '')}>
      <label className="text-[11px] tracking-[.08em] uppercase font-bold text-[#665d57]" htmlFor={id}>{label}</label>
      {children}
    </div>
  )
}
