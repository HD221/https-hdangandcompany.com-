import { useId, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

const inr = (n: number) => '₹' + Math.round(n).toLocaleString('en-IN')
const num = (n: number) => Math.round(n).toLocaleString('en-IN')

function Field({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  const id = useId()
  return (
    <div>
      <label htmlFor={id} className="text-[0.95rem] text-paper/75">
        {label}
      </label>
      <div className="mt-2 flex items-baseline gap-2 border-b-2 border-paper/30 transition-colors focus-within:border-lime">
        <span className="display text-3xl text-paper/60" aria-hidden="true">₹</span>
        <input
          id={id}
          inputMode="decimal"
          autoComplete="off"
          value={value}
          onChange={(e) => onChange(e.target.value.replace(/[^\d.]/g, ''))}
          className="display w-full bg-transparent py-2 text-3xl tabular-nums text-paper outline-none placeholder:text-paper/30"
          placeholder="Enter amount"
        />
      </div>
    </div>
  )
}

/** Interactive break-even calculator with a live cost/revenue chart. */
export default function BreakEven() {
  const reduce = useReducedMotion()
  const [f, setF] = useState('')
  const [p, setP] = useState('')
  const [v, setV] = useState('')
  const fixed = Number(f) || 0
  const price = Number(p) || 0
  const variable = Number(v) || 0
  const filled = fixed > 0 && price > 0 && v !== ''

  const margin = price - variable
  const ok = filled && margin > 0
  const units = ok ? fixed / margin : 0
  const revenue = units * price

  // Chart geometry
  const W = 560
  const H = 340
  const pad = { l: 12, r: 12, t: 16, b: 28 }
  const maxQ = ok ? Math.max(units * 2, 10) : 1000
  const maxY = Math.max(price * maxQ, fixed + variable * maxQ, 1) * 1.05
  const sx = (q: number) => pad.l + (q / maxQ) * (W - pad.l - pad.r)
  const sy = (v: number) => H - pad.b - (v / maxY) * (H - pad.t - pad.b)
  const revPath = `M${sx(0)},${sy(0)} L${sx(maxQ)},${sy(price * maxQ)}`
  const costPath = `M${sx(0)},${sy(fixed)} L${sx(maxQ)},${sy(fixed + variable * maxQ)}`
  const t = reduce ? { duration: 0 } : { type: 'spring' as const, stiffness: 160, damping: 22 }

  return (
    <div className="grid gap-10 md:grid-cols-12 md:gap-12">
      <div className="space-y-8 md:col-span-5">
        <Field label="Fixed costs per month (rent, salaries)" value={f} onChange={setF} />
        <Field label="Selling price per unit" value={p} onChange={setP} />
        <Field label="Variable cost per unit" value={v} onChange={setV} />
        <p className="text-[0.85rem] text-paper/70">Your figures stay in your browser. Nothing is sent to us.</p>
      </div>

      <div className="md:col-span-7">
        <div aria-live="polite" className="flex flex-wrap items-end gap-x-10 gap-y-4">
          {!filled ? (
            <p className="display max-w-[22ch] text-4xl text-paper/80 md:text-5xl">Enter your three figures to see where you break even.</p>
          ) : ok ? (
            <>
              <div>
                <p className="text-[0.9rem] text-paper/70">You break even at</p>
                <p className="display text-6xl tabular-nums text-lime md:text-7xl">{num(Math.ceil(units))} units</p>
              </div>
              <div>
                <p className="text-[0.9rem] text-paper/70">That is monthly sales of</p>
                <p className="display text-4xl tabular-nums">{inr(revenue)}</p>
              </div>
              <div>
                <p className="text-[0.9rem] text-paper/70">Each unit contributes</p>
                <p className="display text-4xl tabular-nums">{inr(margin)}</p>
              </div>
            </>
          ) : (
            <p className="display text-4xl text-lime">
              Your variable cost is at or above your price, so every sale loses money. There is no break-even point.
            </p>
          )}
        </div>

        <svg viewBox={`0 0 ${W} ${H}`} className="mt-8 w-full" role="img" aria-label="Chart of total cost and revenue against units sold">
          {[0.25, 0.5, 0.75].map((f) => (
            <line key={f} x1={pad.l} x2={W - pad.r} y1={sy(maxY * f)} y2={sy(maxY * f)} stroke="currentColor" strokeOpacity={0.12} />
          ))}
          <line x1={pad.l} x2={W - pad.r} y1={H - pad.b} y2={H - pad.b} stroke="currentColor" strokeOpacity={0.4} />
          <motion.path initial={false} d={costPath} animate={{ d: costPath }} transition={t} fill="none" stroke="#f7f5f1" strokeWidth={2.5} strokeDasharray="7 6" />
          <motion.path initial={false} d={revPath} animate={{ d: revPath }} transition={t} fill="none" stroke="#c3f18a" strokeWidth={3} />
          {ok && (
            <>
              <motion.line initial={false}
                animate={{ x1: sx(units), x2: sx(units), y1: sy(revenue), y2: H - pad.b }}
                transition={t}
                stroke="#c3f18a"
                strokeOpacity={0.6}
                strokeDasharray="3 4"
              />
              <motion.circle initial={false} animate={{ cx: sx(units), cy: sy(revenue) }} transition={t} r={8} fill="#c3f18a" />
              <motion.circle initial={false} animate={{ cx: sx(units), cy: sy(revenue) }} transition={t} r={16} fill="none" stroke="#c3f18a" strokeOpacity={0.5} />
            </>
          )}
          <text x={pad.l} y={H - 8} fill="currentColor" fillOpacity={0.6} fontSize={12}>
            Units sold
          </text>
        </svg>
        <div className="mt-3 flex gap-6 text-[0.85rem] text-paper/75">
          <span className="flex items-center gap-2">
            <span className="inline-block h-[3px] w-6 bg-lime" aria-hidden="true" /> Revenue
          </span>
          <span className="flex items-center gap-2">
            <span className="inline-block w-6 border-t-2 border-dashed border-paper" aria-hidden="true" /> Total cost
          </span>
        </div>
      </div>
    </div>
  )
}
