import Link from 'next/link'
import { ArrowUpRight, CheckCircle2, Database, FileText, Globe2, Rocket, Settings, ShieldCheck } from 'lucide-react'

const launchChecks = [
  {
    title: 'Base de datos persistente',
    description: 'Railway PostgreSQL conserva invitados, passports, textos, ajustes y validaciones aunque subas una versión nueva.',
    status: 'Crítico',
    icon: Database
  },
  {
    title: 'Autoguardado admin',
    description: 'Textos públicos y ajustes del evento se guardan automáticamente en la base de datos.',
    status: 'Activo',
    icon: ShieldCheck
  },
  {
    title: 'Backup manual',
    description: 'Antes de tocar Railway o desplegar una versión grande, descarga una copia JSON desde Backups.',
    status: 'Recomendado',
    icon: CheckCircle2
  },
  {
    title: 'BASE_URL final',
    description: 'Cuando Railway entregue la URL pública o el dominio propio, pon esa URL en BASE_URL.',
    status: 'Pendiente Railway',
    icon: Globe2
  }
]

const launchLinks = [
  { href: '/admin/backups', label: 'Descargar backup', icon: Database },
  { href: '/admin/content', label: 'Editar textos', icon: FileText },
  { href: '/admin/settings', label: 'Ajustes evento', icon: Settings },
  { href: '/rsvp', label: 'Ver registro', icon: Globe2 },
  { href: '/admin/scan', label: 'Probar scanner', icon: ShieldCheck }
]

export default function AdminLaunchPage() {
  return (
    <main className="space-y-6">
      <section className="relative overflow-hidden rounded-[2.7rem] border border-white/[0.10] bg-black/[0.62] p-6 shadow-[0_40px_130px_rgba(0,0,0,0.48)] backdrop-blur-xl md:p-8">
        <div className="absolute -right-24 -top-28 h-80 w-80 rounded-full border border-white/[0.12] bg-white/[0.08]" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/80 to-transparent" />
        <div className="relative grid gap-8 xl:grid-cols-[minmax(0,1fr)_390px] xl:items-end">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-white/[0.12] bg-white/[0.05] px-3 py-2 text-[10px] font-black uppercase tracking-[0.24em] text-white/64">
              <Rocket size={14} />
              Deploy control
            </p>
            <h1 className="mt-5 max-w-3xl font-display text-[clamp(4rem,8vw,8rem)] leading-[0.76] tracking-[-0.08em] text-white">
              Lanzamiento
            </h1>
            <p className="mt-5 max-w-2xl text-sm leading-6 text-white/[0.62]">
              Checklist rápida para subir la web a GitHub/Railway sin perder información y con todo el circuito operativo controlado.
            </p>
          </div>

          <div className="rounded-[2rem] border border-white/[0.12] bg-white/[0.055] p-5">
            <p className="text-[10px] font-black uppercase tracking-[0.24em] text-white/42">Regla de oro</p>
            <p className="mt-3 font-display text-4xl leading-[0.86] tracking-[-0.04em] text-white">
              Código se actualiza.
              <br />
              Datos permanecen.
            </p>
          </div>
        </div>
      </section>

      <section className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        {launchChecks.map((item) => {
          const Icon = item.icon
          return (
            <article key={item.title} className="rounded-[2rem] border border-white/[0.10] bg-white/[0.045] p-5 backdrop-blur-xl">
              <div className="flex items-start justify-between gap-4">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-white text-black">
                  <Icon size={20} />
                </span>
                <span className="rounded-full border border-white/[0.12] bg-white/[0.06] px-3 py-2 text-[9px] font-black uppercase tracking-[0.18em] text-white/58">
                  {item.status}
                </span>
              </div>
              <h2 className="mt-6 text-lg font-black uppercase tracking-[0.10em] text-white">{item.title}</h2>
              <p className="mt-3 text-sm leading-6 text-white/58">{item.description}</p>
            </article>
          )
        })}
      </section>

      <section className="grid gap-3 lg:grid-cols-[1fr_380px]">
        <div className="rounded-[2rem] border border-white/[0.12] bg-black/[0.42] p-5 shadow-[0_24px_90px_rgba(0,0,0,0.28)] backdrop-blur-xl">
          <h2 className="font-display text-5xl leading-none text-white">Acciones antes de subir</h2>
          <div className="mt-5 grid gap-2 sm:grid-cols-2 xl:grid-cols-3">
            {launchLinks.map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group flex min-h-24 items-center gap-3 rounded-2xl border border-white/[0.08] bg-white/[0.035] px-3 py-3 transition hover:border-white/[0.35] hover:bg-white/[0.08]"
                >
                  <span className="grid h-10 w-10 place-items-center rounded-2xl bg-white/[0.08] text-white/80 group-hover:bg-white group-hover:text-black">
                    <Icon size={18} />
                  </span>
                  <span className="text-sm font-semibold text-white">{item.label}</span>
                </Link>
              )
            })}
          </div>
        </div>

        <aside className="rounded-[2rem] border border-white/[0.12] bg-[#f7f7f2] p-5 text-black shadow-[0_24px_90px_rgba(0,0,0,0.28)]">
          <p className="text-[10px] font-black uppercase tracking-[0.24em] text-black/42">Orden recomendado</p>
          <ol className="mt-5 space-y-3">
            {['Descargar backup', 'Revisar textos públicos', 'Revisar ajustes', 'Subir a GitHub', 'Conectar Railway + Postgres'].map((step, index) => (
              <li key={step} className="flex gap-3 rounded-2xl border border-black/[0.08] bg-white px-3 py-3">
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-black text-xs font-black text-white">{index + 1}</span>
                <span className="pt-1 text-sm font-bold text-black/70">{step}</span>
              </li>
            ))}
          </ol>
          <a href="/api/admin/backup/json" className="mt-5 inline-flex items-center gap-2 rounded-full border border-black/[0.12] bg-black px-4 py-3 text-xs font-black uppercase tracking-[0.14em] text-white transition hover:bg-black/85">
            Backup ahora
            <ArrowUpRight size={14} />
          </a>
        </aside>
      </section>
    </main>
  )
}
