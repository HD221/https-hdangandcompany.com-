import { Link } from 'react-router-dom'
import { services } from '../content'
import { Reveal } from '../components/Motion'
import ServiceVisual from '../components/ServiceVisuals'
import { CoreServicesList, CtaBand, Eyebrow, OtherServiceCards, PageHero } from '../components/Sections'

export default function Services() {
  return (
    <>
      <PageHero
        crumbs={[{ label: 'Home', to: '/' }, { label: 'Services' }]}
        title="*Services*"
        intro="Four core services that together work as your outsourced finance function, two specialist services for growth and investment decisions, and the tax, audit and compliance work a Chartered Accountant firm provides in India."
      />
      <section aria-labelledby="core" className="wrap py-20 md:py-28">
        <Eyebrow>Core services</Eyebrow>
        <h2 id="core" className="display mt-4 text-4xl md:text-6xl">Your outsourced finance function</h2>
        <div className="mt-10">
          <CoreServicesList />
        </div>
      </section>

      <section aria-label="Service illustrations" className="bg-green-ink text-paper">
        <div className="wrap grid gap-6 py-20 sm:grid-cols-2 lg:grid-cols-3 md:py-28">
          {services
            .filter((s) => s.slug !== 'tax-audit-compliance')
            .map((s, i) => (
              <Reveal key={s.slug} delay={(i % 3) * 0.08}>
                <Link to={`/services/${s.slug}`} className="group block h-full border border-paper/15 p-6 transition-colors hover:border-lime">
                  <ServiceVisual slug={s.slug} tone="dark" />
                  <span className="link-arrow mt-4 font-semibold group-hover:text-lime">
                    {s.menuName} <span className="arrow" aria-hidden="true">→</span>
                  </span>
                </Link>
              </Reveal>
            ))}
        </div>
      </section>

      <section aria-labelledby="specialist" className="wrap py-20 md:py-28">
        <Eyebrow>Specialist and also offered</Eyebrow>
        <h2 id="specialist" className="display mt-4 text-4xl md:text-6xl">For growth, investment and compliance</h2>
        <div className="mt-10">
          <OtherServiceCards />
        </div>
      </section>
      <CtaBand />
    </>
  )
}
