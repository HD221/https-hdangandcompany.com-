import { useId } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { LAT_TOP, WORLD_H, WORLD_W, worldDots } from '../data/worldDots'
import { Reveal, SplitText, ease } from './Motion'

const px = (lng: number) => ((lng + 180) / 360) * WORLD_W
const py = (lat: number) => (LAT_TOP - lat) * (WORLD_W / 360)

const home = { x: px(73.18), y: py(22.31) } // Vadodara

// Broad regions the arcs reach towards. Unlabelled: the map shows reach, not specific clients.
const reach = [
  [-74, 40.7],
  [-118.2, 34],
  [-79.4, 43.7],
  [-123.1, 49.3],
  [-87.6, 41.9],
  [-46.6, -23.5],
  [-0.1, 51.5],
  [13.4, 52.5],
  [18.1, 59.3],
  [28, -26.2],
  [36.8, -1.3],
  [55.3, 25.2],
  [114.2, 22.3],
  [139.7, 35.7],
  [103.8, 1.35],
  [151.2, -33.9],
  [174.8, -36.8],
].map(([lng, lat]) => ({ x: px(lng), y: py(lat) }))

function arc(to: { x: number; y: number }) {
  const mx = (home.x + to.x) / 2
  const my = (home.y + to.y) / 2
  const dist = Math.hypot(to.x - home.x, to.y - home.y)
  return `M${home.x.toFixed(1)} ${home.y.toFixed(1)} Q${mx.toFixed(1)} ${(my - dist * 0.32).toFixed(1)} ${to.x.toFixed(1)} ${to.y.toFixed(1)}`
}

/** Dotted world map: the land spreads out from Vadodara, then arcs reach across the world. */
export function WorldMapGraphic() {
  const reduce = useReducedMotion()
  const clip = useId().replace(/:/g, '')
  return (
    <motion.svg
      viewBox={`0 0 ${WORLD_W} ${WORLD_H}`}
      role="img"
      aria-label="Dotted world map with a pin on our Vadodara headquarters and arcs reaching out across the world"
      className="block h-auto w-full"
      initial={reduce ? false : 'hidden'}
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
    >
      <defs>
        <clipPath id={`${clip}-reveal`}>
          <motion.circle
            cx={home.x}
            cy={home.y}
            variants={{ hidden: { r: 0 }, show: { r: WORLD_W, transition: { duration: reduce ? 0 : 2.2, ease } } }}
            r={reduce ? WORLD_W : undefined}
          />
        </clipPath>
      </defs>

      <path d={worldDots} stroke="rgba(247,245,241,0.12)" strokeWidth={2.4} strokeLinecap="round" />
      <path d={worldDots} stroke="rgba(247,245,241,0.5)" strokeWidth={2.4} strokeLinecap="round" clipPath={`url(#${clip}-reveal)`} />

      {reach.map((t, i) => {
        const d = arc(t)
        return (
          <g key={i}>
            <motion.path
              d={d}
              fill="none"
              stroke="#c3f18a"
              strokeWidth={1.2}
              strokeLinecap="round"
              strokeDasharray="1 0"
              variants={{
                hidden: { pathLength: 0, opacity: 0 },
                show: { pathLength: 1, opacity: 0.85, transition: { duration: reduce ? 0 : 1.2, ease, delay: reduce ? 0 : 1 + i * 0.09 } },
              }}
            />
            <motion.circle
              cx={t.x}
              cy={t.y}
              r={3}
              fill="#c3f18a"
              variants={{ hidden: { scale: 0 }, show: { scale: 1, transition: { delay: reduce ? 0 : 2 + i * 0.09, type: 'spring', stiffness: 260, damping: 14 } } }}
              style={{ transformOrigin: `${t.x}px ${t.y}px` }}
            />
            {!reduce && (
              <circle r={2.2} fill="#f7f5f1">
                <animateMotion dur={`${3.2 + (i % 3) * 0.6}s`} begin={`${2.4 + (i % 8) * 0.35}s`} repeatCount="indefinite" path={d} />
                <animate attributeName="opacity" values="0;1;1;0" dur={`${3.2 + (i % 3) * 0.6}s`} begin={`${2.4 + (i % 8) * 0.35}s`} repeatCount="indefinite" />
              </circle>
            )}
          </g>
        )
      })}

      {/* Vadodara pin */}
      {!reduce && (
        <motion.circle
          cx={home.x}
          cy={home.y}
          r={6}
          fill="none"
          stroke="#c3f18a"
          strokeWidth={1.5}
          animate={{ r: [6, 22], opacity: [0.9, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
        />
      )}
      <circle cx={home.x} cy={home.y} r={6} fill="#c3f18a" stroke="#1b4239" strokeWidth={2} />
      <g transform={`translate(${home.x + 10} ${home.y + 22})`}>
        <rect x={0} y={-13} width={68} height={19} fill="#f7f5f1" />
        <text x={8} y={1} fontSize={11} fontWeight={700} fill="#1b4239">
          Vadodara
        </text>
      </g>
    </motion.svg>
  )
}

const points = [
  { title: 'One team in Vadodara', text: 'A Chartered Accountant-led finance team, working from our office in Vadodara.' },
  { title: 'Your systems, your calendar', text: 'We work inside your accounting system, on a fixed monthly calendar.' },
  { title: 'Secure remote access', text: "Role-based logins and read-only bank feeds; we don't ask for banking passwords." },
]

export default function WorldReach() {
  return (
    <section aria-labelledby="world-reach" className="relative overflow-hidden bg-green-ink text-paper">
      <div className="wrap py-20 md:py-28">
        <div className="grid gap-8 md:grid-cols-12 md:items-end">
          <div className="md:col-span-8">
            <p className="eyebrow text-lime">Where we work</p>
            <SplitText id="world-reach" text="Headquartered in Vadodara, offering *cross-border & international client support.*" className="display mt-4 text-4xl md:text-[3.4rem] md:leading-[1.05] [&_.text-green]:text-lime" />
          </div>
          <p className="text-lg text-paper/85 md:col-span-4">
            Wherever your business is based, the work is done by the same team, in your systems and on your calendar.
          </p>
        </div>
        <div className="mt-12 md:mt-16">
          <WorldMapGraphic />
        </div>
        <ul className="mt-12 grid gap-6 border-t border-paper/15 pt-10 md:grid-cols-3">
          {points.map((p, i) => (
            <Reveal as="li" key={p.title} delay={i * 0.1}>
              <span className="display text-xl text-lime">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="display mt-2 text-2xl md:text-3xl">{p.title}</h3>
              <p className="mt-2 text-[0.95rem] text-paper/80">{p.text}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}
