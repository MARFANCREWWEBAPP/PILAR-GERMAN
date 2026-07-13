'use client'

import Image from 'next/image'
import Link from 'next/link'
import type { CSSProperties, MouseEvent } from 'react'
import { useEffect, useState } from 'react'
import { ArrowUpRight, CalendarDays, MapPin, Music2, QrCode, Ticket } from 'lucide-react'
import { NoSleepBrand } from '@/components/brand/NoSleepBrand'
import { ClubCountdown } from '@/components/brand/ClubCountdown'
import { defaultPublicCopy, type PublicCopy } from '@/lib/public-copy-fields'

const quickLinks = [
  { href: '/rsvp', label: 'Get pass', icon: Ticket },
  { href: '/lineup', label: 'Line-up', icon: Music2 },
  { href: '/ticket/DEMO-TOKEN-MARIA', label: 'Preview', icon: QrCode },
  { href: '/buses', label: 'Shuttles', icon: CalendarDays },
  { href: '/location', label: 'Map', icon: MapPin }
]

export default function HomePage() {
  const [pointer, setPointer] = useState({ x: 50, y: 35 })
  const [introVisible, setIntroVisible] = useState(true)
  const [copy, setCopy] = useState<PublicCopy>(defaultPublicCopy)
  const homeCopy = copy.home
  const heroTags = homeCopy.heroTags.split('|').map((tag) => tag.trim()).filter(Boolean)
  const lineupItems = [
    { stage: homeCopy.lineupTardeoStage, title: homeCopy.lineupTardeoTitle, time: '17:30', note: homeCopy.lineupTardeoNote },
    { stage: homeCopy.lineupDanceStage, title: homeCopy.lineupDanceTitle, time: '19:00', note: homeCopy.lineupDanceNote },
    { stage: homeCopy.lineupDjStage, title: homeCopy.lineupDjTitle, time: '20:00', note: homeCopy.lineupDjNote },
    { stage: homeCopy.lineupPartyStage, title: homeCopy.lineupPartyTitle, time: '00:00', note: homeCopy.lineupPartyNote }
  ]

  useEffect(() => {
    const timer = window.setTimeout(() => setIntroVisible(false), 2600)
    fetch('/api/public-copy', { cache: 'no-store' })
      .then((response) => response.json())
      .then((data) => setCopy(data))
      .catch(() => undefined)

    return () => window.clearTimeout(timer)
  }, [])

  function handlePointerMove(event: MouseEvent<HTMLElement>) {
    const rect = event.currentTarget.getBoundingClientRect()
    setPointer({
      x: ((event.clientX - rect.left) / rect.width) * 100,
      y: ((event.clientY - rect.top) / rect.height) * 100
    })
  }

  return (
    <main
      onMouseMove={handlePointerMove}
      style={{ '--mx': `${pointer.x}%`, '--my': `${pointer.y}%` } as CSSProperties}
      className="brand-stage motion-spotlight relative min-h-screen overflow-hidden bg-[#020302] text-[#f7f7f2]"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_12%,rgba(244,235,197,0.18),transparent_24%),radial-gradient(circle_at_78%_14%,rgba(255,255,255,0.42),transparent_32%),radial-gradient(circle_at_48%_88%,rgba(255,255,255,0.26),transparent_34%),linear-gradient(135deg,#020302_0%,#0a0f07_48%,#020302_100%)]" />
      <div className="festival-lasers absolute inset-0 opacity-[0.82]" />
      <div className="brand-grid absolute inset-0 opacity-[0.22]" />
      <div className="festival-noise absolute inset-0 opacity-[0.45]" />
      <div className="absolute left-1/2 top-[-28rem] h-[58rem] w-[58rem] -translate-x-1/2 rounded-full border border-[#f5f5f5]/10 bg-[#1a1a1a]/10 blur-3xl" />
      <div className="motion-float pointer-events-none absolute left-[6%] top-[22%] hidden h-28 w-28 rounded-full border border-[#f5f5f5]/[0.18] bg-[#f5f5f5]/[0.06] blur-[1px] md:block" />
      <div className="motion-float-delay pointer-events-none absolute right-[9%] top-[34%] hidden h-20 w-20 rounded-full border border-white/[0.16] bg-white/[0.05] md:block" />
      <div className="motion-float-slow pointer-events-none absolute bottom-[16%] left-[38%] hidden h-14 w-14 rotate-45 border border-[#f5f5f5]/[0.22] bg-[#1a1a1a]/[0.12] lg:block" />

      {introVisible ? (
        <div className="fixed inset-0 z-50 grid place-items-center bg-[#020302]/[0.96] px-4 text-white backdrop-blur-2xl">
          <div className="festival-lasers absolute inset-0 opacity-[0.72]" />
          <div className="brand-grid absolute inset-0 opacity-[0.18]" />
          <div className="festival-noise absolute inset-0 opacity-[0.42]" />
          <div className="motion-float absolute left-[12%] top-[18%] hidden h-24 w-24 rounded-full border border-[#f5f5f5]/[0.18] bg-[#f5f5f5]/[0.06] md:block" />
          <div className="relative w-full max-w-3xl overflow-hidden rounded-[3rem] border border-white/[0.12] bg-black/[0.56] p-6 text-center shadow-[0_48px_160px_rgba(0,0,0,0.72)] md:p-10">
            <div className="mx-auto text-left">
              <NoSleepBrand hero />
            </div>
            <p className="mt-8 text-xs font-black uppercase tracking-[0.42em] text-[#f5f5f5]">{homeCopy.loadingEyebrow}</p>
            <p className="mx-auto mt-6 max-w-xl text-sm font-semibold uppercase tracking-[0.20em] text-white/[0.58]">
              {homeCopy.loadingSubtitle}
            </p>
            <div className="club-loading-bar mt-8 h-2 overflow-hidden rounded-full bg-white/[0.10]">
              <span />
            </div>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <button
                type="button"
                onClick={() => setIntroVisible(false)}
                className="inline-flex h-12 items-center justify-center rounded-full bg-[#f7f7f2] px-6 text-sm font-black uppercase tracking-[0.16em] text-black transition hover:bg-[#f5f5f5]"
              >
                {homeCopy.loadingPrimaryCta}
              </button>
              <Link
                href="/login"
                className="inline-flex h-12 items-center justify-center rounded-full border border-white/[0.16] bg-white/[0.06] px-6 text-sm font-black uppercase tracking-[0.16em] text-white transition hover:border-[#f5f5f5]/[0.44]"
              >
                {homeCopy.loadingPrivateCta}
              </Link>
            </div>
          </div>
        </div>
      ) : null}

      <section className="relative z-10 mx-auto flex min-h-screen w-full max-w-[1540px] flex-col px-4 py-5 sm:px-6 lg:px-8">
        <header className="flex items-center justify-between gap-4 rounded-full border border-white/[0.12] bg-black/[0.48] px-3 py-3 shadow-[0_24px_90px_rgba(0,0,0,0.42)] backdrop-blur-xl">
          <Link href="/" className="flex items-center gap-3">
            <NoSleepBrand compact />
          </Link>
          <nav className="hidden items-center gap-2 md:flex">
            {quickLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-full border border-white/[0.10] px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-white/[0.64] transition hover:border-[#f5f5f5]/[0.45] hover:bg-[#1a1a1a]/[0.18] hover:text-white"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <Link href="/rsvp" className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#f7f7f2] px-5 text-sm font-black uppercase tracking-[0.12em] text-black transition hover:bg-[#f5f5f5]">
            {homeCopy.navAccessCta}
            <ArrowUpRight size={16} />
          </Link>
        </header>

        <div className="grid flex-1 items-center gap-9 py-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(460px,0.72fr)] lg:py-12">
          <div className="relative">
            <div className="mb-6 flex flex-wrap gap-2">
              {heroTags.map((tag) => (
                <span key={tag} className="rounded-full border border-[#f5f5f5]/[0.30] bg-[#1a1a1a]/[0.16] px-3 py-2 text-[10px] font-black uppercase tracking-[0.24em] text-[#f5f5f5]">
                  {tag}
                </span>
              ))}
            </div>

            <div className="mb-8 hidden rounded-[2rem] border border-white/[0.10] bg-white/[0.035] p-5 backdrop-blur-xl md:block">
              <NoSleepBrand hero />
            </div>

            <p className="text-xs font-black uppercase tracking-[0.55em] text-white/[0.42]">{homeCopy.heroKicker}</p>
            <h1 className="mt-6 max-w-6xl font-display text-[clamp(4.8rem,12vw,13rem)] leading-[0.78] tracking-[-0.085em] text-white">
              {homeCopy.heroTitleLine1}
              <span className="block translate-x-1 text-[#f5f5f5]">{homeCopy.heroTitleLine2}</span>
            </h1>

            <div className="mt-9 grid max-w-4xl gap-5 md:grid-cols-[1fr_260px]">
              <p className="border-l border-[#f5f5f5]/[0.48] pl-5 text-lg leading-8 text-white/[0.76] md:text-xl md:leading-9">
                {homeCopy.heroDescription}
              </p>
              <div className="motion-tilt rounded-[1.5rem] border border-white/[0.12] bg-white/[0.055] p-4 backdrop-blur-xl">
                <p className="text-[10px] font-black uppercase tracking-[0.26em] text-[#f5f5f5]">{homeCopy.festivalCodeLabel}</p>
                <p className="mt-2 font-display text-4xl leading-none text-white">{homeCopy.festivalCode}</p>
                <p className="mt-2 text-xs leading-5 text-white/[0.52]">{homeCopy.festivalCodeNote}</p>
              </div>
            </div>

            <div className="mt-7 flex flex-wrap items-center gap-4">
              <div className="motion-equalizer flex h-12 items-end gap-1 rounded-full border border-[#f5f5f5]/[0.22] bg-black/[0.36] px-4 py-2 backdrop-blur-xl">
                <span />
                <span />
                <span />
                <span />
                <span />
              </div>
              <p className="text-xs font-black uppercase tracking-[0.24em] text-white/[0.48]">
                {homeCopy.liveNote}
              </p>
            </div>

            <div className="mt-7 max-w-xl">
              <ClubCountdown compact />
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/rsvp" className="group inline-flex h-[3.75rem] items-center justify-center gap-3 rounded-full bg-[#f7f7f2] px-8 py-5 text-sm font-black uppercase tracking-[0.18em] text-black transition hover:bg-[#f5f5f5]">
                {homeCopy.primaryCta}
                <Ticket size={18} className="transition group-hover:rotate-[-10deg]" />
              </Link>
              <Link href="/ticket/DEMO-TOKEN-MARIA" className="inline-flex h-[3.75rem] items-center justify-center gap-3 rounded-full border border-white/[0.16] bg-white/[0.06] px-8 py-5 text-sm font-black uppercase tracking-[0.18em] text-white transition hover:border-[#f5f5f5]/[0.46] hover:bg-[#1a1a1a]/[0.18]">
                {homeCopy.secondaryCta}
                <QrCode size={18} />
              </Link>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[600px] lg:ml-auto">
            <div className="brand-orbit absolute -inset-8 rounded-full border border-[#f5f5f5]/[0.16]" />
            <div className="absolute -left-3 top-16 z-20 hidden -rotate-6 rounded-full border border-[#f5f5f5]/[0.42] bg-black/[0.72] px-5 py-3 text-xs font-black uppercase tracking-[0.24em] text-[#f5f5f5] shadow-[0_22px_80px_rgba(0,0,0,0.48)] backdrop-blur-xl md:block">
              {homeCopy.wristbandBadge}
            </div>
            <div className="absolute -right-2 bottom-28 z-20 hidden rotate-6 rounded-[1.5rem] border border-black/[0.12] bg-[#f7f7f2] px-5 py-4 text-black shadow-[0_24px_80px_rgba(0,0,0,0.52)] md:block">
              <p className="text-[10px] font-black uppercase tracking-[0.25em] text-black/[0.46]">{homeCopy.stageBadgeLabel}</p>
              <p className="font-display text-4xl leading-none">{homeCopy.stageBadgeText}</p>
            </div>

            <div className="motion-tilt relative overflow-hidden rounded-[3rem] border border-white/[0.16] bg-[#f7f7f2] p-3 text-black shadow-[0_52px_160px_rgba(0,0,0,0.68)]">
              <div className="absolute inset-3 rounded-[2.45rem] border border-black/[0.10]" />
              <div className="relative overflow-hidden rounded-[2.45rem] bg-[#f3ecdd]">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_55%_20%,rgba(255,255,255,0.24),transparent_32%),linear-gradient(180deg,rgba(255,255,255,0.82),rgba(247,247,242,0.98))]" />
                <Image src="/brand/finca-clean.png" alt={homeCopy.fincaAlt} width={1024} height={1536} className="relative z-10 h-[650px] w-full object-cover object-center contrast-125 md:h-[740px]" priority />
                <div className="absolute left-0 top-0 z-20 h-full w-16 border-r border-black/[0.10] bg-[#11150d] text-[#f5f5f5]">
                  <div className="flex h-full items-center justify-center [writing-mode:vertical-rl]">
                    <span className="text-xs font-black uppercase tracking-[0.42em]">{homeCopy.verticalStripe}</span>
                  </div>
                </div>
                <div className="absolute inset-x-0 bottom-0 z-20 bg-gradient-to-t from-[#020302] via-[#020302]/[0.76] to-transparent p-7 pl-24 pt-36 text-white">
                  <p className="text-xs font-black uppercase tracking-[0.34em] text-[#f5f5f5]">{homeCopy.cardEyebrow}</p>
                  <div className="mt-3 flex items-end justify-between gap-4">
                    <h2 className="font-display text-7xl leading-[0.72] tracking-[-0.055em]">{homeCopy.cardDate}</h2>
                    <div className="grid h-20 w-20 place-items-center rounded-2xl border border-white/[0.20] bg-white/[0.10] backdrop-blur-xl">
                      <Music2 size={30} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <section className="grid gap-3 pb-5 lg:grid-cols-4">
          {lineupItems.map((item) => (
            <article key={item.stage} className="motion-tilt group rounded-[1.8rem] border border-white/[0.11] bg-black/[0.40] p-4 backdrop-blur-xl hover:border-[#f5f5f5]/[0.38] hover:bg-[#1a1a1a]/[0.14]">
              <div className="flex items-start justify-between gap-3">
                <p className="text-[10px] font-black uppercase tracking-[0.28em] text-[#f5f5f5]">{item.stage}</p>
                <p className="font-display text-4xl leading-none text-white/[0.24] group-hover:text-[#f5f5f5]">{item.time}</p>
              </div>
              <h2 className="mt-8 text-lg font-black uppercase tracking-[0.12em] text-white">{item.title}</h2>
              <p className="mt-2 text-sm leading-6 text-white/[0.55]">{item.note}</p>
            </article>
          ))}
        </section>

        <div className="festival-marquee mb-2 overflow-hidden rounded-full border border-white/[0.10] bg-white/[0.045] py-3 text-xs font-black uppercase tracking-[0.34em] text-white/[0.58] backdrop-blur-xl">
          <div>
            <span>{homeCopy.marquee} </span>
            <span>{homeCopy.marquee} </span>
          </div>
        </div>
      </section>
    </main>
  )
}
