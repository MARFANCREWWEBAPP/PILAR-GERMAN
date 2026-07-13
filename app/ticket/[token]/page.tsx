import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight, CalendarDays, Download, MapPin, QrCode, ShieldCheck, Sparkles, Ticket } from 'lucide-react'
import { prisma } from '@/lib/db'
import { getEventConfig } from '@/lib/event'
import { getDemoTicket, isDemoMode } from '@/lib/demo-data'
import { WalletActions } from '@/components/ticket/WalletActions'
import { NoSleepBrand } from '@/components/brand/NoSleepBrand'
import { ClubCountdown } from '@/components/brand/ClubCountdown'

export default async function TicketPage({ params }: { params: { token: string } }) {
  const ticket = isDemoMode()
    ? getDemoTicket(params.token)
    : await prisma.ticket.findUnique({
        where: { token: params.token },
        include: { guest: true }
      })

  if (!ticket) notFound()

  const event = await getEventConfig()
  const eventDefaults = {
    date: event?.date || '06.12.2026',
    startTime: event?.startTime || '17:30',
    venueName: event?.venueName || 'FINCA SAN ISIDRO',
    city: event?.city || 'ARDALES',
    googleMapsUrl: event?.googleMapsUrl || 'https://share.google/gpKNBvCS03JEzRHFP'
  }
  const guestName = `${ticket.guest.firstName} ${ticket.guest.lastName}`
  const passportCode = `NSWC-0612-${ticket.token.slice(0, 8).toUpperCase()}`
  const statusLabel = ticket.status === 'ACTIVE' ? 'VALID ACCESS' : ticket.status

  return (
    <main className="brand-stage relative min-h-screen overflow-hidden bg-[#020302] px-4 py-5 text-white md:px-8">
      <Image src="/brand/finca-clean.png" alt="" fill className="pointer-events-none object-cover object-center opacity-[0.12] invert mix-blend-screen" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_8%,rgba(247,247,242,0.16),transparent_24%),radial-gradient(circle_at_86%_14%,rgba(255,255,255,0.42),transparent_34%),radial-gradient(circle_at_48%_94%,rgba(255,255,255,0.22),transparent_32%),linear-gradient(125deg,#020302_0%,rgba(4,7,3,0.96)_58%,rgba(81,98,48,0.84)_100%)]" />
      <div className="festival-lasers absolute inset-0 opacity-[0.82]" />
      <div className="brand-grid absolute inset-0 opacity-[0.18]" />
      <div className="festival-noise absolute inset-0 opacity-[0.36]" />
      <div className="motion-float pointer-events-none absolute left-[8%] top-[18%] hidden h-24 w-24 rounded-full border border-[#f5f5f5]/[0.18] bg-[#f5f5f5]/[0.06] md:block" />
      <div className="motion-float-delay pointer-events-none absolute bottom-[20%] right-[9%] hidden h-20 w-20 rotate-45 border border-white/[0.14] bg-white/[0.04] md:block" />

      <section className="relative z-10 mx-auto max-w-7xl">
        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <Link href="/" className="inline-flex w-fit items-center gap-2 rounded-full border border-white/[0.12] bg-black/[0.45] px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-white/[0.70] backdrop-blur-xl transition hover:text-white">
            <Sparkles size={14} />
            NO SLEEP WEDDING CLUB
          </Link>
          <div className="flex flex-wrap gap-2 text-[10px] font-black uppercase tracking-[0.22em] text-[#f5f5f5]">
            <span className="rounded-full border border-[#f5f5f5]/[0.28] bg-[#1a1a1a]/[0.16] px-3 py-2">Passport issued</span>
            <span className="rounded-full border border-white/[0.12] bg-white/[0.045] px-3 py-2 text-white/[0.58]">{passportCode}</span>
          </div>
        </div>

        <div className="motion-tilt relative overflow-hidden rounded-[3.2rem] border border-white/[0.14] bg-black/[0.58] shadow-[0_52px_170px_rgba(0,0,0,0.70)] backdrop-blur-xl">
          <div className="absolute inset-x-0 top-0 h-2 bg-gradient-to-r from-[#f7f7f2] via-[#f5f5f5] to-[#1a1a1a]" />
          <div className="grid lg:grid-cols-[92px_minmax(0,1fr)_440px]">
            <aside className="hidden border-r border-white/[0.10] bg-[#f7f7f2] text-black lg:block">
              <div className="flex h-full items-center justify-center [writing-mode:vertical-rl]">
                <p className="text-sm font-black uppercase tracking-[0.55em]">NO SLEEP WEDDING CLUB 06.12.2026</p>
              </div>
            </aside>

            <section className="relative min-h-[680px] overflow-hidden p-6 md:p-9">
              <div className="absolute right-8 top-8 hidden h-56 w-56 rounded-full border border-[#f5f5f5]/[0.18] md:block" />
              <div className="absolute right-24 top-24 hidden h-28 w-28 rounded-full border border-white/[0.12] md:block" />
              <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#020302] to-transparent" />

              <div className="relative">
                <div className="flex flex-wrap items-start justify-between gap-5">
                  <div className="motion-float inline-flex rounded-[1.8rem] border border-white/[0.10] bg-white/[0.05] p-4 shadow-[0_22px_80px_rgba(0,0,0,0.35)]">
                    <NoSleepBrand />
                  </div>
                  <div className="motion-equalizer flex h-14 items-end gap-1 rounded-full border border-[#f5f5f5]/[0.22] bg-black/[0.36] px-5 py-2 backdrop-blur-xl">
                    <span />
                    <span />
                    <span />
                    <span />
                    <span />
                  </div>
                </div>

                <p className="mt-8 text-xs font-black uppercase tracking-[0.34em] text-[#f5f5f5]">P&G wedding edition</p>
                <h1 className="mt-3 max-w-4xl font-display text-[clamp(4.7rem,10vw,10.5rem)] leading-[0.68] tracking-[-0.095em] text-white">
                  Access passport
                </h1>

                <div className="mt-7 grid gap-5 xl:grid-cols-[1fr_300px]">
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.30em] text-white/[0.42]">Guest holder</p>
                    <p className="mt-2 font-display text-5xl leading-none text-[#f7f7f2] md:text-6xl">{guestName}</p>
                  </div>
                  <div className="motion-scan rounded-[1.8rem] border border-[#f5f5f5]/[0.26] bg-[#1a1a1a]/[0.14] p-4">
                    <p className="text-[10px] font-black uppercase tracking-[0.26em] text-[#f5f5f5]">Access status</p>
                    <p className="mt-2 font-display text-4xl leading-none text-white">{statusLabel}</p>
                    <p className="mt-2 text-xs leading-5 text-white/[0.52]">Catorce horas. Una boda. Un secreto internacional. Acceso personal requerido en puerta.</p>
                  </div>
                </div>

                <div className="mt-8 grid gap-3 md:grid-cols-3">
                  <div className="motion-tilt rounded-[1.6rem] border border-white/[0.10] bg-white/[0.055] p-4">
                    <CalendarDays size={18} className="text-[#f5f5f5]" />
                    <p className="mt-4 text-[10px] font-black uppercase tracking-[0.24em] text-white/[0.42]">Date / time</p>
                    <p className="mt-1 text-sm font-bold text-white">{eventDefaults.date} · {eventDefaults.startTime}</p>
                  </div>
                  <div className="motion-tilt rounded-[1.6rem] border border-white/[0.10] bg-white/[0.055] p-4">
                    <MapPin size={18} className="text-[#f5f5f5]" />
                    <p className="mt-4 text-[10px] font-black uppercase tracking-[0.24em] text-white/[0.42]">Location</p>
                    <p className="mt-1 text-sm font-bold text-white">{eventDefaults.venueName}, {eventDefaults.city}</p>
                  </div>
                  <div className="motion-tilt rounded-[1.6rem] border border-white/[0.10] bg-white/[0.055] p-4">
                    <Ticket size={18} className="text-[#f5f5f5]" />
                    <p className="mt-4 text-[10px] font-black uppercase tracking-[0.24em] text-white/[0.42]">Access zone</p>
                    <p className="mt-1 text-sm font-bold text-white">VIP FIELD · ADMIT ONE</p>
                  </div>
                </div>

                <div className="motion-shimmer mt-8 overflow-hidden rounded-[1.8rem] border border-white/[0.10] bg-[linear-gradient(100deg,#f7f7f2,#f5f5f5,#f7f7f2)] text-black">
                  <div className="flex flex-wrap items-center justify-between gap-3 border-b border-black/[0.10] px-4 py-3">
                    <p className="text-[10px] font-black uppercase tracking-[0.30em] text-black/[0.48]">Festival wristband</p>
                    <p className="font-mono text-xs text-black/[0.56]">{passportCode}</p>
                  </div>
                  <div className="grid grid-cols-5">
                    {['MAIN', 'FARM', 'WHITE', 'BLACK', 'LAST'].map((label) => (
                      <div key={label} className="border-r border-black/[0.10] px-3 py-4 last:border-r-0">
                        <p className="text-[10px] font-black uppercase tracking-[0.20em] text-black/[0.44]">{label}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 grid gap-3 md:grid-cols-4">
                  {[
                    ['17:30', 'Tardeo'],
                    ['19:00', 'Baile novios'],
                    ['20:00', 'Secret DJ'],
                    ['00:00', 'No Sleep Party']
                  ].map(([time, label]) => (
                    <div key={label} className="rounded-2xl border border-white/[0.10] bg-black/[0.32] px-4 py-3">
                      <p className="font-display text-3xl leading-none text-[#f5f5f5]">{time}</p>
                      <p className="mt-1 text-[10px] font-black uppercase tracking-[0.18em] text-white/[0.52]">{label}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-4 rounded-[1.6rem] border border-[#f5f5f5]/[0.18] bg-[#1a1a1a]/[0.12] px-4 py-3">
                  <p className="text-[10px] font-black uppercase tracking-[0.24em] text-[#f5f5f5]">Opening act</p>
                  <p className="mt-1 text-sm font-semibold text-white">Zambomba y flamenquito divertido desde el tardeo.</p>
                </div>

                <div className="mt-4">
                  <ClubCountdown compact />
                </div>
              </div>
            </section>

            <aside className="relative overflow-hidden border-t border-white/[0.10] bg-[#f7f7f2] p-5 text-black lg:border-l lg:border-t-0 lg:p-7">
              <div className="absolute -right-24 -top-24 h-56 w-56 rounded-full bg-[#1a1a1a]/[0.26] blur-3xl" />
              <div className="relative">
                <p className="text-xs font-black uppercase tracking-[0.30em] text-[#111111]">Scan at gate</p>
                <h2 className="mt-2 font-display text-6xl leading-[0.78] tracking-[-0.05em]">Access QR</h2>
                <div className="motion-scan mt-5 rounded-[2rem] border border-black/[0.10] bg-white p-3 shadow-[0_24px_80px_rgba(0,0,0,0.18)]">
                  <Image src={`/api/ticket/${ticket.token}/png`} alt="QR de acceso" width={460} height={460} className="h-auto w-full rounded-[1.4rem]" />
                </div>
                <div className="mt-5 flex gap-3 border-t border-black/[0.10] pt-4">
                  <ShieldCheck size={19} className="mt-1 shrink-0 text-[#111111]" />
                  <p className="text-sm leading-6 text-black/[0.62]">Pasaporte personal e intransferible. La organizacion puede solicitar identificacion en puerta.</p>
                </div>
                <div className="mt-5 grid gap-3">
                  <WalletActions token={ticket.token} />
                  <a href={`/api/ticket/${ticket.token}/pdf`} className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-black/[0.10] bg-white px-4 text-sm font-black uppercase tracking-[0.14em] text-black transition hover:bg-[#f5f5f5]">
                    <Download size={16} />
                    Download PDF
                  </a>
                </div>
              </div>
            </aside>
          </div>
        </div>

        <section className="relative mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
          <a href={`/api/ticket/${ticket.token}/pdf`} className="inline-flex h-[3.25rem] items-center justify-center gap-2 rounded-full bg-[#f7f7f2] px-4 py-4 text-sm font-black uppercase tracking-[0.14em] text-black transition hover:bg-[#f5f5f5]">
            <Download size={16} />
            Passport PDF
          </a>
          <a href={`/api/ticket/${ticket.token}/png`} target="_blank" className="inline-flex h-[3.25rem] items-center justify-center gap-2 rounded-full border border-white/[0.18] bg-white/[0.06] px-4 py-4 text-sm font-black uppercase tracking-[0.14em] text-white transition hover:border-[#f5f5f5]/[0.44]">
            <QrCode size={16} />
            QR
          </a>
          <Link href="/buses" className="inline-flex h-[3.25rem] items-center justify-center rounded-full border border-white/[0.18] bg-white/[0.06] px-4 py-4 text-sm font-black uppercase tracking-[0.14em] text-white transition hover:border-[#f5f5f5]/[0.44]">
            Shuttles
          </Link>
          <a href={eventDefaults.googleMapsUrl} target="_blank" className="inline-flex h-[3.25rem] items-center justify-center gap-2 rounded-full border border-white/[0.18] bg-white/[0.06] px-4 py-4 text-sm font-black uppercase tracking-[0.14em] text-white transition hover:border-[#f5f5f5]/[0.44]">
            Map
            <ArrowUpRight size={15} />
          </a>
        </section>
      </section>
    </main>
  )
}
