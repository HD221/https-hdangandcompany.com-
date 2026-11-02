import { motion, useReducedMotion, type Variants } from 'framer-motion'

const ease = [0.22, 1, 0.36, 1] as const
const draw = (delay: number, duration = 1.4): Variants => ({
  hidden: { pathLength: 0, opacity: 0 },
  show: { pathLength: 1, opacity: 1, transition: { pathLength: { duration, ease, delay }, opacity: { duration: 0.01, delay } } },
})
const fade = (delay: number): Variants => ({
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease, delay } },
})

/** Illustrated (not to scale) location sketch: Gotri - Vasna Road, Nilambar Circle and the office. */
export default function LocationGraphic() {
  const reduce = useReducedMotion()
  const road = 'M-20,250 C150,240 260,200 360,200 S560,170 820,120'
  const cross = 'M360,40 C370,120 360,160 360,200 S350,320 340,420'
  return (
    <motion.svg
      viewBox="0 0 800 420"
      role="img"
      aria-label="Sketch of the office location: Empire Edge, Unit 509, on Gotri - Vasna Road near Nilambar Circle. Not to scale."
      className="block h-auto w-full"
      {...(reduce ? { initial: false, animate: 'show' } : { initial: 'hidden', whileInView: 'show', viewport: { once: true, amount: 0.35 } })}
    >
      {/* faint city grid */}
      {Array.from({ length: 9 }, (_, i) => (
        <line key={'v' + i} x1={i * 100} x2={i * 100} y1={0} y2={420} stroke="rgba(247,245,241,0.07)" />
      ))}
      {Array.from({ length: 5 }, (_, i) => (
        <line key={'h' + i} x1={0} x2={800} y1={i * 100} y2={i * 100} stroke="rgba(247,245,241,0.07)" />
      ))}

      {/* roads */}
      <motion.path d={cross} fill="none" stroke="rgba(247,245,241,0.25)" strokeWidth={22} strokeLinecap="round" variants={draw(0.1, 1.1)} />
      <motion.path d={road} fill="none" stroke="rgba(247,245,241,0.35)" strokeWidth={30} strokeLinecap="round" variants={draw(0, 1.4)} />
      <motion.path d={road} fill="none" stroke="#f7f5f1" strokeWidth={2} strokeDasharray="12 12" variants={draw(0.2, 1.4)} />

      {/* Nilambar Circle */}
      <motion.circle cx={360} cy={200} r={42} fill="#2e6b5c" stroke="#f7f5f1" strokeWidth={3} variants={fade(0.8)} />
      <motion.circle cx={360} cy={200} r={16} fill="none" stroke="#c3f18a" strokeWidth={2} variants={fade(1)} />
      <motion.text x={360} y={272} textAnchor="middle" fill="#f7f5f1" fontSize={17} fontWeight={600} variants={fade(1.1)}>
        Nilambar Circle
      </motion.text>

      <motion.text x={640} y={128} fill="#f7f5f1" fontSize={15} opacity={0.85} transform="rotate(-11 640 128)" variants={fade(1.2)}>
        Gotri - Vasna Road
      </motion.text>

      {/* office pin */}
      <motion.g
        variants={{ hidden: { y: -60, opacity: 0 }, show: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 220, damping: 13, delay: 1.4 } } }}
      >
        {!reduce && (
          <motion.circle
            cx={520}
            cy={176}
            r={14}
            fill="none"
            stroke="#c3f18a"
            strokeWidth={2}
            animate={{ r: [14, 40], opacity: [0.8, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeOut', delay: 2 }}
          />
        )}
        <path d="M520,176 C500,150 496,138 496,126 a24,24 0 1,1 48,0 c0,12 -4,24 -24,50 Z" fill="#c3f18a" stroke="#1b4239" strokeWidth={2} />
        <circle cx={520} cy={126} r={8} fill="#1b4239" />
      </motion.g>
      <motion.g variants={fade(1.8)}>
        <rect x={548} y={196} width={196} height={58} fill="#f7f5f1" />
        <text x={562} y={220} fill="#212121" fontSize={16} fontWeight={700}>
          Empire Edge
        </text>
        <text x={562} y={242} fill="#212121" fontSize={14}>
          Unit 509
        </text>
      </motion.g>

      <text x={790} y={408} textAnchor="end" fill="#f7f5f1" fontSize={12} opacity={0.6}>
        Illustration, not to scale
      </text>
    </motion.svg>
  )
}
