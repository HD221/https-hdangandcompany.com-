import { founder } from '../content'
import { Parallax, Picture, Reveal } from '../components/Motion'
import ContactBand from '../components/ContactBand'

const office = { src: '/images/office', alt: 'An open plan office with rows of desks and chairs', w: 940, h: 788 }

export default function About() {
  return (
    <>
      <section className="wrap pb-16 pt-14 md:pb-28 md:pt-24">
        <p className="mb-8 text-[0.8rem] font-medium uppercase tracking-[0.25em] text-green">About</p>
        <h1 className="display max-w-[18ch] text-[2.9rem] sm:text-6xl lg:text-[5.6rem]">
          Run your business. We will look after the finances.
        </h1>
        <div className="mt-12 grid gap-8 md:mt-20 md:grid-cols-12">
          <p className="text-xl md:col-span-6 md:col-start-6 md:text-2xl md:leading-snug">
            H Dang and Company is a professionally managed sole proprietorship. We offer data analytics, financial advisory and technology led accounting services, and we aim to stay with clients for the long term so we are always easy to reach.
          </p>
        </div>
      </section>

      <section aria-labelledby="founder" className="border-t border-rule">
        <div className="wrap grid gap-10 py-20 md:grid-cols-12 md:py-28">
          <div className="md:col-span-4">
            <Picture img={founder.image} widths={[480, 960]} sizes="(min-width: 768px) 32vw, 100vw" className="aspect-[4/5] w-full object-cover object-top" />
          </div>
          <Reveal className="md:col-span-6 md:col-start-7 md:pt-6">
            <h2 id="founder" className="display text-4xl md:text-6xl">{founder.name}</h2>
            <p className="mt-2 font-serif text-2xl italic text-green">{founder.role}</p>
            {founder.bio.map((p) => (
              <p key={p} className="mt-6 max-w-[36rem]">{p}</p>
            ))}
          </Reveal>
        </div>
      </section>

      <div className="wrap"><Parallax className="aspect-[16/10] md:aspect-[21/8]">
        <Picture img={office} widths={[640, 940]} sizes="100vw" className="h-full w-full object-cover" />
      </Parallax></div>

      <section className="wrap grid gap-14 py-20 md:grid-cols-12 md:py-28" aria-label="Vision and mission">
        <Reveal className="md:col-span-5">
          <h2 className="font-serif text-4xl italic text-green md:text-5xl">Vision</h2>
          <p className="mt-6">
            To help our clients reach their financial goals, and to make sure the work we do solves real financial problems so their businesses can keep growing.
          </p>
        </Reveal>
        <Reveal delay={0.1} className="md:col-span-5 md:col-start-8 md:mt-24">
          <h2 className="font-serif text-4xl italic text-green md:text-5xl">Mission</h2>
          <p className="mt-6">
            To take financial problems off our clients' desks so they can focus on running their businesses. We do it by building a financial plan with each client and providing the services that plan needs.
          </p>
        </Reveal>
      </section>

      <ContactBand />
    </>
  )
}
