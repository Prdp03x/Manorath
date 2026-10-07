import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../hooks/useCart.jsx'
import { RiShoppingBagLine} from '@remixicon/react'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const { count, open, setOpen } = useCart()
  const [menu, setMenu] = useState(false)

  useEffect(() => {
    const on = () => { setScrolled(window.scrollY > 60); setMenu(false) }
    on()
    window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])

  return (
    <>
      <div className="top">Diwali • Weddings • Birthdays • Corporate Gifting — PAN India Delivery</div>
      <nav className={'nav' + (scrolled ? ' scrolled' : '')}>
        <Link className="logo" to="/">MANORATH</Link>
        <div className="navlinks">
          <Link to="/#collection">Collection</Link>
          <Link to="/#story">Our Story</Link>
          <Link to="/#inclusions">Inclusions</Link>
          <Link to="/#contact">Contact</Link>
        </div>
        <div className="actions">
          <button className="iconbtn" aria-label="Open bag" onClick={() => setOpen(!open)} style={{ width: 'auto', padding: '0 16px', borderRadius: 99 }}>
            <RiShoppingBagLine /> 
            <span className='cart-count'>{count}</span>
          </button>
          <button className={'menu' + (menu ? ' is-open' : '')} aria-label="Menu" aria-expanded={menu} onClick={() => setMenu(!menu)}>
            <svg viewBox="0 0 24 24"><path className="l1" d="M4 7h16" /><path className="l2" d="M4 12h16" /><path className="l3" d="M4 17h16" /></svg>
          </button>
        </div>
      </nav>
      <div className={'mobile-menu' + (menu ? ' show' : '')}>
        {[['collection', 'Collection'], ['story', 'Our Story'], ['inclusions', 'Inclusions'], ['contact', 'Contact']].map(([id, label]) => (
          <Link key={id} to={`/#${id}`} onClick={() => setMenu(false)}>{label}</Link>
        ))}
      </div>
    </>
  )
}
