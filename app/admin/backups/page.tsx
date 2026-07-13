import Link from 'next/link'
import { ArrowUpRight, Database, Download, ShieldCheck, Sparkles } from 'lucide-react'

const backupItems = [
  'Invitados y acompañantes',
  'Passports y estado de puerta',
  'Textos públicos editados desde admin',
  'Ajustes del evento',
  'Rutas de bus',
  'Admins sin contraseñas ni hashes'
]

export default function AdminBackupsPage() {
  return (
    <main className="space-y-6">
      <section className="relative overflow-hidden rounded-[2.7rem] border border-white/[0.10] bg-black/[0.62] p-6 shadow-[0_40px_130px_rgba(0,0,0,0.48)] backdrop-blur-xl md:p-8">
        <div className="absolute -right-24 -top-28 h-80 w-80 rounded-full border border-white/[0.12] bg-white/[0.08]" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/80 to-transparent" />
        <div className="relative grid gap-8 xl:grid-cols-[minmax(0,1fr)_390px] xl:items-end">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-white/[0.12] bg-white/[0.05] px-3 py-2 text-[10px] font-black uppercase tracking-[0.24em] text-white/64">
              <Database size={14} />
              Data safety
            </p>
            <h1 className="mt-5 max-w-3xl font-display text-[clamp(4rem,8vw,8rem)] leading-[0.76] tracking-[-0.08em] text-white">
              Backups
            </h1>
            <p className="mt-5 max-w-2xl text-sm leading-6 text-white/[0.62]">
              Descarga una copia completa de la información operativa antes de subir versiones, tocar Railway o hacer cambios grandes.
            </p>
          </div>

          <a
            href="/api/admin/backup/json"
            className="inline-flex h-14 items-center justify-center gap-3 rounded-full bg-white px-6 text-sm font-black uppercase tracking-[0.14em] text-black transition hover:bg-white/86"
          >
            <Download size={18} />
            Descargar backup JSON
          </a>
        </div>
      </section>

      <section className="grid gap-3 lg:grid-cols-[1fr_380px]">
        <div className="rounded-[2rem] border border-white/[0.12] bg-black/[0.42] p-5 shadow-[0_24px_90px_rgba(0,0,0,0.28)] backdrop-blur-xl">
          <div className="flex items-center gap-2">
            <Sparkles size={18} className="text-white" />
            <h2 className="font-display text-5xl leading-none text-white">Qué incluye</h2>
          </div>
          <div className="mt-5 grid gap-2 sm:grid-cols-2">
            {backupItems.map((item) => (
              <div key={item} className="flex items-center gap-3 rounded-2xl border border-white/[0.08] bg-white/[0.035] px-4 py-3">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-white text-black">
                  <ShieldCheck size={16} />
                </span>
                <p className="text-sm font-semibold text-white/76">{item}</p>
              </div>
            ))}
          </div>
        </div>

        <aside className="rounded-[2rem] border border-white/[0.12] bg-[#f7f7f2] p-5 text-black shadow-[0_24px_90px_rgba(0,0,0,0.28)]">
          <p className="text-[10px] font-black uppercase tracking-[0.24em] text-black/42">Regla importante</p>
          <h2 className="mt-2 font-display text-5xl leading-[0.86] tracking-[-0.05em] text-black">
            Código por un lado.
            <br />
            Datos por otro.
          </h2>
          <p className="mt-5 text-sm leading-6 text-black/62">
            GitHub guarda la versión de la app. Railway despliega el código. PostgreSQL conserva la información. Si mantienes la misma base de datos, actualizar la app no borra invitados, textos ni passports.
          </p>
          <Link href="/admin/content" className="mt-5 inline-flex items-center gap-2 rounded-full border border-black/[0.12] bg-black px-4 py-3 text-xs font-black uppercase tracking-[0.14em] text-white transition hover:bg-black/85">
            Ver textos guardados
            <ArrowUpRight size={14} />
          </Link>
        </aside>
      </section>
    </main>
  )
}
