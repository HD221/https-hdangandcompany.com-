import { useEffect, useRef, useState, type FormEvent, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll, useSpring } from 'framer-motion'
import {
  articles,
  calendar,
  coreServices,
  engagementModels,
  firm,
  fundraisingGrid,
  hoursTable,
  howWeWork,
  industries,
  moments,
  otherServices,
  platforms,
  services,
  type QA,
} from '../content'
import { Magnetic, Marquee, Reveal, SplitText, ease } from './Motion'

/* ---------- small building blocks ---------- */

export function Eyebrow({ children, light }: { children: ReactNode; light?: boolean }) {
  return <p className={`eyebrow ${light ? 'text-lime' : 'text-green'}`}>{children}</p>
}

export function Button({ to, children, variant = 'solid' }: { to: string; children: ReactNode; variant?: 'solid' | 'outline' | 'lime' | 'paper' }) {
  const cls = {
    solid: 'bg-green text-paper hover:bg-green-deep',
    outline: 'border border-ink/30 text-ink hover:border-green hover:text-green',
    lime: 'bg-lime text-ink',
    paper: 'bg-paper text-green-ink hover:bg-white',
  }[variant]
  const inner = (
    <>
      {children} <span className="arrow" aria-hidden="true">→</span>
    </>
  )
  const className = `link-arrow px-6 py-3.5 font-semibold transition-colors duration-300 ${cls}`
  return (
    <Magnetic strength={0.25}>
      {/^https?:|^mailto:|^tel:/.test(to) ? (
        <a href={to} className={className} target={to.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer">
          {inner}
        </a>
      ) : (
        <Link to={to} className={className}>
          {inner}
        </Link>
      )}
    </Magnetic>
  )
}

/** Small animated tick used in checklists. */
function Tick({ delay = 0 }: { delay?: number }) {
  const reduce = useReducedMotion()
  return (
    <svg viewBox="0 0 16 16" className="mt-[0.3em] h-3.5 w-3.5 shrink-0" aria-hidden="true">
      <motion.path
        d="M2.5 8.5 L6.5 12 L13.5 4"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={reduce ? false : { pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: reduce ? 0 : 0.4, delay: reduce ? 0 : delay }}
      />
    </svg>
  )
}

/* ---------- hero card ---------- */

const packItems = ['Reconciled books', 'Budget vs actual', '13-week cash forecast', 'KPI dashboard', 'Variance commentary', 'CFO review call']

export function FinancePackCard() {
  const reduce = useReducedMotion()
  const bars = [34, 40, 36, 52, 58, 64, 74, 82]
  const W = 300
  const H = 120
  const bx = (i: number) => 10 + i * 36
  const line = bars.slice(0, 6).map((v, i) => `${bx(i) + 11},${H - v - 8}`).join(' ')
  const fc = bars.slice(5).map((v, i) => `${bx(i + 5) + 11},${H - v - 8}`).join(' ')
  const t = (d: number) => ({ duration: reduce ? 0 : 0.7, ease, delay: reduce ? 0 : d })
  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={t(0.4)}
    >
      <div className="absolute inset-0 translate-x-4 translate-y-4 border border-green/25 bg-green/5" aria-hidden="true" />
      <div className="relative bg-white p-6 shadow-[0_30px_60px_-30px_rgba(27,66,57,0.35)] md:p-8">
        <div className="flex items-baseline justify-between gap-4">
          <p className="display text-2xl md:text-3xl">Your monthly finance pack</p>
          <p className="eyebrow shrink-0 text-[0.65rem] text-green">Every month</p>
        </div>
        <svg viewBox={`0 0 ${W} ${H}`} className="mt-6 block h-auto w-full" role="img" aria-label="Illustration of actual results with a forecast continuing the trend">
          {[30, 60, 90].map((y) => (
            <line key={y} x1={0} x2={W} y1={y} y2={y} stroke="rgba(33,33,33,0.08)" />
          ))}
          {bars.map((v, i) => (
            <motion.rect
              key={i}
              x={bx(i)}
              y={H - v}
              width={22}
              height={v}
              fill={i < 6 ? 'rgba(46,107,92,0.18)' : 'rgba(195,241,138,0.75)'}
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={t(0.7 + i * 0.06)}
              style={{ transformOrigin: `${bx(i) + 11}px ${H}px` }}
            />
          ))}
          <motion.polyline points={line} fill="none" stroke="#1b4239" strokeWidth={2} initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={t(1.2)} />
          <motion.polyline points={fc} fill="none" stroke="#2e6b5c" strokeWidth={2} strokeDasharray="4 4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={t(1.9)} />
          <motion.circle cx={bx(5) + 11} cy={H - bars[5] - 8} r={4} fill="#1b4239" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={t(1.8)} />
        </svg>
        <div className="mt-3 flex gap-5 text-[0.75rem] text-muted">
          <span className="flex items-center gap-1.5"><span className="h-[2px] w-4 bg-green-ink" aria-hidden="true" /> Actual</span>
          <span className="flex items-center gap-1.5"><span className="w-4 border-t-2 border-dashed border-green" aria-hidden="true" /> Forecast</span>
        </div>
        <ul className="mt-6 grid grid-cols-1 gap-x-6 gap-y-2.5 text-[0.92rem] sm:grid-cols-2">
          {packItems.map((it, i) => (
            <motion.li key={it} className="flex items-start gap-2 text-green-ink" initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={t(1.3 + i * 0.08)}>
              <Tick delay={1.4 + i * 0.08} />
              {it}
            </motion.li>
          ))}
        </ul>
      </div>
    </motion.div>
  )
}

