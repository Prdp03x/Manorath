import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

// full-width bar -> floating glass pill
const navBase =
  'fixed z-20 flex items-center justify-between border ' +
  '[transition:top_.65s_var(--ease-nav),left_.65s_var(--ease-nav),right_.65s_var(--ease-nav),height_.65s_var(--ease-nav),padding_.65s_var(--ease-nav),border-radius_.65s_var(--ease-nav),background-color_.45s_ease,color_.45s_ease,box-shadow_.65s_ease,border-color_.45s_ease]'

const navTop = 'top-8 left-0 right-0 h-[76px] px-[5vw] bg-[rgba(251,248,243,.66)] text-white border-transparent'
const navScrolled =
  'top-4 left-6 right-6 h-16 pl-7 pr-7 rounded-[999px] text-ink ' +
  'bg-[rgba(251,248,243,.66)] border-white/55 ' +
  'shadow-[0_18px_50px_rgba(30,20,20,.16),inset_0_1px_0_rgba(255,255,255,.7)] ' +
  'backdrop-blur-[24px] backdrop-saturate-150 ' +
  'tablet:pl-[22px] tablet:pr-2.5 ' +
  'phone:top-3 phone:left-3 phone:right-3 phone:h-[58px] phone:pl-[18px] phone:pr-2'

const bar = 'origin-center [transition:translate_.4s_var(--ease-nav),rotate_.4s_var(--ease-nav),opacity_.3s]'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [menu, setMenu] = useState(false)

useEffect(() => {
  const onScroll = () => {
    setScrolled(window.scrollY > 60)
  }

  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })

  return () => window.removeEventListener('scroll', onScroll)
}, [])

const navigate = useNavigate();

const handleLogoClick = (e) => {
  e.preventDefault();

  if (window.location.pathname === "/") {
    // Already on homepage: scroll to top
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  } else {
    // On another page: navigate home
    navigate("/");
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  setMenu(false); // Close mobile menu if open
};

  return (
    <>
      <div className="pl-5 pr-5 text-center h-8 bg-wine text-[#f8eee0] flex items-center justify-center text-[11px] tracking-[.16em] uppercase phone:text-[9px]">
        Diwali • Weddings • Birthdays • Corporate Gifting — PAN India Delivery
      </div>
      <nav className={`${navBase} ${scrolled ? navScrolled : navTop}`}>
        <Link
          className={
            'flex items-center font-display font-semibold tracking-[.16em] transition-[font-size] duration-650 ease-nav ' +
            (scrolled ? 'text-[26px] phone:text-[22px]' : 'text-[31px] phone:text-[25px]')
          }
          to="/"
          onClick={handleLogoClick} aria-label="Go to homepage"
        >
          <img src='/assets/logo.png' className='w-10 h-10'/>
          <img src='/assets/textlogo.svg' className='h-8'/>
        </Link>
        <div className="flex gap-1 text-[12px] tracking-[.1em] uppercase tablet:hidden">
          {[['collection', 'Collection'], ['story', 'Our Story'], ['inclusions', 'Inclusions'], ['contact', 'Contact']].map(([id, label]) => (
            <Link
              key={id}
              to={`/#${id}`}
              className={
                'px-4 py-[11px] rounded-[999px] opacity-92 transition-[background-color,translate] duration-300 hover:-translate-y-px ' +
                (scrolled ? 'hover:bg-[rgba(33,25,26,.07)]' : 'hover:bg-white/14')
              }
            >
              {label}
            </Link>
          ))}
        </div>
        <div className="flex gap-2.5 items-center hidden tablet:block">
          
          <button
            className={
              'hidden tablet:grid place-items-center w-[42px] h-[42px] rounded-full border ' +
              (scrolled ? 'border-line bg-white' : 'border-white/35 bg-white/8')
            }
            aria-label="Menu"
            aria-expanded={menu}
            onClick={() => setMenu(!menu)}
          >
            <svg viewBox="0 0 24 24" className="w-5 h-5 stroke-current fill-none stroke-[1.8] [stroke-linecap:round]">
              <path className={`${bar} ${menu ? 'translate-y-[4px] rotate-45' : ''}`} d="M4 7h16" />
              <path className={`${bar} ${menu ? 'opacity-0' : ''}`} d="M4 12h16" />
              <path className={`${bar} ${menu ? '-translate-y-[4px] -rotate-45' : ''}`} d="M4 17h16" />
            </svg>
          </button>
        </div>
      </nav>
      <div
  className={[
    'fixed z-[2000] left-6 right-6 p-3.5',
    'rounded-[28px] hidden tablet:flex flex-col',
    'bg-[rgba(251,248,243,0.45)]',
    'backdrop-blur-[24px] backdrop-saturate-150',
    'border border-white/55',
    'shadow-[0_24px_60px_rgba(30,20,20,.2)]',
    '[transition:top_.65s_var(--ease-nav),opacity_.35s_ease,translate_.5s_var(--ease-nav),scale_.5s_var(--ease-nav)]',
    'phone:left-3 phone:right-3',
    scrolled ? 'top-20 phone:top-20' : 'top-24 phone:top-30',
    menu
      ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto'
      : 'opacity-0 -translate-y-3 scale-[.98] pointer-events-none',
  ].join(' ')}
>
  {[
    ['collection', 'Collection'],
    ['story', 'Our Story'],
    ['inclusions', 'Inclusions'],
    ['contact', 'Contact'],
  ].map(([id, label]) => (
    <Link
      key={id}
      to={`/#${id}`}
      onClick={() => setMenu(false)}
      className="px-[18px] py-4 rounded-[18px] text-[13px] tracking-[.1em] uppercase text-ink active:bg-[rgba(33,25,26,.07)]"
    >
      {label}
    </Link>
  ))}
</div>
    </>
  )
}
