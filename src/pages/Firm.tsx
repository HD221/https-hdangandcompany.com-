import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion'
import { firm } from '../content'
import { Parallax, Picture, Reveal, SplitText, ease } from '../components/Motion'
import WorldReach from '../components/WorldMap'
import { CtaBand, FactsRow, PageHero, StandardsSection } from '../components/Sections'

const img = (name: string, alt: string) => ({ src: `/images/${name}`, alt, w: 940, h: 788 })

const register = [
  { label: 'Firm name', value: 'H Dang and Company, Chartered Accountants' },
  { label: 'Constitution', value: 'Proprietorship firm' },
  { label: 'ICAI Firm Registration No.', value: firm.frn, strong: true },
  { label: 'Proprietor', value: firm.proprietor },
  { label: 'ICAI Membership No.', value: firm.membership, strong: true },
  { label: 'Clients served', value: 'Owner-managed and venture-backed businesses across multiple countries' },
  { label: 'Office', value: firm.address.join(', ') },
  { label: 'Working hours', value: firm.hours },
]

const milestones = [
  { when: 'July 2022', big: 'Jul 2022', title: 'Associate Chartered Accountant', text: 'Admitted as an Associate member of the ICAI, M. No. 615134.' },
  { when: 'December 2022', big: 'Dec 2022', title: 'Certificate of Practice', text: 'Certificate of Practice issued by the ICAI.' },
  { when: '2022', big: '2022', title: 'Firm established', text: 'H Dang and Company registered with the ICAI under FRN 158649W.' },
  { when: 'Today', big: 'Today', title: 'A dedicated finance team', text: 'FP&A analysts, senior and junior accountants, human resources and office administration.' },
]

/** Milestone card: its big date fills with green as it scrolls into view. */
function Milestone({ m, i }: { m: (typeof milestones)[number]; i: number }) {
  const ref = useRef<HTMLLIElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.95', 'start 0.55'] })
  const fill = useSpring(useTransform(scrollYProgress, [0, 1], [0, 100]), { stiffness: 90, damping: 24 })
  const size = useTransform(fill, (v) => `${reduce ? 100 : v}% 100%`)
  return (
    <motion.li
      ref={ref}
      className="group relative overflow-hidden border border-rule bg-white p-6 transition-shadow duration-500 hover:shadow-[0_24px_40px_-28px_rgba(27,66,57,0.55)] md:p-7"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={reduce ? undefined : { y: -6 }}
      viewport={{ once: true, margin: '0px 0px -8% 0px' }}
      transition={{ duration: reduce ? 0 : 0.6, ease, delay: reduce ? 0 : i * 0.12 }}
    >
      <motion.span
        aria-hidden="true"
        className="display block whitespace-nowrap bg-no-repeat text-5xl leading-none text-transparent [-webkit-background-clip:text] [-webkit-text-stroke:1px_var(--color-green)] [background-clip:text] md:text-6xl"
        style={{ backgroundImage: 'linear-gradient(var(--color-green), var(--color-green))', backgroundSize: size }}
      >
        {m.big}
      </motion.span>
      <span className="sr-only">{m.when}: </span>
      <p className="display mt-6 text-2xl">{m.title}</p>
      <p className="mt-1 text-[0.95rem] text-muted">{m.text}</p>
      <span className="absolute bottom-0 left-0 h-1 w-0 bg-lime transition-all duration-500 group-hover:w-full" aria-hidden="true" />
    </motion.li>
  )
}

function FirmDetails() {
  const reduce = useReducedMotion()
  return (
    <section aria-labelledby="firm-details" className="wrap py-20 md:py-28">
      <div className="grid gap-12 md:grid-cols-12">
        <div className="md:col-span-5">
          <p className="eyebrow text-green">Firm details</p>
          <SplitText id="firm-details" text="Registration and *credentials*" className="display mt-4 text-5xl md:text-7xl" />
          <p className="mt-6 max-w-[28rem] text-muted">
            The firm's registration with the Institute of Chartered Accountants of India, and the qualifications of its proprietor.
          </p>
          <div className="mt-10 grid max-w-[26rem] grid-cols-2 gap-px bg-rule">
            {[
              { k: 'FRN', v: firm.frn },
              { k: 'M. No.', v: firm.membership },
            ].map((x, i) => (
              <motion.div
                key={x.k}
                className="bg-green-ink p-6 text-paper"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: reduce ? 0 : 0.6, ease, delay: reduce ? 0 : i * 0.12 }}
              >
                <p className="eyebrow text-[0.65rem] text-lime">ICAI {x.k}</p>
                <p className="display mt-2 text-4xl tabular-nums">{x.v}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <Reveal className="md:col-span-7">
          <div className="relative border border-green-ink/20 bg-white p-6 shadow-[0_30px_60px_-40px_rgba(27,66,57,0.45)] md:p-10">
            <span className="absolute inset-x-0 top-0 h-1 bg-green" aria-hidden="true" />
            <div className="flex flex-wrap items-baseline justify-between gap-3 border-b-2 border-green-ink pb-4">
              <p className="display text-3xl">Firm register</p>
              <p className="eyebrow text-[0.65rem] text-green">FRN {firm.frn}</p>
            </div>
            <dl className="divide-y divide-rule">
              {register.map((r, i) => (
                <motion.div
                  key={r.label}
                  className="grid gap-1 py-3.5 sm:grid-cols-[13rem_1fr] sm:gap-6"
                  initial={{ opacity: 0, x: reduce ? 0 : -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '0px 0px -5% 0px' }}
                  transition={{ duration: reduce ? 0 : 0.45, ease, delay: reduce ? 0 : i * 0.04 }}
                >
                  <dt className="text-[0.85rem] text-muted">{r.label}</dt>
                  <dd className={r.strong ? 'font-semibold tabular-nums text-green-ink' : ''}>{r.value}</dd>
                </motion.div>
              ))}
            </dl>
          </div>
        </Reveal>
      </div>

      <div className="mt-20 md:mt-28">
        <h3 className="display text-3xl md:text-4xl">Milestones</h3>
        <ol className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {milestones.map((m, i) => (
            <Milestone key={m.title} m={m} i={i} />
          ))}
        </ol>
      </div>
    </section>
  )
}

export default function Firm() {
  return (
    <>
      <PageHero
        crumbs={[{ label: 'Home', to: '/' }, { label: 'The firm' }]}
        eyebrow="The firm"
        title="The *firm*"
        intro="A Chartered Accountant-led finance team that keeps your books, plans your numbers and prepares you for investors."
      >
        <FactsRow light />
      </PageHero>

      <FirmDetails />

      <WorldReach />

      <StandardsSection heading={false} />

      <div className="wrap grid gap-6 py-20 md:grid-cols-12 md:py-28">
        <Parallax className="aspect-[4/3] md:col-span-7" amount={10}>
          <Picture img={img('about-team', 'Colleagues joining hands over a desk of charts')} widths={[640, 940]} sizes="(min-width: 768px) 58vw, 100vw" className="h-full w-full object-cover" />
        </Parallax>
        <Parallax className="aspect-[4/5] md:col-span-4 md:col-start-9 md:mt-24" amount={14}>
          <Picture img={img('about-laptop', 'Two people reviewing work on a laptop together')} widths={[640, 940]} sizes="(min-width: 768px) 33vw, 100vw" className="h-full w-full object-cover" />
        </Parallax>
      </div>

      <CtaBand />
    </>
  )
}
