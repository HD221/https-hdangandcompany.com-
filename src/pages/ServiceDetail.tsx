import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { services, type Section } from '../content'
import { ClipReveal, Picture, Reveal, SplitText, ease } from '../components/Motion'
import ServiceVisual from '../components/ServiceVisuals'
import ContactBand from '../components/ContactBand'
import NotFound from './NotFound'

function Item({ sec, i, open, onToggle }: { sec: Section; i: number; open: boolean; onToggle: () => void }) {
  const reduce = useReducedMotion()
  const id = `sec-${i}`
  return (
    <li className="border-t border-rule">
      <h3>
        <button
          type="button"
          aria-expanded={open}
          aria-controls={id}
          onClick={onToggle}
          className="group flex w-full items-center justify-between gap-6 py-7 text-left md:py-9"
        >
          <span className="flex items-baseline gap-5">
            <span className="font-serif text-xl text-green tabular-nums">{String(i + 1).padStart(2, '0')}</span>
            <span className="display text-3xl transition-transform duration-500 group-hover:translate-x-2 md:text-5xl">{sec.title}</span>
          </span>
          <span
            aria-hidden="true"
            className="grid h-12 w-12 shrink-0 place-items-center border border-green text-2xl text-green transition-colors group-hover:bg-green group-hover:text-paper"
          >
            <motion.span className="block leading-none" animate={{ rotate: open ? 45 : 0 }} transition={{ duration: reduce ? 0 : 0.3 }}>
              +
            </motion.span>
          </span>
        </button>
      </h3>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={id}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: reduce ? 0 : 0.45, ease }}
            className="overflow-hidden"
          >
            <div className="grid gap-6 pb-10 md:grid-cols-12">
              {sec.body && <p className="max-w-[38rem] md:col-span-6 md:col-start-2">{sec.body}</p>}
              {sec.items && (
                <ul className={`flex flex-wrap content-start gap-2 ${sec.body ? 'md:col-span-5' : 'md:col-span-10 md:col-start-2'}`}>
                  {sec.items.map((it, k) => (
                    <motion.li
                      key={it}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: reduce ? 0 : 0.35, delay: reduce ? 0 : 0.05 * k }}
                      className="bg-green/8 border border-green/25 px-3 py-1.5 text-[0.92rem]"
                    >
                      {it}
                    </motion.li>
                  ))}
                </ul>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  )
}

export default function ServiceDetail() {
  const { slug } = useParams()
  const index = services.findIndex((s) => s.slug === slug)
  const [open, setOpen] = useState(0)
  if (index < 0) return <NotFound />
  const s = services[index]
  const next = services[(index + 1) % services.length]

  return (
    <>
      <section className="wrap grid items-center gap-10 pb-16 pt-10 md:grid-cols-12 md:pb-24 md:pt-16">
        <div className="md:col-span-6">
          <p className="eyebrow text-green">
            <Link to="/services" className="hover:underline underline-offset-4">Services</Link>
            <span aria-hidden="true"> / </span>
            {s.number}
          </p>
          <SplitText as="h1" onMount key={s.slug} text={s.name} className="display mt-6 text-[3.4rem] sm:text-7xl lg:text-[7rem]" />
          <motion.p
            key={s.slug + '-t'}
            className="mt-6 max-w-[30rem] font-serif text-3xl italic leading-tight text-green"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            {s.tagline}
          </motion.p>
        </div>
        <div className="bg-green p-6 md:col-span-6 md:p-10">
          <ServiceVisual key={s.slug} slug={s.slug} tone="dark" />
        </div>
      </section>

      {s.image && (
        <div className="wrap mb-20 md:mb-28">
          <ClipReveal className="aspect-[16/10] md:aspect-[21/9]">
            <Picture img={s.image} widths={s.image.w > 640 ? [640, 940] : [640]} sizes="(min-width: 1440px) 1360px, 100vw" className="h-full w-full object-cover" />
          </ClipReveal>
        </div>
      )}

      <section className="wrap grid gap-10 pb-24 md:grid-cols-12 md:pb-32" aria-label={`What ${s.name.toLowerCase()} includes`}>
        <Reveal className="md:col-span-4">
          <h2 className="eyebrow text-green">What is included</h2>
          <p className="mt-4 max-w-[24rem] text-muted">{s.intro}</p>
        </Reveal>
        <ul className="border-b border-rule md:col-span-8">
          {s.sections.map((sec, i) => (
            <Item key={s.slug + sec.title} sec={sec} i={i} open={open === i} onToggle={() => setOpen(open === i ? -1 : i)} />
          ))}
        </ul>
      </section>

      <section className="group relative overflow-hidden bg-ink text-paper">
        <Link to={`/services/${next.slug}`} onClick={() => setOpen(0)} className="wrap flex flex-col gap-3 py-16 md:py-24">
          <span className="eyebrow text-lime">Next service</span>
          <span className="display link-arrow text-5xl md:text-8xl">
            <span className="transition-colors duration-300 group-hover:text-lime">{next.name}</span>
            <span className="arrow" aria-hidden="true">→</span>
          </span>
        </Link>
      </section>

      <ContactBand />
    </>
  )
}
