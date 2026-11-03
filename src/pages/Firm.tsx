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
  { when: 'July 2022', title: 'Associate Chartered Accountant', text: 'Admitted as an Associate member of the ICAI, M. No. 615134.' },
  { when: 'December 2022', title: 'Certificate of Practice', text: 'Certificate of Practice issued by the ICAI.' },
  { when: '2022', title: 'Firm established', text: 'H Dang and Company registered with the ICAI under FRN 158649W.' },
  { when: 'Today', title: 'A dedicated finance team', text: 'FP&A analysts, senior and junior accountants, human resources and office administration.' },
]

function FirmDetails() {
  const line = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: line, offset: ['start 0.85', 'start 0.4'] })
  const width = useSpring(useTransform(scrollYProgress, [0, 1], ['0%', '100%']), { stiffness: 120, damping: 30 })
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

      <div ref={line} className="mt-20 md:mt-28">
        <h3 className="display text-3xl md:text-4xl">Milestones</h3>
        <div className="relative mt-8">
          <div className="absolute left-0 right-0 top-[0.45rem] hidden h-[2px] bg-rule md:block" aria-hidden="true">
            <motion.div className="h-[2px] bg-green" style={{ width: reduce ? '100%' : width }} />
          </div>
          <ol className="grid gap-8 md:grid-cols-4">
            {milestones.map((m, i) => (
              <Reveal as="li" key={m.title} delay={i * 0.12} className="relative border-l-2 border-rule pl-5 md:border-l-0 md:pl-0">
                <span className="absolute -left-[0.45rem] top-0 h-3.5 w-3.5 rounded-full border-2 border-paper bg-green md:static md:block" aria-hidden="true" />
                <p className="eyebrow mt-0 text-[0.68rem] text-green md:mt-5">{m.when}</p>
                <p className="display mt-2 text-2xl">{m.title}</p>
                <p className="mt-1 text-[0.95rem] text-muted">{m.text}</p>
              </Reveal>
            ))}
          </ol>
        </div>
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
