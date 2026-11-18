// Renders every route to static HTML so each page ships with its own title,
// description and content. Also writes sitemap.xml and a 404 page.
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const dist = path.join(root, 'dist')
const ssrDir = path.join(root, 'dist-ssr')
const { render, pages, notFound, firm, services, articles, faqGroups, blogPublished } = await import(pathToFileURL(path.join(ssrDir, 'entry-server.js')).href)
const template = fs.readFileSync(path.join(dist, 'index.html'), 'utf8')
const esc = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')
const today = new Date().toISOString().slice(0, 10)
const U = (p) => firm.url + (p === '/' ? '/' : p)
const ORG = firm.url + '/#organization'
const PERSON = firm.url + '/#hritik-dang'
const SITE = firm.url + '/#website'
const IMAGE = `${firm.url}/images/about-meeting-940.jpg`
const LOGO = `${firm.url}/images/logo-green.webp`
const published = Object.fromEntries(articles.filter((a) => a.body).map((a) => [`/blogs/${a.slug}`, a]))
const svcByPath = Object.fromEntries(services.map((s) => [`/services/${s.slug}`, s]))
const allFaqs = faqGroups.flatMap((g) => g.items)

// ---- Structured data (schema.org). No ratings, reviews or prices: ICAI does not permit them.
const person = {
  '@type': 'Person',
  '@id': PERSON,
  name: 'CA Hritik Dang',
  jobTitle: 'Proprietor, Chartered Accountant',
  worksFor: { '@id': ORG },
  url: `${firm.url}/the-firm`,
  memberOf: { '@type': 'Organization', name: 'The Institute of Chartered Accountants of India', url: 'https://www.icai.org' },
  hasCredential: { '@type': 'EducationalOccupationalCredential', credentialCategory: 'Chartered Accountant', recognizedBy: { '@type': 'Organization', name: 'The Institute of Chartered Accountants of India' }, identifier: `ICAI M. No. ${firm.membership}` },
}
const organization = {
  '@type': ['AccountingService', 'ProfessionalService'],
  '@id': ORG,
  name: 'H Dang and Company, Chartered Accountants',
  alternateName: 'H Dang and Company',
  url: firm.url + '/',
  logo: { '@type': 'ImageObject', url: LOGO, width: 560, height: 95 },
  image: IMAGE,
  description: 'ICAI-registered firm of Chartered Accountants in India providing virtual CFO, FP&A, virtual bookkeeping, fundraising readiness, cap table management and feasibility studies to growing businesses in India and worldwide.',
  telephone: '+91-8849220024',
  email: firm.email,
  identifier: { '@type': 'PropertyValue', propertyID: 'ICAI Firm Registration Number', value: firm.frn },
  foundingDate: firm.established,
  founder: { '@id': PERSON },
  employee: { '@id': PERSON },
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Unit 509, Empire Edge, Gotri - Vasna Road, Near Nilambar Circle',
    addressLocality: 'Vadodara',
    postalCode: '390007',
    addressRegion: 'Gujarat',
    addressCountry: 'IN',
  },
  openingHoursSpecification: { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '10:00', closes: '02:30' },
  areaServed: [{ '@type': 'Country', name: 'India' }, { '@type': 'Place', name: 'Worldwide' }],
  knowsAbout: ['Virtual CFO', 'Financial planning and analysis (FP&A)', 'Bookkeeping', 'Management reporting', 'Cash flow forecasting', 'Fundraising readiness', 'Financial modelling', 'Cap table management', 'Feasibility studies', 'QuickBooks Online', 'Xero', 'Zoho Books', 'Tally'],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Services',
    itemListElement: services.map((s) => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name: s.name, url: U(`/services/${s.slug}`) } })),
  },
  sameAs: [firm.linkedin],
}
const website = { '@type': 'WebSite', '@id': SITE, url: firm.url + '/', name: 'H Dang and Company', publisher: { '@id': ORG }, inLanguage: 'en-IN' }
const faqPage = (items, url) => ({ '@type': 'FAQPage', '@id': url + '#faq', mainEntity: items.map((x) => ({ '@type': 'Question', name: x.q, acceptedAnswer: { '@type': 'Answer', text: x.a } })) })

function crumbs(meta) {
  if (meta.path === '/') return null
  const items = [{ name: 'Home', url: U('/') }]
  if (meta.path.startsWith('/services/')) items.push({ name: 'Services', url: U('/services') })
  if (meta.path.startsWith('/blogs/')) items.push({ name: 'Blogs', url: U('/blogs') })
  items.push({ name: meta.title.split(' | ')[0], url: U(meta.path) })
  return { '@type': 'BreadcrumbList', itemListElement: items.map((x, i) => ({ '@type': 'ListItem', position: i + 1, name: x.name, item: x.url })) }
}

