import { motion, useReducedMotion, type Variants } from 'framer-motion'
import type { ReactNode } from 'react'

type Tone = 'dark' | 'light'

const palette = (tone: Tone) =>
  tone === 'dark'
    ? { line: '#f7f5f1', faint: 'rgba(247,245,241,0.22)', text: '#f7f5f1', accent: '#c3f18a', accentInk: '#212121', stroke: '#c3f18a' }
    : { line: '#2e6b5c', faint: 'rgba(33,33,33,0.14)', text: '#212121', accent: '#c3f18a', accentInk: '#212121', stroke: '#2e6b5c' }

const ease = [0.22, 1, 0.36, 1] as const

/** Shared wrapper: plays its children's variants once the drawing scrolls into view. */
function Frame({ children, label, className }: { children: ReactNode; label: string; className?: string }) {
  const reduce = useReducedMotion()
  return (
    <motion.svg
      viewBox="0 0 400 300"
      role="img"
      aria-label={label}
      className={className ?? 'block h-auto w-full'}
      {...(reduce ? { initial: false, animate: 'show' } : { initial: 'hidden', whileInView: 'show', viewport: { once: true, amount: 0.4 } })}
    >
      {children}
    </motion.svg>
  )
}

const draw = (delay = 0, duration = 1.4): Variants => ({
  hidden: { pathLength: 0, opacity: 0 },
  show: { pathLength: 1, opacity: 1, transition: { pathLength: { duration, ease, delay }, opacity: { duration: 0.01, delay } } },
})
const pop = (delay = 0): Variants => ({
  hidden: { scale: 0, opacity: 0 },
  show: { scale: 1, opacity: 1, transition: { type: 'spring', stiffness: 260, damping: 16, delay } },
})
const rise = (delay = 0): Variants => ({
  hidden: { y: 14, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { duration: 0.5, ease, delay } },
})

/* Fundraising readiness: from clean historicals to diligence */
function Roadmap({ tone }: { tone: Tone }) {
  const c = palette(tone)
  const stops = [
    { x: 34, y: 252, label: 'Historicals', dy: -18 },
    { x: 124, y: 206, label: 'Drivers', dy: 30 },
    { x: 206, y: 160, label: 'Model', dy: -18 },
    { x: 288, y: 104, label: 'Plan and deck', dy: 30 },
    { x: 366, y: 46, label: 'Diligence', dy: 30 },
  ]
  const d = 'M34,252 C80,252 84,206 124,206 S170,160 206,160 S252,104 288,104 S336,46 366,46'
  return (
    <Frame label="A rising road with five stops: clean historicals, agree drivers, build the model, plan and deck, diligence">
      {[60, 120, 180, 240].map((y) => (
        <line key={y} x1={10} x2={390} y1={y} y2={y} stroke={c.faint} />
      ))}
      <motion.path d={d} fill="none" stroke={c.faint} strokeWidth={14} strokeLinecap="round" variants={draw(0, 1.6)} />
      <motion.path d={d} fill="none" stroke={c.line} strokeWidth={2} strokeDasharray="6 7" variants={draw(0.1, 1.6)} />
      {stops.map((s, i) => (
        <g key={s.label}>
          <motion.circle cx={s.x} cy={s.y} r={11} fill={c.accent} stroke={c.stroke} strokeWidth={2} variants={pop(0.35 + i * 0.25)} style={{ transformOrigin: `${s.x}px ${s.y}px` }} />
          <motion.text x={s.x} y={s.y + s.dy} textAnchor="middle" fill={c.text} fontSize={14} fontWeight={600} variants={rise(0.45 + i * 0.25)}>
            {s.label}
          </motion.text>
        </g>
      ))}
    </Frame>
  )
}

/* Virtual CFO: a 13-week rolling cash forecast */
function CashFlow({ tone }: { tone: Tone }) {
  const c = palette(tone)
  const vals = [42, 55, 47, 63, 71, 58, 76, 84, 69, 91, 98, 88, 94]
  const base = 250
  const bw = 19
  const gap = 9
  const x0 = 20
  const h = (v: number) => v * 1.9
  const pts = vals.map((v, i) => `${x0 + i * (bw + gap) + bw / 2},${base - h(v) - 14}`)
  return (
    <Frame label="Illustration of a 13-week rolling cash forecast">
      <line x1={14} x2={386} y1={base} y2={base} stroke={c.line} strokeOpacity={0.5} />
      {vals.map((v, i) => {
        const x = x0 + i * (bw + gap)
        return (
          <g key={i}>
            <motion.rect
              x={x}
              y={base - h(v)}
              width={bw}
              height={h(v)}
              fill={i === vals.length - 2 ? c.accent : c.faint}
              stroke={i === vals.length - 2 ? c.stroke : 'none'}
              variants={{ hidden: { scaleY: 0 }, show: { scaleY: 1, transition: { duration: 0.7, ease, delay: 0.05 * i } } }}
              style={{ transformOrigin: `${x + bw / 2}px ${base}px` }}
            />
            <text x={x + bw / 2} y={base + 20} textAnchor="middle" fill={c.text} fontSize={10} opacity={0.7}>
              W{i + 1}
            </text>
          </g>
        )
      })}
      <motion.polyline points={pts.join(' ')} fill="none" stroke={c.line} strokeWidth={2.5} strokeLinejoin="round" variants={draw(0.7, 1.3)} />
      <motion.text x={14} y={30} fill={c.text} fontSize={13} fontWeight={600} variants={rise(1.2)}>
        13-week cash forecast
      </motion.text>
    </Frame>
  )
}

