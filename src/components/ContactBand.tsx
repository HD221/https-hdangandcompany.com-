import { firm } from '../content'
import { Reveal } from './Motion'

export default function ContactBand({ heading = 'Tell us what your business needs.' }: { heading?: string }) {
  return (
    <section className="bg-green text-paper" aria-labelledby="contact-band">
      <div className="wrap grid gap-12 py-20 md:grid-cols-12 md:py-28">
        <Reveal className="md:col-span-7">
          <h2 id="contact-band" className="display text-[2.6rem] md:text-7xl">
            {heading}
          </h2>
          <p className="mt-6 max-w-[34rem] text-paper/85">
            Estimates are free. Message us on WhatsApp with a time that suits you, or call the office directly.
          </p>
        </Reveal>
        <Reveal delay={0.1} className="self-end md:col-span-4 md:col-start-9">
          <a
            href={firm.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="link-arrow bg-lime px-6 py-4 text-lg font-semibold text-ink transition-transform duration-300 hover:-translate-y-0.5"
          >
            Book a call on WhatsApp <span className="arrow" aria-hidden="true">→</span>
          </a>
          <dl className="mt-10 space-y-4 text-[0.95rem]">
            <div>
              <dt className="text-paper/70">Phone</dt>
              <dd><a href={firm.phoneHref} className="text-xl hover:underline underline-offset-4">{firm.phoneDisplay}</a></dd>
            </div>
            <div>
              <dt className="text-paper/70">Email</dt>
              <dd><a href={`mailto:${firm.email}`} className="text-xl hover:underline underline-offset-4">{firm.email}</a></dd>
            </div>
          </dl>
        </Reveal>
      </div>
    </section>
  )
}