function graph(meta) {
  const url = U(meta.path)
  const g = [organization, website]
  const art = published[meta.path]
  const svc = svcByPath[meta.path]
  const pageType = { '/the-firm': 'AboutPage', '/contact': 'ContactPage', '/faqs': 'FAQPage', '/blogs': 'CollectionPage' }[meta.path] ?? 'WebPage'
  const bc = crumbs(meta)
  const page = { '@type': pageType === 'FAQPage' ? 'WebPage' : pageType, '@id': url + '#webpage', url, name: meta.title, description: meta.description, isPartOf: { '@id': SITE }, about: { '@id': ORG }, inLanguage: 'en-IN', primaryImageOfPage: IMAGE }
  if (bc) page.breadcrumb = bc
  g.push(page)
  if (meta.path === '/the-firm' || art) g.push(person)
  if (svc) {
    g.push({ '@type': 'Service', '@id': url + '#service', name: svc.name, serviceType: svc.name, description: svc.metaDescription, url, provider: { '@id': ORG }, areaServed: organization.areaServed })
    if (svc.faq?.length) g.push(faqPage(svc.faq, url))
  }
  if (meta.path === '/faqs') g.push(faqPage(allFaqs, url))
  if (art) {
    g.push({
      '@type': 'BlogPosting',
      '@id': url + '#article',
      headline: art.title,
      description: art.summary,
      articleSection: art.category,
      datePublished: blogPublished,
      dateModified: blogPublished,
      author: { '@id': PERSON },
      publisher: { '@id': ORG },
      mainEntityOfPage: { '@id': url + '#webpage' },
      image: IMAGE,
      inLanguage: 'en-IN',
      timeRequired: `PT${art.minutes}M`,
      ...(art.keyPoints ? { abstract: art.keyPoints.join(' ') } : {}),
    })
  }
  if (meta.path === '/blogs') {
    g.push({ '@type': 'Blog', '@id': url + '#blog', name: 'H Dang and Company blog', url, publisher: { '@id': ORG }, blogPost: Object.keys(published).map((p) => ({ '@type': 'BlogPosting', headline: published[p].title, url: U(p), datePublished: blogPublished, author: { '@id': PERSON } })) })
  }
  return { '@context': 'https://schema.org', '@graph': g }
}

function head(meta, canonical) {
  const url = U(canonical || meta.path)
  const art = published[meta.path]
  return [
    `<title>${esc(meta.title)}</title>`,
    `<meta name="description" content="${esc(meta.description)}" />`,
    canonical ? `<link rel="canonical" href="${url}" />` : '<meta name="robots" content="noindex" />',
    canonical ? '<meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />' : '',
    `<link rel="alternate" hreflang="en" href="${url}" />`,
    `<link rel="alternate" hreflang="x-default" href="${url}" />`,
    `<meta name="author" content="CA Hritik Dang" />`,
    `<meta property="og:type" content="${art ? 'article' : 'website'}" />`,
    `<meta property="og:locale" content="en_IN" />`,
    `<meta property="og:site_name" content="H Dang and Company" />`,
    `<meta property="og:title" content="${esc(meta.title)}" />`,
    `<meta property="og:description" content="${esc(meta.description)}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:image" content="${IMAGE}" />`,
    `<meta property="og:image:width" content="940" />`,
    `<meta property="og:image:height" content="788" />`,
    `<meta property="og:image:alt" content="H Dang and Company, Chartered Accountants" />`,
    art ? `<meta property="article:published_time" content="${blogPublished}" />` : '',
    art ? `<meta property="article:author" content="CA Hritik Dang" />` : '',
    art ? `<meta property="article:section" content="${esc(art.category)}" />` : '',
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${esc(meta.title)}" />`,
    `<meta name="twitter:description" content="${esc(meta.description)}" />`,
    `<meta name="twitter:image" content="${IMAGE}" />`,
    canonical ? `<script type="application/ld+json">${JSON.stringify(graph(meta)).replace(/</g, '\\u003c')}</script>` : '',
  ].filter(Boolean).join('\n    ')
}

for (const meta of pages) {
  const html = template.replace('<!--head-->', head(meta, meta.path === '/' ? '/' : meta.path)).replace('<!--app-->', render(meta.path))
  const file = meta.path === '/' ? path.join(dist, 'index.html') : path.join(dist, meta.path + '.html')
  fs.mkdirSync(path.dirname(file), { recursive: true })
  fs.writeFileSync(file, html)
  console.log('prerendered', meta.path)
}

