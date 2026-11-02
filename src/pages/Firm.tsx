import { faqs, firm } from '../content'
import { ClipReveal, Parallax, Picture, Reveal, ScrollHighlight } from '../components/Motion'
import { CtaBand, FactsRow, FaqSection, PageHero, PeopleAndClients } from '../components/Sections'

const img = (name: string, alt: string) => ({ src: `/images/${name}`, alt, w: 940, h: 788 })

export default function Firm() {
  return (
    <>
      <PageHero
        crumbs={[{ label: 'Home', to: '/' }, { label: 'The firm' }]}
        eyebrow="The firm"
        title="People and *clients*"
        intro="A Chartered Accountant-led finance team that keeps your books, plans your numbers and prepares you for investors."
      >
        <FactsRow light />
      </PageHero>

      <section className="wrap grid gap-10 py-20 md:grid-cols-12 md:py-28" aria-labelledby="proprietor">
        <ClipReveal className="aspect-[940/788] md:col-span-6">
          <Picture img={img('hritik-dang-desk', 'CA Hritik Dang seated at his office desk')} widths={[640, 940]} sizes="(min-width: 768px) 50vw, 100vw" className="h-full w-full object-cover" />
        </ClipReveal>
        <Reveal className="self-center md:col-span-5 md:col-start-8">
          <p className="eyebrow text-green">Proprietor</p>
          <h2 id="proprietor" className="display mt-4 text-5xl md:text-7xl">CA Hritik Dang</h2>
          <p className="mt-2 text-muted">B.Com, ACA · ICAI M. No. {firm.membership}</p>
          <ScrollHighlight
            text="A Chartered Accountant-led team of ten: FP&A analysts, senior and junior accountants, human resources and office administration."
            className="display mt-8 text-3xl leading-tight md:text-4xl"
          />
        </Reveal>
      </section>

      <PeopleAndClients heading={false} />

      <div className="wrap grid gap-6 py-20 md:grid-cols-12 md:py-28">
        <Parallax className="aspect-[4/3] md:col-span-7" amount={10}>
          <Picture img={img('about-team', 'Colleagues joining hands over a desk of charts')} widths={[640, 940]} sizes="(min-width: 768px) 58vw, 100vw" className="h-full w-full object-cover" />
        </Parallax>
        <Parallax className="aspect-[4/5] md:col-span-4 md:col-start-9 md:mt-24" amount={14}>
          <Picture img={img('about-laptop', 'Two people reviewing work on a laptop together')} widths={[640, 940]} sizes="(min-width: 768px) 33vw, 100vw" className="h-full w-full object-cover" />
        </Parallax>
      </div>

      <FaqSection items={faqs} />
      <CtaBand />
    </>
  )
}
