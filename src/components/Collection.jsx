import { useState } from 'react'
import { products, categories } from '../data/products'
import { useCart } from '../hooks/useCart.jsx'
import ProductCard from './ProductCard.jsx'
import ProductModal from './ProductModal.jsx'

export default function Collection() {
  const [active, setActive] = useState('All')
  const [selected, setSelected] = useState(null)
  const { add } = useCart()
  const list = products.filter((p) => active === 'All' || p.category === active)

  return (
    <section className="sec" id="collection" style={{ paddingTop: 10 }}>
      <div className="kicker">2026 catalogue</div>
      <h2>Shop the edit</h2>
      <div className="filters">
        {categories.map((c) => (
          <button key={c} className={'filter' + (c === active ? ' active' : '')} onClick={() => setActive(c)}>{c}</button>
        ))}
      </div>
      <div className="pgrid">
        {list.map((p, i) => (
          <ProductCard key={p.id + active} product={p} index={i} onOpen={setSelected} onAdd={add} />
        ))}
      </div>
      <ProductModal product={selected} onClose={() => setSelected(null)} />
    </section>
  )
}
