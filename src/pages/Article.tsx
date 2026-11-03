import { Link, useParams } from 'react-router-dom'
import { motion, useScroll, useSpring } from 'framer-motion'
import { articles, firm } from '../content'
import { Reveal, SplitText } from '../components/Motion'
import NotFound from './NotFound'

export default function Article() {
  const { slug } = useParams()
  const a = articles.find((x) => x.slug === slug && x.body)
  const { scrollYProgress } = useScroll()
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 30 })
  if (!a) return <NotFound />
  const others = articles.filter((x) => x.slug !== a.slug)
  const related = [...others.filter((x) => x.category === a.category), ...others.filter((x) => x.category !== a.category)].slice(0, 3)

  return (
    <>
      <header className="bg-green/[0.06]">
        <div className="mx-auto max-w-[46rem] px-4 py-16 md:py-24">
          <nav aria-label="Breadcrumb" className="text-[0.85rem] text-muted">
            <Link to="/" className="underline underline-offset-4">Home</Link> / <Link to="/blogs" className="underline underline-offset-4">Blogs</Link> / {a.category}
          </nav>
          <p className="eyebrow mt-6 text-[0.7rem] text-green">{a.category}</p>
          <SplitText as="h1" onMount text={a.title} className="display mt-4 text-5xl md:text-6xl" />
          <p className="mt-5 text-lg text-muted">{a.summary}</p>
          <p className="mt-6 border-t border-rule pt-4 text-[0.9rem] text-muted">
            {a.author} · {a.minutes} min read
          </p>
        </div>
      </header>

      <div className="relative mx-auto max-w-[46rem] px-4 py-14 md:py-20">
        <motion.div aria-hidden="true" className="absolute -left-6 top-14 hidden h-[calc(100%-7rem)] w-[3px] origin-top bg-lime lg:block" style={{ scaleY }} />
        {a.keyPoints && (
          <Reveal>
            <aside className="border-l-4 border-green bg-green/[0.06] p-6 md:p-8">
              <p className="eyebrow text-[0.68rem] text-green">Key points</p>
              <ul className="mt-4 list-disc space-y-2 pl-5">
                {a.keyPoints.map((k) => <li key={k}>{k}</li>)}
              </ul>
            </aside>
          </Reveal>
        )}
        <div className="mt-10 space-y-5 text-[1.06rem] leading-[1.8]">
          {a.body!.map((b, i) => {
            if (b.type === 'h2') return <h2 key={i} className="display pt-6 text-3xl md:text-4xl">{b.text}</h2>
            if (b.type === 'quote')
              return (
                <blockquote key={i} className="my-8 border-y-2 border-green-ink py-6 font-serif text-3xl leading-tight text-green-ink">
                  {b.text}
                </blockquote>
              )
            if (b.type === 'list')
              return (
                <ul key={i} className="list-disc space-y-1.5 pl-5">
                  {b.items.map((it) => <li key={it}>{it}</li>)}
                </ul>
              )
            return <p key={i}>{b.text}</p>
          })}
        </div>
        <p className="mt-12 border-t border-rule pt-5 text-[0.9rem] text-muted">
          This article is for general information only and is not professional advice. For questions, write to{' '}
          <a href={`mailto:${firm.email}`} className="text-green underline underline-offset-4">{firm.email}</a>.
        </p>
      </div>

      <section aria-labelledby="related" className="bg-green/[0.06]">
        <div className="wrap py-16">
          <p id="related" className="eyebrow text-green">Related articles</p>
          <ul className="mt-8 grid gap-8 md:grid-cols-3">
            {related.map((r) => (
              <li key={r.slug} className="border-t-2 border-green-ink pt-4">
                <Link to={`/blogs/${r.slug}`} className="group block">
                  <span className="eyebrow text-[0.65rem] text-green">{r.category}</span>
                  <span className="display mt-2 block text-2xl transition-colors group-hover:text-green">{r.title}</span>
                  <span className="link-arrow mt-1 text-[0.85rem] text-muted">
                    {r.minutes} min read <span className="arrow" aria-hidden="true">→</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  )
}
