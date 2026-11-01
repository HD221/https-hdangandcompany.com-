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

/* 02 RPA: a loop of automated steps with work flowing round it */
function FlowLoop({ tone }: { tone: Tone }) {
  const c = palette(tone)
  const reduce = useReducedMotion()
  const nodes = [
    { x: 40, y: 40, label: 'Trigger' },
    { x: 240, y: 40, label: 'Task' },
    { x: 240, y: 190, label: 'Approve' },
    { x: 40, y: 190, label: 'Report' },
  ]
  const loop = 'M160,75 L240,75 M300,110 L300,190 M240,225 L160,225 M100,190 L100,110'
  const track = 'M100,75 L300,75 L300,225 L100,225 Z'
  return (
    <Frame label="An automation loop: trigger, task, approve, report">
      <motion.path d={loop} stroke={c.faint} strokeWidth={10} variants={draw(0.2, 1)} />
      <motion.path
        d={track}
        fill="none"
        stroke={c.line}
        strokeWidth={2}
        strokeDasharray="5 9"
        initial={{ strokeDashoffset: 0 }}
        animate={reduce ? undefined : { strokeDashoffset: -140 }}
        transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
      />
      {nodes.map((n, i) => (
        <motion.g key={n.label} variants={pop(0.15 + i * 0.18)} style={{ transformOrigin: `${n.x + 60}px ${n.y + 35}px` }}>
          <rect x={n.x} y={n.y} width={120} height={70} fill={tone === 'dark' ? '#24574b' : '#f7f5f1'} stroke={c.line} strokeWidth={2} />
          <text x={n.x + 60} y={n.y + 41} textAnchor="middle" fill={c.text} fontSize={16} fontWeight={600}>
            {n.label}
          </text>
        </motion.g>
      ))}
      {!reduce && (
        <circle r={7} fill={c.accent} stroke={c.stroke} strokeWidth={2}>
          <animateMotion dur="5s" repeatCount="indefinite" path={track} />
        </circle>
      )}
      <motion.text x={200} y={156} textAnchor="middle" fill={c.text} fontSize={13} opacity={0.75} variants={rise(1)}>
        runs on its own
      </motion.text>
    </Frame>
  )
}

/* 03 Virtual CFO: a financial-year cash flow forecast, April to March */
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

/* 04 Bookkeeping: a T-account where debits and credits balance */
function Ledger({ tone }: { tone: Tone }) {
  const c = palette(tone)
  const dr = ['1,20,000', '2,50,000', '50,000']
  const cr = ['1,80,000', '90,000', '1,50,000']
  return (
    <Frame label="A T-account for cash with debits and credits that balance at 4,20,000">
      <motion.text x={200} y={34} textAnchor="middle" fill={c.text} fontSize={18} fontWeight={700} variants={rise(0)}>
        Cash A/c
      </motion.text>
      <motion.path d="M40,50 L360,50 M200,50 L200,250" stroke={c.line} strokeWidth={2.5} fill="none" variants={draw(0.1, 0.9)} />
      <motion.text x={52} y={74} fill={c.text} fontSize={13} opacity={0.7} variants={rise(0.4)}>Dr</motion.text>
      <motion.text x={348} y={74} textAnchor="end" fill={c.text} fontSize={13} opacity={0.7} variants={rise(0.4)}>Cr</motion.text>
      {dr.map((v, i) => (
        <motion.text key={'d' + i} x={184} y={110 + i * 34} textAnchor="end" fill={c.text} fontSize={17} variants={{ hidden: { x: -30, opacity: 0 }, show: { x: 0, opacity: 1, transition: { duration: 0.5, ease, delay: 0.6 + i * 0.25 } } }}>
          ₹{v}
        </motion.text>
      ))}
      {cr.map((v, i) => (
        <motion.text key={'c' + i} x={348} y={110 + i * 34} textAnchor="end" fill={c.text} fontSize={17} variants={{ hidden: { x: 30, opacity: 0 }, show: { x: 0, opacity: 1, transition: { duration: 0.5, ease, delay: 0.72 + i * 0.25 } } }}>
          ₹{v}
        </motion.text>
      ))}
      <motion.path d="M90,200 L188,200 M90,236 L188,236 M90,240 L188,240 M250,200 L348,200 M250,236 L348,236 M250,240 L348,240" stroke={c.line} strokeWidth={1.2} variants={draw(1.5, 0.6)} />
      <motion.text x={184} y={225} textAnchor="end" fill={c.text} fontSize={18} fontWeight={700} variants={rise(1.7)}>₹4,20,000</motion.text>
      <motion.text x={348} y={225} textAnchor="end" fill={c.text} fontSize={18} fontWeight={700} variants={rise(1.8)}>₹4,20,000</motion.text>
      <motion.g variants={pop(2.1)} style={{ transformOrigin: '200px 272px' }}>
        <rect x={150} y={258} width={100} height={28} fill={c.accent} stroke={c.stroke} strokeWidth={1.5} />
        <text x={200} y={277} textAnchor="middle" fill={c.accentInk} fontSize={14} fontWeight={700}>
          Dr = Cr
        </text>
      </motion.g>
    </Frame>
  )
}

