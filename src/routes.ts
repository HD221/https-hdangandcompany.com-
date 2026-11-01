import { services } from './content'

export type Meta = { path: string; title: string; description: string }

const suffix = ' | H Dang and Company, Chartered Accountants'

export const pages: Meta[] = [
  {
    path: '/',
    title: 'H Dang and Company | Chartered Accountants in Vadodara',
    description:
      'Chartered accountants in Vadodara for startups and growing businesses: startup advisory, virtual CFO services and virtual bookkeeping.',
  },
  {
    path: '/services',
    title: 'Services' + suffix,
    description:
      'Startup advisory, financial advisory and virtual CFO services, and virtual bookkeeping from H Dang and Company, Vadodara.',
  },
  ...services.map((s) => ({ path: `/services/${s.slug}`, title: s.name + suffix, description: s.metaDescription })),
  {
    path: '/about',
    title: 'About' + suffix,
    description:
      'H Dang and Company is a Chartered Accountancy practice in Vadodara run by Hritik Dang, CA. Read about the firm, its vision and mission.',
  },
  {
    path: '/contact',
    title: 'Contact' + suffix,
    description:
      'Phone, WhatsApp and email for H Dang and Company. Office at TF-29, Earth Alpha, Tandalja, Vasna, Vadodara 390 007.',
  },
]

export const notFound: Meta = {
  path: '/404',
  title: 'Page not found' + suffix,
  description: 'This page does not exist.',
}

export const metaFor = (path: string) => pages.find((p) => p.path === path.replace(/\/$/, '') || p.path === path) ?? notFound
