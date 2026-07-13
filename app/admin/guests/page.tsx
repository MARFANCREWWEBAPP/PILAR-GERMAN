import Link from 'next/link'
import { Activity, Bus, Download, Eye, QrCode, Search, ShieldCheck, Ticket, UserPlus, Users } from 'lucide-react'
import { prisma } from '@/lib/db'
import { DataTable, DataTableBody, DataTableHead, DataTableHeader, DataTableRow, DataTableCell } from '@/components/ui/DataTable'
import { Badge } from '@/components/ui/Badge'
import { EmptyState } from '@/components/admin/EmptyState'
import { buildGuestFilterWhere } from '@/lib/export'
import { GuestActions } from '@/components/admin/GuestActions'
import { demoGuests, filterDemoGuests, isDemoMode } from '@/lib/demo-data'

export const dynamic = 'force-dynamic'

const attendanceLabels: Record<string, string> = {
  CONFIRMED: 'Confirmado',
  DECLINED: 'No asiste',
  PENDING: 'Pendiente'
}

const busLabels: Record<string, string> = {
  NONE: 'No usa bus',
  OUTBOUND: 'Cártama estación → Finca',
  RETURN: 'Vuelta',
  BOTH: 'Ida y vuelta'
}

const inputClass = 'h-12 w-full rounded-2xl border border-white/[0.14] bg-black/[0.42] px-3 text-sm text-white outline-none transition placeholder:text-white/[0.32] focus:border-white/[0.55] focus:ring-4 focus:ring-white/[0.08]'
const selectClass = 'h-12 rounded-2xl border border-white/[0.14] bg-black/[0.64] px-3 text-sm text-white outline-none transition focus:border-white/[0.55]'

function percent(value: number, total: number) {
  return total > 0 ? Math.round((value / total) * 100) : 0
}

