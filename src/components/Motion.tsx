import {
  motion,
  useAnimationFrame,
  useInView,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  type MotionValue,
} from 'framer-motion'
import { createElement, useEffect, useRef, useState, type ReactNode } from 'react'

export const ease = [0.22, 1, 0.36, 1] as const

/** Fades and lifts content into place the first time it scrolls into view. Use `as="li"` inside lists. */
export function Reveal({ children, delay = 0, className, as = 'div' }: { children: ReactNode; delay?: number; className?: string; as?: 'div' | 'li' }) {
  const reduce = useReducedMotion()
  const Tag = as === 'li' ? motion.li : motion.div
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y: 28 }}
      {...(reduce ? { animate: { opacity: 1, y: 0 } } : { whileInView: { opacity: 1, y: 0 } })}
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      transition={reduce ? { duration: 0 } : { duration: 0.6, ease, delay }}
    >
      {children}
    </Tag>
  )
}

/**
 * Heading whose words rise out of a mask one after another.
 * `onMount` plays immediately (hero); otherwise it plays when scrolled into view.
 * Words wrapped in *asterisks* are set in green italic.
 */
export function SplitText({
  text,
  as = 'h2',
  className,
  onMount,
  delay = 0,
  id,
}: {
  text: string
  as?: 'h1' | 'h2' | 'h3' | 'p'
  className?: string
  onMount?: boolean
  delay?: number
  id?: string
}) {
  const reduce = useReducedMotion()
  const words = text.split(' ')
  const plain = text.replace(/\*/g, '')
  const variants = {
    hidden: { y: '110%' },
    show: (i: number) => ({ y: '0%', transition: { duration: reduce ? 0 : 0.8, ease, delay: reduce ? 0 : delay + i * 0.06 } }),
  }
  const trigger = reduce || onMount ? { animate: 'show' } : { whileInView: 'show', viewport: { once: true, margin: '0px 0px -8% 0px' } }

  return createElement(
    as,
    { className, 'aria-label': plain, id },
    words.map((w, i) => {
      const accent = w.startsWith('*')
      const word = w.replace(/\*/g, '')
      return (
        <span key={i} aria-hidden="true" className="inline-block overflow-hidden pb-[0.12em] -mb-[0.12em] align-top">
          <motion.span
            className={`inline-block ${accent ? 'italic text-green' : ''}`}
            custom={i}
            variants={variants}
            initial="hidden"
            {...trigger}
          >
            {word}
            {i < words.length - 1 ? ' ' : ''}
          </motion.span>
        </span>
      )
    }),
  )
}

function HighlightWord({ word, progress, range }: { word: string; progress: MotionValue<number>; range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.5, 1])
  return <motion.span style={{ opacity }}>{word} </motion.span>
}

/** Paragraph whose words light up one by one as it scrolls through the screen. */
export function ScrollHighlight({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'end 0.45'] })
  const words = text.split(' ')
  if (reduce) return <p className={className}>{text}</p>
  return (
    <p ref={ref} className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {words.map((w, i) => (
          <HighlightWord key={i} word={w} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]} />
        ))}
      </span>
    </p>
  )
}

