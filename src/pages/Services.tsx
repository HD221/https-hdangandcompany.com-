import { Link } from 'react-router-dom'
import { services } from '../content'
import { Reveal } from '../components/Motion'
import ContactBand from '../components/ContactBand'

export default function Services() {
  return (
    <>
      <section className="wrap pb-16 pt-14 md:pb-24 md:pt-24">
        <p className="mb-8 text-[0.8rem] font-medium uppercase tracking-[0.25em] text-green">Services</p>
        <h1 className="display max-w-[16ch] text-[2.9rem] sm:text-6xl lg:text-[5.6rem]">Five areas of work, one practice.</h1>
        <p className="mt-8 max-w-[38rem] text-lg text-muted">
          From registering your company to running its books and automating its admin. Each page lists exactly what is included.
        </p>
      </section>
      <section className="wrap pb-24 md:pb-32" aria-label="All services">
        {services.map((s, i) => (
          <Reveal key={s.slug}>
            <article className={`grid gap-6 border-t border-rule py-12 md:grid-cols-12 md:py-16 ${i === services.length - 1 ? 'border-b' : ''}`}>
              <p className="font-serif text-5xl text-green md:col-span-2 md:text-6xl">{s.number}</p>
              <div className="md:col-span-5">
                <h2 className="display text-3xl md:text-5xl">
                  <Link to={`/services/${s.slug}`} className="hover:underline decoration-2 underline-offset-[0.15em]">
                    {s.name}
                  </Link>
                </h2>
                <p className="mt-5 max-w-[32rem] text-muted">{s.short}</p>
                <Link to={`/services/${s.slug}`} className="link-arrow mt-6 font-medium text-green underline underline-offset-[0.3em]">
                  <span>What is included</span>
                  <span className="arrow" aria-hidden="true">→</span>
                </Link>
              </div>
              <ul className="text-[0.95rem] md:col-span-4 md:col-start-9 md:pt-3">
                {s.sections.map((sec) => (
                  <li key={sec.title} className="border-b border-rule py-2.5 last:border-0">
                    {sec.title}
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>
        ))}
      </section>
      <ContactBand heading="Not sure which service fits? Ask us." />
    </>
  )
}
