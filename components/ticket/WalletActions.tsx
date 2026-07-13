'use client'

import { useState } from 'react'
import { Smartphone, Wallet } from 'lucide-react'

type WalletType = 'apple' | 'google'

export function WalletActions({ token }: { token: string }) {
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState<WalletType | null>(null)

  async function addToWallet(type: WalletType) {
    setLoading(type)
    setMessage('')

    try {
      const response = await fetch(`/api/wallet/${type}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token })
      })
      const data = await response.json()

      if (data.url) {
        window.location.href = data.url
        return
      }

      setMessage(data.message || 'Wallet pendiente de configurar.')
    } catch {
      setMessage('No hemos podido abrir Wallet ahora mismo.')
    } finally {
      setLoading(null)
    }
  }

  return (
    <div className="relative overflow-hidden rounded-[1.8rem] border border-black/[0.10] bg-black p-4 text-white shadow-[0_22px_70px_rgba(0,0,0,0.20)]">
      <div className="pointer-events-none absolute -right-12 -top-12 h-28 w-28 rounded-full bg-white/[0.16] blur-2xl" />
      <p className="relative text-[10px] font-black uppercase tracking-[0.28em] text-[#f5f5f5]">Wallet access</p>
      <p className="relative mt-2 text-sm leading-6 text-white/[0.62]">Guarda el passport en tu cartera y llévalo listo para el scan de puerta.</p>
      <div className="mt-4 grid gap-2">
        <button
          type="button"
          onClick={() => addToWallet('apple')}
          className="group inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#f7f7f2] px-4 text-sm font-black uppercase tracking-[0.14em] text-black transition hover:bg-[#f5f5f5] disabled:cursor-not-allowed disabled:opacity-[0.55]"
          disabled={loading !== null}
        >
          <Wallet size={17} className="transition group-hover:-rotate-6" />
          {loading === 'apple' ? 'Abriendo...' : 'Añadir a Apple Wallet'}
        </button>
        <button
          type="button"
          onClick={() => addToWallet('google')}
          className="group inline-flex h-12 items-center justify-center gap-2 rounded-full border border-white/[0.18] bg-white/[0.08] px-4 text-sm font-black uppercase tracking-[0.14em] text-white transition hover:border-[#f5f5f5]/[0.45] hover:bg-[#1a1a1a]/[0.20] disabled:cursor-not-allowed disabled:opacity-[0.55]"
          disabled={loading !== null}
        >
          <Smartphone size={17} className="transition group-hover:-rotate-6" />
          {loading === 'google' ? 'Abriendo...' : 'Añadir a Android Wallet'}
        </button>
      </div>
      {message ? <p className="mt-3 rounded-2xl border border-[#f5f5f5]/[0.20] bg-[#1a1a1a]/[0.14] px-3 py-2 text-xs leading-5 text-white/[0.72]">{message}</p> : null}
    </div>
  )
}
