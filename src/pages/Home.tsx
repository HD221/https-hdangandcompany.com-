import { useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { firm, founder, services } from '../content'
import { ArrowLink } from '../components/Arrow'
import { Parallax, Picture, Reveal } from '../components/Motion'
import ContactBand from '../components/ContactBand'

const hero = { src: '/images/desk', alt: 'Hands working through figures with a calculator and pen at a desk', w: 640, h: 426 }

function Hero() {
  return (
    <section className="wrap grid gap-10 pb-20 pt-14 md:grid-cols-12 md:pb-32 md:pt-24">
      <div className="md:col-span-9">
        <p className="mb-8 text-[0.8rem] font-medium uppercase tracking-[0.25em] text-green">Vadodara, Gujarat</p>
        <h1 className="display text-[2.9rem] [text-wrap:wrap] sm:text-6xl lg:text-[6.4rem]">
          Chartered accountants for startups and growing businesses.
        </h1>
      </div>
      <div className="md:col-span-3 md:col-start-10 md:mt-56">
        <Picture img={hero} widths={[640]} sizes="(min-width: 768px) 30vw, 100vw" eager className="aspect-[4/5] w-full object-cover" />
        <p className="mt-6 max-w-[22rem] text-muted">
          Startup advice, a part time CFO, bookkeeping and automation from one practice.
        </p>
        <p className="mt-4">
          <ArrowLink to={firm.whatsapp} className="font-medium text-green">Book a call</ArrowLink>
        </p>
      </div>
    </section>
  )
}

function WhatWeDo() {
  const [active, setActive] = useState(0)
  const reduce = useReducedMotion()
  const withImage = services.filter((s) => s.image)
  const current = services[active].image ?? withImage[0].image!

  return (
    <section aria-labelledby="what-we-do" className="border-t border-rule">
      <div className="wrap grid gap-12 py-20 md:grid-cols-12 md:py-28">
        <div className="md:col-span-3">
          <h2 id="what-we-do" className="text-[0.8rem] font-medium uppercase tracking-[0.25em] text-green">
            What we do
          </h2>
          <div className="relative mt-10 hidden aspect-[4/5] overflow-hidden md:block" aria-hidden="true">
            <AnimatePresence initial={false} mode="popLayout">
              <motion.div
                key={current.src}
                initial={reduce ? false : { opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={reduce ? undefined : { opacity: 0 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0"
              >
                <Picture img={{ ...current, alt: '' }} widths={[640]} sizes="25vw" className="h-full w-full object-cover" />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
        <ol className="md:col-span-9">
          {services.map((s, i) => (
            <li key={s.slug} className="border-b border-rule first:border-t">
              <Link
                to={`/services/${s.slug}`}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                className="group grid gap-3 py-8 md:grid-cols-[4rem_1fr_1.1fr] md:gap-8 md:py-10"
              >
                <span className="font-serif text-2xl text-green">{s.number}</span>
                <span className="display text-3xl transition-transform duration-500 ease-out group-hover:translate-x-2 md:text-[2.6rem]">
                  {s.name}
                </span>
                <span className="text-muted">
                  {s.short}
                  <span className="link-arrow mt-3 flex font-medium text-ink">
                    Read more <span className="arrow" aria-hidden="true">→</span>
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

function Founder() {
  return (
    <section aria-labelledby="founder" className="wrap grid gap-10 pb-24 md:grid-cols-12 md:pb-36">
      <Parallax className="aspect-[4/5] md:col-span-5">
        <Picture img={founder.image} widths={[480, 960]} sizes="(min-width: 768px) 40vw, 100vw" className="h-full w-full object-cover object-top" />
      </Parallax>
      <Reveal className="self-end md:col-span-6 md:col-start-7">
        <p className="font-serif text-3xl italic text-green md:text-4xl">Who you will work with</p>
        <h2 id="founder" className="display mt-6 text-4xl md:text-6xl">
          The firm is run by Hritik Dang, a qualified Chartered Accountant and investment banker.
        </h2>
        <p className="mt-8 max-w-[34rem] text-muted">
          H Dang and Company is a sole proprietorship. You deal with the person responsible for your accounts, and you can reach him directly.
        </p>
        <p className="mt-6">
          <ArrowLink to="/about" className="font-medium">About the firm</ArrowLink>
        </p>
      </Reveal>
    </section>
  )
}

export default function Home() {
  return (
    <>
      <Hero />
      <WhatWeDo />
      <Founder />
      <ContactBand />
    </>
  )
}
