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
      <div className="wrap border-t border-paper/15 pt-6 pb-24 text-[0.82rem] text-paper/80">{firm.icaiNote}</div>
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

/** WhatsApp chat button. Opens WhatsApp only when tapped: no pop-up, no automatic greeting. */
function WhatsAppChat() {
  const text = encodeURIComponent('Hello, I have a query.')
  return (
    <a
      href={`${firm.whatsapp}?text=${text}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp (opens WhatsApp)"
      className="group fixed bottom-4 right-4 z-[25] flex items-center gap-2 bg-green-ink p-3 text-paper shadow-[0_8px_24px_rgba(27,66,57,0.35)] ring-1 ring-lime/60 transition-colors duration-300 hover:bg-green md:bottom-6 md:right-6 md:px-4"
    >
      <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" className="shrink-0 fill-lime">
        <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.21h.01c5.46 0 9.91-4.45 9.91-9.91A9.9 9.9 0 0 0 12.04 2Zm0 18.15h-.01a8.23 8.23 0 0 1-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.38c0-4.54 3.7-8.23 8.25-8.23a8.24 8.24 0 0 1 8.23 8.24c0 4.54-3.7 8.23-8.22 8.23Zm4.52-6.16c-.25-.12-1.47-.72-1.7-.8-.23-.09-.39-.13-.56.12-.16.25-.64.8-.79.97-.14.16-.29.18-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.5.11-.11.25-.29.37-.43.12-.15.16-.25.25-.41.08-.17.04-.31-.02-.43-.06-.13-.56-1.35-.77-1.85-.2-.48-.41-.42-.56-.43h-.48a.92.92 0 0 0-.66.31c-.23.25-.87.85-.87 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.24 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.15-1.18-.06-.1-.23-.16-.48-.29Z" />
      </svg>
      <span className="hidden text-[0.95rem] font-semibold md:inline">Chat on WhatsApp</span>
    </a>
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
      <WhatsAppChat />
    </>
  )
}
