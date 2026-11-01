import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from 'framer-motion'
import { services, type Service } from '../content'
import { SplitText } from '../components/Motion'
import ServiceVisual from '../components/ServiceVisuals'
import ContactBand from '../components/ContactBand'

/** Each card pins near the top and shrinks back as the next one slides over it. */
function StackCard({ s, i, progress }: { s: Service; i: number; progress: MotionValue<number> }) {
  const reduce = useReducedMotion()
  const n = services.length
  const scale = useTransform(progress, [i / n, 1], [1, 1 - (n - i) * 0.035])
  const dark = i % 2 === 0
  return (
    <div className="sticky h-auto md:h-[82vh]" style={{ top: `calc(84px + ${i * 22}px)` }}>
      <motion.article
        style={reduce ? undefined : { scale }}
        className={`grid h-full origin-top gap-8 p-6 md:grid-cols-2 md:p-14 ${dark ? 'bg-green text-paper' : 'bg-green-ink text-paper'}`}
      >
        <div className="flex flex-col justify-between gap-8">
          <div className="flex items-baseline gap-5">
            <span className="display text-6xl text-lime md:text-8xl">{s.number}</span>
          </div>
          <div>
            <h2 className="display text-5xl md:text-7xl">{s.name}</h2>
            <p className="mt-4 max-w-[28rem] text-lg text-paper">{s.tagline}</p>
            <Link to={`/services/${s.slug}`} className="link-arrow mt-8 bg-lime px-5 py-3 font-semibold text-ink transition-transform hover:-translate-y-0.5">
              <span>Explore {s.name.toLowerCase()}</span>
              <span className="arrow" aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
        <ServiceVisual slug={s.slug} tone="dark" className="self-center" />
      </motion.article>
    </div>
  )
}

export default function Services() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  return (
    <>
      <section className="wrap pb-16 pt-12 md:pb-24 md:pt-20">
        <p className="eyebrow text-green">Services</p>
        <SplitText as="h1" onMount text="Five services, *one desk.*" className="display mt-6 text-[3.6rem] sm:text-7xl lg:text-[8rem]" />
      </section>
      <div ref={ref} className="wrap space-y-6 pb-24 md:space-y-[18vh] md:pb-40">
        {services.map((s, i) => (
          <StackCard key={s.slug} s={s} i={i} progress={scrollYProgress} />
        ))}
      </div>
      <ContactBand heading="Ask us." />
    </>
  )
}
