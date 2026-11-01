import { useLayoutEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useMotionValueEvent, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion'
import { services, type Service } from '../content'
import ServiceVisual from './ServiceVisuals'

const useIsoLayoutEffect = typeof window === 'undefined' ? () => {} : useLayoutEffect

function Panel({ s, i }: { s: Service; i: number }) {
  const dark = i % 2 === 0
  return (
    <article
      className={`relative grid h-full w-[86vw] shrink-0 snap-center grid-rows-[auto_1fr_auto] overflow-hidden p-6 md:w-[70vw] md:grid-cols-2 md:grid-rows-1 md:gap-10 md:p-12 lg:w-[62vw] ${
        dark ? 'bg-green text-paper' : 'bg-green-ink text-paper'
      }`}
    >
      <div className="flex flex-col justify-between">
        <span className="display text-[5rem] leading-none text-lime md:text-[9rem]">{s.number}</span>
        <div>
          <h3 className="display text-[2.3rem] md:text-6xl">{s.name}</h3>
          <p className="mt-3 text-paper md:text-lg">{s.tagline}</p>
          <Link
            to={`/services/${s.slug}`}
            className="link-arrow mt-6 bg-lime px-5 py-3 font-semibold text-ink transition-transform duration-300 hover:-translate-y-0.5"
          >
            <span>Explore</span>
            <span className="arrow" aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
      <ServiceVisual slug={s.slug} tone="dark" className="order-first self-center md:order-none" />
    </article>
  )
}

/**
 * Desktop: the section pins and vertical scrolling slides the service panels sideways.
 * Phones: a swipeable row of panels.
 */
export default function HorizontalServices() {
  const section = useRef<HTMLElement>(null)
  const track = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const [distance, setDistance] = useState(0)
  const [active, setActive] = useState(0)

  useIsoLayoutEffect(() => {
    const measure = () => {
      if (!track.current) return
      setDistance(Math.max(0, track.current.scrollWidth - window.innerWidth))
    }
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [])

  const { scrollYProgress } = useScroll({ target: section, offset: ['start start', 'end end'] })
  const smooth = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.3 })
  const x = useTransform(smooth, [0, 1], [0, -distance])
  const bar = useTransform(smooth, [0, 1], ['0%', '100%'])
  useMotionValueEvent(scrollYProgress, 'change', (v) => setActive(Math.min(services.length - 1, Math.floor(v * services.length))))

  const heading = (
    <div className="wrap flex items-end justify-between gap-6 pb-8 pt-16 md:pb-10 md:pt-20">
      <div>
        <p className="eyebrow text-green">What we do</p>
        <h2 id="what-we-do" className="display mt-4 text-5xl md:text-7xl">
          Three services, <span className="italic text-green">one desk.</span>
        </h2>
      </div>
      <p className="display hidden text-4xl tabular-nums text-green md:block" aria-hidden="true">
        {services[active].number}
        <span className="text-ink/30"> / {String(services.length).padStart(2, '0')}</span>
      </p>
    </div>
  )

  return (
    <>
      {/* Desktop: pinned horizontal scroll */}
      <section
        ref={section}
        aria-labelledby="what-we-do"
        className="relative hidden md:block"
        style={{ height: reduce ? 'auto' : `calc(100vh + ${distance}px)` }}
      >
        <div className={reduce ? '' : 'sticky top-0 flex h-screen flex-col overflow-hidden'}>
          {heading}
          <motion.div
            ref={track}
            className={`flex min-h-0 flex-1 gap-6 px-10 pb-10 ${reduce ? 'overflow-x-auto' : ''}`}
            style={reduce ? undefined : { x }}
          >
            {services.map((s, i) => (
              <Panel key={s.slug} s={s} i={i} />
            ))}
            <div className="w-[4vw] shrink-0" aria-hidden="true" />
          </motion.div>
          {!reduce && (
            <div className="mx-10 mb-6 h-px bg-rule" aria-hidden="true">
              <motion.div className="h-px bg-green" style={{ width: bar }} />
            </div>
          )}
        </div>
      </section>

      {/* Phones: swipe */}
      <section aria-label="What we do" className="md:hidden">
        {heading}
        <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-6 [scrollbar-width:none]">
          {services.map((s, i) => (
            <div key={s.slug} className="h-[78vh] max-h-[40rem] min-h-[32rem]">
              <Panel s={s} i={i} />
            </div>
          ))}
        </div>
        <p className="wrap pb-12 text-[0.9rem] text-muted">Swipe to see all three →</p>
      </section>
    </>
  )
}
