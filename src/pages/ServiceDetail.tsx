import { Link, useParams } from 'react-router-dom'
import { services } from '../content'
import { Parallax, Picture, Reveal } from '../components/Motion'
import ContactBand from '../components/ContactBand'
import NotFound from './NotFound'

export default function ServiceDetail() {
  const { slug } = useParams()
  const index = services.findIndex((s) => s.slug === slug)
  if (index < 0) return <NotFound />
  const s = services[index]
  const next = services[(index + 1) % services.length]

  return (
    <>
      <section className="wrap grid gap-10 pb-16 pt-14 md:grid-cols-12 md:pb-24 md:pt-24">
        <div className="md:col-span-8">
          <p className="mb-8 text-[0.8rem] font-medium uppercase tracking-[0.25em] text-green">
            <Link to="/services" className="hover:underline underline-offset-4">Services</Link>
            <span aria-hidden="true"> / </span>
            {s.number}
          </p>
          <h1 className="display text-[2.9rem] sm:text-6xl lg:text-[5.6rem]">{s.name}</h1>
        </div>
        <p className="text-lg md:col-span-4 md:col-start-9 md:self-end">{s.intro}</p>
      </section>

      {s.image && (
        <div className="wrap mb-20 md:mb-28"><Parallax className="aspect-[16/10] md:aspect-[21/9]">
          <Picture img={s.image} widths={s.image.w > 640 ? [640, 940] : [640]} sizes="(min-width: 1408px) 1328px, 100vw" className="h-full w-full object-cover" />
        </Parallax></div>
      )}

      <section className="wrap pb-24 md:pb-32" aria-label={`What ${s.name.toLowerCase()} includes`}>
        {s.sections.map((sec) => (
          <Reveal key={sec.title}>
            <div className="grid gap-5 border-t border-rule py-10 md:grid-cols-12 md:py-14">
              <h2 className="display text-2xl md:col-span-5 md:text-4xl">{sec.title}</h2>
              <div className="md:col-span-6 md:col-start-7">
                {sec.body && <p className="max-w-[38rem]">{sec.body}</p>}
                {sec.items && (
                  <ul className={`columns-1 gap-10 sm:columns-2 ${sec.body ? 'mt-6' : ''}`}>
                    {sec.items.map((it) => (
                      <li key={it} className="break-inside-avoid border-b border-rule py-2.5 text-[0.98rem]">
                        {it}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </Reveal>
        ))}
      </section>

      <section className="border-t border-rule">
        <Link to={`/services/${next.slug}`} className="wrap group flex flex-col gap-2 py-14 md:py-20">
          <span className="text-[0.8rem] font-medium uppercase tracking-[0.25em] text-green">Next service</span>
          <span className="display link-arrow text-4xl md:text-6xl">
            <span className="group-hover:underline decoration-2 underline-offset-[0.12em]">{next.name}</span>
            <span className="arrow" aria-hidden="true">→</span>
          </span>
        </Link>
      </section>

      <ContactBand />
    </>
  )
}