/* ---------- facts row ---------- */

export function FactsRow({ light }: { light?: boolean }) {
  const facts = [
    { label: 'ICAI FRN', value: firm.frn },
    { label: 'Established', value: firm.established },
    { label: 'Team', value: firm.teamSize },
  ]
  return (
    <dl className={`grid grid-cols-3 border-t ${light ? 'border-paper/20' : 'border-rule'}`}>
      {facts.map((f, i) => (
        <div key={f.label} className={`pt-5 ${i ? `border-l pl-4 md:pl-6 ${light ? 'border-paper/20' : 'border-rule'}` : ''}`}>
          <dt className={`eyebrow text-[0.65rem] ${light ? 'text-paper/80' : 'text-muted'}`}>{f.label}</dt>
          <dd className="display mt-2 text-2xl md:text-3xl">{f.value}</dd>
        </div>
      ))}
    </dl>
  )
}

/* ---------- hours band with a live IST clock ---------- */

function useIST() {
  const [now, setNow] = useState<Date | null>(null)
  useEffect(() => {
    setNow(new Date())
    const id = setInterval(() => setNow(new Date()), 30000)
    return () => clearInterval(id)
  }, [])
  return now
}

function istParts(d: Date) {
  const f = new Intl.DateTimeFormat('en-IN', { timeZone: 'Asia/Kolkata', weekday: 'short', hour: 'numeric', minute: '2-digit', hour12: true })
  const parts = new Intl.DateTimeFormat('en-GB', { timeZone: 'Asia/Kolkata', weekday: 'short', hour: '2-digit', minute: '2-digit', hour12: false }).formatToParts(d)
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? ''
  const day = get('weekday')
  const mins = Number(get('hour')) * 60 + Number(get('minute'))
  // Open 10:00 to 02:30 the next morning, Monday to Friday sessions.
  const weekdays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri']
  const prev: Record<string, string> = { Mon: 'Sun', Tue: 'Mon', Wed: 'Tue', Thu: 'Wed', Fri: 'Thu', Sat: 'Fri', Sun: 'Sat' }
  const open = (weekdays.includes(day) && mins >= 600) || (weekdays.includes(prev[day]) && mins < 150)
  return { label: f.format(d), open }
}

const bandPoints = [
  'Serving clients worldwide',
  'Every deliverable reviewed by a Chartered Accountant',
  'Written scope and a fixed monthly calendar',
  'We work inside your accounting system',
  "We don't ask for banking passwords",
  'Client information handled under the ICAI Code of Ethics',
  'Response within one working day (IST)',
  'Year-end package for your CPA',
]

export function HoursBand() {
  const now = useIST()
  const st = now ? istParts(now) : null
  return (
    <div className="bg-green-ink text-paper">
      <div className="wrap flex flex-col gap-3 py-4 text-[0.92rem] lg:flex-row lg:items-center lg:gap-8">
        <p className="flex shrink-0 flex-wrap items-center gap-x-3 gap-y-1">
          <span className="font-semibold">Working hours: {firm.hours}</span>
          {st && (
            <span className="flex items-center gap-2 text-paper/85">
              <span className="relative flex h-2 w-2" aria-hidden="true">
                {st.open && <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-lime opacity-75" />}
                <span className={`relative inline-flex h-2 w-2 rounded-full ${st.open ? 'bg-lime' : 'bg-paper/50'}`} />
              </span>
              {st.open ? 'Open now' : 'Closed now'} · {st.label} in Vadodara
            </span>
          )}
        </p>
        <span className="hidden h-5 w-px shrink-0 bg-paper/25 lg:block" aria-hidden="true" />
        <div className="relative min-w-0 flex-1 border-t border-paper/15 pt-3 lg:border-t-0 lg:pt-0">
          <Marquee
            items={bandPoints}
            className="text-paper/90 [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]"
            separator="●"
            separatorClassName="px-2 text-[0.5em] text-lime"
            speed={2.4}
          />
        </div>
      </div>
    </div>
  )
}

/* ---------- services list (PDF list layout) ---------- */

export function CoreServicesList() {
  return (
    <ol className="border-t-2 border-green-ink">
      {coreServices.map((s, i) => (
        <Reveal as="li" key={s.slug} delay={i * 0.05} className="border-b border-rule">
            <Link to={`/services/${s.slug}`} className="group grid gap-4 py-8 md:grid-cols-[4rem_1fr_1.1fr_2rem] md:gap-8 md:py-10">
              <span className="display text-2xl text-green">{s.number}</span>
              <span>
                <span className="display block text-3xl transition-transform duration-500 group-hover:translate-x-2 md:text-4xl">{s.name}</span>
                <span className="mt-3 block max-w-[30rem] text-muted">{s.short}</span>
              </span>
              <ul className="grid grid-cols-1 gap-x-6 gap-y-2 text-[0.92rem] sm:grid-cols-2">
                {s.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-2">
                    <span className="mt-[0.6em] h-1.5 w-1.5 shrink-0 rounded-full bg-green" aria-hidden="true" />
                    {b}
                  </li>
                ))}
              </ul>
              <span className="hidden text-2xl text-green transition-transform duration-300 group-hover:translate-x-1 md:block" aria-hidden="true">
                →
              </span>
            </Link>
          </Reveal>
      ))}
    </ol>
  )
}

