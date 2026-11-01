// Local static server that mimics Netlify/Vercel clean URLs (/about -> about.html).
import http from 'node:http'
import fs from 'node:fs'
import path from 'node:path'
import zlib from 'node:zlib'
const dist = path.resolve('dist')
const types = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css', '.svg': 'image/svg+xml', '.jpg': 'image/jpeg', '.avif': 'image/avif', '.woff2': 'font/woff2', '.xml': 'application/xml', '.txt': 'text/plain' }
http.createServer((req, res) => {
  const p = decodeURIComponent(new URL(req.url, 'http://x').pathname)
  const tries = p === '/' ? ['index.html'] : [p, p + '.html', path.join(p, 'index.html')]
  for (const t of tries) {
    const f = path.join(dist, t)
    if (f.startsWith(dist) && fs.existsSync(f) && fs.statSync(f).isFile()) {
      const type = types[path.extname(f)] ?? 'application/octet-stream'
      if (/text|javascript|xml|svg/.test(type) && /gzip/.test(req.headers['accept-encoding'] ?? '')) {
        res.writeHead(200, { 'Content-Type': type, 'Content-Encoding': 'gzip' })
        return fs.createReadStream(f).pipe(zlib.createGzip()).pipe(res)
      }
      res.writeHead(200, { 'Content-Type': type })
      return fs.createReadStream(f).pipe(res)
    }
  }
  res.writeHead(404, { 'Content-Type': types['.html'] })
  fs.createReadStream(path.join(dist, '404.html')).pipe(res)
}).listen(Number(process.env.PORT ?? 4173), () => console.log('serving dist on', process.env.PORT ?? 4173))