/* 03 Bookkeeping: a T-account where debits and credits balance */
function Ledger({ tone }: { tone: Tone }) {
  const c = palette(tone)
  const dr = [120, 150, 90]
  const cr = [140, 100, 120]
  return (
    <Frame label="A T-account for cash where total debits equal total credits">
      <motion.text x={200} y={34} textAnchor="middle" fill={c.text} fontSize={18} fontWeight={700} variants={rise(0)}>
        Cash A/c
      </motion.text>
      <motion.path d="M40,50 L360,50 M200,50 L200,250" stroke={c.line} strokeWidth={2.5} fill="none" variants={draw(0.1, 0.9)} />
      <motion.text x={52} y={74} fill={c.text} fontSize={13} opacity={0.7} variants={rise(0.4)}>Dr</motion.text>
      <motion.text x={348} y={74} textAnchor="end" fill={c.text} fontSize={13} opacity={0.7} variants={rise(0.4)}>Cr</motion.text>
      {dr.map((w, i) => (
        <motion.rect key={'d' + i} x={188 - w} y={96 + i * 34} width={w * 0.9} height={14} fill={c.faint} variants={{ hidden: { scaleX: 0 }, show: { scaleX: 1, transition: { duration: 0.6, ease, delay: 0.6 + i * 0.25 } } }} style={{ transformOrigin: `188px ${103 + i * 34}px` }} />
      ))}
      {cr.map((w, i) => (
        <motion.rect key={'c' + i} x={348 - w * 0.9} y={96 + i * 34} width={w * 0.9} height={14} fill={c.faint} variants={{ hidden: { scaleX: 0 }, show: { scaleX: 1, transition: { duration: 0.6, ease, delay: 0.72 + i * 0.25 } } }} style={{ transformOrigin: `348px ${103 + i * 34}px` }} />
      ))}
      <motion.path d="M90,200 L188,200 M90,236 L188,236 M90,240 L188,240 M250,200 L348,200 M250,236 L348,236 M250,240 L348,240" stroke={c.line} strokeWidth={1.2} variants={draw(1.5, 0.6)} />
      <motion.rect x={90} y={210} width={98} height={16} fill={c.accent} stroke={c.stroke} variants={rise(1.7)} />
      <motion.rect x={250} y={210} width={98} height={16} fill={c.accent} stroke={c.stroke} variants={rise(1.8)} />
      <motion.g variants={pop(2.1)} style={{ transformOrigin: '200px 272px' }}>
        <rect x={150} y={258} width={100} height={28} fill={c.accent} stroke={c.stroke} strokeWidth={1.5} />
        <text x={200} y={277} textAnchor="middle" fill={c.accentInk} fontSize={14} fontWeight={700}>
          Dr = Cr
        </text>
      </motion.g>
    </Frame>
  )
}

/* FP&A: budget against actual, month by month */
function BudgetActual({ tone }: { tone: Tone }) {
  const c = palette(tone)
  const budget = [60, 66, 70, 74, 80, 86]
  const actual = [56, 70, 64, 79, 84, 92]
  const base = 240
  const h = (v: number) => v * 2
  return (
    <Frame label="Illustration of budget against actual for six months">
      <line x1={14} x2={386} y1={base} y2={base} stroke={c.line} strokeOpacity={0.5} />
      {budget.map((b, i) => {
        const x = 34 + i * 58
        return (
          <g key={i}>
            <motion.rect x={x} y={base - h(b)} width={20} height={h(b)} fill={c.faint} variants={{ hidden: { scaleY: 0 }, show: { scaleY: 1, transition: { duration: 0.6, ease, delay: 0.08 * i } } }} style={{ transformOrigin: `${x + 10}px ${base}px` }} />
            <motion.rect x={x + 22} y={base - h(actual[i])} width={20} height={h(actual[i])} fill={c.accent} stroke={c.stroke} variants={{ hidden: { scaleY: 0 }, show: { scaleY: 1, transition: { duration: 0.6, ease, delay: 0.3 + 0.08 * i } } }} style={{ transformOrigin: `${x + 32}px ${base}px` }} />
          </g>
        )
      })}
      <motion.g variants={rise(1)}>
        <rect x={14} y={20} width={14} height={10} fill={c.faint} />
        <text x={34} y={29} fill={c.text} fontSize={12}>Budget</text>
        <rect x={96} y={20} width={14} height={10} fill={c.accent} stroke={c.stroke} />
        <text x={116} y={29} fill={c.text} fontSize={12}>Actual</text>
      </motion.g>
      <motion.text x={386} y={29} textAnchor="end" fill={c.text} fontSize={13} fontWeight={600} variants={rise(1.1)}>
        Budget vs actual
      </motion.text>
    </Frame>
  )
}

