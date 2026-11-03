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
  { to: '/', label: 'Home' },
  { to: '/services', label: 'Services' },
  { to: '/services/fundraising-readiness', label: 'Fundraising' },
  { to: '/industries', label: 'Industries' },
  { to: '/how-we-work', label: 'How we work' },
  { to: '/the-firm', label: 'The firm' },
  { to: '/blogs', label: 'Blogs' },
  { to: '/faqs', label: 'FAQs' },
  { to: '/contact', label: 'Contact' },
]

/** Services link with a drop-down of every service page (desktop). */
function ServicesMenu() {
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()
  const reduce = useReducedMotion()
  useEffect(() => setOpen(false), [pathname])
  const active = pathname.startsWith('/services')
  return (
    <div className="relative" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      <div className="flex items-center gap-1">
        <NavLink to="/services" className="group relative py-1">
          Services
          <span className={`absolute inset-x-0 -bottom-0.5 h-[2px] origin-left bg-green transition-transform duration-300 ${active ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`} />
        </NavLink>
        <button
          type="button"
          aria-expanded={open}
          aria-controls="services-menu"
          aria-label="Show all services"
          onClick={() => setOpen((o) => !o)}
          className="px-1 text-green"
        >
          <motion.span className="inline-block" animate={{ rotate: open ? 180 : 0 }} transition={{ duration: reduce ? 0 : 0.25 }} aria-hidden="true">
            ▾
          </motion.span>
        </button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            id="services-menu"
            className="absolute left-1/2 top-full w-[34rem] -translate-x-1/2 pt-4"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: reduce ? 0 : 0.25, ease }}
          >
            <ul className="bg-green p-3 text-paper shadow-[0_20px_40px_-20px_rgba(0,0,0,0.4)]">
              {services.map((sv) => (
                <li key={sv.slug}>
                  <Link
                    to={`/services/${sv.slug}`}
                    onKeyDown={(e) => e.key === 'Escape' && setOpen(false)}
                    className="group grid grid-cols-[2.5rem_1fr] items-baseline gap-2 px-4 py-3 transition-colors hover:bg-green-ink"
                  >
                    <span className="font-serif text-xl text-lime">{sv.kind === 'core' ? sv.number : ''}</span>
                    <span>
                      <span className="display block text-2xl transition-transform duration-300 group-hover:translate-x-1">{sv.menuName}</span>
                      <span className="block text-[0.85rem] text-paper/85">{sv.short}</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

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
          <Link to="/" aria-label="H Dang and Company, home" className={`block transition-opacity duration-300 ${open ? "opacity-0" : ""}`}>
            <Logo className="h-auto w-[190px] md:w-[250px]" />
          </Link>
          <nav aria-label="Main" className="hidden items-center gap-6 text-[0.95rem] font-medium xl:flex">
            {nav.filter((n) => n.to !== '/contact' && n.to !== '/').map((n) =>
              n.to === '/services' ? (
                <ServicesMenu key={n.to} />
              ) : (
              <NavLink key={n.to} to={n.to} end className="group relative py-1">
                {({ isActive }) => (
                  <>
                    {n.label}
                    <span
                      className={`absolute inset-x-0 -bottom-0.5 h-[2px] origin-left bg-green transition-transform duration-300 ${isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}
                    />
                  </>
                )}
              </NavLink>
              ),
            )}
            <Magnetic>
              <Link to="/contact" className="link-arrow bg-green-ink px-5 py-2.5 text-paper transition-colors duration-300 hover:bg-green">
                Send an enquiry <span className="arrow" aria-hidden="true">→</span>
              </Link>
            </Magnetic>
          </nav>
          <button
            type="button"
            className={`relative z-50 text-[0.95rem] font-semibold uppercase tracking-[0.18em] xl:hidden ${open ? 'text-paper' : ''}`}
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
            className="fixed inset-0 z-30 flex flex-col justify-between gap-6 overflow-y-auto bg-green px-4 pb-10 pt-24 text-paper xl:hidden"
            initial={{ clipPath: 'circle(0% at 92% 4%)' }}
            animate={{ clipPath: 'circle(150% at 92% 4%)' }}
            exit={{ clipPath: 'circle(0% at 92% 4%)' }}
            transition={{ duration: reduce ? 0 : 0.6, ease }}
          >
            <ul className="overflow-y-auto">
              {nav.map((n, i) => (
                <li key={n.to} className="overflow-hidden border-b border-paper/20">
                  <motion.div initial={{ y: '100%' }} animate={{ y: '0%' }} transition={{ duration: 0.5, ease, delay: reduce ? 0 : 0.2 + i * 0.07 }}>
                    <Link to={n.to} className="display block py-1.5 text-4xl">
                      {n.label}
                    </Link>
                    {n.to === '/services' && (
                      <ul className="pb-3 pl-1">
                        {services.map((sv) => (
                          <li key={sv.slug}>
                            <Link to={`/services/${sv.slug}`} className="flex items-baseline gap-3 py-1.5 text-lg">
                              <span className="w-6 font-serif text-lime">{sv.kind === 'core' ? sv.number : ''}</span>
                              {sv.menuName}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </motion.div>
                </li>
              ))}
            </ul>
            <div className="space-y-2 text-lg">
              <Link to="/contact" className="link-arrow font-semibold text-lime">
                Send an enquiry <span className="arrow" aria-hidden="true">→</span>
              </Link>
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
  const links = [
    { to: '/services', label: 'Services' },
    { to: '/blogs', label: 'Blogs' },
    { to: '/faqs', label: 'FAQs' },
    { to: '/disclaimer', label: 'Disclaimer' },
    { to: '/privacy-policy', label: 'Privacy Policy' },
    { to: '/terms-of-use', label: 'Terms of Use' },
  ]
  return (
    <footer className="border-t-4 border-lime bg-green-ink text-paper/90">
      <div className="wrap grid gap-10 py-14 md:grid-cols-12">
        <div className="md:col-span-5">
          <Logo tone="paper" className="h-auto w-full max-w-[24rem] opacity-90" />
          <p className="mt-6 text-[0.92rem]">FRN {firm.frn} · {firm.proprietor}, Proprietor, M. No. {firm.membership}</p>
          <address className="mt-4 text-[0.92rem] not-italic leading-relaxed">{firm.address.join(', ')}</address>
        </div>
        <ul className="space-y-1.5 text-[0.95rem] md:col-span-3 md:col-start-7">
          {services.map((s) => (
            <li key={s.slug}>
              <Link to={`/services/${s.slug}`} className="hover:text-lime">{s.menuName}</Link>
            </li>
          ))}
        </ul>
        <ul className="space-y-1.5 text-[0.95rem] md:col-span-3">
          <li><a className="hover:text-lime" href={firm.phoneHref}>{firm.phoneDisplay}</a></li>
          <li><a className="hover:text-lime" href={`mailto:${firm.email}`}>{firm.email}</a></li>
          <li><a className="hover:text-lime" href={firm.whatsapp} target="_blank" rel="noopener noreferrer">WhatsApp</a></li>
          <li><a className="hover:text-lime" href={firm.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
        </ul>
      </div>
      <div className="wrap flex flex-col gap-4 border-t border-paper/15 py-6 text-[0.85rem] md:flex-row md:items-center md:justify-between">
        <p>© {new Date().getFullYear()} H Dang and Company, Chartered Accountants</p>
        <ul className="flex flex-wrap gap-x-5 gap-y-2">
          {links.map((l) => (
            <li key={l.to}><Link to={l.to} className="underline underline-offset-4 hover:text-lime">{l.label}</Link></li>
          ))}
        </ul>
      </div>
      <div className="wrap border-t border-paper/15 py-6 text-[0.82rem] text-paper/80">{firm.icaiNote}</div>
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
