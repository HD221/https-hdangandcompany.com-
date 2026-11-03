import { useMemo, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { faqGroups, firm } from '../content'
import { Reveal } from '../components/Motion'
import { CtaBand, FaqList, InsightsTeaser, PageHero } from '../components/Sections'

const slug = (t: string) => t.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')

export default function Faqs() {
  const [query, setQuery] = useState('')
  const [topic, setTopic] = useState('All')
  const reduce = useReducedMotion()

  const groups = useMemo(() => {
    const q = query.trim().toLowerCase()
    return faqGroups
      .filter((g) => topic === 'All' || g.topic === topic)
      .map((g) => ({ ...g, items: q ? g.items.filter((f) => (f.q + ' ' + f.a).toLowerCase().includes(q)) : g.items }))
      .filter((g) => g.items.length)
  }, [query, topic])

  return (
    <>
      <PageHero
        crumbs={[{ label: 'Home', to: '/' }, { label: 'FAQs' }]}
        eyebrow="Questions"
        title="Frequently asked *questions*"
        intro="How engagements work, how your data is handled, and what each service includes. Can't find your answer? Write to us."
      >
        <label className="block">
          <span className="eyebrow text-[0.65rem] text-lime">Search the questions</span>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="For example: GST, cap table, security"
            className="mt-2 block w-full border border-paper/30 bg-paper/10 px-4 py-3 text-paper placeholder:text-paper/60 focus:border-lime focus:outline-none"
          />
        </label>
      </PageHero>

      <div className="wrap grid gap-12 py-16 md:grid-cols-12 md:py-24">
        <aside className="md:col-span-3">
          <nav aria-label="Question topics" className="md:sticky md:top-28">
            <p className="eyebrow text-[0.68rem] text-green">Topics</p>
            <ul className="mt-4 flex flex-wrap gap-2 md:flex-col md:gap-0 md:divide-y md:divide-rule md:border-y md:border-rule">
              {['All', ...faqGroups.map((g) => g.topic)].map((t) => (
                <li key={t}>
                  <button
                    type="button"
                    aria-pressed={topic === t}
                    onClick={() => setTopic(t)}
                    className={`relative w-full border px-3 py-1.5 text-left text-[0.92rem] transition-colors md:border-0 md:px-0 md:py-3 ${
                      topic === t ? 'border-green bg-green text-paper md:bg-transparent md:font-semibold md:text-green' : 'border-rule hover:text-green'
                    }`}
                  >
                    {topic === t && (
                      <motion.span layoutId="faq-topic" className="absolute -left-4 inset-y-2 hidden w-1 bg-green md:block" transition={{ duration: reduce ? 0 : 0.3 }} aria-hidden="true" />
                    )}
                    {t === 'All' ? 'All questions' : t}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        <div className="space-y-14 md:col-span-9">
          <AnimatePresence mode="popLayout" initial={false}>
            {groups.map((g) => (
              <motion.section
                key={g.topic + query}
                aria-labelledby={`faq-${slug(g.topic)}`}
                layout={!reduce}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: reduce ? 0 : 0.35 }}
              >
                <h2 id={`faq-${slug(g.topic)}`} className="display text-3xl md:text-4xl">
                  {g.topic}
                </h2>
                <div className="mt-5">
                  <FaqList items={g.items} defaultOpen={query ? 0 : -1} />
                </div>
              </motion.section>
            ))}
          </AnimatePresence>
          {groups.length === 0 && (
            <Reveal>
              <p className="text-lg text-muted">
                No questions match "{query}". Write to{' '}
                <a href={`mailto:${firm.email}`} className="font-semibold text-green underline underline-offset-4">
                  {firm.email}
                </a>{' '}
                and we will answer directly.
              </p>
            </Reveal>
          )}
        </div>
      </div>

      <div className="bg-green/[0.06]">
        <InsightsTeaser />
      </div>
      <CtaBand />
    </>
  )
}
