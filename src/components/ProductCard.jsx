// import { useLayoutEffect, useRef } from 'react'
// import gsap from 'gsap'
// import { money } from '../utils'

// export default function ProductCard({ product, index, onOpen, onAdd }) {
//   const ref = useRef(null)
//   useLayoutEffect(() => {
//   const ctx = gsap.context(() => {
//     gsap.from(ref.current, {
//       y: 35,
//       opacity: 0,
//       duration: 0.65,
//       delay: index * 0.035,
//       ease: 'power3.out',
//       clearProps: 'transform,opacity', // optional: removes inline styles after finishing
//     })
//   }, ref)
//   return () => ctx.revert()
// }, [index])

//   return (
//     <article className="group relative overflow-hidden bg-white border border-[#e8ded2]" ref={ref}>
//       <div className="aspect-[1/1.12] bg-[#eee5d9] overflow-hidden cursor-pointer" onClick={() => onOpen(product)}>
//         <img
//           className="block w-full h-full object-cover transition-[scale] duration-700 group-hover:scale-[1.055]"
//           loading="lazy"
//           src={product.image}
//           alt={product.name}
//         />
//       </div>
//       <div className="absolute left-3 top-3 bg-white/88 px-[9px] py-[7px] text-[9px] tracking-[.1em] uppercase phone:left-[7px] phone:top-[7px] phone:px-1.5 phone:py-[5px] phone:text-[7px]">
//         {product.category}
//       </div>
//       <div className="p-[17px] phone:p-2.5">
//         <h3 className="font-display text-[25px] font-semibold mb-[7px] phone:text-[18px] phone:mb-[5px]">{product.name}</h3>
//         <div className="text-[11px] leading-[1.55] text-muted min-h-9 phone:text-[9px] phone:leading-[1.4] phone:min-h-0">{product.description}</div>
//         <div className="flex justify-between items-center mt-[17px] phone:mt-2.5 phone:gap-[5px]">
//           <span className="text-[14px] font-semibold phone:text-[11px]">{money(product.price)}</span>
//           <button
//             className="border-0 bg-ink text-white px-[13px] py-2.5 text-[10px] tracking-[.08em] uppercase phone:px-[9px] phone:py-2 phone:text-[8px]"
//             onClick={() => onAdd(product.id)}
//           >
//             Add +
//           </button>
//         </div>
//       </div>
//     </article>
//   )
// }

import { useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { money } from '../utils'
import './ProductCard.css'

export default function ProductCard({ product, index, onOpen, onAdd }) {
  const ref = useRef(null)
  const timer = useRef(null)
  const [added, setAdded] = useState(false)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(ref.current, {
        y: 35,
        opacity: 0,
        duration: 0.65,
        delay: index * 0.035,
        ease: 'power3.out',
        clearProps: 'transform,opacity',
      })
    }, ref)
    return () => ctx.revert()
  }, [index])

  // clear the pending timeout if the card unmounts
  useLayoutEffect(() => () => clearTimeout(timer.current), [])

  const handleAdd = () => {
    onAdd(product.id)
    setAdded(true)
    clearTimeout(timer.current)
    timer.current = setTimeout(() => setAdded(false), 1200)
  }

  return (
    // <article className="group relative overflow-hidden bg-white border border-[#e8ded2]" ref={ref}>
    //   <div className="aspect-[1/1.12] bg-[#eee5d9] overflow-hidden cursor-pointer" onClick={() => onOpen(product)}>
    //     <img
    //       className="block w-full h-full object-cover transition-[scale] duration-700 group-hover:scale-[1.055]"
    //       loading="lazy"
    //       src={product.image}
    //       alt={product.name}
    //     />
    //   </div>
    //   <div className="absolute left-3 top-3 bg-white/88 px-[9px] py-[7px] text-[9px] tracking-[.1em] uppercase phone:left-[7px] phone:top-[7px] phone:px-1.5 phone:py-[5px] phone:text-[7px]">
    //     {product.category}
    //   </div>
    //   <div className="p-[17px] phone:p-2.5">
    //     <h3 className="font-display text-[25px] font-semibold mb-[7px] phone:text-[18px] phone:mb-[5px]">{product.name}</h3>
    //     <div className="text-[11px] leading-[1.55] text-muted min-h-9 phone:text-[9px] phone:leading-[1.4] phone:min-h-0">{product.description}</div>
    //     <div className="flex justify-between items-center mt-[17px] phone:mt-2.5 phone:gap-[5px]">
    //       <span className="text-[14px] font-semibold phone:text-[11px]">{money(product.price)}</span>
    //       <button
    //         className={
    //           'min-w-[84px] border-0 text-white px-[13px] py-2.5 text-[10px] tracking-[.08em] uppercase ' +
    //           'transition-[background-color,scale] duration-300 active:scale-95 ' +
    //           'phone:min-w-[64px] phone:px-[9px] phone:py-2 phone:text-[8px] ' +
    //           (added ? 'bg-green' : 'bg-ink')
    //         }
    //         onClick={handleAdd}
    //       >
    //         {added ? 'Added ✓' : 'Add +'}
    //       </button>
    //     </div>
    //   </div>
    // </article>
    <article
      className="group relative overflow-hidden bg-white border border-[#e8ded2] flex flex-col"
      ref={ref}
    >
      <div
        className="aspect-[1/1.12] bg-[#eee5d9] overflow-hidden cursor-pointer"
        onClick={() => onOpen(product)}
      >
        <img
          className="block w-full h-full object-cover transition-[scale] duration-700 group-hover:scale-[1.055]"
          loading="lazy"
          src={product.image}
          alt={product.name}
        />
      </div>

      <div className="absolute left-3 top-3 bg-white/88 px-[9px] py-[7px] text-[9px] tracking-[.1em] uppercase phone:left-[7px] phone:top-[7px] phone:px-1.5 phone:py-[5px] phone:text-[7px]">
        {product.category}
      </div>

      <div className="p-[17px] phone:p-2.5 flex flex-col flex-1">
        <h3 className="font-display text-[25px] font-semibold mb-[7px] phone:text-[18px] phone:mb-[5px]">
          {product.name}
        </h3>

        <div className="text-[11px] leading-[1.55] text-muted min-h-9 phone:text-[9px] phone:leading-[1.4] phone:min-h-0">
          {product.description}
        </div>

        {/* Always stays at the bottom */}
        <div className="flex justify-between items-center mt-auto pt-[17px] phone:pt-2.5 phone:gap-[5px]">
          <span className="text-[14px] font-semibold phone:text-[11px]">
            {money(product.price)}
          </span>

          {/* <button
        className={
          'min-w-[84px] border-0 text-white px-[13px] py-2.5 text-[10px] tracking-[.08em] uppercase ' +
          'transition-[background-color,scale] duration-300 active:scale-95 ' +
          'phone:min-w-[64px] phone:px-[9px] phone:py-2 phone:text-[8px] ' +
          (added ? 'bg-green' : 'bg-ink')
        }
        onClick={handleAdd}
      >
        {added ? 'Added ✓' : 'Add +'}
      </button> */}
          <button
            type="button"
            className={`add-button ${added ? 'success' : ''}`}
            onClick={handleAdd}
          >
            <span className="add-button__text">Add</span>

            <span className="add-button__icon" aria-hidden="true">
              <span className="add-button__plus">+</span>
              <span className="add-button__check">✓</span>
            </span>
          </button>
        </div>
      </div>
    </article>
  )
}