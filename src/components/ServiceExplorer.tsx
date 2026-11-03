import { useId, useRef, useState, type KeyboardEvent } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { coreServices } from '../content'
import { SplitText, ease } from './Motion'
import ServiceVisual from './ServiceVisuals'

/**
 * Interactive list of the four core services. Choosing one (click, hover or arrow keys)
 * slides the marker to it and swaps the detail panel on the right.
 */
export default function ServiceExplorer() {
  const [active, setActive] = useState(0)
  const reduce = useReducedMotion()
  const base = useId()
  const tabs = useRef<(HTMLButtonElement | null)[]>([])
  const s = coreServices[Math.max(0, active)]

  function onKey(e: KeyboardEvent<HTMLButtonElement>, i: number) {
    const n = coreServices.length
    const next = e.key === 'ArrowDown' || e.key === 'ArrowRight' ? (i + 1) % n : e.key === 'ArrowUp' || e.key === 'ArrowLeft' ? (i - 1 + n) % n : -1
    if (next < 0) return
    e.preventDefault()
    setActive(next)
    tabs.current[next]?.focus()
  }

  return (
    <section aria-labelledby="our-services" className="wrap py-20 md:py-28">
      <div className="grid gap-8 md:grid-cols-12 md:items-end">
        <div className="md:col-span-7">
          <p className="eyebrow text-green">Our services</p>
          <SplitText id="our-services" text="An outsourced finance function, built around *four core services.*" className="display mt-4 text-4xl md:text-6xl" />
        </div>
        <p className="text-lg leading-relaxed text-muted md:col-span-5 md:text-xl">
          Each engagement runs on a written scope and a fixed monthly calendar. Every deliverable is reviewed by a Chartered Accountant before it reaches you.
        </p>
      </div>

      <div className="mt-12 hidden gap-6 lg:grid lg:grid-cols-12">
        <div role="tablist" aria-orientation="vertical" aria-label="Core services" className="flex flex-col border-t-2 border-green-ink lg:col-span-5">
          {coreServices.map((sv, i) => {
            const on = i === Math.max(0, active)
            return (
              <button
                key={sv.slug}
                ref={(el) => (tabs.current[i] = el)}
                role="tab"
                id={`${base}-tab-${i}`}
                aria-selected={on}
                aria-controls={`${base}-panel`}
                tabIndex={on ? 0 : -1}
                onClick={() => setActive(i)}
                onMouseEnter={() => setActive(i)}
                onKeyDown={(e) => onKey(e, i)}
                className="group relative grid grid-cols-[3rem_1fr] items-baseline gap-3 border-b border-rule py-6 pl-5 pr-4 text-left transition-colors"
              >
                {on && (
                  <motion.span
                    layoutId={`${base}-marker`}
                    className="absolute inset-y-0 left-0 w-1 bg-green"
                    transition={{ duration: reduce ? 0 : 0.4, ease }}
                    aria-hidden="true"
                  />
                )}
                {on && (
                  <motion.span
                    layoutId={`${base}-wash`}
                    className="absolute inset-0 -z-10 bg-green/[0.07]"
                    transition={{ duration: reduce ? 0 : 0.4, ease }}
                    aria-hidden="true"
                  />
                )}
                <span className={`display text-2xl transition-colors ${on ? 'text-green' : 'text-muted'}`}>{sv.number}</span>
                <span>
                  <span className={`display block text-3xl transition-transform duration-500 md:text-4xl ${on ? 'translate-x-1' : 'group-hover:translate-x-1'}`}>{sv.name}</span>
                  <span className={`mt-1 block text-[0.95rem] text-muted ${on ? '' : 'lg:hidden'}`}>{sv.short}</span>
                </span>
              </button>
            )
          })}
        </div>

        <div
          role="tabpanel"
          id={`${base}-panel`}
          aria-labelledby={`${base}-tab-${Math.max(0, active)}`}
          className="relative isolate min-h-[30rem] overflow-hidden bg-green text-paper lg:col-span-7"
        >
          <span className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full border border-paper/10" aria-hidden="true" />
          <span className="pointer-events-none absolute -bottom-32 -left-16 h-80 w-80 rounded-full border border-paper/10" aria-hidden="true" />
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={s.slug}
              className="relative grid h-full gap-8 p-6 md:grid-cols-2 md:p-10"
              initial={reduce ? false : { opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? undefined : { opacity: 0, y: -16 }}
              transition={{ duration: reduce ? 0 : 0.4, ease }}
            >
              <div className="flex flex-col">
                <span className="display text-7xl leading-none text-lime md:text-8xl">{s.number}</span>
                <h3 className="display mt-6 text-3xl md:text-4xl">{s.name}</h3>
                <ul className="mt-6 grid gap-2 text-[0.95rem]">
                  {s.bullets.map((b, i) => (
                    <motion.li
                      key={b}
                      className="flex items-start gap-2"
                      initial={reduce ? false : { opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: reduce ? 0 : 0.35, delay: reduce ? 0 : 0.15 + i * 0.05 }}
                    >
                      <span className="mt-[0.6em] h-1.5 w-1.5 shrink-0 rounded-full bg-lime" aria-hidden="true" />
                      {b}
                    </motion.li>
                  ))}
                </ul>
                <Link
                  to={`/services/${s.slug}`}
                  className="link-arrow mt-auto self-start bg-lime px-5 py-3 font-semibold text-ink transition-transform duration-300 hover:-translate-y-0.5 max-md:mt-8"
                >
                  Explore {s.menuName} <span className="arrow" aria-hidden="true">→</span>
                </Link>
              </div>
              <div className="self-center">
                <ServiceVisual slug={s.slug} tone="dark" />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
      {/* Phones and tablets: each service opens in place */}
      <ul className="mt-10 border-t-2 border-green-ink lg:hidden">
        {coreServices.map((sv, i) => {
          const on = i === active
          return (
            <li key={sv.slug} className="border-b border-rule">
              <h3>
                <button
                  type="button"
                  aria-expanded={on}
                  aria-controls={`${base}-m-${i}`}
                  onClick={() => setActive(on ? -1 : i)}
                  className="grid w-full grid-cols-[2.5rem_1fr_2rem] items-baseline gap-2 py-5 text-left"
                >
                  <span className={`display text-xl ${on ? 'text-green' : 'text-muted'}`}>{sv.number}</span>
                  <span className="display text-3xl">{sv.name}</span>
                  <motion.span className="text-2xl text-green" animate={{ rotate: on ? 45 : 0 }} transition={{ duration: reduce ? 0 : 0.25 }} aria-hidden="true">
                    +
                  </motion.span>
                </button>
              </h3>
              <AnimatePresence initial={false}>
                {on && (
                  <motion.div
                    id={`${base}-m-${i}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: reduce ? 0 : 0.4, ease }}
                    className="overflow-hidden"
                  >
                    <div className="mb-6 bg-green p-6 text-paper">
                      <p>{sv.short}</p>
                      <div className="mt-5">
                        <ServiceVisual slug={sv.slug} tone="dark" />
                      </div>
                      <ul className="mt-5 flex flex-wrap gap-2 text-[0.85rem]">
                        {sv.bullets.map((b) => (
                          <li key={b} className="border border-paper/35 px-2.5 py-1">{b}</li>
                        ))}
                      </ul>
                      <Link to={`/services/${sv.slug}`} className="link-arrow mt-6 bg-lime px-5 py-3 font-semibold text-ink">
                        Explore {sv.menuName} <span className="arrow" aria-hidden="true">→</span>
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