fs.writeFileSync(
  path.join(dist, '404.html'),
  template.replace('<!--head-->', head(notFound, '')).replace('<!--app-->', render('/404')),
)

fs.writeFileSync(
  path.join(dist, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    pages.map((p) => `  <url><loc>${U(p.path)}</loc><lastmod>${published[p.path] ? blogPublished : today}</lastmod></url>`).join('\n') +
    `\n</urlset>\n`,
)

// ---- llms.txt / llms-full.txt: plain-text guides for AI search engines (GEO)
const svcLines = services.map((s) => `- [${s.name}](${U(`/services/${s.slug}`)}): ${s.short}`).join('\n')
const artLines = Object.entries(published).map(([p, a]) => `- [${a.title}](${U(p)}): ${a.summary}`).join('\n')
const facts = [
  `- Firm: H Dang and Company, Chartered Accountants`,
  `- Registered with: The Institute of Chartered Accountants of India (ICAI), Firm Registration Number (FRN) ${firm.frn}`,
  `- Proprietor: CA Hritik Dang (ICAI Membership No. ${firm.membership})`,
  `- Established: ${firm.established}`,
  `- Office: ${firm.address.join(', ')}`,
  `- Serves: businesses in India and worldwide`,
  `- Working hours: ${firm.hours}`,
  `- Email: ${firm.email}`,
  `- Website: ${firm.url}`,
].join('\n')
const intro = `> H Dang and Company is an ICAI-registered firm of Chartered Accountants in India (FRN ${firm.frn}) that works as an outsourced finance function for growing businesses: virtual CFO, FP&A, virtual bookkeeping and fundraising readiness, plus cap table management and feasibility studies.`
const note = `Note: As per ICAI rules, Chartered Accountants are not permitted to solicit work or advertise. This information is provided for general reference only and is not professional advice.`
fs.writeFileSync(
  path.join(dist, 'llms.txt'),
  `# H Dang and Company, Chartered Accountants\n\n${intro}\n\n## Key facts\n${facts}\n\n## Services\n${svcLines}\n\n## Guides\n${artLines}\n\n## Pages\n- [How we work](${U('/how-we-work')}): engagement models, monthly calendar and working hours by time zone\n- [Industries](${U('/industries')}): sectors the firm works with\n- [The firm](${U('/the-firm')}): registration details and milestones\n- [Frequently asked questions](${U('/faqs')})\n- [Full text for AI tools](${U('/llms-full.txt')})\n\n${note}\n`,
)
const block = (b) => (b.type === 'h2' ? `\n### ${b.text}\n` : b.type === 'list' ? b.items.map((i) => `- ${i}`).join('\n') : b.type === 'quote' ? `> ${b.text}` : b.text)
const fullSvc = services.map((s) => [`## ${s.name}`, `URL: ${U(`/services/${s.slug}`)}`, '', s.intro, '', ...s.features.map((f) => `- ${f.title}: ${f.text}`), s.suitedTo ? `\nSuited to: ${s.suitedTo}` : '', s.receive ? `You receive: ${s.receive}` : '', s.platforms ? `Platforms: ${s.platforms}` : '', ...(s.faq ?? []).map((x) => `\nQ: ${x.q}\nA: ${x.a}`)].filter((x) => x !== '').join('\n')).join('\n\n')
const fullFaq = faqGroups.map((g) => `## ${g.topic}\n` + g.items.map((x) => `\nQ: ${x.q}\nA: ${x.a}`).join('\n')).join('\n\n')
const fullArt = Object.entries(published).map(([p, a]) => `## ${a.title}\nURL: ${U(p)}\nAuthor: ${a.author}, Chartered Accountant · Published ${blogPublished}\n\n${a.summary}\n\n${(a.keyPoints ?? []).map((k) => `- ${k}`).join('\n')}\n\n${a.body.map(block).join('\n\n')}`).join('\n\n---\n\n')
fs.writeFileSync(
  path.join(dist, 'llms-full.txt'),
  `# H Dang and Company, Chartered Accountants: full reference\n\n${intro}\n\n## Key facts\n${facts}\n\n# Services\n\n${fullSvc}\n\n# Frequently asked questions\n\n${fullFaq}\n\n# Guides\n\n${fullArt}\n\n${note}\n`,
)
fs.rmSync(ssrDir, { recursive: true, force: true })
console.log('sitemap.xml and 404.html written')
