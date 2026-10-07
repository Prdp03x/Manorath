import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { productById, totals } from '../utils'

const CartContext = createContext(null)
const KEY = 'manorath-cart-v1'

function load() {
  try {
    const raw = JSON.parse(localStorage.getItem(KEY) || '[]')
    return raw.filter((i) => productById(i.id) && i.qty > 0)
  } catch {
    return []
  }
}

export function CartProvider({ children }) {
  const [items, setItems] = useState(load)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    try { localStorage.setItem(KEY, JSON.stringify(items)) } catch { /* ignore */ }
  }, [items])

  const add = useCallback((id) => {
    setItems((cur) =>
      cur.some((i) => i.id === id)
        ? cur.map((i) => (i.id === id ? { ...i, qty: i.qty + 1 } : i))
        : [...cur, { id, qty: 1 }]
    )
    // setOpen(true)
  }, [])

  const setQty = useCallback((id, qty) => {
    setItems((cur) =>
      qty <= 0 ? cur.filter((i) => i.id !== id) : cur.map((i) => (i.id === id ? { ...i, qty } : i))
    )
  }, [])

  const clear = useCallback(() => setItems([]), [])

  const value = useMemo(() => {
    const lines = items.map((i) => ({ ...i, product: productById(i.id) }))
    return {
      lines,
      count: items.reduce((s, i) => s + i.qty, 0),
      ...totals(lines),
      open, setOpen, add, setQty, clear,
    }
  }, [items, open, add, setQty, clear])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export const useCart = () => useContext(CartContext)
