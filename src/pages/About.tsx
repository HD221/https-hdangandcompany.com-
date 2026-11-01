import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { founder } from '../content'
import { ClipReveal, Parallax, Picture, Reveal, ScrollHighlight, SplitText } from '../components/Motion'
import ContactBand from '../components/ContactBand'

const img = (name: string, alt: string) => ({ src: `/images/${name}`, alt, w: 940, h: 788 })

const meeting = img('about-meeting', 'Two professionals discussing documents across a meeting table')
const report = img('about-report', 'A financial report with bar charts being reviewed at a desk')
const growth = img('about-growth', 'Coins in a glass jar with a young plant growing from them')
const strategy = img('about-strategy', 'Chess pieces on a board, the king standing ahead of the others')

const gallery = [
  { image: img('about-team', 'Colleagues joining hands over a desk of charts'), caption: 'Working together' },
  { image: img('about-analysis', 'An accountant marking figures on a chart with a calculator beside him'), caption: 'Analysis' },
  { image: img('about-desk', 'A desk with charts, a keyboard and a magnifying glass'), caption: 'Reporting' },
  { image: img('about-laptop', 'Two people reviewing work on a laptop together'), caption: 'Reviews' },
  { image: img('about-tower', 'Glass office towers seen from below against a blue sky'), caption: 'Growth' },
]

function Gallery() {
  const track = useRef<HTMLDivElement>(null)
  const viewport = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  return (
    <section aria-labelledby="gallery" className="overflow-hidden py-20 md:py-28">
      <div className="wrap mb-10 flex items-end justify-between gap-6">
        <h2 id="gallery" className="display text-5xl md:text-7xl">
          How we <span className="italic text-green">work</span>
        </h2>
        <p className="eyebrow hidden text-green md:block" aria-hidden="true">Drag →</p>
      </div>
      <div ref={viewport} className={`pl-4 md:pl-10 ${reduce ? 'overflow-x-auto' : ''}`}>
        <motion.div
          ref={track}
          className="flex w-max cursor-grab gap-5 pr-10 active:cursor-grabbing"
          {...(reduce ? {} : { drag: 'x' as const, dragConstraints: viewport, dragElastic: 0.08 })}
        >
          {gallery.map((g, i) => (
            <motion.figure
              key={g.caption}
              className={`w-[72vw] shrink-0 sm:w-[42vw] lg:w-[28vw] ${i % 2 ? 'mt-12' : ''}`}
              whileHover={reduce ? undefined : { y: -8 }}
              transition={{ duration: 0.3 }}
            >
              <div className="overflow-hidden">
                <motion.div whileHover={reduce ? undefined : { scale: 1.06 }} transition={{ duration: 0.5 }}>
                  <Picture img={g.image} widths={[640, 940]} sizes="(min-width: 1024px) 28vw, 72vw" className="pointer-events-none aspect-[4/5] w-full object-cover" />
                </motion.div>
              </div>
              <figcaption className="mt-3 flex items-baseline gap-3">
                <span className="font-serif text-lg text-green">{String(i + 1).padStart(2, '0')}</span>
                <span className="font-medium">{g.caption}</span>
              </figcaption>
            </motion.figure>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

function VisionMission() {
  const ref = useRef<HTMLElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const left = useTransform(scrollYProgress, [0, 1], ['-6%', '6%'])
  const right = useTransform(scrollYProgress, [0, 1], ['6%', '-6%'])
  const cards = [
    { title: 'Vision', text: 'Help every client reach their financial goals and grow with confidence.', y: left, cls: 'bg-green text-paper', image: growth },
    { title: 'Mission', text: 'Take the financial work off your desk so you can run the business.', y: right, cls: 'bg-lime text-ink md:mt-32', image: strategy },
  ]
  return (
    <section ref={ref} aria-label="Vision and mission" className="wrap grid gap-6 py-24 md:grid-cols-2 md:gap-10 md:py-36">
      {cards.map((c) => (
        <motion.div key={c.title} style={reduce ? undefined : { y: c.y }} className={c.cls}>
          <Parallax className="aspect-[16/10]" amount={8}>
            <Picture img={c.image} widths={[640, 940]} sizes="(min-width: 768px) 45vw, 100vw" className="h-full w-full object-cover" />
          </Parallax>
          <div className="p-8 md:p-12">
            <h2 className="display text-6xl italic md:text-8xl">{c.title}</h2>
            <p className="mt-6 max-w-[26rem] font-serif text-3xl leading-tight">{c.text}</p>
          </div>
        </motion.div>
      ))}
    </section>
  )
}

export default function About() {
  return (
    <>
      <section className="wrap pb-16 pt-12 md:pb-24 md:pt-20">
        <p className="eyebrow text-green">About</p>
        <SplitText as="h1" onMount text="Run your business. *We'll handle the finances.*" className="display mt-6 max-w-[14ch] text-[3.4rem] sm:text-7xl lg:text-[7.5rem]" />
      </section>

      <div className="wrap grid gap-6 md:grid-cols-12">
        <ClipReveal className="aspect-[4/3] md:col-span-7">
          <Picture img={meeting} widths={[640, 940]} sizes="(min-width: 768px) 58vw, 100vw" className="h-full w-full object-cover" />
        </ClipReveal>
        <Parallax className="aspect-[4/5] md:col-span-4 md:col-start-9 md:mt-40" amount={14}>
          <Picture img={report} widths={[640, 940]} sizes="(min-width: 768px) 33vw, 100vw" className="h-full w-full object-cover" />
        </Parallax>
      </div>

      <section className="wrap py-24 md:py-36">
        <ScrollHighlight
          text="A professionally managed practice for startup advice, financial advisory and tech friendly accounting. We stay with our clients for the long term, and we are always easy to reach."
          className="display max-w-[22ch] text-4xl leading-[1.08] md:text-7xl"
        />
      </section>

      <section aria-labelledby="founder" className="bg-green text-paper">
        <div className="wrap grid gap-10 py-20 md:grid-cols-12 md:py-28">
          <ClipReveal className="aspect-[940/788] md:col-span-6">
            <Picture img={founder.image} widths={[640, 940]} sizes="(min-width: 768px) 50vw, 100vw" className="h-full w-full object-cover" />
          </ClipReveal>
          <Reveal className="self-end md:col-span-5 md:col-start-8">
            <p className="eyebrow text-lime">{founder.role}</p>
            <h2 id="founder" className="display mt-4 text-6xl md:text-8xl">{founder.name}</h2>
            <p className="mt-8 max-w-[34rem] text-lg text-paper">{founder.bio.join(' ')}</p>
          </Reveal>
        </div>
      </section>

      <Gallery />
      <VisionMission />
      <ContactBand />
    </>
  )
}
