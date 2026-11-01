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

/* 01 Startup advisory: a road from registration to building the team */
function Roadmap({ tone }: { tone: Tone }) {
  const c = palette(tone)
  const stops = [
    { x: 34, y: 252, label: 'Entity', dy: -18 },
    { x: 124, y: 206, label: 'SOPs', dy: 30 },
    { x: 206, y: 160, label: 'Pitch deck', dy: -18 },
    { x: 288, y: 104, label: 'Capital', dy: 30 },
    { x: 366, y: 46, label: 'Team', dy: 30 },
  ]
  const d = 'M34,252 C80,252 84,206 124,206 S170,160 206,160 S252,104 288,104 S336,46 366,46'
  return (
    <Frame label="A rising road with five stops: entity, SOPs, pitch deck, capital, team">
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

/* 02 Virtual CFO: a financial-year cash flow forecast, April to March */
function CashFlow({ tone }: { tone: Tone }) {
  const c = palette(tone)
  const months = ['A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D', 'J', 'F', 'M']
  const vals = [42, 55, 47, 63, 71, 58, 76, 84, 69, 91, 98, 88]
  const base = 250
  const bw = 20
  const gap = 10
  const x0 = 26
  const h = (v: number) => v * 1.9
  const pts = vals.map((v, i) => `${x0 + i * (bw + gap) + bw / 2},${base - h(v) - 14}`)
  return (
    <Frame label="Illustrative cash flow forecast for a financial year, April to March, trending upward">
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
            <text x={x + bw / 2} y={base + 20} textAnchor="middle" fill={c.text} fontSize={12} opacity={0.7}>
              {months[i]}
            </text>
          </g>
        )
      })}
      <motion.polyline points={pts.join(' ')} fill="none" stroke={c.line} strokeWidth={2.5} strokeLinejoin="round" variants={draw(0.7, 1.3)} />
      <motion.text x={14} y={30} fill={c.text} fontSize={13} fontWeight={600} variants={rise(1.2)}>
        Cash forecast, Apr to Mar
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

const visuals: Record<string, (p: { tone: Tone }) => JSX.Element> = {
  'startup-advisory': Roadmap,
  'financial-advisory-and-virtual-cfo': CashFlow,
  'virtual-bookkeeping': Ledger,
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
