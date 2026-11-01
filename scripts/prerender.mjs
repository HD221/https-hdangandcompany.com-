// Renders every route to static HTML so each page ships with its own title,
// description and content. Also writes sitemap.xml and a 404 page.
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const dist = path.join(root, 'dist')
const ssrDir = path.join(root, 'dist-ssr')
const { render, pages, notFound, firm } = await import(pathToFileURL(path.join(ssrDir, 'entry-server.js')).href)
const template = fs.readFileSync(path.join(dist, 'index.html'), 'utf8')
const esc = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')

const org = {
  '@context': 'https://schema.org',
  '@type': 'AccountingService',
  name: 'H Dang and Company, Chartered Accountants',
  url: firm.url,
  telephone: '+91-8849220024',
  email: firm.email,
  founder: { '@type': 'Person', name: 'Hritik Dang' },
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'TF-29, Earth Alpha, Opp. Nilamber 1, Tandalja, Vasna',
    addressLocality: 'Vadodara',
    postalCode: '390007',
    addressRegion: 'Gujarat',
    addressCountry: 'IN',
  },
  sameAs: [firm.linkedin],
}

function head(meta, canonical) {
  const url = firm.url + canonical
  return [
    `<title>${esc(meta.title)}</title>`,
    `<meta name="description" content="${esc(meta.description)}" />`,
    canonical ? `<link rel="canonical" href="${url}" />` : '<meta name="robots" content="noindex" />',
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="H Dang and Company" />`,
    `<meta property="og:title" content="${esc(meta.title)}" />`,
    `<meta property="og:description" content="${esc(meta.description)}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:image" content="${firm.url}/images/desk-640.jpg" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    meta.path === '/' ? `<script type="application/ld+json">${JSON.stringify(org)}</script>` : '',
  ].join('\n    ')
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

const today = new Date().toISOString().slice(0, 10)
fs.writeFileSync(
  path.join(dist, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    pages.map((p) => `  <url><loc>${firm.url}${p.path === '/' ? '/' : p.path}</loc><lastmod>${today}</lastmod></url>`).join('\n') +
    `\n</urlset>\n`,
)
fs.rmSync(ssrDir, { recursive: true, force: true })
console.log('sitemap.xml and 404.html written')
