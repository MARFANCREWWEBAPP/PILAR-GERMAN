'use client'

import Image from 'next/image'
import Link from 'next/link'
import type { CSSProperties, MouseEvent } from 'react'
import { useEffect, useState } from 'react'
import { ArrowLeft, ArrowRight, CheckCircle2, Music2, QrCode, Sparkles } from 'lucide-react'
import { NoSleepBrand } from '@/components/brand/NoSleepBrand'
import { defaultPublicCopy, type PublicCopy } from '@/lib/public-copy-fields'

type Status = 'idle' | 'submitting' | 'success' | 'error'

type RsvpResponse = {
  ok: boolean
  message?: string
  ticketUrl?: string
  companionTicketUrl?: string
}

const fieldClass = 'mt-2 h-[3.25rem] w-full rounded-2xl border border-black/[0.10] bg-white px-4 text-sm text-black outline-none transition placeholder:text-black/[0.30] focus:border-black focus:ring-4 focus:ring-black/[0.08]'
const selectClass = 'mt-2 h-[3.25rem] w-full rounded-2xl border border-black/[0.10] bg-white px-4 text-sm text-black outline-none transition focus:border-black focus:ring-4 focus:ring-black/[0.08]'
const labelClass = 'text-[11px] font-black uppercase tracking-[0.24em] text-black/[0.46]'
const RSVP_DRAFT_KEY = 'nswc-rsvp-draft'

