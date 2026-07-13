import Link from 'next/link'
import { ArrowUpRight, Bus, ClipboardCheck, Database, FileDown, FileText, HelpCircle, MapPinned, Music2, QrCode, Rocket, Settings, Sparkles, Users } from 'lucide-react'

const primaryItems = [
  {
    href: '/rsvp',
    label: 'Registro invitados',
    description: 'Formulario público para confirmar asistencia, acompañante, bus y emisión de passport.',
    icon: ClipboardCheck
  },
  {
    href: '/admin/guests',
    label: 'Listado invitados',
    description: 'Control interno de registros, acompañantes, buses, entradas y detalle individual.',
    icon: Users
  },
  {
    href: '/admin/scan',
    label: 'Scanner entradas',
    description: 'Validación en puerta con QR o token manual para mantener el acceso bajo control.',
    icon: QrCode
  },
  {
    href: '/admin/content',
    label: 'Textos invitados',
    description: 'Editor de textos de portada y registro público para cambiar copy sin tocar código.',
    icon: FileText
  }
]

const secondaryItems = [
  { href: '/admin/launch', label: 'Lanzamiento', description: 'Checklist GitHub/Railway antes de publicar.', icon: Rocket },
  { href: '/lineup', label: 'Line-up', description: 'Organigrama de la fiesta y cambios de energía.', icon: Music2 },
  { href: '/buses', label: 'Bus Cártama', description: 'Trayecto Cártama estación hacia la finca.', icon: Bus },
  { href: '/location', label: 'Ubicación', description: 'Finca San Isidro, Ardales y mapas.', icon: MapPinned },
  { href: '/faq', label: 'FAQ', description: 'Dudas frecuentes para invitados.', icon: HelpCircle },
  { href: '/admin/backups', label: 'Backups', description: 'Descarga completa de datos operativos.', icon: Database },
  { href: '/admin/settings', label: 'Ajustes', description: 'Datos principales del evento.', icon: Settings },
  { href: '/admin/export/xlsx', label: 'Exportar Excel', description: 'Descarga operativa de invitados.', icon: FileDown }
]

export default function AdminMenusPage() {
  return (
    <div className="space-y-6">
      <section className="relative overflow-hidden rounded-[2.7rem] border border-white/[0.10] bg-black/[0.62] p-6 text-white shadow-[0_40px_130px_rgba(0,0,0,0.48)] backdrop-blur-xl md:p-8">
        <div className="absolute -right-24 -top-28 h-80 w-80 rounded-full border border-white/[0.12] bg-white/[0.08]" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/80 to-transparent" />
        <div className="relative flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-white/[0.12] bg-white/[0.05] px-3 py-2 text-[10px] font-black uppercase tracking-[0.24em] text-white/64">
              <Sparkles size={14} />
              Command navigation
            </p>
            <h1 className="mt-5 max-w-3xl font-display text-[clamp(4rem,8vw,8rem)] leading-[0.76] tracking-[-0.08em] text-white">
              No Sleep command
            </h1>
            <p className="mt-5 max-w-2xl text-sm leading-6 text-white/62">
              Atajos internos y públicos para controlar todo el circuito: registro, listado, puerta, buses, mapas, FAQ y exportaciones.
            </p>
          </div>
          <Link
            href="/rsvp"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-white px-5 text-sm font-black uppercase tracking-[0.13em] text-black transition hover:bg-white/86"
          >
            Abrir registro
            <ArrowUpRight size={16} />
          </Link>
        </div>
      </section>

      <section className="grid gap-3 lg:grid-cols-4">
        {primaryItems.map((item, index) => {
          const Icon = item.icon
          return (
            <Link
              key={item.href}
              href={item.href}
              className="group relative overflow-hidden rounded-[2rem] border border-white/[0.10] bg-white/[0.045] p-5 backdrop-blur-xl transition hover:-translate-y-1 hover:border-white/[0.34] hover:bg-white/[0.075]"
            >
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-white via-white/35 to-transparent" />
              <div className="flex items-start justify-between gap-4">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-black">
                  <Icon size={21} />
                </span>
                <span className="font-display text-5xl leading-none text-white/12">0{index + 1}</span>
              </div>
              <h2 className="mt-7 font-display text-4xl leading-none text-white">{item.label}</h2>
              <p className="mt-3 text-sm leading-6 text-white/60">{item.description}</p>
              <div className="mt-5 inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.18em] text-white">
                Entrar
                <ArrowUpRight size={14} />
              </div>
            </Link>
          )
        })}
      </section>

      <section className="rounded-[2rem] border border-white/[0.10] bg-black/[0.44] p-4 backdrop-blur-xl">
        <div className="mb-3 flex items-center justify-between gap-3">
          <h2 className="font-display text-4xl leading-none text-white">Rutas rápidas</h2>
          <p className="text-xs font-black uppercase tracking-[0.18em] text-white/45">Público e interno</p>
        </div>
        <div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-8">
          {secondaryItems.map((item) => {
            const Icon = item.icon
            return (
              <Link
                key={item.href}
                href={item.href}
                className="group flex min-h-28 gap-3 rounded-2xl border border-white/[0.08] bg-white/[0.035] p-3 transition hover:border-white/[0.35] hover:bg-white/[0.08]"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-white/[0.08] text-white/80 group-hover:bg-white group-hover:text-black">
                  <Icon size={18} />
                </span>
                <span className="min-w-0">
                  <span className="block text-sm font-semibold text-white">{item.label}</span>
                  <span className="mt-1 block text-xs leading-5 text-white/55">{item.description}</span>
                </span>
              </Link>
            )
          })}
        </div>
      </section>
    </div>
  )
}
