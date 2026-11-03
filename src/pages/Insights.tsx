import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { articles, insightCategories, type Article } from '../content'
import { Reveal } from '../components/Motion'
import { PageHero } from '../components/Sections'

function Card({ a }: { a: Article }) {
  const live = Boolean(a.body)
  const inner = (
    <>
      <span className="eyebrow text-[0.65rem] text-green">{a.category}</span>
      <span className={`display mt-3 block text-2xl md:text-3xl ${live ? 'group-hover:text-green' : ''}`}>{a.title}</span>
      <span className="mt-3 block text-[0.95rem] text-muted">{a.summary}</span>
      <span className="mt-4 block text-[0.85rem] text-muted">
        {a.minutes} min read{live ? '' : ' · coming soon'}
      </span>
    </>
  )
  return live ? (
    <Link to={`/blogs/${a.slug}`} className="group block border-t-2 border-green-ink pt-5">
      {inner}
    </Link>
  ) : (
    <div className="border-t-2 border-green-ink/40 pt-5">{inner}</div>
  )
}

function Subscribe() {
  const [state, setState] = useState<'idle' | 'sent' | 'error'>('idle')
  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    try {
      const res = await fetch(import.meta.env.VITE_FORM_ENDPOINT ?? '/form.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(new FormData(e.currentTarget) as unknown as Record<string, string>).toString(),
      })
      setState(res.ok ? 'sent' : 'error')
    } catch {
      setState('error')
    }
  }
  return (
    <section aria-labelledby="subscribe" className="wrap pb-24">
      <div className="grid gap-6 bg-green/[0.07] p-8 md:grid-cols-2 md:items-center md:p-12">
        <div>
          <h2 id="subscribe" className="display text-3xl md:text-4xl">Subscribe to updates</h2>
          <p className="mt-2 text-muted">New guides on bookkeeping, FP&A and finance operations, by email. Unsubscribe at any time.</p>
        </div>
        {state === 'sent' ? (
          <p role="status" className="font-semibold text-green">Thank you. You are subscribed.</p>
        ) : (
          <form name="subscribe" method="POST" data-netlify="true" onSubmit={submit} className="flex flex-col gap-3 sm:flex-row sm:items-end">
            <input type="hidden" name="form-name" value="subscribe" />
            <label className="block flex-1">
              <span className="text-[0.88rem] font-medium">Email address</span>
              <input name="email" type="email" required autoComplete="email" className="mt-1.5 block w-full border border-ink/20 bg-white px-3 py-2.5 focus:border-green focus:outline-none" />
            </label>
            <button type="submit" className="bg-green-ink px-6 py-2.5 font-semibold text-paper transition-colors hover:bg-green">
              Subscribe
            </button>
          </form>
        )}
        {state === 'error' && <p role="alert" className="text-[0.92rem] md:col-span-2">That did not go through. Please try again later.</p>}
      </div>
    </section>
  )
}

export default function Insights() {
  const [cat, setCat] = useState('All')
  const reduce = useReducedMotion()
  const featured = articles.find((a) => a.featured)!
  const list = articles.filter((a) => !a.featured && (cat === 'All' || a.category === cat || (cat === 'FP&A' && a.category === 'FP&A')))
  return (
    <>
      <PageHero
        crumbs={[{ label: 'Home', to: '/' }, { label: 'Blogs' }]}
        title="*Blogs*"
        intro="Practical guides on finance operations, planning and fundraising for growing businesses, written by our team."
      >
        <ul className="flex flex-wrap gap-2" aria-label="Filter articles by topic">
          {['All', ...insightCategories].map((c) => (
            <li key={c}>
              <button
                type="button"
                aria-pressed={cat === c}
                onClick={() => setCat(c)}
                className={`border px-3 py-1.5 text-[0.85rem] transition-colors ${cat === c ? 'border-lime bg-lime text-ink' : 'border-paper/40 text-paper hover:border-lime'}`}
              >
                {c}
              </button>
            </li>
          ))}
        </ul>
      </PageHero>

      <section className="wrap py-16 md:py-20" aria-label="Featured article">
        <Reveal>
          <Link to={`/blogs/${featured.slug}`} className="group grid border border-rule md:grid-cols-2">
            <div className="flex min-h-[18rem] flex-col bg-green-ink p-8 text-paper md:p-12">
              <span className="eyebrow text-[0.68rem] text-lime">Featured · {featured.category}</span>
              <span className="display mt-auto pt-10 text-4xl transition-colors group-hover:text-lime md:text-5xl">{featured.title}</span>
              <span className="mt-6 text-[0.9rem] text-lime">{featured.minutes} min read</span>
            </div>
            <div className="flex flex-col justify-center p-8 md:p-12">
              <p className="text-lg text-muted">
                A financial model is usually the first thing an investor's analyst opens after the deck. This guide covers the assumptions, structure and checks that make a model credible in diligence, and the common mistakes that undermine it.
              </p>
              <span className="link-arrow mt-6 font-semibold text-green">
                Read the article <span className="arrow" aria-hidden="true">→</span>
              </span>
            </div>
          </Link>
        </Reveal>
      </section>

      <section className="wrap pb-20" aria-label="All articles">
        <motion.ul layout className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {list.map((a) => (
              <motion.li
                key={a.slug}
                layout={!reduce}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: reduce ? 0 : 0.35 }}
              >
                <Card a={a} />
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>
        {list.length === 0 && <p className="text-muted">No other articles in this topic yet.</p>}
      </section>
      <Subscribe />
    </>
  )
}
