import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { BrowserRouter, MemoryRouter, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { pages } from './routes'
import './index.css'
import App from './App'

const root = document.getElementById('root')!

// Preview builds (VITE_PREVIEW=1) run inside a sandboxed frame that only allows
// simple #name hashes, so routes are kept in memory and mirrored to the hash.
const toHash = (path: string) => (path === '/' ? '' : path.slice(1).replace(/\//g, '--'))
function HashSync() {
  const { pathname } = useLocation()
  useEffect(() => {
    const h = toHash(pathname)
    if (location.hash.slice(1) !== h) history.replaceState(null, '', h ? '#' + h : location.pathname)
  }, [pathname])
  return null
}
const start = pages.find((p) => toHash(p.path) === location.hash.slice(1))?.path ?? '/'
const preview = (
  <StrictMode>
    <MemoryRouter initialEntries={[start]} future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <HashSync />
      <App />
    </MemoryRouter>
  </StrictMode>
)

const app = (
  <StrictMode>
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <App />
    </BrowserRouter>
  </StrictMode>
)

if (import.meta.env.VITE_PREVIEW) createRoot(root).render(preview)
else if (root.hasChildNodes()) hydrateRoot(root, app)
else createRoot(root).render(app)