/* 05 Crypto: blocks linked into a chain, each pointing to the last */
function Chain({ tone }: { tone: Tone }) {
  const c = palette(tone)
  const reduce = useReducedMotion()
  const blocks = [
    { x: 20, y: 120, hash: '0x3f9a' },
    { x: 115, y: 90, hash: '0xa41c' },
    { x: 210, y: 120, hash: '0x7be2' },
    { x: 305, y: 90, hash: '0xc05d' },
  ]
  return (
    <Frame label="Four blocks linked in a chain, each carrying the hash of the one before">
      {blocks.slice(0, -1).map((b, i) => {
        const n = blocks[i + 1]
        return <motion.path key={i} d={`M${b.x + 75},${b.y + 37} L${n.x},${n.y + 37}`} stroke={c.line} strokeWidth={3} strokeDasharray="2 5" strokeLinecap="round" variants={draw(0.5 + i * 0.3, 0.4)} />
      })}
      {blocks.map((b, i) => (
        <motion.g key={b.hash} variants={{ hidden: { y: -40, opacity: 0 }, show: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 200, damping: 14, delay: i * 0.3 } } }}>
          <rect x={b.x} y={b.y} width={75} height={75} fill={tone === 'dark' ? '#24574b' : '#f7f5f1'} stroke={c.line} strokeWidth={2} />
          <motion.rect
            x={b.x}
            y={b.y}
            width={75}
            height={75}
            fill={c.accent}
            initial={{ opacity: 0 }}
            animate={reduce ? undefined : { opacity: [0, 0.9, 0] }}
            transition={{ duration: 1.2, repeat: Infinity, repeatDelay: 3.6, delay: 2 + i * 1.2 }}
          />
          <text x={b.x + 37.5} y={b.y + 32} textAnchor="middle" fill={c.text} fontSize={13} fontWeight={700}>
            Block {i + 1}
          </text>
          <text x={b.x + 37.5} y={b.y + 52} textAnchor="middle" fill={c.text} fontSize={12} opacity={0.7} fontFamily="ui-monospace, monospace">
            {b.hash}
          </text>
        </motion.g>
      ))}
      <motion.text x={200} y={250} textAnchor="middle" fill={c.text} fontSize={13} opacity={0.75} variants={rise(1.6)}>
        every block carries the hash of the last
      </motion.text>
    </Frame>
  )
}

const visuals: Record<string, (p: { tone: Tone }) => JSX.Element> = {
  'startup-advisory': Roadmap,
  'rpa-and-data-analytics': FlowLoop,
  'financial-advisory-and-virtual-cfo': CashFlow,
  'virtual-bookkeeping': Ledger,
  'cryptocurrency-and-blockchain': Chain,
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
