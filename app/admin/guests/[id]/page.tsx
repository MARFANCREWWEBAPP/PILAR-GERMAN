import Link from 'next/link'
import { ArrowLeft, ArrowUpRight, Bus, Download, Mail, Phone, QrCode, Save, ShieldCheck, Ticket, UserRound } from 'lucide-react'
import { notFound, redirect } from 'next/navigation'
import { prisma } from '@/lib/db'
import { demoGuests, isDemoMode } from '@/lib/demo-data'
import { Badge } from '@/components/ui/Badge'
import { GuestActions } from '@/components/admin/GuestActions'

const inputClass = 'h-12 w-full rounded-2xl border border-white/[0.14] bg-black/[0.42] px-3 text-sm text-white outline-none transition placeholder:text-white/[0.32] focus:border-[#f5f5f5]/[0.55] focus:ring-4 focus:ring-[rgba(245,245,245,0.10)]'
const selectClass = 'h-12 w-full rounded-2xl border border-white/[0.14] bg-black/[0.58] px-3 text-sm text-white outline-none transition focus:border-[#f5f5f5]/[0.55]'
const labelClass = 'text-xs font-black uppercase tracking-[0.22em] text-white/[0.44]'

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className={labelClass}>{label}</span>
      <div className="mt-2">{children}</div>
    </label>
  )
}

