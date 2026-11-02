import { Parallax, Picture } from '../components/Motion'
import { CtaBand, IndustriesGrid, PageHero } from '../components/Sections'

export default function Industries() {
  return (
    <>
      <PageHero
        crumbs={[{ label: 'Home', to: '/' }, { label: 'Industries' }]}
        eyebrow="Industries"
        title="Sectors we *work in*"
        intro="Accounting and reporting that reflect how each industry actually earns and spends."
      />
      <IndustriesGrid heading={false} />
      <div className="wrap grid gap-6 pt-20 md:grid-cols-3 md:pt-28">
        {[
          { src: '/images/about-analysis', alt: 'An accountant marking figures on a chart with a calculator beside him' },
          { src: '/images/about-desk', alt: 'A desk with charts, a keyboard and a magnifying glass' },
          { src: '/images/about-tower', alt: 'Glass office towers seen from below against a blue sky' },
        ].map((im, i) => (
          <Parallax key={im.src} className={`aspect-[4/5] ${i === 1 ? 'md:mt-16' : ''}`} amount={10}>
            <Picture img={{ ...im, w: 940, h: 788 }} widths={[640, 940]} sizes="(min-width: 768px) 33vw, 100vw" className="h-full w-full object-cover" />
          </Parallax>
        ))}
      </div>
      <CtaBand />
    </>
  )
}
