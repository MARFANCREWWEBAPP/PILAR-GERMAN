import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, ArrowUpRight, Bus, Clock, MapPin, Route, Sparkles } from 'lucide-react'
import { getBusRoutes } from '@/lib/event'
import { NoSleepBrand } from '@/components/brand/NoSleepBrand'

export default async function BusesPage() {
  const buses = await getBusRoutes()

  return (
    <main className="brand-stage relative min-h-screen overflow-hidden bg-[#020302] px-4 py-5 text-white md:px-8">
      <Image src="/brand/finca-clean.png" alt="" fill className="pointer-events-none object-cover object-center opacity-[0.12] invert mix-blend-screen" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_16%_10%,rgba(247,247,242,0.14),transparent_24%),radial-gradient(circle_at_84%_12%,rgba(255,255,255,0.38),transparent_34%),linear-gradient(135deg,#020302_0%,#0a0f07_54%,#020302_100%)]" />
      <div className="festival-lasers absolute inset-0 opacity-[0.78]" />
      <div className="brand-grid absolute inset-0 opacity-[0.18]" />
      <div className="festival-noise absolute inset-0 opacity-[0.38]" />
      <div className="motion-float pointer-events-none absolute right-[12%] top-[16%] hidden h-24 w-24 rounded-full border border-[#f5f5f5]/[0.18] bg-[#f5f5f5]/[0.06] md:block" />

      <section className="relative z-10 mx-auto max-w-7xl">
        <Link href="/" className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/[0.12] bg-black/[0.45] px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-white/[0.70] backdrop-blur-xl transition hover:text-white">
          <ArrowLeft size={14} />
          Home
        </Link>

        <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_380px]">
          <section className="relative overflow-hidden rounded-[2.8rem] border border-white/[0.12] bg-black/[0.50] p-6 shadow-[0_42px_140px_rgba(0,0,0,0.58)] backdrop-blur-xl md:p-8">
            <div className="absolute right-0 top-0 h-full w-1/2 bg-[radial-gradient(circle_at_78%_18%,rgba(245,245,245,0.22),transparent_42%)]" />
            <div className="relative">
              <div className="inline-flex rounded-[1.8rem] border border-white/[0.10] bg-white/[0.05] p-4 shadow-[0_22px_80px_rgba(0,0,0,0.35)]">
                <NoSleepBrand />
              </div>
              <p className="mt-8 inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.32em] text-[#f5f5f5]"><Sparkles size={14} /> Shuttle service</p>
              <h1 className="mt-3 max-w-4xl font-display text-[clamp(5rem,11vw,10rem)] leading-[0.70] tracking-[-0.09em] text-white">Festival shuttles</h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-white/[0.66]">Rutas de ida y vuelta para llegar al recinto sin improvisar. Guarda tu horario como si fuera otro pase del festival.</p>
            </div>
          </section>

          <aside className="motion-scan rounded-[2.8rem] border border-[#f5f5f5]/[0.22] bg-[#f7f7f2] p-6 text-black shadow-[0_42px_130px_rgba(0,0,0,0.40)]">
            <p className="text-xs font-black uppercase tracking-[0.30em] text-black/[0.46]">Transport pass</p>
            <h2 className="mt-3 font-display text-6xl leading-[0.78] tracking-[-0.05em]">Route wristband</h2>
            <div className="mt-6 grid grid-cols-2 gap-2">
              <div className="rounded-2xl border border-black/[0.10] bg-white/[0.58] p-4">
                <p className="font-display text-5xl leading-none">{buses.length}</p>
                <p className="mt-1 text-[10px] font-black uppercase tracking-[0.20em] text-black/[0.45]">Rutas</p>
              </div>
              <div className="rounded-2xl border border-black/[0.10] bg-black p-4 text-white">
                <Route size={20} className="text-[#f5f5f5]" />
                <p className="mt-3 text-[10px] font-black uppercase tracking-[0.20em] text-white/[0.55]">Gate ready</p>
              </div>
            </div>
          </aside>
        </div>

        <div className="mt-5 grid gap-4 md:grid-cols-2">
          {buses.map((bus, index) => (
            <article key={bus.id} className="motion-tilt relative overflow-hidden rounded-[2.4rem] border border-white/[0.12] bg-black/[0.46] p-6 shadow-[0_30px_100px_rgba(0,0,0,0.38)] backdrop-blur-xl hover:border-[#f5f5f5]/[0.42]">
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#f7f7f2] via-[#f5f5f5] to-transparent" />
              <div className="flex items-start justify-between gap-4">
                <span className="grid h-[3.25rem] w-[3.25rem] place-items-center rounded-2xl bg-[#f7f7f2] p-3 text-black">
                  <Bus size={24} />
                </span>
                <span className="rounded-full border border-[#f5f5f5]/[0.35] bg-[#1a1a1a]/[0.16] px-3 py-1.5 text-xs font-black uppercase tracking-[0.18em] text-[#f5f5f5]">
                  {bus.type === 'OUTBOUND' ? 'Ida' : 'Vuelta'} · 0{index + 1}
                </span>
              </div>
              <h2 className="mt-7 font-display text-6xl leading-[0.82] tracking-[-0.04em] text-white">{bus.title}</h2>
              <div className="mt-6 space-y-4">
                <div className="flex gap-3 border-t border-white/[0.10] pt-4">
                  <MapPin size={18} className="mt-1 shrink-0 text-[#f5f5f5]" />
                  <div>
                    <p className="font-bold text-white">{bus.pointName}</p>
                    <p className="mt-1 text-sm leading-6 text-white/[0.60]">{bus.address}</p>
                  </div>
                </div>
                <div className="flex gap-3 border-t border-white/[0.10] pt-4">
                  <Clock size={18} className="mt-1 shrink-0 text-[#f5f5f5]" />
                  <p className="font-display text-4xl leading-none text-[#f5f5f5]">{bus.departureTime}</p>
                </div>
              </div>
              {bus.notes ? <p className="mt-5 border-t border-white/[0.10] pt-4 text-sm leading-6 text-white/[0.60]">{bus.notes}</p> : null}
              <Link className="mt-6 inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#f7f7f2] px-5 text-sm font-black uppercase tracking-[0.14em] text-black transition hover:bg-[#f5f5f5]" href={bus.mapsUrl} target="_blank">
                Abrir mapa
                <ArrowUpRight size={16} />
              </Link>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}