export default function RsvpPage() {
  const [pointer, setPointer] = useState({ x: 50, y: 32 })
  const [status, setStatus] = useState<Status>('idle')
  const [message, setMessage] = useState('')
  const [ticketUrl, setTicketUrl] = useState('')
  const [companionTicketUrl, setCompanionTicketUrl] = useState('')
  const [hasCompanion, setHasCompanion] = useState(false)
  const [copy, setCopy] = useState<PublicCopy>(defaultPublicCopy)
  const rsvpCopy = copy.rsvp

  useEffect(() => {
    fetch('/api/public-copy', { cache: 'no-store' })
      .then((response) => response.json())
      .then((data) => setCopy(data))
      .catch(() => undefined)
  }, [])

  useEffect(() => {
    const form = document.getElementById('rsvp-form') as HTMLFormElement | null
    if (!form) return

    function restoreDraft() {
      const saved = window.localStorage.getItem(RSVP_DRAFT_KEY)
      if (!saved) return

      try {
        const draft = JSON.parse(saved) as Record<string, string>
        if (draft.companion === 'YES') setHasCompanion(true)

        window.setTimeout(() => {
          Object.entries(draft).forEach(([name, value]) => {
            const field = form.elements.namedItem(name) as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement | null
            if (field) field.value = value
          })
        }, 0)
      } catch {
        window.localStorage.removeItem(RSVP_DRAFT_KEY)
      }
    }

    let timer: number | null = null
    function saveDraft() {
      if (timer) window.clearTimeout(timer)
      timer = window.setTimeout(() => {
        const formData = new FormData(form)
        const draft: Record<string, string> = {}
        formData.forEach((value, key) => {
          if (typeof value === 'string') draft[key] = value
        })
        window.localStorage.setItem(RSVP_DRAFT_KEY, JSON.stringify(draft))
      }, 450)
    }

    restoreDraft()
    form.addEventListener('input', saveDraft)
    form.addEventListener('change', saveDraft)

    return () => {
      if (timer) window.clearTimeout(timer)
      form.removeEventListener('input', saveDraft)
      form.removeEventListener('change', saveDraft)
    }
  }, [])

  function handlePointerMove(event: MouseEvent<HTMLElement>) {
    const rect = event.currentTarget.getBoundingClientRect()
    setPointer({
      x: ((event.clientX - rect.left) / rect.width) * 100,
      y: ((event.clientY - rect.top) / rect.height) * 100
    })
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setStatus('submitting')
    setMessage('')
    setTicketUrl('')
    setCompanionTicketUrl('')

    const formData = new FormData(event.currentTarget)
    const payload = {
      firstName: formData.get('firstName'),
      lastName: formData.get('lastName'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      busPreference: formData.get('busPreference'),
      companion: formData.get('companion'),
      companionFirstName: formData.get('companionFirstName'),
      companionLastName: formData.get('companionLastName'),
      notes: formData.get('notes')
    }

    try {
      const response = await fetch('/api/rsvp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
      const data = (await response.json()) as RsvpResponse

      if (!response.ok) {
        throw new Error(data.message || 'No hemos podido registrar la respuesta.')
      }

      setStatus('success')
      setMessage(data.message || 'Passport emitido correctamente.')
      if (data.ticketUrl) setTicketUrl(data.ticketUrl)
      if (data.companionTicketUrl) setCompanionTicketUrl(data.companionTicketUrl)
      window.localStorage.removeItem(RSVP_DRAFT_KEY)
      event.currentTarget.reset()
      setHasCompanion(false)
    } catch (error) {
      setStatus('error')
      setMessage(error instanceof Error ? error.message : 'Ha ocurrido un error inesperado.')
    }
  }

  return (
    <main
      onMouseMove={handlePointerMove}
      style={{ '--mx': `${pointer.x}%`, '--my': `${pointer.y}%` } as CSSProperties}
      className="brand-stage motion-spotlight relative min-h-screen overflow-hidden bg-[#020302] text-white"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_8%,rgba(247,247,242,0.16),transparent_26%),radial-gradient(circle_at_82%_12%,rgba(255,255,255,0.40),transparent_34%),linear-gradient(145deg,#020302,#0a0f07_54%,#020302)]" />
      <div className="festival-lasers absolute inset-0 opacity-[0.82]" />
      <div className="brand-grid absolute inset-0 opacity-[0.20]" />
      <div className="festival-noise absolute inset-0 opacity-[0.45]" />
      <div className="motion-float pointer-events-none absolute left-[8%] top-[18%] hidden h-24 w-24 rounded-full border border-white/[0.18] bg-white/[0.06] md:block" />
      <div className="motion-float-delay pointer-events-none absolute bottom-[18%] right-[12%] hidden h-20 w-20 rotate-45 border border-white/[0.14] bg-white/[0.04] md:block" />

      <section className="relative z-10 mx-auto grid min-h-screen max-w-[1500px] gap-6 px-4 py-5 sm:px-6 xl:grid-cols-[minmax(0,0.95fr)_minmax(520px,0.78fr)] xl:px-8">
        <aside className="flex min-h-[620px] flex-col justify-between overflow-hidden rounded-[2.7rem] border border-white/[0.12] bg-black/[0.48] p-5 shadow-[0_42px_140px_rgba(0,0,0,0.56)] backdrop-blur-xl lg:p-7 xl:min-h-[calc(100vh-2.5rem)]">
          <div>
            <Link href="/" className="inline-flex items-center gap-2 rounded-full border border-white/[0.12] bg-white/[0.045] px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-white/[0.70] transition hover:text-white">
              <ArrowLeft size={14} /> {rsvpCopy.homeBackLabel}
            </Link>
            <div className="mt-10 max-w-4xl">
              <div className="mb-8 rounded-[2rem] border border-white/[0.10] bg-white/[0.035] p-5 backdrop-blur-xl">
                <NoSleepBrand />
              </div>
              <p className="inline-flex items-center gap-2 rounded-full border border-white/[0.28] bg-white/[0.06] px-3 py-2 text-xs font-black uppercase tracking-[0.24em] text-white">
                <Sparkles size={14} /> {rsvpCopy.brandPanelEyebrow}
              </p>
              <h1 className="mt-6 max-w-[720px] font-display text-[clamp(4.1rem,8.2vw,8.6rem)] leading-[0.82] tracking-[-0.072em] text-white">
                {rsvpCopy.heroTitleLine1}
                <span className="block text-white">{rsvpCopy.heroTitleLine2}</span>
              </h1>
              <p className="mt-8 max-w-[620px] text-base leading-7 text-white/[0.68] md:text-lg md:leading-8">
                {rsvpCopy.heroDescription}
              </p>
            </div>
          </div>

          <div className="motion-scan motion-tilt relative mt-10 overflow-hidden rounded-[2.2rem] border border-white/[0.12] bg-[#f7f7f2] p-3 text-black shadow-[0_28px_90px_rgba(0,0,0,0.32)]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(255,255,255,0.28),transparent_38%)]" />
            <Image src="/brand/finca-clean.png" alt="Finca" width={1024} height={1536} className="relative h-72 w-full rounded-[1.7rem] object-cover object-center contrast-125 md:h-[390px]" priority />
            <div className="absolute bottom-6 left-6 right-6 rounded-[1.6rem] border border-white/[0.16] bg-black/[0.66] p-4 text-white backdrop-blur-xl">
              <div className="flex items-end justify-between gap-4">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.30em] text-white">{rsvpCopy.cardEyebrow}</p>
                  <p className="mt-1 font-display text-4xl leading-none md:text-5xl">{rsvpCopy.cardCode}</p>
                </div>
                <Music2 size={32} />
              </div>
            </div>
          </div>
        </aside>

        <section className="flex items-center">
          <div className="motion-tilt w-full overflow-hidden rounded-[2.7rem] border border-black/[0.10] bg-[#f7f7f2] text-black shadow-[0_42px_140px_rgba(0,0,0,0.62)]">
            <div className="relative border-b border-black/[0.10] bg-white/[0.56] px-5 py-5 md:px-7">
              <div className="absolute right-6 top-5 hidden rounded-full border border-black/[0.10] px-3 py-2 text-[10px] font-black uppercase tracking-[0.24em] text-black/[0.42] md:block">{rsvpCopy.formBadge}</div>
              <p className="text-xs font-black uppercase tracking-[0.30em] text-black/[0.45]">{rsvpCopy.formEyebrow}</p>
              <h2 className="mt-2 font-display text-[clamp(3rem,5vw,4.5rem)] leading-[0.88] tracking-[-0.045em] text-black">{rsvpCopy.formTitle}</h2>
              <div className="mt-5 grid gap-2 sm:grid-cols-3">
                {[rsvpCopy.stepGuest, rsvpCopy.stepCompanion, rsvpCopy.stepBus].map((step) => (
                  <span key={step} className="rounded-full border border-black/[0.10] bg-black/[0.045] px-3 py-2 text-[10px] font-black uppercase tracking-[0.20em] text-black/[0.52]">
                    {step}
                  </span>
                ))}
              </div>
            </div>

            {status === 'success' ? (
              <div className="p-5 md:p-7">
                <div className="rounded-[2.2rem] border border-black/[0.12] bg-white p-7 text-center shadow-[0_24px_80px_rgba(0,0,0,0.10)]">
                  <div className="mx-auto grid h-[4.25rem] w-[4.25rem] place-items-center rounded-full bg-black p-4 text-white">
                    <CheckCircle2 size={36} />
                  </div>
                  <h3 className="mt-5 font-display text-6xl leading-[0.82] tracking-[-0.04em]">{rsvpCopy.successTitle}</h3>
                  <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-black/[0.62]">{message}</p>
                  <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:justify-center">
                    {ticketUrl ? (
                      <Link href={ticketUrl} className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-black px-6 text-sm font-black uppercase tracking-[0.16em] text-white transition hover:bg-[#1a1a1a]">
                        {rsvpCopy.primaryTicketLabel}
                        <QrCode size={17} />
                      </Link>
                    ) : null}
                    {companionTicketUrl ? (
                      <Link href={companionTicketUrl} className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-black/[0.12] bg-white px-6 text-sm font-black uppercase tracking-[0.16em] text-black transition hover:bg-black hover:text-white">
                        {rsvpCopy.companionTicketLabel}
                        <QrCode size={17} />
                      </Link>
                    ) : null}
                    <button onClick={() => setStatus('idle')} className="inline-flex h-12 items-center justify-center rounded-full border border-black/[0.12] px-6 text-sm font-black uppercase tracking-[0.16em] text-black/[0.65] transition hover:border-black/[0.25] hover:text-black">
                      {rsvpCopy.anotherGuestLabel}
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <form id="rsvp-form" onSubmit={handleSubmit} className="grid gap-5 p-5 md:p-7">
                <div className="grid gap-4 sm:grid-cols-2">
                  <label>
                    <span className={labelClass}>{rsvpCopy.firstNameLabel}</span>
                    <input className={fieldClass} name="firstName" placeholder={rsvpCopy.firstNamePlaceholder} required />
                  </label>
                  <label>
                    <span className={labelClass}>{rsvpCopy.lastNameLabel}</span>
                    <input className={fieldClass} name="lastName" placeholder={rsvpCopy.lastNamePlaceholder} required />
                  </label>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <label>
                    <span className={labelClass}>{rsvpCopy.emailLabel}</span>
                    <input className={fieldClass} name="email" type="email" placeholder={rsvpCopy.emailPlaceholder} required />
                  </label>
                  <label>
                    <span className={labelClass}>{rsvpCopy.phoneLabel}</span>
                    <input className={fieldClass} name="phone" placeholder={rsvpCopy.phonePlaceholder} required />
                  </label>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <label>
                    <span className={labelClass}>{rsvpCopy.companionLabel}</span>
                    <select
                      className={selectClass}
                      name="companion"
                      defaultValue="NO"
                      onChange={(event) => setHasCompanion(event.target.value === 'YES')}
                    >
                      <option value="NO">{rsvpCopy.companionNo}</option>
                      <option value="YES">{rsvpCopy.companionYes}</option>
                    </select>
                  </label>
                  <label>
                    <span className={labelClass}>{rsvpCopy.busLabel}</span>
                    <select className={selectClass} name="busPreference" defaultValue="NONE">
                      <option value="NONE">{rsvpCopy.busNo}</option>
                      <option value="OUTBOUND">{rsvpCopy.busYes}</option>
                    </select>
                  </label>
                </div>

                {hasCompanion ? (
                  <div className="grid gap-4 rounded-[1.6rem] border border-black/[0.10] bg-black/[0.035] p-4 sm:grid-cols-2">
                    <label>
                      <span className={labelClass}>{rsvpCopy.companionFirstNameLabel}</span>
                      <input className={fieldClass} name="companionFirstName" placeholder={rsvpCopy.companionFirstNamePlaceholder} required={hasCompanion} />
                    </label>
                    <label>
                      <span className={labelClass}>{rsvpCopy.companionLastNameLabel}</span>
                      <input className={fieldClass} name="companionLastName" placeholder={rsvpCopy.companionLastNamePlaceholder} required={hasCompanion} />
                    </label>
                    <p className="text-xs leading-5 text-black/[0.50] sm:col-span-2">
                      {rsvpCopy.companionHelp}
                    </p>
                  </div>
                ) : null}

                <label>
                  <span className={labelClass}>{rsvpCopy.notesLabel}</span>
                  <textarea className="mt-2 min-h-24 w-full rounded-2xl border border-black/[0.10] bg-white px-4 py-3 text-sm text-black outline-none transition placeholder:text-black/[0.30] focus:border-black focus:ring-4 focus:ring-black/[0.08]" name="notes" placeholder={rsvpCopy.notesPlaceholder} />
                </label>

                {status === 'error' ? <p className="rounded-2xl border border-red-500/[0.25] bg-red-500/[0.10] px-4 py-3 text-sm text-red-700">{message}</p> : null}

                <button disabled={status === 'submitting'} className="group inline-flex h-14 items-center justify-center gap-3 rounded-full bg-black px-7 text-sm font-black uppercase tracking-[0.18em] text-white transition hover:bg-[#1a1a1a] disabled:cursor-not-allowed disabled:opacity-[0.55]">
                  {status === 'submitting' ? rsvpCopy.submittingLabel : rsvpCopy.submitLabel}
                  <ArrowRight size={18} className="transition group-hover:translate-x-1" />
                </button>
              </form>
            )}
          </div>
        </section>
      </section>
    </main>
  )
}
