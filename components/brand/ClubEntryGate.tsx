'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'

const ENTRY_KEY = 'nswc-entry-unlocked'
const PUBLIC_PREFIXES = ['/rsvp', '/lineup', '/ticket', '/buses', '/location', '/faq', '/privacy']
const BLOCKED_PREFIXES = ['/admin', '/login', '/api']

function shouldShowGate(pathname: string | null) {
  if (!pathname) return false
  if (BLOCKED_PREFIXES.some((prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`))) {
    return false
  }
  return pathname === '/' || PUBLIC_PREFIXES.some((prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`))
}

export function ClubEntryGate() {
  const pathname = usePathname()
  const [ready, setReady] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const isPublic = shouldShowGate(pathname)
    const alreadyEntered = window.sessionStorage.getItem(ENTRY_KEY) === 'true'

    setReady(true)
    setOpen(isPublic && !alreadyEntered)
  }, [pathname])

  const enterClub = () => {
    window.sessionStorage.setItem(ENTRY_KEY, 'true')
    window.dispatchEvent(new Event('nswc:enter-club'))
    setOpen(false)
  }

  if (!ready || !open) return null

  return (
    <section className="ns-entry-gate" aria-label="Entrada a No Sleep Wedding Club">
      <div className="ns-entry-noise" aria-hidden="true" />
      <div className="ns-entry-orb ns-entry-orb-left" aria-hidden="true" />
      <div className="ns-entry-orb ns-entry-orb-right" aria-hidden="true" />

      <div className="ns-entry-card">
        <div className="ns-entry-topline">
          <span>PRIVATE ACCESS</span>
          <span>06.12.2026</span>
        </div>

        <div className="ns-entry-brand">
          <img src="/brand/pg-logo.jpg" alt="PG" />
          <div>
            <span>PILAR & GERMAN PRESENT</span>
            <strong>NO SLEEP WEDDING CLUB</strong>
          </div>
        </div>

        <h1>
          Catorce horas.
          <br />
          Una boda.
          <br />
          Cero sueño.
        </h1>

        <p>
          Un invitado internacional secreto, una finca tomada por la noche y una banda sonora que no se apaga.
        </p>

        <button type="button" onClick={enterClub}>
          <span>ENTRAR AL CLUB</span>
          <i aria-hidden="true">+</i>
        </button>

        <div className="ns-entry-footer">
          <span>FINCA SAN ISIDRO · ARDALES</span>
          <span>SOUNDTRACK REQUIRED</span>
        </div>
      </div>
    </section>
  )
}
