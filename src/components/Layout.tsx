import { useEffect, useState } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import { firm, services } from '../content'
import { metaFor } from '../routes'
import { ArrowLink } from './Arrow'

function Wordmark() {
  return (
    <Link to="/" className="group block leading-none" aria-label="H Dang and Company, home">
      <span className="block font-serif text-[1.55rem] font-semibold tracking-[0.01em] text-green [font-variant:small-caps] md:text-[1.8rem]">
        H Dang and Company
      </span>
      <span className="mt-1 block text-[0.62rem] font-medium uppercase tracking-[0.32em] text-green">
        Chartered Accountants
      </span>
    </Link>
  )
}

const nav = [
  { to: '/services', label: 'Services' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
]

function Header() {
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()
  useEffect(() => setOpen(false), [pathname])

  return (
    <header className="relative z-20 border-b border-rule">
      <div className="wrap flex items-center justify-between py-5">
        <Wordmark />
        <nav aria-label="Main" className="hidden items-center gap-9 text-[0.95rem] md:flex">
          {nav.map((n) => (
            <NavLink
              key={n.to}
              to={n.to}
              className={({ isActive }) =>
                `underline-offset-[0.35em] hover:underline ${isActive ? 'underline decoration-green decoration-2' : ''}`
              }
            >
              {n.label}
            </NavLink>
          ))}
          <a
            href={firm.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="link-arrow bg-green px-5 py-2.5 font-medium text-paper transition-colors duration-300 hover:bg-green-deep"
          >
            Book a call <span className="arrow" aria-hidden="true">→</span>
          </a>
        </nav>
        <button
          type="button"
          className="text-[0.95rem] font-medium underline underline-offset-[0.35em] md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? 'Close' : 'Menu'}
        </button>
      </div>
      {open && (
        <nav id="mobile-nav" aria-label="Main" className="wrap border-t border-rule pb-8 pt-4 md:hidden">
          <ul>
            {[{ to: '/', label: 'Home' }, ...nav].map((n) => (
              <li key={n.to} className="border-b border-rule">
                <Link to={n.to} className="display block py-4 text-3xl">
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-6">
            <ArrowLink to={firm.whatsapp}>Book a call on WhatsApp</ArrowLink>
          </p>
        </nav>
      )}
    </header>
  )
}

function Footer() {
  return (
    <footer className="bg-ink text-paper/80">
      <div className="wrap grid gap-10 py-14 text-[0.95rem] md:grid-cols-12">
        <div className="md:col-span-5">
          <p className="font-serif text-2xl text-paper [font-variant:small-caps]">H Dang and Company</p>
          <p className="mt-1 text-[0.62rem] uppercase tracking-[0.32em]">Chartered Accountants</p>
          <address className="mt-6 not-italic leading-relaxed">
            {firm.address.map((l) => (
              <span key={l} className="block">
                {l}
              </span>
            ))}
          </address>
        </div>
        <div className="md:col-span-4">
          <p className="mb-3 text-paper">Services</p>
          <ul className="space-y-1.5">
            {services.map((s) => (
              <li key={s.slug}>
                <Link to={`/services/${s.slug}`} className="hover:text-paper hover:underline underline-offset-4">
                  {s.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="md:col-span-3">
          <p className="mb-3 text-paper">Get in touch</p>
          <ul className="space-y-1.5">
            <li><a className="hover:text-paper hover:underline underline-offset-4" href={firm.phoneHref}>{firm.phoneDisplay}</a></li>
            <li><a className="hover:text-paper hover:underline underline-offset-4" href={`mailto:${firm.email}`}>{firm.email}</a></li>
            <li><a className="hover:text-paper hover:underline underline-offset-4" href={firm.whatsapp} target="_blank" rel="noopener noreferrer">WhatsApp</a></li>
            <li><a className="hover:text-paper hover:underline underline-offset-4" href={firm.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
          </ul>
        </div>
      </div>
      <div className="wrap border-t border-paper/15 py-6 text-sm text-paper/70">
        © {new Date().getFullYear()} H Dang and Company, Chartered Accountants
      </div>
    </footer>
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
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-paper focus:px-4 focus:py-2">
        Skip to content
      </a>
      <Header />
      <main id="main">
        <Outlet />
      </main>
      <Footer />
    </>
  )
}
