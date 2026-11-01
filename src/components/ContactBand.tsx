import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { firm } from '../content'
import { Magnetic, RotatingBadge } from './Motion'

export default function ContactBand({ heading = "Let's talk." }: { heading?: string }) {
  const ref = useRef<HTMLElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end end'] })
  const scale = useTransform(scrollYProgress, [0, 1], [0.7, 1])
  const x = useTransform(scrollYProgress, [0, 1], ['-12%', '0%'])

  return (
    <section ref={ref} className="overflow-hidden bg-green text-paper" aria-labelledby="contact-band">
      <div className="wrap py-20 md:py-28">
        <motion.h2
          id="contact-band"
          className="display origin-left whitespace-nowrap text-[22vw] leading-[0.85] md:text-[15vw]"
          style={reduce ? undefined : { scale, x }}
        >
          {heading}
        </motion.h2>
        <div className="mt-12 grid items-end gap-12 md:grid-cols-12">
          <dl className="grid gap-6 sm:grid-cols-2 md:col-span-7">
            <div>
              <dt className="eyebrow text-lime">Phone and WhatsApp</dt>
              <dd className="mt-2 text-2xl"><a href={firm.phoneHref} className="hover:text-lime">{firm.phoneDisplay}</a></dd>
            </div>
            <div className="min-w-0">
              <dt className="eyebrow text-lime">Email</dt>
              <dd className="mt-2 break-words text-2xl"><a href={`mailto:${firm.email}`} className="hover:text-lime">{firm.email}</a></dd>
            </div>
          </dl>
          <div className="flex items-center gap-8 md:col-span-5 md:justify-end">
            <Magnetic strength={0.4}>
              <a
                href={firm.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="link-arrow bg-lime px-7 py-5 text-lg font-semibold text-ink"
              >
                Book a call <span className="arrow" aria-hidden="true">→</span>
              </a>
            </Magnetic>
            <RotatingBadge text="Free estimate · Chartered Accountants · " className="hidden h-36 w-36 text-lime sm:block">
              <span className="display text-4xl italic text-paper">₹</span>
            </RotatingBadge>
          </div>
        </div>
      </div>
    </section>
  )
}
