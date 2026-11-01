import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { useRef, type ReactNode } from 'react'

const ease = [0.22, 1, 0.36, 1] as const

/** Fades and lifts content into place the first time it scrolls into view. */
export function Reveal({ children, delay = 0, className }: { children: ReactNode; delay?: number; className?: string }) {
  const reduce = useReducedMotion()
  // Same initial markup on server and client; with reduced motion we show it at once.
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 18 }}
      {...(reduce ? { animate: { opacity: 1, y: 0 } } : { whileInView: { opacity: 1, y: 0 } })}
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      transition={reduce ? { duration: 0 } : { duration: 0.55, ease, delay }}
    >
      {children}
    </motion.div>
  )
}

type Img = { src: string; alt: string; w: number; h: number }

/** Responsive picture: expects /images/name-{width}.{avif,jpg} files. */
export function Picture({
  img,
  widths,
  sizes,
  className,
  eager,
}: {
  img: Img
  widths: number[]
  sizes: string
  className?: string
  eager?: boolean
}) {
  // Prefix with the build's base URL so images also load from a sub-folder preview.
  const src = import.meta.env.BASE_URL.replace(/\/$/, '') + img.src
  const set = (ext: string) => widths.map((w) => `${src}-${w}.${ext} ${w}w`).join(', ')
  return (
    <picture>
      <source type="image/avif" srcSet={set('avif')} sizes={sizes} />
      <img
        src={`${src}-${widths[widths.length - 1]}.jpg`}
        srcSet={set('jpg')}
        sizes={sizes}
        alt={img.alt}
        width={img.w}
        height={img.h}
        loading={eager ? 'eager' : 'lazy'}
        {...(eager ? { fetchpriority: 'high' } : {})}
        decoding="async"
        className={className}
      />
    </picture>
  )
}

/** Image that drifts slightly slower than the page as you scroll. */
export function Parallax({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['-6%', '6%'])
  return (
    <div ref={ref} className={`overflow-hidden ${className ?? ''}`}>
      <motion.div style={reduce ? undefined : { y, scale: 1.12 }} className="h-full w-full">
        {children}
      </motion.div>
    </div>
  )
}
