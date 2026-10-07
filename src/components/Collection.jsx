import { useState } from 'react'
import { products, categories } from '../data/products'
import { useCart } from '../hooks/useCart.jsx'
import ProductCard from './ProductCard.jsx'
import ProductModal from './ProductModal.jsx'
import { kicker, h2 } from '../ui'

export default function Collection() {
  const [active, setActive] = useState('All')
  const [selected, setSelected] = useState(null)
  const { add } = useCart()
  const list = products.filter((p) => active === 'All' || p.category === active)

  return (
    <section className="sec scroll-mt-20 pt-2.5 pb-[110px] px-[6vw] tablet:pb-20 tablet:px-[5vw]" id="collection">
      <div className={kicker}>2026 catalogue</div>
      <h2 className={h2}>Shop the edit</h2>
      <div className="flex gap-[9px] flex-wrap mt-[30px] mb-10">
        {categories.map((c) => (
          <button
            key={c}
            className={
              'px-[17px] py-[11px] border rounded-[99px] text-[12px] ' +
              (c === active ? 'bg-ink border-ink text-white' : 'bg-transparent border-line text-muted')
            }
            onClick={() => setActive(c)}
          >
            {c}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-4 gap-[18px] tablet:grid-cols-2 phone:gap-2.5">
        {list.map((p, i) => (
          <ProductCard key={p.id + active} product={p} index={i} onOpen={setSelected} onAdd={add} />
        ))}
      </div>
      <ProductModal product={selected} onClose={() => setSelected(null)} />
    </section>
  )
}