export default async function AdminGuestsPage({ searchParams }: { searchParams: Record<string, string | undefined> }) {
  const where = buildGuestFilterWhere(searchParams)

  const guests = isDemoMode()
    ? filterDemoGuests(searchParams, demoGuests).map((guest) => ({
        ...guest,
        createdAt: new Date(),
        updatedAt: new Date(),
        partySize: 1,
        privacyAccepted: true,
        ticket: guest.ticket
          ? {
              id: guest.ticket.id,
              token: guest.ticket.token,
              status: guest.ticket.status,
              checkedInBy: null,
              checkedInAt: null,
              createdAt: new Date(),
              updatedAt: new Date(),
              guestId: guest.id
            }
          : null
      }))
    : await prisma.guest.findMany({
        where,
        include: { ticket: true },
        orderBy: { createdAt: 'desc' }
      })

  const confirmed = guests.filter((guest) => guest.attendanceStatus === 'CONFIRMED').length
  const pending = guests.filter((guest) => guest.attendanceStatus === 'PENDING').length
  const withBus = guests.filter((guest) => guest.busPreference !== 'NONE').length
  const withTicket = guests.filter((guest) => !!guest.ticket).length
  const checkedIn = guests.filter((guest) => guest.ticket?.status === 'USED').length
  const activeTickets = guests.filter((guest) => guest.ticket?.status === 'ACTIVE').length
  const missingPassports = Math.max(confirmed - withTicket, 0)

  const flow = [
    { label: 'Confirmados', value: confirmed, rate: percent(confirmed, guests.length), icon: ShieldCheck },
    { label: 'Con passport', value: withTicket, rate: percent(withTicket, Math.max(confirmed, 1)), icon: Ticket },
    { label: 'Bus Cártama', value: withBus, rate: percent(withBus, Math.max(confirmed, 1)), icon: Bus },
    { label: 'Check-in', value: checkedIn, rate: percent(checkedIn, Math.max(withTicket, 1)), icon: QrCode }
  ]

  return (
    <div className="space-y-6">
      <section className="relative overflow-hidden rounded-[2.7rem] border border-white/[0.10] bg-black/[0.62] p-6 shadow-[0_40px_130px_rgba(0,0,0,0.48)] backdrop-blur-xl md:p-8">
        <div className="absolute -right-24 -top-28 h-80 w-80 rounded-full border border-white/[0.12] bg-white/[0.08]" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/80 to-transparent" />
        <div className="relative grid gap-8 xl:grid-cols-[minmax(0,1fr)_460px] xl:items-end">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-white/[0.12] bg-white/[0.05] px-3 py-2 text-[10px] font-black uppercase tracking-[0.24em] text-white/64">
              <Activity size={13} />
              Guest accreditation
            </p>
            <h1 className="mt-5 max-w-3xl font-display text-[clamp(4rem,8vw,8.5rem)] leading-[0.74] tracking-[-0.08em] text-white">
              Invitados
            </h1>
            <p className="mt-5 max-w-2xl text-sm leading-6 text-white/[0.62]">
              Control de acreditación del NO SLEEP WEDDING CLUB: titulares, acompañantes registrados como passport independiente, bus Cártama estación y estado real de puerta.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 xl:grid-cols-2">
            <div className="rounded-[1.5rem] border border-white/[0.10] bg-white/[0.055] px-4 py-4">
              <Users size={16} className="text-white" />
              <p className="mt-4 font-display text-5xl leading-none text-white">{guests.length}</p>
              <p className="mt-1 text-[10px] font-black uppercase tracking-[0.18em] text-white/[0.42]">Total vista</p>
            </div>
            <div className="rounded-[1.5rem] border border-white/[0.10] bg-white/[0.055] px-4 py-4">
              <Ticket size={16} className="text-white" />
              <p className="mt-4 font-display text-5xl leading-none text-white">{activeTickets}</p>
              <p className="mt-1 text-[10px] font-black uppercase tracking-[0.18em] text-white/[0.42]">Pass activos</p>
            </div>
            <div className="rounded-[1.5rem] border border-white/[0.10] bg-white/[0.055] px-4 py-4">
              <UserPlus size={16} className="text-white" />
              <p className="mt-4 font-display text-5xl leading-none text-white">{pending}</p>
              <p className="mt-1 text-[10px] font-black uppercase tracking-[0.18em] text-white/[0.42]">Pendientes</p>
            </div>
            <div className="rounded-[1.5rem] border border-white/[0.10] bg-white/[0.055] px-4 py-4">
              <QrCode size={16} className="text-white" />
              <p className="mt-4 font-display text-5xl leading-none text-white">{missingPassports}</p>
              <p className="mt-1 text-[10px] font-black uppercase tracking-[0.18em] text-white/[0.42]">Sin pass</p>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-3 md:grid-cols-4">
        {flow.map((item) => {
          const Icon = item.icon
          return (
            <article key={item.label} className="rounded-[1.8rem] border border-white/[0.10] bg-white/[0.045] p-4 backdrop-blur-xl">
              <div className="flex items-center justify-between gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-2xl bg-white text-black">
                  <Icon size={18} />
                </span>
                <span className="font-mono text-xs text-white/46">{item.rate}%</span>
              </div>
              <p className="mt-5 font-display text-5xl leading-none text-white">{item.value}</p>
              <p className="mt-1 text-[10px] font-black uppercase tracking-[0.22em] text-white/42">{item.label}</p>
              <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/[0.08]">
                <div className="h-full rounded-full bg-white" style={{ width: `${item.rate}%` }} />
              </div>
            </article>
          )
        })}
      </section>

      <form className="rounded-[2rem] border border-white/[0.12] bg-black/[0.42] p-4 shadow-[0_22px_80px_rgba(0,0,0,0.24)] backdrop-blur-xl">
        <div className="grid gap-2 lg:grid-cols-[minmax(220px,1.4fr)_repeat(3,minmax(150px,1fr))_auto]">
          <label className="relative">
            <Search size={17} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-white/[0.42]" />
            <input name="q" placeholder="Buscar por nombre, email o teléfono" defaultValue={searchParams.q ?? ''} className={`${inputClass} pl-10`} />
          </label>
          <select name="attendanceStatus" className={selectClass} defaultValue={searchParams.attendanceStatus ?? ''}>
            <option value="">Todos los estados</option>
            <option value="CONFIRMED">Confirmados</option>
            <option value="PENDING">Pendientes</option>
            <option value="DECLINED">No asistentes</option>
          </select>
          <select name="busPreference" className={selectClass} defaultValue={searchParams.busPreference ?? ''}>
            <option value="">Todos los transportes</option>
            <option value="NONE">No usa bus</option>
            <option value="OUTBOUND">Bus Cártama estación → Finca</option>
          </select>
          <select name="invitedBy" className={selectClass} defaultValue={searchParams.invitedBy ?? ''}>
            <option value="">Todos los grupos</option>
            <option value="Novia">Novia</option>
            <option value="Novio">Novio</option>
            <option value="Familia novia">Familia novia</option>
            <option value="Familia novio">Familia novio</option>
            <option value="Amigos">Amigos</option>
            <option value="Otro">Otro</option>
          </select>
          <button className="h-12 rounded-2xl bg-white px-5 text-sm font-black uppercase tracking-[0.14em] text-black transition hover:bg-white/86">
            Filtrar
          </button>
        </div>
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-white/[0.08] pt-4">
          <p className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.18em] text-white/[0.48]">
            <Ticket size={14} className="text-white" />
            {withTicket} passports generados en esta vista
          </p>
          <div className="flex gap-2">
            <a href="/admin/export/csv" className="inline-flex h-10 items-center gap-2 rounded-full border border-white/[0.15] px-4 text-sm font-semibold text-white/[0.72] transition hover:border-white/[0.42] hover:bg-white/[0.06]">
              <Download size={15} />
              CSV
            </a>
            <a href="/admin/export/xlsx" className="inline-flex h-10 items-center gap-2 rounded-full border border-white/[0.15] px-4 text-sm font-semibold text-white/[0.72] transition hover:border-white/[0.42] hover:bg-white/[0.06]">
              <Download size={15} />
              Excel
            </a>
          </div>
        </div>
      </form>

      {guests.length === 0 ? <EmptyState title="Sin resultados" subtitle="No hay invitados para ese filtro." /> : null}

      <section className="overflow-hidden rounded-[2rem] border border-white/[0.12] bg-black/[0.36] shadow-[0_24px_90px_rgba(0,0,0,0.28)] backdrop-blur-xl">
        <DataTable>
          <DataTableHeader>
            <DataTableRow>
              <DataTableHead>Invitado / passport</DataTableHead>
              <DataTableHead>Contacto</DataTableHead>
              <DataTableHead>Grupo</DataTableHead>
              <DataTableHead>Estado</DataTableHead>
              <DataTableHead>Transporte</DataTableHead>
              <DataTableHead>Puerta</DataTableHead>
              <DataTableHead>Acciones</DataTableHead>
            </DataTableRow>
          </DataTableHeader>
          <DataTableBody>
            {guests.map((guest) => (
              <DataTableRow key={guest.id}>
                <DataTableCell>
                  <p className="font-semibold text-white">{guest.firstName} {guest.lastName}</p>
                  <p className="mt-1 font-mono text-xs text-white/[0.45]">ID {guest.id}</p>
                </DataTableCell>
                <DataTableCell>
                  <p className="text-white/[0.75]">{guest.phone}</p>
                  <p className="mt-1 text-xs text-white/[0.45]">{guest.email}</p>
                </DataTableCell>
                <DataTableCell>{guest.invitedBy}</DataTableCell>
                <DataTableCell>
                  <Badge tone={guest.attendanceStatus === 'CONFIRMED' ? 'success' : guest.attendanceStatus === 'DECLINED' ? 'danger' : 'muted'}>
                    {attendanceLabels[guest.attendanceStatus] || guest.attendanceStatus}
                  </Badge>
                </DataTableCell>
                <DataTableCell>{busLabels[guest.busPreference] || guest.busPreference}</DataTableCell>
                <DataTableCell>
                  {guest.ticket ? (
                    <Badge tone={guest.ticket.status === 'ACTIVE' ? 'success' : guest.ticket.status === 'CANCELLED' ? 'danger' : guest.ticket.status === 'USED' ? 'default' : 'muted'}>
                      {guest.ticket.status === 'USED' ? 'VALIDADO' : guest.ticket.status}
                    </Badge>
                  ) : (
                    <span className="text-white/[0.40]">Sin passport</span>
                  )}
                </DataTableCell>
                <DataTableCell>
                  <div className="flex flex-wrap gap-2">
                    <Link href={`/admin/guests/${guest.id}`} className="inline-flex h-8 items-center gap-1.5 rounded-full border border-white/[0.15] px-3 text-xs font-semibold text-white/[0.75] transition hover:border-white/[0.40] hover:bg-white/[0.06]">
                      <Eye size={14} />
                      Detalle
                    </Link>
                    {!isDemoMode() && guest.ticket ? <GuestActions guestId={guest.id} token={guest.ticket.token} isValidated={guest.ticket.status === 'USED'} /> : null}
                  </div>
                </DataTableCell>
              </DataTableRow>
            ))}
          </DataTableBody>
        </DataTable>
      </section>
    </div>
  )
}
