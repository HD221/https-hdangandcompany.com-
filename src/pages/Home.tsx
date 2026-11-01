import { useRef } from 'react'
import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion'
import { firm, founder, services } from '../content'
import { ArrowLink } from '../components/Arrow'
import { ClipReveal, Magnetic, Marquee, Picture, RotatingBadge, ScrollHighlight, SplitText } from '../components/Motion'
import HorizontalServices from '../components/HorizontalServices'
import BreakEven from '../components/BreakEven'
import ContactBand from '../components/ContactBand'

const hero = { src: '/images/desk', alt: 'Hands working through figures with a calculator and pen at a desk', w: 640, h: 426 }

function Hero() {
  const ref = useRef<HTMLElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const imgY = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.25])
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '-25%'])

  // Pointer tilt on the photo
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [6, -6]), { stiffness: 120, damping: 14 })
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-8, 8]), { stiffness: 120, damping: 14 })

  return (
    <section
      ref={ref}
      className="wrap relative grid gap-10 pb-20 pt-10 md:grid-cols-12 md:pb-28 md:pt-16"
      onPointerMove={(e) => {
        if (reduce || e.pointerType !== 'mouse') return
        const r = e.currentTarget.getBoundingClientRect()
        mx.set((e.clientX - r.left) / r.width - 0.5)
        my.set((e.clientY - r.top) / r.height - 0.5)
      }}
      onPointerLeave={() => {
        mx.set(0)
        my.set(0)
      }}
    >
      <motion.div className="relative z-10 md:col-span-7" style={reduce ? undefined : { y: textY }}>
        <motion.p
          className="eyebrow text-green"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: reduce ? 0 : 0.6 }}
        >
          Chartered Accountants, Vadodara
        </motion.p>
        <SplitText as="h1" onMount delay={0.15} text="Practical advice you can *count on.*" className="display mt-6 text-[3.6rem] sm:text-7xl lg:text-[8.5rem]" />
        <motion.div
          className="mt-10 flex flex-wrap items-center gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduce ? 0 : 0.6, delay: reduce ? 0 : 0.8 }}
        >
          <Magnetic>
            <a href={firm.whatsapp} target="_blank" rel="noopener noreferrer" className="link-arrow bg-green px-6 py-4 text-lg font-semibold text-paper">
              Book a call <span className="arrow" aria-hidden="true">→</span>
            </a>
          </Magnetic>
          <ArrowLink to="/services" className="font-semibold">See services</ArrowLink>
        </motion.div>
      </motion.div>

      <div className="relative md:col-span-5" style={{ perspective: 1000 }}>
        <motion.div
          className="relative overflow-hidden"
          style={reduce ? undefined : { rotateX: rx, rotateY: ry }}
          initial={{ clipPath: 'inset(100% 0% 0% 0%)' }}
          animate={{ clipPath: 'inset(0% 0% 0% 0%)' }}
          transition={{ duration: reduce ? 0 : 1.1, ease: [0.76, 0, 0.24, 1], delay: reduce ? 0 : 0.3 }}
        >
          <motion.div style={reduce ? undefined : { y: imgY, scale: imgScale }}>
            <Picture img={hero} widths={[640]} sizes="(min-width: 768px) 40vw, 100vw" eager className="aspect-[4/5] w-full object-cover" />
          </motion.div>
        </motion.div>
        <RotatingBadge text="Book a call · Chartered Accountants · " className="absolute -bottom-10 -left-6 h-32 w-32 rounded-full bg-lime text-ink md:-left-16 md:h-40 md:w-40">
          <a href={firm.whatsapp} target="_blank" rel="noopener noreferrer" aria-label="Book a call on WhatsApp" className="display text-4xl">
            →
          </a>
        </RotatingBadge>
      </div>
    </section>
  )
}

const strengths = ['Always on time', 'Hard working', 'Always reachable', 'Profitability', 'Confidential', 'Accurate']

function WhyUs() {
  const ref = useRef<HTMLElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const a = useTransform(scrollYProgress, [0, 1], ['5%', '-35%'])
  const b = useTransform(scrollYProgress, [0, 1], ['-35%', '5%'])
  const row = (items: string[], x: typeof a, outline: boolean) => (
    <motion.p className="display flex w-max gap-[0.4em] whitespace-nowrap text-[17vw] leading-[1] md:text-[10vw]" style={reduce ? undefined : { x }} aria-hidden="true">
      {[...items, ...items].map((t, i) => (
        <span key={i} className={outline && i % 2 === 0 ? 'text-transparent [-webkit-text-stroke:1.5px_var(--color-green)]' : i % 2 ? 'italic text-green' : ''}>
          {t}
          <span className="text-lime"> /</span>
        </span>
      ))}
    </motion.p>
  )
  return (
    <section ref={ref} aria-labelledby="why-us" className="overflow-hidden py-24 md:py-36">
      <div className="wrap mb-10 flex items-end justify-between">
        <h2 id="why-us" className="eyebrow text-green">Why work with us</h2>
        <ul className="sr-only">{strengths.map((s) => <li key={s}>{s}</li>)}</ul>
      </div>
      {row(strengths.slice(0, 3), a, true)}
      {row(strengths.slice(3), b, false)}
    </section>
  )
}

function Calculator() {
  return (
    <section aria-labelledby="break-even" className="bg-green-ink text-paper">
      <div className="wrap py-20 md:py-28">
        <p className="eyebrow text-lime">Try it</p>
        <SplitText id="break-even" text="Find your *break-even* point." className="display mt-4 text-5xl md:text-8xl [&_.text-green]:text-lime" />
        <div className="mt-14">
          <BreakEven />
        </div>
      </div>
    </section>
  )
}

function Founder() {
  return (
    <section aria-labelledby="founder" className="wrap grid gap-10 py-24 md:grid-cols-12 md:py-36">
      <ClipReveal className="aspect-[4/5] md:col-span-5">
        <Picture img={founder.image} widths={[480, 960]} sizes="(min-width: 768px) 40vw, 100vw" className="h-full w-full object-cover object-top" />
      </ClipReveal>
      <div className="self-center md:col-span-6 md:col-start-7">
        <p className="eyebrow text-green">Who you will work with</p>
        <SplitText id="founder" text="Hritik *Dang,* CA" className="display mt-4 text-6xl md:text-8xl" />
        <ScrollHighlight
          text="A qualified Chartered Accountant, investment banker and entrepreneur. You deal with him directly."
          className="mt-8 font-serif text-3xl leading-tight md:text-4xl"
        />
        <p className="mt-8">
          <ArrowLink to="/about" className="font-semibold">About the firm</ArrowLink>
        </p>
      </div>
    </section>
  )
}

export default function Home() {
  return (
    <>
      <Hero />
      <div className="border-y border-green-deep bg-green py-5 text-paper">
        <Marquee items={services.map((s) => s.name)} className="display text-5xl italic md:text-7xl" />
      </div>
      <HorizontalServices />
      <WhyUs />
      <Calculator />
      <Founder />
      <ContactBand />
    </>
  )
}
