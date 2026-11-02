import { Link, useParams } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import { firm, services, type Service } from '../content'
import { ClipReveal, Picture, Reveal } from '../components/Motion'
import ServiceVisual from '../components/ServiceVisuals'
import { Button, CtaBand, FaqList, PageHero } from '../components/Sections'
import NotFound from './NotFound'

const kindLabel = (s: Service) => (s.kind === 'core' ? `${s.number} · Core service` : s.kind === 'specialist' ? 'Specialist service' : 'Also offered')

function FeatureGrid({ items }: { items: Service['features'] }) {
  return (
    <ul className="grid border-l border-t border-rule sm:grid-cols-2">
      {items.map((f, i) => (
        <Reveal as="li" key={f.title} delay={(i % 2) * 0.06} className="border-b border-r border-rule group h-full p-6 transition-colors hover:bg-green/[0.06]">
            <h3 className="font-semibold">
              <span className="mr-2 inline-block h-2 w-2 bg-green transition-transform duration-300 group-hover:rotate-45" aria-hidden="true" />
              {f.title}
            </h3>
            <p className="mt-1.5 text-[0.95rem] text-muted">{f.text}</p>
          </Reveal>
      ))}
    </ul>
  )
}

function OnThisSite({ current }: { current: string }) {
  return (
    <nav aria-label="All services" className="md:sticky md:top-28">
      <p className="eyebrow text-[0.68rem] text-green">All services</p>
      <ul className="mt-4 divide-y divide-rule border-y border-rule text-[0.95rem]">
        {services.map((s) => (
          <li key={s.slug}>
            <Link
              to={`/services/${s.slug}`}
              aria-current={s.slug === current ? 'page' : undefined}
              className={`flex items-baseline gap-2 py-2.5 transition-colors hover:text-green ${s.slug === current ? 'font-semibold text-green' : ''}`}
            >
              {s.kind === 'core' && <span className="font-serif text-green">{s.number}</span>}
              {s.menuName}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}

function InfoBoxes({ s }: { s: Service }) {
  const boxes = [
    s.suitedTo && { label: 'Suited to', text: s.suitedTo },
    s.platforms && { label: 'Platforms', text: s.platforms },
    s.receive && { label: 'You receive', text: s.receive },
  ].filter(Boolean) as { label: string; text: string }[]
  if (!boxes.length) return null
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {boxes.map((b, i) => (
        <Reveal key={b.label} delay={i * 0.08}>
          <div className="h-full bg-green/[0.07] p-6">
            <p className="eyebrow text-[0.65rem] text-green">{b.label}</p>
            <p className="mt-3">{b.text}</p>
          </div>
        </Reveal>
      ))}
    </div>
  )
}

function Fundraising({ s }: { s: Service }) {
  const fr = s.fundraising!
  const reduce = useReducedMotion()
  return (
    <>
      <PageHero crumbs={[{ label: 'Home', to: '/' }, { label: 'Services', to: '/services' }, { label: s.name }]} eyebrow={`Service ${s.number}`} title={fr.heading} intro={fr.intro} />
      <ol className="grid border-b border-rule sm:grid-cols-2 lg:grid-cols-4">
        {fr.strip.map((t, i) => (
          <motion.li
            key={t}
            className="border-rule px-6 py-6 sm:border-r md:px-10"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduce ? 0 : 0.5, delay: reduce ? 0 : 0.6 + i * 0.1 }}
          >
            <span className="font-serif text-green">{String(i + 1).padStart(2, '0')}</span>
            <p className="mt-1 font-semibold">{t}</p>
          </motion.li>
        ))}
      </ol>
      <div className="wrap grid gap-12 py-20 md:grid-cols-12 md:py-24">
        <div className="space-y-16 md:col-span-8">
          <section aria-labelledby="included">
            <h2 id="included" className="display text-4xl md:text-5xl">What's included</h2>
            <div className="mt-8">
              <FeatureGrid items={s.features} />
            </div>
          </section>
          <section aria-labelledby="runs">
            <h2 id="runs" className="display text-4xl md:text-5xl">How the engagement runs</h2>
            <div className="mt-8 grid gap-10 lg:grid-cols-2">
              <ol className="border-t-2 border-green-ink">
                {fr.steps.map((st, i) => (
                  <Reveal as="li" key={st.title} delay={i * 0.08} className="grid grid-cols-[2.5rem_1fr] gap-3 border-b border-rule py-5">
                      <span className="font-serif text-lg text-green">{String(i + 1).padStart(2, '0')}</span>
                      <span>
                        <span className="block font-semibold">{st.title}</span>
                        <span className="block text-[0.95rem] text-muted">{st.text}</span>
                      </span>
                    </Reveal>
                ))}
              </ol>
              <div className="bg-green p-6">
                <ServiceVisual slug={s.slug} tone="dark" />
              </div>
            </div>
          </section>
          {s.faq && (
            <section aria-labelledby="fr-faq">
              <h2 id="fr-faq" className="display text-4xl md:text-5xl">Frequently asked questions</h2>
              <div className="mt-8">
                <FaqList items={s.faq} />
              </div>
            </section>
          )}
        </div>
        <aside className="space-y-4 md:col-span-4">
          <div className="space-y-4 md:sticky md:top-28">
            <div className="bg-green-ink p-7 text-paper">
              <p className="display text-3xl">Discuss your requirements</p>
              <p className="mt-2 text-paper/85">Send an enquiry and we'll respond within one working day (IST).</p>
              <div className="mt-6">
                <Button to="/contact" variant="paper">
                  Send an enquiry
                </Button>
              </div>
              <a href={`mailto:${firm.email}`} className="mt-5 block underline underline-offset-4 hover:text-lime">
                {firm.email}
              </a>
            </div>
            <div className="border border-rule p-7">
              <p className="eyebrow text-[0.65rem] text-green">You receive</p>
              <ul className="mt-3 divide-y divide-rule">
                {fr.receiveList.map((r) => (
                  <li key={r} className="py-2.5">{r}</li>
                ))}
              </ul>
            </div>
            <div className="bg-green/[0.07] p-7">
              <p className="eyebrow text-[0.65rem] text-green">After the raise</p>
              <Link to="/services/fpa" className="link-arrow mt-3 flex font-semibold text-green">
                FP&A and investor reporting <span className="arrow" aria-hidden="true">→</span>
              </Link>
              <Link to="/services/virtual-cfo" className="link-arrow mt-2 flex font-semibold text-green">
                Virtual CFO <span className="arrow" aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </aside>
      </div>
    </>
  )
}

export default function ServiceDetail() {
  const { slug } = useParams()
  const index = services.findIndex((s) => s.slug === slug)
  if (index < 0) return <NotFound />
  const s = services[index]
  if (s.fundraising) return <Fundraising key={s.slug} s={s} />
  const next = services[(index + 1) % services.length]

  return (
    <>
      <PageHero crumbs={[{ label: 'Home', to: '/' }, { label: 'Services', to: '/services' }, { label: s.menuName }]} eyebrow={kindLabel(s)} title={s.name} intro={s.intro} />
      <div className="wrap grid gap-12 py-20 md:grid-cols-12 md:py-24">
        <aside className="md:col-span-3">
          <OnThisSite current={s.slug} />
        </aside>
        <div className="space-y-12 md:col-span-9">
          <div className="grid gap-8 lg:grid-cols-5">
            <div className="lg:col-span-3">
              <FeatureGrid items={s.features} />
            </div>
            {s.slug === 'tax-audit-compliance' ? (
              <ClipReveal className="aspect-[4/5] self-start lg:col-span-2">
                <Picture img={{ src: '/images/about-report', alt: 'A financial report with bar charts being reviewed at a desk', w: 940, h: 788 }} widths={[640, 940]} sizes="(min-width: 1024px) 30vw, 100vw" className="h-full w-full object-cover" />
              </ClipReveal>
            ) : (
              <div className="self-start bg-green p-6 lg:col-span-2">
                <ServiceVisual key={s.slug} slug={s.slug} tone="dark" />
              </div>
            )}
          </div>
          <InfoBoxes s={s} />
          {s.faq && (
            <section aria-labelledby="svc-faq">
              <h2 id="svc-faq" className="display text-3xl md:text-4xl">Questions</h2>
              <div className="mt-6">
                <FaqList items={s.faq} />
              </div>
            </section>
          )}
          <Link to={`/services/${next.slug}`} className="group flex flex-col gap-2 border-t-2 border-green-ink pt-8">
            <span className="eyebrow text-[0.68rem] text-green">Next service</span>
            <span className="display link-arrow text-4xl md:text-5xl">
              <span className="transition-colors group-hover:text-green">{next.name}</span>
              <span className="arrow" aria-hidden="true">→</span>
            </span>
          </Link>
        </div>
      </div>
      <CtaBand />
    </>
  )
}
