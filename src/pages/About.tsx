import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { founder } from '../content'
import { ClipReveal, Parallax, Picture, Reveal, ScrollHighlight, SplitText } from '../components/Motion'
import ContactBand from '../components/ContactBand'

const office = { src: '/images/office', alt: 'An open plan office with rows of desks and chairs', w: 940, h: 788 }
const workshop = { src: '/images/workshop', alt: 'A small team reviewing notes on a whiteboard', w: 940, h: 788 }

function VisionMission() {
  const ref = useRef<HTMLElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const left = useTransform(scrollYProgress, [0, 1], ['-8%', '8%'])
  const right = useTransform(scrollYProgress, [0, 1], ['8%', '-8%'])
  const cards = [
    { title: 'Vision', text: 'Help every client reach their financial goals and grow with confidence.', y: left, cls: 'bg-green text-paper' },
    { title: 'Mission', text: 'Take the financial work off your desk so you can run the business.', y: right, cls: 'bg-lime text-ink md:mt-32' },
  ]
  return (
    <section ref={ref} aria-label="Vision and mission" className="wrap grid gap-6 py-24 md:grid-cols-2 md:gap-10 md:py-36">
      {cards.map((c) => (
        <motion.div key={c.title} style={reduce ? undefined : { y: c.y }} className={`p-8 md:p-14 ${c.cls}`}>
          <h2 className="display text-6xl italic md:text-8xl">{c.title}</h2>
          <p className="mt-8 max-w-[26rem] font-serif text-3xl leading-tight">{c.text}</p>
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
        <Parallax className="aspect-[4/3] md:col-span-7" amount={10}>
          <Picture img={office} widths={[640, 940]} sizes="60vw" className="h-full w-full object-cover" />
        </Parallax>
        <Parallax className="aspect-[4/5] md:col-span-4 md:col-start-9 md:mt-40" amount={14}>
          <Picture img={workshop} widths={[640, 940]} sizes="35vw" className="h-full w-full object-cover" />
        </Parallax>
      </div>

      <section className="wrap py-24 md:py-36">
        <ScrollHighlight
          text="A professionally managed practice for data analytics, financial advisory and tech friendly accounting. We stay with our clients for the long term, and we are always easy to reach."
          className="display max-w-[22ch] text-4xl leading-[1.08] md:text-7xl"
        />
      </section>

      <section aria-labelledby="founder" className="bg-green text-paper">
        <div className="wrap grid gap-10 py-20 md:grid-cols-12 md:py-28">
          <ClipReveal className="aspect-[4/5] md:col-span-5">
            <Picture img={founder.image} widths={[480, 960]} sizes="(min-width: 768px) 40vw, 100vw" className="h-full w-full object-cover object-top" />
          </ClipReveal>
          <Reveal className="self-end md:col-span-6 md:col-start-7">
            <p className="eyebrow text-lime">{founder.role}</p>
            <h2 id="founder" className="display mt-4 text-6xl md:text-9xl">{founder.name}</h2>
            <p className="mt-8 max-w-[34rem] text-lg text-paper/85">{founder.bio.join(' ')}</p>
          </Reveal>
        </div>
      </section>

      <VisionMission />
      <ContactBand />
    </>
  )
}
