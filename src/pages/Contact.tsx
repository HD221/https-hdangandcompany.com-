import { useState, type FormEvent } from 'react'
import { firm, services } from '../content'
import { ClipReveal, Magnetic, Parallax, Picture, Reveal, SplitText } from '../components/Motion'
import LocationGraphic from '../components/LocationGraphic'

const mapsUrl = 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent('Empire Edge, Gotri - Vasna Road, Near Nilambar Circle, Vadodara, Gujarat 390007')

function Field({ label, name, type = 'text', required, autoComplete }: { label: string; name: string; type?: string; required?: boolean; autoComplete?: string }) {
  return (
    <label className="block">
      <span className="text-[0.9rem] text-muted">
        {label}
        {required ? '' : ' (optional)'}
      </span>
      <input
        name={name}
        type={type}
        required={required}
        autoComplete={autoComplete}
        className="mt-1 block w-full border-0 border-b-2 border-ink/25 bg-transparent px-0 py-2.5 text-lg transition-colors duration-300 focus:border-green focus:outline-none"
      />
    </label>
  )
}

export default function Contact() {
  const [state, setState] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setState('sending')
    const data = new FormData(e.currentTarget)
    try {
      const res = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(data as unknown as Record<string, string>).toString(),
      })
      if (!res.ok) throw new Error(String(res.status))
      setState('sent')
    } catch {
      setState('error')
    }
  }

  return (
    <>
    <section className="wrap grid gap-16 pb-24 pt-14 md:grid-cols-12 md:pb-32 md:pt-24">
      <div className="md:col-span-5">
        <p className="eyebrow text-green">Contact</p>
        <SplitText as="h1" onMount text="Say *hello.*" className="display mt-6 text-[4.5rem] sm:text-8xl lg:text-[10rem]" />

        <dl className="mt-14 space-y-8">
          <div>
            <dt className="text-[0.9rem] text-muted">Phone and WhatsApp</dt>
            <dd className="mt-1 display text-4xl">
              <a href={firm.phoneHref} className="hover:underline underline-offset-4">{firm.phoneDisplay}</a>
            </dd>
            <dd className="mt-2">
              <a href={firm.whatsapp} target="_blank" rel="noopener noreferrer" className="link-arrow font-medium text-green underline underline-offset-[0.3em]">
                <span>Message on WhatsApp</span><span className="arrow" aria-hidden="true">→</span>
              </a>
            </dd>
          </div>
          <div>
            <dt className="text-[0.9rem] text-muted">Email</dt>
            <dd className="mt-1 text-2xl">
              <a href={`mailto:${firm.email}`} className="break-all hover:underline underline-offset-4">{firm.email}</a>
            </dd>
          </div>
          <div>
            <dt className="text-[0.9rem] text-muted">Office</dt>
            <dd className="mt-1 text-xl leading-snug">
              <address className="not-italic">
                {firm.address.map((l) => <span key={l} className="block">{l}</span>)}
              </address>
            </dd>
            <dd className="mt-2">
              <a href={mapsUrl} target="_blank" rel="noopener noreferrer" className="link-arrow font-medium text-green underline underline-offset-[0.3em]">
                <span>Open in Google Maps</span><span className="arrow" aria-hidden="true">→</span>
              </a>
            </dd>
          </div>
          <div>
            <dt className="text-[0.9rem] text-muted">Elsewhere</dt>
            <dd className="mt-1">
              <a href={firm.linkedin} target="_blank" rel="noopener noreferrer" className="link-arrow underline underline-offset-[0.3em]">
                <span>LinkedIn</span><span className="arrow" aria-hidden="true">→</span>
              </a>
            </dd>
          </div>
        </dl>
      </div>

      <div className="md:col-span-6 md:col-start-7 md:pt-48">
        <h2 className="display text-4xl md:text-5xl">Or write to us</h2>
        {state === 'sent' ? (
          <p role="status" className="mt-10 border-t border-green pt-6 text-xl">
            Thank you. Your message has reached us and we will be in touch.
          </p>
        ) : (
          <form name="contact" method="POST" data-netlify="true" netlify-honeypot="company-website" onSubmit={submit} className="mt-10 space-y-8">
            <input type="hidden" name="form-name" value="contact" />
            <p className="hidden">
              <label>Leave this empty <input name="company-website" tabIndex={-1} autoComplete="off" /></label>
            </p>
            <Field label="Name" name="name" required autoComplete="name" />
            <div className="grid gap-8 sm:grid-cols-2">
              <Field label="Email" name="email" type="email" required autoComplete="email" />
              <Field label="Phone" name="phone" type="tel" autoComplete="tel" />
            </div>
            <label className="block">
              <span className="text-[0.9rem] text-muted">What do you need help with?</span>
              <select name="topic" className="mt-1 block w-full border-0 border-b border-ink/40 bg-transparent px-0 py-2.5 text-lg focus:border-green focus:outline-none">
                {services.map((s) => <option key={s.slug}>{s.name}</option>)}
                <option>Something else</option>
              </select>
            </label>
            <label className="block">
              <span className="text-[0.9rem] text-muted">Message</span>
              <textarea name="message" rows={5} required className="mt-1 block w-full resize-y border-0 border-b border-ink/40 bg-transparent px-0 py-2.5 text-lg focus:border-green focus:outline-none" />
            </label>
            <Magnetic>
            <button
              type="submit"
              disabled={state === 'sending'}
              className="link-arrow bg-green px-6 py-4 text-lg font-medium text-paper transition-colors duration-300 hover:bg-green-deep disabled:opacity-60"
            >
              {state === 'sending' ? 'Sending' : 'Send message'} <span className="arrow" aria-hidden="true">→</span>
            </button>
            </Magnetic>
            {state === 'error' && (
              <p role="alert" className="text-[0.95rem]">
                That did not go through. Please email {firm.email} or call {firm.phoneDisplay}.
              </p>
            )}
          </form>
        )}
      </div>
    </section>

    <section aria-labelledby="ways" className="wrap grid gap-6 pb-24 md:grid-cols-12 md:pb-32">
      <h2 id="ways" className="sr-only">Ways to reach us</h2>
      <Reveal className="md:col-span-7">
        <a href={firm.phoneHref} className="group block">
          <ClipReveal className="aspect-[4/3]">
            <Picture img={{ src: '/images/contact-blocks', alt: 'Wooden blocks showing phone, email and letter symbols', w: 940, h: 788 }} widths={[640, 940]} sizes="(min-width: 768px) 58vw, 100vw" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
          </ClipReveal>
          <span className="mt-4 flex items-baseline justify-between gap-4">
            <span className="display text-4xl md:text-5xl">Call or WhatsApp</span>
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
            <span className="display block text-4xl md:text-5xl">Write to us</span>
            <span className="link-arrow mt-1 break-all font-semibold text-green">{firm.email} <span className="arrow" aria-hidden="true">→</span></span>
          </span>
        </a>
      </Reveal>
    </section>

    <section aria-labelledby="find-us" className="bg-green text-paper">
      <div className="wrap grid gap-10 py-20 md:grid-cols-12 md:py-28">
        <div className="md:col-span-4">
          <p className="eyebrow text-lime">Visit</p>
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
