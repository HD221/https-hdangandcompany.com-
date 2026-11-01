import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll } from 'framer-motion'
import { firm, services } from '../content'
import { metaFor } from '../routes'
import { Magnetic, ScrollProgress, ease } from './Motion'

const base = import.meta.env.BASE_URL.replace(/\/$/, '')

function Logo({ tone = 'green', className = '' }: { tone?: 'green' | 'paper'; className?: string }) {
  return (
    <img
      src={`${base}/images/logo-${tone}.webp`}
      alt="H Dang and Company, Chartered Accountants"
      width={560}
      height={95}
      className={className}
      draggable={false}
    />
  )
}

const nav = [
  { to: '/services', label: 'Services' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
]

function Header() {
  const [open, setOpen] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [solid, setSolid] = useState(false)
  const { pathname } = useLocation()
  const { scrollY } = useScroll()
  const reduce = useReducedMotion()

  useEffect(() => setOpen(false), [pathname])
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
  }, [open])

  useMotionValueEvent(scrollY, 'change', (y) => {
    const prev = scrollY.getPrevious() ?? 0
    setHidden(!reduce && y > prev && y > 200)
    setSolid(y > 20)
  })

  return (
    <>
      <motion.header
        className={`fixed inset-x-0 top-0 z-40 transition-colors duration-300 ${solid ? 'bg-paper/95 shadow-[0_1px_0_var(--color-rule)] backdrop-blur-sm' : 'bg-transparent'}`}
        animate={{ y: hidden && !open ? '-100%' : '0%' }}
        transition={{ duration: 0.35, ease }}
      >
        <div className="wrap flex items-center justify-between py-4">
          <Link to="/" aria-label="H Dang and Company, home" className="block">
            <Logo className="h-auto w-[190px] md:w-[250px]" />
          </Link>
          <nav aria-label="Main" className="hidden items-center gap-9 text-[0.98rem] font-medium md:flex">
            {nav.map((n) => (
              <NavLink key={n.to} to={n.to} className="group relative py-1">
                {({ isActive }) => (
                  <>
                    {n.label}
                    <span
                      className={`absolute inset-x-0 -bottom-0.5 h-[2px] origin-left bg-green transition-transform duration-300 ${isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}
                    />
                  </>
                )}
              </NavLink>
            ))}
            <Magnetic>
              <a
                href={firm.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="link-arrow bg-green px-5 py-2.5 text-paper transition-colors duration-300 hover:bg-green-deep"
              >
                Book a call <span className="arrow" aria-hidden="true">→</span>
              </a>
            </Magnetic>
          </nav>
          <button
            type="button"
            className={`relative z-50 text-[0.95rem] font-semibold uppercase tracking-[0.18em] md:hidden ${open ? 'text-paper' : ''}`}
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((o) => !o)}
          >
            {open ? 'Close' : 'Menu'}
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-nav"
            aria-label="Main"
            className="fixed inset-0 z-30 flex flex-col justify-between bg-green px-4 pb-10 pt-28 text-paper md:hidden"
            initial={{ clipPath: 'circle(0% at 92% 4%)' }}
            animate={{ clipPath: 'circle(150% at 92% 4%)' }}
            exit={{ clipPath: 'circle(0% at 92% 4%)' }}
            transition={{ duration: reduce ? 0 : 0.6, ease }}
          >
            <ul>
              {[{ to: '/', label: 'Home' }, ...nav].map((n, i) => (
                <li key={n.to} className="overflow-hidden border-b border-paper/20">
                  <motion.div initial={{ y: '100%' }} animate={{ y: '0%' }} transition={{ duration: 0.5, ease, delay: reduce ? 0 : 0.2 + i * 0.07 }}>
                    <Link to={n.to} className="display block py-3 text-6xl">
                      {n.label}
                    </Link>
                  </motion.div>
                </li>
              ))}
            </ul>
            <div className="space-y-2 text-lg">
              <a href={firm.whatsapp} className="link-arrow font-semibold text-lime">
                Book a call on WhatsApp <span className="arrow" aria-hidden="true">→</span>
              </a>
              <p>{firm.phoneDisplay}</p>
              <p>{firm.email}</p>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  )
}

function Footer() {
  return (
    <footer className="bg-ink text-paper/80">
      <div className="wrap py-16">
        <Logo tone="paper" className="h-auto w-full max-w-[44rem] opacity-90" />
      </div>
      <div className="wrap grid gap-10 border-t border-paper/15 py-12 text-[0.95rem] md:grid-cols-12">
        <address className="not-italic leading-relaxed md:col-span-5">
          {firm.address.map((l) => (
            <span key={l} className="block">
              {l}
            </span>
          ))}
        </address>
        <ul className="space-y-1.5 md:col-span-4">
          {services.map((s) => (
            <li key={s.slug}>
              <Link to={`/services/${s.slug}`} className="hover:text-lime">
                {s.name}
              </Link>
            </li>
          ))}
        </ul>
        <ul className="space-y-1.5 md:col-span-3">
          <li><a className="hover:text-lime" href={firm.phoneHref}>{firm.phoneDisplay}</a></li>
          <li><a className="hover:text-lime" href={`mailto:${firm.email}`}>{firm.email}</a></li>
          <li><a className="hover:text-lime" href={firm.whatsapp} target="_blank" rel="noopener noreferrer">WhatsApp</a></li>
          <li><a className="hover:text-lime" href={firm.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
        </ul>
      </div>
      <div className="wrap border-t border-paper/15 py-6 text-sm text-paper/60">
        © {new Date().getFullYear()} H Dang and Company, Chartered Accountants
      </div>
    </footer>
  )
}

/** Green panel that wipes across the screen when you change page. */
function Curtain() {
  const { pathname } = useLocation()
  const reduce = useReducedMotion()
  const first = useRef(true)
  const [key, setKey] = useState<string | null>(null)
  useEffect(() => {
    if (first.current) {
      first.current = false
      return
    }
    if (!reduce) setKey(pathname)
  }, [pathname, reduce])
  return (
    <AnimatePresence>
      {key && (
        <motion.div
          key={key}
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 z-[60] grid place-items-center bg-green"
          initial={{ clipPath: 'inset(0% 0% 0% 0%)' }}
          animate={{ clipPath: 'inset(0% 0% 100% 0%)' }}
          transition={{ duration: 0.7, ease, delay: 0.15 }}
          onAnimationComplete={() => setKey(null)}
        >
          <Logo tone="paper" className="h-auto w-[60vw] max-w-[28rem]" />
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default function Layout() {
  const { pathname } = useLocation()
  useEffect(() => {
    const m = metaFor(pathname)
    document.title = m.title
    document.querySelector('meta[name="description"]')?.setAttribute('content', m.description)
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:bg-paper focus:px-4 focus:py-2">
        Skip to content
      </a>
      <ScrollProgress />
      <Header />
      <Curtain />
      <main id="main" className="pt-[76px] md:pt-[92px]">
        <Outlet />
      </main>
      <Footer />
    </>
  )
}