/** Pulls its child towards the pointer while hovered. */
export function Magnetic({ children, strength = 0.35, className }: { children: ReactNode; strength?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const x = useSpring(0, { stiffness: 220, damping: 16, mass: 0.4 })
  const y = useSpring(0, { stiffness: 220, damping: 16, mass: 0.4 })
  if (reduce) return <div className={`inline-block ${className ?? ''}`}>{children}</div>
  return (
    <motion.div
      ref={ref}
      className={`inline-block ${className ?? ''}`}
      style={{ x, y }}
      onPointerMove={(e) => {
        if (e.pointerType !== 'mouse') return
        const r = ref.current!.getBoundingClientRect()
        x.set((e.clientX - (r.left + r.width / 2)) * strength)
        y.set((e.clientY - (r.top + r.height / 2)) * strength)
      }}
      onPointerLeave={() => {
        x.set(0)
        y.set(0)
      }}
    >
      {children}
    </motion.div>
  )
}

/** Thin bar across the top of the screen showing how far down the page you are. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30 })
  return <motion.div aria-hidden="true" className="fixed inset-x-0 top-0 z-50 h-[3px] origin-left bg-lime" style={{ scaleX }} />
}

const wrapRange = (min: number, max: number, v: number) => {
  const r = max - min
  return ((((v - min) % r) + r) % r) + min
}

/** Endless ticker that speeds up and reverses with your scrolling. */
export function Marquee({ items, className }: { items: string[]; className?: string }) {
  const reduce = useReducedMotion()
  const base = useMotionValue(0)
  const { scrollY } = useScroll()
  const velocity = useSpring(useVelocity(scrollY), { damping: 50, stiffness: 400 })
  const factor = useTransform(velocity, [-1500, 0, 1500], [-5, 0, 5], { clamp: false })
  const dir = useRef(1)
  const x = useTransform(base, (v) => `${wrapRange(-50, 0, v)}%`)

  useAnimationFrame((_, delta) => {
    if (reduce) return
    const f = factor.get()
    if (f < 0) dir.current = -1
    else if (f > 0) dir.current = 1
    base.set(base.get() - dir.current * 1.6 * (delta / 1000) * (1 + Math.abs(f)))
  })

  const row = items.map((t, i) => (
    <span key={i} className="flex shrink-0 items-center gap-[0.6em] pr-[0.6em]">
      <span>{t}</span>
      <span className="font-sans text-[0.45em] text-lime" aria-hidden="true">/</span>
    </span>
  ))

  return (
    <div className={`overflow-hidden whitespace-nowrap ${className ?? ''}`}>
      <span className="sr-only">{items.join(', ')}</span>
      <motion.div className="flex w-max" style={{ x }} aria-hidden="true">
        <div className="flex">{row}</div>
        <div className="flex">{row}</div>
      </motion.div>
    </div>
  )
}

/** Image that is unveiled from a narrow window to full size as you scroll. */
export function ClipReveal({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'center center'] })
  const clip = useTransform(scrollYProgress, [0, 1], ['inset(18% 22% 18% 22%)', 'inset(0% 0% 0% 0%)'])
  const scale = useTransform(scrollYProgress, [0, 1], [1.3, 1])
  return (
    <div ref={ref} className={`overflow-hidden ${className ?? ''}`}>
      <motion.div className="h-full w-full" style={reduce ? undefined : { clipPath: clip }}>
        <motion.div className="h-full w-full" style={reduce ? undefined : { scale }}>
          {children}
        </motion.div>
      </motion.div>
    </div>
  )
}

/** Image that drifts slightly slower than the page as you scroll. */
export function Parallax({ children, className, amount = 8 }: { children: ReactNode; className?: string; amount?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [`-${amount}%`, `${amount}%`])
  return (
    <div ref={ref} className={`overflow-hidden ${className ?? ''}`}>
      <motion.div style={reduce ? undefined : { y, scale: 1 + amount / 50 }} className="h-full w-full">
        {children}
      </motion.div>
    </div>
  )
}

/** Circular text badge that turns as the page scrolls. */
export function RotatingBadge({ text, className, children }: { text: string; className?: string; children?: ReactNode }) {
  const reduce = useReducedMotion()
  const { scrollY } = useScroll()
  const rotate = useTransform(scrollY, (v) => v * 0.15)
  return (
    <div className={`relative ${className ?? ''}`}>
      <motion.svg viewBox="0 0 200 200" className="h-full w-full" style={reduce ? undefined : { rotate }} aria-hidden="true">
        <defs>
          <path id="badge-circle" d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0" />
        </defs>
        <text fill="currentColor" style={{ fontSize: 15.5, letterSpacing: '0.32em', textTransform: 'uppercase', fontWeight: 600 }}>
          <textPath href="#badge-circle">{text}</textPath>
        </text>
      </motion.svg>
      <div className="absolute inset-0 grid place-items-center">{children}</div>
    </div>
  )
}

/** Number that counts up when it scrolls into view. */
export function CountUp({ to, className }: { to: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })
  const reduce = useReducedMotion()
  const [n, setN] = useState(reduce ? to : 0)
  useEffect(() => {
    if (!inView || reduce) return setN(to)
    let raf = 0
    const t0 = performance.now()
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / 900)
      setN(Math.round(to * (1 - Math.pow(1 - p, 3))))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, reduce, to])
  return (
    <span ref={ref} className={className}>
      {String(n).padStart(2, '0')}
    </span>
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
        draggable={false}
        className={className}
      />
    </picture>
  )
}