export default async function GuestDetailPage({ params }: { params: { id: string } }) {
  const id = Number(params.id)
  const guest = isDemoMode()
    ? demoGuests.find((row) => row.id === id) || null
    : await prisma.guest.findUnique({
        where: { id },
        include: { ticket: true }
      })

  if (!guest) notFound()

  const guestDefaults = {
    firstName: guest.firstName,
    lastName: guest.lastName,
    phone: guest.phone,
    email: guest.email,
    invitedBy: guest.invitedBy,
    attendanceStatus: guest.attendanceStatus,
    busPreference: guest.busPreference,
    busPoint: guest.busPoint ?? '',
    allergies: guest.allergies ?? '',
    notes: guest.notes ?? ''
  }

  async function save(formData: FormData) {
    'use server'

    if (isDemoMode()) {
      redirect('/admin/guests')
    }

    const attendanceStatus = formData.get('attendanceStatus') as 'CONFIRMED' | 'DECLINED' | 'PENDING' | null
    const busPreference = formData.get('busPreference') as 'NONE' | 'OUTBOUND' | 'RETURN' | 'BOTH' | null

    await prisma.guest.update({
      where: { id },
      data: {
        firstName: String(formData.get('firstName') || guestDefaults.firstName),
        lastName: String(formData.get('lastName') || guestDefaults.lastName),
        phone: String(formData.get('phone') || guestDefaults.phone),
        email: String(formData.get('email') || guestDefaults.email),
        invitedBy: String(formData.get('invitedBy') || guestDefaults.invitedBy),
        attendanceStatus: attendanceStatus ?? guestDefaults.attendanceStatus,
        busPreference: busPreference ?? guestDefaults.busPreference,
        busPoint: String(formData.get('busPoint') || ''),
        allergies: guestDefaults.allergies,
        notes: String(formData.get('notes') || '')
      }
    })

    redirect('/admin/guests')
  }

  const guestName = `${guest.firstName} ${guest.lastName}`
  const passportCode = guest.ticket ? `NSWC-0612-${guest.ticket.token.slice(0, 8).toUpperCase()}` : 'NO PASSPORT'
  const isValidated = guest.ticket?.status === 'USED'

  return (
    <main className="space-y-6">
      <section className="relative overflow-hidden rounded-[2.6rem] border border-white/[0.12] bg-black/[0.50] p-6 shadow-[0_34px_110px_rgba(0,0,0,0.44)] backdrop-blur-xl md:p-8">
        <div className="absolute right-0 top-0 h-full w-1/2 bg-[radial-gradient(circle_at_74%_16%,rgba(245,245,245,0.22),transparent_42%)]" />
        <div className="relative">
          <Link href="/admin/guests" className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/[0.12] bg-white/[0.045] px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-white/[0.64] transition hover:text-white">
            <ArrowLeft size={14} />
            Invitados
          </Link>
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.30em] text-[#f5f5f5]">Guest credential</p>
              <h1 className="mt-3 max-w-4xl font-display text-6xl leading-[0.82] tracking-[-0.05em] text-white md:text-7xl">{guestName}</h1>
              <div className="mt-4 flex flex-wrap gap-3 text-sm text-white/[0.60]">
                <span className="inline-flex items-center gap-2"><Mail size={15} className="text-[#f5f5f5]" />{guest.email}</span>
                <span className="inline-flex items-center gap-2"><Phone size={15} className="text-[#f5f5f5]" />{guest.phone}</span>
              </div>
            </div>
            <Badge tone={guest.attendanceStatus === 'CONFIRMED' ? 'success' : guest.attendanceStatus === 'DECLINED' ? 'danger' : 'muted'}>
              {guest.attendanceStatus}
            </Badge>
          </div>
        </div>
      </section>

      <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_390px]">
        <form action={save} className="rounded-[2.2rem] border border-white/[0.12] bg-black/[0.38] p-5 shadow-[0_26px_95px_rgba(0,0,0,0.30)] backdrop-blur-xl">
          <div className="mb-5 flex items-center gap-2">
            <UserRound size={18} className="text-[#f5f5f5]" />
            <h2 className="font-display text-4xl leading-none text-white">Datos de acreditación</h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Nombre">
              <input name="firstName" defaultValue={guest.firstName} placeholder="Nombre" className={inputClass} />
            </Field>
            <Field label="Apellidos">
              <input name="lastName" defaultValue={guest.lastName} placeholder="Apellidos" className={inputClass} />
            </Field>
            <Field label="Teléfono">
              <input name="phone" defaultValue={guest.phone} placeholder="Teléfono" className={inputClass} />
            </Field>
            <Field label="Email">
              <input name="email" defaultValue={guest.email} placeholder="Email" className={inputClass} />
            </Field>
            <Field label="Grupo">
              <input name="invitedBy" defaultValue={guest.invitedBy} placeholder="Invitado por" className={inputClass} />
            </Field>
            <Field label="Estado">
              <select name="attendanceStatus" defaultValue={guest.attendanceStatus} className={selectClass}>
                <option value="CONFIRMED">Confirmado</option>
                <option value="DECLINED">No asiste</option>
                <option value="PENDING">Pendiente</option>
              </select>
            </Field>
            <Field label="Bus">
              <select name="busPreference" defaultValue={guest.busPreference} className={selectClass}>
                <option value="NONE">No usa bus</option>
                <option value="OUTBOUND">Cártama estación → Finca</option>
              </select>
            </Field>
            <Field label="Trayecto de bus">
              <input name="busPoint" defaultValue={guest.busPoint ?? ''} placeholder="Cártama estación → Finca San Isidro" className={inputClass} />
            </Field>
            <Field label="Observaciones">
              <textarea name="notes" defaultValue={guest.notes ?? ''} placeholder="Observaciones" className="min-h-28 w-full rounded-2xl border border-white/[0.14] bg-black/[0.42] px-3 py-3 text-sm text-white outline-none transition placeholder:text-white/[0.32] focus:border-[#f5f5f5]/[0.55] focus:ring-4 focus:ring-[rgba(245,245,245,0.10)]" />
            </Field>
          </div>

          <button className="mt-5 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-[#f7f7f2] px-5 text-sm font-black uppercase tracking-[0.14em] text-black transition hover:bg-[#f5f5f5]">
            <Save size={16} />
            Guardar cambios
          </button>
        </form>

        <aside className="space-y-3">
          <div className="motion-scan overflow-hidden rounded-[2.2rem] border border-[#f5f5f5]/[0.22] bg-[#f7f7f2] p-5 text-black shadow-[0_30px_100px_rgba(0,0,0,0.34)]">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.28em] text-black/[0.46]">Passport</p>
                <h2 className="mt-2 font-display text-5xl leading-[0.82] tracking-[-0.04em]">Access pass</h2>
              </div>
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-black text-[#f5f5f5]">
                <Ticket size={22} />
              </span>
            </div>

            <div className="mt-6 rounded-[1.6rem] border border-black/[0.10] bg-white/[0.68] p-4">
              <p className="text-[10px] font-black uppercase tracking-[0.24em] text-black/[0.45]">Código</p>
              <p className="mt-2 font-mono text-sm font-bold text-black/[0.72]">{passportCode}</p>
              <div className="mt-4 grid grid-cols-2 gap-2">
                <div className="rounded-2xl bg-black p-3 text-white">
                  <ShieldCheck size={17} className="text-[#f5f5f5]" />
                  <p className="mt-3 text-[10px] font-black uppercase tracking-[0.18em] text-white/[0.55]">{guest.ticket?.status ?? 'NO TICKET'}</p>
                </div>
                <div className="rounded-2xl border border-black/[0.10] p-3">
                  <Bus size={17} className="text-[#111111]" />
                  <p className="mt-3 text-[10px] font-black uppercase tracking-[0.18em] text-black/[0.50]">{guest.busPreference}</p>
                </div>
              </div>
            </div>

            {guest.ticket ? (
              <div className="mt-4 grid gap-2">
                <Link className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-black px-4 text-sm font-black uppercase tracking-[0.13em] text-white transition hover:bg-[#111111]" href={`/ticket/${guest.ticket.token}`}>
                  Ver passport
                  <ArrowUpRight size={15} />
                </Link>
                <a className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-black/[0.12] bg-white px-4 text-sm font-black uppercase tracking-[0.13em] text-black transition hover:bg-[#f5f5f5]" href={`/api/ticket/${guest.ticket.token}/pdf`}>
                  <Download size={15} />
                  PDF
                </a>
                <a className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-black/[0.12] bg-white px-4 text-sm font-black uppercase tracking-[0.13em] text-black transition hover:bg-[#f5f5f5]" href={`/api/ticket/${guest.ticket.token}/png`} target="_blank">
                  <QrCode size={15} />
                  QR
                </a>
              </div>
            ) : (
              <p className="mt-4 rounded-2xl border border-black/[0.10] bg-white/[0.56] px-4 py-3 text-sm leading-6 text-black/[0.62]">Este invitado todavía no tiene passport generado.</p>
            )}
          </div>

          {!isDemoMode() && guest.ticket ? <GuestActions guestId={guest.id} token={guest.ticket.token} isValidated={isValidated} /> : null}

          {isDemoMode() ? (
            <p className="rounded-[1.6rem] border border-white/[0.12] bg-black/[0.32] p-4 text-xs leading-5 text-white/[0.52] backdrop-blur-xl">
              Modo demo activo: los cambios se previsualizan, pero no se guardan hasta conectar la base de datos.
            </p>
          ) : null}
        </aside>
      </div>
    </main>
  )
}