export function OtherServiceCards() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {otherServices.map((s, i) => (
        <Reveal key={s.slug} delay={i * 0.08}>
          <Link to={`/services/${s.slug}`} className="group flex h-full flex-col bg-green/[0.07] p-7 transition-colors duration-300 hover:bg-green hover:text-paper">
            <span className="eyebrow text-[0.65rem] text-green group-hover:text-lime">{s.kind === 'also' ? 'Also offered' : 'Specialist'}</span>
            <span className="display mt-3 text-2xl md:text-3xl">{s.name}</span>
            <span className="mt-3 text-[0.95rem] text-muted group-hover:text-paper/90">{s.short}</span>
            <span className="link-arrow mt-auto pt-6 font-semibold">
              Learn more <span className="arrow" aria-hidden="true">→</span>
            </span>
          </Link>
        </Reveal>
      ))}
    </div>
  )
}

export function ServicesOverview() {
  return (
    <section aria-labelledby="services-overview" className="wrap py-20 md:py-28">
      <div className="grid gap-8 md:grid-cols-12 md:items-end">
        <div className="md:col-span-7">
          <Eyebrow>Our services</Eyebrow>
          <SplitText id="services-overview" text="An outsourced finance function, built around *four core services.*" className="display mt-4 text-4xl md:text-6xl" />
        </div>
        <p className="text-lg leading-relaxed text-muted md:col-span-5 md:text-xl">
          Each engagement runs on a written scope and a fixed monthly calendar. Every deliverable is reviewed by a Chartered Accountant before it reaches you.
        </p>
      </div>
      <div className="mt-12">
        <CoreServicesList />
      </div>
      <div className="mt-10">
        <OtherServiceCards />
      </div>
    </section>
  )
}

/* ---------- where we fit ---------- */