/* Cap table: ownership slices in a ring */
function Ownership({ tone }: { tone: Tone }) {
  const c = palette(tone)
  const slices = [
    { v: 0.52, label: 'Founders', fill: c.accent },
    { v: 0.2, label: 'Investors', fill: c.line },
    { v: 0.1, label: 'ESOP pool', fill: c.faint },
    { v: 0.18, label: 'SAFEs and notes', fill: tone === 'dark' ? 'rgba(247,245,241,0.45)' : 'rgba(46,107,92,0.45)' },
  ]
  const R = 92
  const C = 2 * Math.PI * R
  let acc = 0
  return (
    <Frame label="Illustration of ownership split between founders, investors, an ESOP pool and SAFEs">
      <g transform="rotate(-90 130 150)">
        {slices.map((s, i) => {
          const off = acc
          acc += s.v
          return (
            <motion.circle
              key={s.label}
              cx={130}
              cy={150}
              r={R}
              fill="none"
              stroke={s.fill}
              strokeWidth={36}
              strokeDasharray={`${s.v * C - 3} ${C}`}
              strokeDashoffset={-off * C}
              variants={{ hidden: { opacity: 0, pathLength: 0 }, show: { opacity: 1, pathLength: 1, transition: { duration: 0.8, ease, delay: 0.2 + i * 0.25 } } }}
            />
          )
        })}
      </g>
      {slices.map((s, i) => (
        <motion.g key={s.label} variants={rise(0.6 + i * 0.15)}>
          <rect x={262} y={96 + i * 30} width={16} height={16} fill={s.fill} stroke={tone === 'dark' ? 'none' : c.line} strokeWidth={0.5} />
          <text x={286} y={109 + i * 30} fill={c.text} fontSize={13}>{s.label}</text>
        </motion.g>
      ))}
    </Frame>
  )
}

/* Feasibility: cumulative cash dipping, then crossing into payback */
function Payback({ tone }: { tone: Tone }) {
  const c = palette(tone)
  const zero = 150
  const d = 'M20,150 C60,150 70,250 120,250 S220,200 260,150 S340,70 384,50'
  return (
    <Frame label="Illustration of a project's cumulative cash flow falling below zero and then crossing back into payback">
      <line x1={14} x2={386} y1={zero} y2={zero} stroke={c.line} strokeOpacity={0.5} strokeDasharray="4 5" />
      <motion.text x={20} y={zero - 10} fill={c.text} fontSize={12} opacity={0.7} variants={rise(0.2)}>Break-even</motion.text>
      <motion.path d={d} fill="none" stroke={c.line} strokeWidth={3} variants={draw(0.2, 1.6)} />
      <motion.circle cx={260} cy={150} r={9} fill={c.accent} stroke={c.stroke} strokeWidth={2} variants={pop(1.5)} style={{ transformOrigin: '260px 150px' }} />
      <motion.text x={268} y={180} fill={c.text} fontSize={14} fontWeight={600} variants={rise(1.7)}>Payback</motion.text>
      <motion.text x={120} y={274} textAnchor="middle" fill={c.text} fontSize={12} opacity={0.75} variants={rise(1)}>Capex</motion.text>
      <motion.text x={384} y={36} textAnchor="end" fill={c.text} fontSize={13} fontWeight={600} variants={rise(1.9)}>Cumulative cash</motion.text>
    </Frame>
  )
}

const visuals: Record<string, (p: { tone: Tone }) => JSX.Element> = {
  'virtual-cfo': CashFlow,
  fpa: BudgetActual,
  'virtual-bookkeeping': Ledger,
  'fundraising-readiness': Roadmap,
  'cap-table-management': Ownership,
  'feasibility-studies': Payback,
}

export default function ServiceVisual({ slug, tone = 'light', className }: { slug: string; tone?: Tone; className?: string }) {
  const V = visuals[slug]
  if (!V) return null
  return (
    <div className={className}>
      <V tone={tone} />
    </div>
  )
}
