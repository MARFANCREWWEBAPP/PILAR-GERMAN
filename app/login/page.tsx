'use client'

import Image from 'next/image'
import Link from 'next/link'
import type { CSSProperties, FormEvent, MouseEvent } from 'react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, ArrowRight, LockKeyhole, Mail, ShieldCheck, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { NoSleepBrand } from '@/components/brand/NoSleepBrand'

export default function LoginPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [pointer, setPointer] = useState({ x: 50, y: 35 })

  function handlePointerMove(event: MouseEvent<HTMLElement>) {
    const rect = event.currentTarget.getBoundingClientRect()
    setPointer({
      x: ((event.clientX - rect.left) / rect.width) * 100,
      y: ((event.clientY - rect.top) / rect.height) * 100
    })
  }

  async function login(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError('')

    const formData = new FormData(e.currentTarget)
    const response = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: formData.get('email'),
        password: formData.get('password')
      })
    })

    const data = (await response.json()) as { ok: boolean; message?: string }
    setLoading(false)

    if (data.ok) router.push('/admin/menus')
    else setError(data.message || 'Error de autenticación')
  }

  return (
    <main
      onMouseMove={handlePointerMove}
      style={{ '--mx': `${pointer.x}%`, '--my': `${pointer.y}%` } as CSSProperties}
      className="brand-stage motion-spotlight relative min-h-screen overflow-hidden bg-[#020302] px-4 py-5 text-white"
    >
      <Image src="/brand/finca-clean.png" alt="" fill className="pointer-events-none object-cover object-center opacity-[0.14] invert mix-blend-screen" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_8%,rgba(247,247,242,0.16),transparent_26%),radial-gradient(circle_at_82%_12%,rgba(255,255,255,0.40),transparent_34%),linear-gradient(145deg,#020302,#0a0f07_54%,#020302)]" />
      <div className="festival-lasers absolute inset-0 opacity-[0.82]" />
      <div className="brand-grid absolute inset-0 opacity-[0.20]" />
      <div className="festival-noise absolute inset-0 opacity-[0.45]" />

      <section className="relative z-10 mx-auto grid min-h-[calc(100vh-40px)] max-w-6xl overflow-hidden rounded-[3rem] border border-white/[0.12] bg-black/[0.58] shadow-[0_46px_150px_rgba(0,0,0,0.66)] backdrop-blur-xl md:grid-cols-[0.9fr_1.1fr]">
        <div className="relative hidden border-r border-white/[0.10] p-8 md:flex md:flex-col md:justify-between">
          <div>
            <div className="motion-float inline-flex w-fit rounded-[1.8rem] border border-white/[0.10] bg-white/[0.05] p-4 shadow-[0_22px_80px_rgba(0,0,0,0.35)]">
              <NoSleepBrand />
            </div>
          </div>
          <div>
            <p className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.30em] text-[#f5f5f5]"><Sparkles size={14} /> Backstage terminal</p>
            <h1 className="mt-4 font-display text-7xl leading-[0.78] tracking-[-0.06em] text-white">Private control</h1>
            <p className="mt-4 max-w-sm text-sm leading-6 text-white/[0.58]">Acceso interno al sistema de invitados, passports, scanner y producción del NO SLEEP WEDDING CLUB.</p>
          </div>
          <div className="motion-equalizer flex h-14 w-fit items-end gap-1 rounded-full border border-[#f5f5f5]/[0.22] bg-black/[0.36] px-5 py-2 backdrop-blur-xl">
            <span />
            <span />
            <span />
            <span />
            <span />
          </div>
        </div>

        <form onSubmit={login} className="flex flex-col justify-center p-6 md:p-10">
          <Link href="/" className="mb-8 inline-flex w-fit items-center gap-2 rounded-full border border-white/[0.12] bg-white/[0.045] px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-white/[0.62] transition hover:text-white">
            <ArrowLeft size={14} />
            Home
          </Link>
          <p className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.28em] text-[#f5f5f5]"><ShieldCheck size={14} /> Staff only</p>
          <h1 className="mt-3 font-display text-7xl leading-[0.78] tracking-[-0.06em] text-white">Entrar al panel</h1>
          <p className="mt-4 max-w-sm text-sm leading-6 text-white/[0.62]">Menú privado para revisar invitados, passports, buses, scanner y configuración.</p>

          <label className="mt-8 block text-sm font-semibold text-white/[0.70]">
            Email
            <span className="mt-2 flex items-center gap-2 rounded-2xl border border-white/[0.12] bg-white/[0.06] px-3 transition focus-within:border-[#f5f5f5]/[0.50] focus-within:ring-4 focus-within:ring-[rgba(245,245,245,0.10)]">
              <Mail size={18} className="text-[#f5f5f5]" />
              <input name="email" type="email" required autoComplete="email" defaultValue="info@marquee.es" className="h-[3.25rem] min-w-0 flex-1 bg-transparent text-white outline-none placeholder:text-white/[0.30]" placeholder="info@marquee.es" />
            </span>
          </label>

          <label className="mt-4 block text-sm font-semibold text-white/[0.70]">
            Contraseña
            <span className="mt-2 flex items-center gap-2 rounded-2xl border border-white/[0.12] bg-white/[0.06] px-3 transition focus-within:border-[#f5f5f5]/[0.50] focus-within:ring-4 focus-within:ring-[rgba(245,245,245,0.10)]">
              <LockKeyhole size={18} className="text-[#f5f5f5]" />
              <input name="password" type="password" required autoComplete="current-password" className="h-[3.25rem] min-w-0 flex-1 bg-transparent text-white outline-none placeholder:text-white/[0.30]" placeholder="Contraseña" />
            </span>
          </label>

          {error ? <p className="mt-4 rounded-2xl border border-red-300/[0.40] bg-red-500/[0.10] px-3 py-2 text-sm text-red-100">{error}</p> : null}

          <Button className="mt-7 w-full border-[#f7f7f2] bg-[#f7f7f2] font-black uppercase tracking-[0.14em] text-black hover:bg-[#f5f5f5]" disabled={loading}>
            {loading ? 'Abriendo backstage...' : 'Entrar al control room'}
            <ArrowRight size={18} />
          </Button>
        </form>
      </section>
    </main>
  )
}
