'use client'

import { useEffect, useMemo, useState } from 'react'

const targetDate = new Date('2026-12-06T17:30:00+01:00').getTime()

function getRemaining() {
  const diff = Math.max(0, targetDate - Date.now())
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24)
  const minutes = Math.floor((diff / (1000 * 60)) % 60)
  const seconds = Math.floor((diff / 1000) % 60)
  return { days, hours, minutes, seconds }
}

export function ClubCountdown({ compact = false }: { compact?: boolean }) {
  const [remaining, setRemaining] = useState(getRemaining)

  useEffect(() => {
    const timer = window.setInterval(() => setRemaining(getRemaining()), 1000)
    return () => window.clearInterval(timer)
  }, [])

  const items = useMemo(
    () => [
      ['days', remaining.days],
      ['hours', remaining.hours],
      ['min', remaining.minutes],
      ['sec', remaining.seconds]
    ],
    [remaining]
  )

  return (
    <div className={`rounded-[1.8rem] border border-white/[0.12] bg-white/[0.045] ${compact ? 'p-3' : 'p-4'} shadow-[0_20px_70px_rgba(0,0,0,0.22)] backdrop-blur-xl`}>
      <div className="flex items-center justify-between gap-3 border-b border-white/[0.10] pb-3">
        <p className="text-[10px] font-black uppercase tracking-[0.28em] text-white/[0.48]">Club countdown</p>
        <span className="h-2 w-2 rounded-full bg-white shadow-[0_0_20px_rgba(255,255,255,0.8)]" />
      </div>
      <div className="mt-3 grid grid-cols-4 gap-2">
        {items.map(([label, value]) => (
          <div key={label} className="rounded-2xl border border-white/[0.10] bg-black/[0.42] px-3 py-3 text-center">
            <p className={`${compact ? 'text-2xl' : 'text-4xl'} font-display leading-none text-white`}>{String(value).padStart(2, '0')}</p>
            <p className="mt-1 text-[9px] font-black uppercase tracking-[0.18em] text-white/[0.42]">{label}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
