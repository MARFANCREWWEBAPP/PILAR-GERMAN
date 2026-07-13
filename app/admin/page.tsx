import Link from 'next/link'
import { Activity, ArrowUpRight, Bus, CalendarDays, ClipboardCheck, Download, LayoutGrid, QrCode, ShieldCheck, Ticket, Users, Zap } from 'lucide-react'
import { prisma } from '@/lib/db'
import { demoGuests, isDemoMode } from '@/lib/demo-data'

const actionItems = [
  { href: '/admin/menus', label: 'Abrir menús', icon: LayoutGrid },
  { href: '/rsvp', label: 'Registro invitados', icon: ClipboardCheck },
  { href: '/admin/guests', label: 'Gestionar invitados', icon: Users },
  { href: '/admin/scan', label: 'Scanner puerta', icon: QrCode },
  { href: '/admin/export/xlsx', label: 'Exportar Excel', icon: Download }
]

const runOfShow = [
  ['17:30', 'Tardeo', 'Zambomba y flamenquito divertido'],
  ['19:00', 'Baile novios', 'Momento foco y cambio de energía'],
  ['20:00', 'Secret DJ', 'Invitado internacional secreto'],
  ['00:00', 'No Sleep Wedding Party', 'Club mode hasta el final']
]

function percent(value: number, total: number) {
  return total > 0 ? Math.round((value / total) * 100) : 0
}

