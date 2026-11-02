import { firm } from '../content'
import { ClipReveal, Parallax, Picture, Reveal, SplitText } from '../components/Motion'
import LocationGraphic from '../components/LocationGraphic'
import { EnquirySection, HoursBand, HoursTable } from '../components/Sections'

const mapsUrl =
  'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent('Empire Edge, Gotri - Vasna Road, Near Nilambar Circle, Vadodara, Gujarat 390007')

export default function Contact() {
  return (
    <>
      <EnquirySection asPageHeading />
      <HoursBand />

      <section aria-labelledby="ways" className="wrap grid gap-6 py-20 md:grid-cols-12 md:py-28">
        <h2 id="ways" className="sr-only">Ways to reach us</h2>
        <Reveal className="md:col-span-7">
          <a href={firm.phoneHref} className="group block">
            <ClipReveal className="aspect-[4/3]">
              <Picture img={{ src: '/images/contact-blocks', alt: 'Wooden blocks showing phone, email and letter symbols', w: 940, h: 788 }} widths={[640, 940]} sizes="(min-width: 768px) 58vw, 100vw" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
            </ClipReveal>
            <span className="mt-4 flex flex-wrap items-baseline justify-between gap-4">
              <span className="display text-4xl md:text-5xl">Phone / WhatsApp</span>
              <span className="link-arrow font-semibold text-green">{firm.phoneDisplay} <span className="arrow" aria-hidden="true">→</span></span>
            </span>
          </a>
        </Reveal>
        <Reveal delay={0.1} className="md:col-span-4 md:col-start-9 md:mt-32">
          <a href={`mailto:${firm.email}`} className="group block">
            <Parallax className="aspect-[4/5]" amount={10}>
              <Picture img={{ src: '/images/contact-mail', alt: 'Cupped hands holding a glowing envelope and phone symbol', w: 940, h: 788 }} widths={[640, 940]} sizes="(min-width: 768px) 33vw, 100vw" className="h-full w-full object-cover" />
            </Parallax>
            <span className="mt-4 block">
              <span className="display block text-4xl md:text-5xl">Email</span>
              <span className="link-arrow mt-1 break-all font-semibold text-green">{firm.email} <span className="arrow" aria-hidden="true">→</span></span>
            </span>
          </a>
        </Reveal>
      </section>

      <section aria-labelledby="hours-tz" className="wrap pb-20 md:pb-28">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <SplitText id="hours-tz" text="Our hours in your *time zone*" className="display text-4xl md:text-6xl" />
          </div>
          <div className="min-w-0 md:col-span-7">
            <HoursTable />
          </div>
        </div>
      </section>

      <section aria-labelledby="find-us" className="bg-green-ink text-paper">
        <div className="wrap grid gap-10 py-20 md:grid-cols-12 md:py-28">
          <div className="md:col-span-4">
            <p className="eyebrow text-lime">Office</p>
            <SplitText id="find-us" text="Find the *office.*" className="display mt-4 text-6xl md:text-8xl [&_.text-green]:text-lime" />
            <address className="mt-8 text-xl not-italic leading-snug">
              {firm.address.map((l) => <span key={l} className="block">{l}</span>)}
            </address>
            <a href={mapsUrl} target="_blank" rel="noopener noreferrer" className="link-arrow mt-8 bg-lime px-5 py-3 font-semibold text-ink">
              Open in Google Maps <span className="arrow" aria-hidden="true">→</span>
            </a>
          </div>
          <div className="md:col-span-8">
            <LocationGraphic />
          </div>
        </div>
      </section>
    </>
  )
}