export function Moments() {
  return (
    <section aria-labelledby="moments" className="bg-green/[0.06]">
      <div className="wrap py-20 md:py-28">
        <Eyebrow>Where we fit</Eyebrow>
        <SplitText id="moments" text="Most businesses come to us at one of *three moments.*" className="display mt-4 max-w-[18ch] text-4xl md:text-6xl" />
        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {moments.map((m, i) => (
            <Reveal key={m.title} delay={i * 0.1}>
              <motion.div whileHover={{ y: -6 }} transition={{ duration: 0.3 }} className="flex h-full flex-col bg-white p-7 shadow-[0_1px_0_var(--color-rule)]">
                <span className="display text-5xl italic text-green/50">{m.n}</span>
                <h3 className="display mt-4 text-3xl">{m.title}</h3>
                <p className="mt-3 text-muted">{m.text}</p>
                <Link to={m.link.to} className="link-arrow mt-auto pt-6 font-semibold text-green">
                  {m.link.label} <span className="arrow" aria-hidden="true">→</span>
                </Link>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ---------- monthly calendar ---------- */

export function MonthlyCalendar() {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const n = calendar.length
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.8', 'end 0.45'] })
  const smooth = useSpring(scrollYProgress, { stiffness: 110, damping: 28 })
  const [step, setStep] = useState(reduce ? n - 1 : -1)
  useMotionValueEvent(smooth, 'change', (v) => {
    if (reduce) return
    setStep(v <= 0.02 ? -1 : Math.min(n - 1, Math.floor(v * n * 0.999 + 0.25)))
  })
  return (
    <section aria-labelledby="calendar" className="wrap py-20 md:py-28">
      <div className="grid gap-6 md:grid-cols-12 md:items-end">
        <div className="md:col-span-6">
          <Eyebrow>What a month looks like</Eyebrow>
          <SplitText id="calendar" text="A typical *monthly calendar*" className="display mt-4 text-4xl md:text-6xl" />
        </div>
        <p className="text-muted md:col-span-5 md:col-start-8">
          Exact dates are fixed in your engagement letter. This is the usual rhythm for a combined bookkeeping, FP&A and virtual CFO engagement.
        </p>
      </div>

      <div ref={ref} className="relative mt-14">
        {/* single solid line (desktop) */}
        <div className="hidden h-[2px] bg-green-ink md:block" aria-hidden="true" />

        <ol className="grid gap-4 pt-6 sm:grid-cols-2 md:grid-cols-4 md:gap-5">
          {calendar.map((c, i) => {
            const current = i === step
            const done = i < step
            return (
              <li
                key={c.title}
                className={`relative overflow-hidden border-l-2 p-5 transition-all duration-500 md:border-l-0 ${
                  current
                    ? 'border-green bg-green text-paper shadow-[0_24px_40px_-24px_rgba(27,66,57,0.6)] md:-translate-y-2'
                    : done
                      ? 'border-green bg-green/[0.07]'
                      : 'border-rule bg-transparent'
                }`}
              >
                <span className={`eyebrow text-[0.68rem] transition-colors ${current ? 'text-lime' : 'text-green'}`}>{c.when}</span>
                <h3 className="display mt-3 text-3xl">{c.title}</h3>
                <p className={`mt-2 text-[0.95rem] transition-colors ${current ? 'text-paper/90' : 'text-muted'}`}>{c.text}</p>
                <span
                  className={`absolute bottom-0 left-0 h-1 bg-lime transition-all duration-700 ${current ? 'w-full' : 'w-0'}`}
                  aria-hidden="true"
                />
              </li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}

/* ---------- fundraising feature ---------- */

export function FundraisingFeature() {
  return (
    <section aria-labelledby="fundraising-feature" className="bg-green-ink text-paper">
      <div className="wrap grid gap-12 py-20 md:grid-cols-12 md:py-28">
        <div className="md:col-span-5">
          <Eyebrow light>Fundraising readiness</Eyebrow>
          <SplitText id="fundraising-feature" text="Walk into investor and lender meetings with *numbers that hold up.*" className="display mt-4 text-4xl md:text-6xl [&_.text-green]:text-lime" />
          <p className="mt-6 text-paper/85">
            We start from cleaned-up historical financials, build the model and plan on top of them, keep one set of numbers across the deck, plan and data room, and stay with you through diligence.
          </p>
          <Link to="/services/fundraising-readiness" className="link-arrow mt-8 border-b border-lime pb-1 font-semibold text-lime">
            How fundraising readiness works <span className="arrow" aria-hidden="true">→</span>
          </Link>
        </div>
        <div className="grid grid-cols-1 border border-paper/20 sm:grid-cols-2 md:col-span-6 md:col-start-7">
          {fundraisingGrid.map((g, i) => (
            <Reveal key={g.title} delay={i * 0.1} className={`border-paper/20 p-7 ${i % 2 === 0 ? 'sm:border-r' : ''} ${i < 2 ? 'border-b' : i === 2 ? 'border-b sm:border-b-0' : ''}`}>
              <span className="display text-xl text-lime">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="mt-3 text-lg font-semibold">{g.title}</h3>
              <p className="mt-2 text-[0.92rem] text-paper/80">{g.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ---------- engagement models ---------- */

export function EngagementModels() {
  return (
    <section aria-labelledby="models" className="wrap py-20 md:py-28">
      <Eyebrow>Ways to work with us</Eyebrow>
      <SplitText id="models" text="Three engagement *models*" className="display mt-4 text-4xl md:text-6xl" />
      <div className="mt-12 grid gap-8 md:grid-cols-3">
        {engagementModels.map((m, i) => (
          <Reveal key={m.title} delay={i * 0.1}>
            <div className="group border-t-2 border-green-ink pt-6">
              <h3 className="display text-3xl transition-colors group-hover:text-green">{m.title}</h3>
              <p className="mt-3 text-muted">{m.text}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

/* ---------- industries ---------- */

export function IndustriesGrid({ heading = true }: { heading?: boolean }) {
  return (
    <section aria-labelledby={heading ? 'industries' : undefined} aria-label={heading ? undefined : 'Industries'} className="bg-green/[0.06]">
      <div className="wrap py-20 md:py-28">
        {heading && (
          <div className="grid gap-6 md:grid-cols-12 md:items-end">
            <div className="md:col-span-6">
              <Eyebrow>Industries</Eyebrow>
              <SplitText id="industries" text="Sectors we *work in*" className="display mt-4 text-4xl md:text-6xl" />
            </div>
            <p className="text-muted md:col-span-5 md:col-start-8">Accounting and reporting that reflect how each industry actually earns and spends.</p>
          </div>
        )}
        <ul className={`grid gap-4 sm:grid-cols-2 lg:grid-cols-4 ${heading ? 'mt-12' : ''}`}>
          {industries.map((ind, i) => (
            <Reveal as="li" key={ind.title} delay={(i % 4) * 0.06} className="group relative h-full overflow-hidden bg-white p-6 shadow-[0_1px_0_var(--color-rule)]">
                <span className="absolute inset-x-0 bottom-0 h-0 bg-green transition-all duration-500 ease-out group-hover:h-full" aria-hidden="true" />
                <span className="relative block">
                  <span className="display text-lg text-green transition-colors group-hover:text-lime">{String(i + 1).padStart(2, '0')}</span>
                  <h3 className="mt-3 text-lg font-semibold transition-colors group-hover:text-paper">{ind.title}</h3>
                  <p className="mt-2 text-[0.92rem] text-muted transition-colors group-hover:text-paper/85">{ind.text}</p>
                </span>
              </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}

/* ---------- how we work ---------- */

export function HowWeWorkSteps() {
  return (
    <ol className="grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
      {howWeWork.map((s, i) => (
        <Reveal as="li" key={s.title} delay={i * 0.1} className="relative">
            <span className="display text-5xl text-green/45">{String(i + 1).padStart(2, '0')}</span>
            <h3 className="mt-2 text-lg font-semibold">{s.title}</h3>
            <p className="mt-1 text-[0.95rem] text-muted">{s.text}</p>
          </Reveal>
      ))}
    </ol>
  )
}

function SlotCell({ slot }: { slot: { open: string; close: string; prev?: boolean } | null }) {
  if (!slot) return <span className="text-muted">Same all year</span>
  return (
    <span className="whitespace-nowrap">
      <span className="font-medium">{slot.open}</span>
      <span className="mx-1.5 text-muted">to</span>
      <span className="font-medium">{slot.close}</span>
    </span>
  )
}

export function HoursTable() {
  return (
    <div>
      <div className="relative overflow-x-auto">
        <table className="w-full min-w-[22rem] text-left text-[0.95rem]">
          <caption className="sr-only">Working hours, Monday to Friday, in each time zone, from opening to closing time. Fixed all year.</caption>
          <thead>
            <tr className="border-b-2 border-green-ink">
              <th scope="col" className="py-3 pr-4 font-semibold">Time zone</th>
              <th scope="col" className="py-3 font-semibold">
                Hours
                <span className="block text-[0.78rem] font-normal text-muted">Fixed all year</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {hoursTable.map((r, i) => (
              <tr key={r.region} className={`border-b border-rule ${i === 0 ? 'bg-green/[0.06]' : ''}`}>
                <th scope="row" className="py-3.5 pr-4 text-left font-normal">
                  <span className="block font-semibold">{r.region}</span>
                  <span className="block text-[0.8rem] text-muted">{r.note}</span>
                </th>
                <td className="py-3.5 tabular-nums">
                  <SlotCell slot={r.hours} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-3 text-[0.82rem] text-muted">
        Monday to Friday, in your local time. These hours apply all year, in winter and in summer.
      </p>
    </div>
  )
}

export function Platforms() {
  return (
    <ul className="flex flex-wrap gap-2">
      {platforms.map((p, i) => (
        <motion.li
          key={p}
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.35, delay: i * 0.04 }}
          className="border border-green/30 bg-white px-4 py-2 text-[0.9rem] transition-colors hover:border-green hover:bg-green hover:text-paper"
        >
          {p}
        </motion.li>
      ))}
    </ul>
  )
}

export function HowWeWorkSection() {
  return (
    <section aria-labelledby="how-we-work" className="wrap py-20 md:py-28">
      <Eyebrow>How we work</Eyebrow>
      <SplitText id="how-we-work" text="From first call to a *steady monthly cycle.*" className="display mt-4 max-w-[20ch] text-4xl md:text-6xl" />
      <div className="mt-12">
        <HowWeWorkSteps />
      </div>
      <div className="mt-20 grid gap-14 md:grid-cols-2">
        <Reveal className="min-w-0">
          <h3 className="display text-3xl md:text-4xl">Our hours in your time zone</h3>
          <div className="mt-6">
            <HoursTable />
          </div>
        </Reveal>
        <Reveal delay={0.1} className="min-w-0">
          <h3 className="display text-3xl md:text-4xl">Platforms we work in</h3>
          <div className="mt-6">
            <Platforms />
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/* ---------- how we handle your work ---------- */

const standards = [
  {
    title: 'Reviewed by a Chartered Accountant',
    text: 'Every deliverable is reviewed by a Chartered Accountant before it reaches you.',
    path: 'M8 4 h22 l8 8 v32 h-30 z M30 4 v8 h8 M14 28 l6 6 l12 -12',
  },
  {
    title: 'No banking passwords',
    text: "Role-based logins to your software and read-only bank feeds; we don't ask for banking passwords.",
    path: 'M12 22 v-6 a12 12 0 0 1 24 0 v6 M8 22 h32 v22 h-32 z M24 30 v6',
  },
  {
    title: 'ICAI Code of Ethics',
    text: 'Client information is handled under the ICAI Code of Ethics and an NDA where required.',
    path: 'M24 4 l18 6 v12 c0 12 -8 20 -18 24 c-10 -4 -18 -12 -18 -24 v-12 z M16 24 l6 6 l10 -12',
  },
  {
    title: 'Written scope, fixed calendar',
    text: 'Each engagement runs on a written scope and a fixed monthly calendar, set out in the engagement letter.',
    path: 'M6 10 h36 v34 h-36 z M6 18 h36 M14 4 v10 M34 4 v10 M14 26 h6 M28 26 h6 M14 34 h6',
  },
  {
    title: 'Inside your systems',
    text: 'We work inside your own accounting system, so your books and records stay with you.',
    path: 'M4 8 h40 v26 h-40 z M18 42 h12 M24 34 v8 M12 26 l8 -8 l6 5 l10 -10',
  },
  {
    title: 'A package for your CPA',
    text: 'For clients abroad, we hand a year-end package to your CPA or tax preparer, who handles the filing.',
    path: 'M6 16 l18 -10 l18 10 v22 l-18 10 l-18 -10 z M6 16 l18 10 l18 -10 M24 26 v22',
  },
]

export function StandardsSection({ heading = true }: { heading?: boolean }) {
  const reduce = useReducedMotion()
  return (
    <section aria-labelledby="standards" className="bg-green/[0.06]">
      <div className="wrap py-20 md:py-28">
        <div className="grid gap-6 md:grid-cols-12 md:items-end">
          <div className="md:col-span-7">
            <Eyebrow>{heading ? 'The firm' : 'Our standards'}</Eyebrow>
            <SplitText id="standards" text="How we handle *your work*" className="display mt-4 text-4xl md:text-6xl" />
          </div>
          <p className="text-lg leading-relaxed text-muted md:col-span-5 md:text-xl">
            The same rules apply to every engagement, whether we keep your books, plan your numbers or prepare you for a raise.
          </p>
        </div>
        <ul className="mt-12 grid gap-px bg-rule sm:grid-cols-2 lg:grid-cols-3">
          {standards.map((st, i) => (
            <Reveal as="li" key={st.title} delay={(i % 3) * 0.08} className="group relative overflow-hidden bg-paper p-7 md:p-9">
              <span className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-green transition-transform duration-500 group-hover:scale-x-100" aria-hidden="true" />
              <div className="flex items-start justify-between gap-4">
                <svg viewBox="0 0 48 48" className="h-12 w-12 text-green" aria-hidden="true">
                  <motion.path
                    d={st.path}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={reduce ? false : { pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: reduce ? 0 : 1.2, ease, delay: reduce ? 0 : 0.2 + (i % 3) * 0.12 }}
                  />
                </svg>
                <span className="display text-xl text-green/40">{String(i + 1).padStart(2, '0')}</span>
              </div>
              <h3 className="display mt-6 text-2xl md:text-3xl">{st.title}</h3>
              <p className="mt-2 text-[0.95rem] text-muted">{st.text}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}

/* ---------- insights teaser ---------- */

export function InsightsTeaser() {
  const featured = articles.find((a) => a.featured)!
  const rest = articles.filter((a) => !a.featured).slice(0, 3)
  return (
    <section aria-labelledby="insights-teaser" className="wrap py-20 md:py-28">
      <div className="flex items-end justify-between gap-6">
        <div>
          <Eyebrow>Blogs</Eyebrow>
          <SplitText id="insights-teaser" text="Articles and *guides*" className="display mt-4 text-4xl md:text-6xl" />
        </div>
        <Link to="/blogs" className="link-arrow hidden font-semibold text-green md:inline-flex">
          View all blogs <span className="arrow" aria-hidden="true">→</span>
        </Link>
      </div>
      <div className="mt-12 grid gap-6 md:grid-cols-2">
        <Reveal>
          <Link to={`/blogs/${featured.slug}`} className="group flex h-full min-h-[22rem] flex-col bg-green-ink p-8 text-paper md:p-10">
            <span className="eyebrow text-[0.68rem] text-lime">Featured · {featured.category}</span>
            <span className="display mt-5 text-4xl transition-colors group-hover:text-lime md:text-5xl">{featured.title}</span>
            <span className="mt-4 text-paper/85">{featured.summary}</span>
            <span className="link-arrow mt-auto pt-8 font-semibold text-lime">
              Read the article · {featured.minutes} min <span className="arrow" aria-hidden="true">→</span>
            </span>
          </Link>
        </Reveal>
        <ul className="divide-y divide-rule border-y border-rule">
          {rest.map((a, i) => (
            <Reveal as="li" key={a.slug} delay={i * 0.08}>
              <Link to={`/blogs/${a.slug}`} className="group block py-6">
                <span className="eyebrow text-[0.65rem] text-green">{a.category}</span>
                <span className="display mt-2 block text-2xl transition-colors group-hover:text-green">{a.title}</span>
                <span className="link-arrow mt-1 text-[0.85rem] text-muted">
                  {a.minutes} min read <span className="arrow" aria-hidden="true">→</span>
                </span>
              </Link>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}

/* ---------- FAQ accordion ---------- */

export function FaqList({ items, defaultOpen = 0 }: { items: QA[]; defaultOpen?: number }) {
  const [open, setOpen] = useState(defaultOpen)
  const reduce = useReducedMotion()
  return (
    <ul className="border-b border-rule">
      {items.map((f, i) => {
        const isOpen = open === i
        return (
          <li key={f.q} className="border-t border-rule">
            <h3>
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={`faq-${i}-${f.q.length}`}
                onClick={() => setOpen(isOpen ? -1 : i)}
                className="group flex w-full items-center justify-between gap-6 py-5 text-left font-semibold"
              >
                <span className="transition-colors group-hover:text-green">{f.q}</span>
                <span className="grid h-8 w-8 shrink-0 place-items-center border border-green text-green" aria-hidden="true">
                  <motion.span className="block leading-none" animate={{ rotate: isOpen ? 45 : 0 }} transition={{ duration: reduce ? 0 : 0.25 }}>
                    +
                  </motion.span>
                </span>
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={`faq-${i}-${f.q.length}`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: reduce ? 0 : 0.35, ease }}
                  className="overflow-hidden"
                >
                  <p className="max-w-[40rem] pb-6 text-muted">{f.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </li>
        )
      })}
    </ul>
  )
}

export function FaqSection({ items }: { items: QA[] }) {
  return (
    <section aria-labelledby="faq" className="bg-green/[0.06]">
      <div className="wrap grid gap-10 py-20 md:grid-cols-12 md:py-28">
        <div className="md:col-span-5">
          <Eyebrow>Questions</Eyebrow>
          <SplitText id="faq" text="Frequently asked *questions*" className="display mt-4 text-4xl md:text-6xl" />
          <p className="mt-6 text-muted">
            Anything else? Write to{' '}
            <a href={`mailto:${firm.email}`} className="font-semibold text-green underline underline-offset-4">
              {firm.email}
            </a>
            .
          </p>
          <Link to="/faqs" className="link-arrow mt-6 font-semibold text-green">
            See all questions <span className="arrow" aria-hidden="true">→</span>
          </Link>
        </div>
        <div className="md:col-span-7">
          <FaqList items={items} />
        </div>
      </div>
    </section>
  )
}

/* ---------- enquiry form ---------- */

function Field({ label, name, type = 'text', required, autoComplete }: { label: string; name: string; type?: string; required?: boolean; autoComplete?: string }) {
  return (
    <label className="block">
      <span className="text-[0.88rem] font-medium">
        {label}
        {required ? '' : ' (optional)'}
      </span>
      <input
        name={name}
        type={type}
        required={required}
        autoComplete={autoComplete}
        className="mt-1.5 block w-full border border-ink/20 bg-white px-3 py-2.5 transition-colors focus:border-green focus:outline-none"
      />
    </label>
  )
}

export function EnquiryForm() {
  const [state, setState] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setState('sending')
    try {
      const res = await fetch(import.meta.env.VITE_FORM_ENDPOINT ?? '/api/form', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(new FormData(e.currentTarget) as unknown as Record<string, string>).toString(),
      })
      if (!res.ok) throw new Error(String(res.status))
      setState('sent')
    } catch {
      setState('error')
    }
  }
  if (state === 'sent')
    return (
      <p role="status" className="display text-3xl text-green-ink">
        Thank you. Your enquiry has reached us and we will respond within one working day (IST).
      </p>
    )
  return (
    <form name="enquiry" method="POST" data-netlify="true" netlify-honeypot="company-website" onSubmit={submit} className="grid gap-5 sm:grid-cols-2">
      <input type="hidden" name="form-name" value="enquiry" />
      <p className="hidden">
        <label>
          Leave this empty <input name="company-website" tabIndex={-1} autoComplete="off" />
        </label>
      </p>
      <Field label="Name" name="name" required autoComplete="name" />
      <Field label="Business name" name="business" autoComplete="organization" />
      <Field label="Email" name="email" type="email" required autoComplete="email" />
      <Field label="Country" name="country" autoComplete="country-name" />
      <label className="block sm:col-span-2">
        <span className="text-[0.88rem] font-medium">Service required</span>
        <select name="service" className="mt-1.5 block w-full border border-ink/20 bg-white px-3 py-2.5 focus:border-green focus:outline-none">
          {services.map((s) => (
            <option key={s.slug}>{s.name}</option>
          ))}
          <option>Something else</option>
        </select>
      </label>
      <label className="block sm:col-span-2">
        <span className="text-[0.88rem] font-medium">Message</span>
        <textarea name="message" rows={5} required className="mt-1.5 block w-full resize-y border border-ink/20 bg-white px-3 py-2.5 focus:border-green focus:outline-none" />
      </label>
      <div className="sm:col-span-2">
        <button
          type="submit"
          disabled={state === 'sending'}
          className="link-arrow bg-green-ink px-6 py-3.5 font-semibold text-paper transition-colors hover:bg-green disabled:opacity-60"
        >
          {state === 'sending' ? 'Sending' : 'Send enquiry'} <span className="arrow" aria-hidden="true">→</span>
        </button>
        {state === 'error' && (
          <p role="alert" className="mt-3 text-[0.92rem]">
            That did not go through. Please email {firm.email} or call {firm.phoneDisplay}.
          </p>
        )}
      </div>
    </form>
  )
}

export function EnquirySection({ asPageHeading }: { asPageHeading?: boolean }) {
  return (
    <section aria-labelledby="enquiry" className="bg-green text-paper">
      <div className="wrap grid gap-12 py-20 md:grid-cols-12 md:py-28">
        <div className="md:col-span-5">
          <Eyebrow light>Contact</Eyebrow>
          <SplitText as={asPageHeading ? 'h1' : 'h2'} onMount={asPageHeading} id="enquiry" text="Send an *enquiry*" className="display mt-4 text-5xl md:text-7xl [&_.text-green]:text-lime" />
          <p className="mt-4 text-paper/90">We respond within one working day (IST).</p>
          <dl className="mt-10 space-y-6 border-t border-paper/20 pt-8">
            <div>
              <dt className="eyebrow text-[0.65rem] text-lime">Office</dt>
              <dd className="mt-1.5">
                <address className="not-italic">{firm.address.join(', ')}</address>
              </dd>
            </div>
            <div>
              <dt className="eyebrow text-[0.65rem] text-lime">Email</dt>
              <dd className="mt-1.5">
                <a href={`mailto:${firm.email}`} className="underline underline-offset-4 hover:text-lime">{firm.email}</a>
              </dd>
            </div>
            <div>
              <dt className="eyebrow text-[0.65rem] text-lime">Phone / WhatsApp</dt>
              <dd className="mt-1.5">
                <a href={firm.phoneHref} className="underline underline-offset-4 hover:text-lime">{firm.phoneDisplay}</a>
              </dd>
            </div>
          </dl>
        </div>
        <Reveal className="bg-paper p-6 text-ink md:col-span-6 md:col-start-7 md:p-10">
          <EnquiryForm />
        </Reveal>
      </div>
    </section>
  )
}

/* ---------- inner page hero and closing band ---------- */

export function PageHero({
  crumbs,
  eyebrow,
  title,
  intro,
  children,
}: {
  crumbs: { label: string; to?: string }[]
  eyebrow?: string
  title: string
  intro?: string
  children?: ReactNode
}) {
  return (
    <section className="relative overflow-hidden bg-green-ink text-paper">
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 -top-40 h-[34rem] w-[34rem] rounded-full border border-paper/10"
        animate={{ rotate: 360 }}
        transition={{ duration: 120, repeat: Infinity, ease: 'linear' }}
      >
        <span className="absolute left-1/2 top-0 h-3 w-3 -translate-x-1/2 rounded-full bg-lime" />
      </motion.div>
      <div className="wrap relative grid gap-10 py-16 md:grid-cols-12 md:py-24">
        <div className="md:col-span-8">
          <nav aria-label="Breadcrumb" className="text-[0.85rem] text-paper/80">
            {crumbs.map((c, i) => (
              <span key={c.label}>
                {i > 0 && <span aria-hidden="true"> / </span>}
                {c.to ? (
                  <Link to={c.to} className="underline underline-offset-4 hover:text-lime">
                    {c.label}
                  </Link>
                ) : (
                  <span aria-current="page">{c.label}</span>
                )}
              </span>
            ))}
          </nav>
          {eyebrow && <p className="eyebrow mt-6 text-[0.7rem] text-lime">{eyebrow}</p>}
          <SplitText as="h1" onMount text={title} className="display mt-4 text-5xl md:text-7xl [&_.text-green]:text-lime" />
          {intro && (
            <motion.p className="mt-6 max-w-[42rem] text-lg text-paper/90" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }}>
              {intro}
            </motion.p>
          )}
        </div>
        {children && <div className="md:col-span-4 md:self-end">{children}</div>}
      </div>
    </section>
  )
}

export function CtaBand() {
  return (
    <section className="wrap py-16 md:py-24">
      <Reveal>
        <div className="flex flex-col items-start justify-between gap-6 bg-green-ink p-8 text-paper md:flex-row md:items-center md:p-12">
          <div>
            <h2 className="display text-3xl md:text-5xl">Discuss your requirements</h2>
            <p className="mt-2 text-paper/85">We respond within one working day (IST).</p>
          </div>
          <Button to="/contact" variant="paper">
            Send an enquiry
          </Button>
        </div>
      </Reveal>
    </section>
  )
}