export default async function AdminDashboard() {
  const counts = isDemoMode()
    ? {
        total: demoGuests.length,
        confirmed: demoGuests.filter((guest) => guest.attendanceStatus === 'CONFIRMED').length,
        declined: demoGuests.filter((guest) => guest.attendanceStatus === 'DECLINED').length,
        pending: demoGuests.filter((guest) => guest.attendanceStatus === 'PENDING').length,
        ticketsGenerated: demoGuests.filter((guest) => !!guest.ticket).length,
        ticketsUsed: demoGuests.filter((guest) => guest.ticket?.status === 'USED').length,
        busUsers: demoGuests.filter((guest) => guest.busPreference !== 'NONE').length
      }
    : await getLiveCounts()

  const confirmationRate = percent(counts.confirmed, counts.total)
  const passportRate = percent(counts.ticketsGenerated, Math.max(counts.confirmed, 1))
  const gateRate = percent(counts.ticketsUsed, Math.max(counts.ticketsGenerated, 1))
  const busRate = percent(counts.busUsers, Math.max(counts.confirmed, 1))
  const pendingPassports = Math.max(counts.confirmed - counts.ticketsGenerated, 0)
  const gateRemaining = Math.max(counts.ticketsGenerated - counts.ticketsUsed, 0)

  const headlineStats = [
    { label: 'Confirmación', value: `${confirmationRate}%`, detail: `${counts.confirmed} de ${counts.total} registros`, icon: Activity },
    { label: 'Passports', value: `${passportRate}%`, detail: `${counts.ticketsGenerated} emitidos`, icon: Ticket },
    { label: 'Puerta', value: `${gateRate}%`, detail: `${counts.ticketsUsed} escaneados`, icon: ShieldCheck },
    { label: 'Bus', value: `${busRate}%`, detail: `${counts.busUsers} desde Cártama`, icon: Bus }
  ]

  const funnel = [
    { label: 'Registros totales', value: counts.total, rate: 100 },
    { label: 'Confirmados', value: counts.confirmed, rate: confirmationRate },
    { label: 'Passports emitidos', value: counts.ticketsGenerated, rate: percent(counts.ticketsGenerated, Math.max(counts.total, 1)) },
    { label: 'Accesos validados', value: counts.ticketsUsed, rate: percent(counts.ticketsUsed, Math.max(counts.total, 1)) }
  ]

  return (
    <div className="space-y-6">
      <section className="relative overflow-hidden rounded-[2.7rem] border border-white/[0.10] bg-black/[0.62] p-6 shadow-[0_40px_130px_rgba(0,0,0,0.48)] backdrop-blur-xl md:p-8">
        <div className="absolute -right-24 -top-28 h-80 w-80 rounded-full border border-white/[0.12] bg-white/[0.08] blur-[1px]" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/80 to-transparent" />
        <div className="relative grid gap-8 xl:grid-cols-[minmax(0,1fr)_420px] xl:items-end">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-white/[0.12] bg-white/[0.05] px-3 py-2 text-[10px] font-black uppercase tracking-[0.24em] text-white/64">
              <Zap size={13} />
              Live production board
            </p>
            <h1 className="mt-5 max-w-4xl font-display text-[clamp(4rem,8vw,9rem)] leading-[0.72] tracking-[-0.08em] text-white">
              Control room
            </h1>
            <p className="mt-5 max-w-2xl text-sm leading-6 text-white/62">
              Vista interna para saber en segundos cómo va la operación: confirmaciones, passports, bus desde Cártama estación, puerta y momentos clave de la noche.
            </p>
          </div>

          <div className="rounded-[2rem] border border-white/[0.12] bg-white/[0.06] p-4">
            <div className="flex items-center justify-between gap-3 border-b border-white/[0.10] pb-4">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.24em] text-white/45">Estado general</p>
                <p className="mt-1 font-display text-4xl leading-none text-white">{counts.pending > 0 ? 'En producción' : 'Cerrado'}</p>
              </div>
              <span className="grid h-14 w-14 place-items-center rounded-full bg-white text-black">
                <Activity size={22} />
              </span>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-2 text-center">
              <div className="rounded-2xl bg-black/[0.34] px-3 py-3">
                <p className="font-display text-3xl leading-none text-white">{counts.pending}</p>
                <p className="mt-1 text-[9px] font-black uppercase tracking-[0.18em] text-white/42">Pendientes</p>
              </div>
              <div className="rounded-2xl bg-black/[0.34] px-3 py-3">
                <p className="font-display text-3xl leading-none text-white">{pendingPassports}</p>
                <p className="mt-1 text-[9px] font-black uppercase tracking-[0.18em] text-white/42">Sin pass</p>
              </div>
              <div className="rounded-2xl bg-black/[0.34] px-3 py-3">
                <p className="font-display text-3xl leading-none text-white">{gateRemaining}</p>
                <p className="mt-1 text-[9px] font-black uppercase tracking-[0.18em] text-white/42">Por entrar</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {headlineStats.map((stat) => {
          const Icon = stat.icon
          return (
            <article key={stat.label} className="group relative overflow-hidden rounded-[2rem] border border-white/[0.10] bg-white/[0.045] p-5 backdrop-blur-xl transition hover:-translate-y-1 hover:border-white/[0.32]">
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-white via-white/40 to-transparent" />
              <div className="flex items-start justify-between gap-4">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-white text-black transition group-hover:scale-105">
                  <Icon size={20} />
                </span>
                <p className="font-display text-5xl leading-none tracking-[-0.06em] text-white">{stat.value}</p>
              </div>
              <p className="mt-6 text-[10px] font-black uppercase tracking-[0.25em] text-white/42">{stat.label}</p>
              <p className="mt-2 text-sm font-semibold text-white/78">{stat.detail}</p>
            </article>
          )
        })}
      </section>

      <section className="grid gap-3 xl:grid-cols-[minmax(0,1fr)_420px]">
        <div className="rounded-[2.2rem] border border-white/[0.10] bg-black/[0.46] p-5 backdrop-blur-xl md:p-6">
          <div className="mb-5 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.24em] text-white/42">Pipeline</p>
              <h2 className="mt-1 font-display text-5xl leading-none text-white">Funnel de acceso</h2>
            </div>
            <Link href="/admin/guests" className="inline-flex w-fit items-center gap-2 rounded-full border border-white/[0.16] bg-white/[0.06] px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-white transition hover:border-white/45">
              Ver invitados
              <ArrowUpRight size={14} />
            </Link>
          </div>
          <div className="space-y-3">
            {funnel.map((step, index) => (
              <div key={step.label} className="rounded-[1.4rem] border border-white/[0.08] bg-white/[0.035] p-4">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.18em] text-white/46">0{index + 1} · {step.label}</p>
                    <p className="mt-1 font-display text-4xl leading-none text-white">{step.value}</p>
                  </div>
                  <p className="font-mono text-sm text-white/58">{step.rate}%</p>
                </div>
                <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/[0.08]">
                  <div className="h-full rounded-full bg-white" style={{ width: `${step.rate}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <aside className="rounded-[2.2rem] border border-white/[0.10] bg-[#f7f7f2] p-5 text-black shadow-[0_28px_95px_rgba(0,0,0,0.34)] md:p-6">
          <p className="text-[10px] font-black uppercase tracking-[0.24em] text-black/42">Run of show</p>
          <h2 className="mt-1 font-display text-5xl leading-none tracking-[-0.04em] text-black">Timeline</h2>
          <div className="mt-6 space-y-3">
            {runOfShow.map(([time, title, detail]) => (
              <div key={title} className="grid grid-cols-[74px_minmax(0,1fr)] gap-3 rounded-[1.4rem] border border-black/[0.08] bg-white px-3 py-3">
                <p className="font-display text-3xl leading-none text-black">{time}</p>
                <div>
                  <p className="text-sm font-black uppercase tracking-[0.13em] text-black">{title}</p>
                  <p className="mt-1 text-xs leading-5 text-black/52">{detail}</p>
                </div>
              </div>
            ))}
          </div>
        </aside>
      </section>

      <section className="grid gap-3 lg:grid-cols-[1fr_340px]">
        <div className="rounded-[2rem] border border-white/[0.10] bg-white/[0.04] p-5 backdrop-blur-xl">
          <div className="mb-3 flex items-center justify-between gap-3">
            <h2 className="font-display text-4xl leading-none text-white">Acciones rápidas</h2>
            <p className="text-xs font-black uppercase tracking-[0.16em] text-white/45">Operación</p>
          </div>
          <div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-3">
            {actionItems.map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group flex min-h-24 items-center gap-3 rounded-2xl border border-white/[0.08] bg-black/[0.34] px-3 py-3 transition hover:border-white/[0.35] hover:bg-white/[0.08]"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/[0.08] text-white/80 group-hover:bg-white group-hover:text-black">
                    <Icon size={18} />
                  </span>
                  <span className="text-sm font-semibold text-white">{item.label}</span>
                </Link>
              )
            })}
          </div>
        </div>

        <aside className="rounded-[2rem] border border-white/[0.12] bg-black/[0.54] p-5 backdrop-blur-xl">
          <p className="text-[10px] font-black uppercase tracking-[0.24em] text-white/42">Lectura rápida</p>
          <div className="mt-4 space-y-4">
            <div>
              <div className="flex items-center justify-between text-sm font-semibold text-white/70">
                <span>Bus Cártama → Finca</span>
                <span>{counts.busUsers}</span>
              </div>
              <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/[0.08]">
                <div className="h-full rounded-full bg-white" style={{ width: `${busRate}%` }} />
              </div>
            </div>
            <p className="text-sm leading-6 text-white/58">
              {counts.pending > 0
                ? `Quedan ${counts.pending} respuestas pendientes. Conviene revisar el listado y empujar confirmaciones antes de cerrar producción.`
                : 'Todas las respuestas están cerradas en este momento. La operación puede centrarse en puerta y transporte.'}
            </p>
          </div>
        </aside>
      </section>
    </div>
  )
}

async function getLiveCounts() {
  const [total, confirmed, declined, pending, ticketsGenerated, ticketsUsed, busUsers] = await Promise.all([
    prisma.guest.count(),
    prisma.guest.count({ where: { attendanceStatus: 'CONFIRMED' } }),
    prisma.guest.count({ where: { attendanceStatus: 'DECLINED' } }),
    prisma.guest.count({ where: { attendanceStatus: 'PENDING' } }),
    prisma.ticket.count(),
    prisma.ticket.count({ where: { status: 'USED' } }),
    prisma.guest.count({ where: { busPreference: { not: 'NONE' } } })
  ])

  return { total, confirmed, declined, pending, ticketsGenerated, ticketsUsed, busUsers }
}
