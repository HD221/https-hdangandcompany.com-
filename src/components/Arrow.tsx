import { Link } from 'react-router-dom'
import type { ReactNode } from 'react'

export function ArrowLink({ to, children, className = '' }: { to: string; children: ReactNode; className?: string }) {
  const external = /^(https?:|mailto:|tel:)/.test(to)
  const inner = (
    <>
      <span>{children}</span>
      <span className="arrow" aria-hidden="true">→</span>
    </>
  )
  const cls = `link-arrow underline decoration-1 underline-offset-[0.3em] hover:decoration-2 ${className}`
  if (external)
    return (
      <a href={to} className={cls} {...(to.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
        {inner}
      </a>
    )
  return (
    <Link to={to} className={cls}>
      {inner}
    </Link>
  )
}
