'use client'

import { useState } from 'react'
import { BadgeX, CheckCircle2, Send } from 'lucide-react'

export function GuestActions({ guestId, token, isValidated }: { guestId: number; token: string | null; isValidated: boolean }) {
  const [busy, setBusy] = useState(false)

  async function run(path: string, body?: { action?: string; token?: string }) {
    setBusy(true)
    const options: RequestInit = body
      ? {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body)
        }
      : { method: 'POST' }

    await fetch(path, options)
    window.location.reload()
    setBusy(false)
  }

  if (!token) return null

  return (
    <div className="rounded-[1.6rem] border border-white/[0.12] bg-black/[0.34] p-4 shadow-[0_22px_80px_rgba(0,0,0,0.24)] backdrop-blur-xl">
      <p className="text-[10px] font-black uppercase tracking-[0.24em] text-[#f5f5f5]">Passport actions</p>
      <div className="mt-3 grid gap-2">
        <button
          type="button"
          disabled={busy}
          className="inline-flex h-10 items-center justify-center gap-2 rounded-full border border-white/[0.16] bg-white/[0.055] px-4 text-xs font-black uppercase tracking-[0.12em] text-white transition hover:border-[#f5f5f5]/[0.42] hover:bg-white/[0.09] disabled:cursor-not-allowed disabled:opacity-[0.55]"
          onClick={() => run(`/api/admin/guests/${guestId}/resend`)}
        >
          <Send size={14} />
          Reenviar
        </button>
        <button
          type="button"
          disabled={busy}
          className="inline-flex h-10 items-center justify-center gap-2 rounded-full border border-red-200/[0.22] bg-red-500/[0.10] px-4 text-xs font-black uppercase tracking-[0.12em] text-red-100 transition hover:bg-red-500/[0.16] disabled:cursor-not-allowed disabled:opacity-[0.55]"
          onClick={() => run(`/api/admin/guests/${guestId}/cancel`)}
        >
          <BadgeX size={14} />
          Cancelar
        </button>
        <button
          type="button"
          disabled={busy}
          className="inline-flex h-10 items-center justify-center gap-2 rounded-full border border-[#f5f5f5]/[0.28] bg-[#1a1a1a]/[0.16] px-4 text-xs font-black uppercase tracking-[0.12em] text-[#f5f5f5] transition hover:bg-[#1a1a1a]/[0.24] disabled:cursor-not-allowed disabled:opacity-[0.55]"
          onClick={() => run('/api/admin/tickets/manual', { action: isValidated ? 'unvalidate' : 'validate', token })}
        >
          <CheckCircle2 size={14} />
          {isValidated ? 'Desmarcar' : 'Validar'}
        </button>
      </div>
    </div>
  )
}
