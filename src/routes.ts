import { articles, services } from './content'

export type Meta = { path: string; title: string; description: string }

const suffix = ' | H Dang and Company, Chartered Accountants'

export const pages: Meta[] = [
  {
    path: '/',
    title: 'H Dang and Company | Virtual CFO, FP&A and Fundraising Support',
    description:
      'Chartered Accountants in India serving clients worldwide: virtual CFO, FP&A, virtual bookkeeping and fundraising readiness for growing businesses.',
  },
  {
    path: '/services',
    title: 'Services' + suffix,
    description:
      'Four core services that work as your outsourced finance function, and two specialist services for growth and investment decisions.',
  },
  ...services.map((s) => ({ path: `/services/${s.slug}`, title: s.name + suffix, description: s.metaDescription })),
  {
    path: '/industries',
    title: 'Industries' + suffix,
    description: 'Accounting and reporting for startups and SaaS, e-commerce, real estate, distribution, professional services, hospitality, healthcare and manufacturing.',
  },
  {
    path: '/how-we-work',
    title: 'How we work' + suffix,
    description: 'From discovery call to a steady monthly cycle: engagement models, a typical monthly calendar, working hours by time zone and the platforms we use.',
  },
  {
    path: '/the-firm',
    title: 'The firm' + suffix,
    description: 'H Dang and Company, Chartered Accountants: ICAI FRN 158649W, proprietor CA Hritik Dang (ICAI M. No. 615134), established 2022, with a dedicated finance team.',
  },
  {
    path: '/blogs',
    title: 'Blogs' + suffix,
    description: 'Practical guides on finance operations, planning and fundraising for growing businesses.',
  },
  ...articles.filter((a) => a.body).map((a) => ({ path: `/blogs/${a.slug}`, title: a.title + suffix, description: a.summary })),
  {
    path: '/faqs',
    title: 'Frequently asked questions' + suffix,
    description: 'Answers on working with H Dang and Company: engagements, security, virtual CFO, FP&A, bookkeeping and fundraising readiness.',
  },
  {
    path: '/contact',
    title: 'Send an enquiry' + suffix,
    description: 'Send an enquiry to H Dang and Company. Unit 509, Empire Edge, Gotri - Vasna Road, Near Nilambar Circle, Vadodara 390 007.',
  },
  { path: '/disclaimer', title: 'Disclaimer' + suffix, description: 'Disclaimer for the H Dang and Company website, including the ICAI guidelines on solicitation and advertising.' },
  { path: '/privacy-policy', title: 'Privacy Policy' + suffix, description: 'How H Dang and Company handles details sent through this website.' },
  { path: '/terms-of-use', title: 'Terms of Use' + suffix, description: 'Terms of use for the H Dang and Company website.' },
]

export const notFound: Meta = {
  path: '/404',
  title: 'Page not found' + suffix,
  description: 'This page does not exist.',
}

export const metaFor = (path: string) => pages.find((p) => p.path === path.replace(/\/$/, '') || p.path === path) ?? notFound
