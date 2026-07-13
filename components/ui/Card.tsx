import { ReactNode } from 'react'

export function Card({ title, subtitle, children, className = '' }: { title?: string; subtitle?: string; children: ReactNode; className?: string }) {
  return (
    <section className={`rounded-2xl border border-white/10 bg-no-repeat bg-gradient-to-b from-white/[0.05] to-transparent p-6 backdrop-blur ${className}`}>
      {title ? <h2 className="text-xl font-display text-white">{title}</h2> : null}
      {subtitle ? <p className="mt-1 text-sm text-white/70">{subtitle}</p> : null}
      <div className="mt-4">{children}</div>
    </section>
  )
}
