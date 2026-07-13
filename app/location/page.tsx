import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, ArrowUpRight, Car, Clock, DoorOpen, MapPin, Navigation, Sparkles } from 'lucide-react'
import { getEventConfig } from '@/lib/event'
import { NoSleepBrand } from '@/components/brand/NoSleepBrand'

const venueWebsite = 'https://cortijosanisidro.com/'

const accessCards = [
  { icon: Car, title: 'Parking', text: 'Abierto para invitados con passport o nombre en lista.' },
  { icon: DoorOpen, title: 'Acceso', text: 'Entrada principal del recinto con validación QR.' },
  { icon: Clock, title: 'Llegada', text: 'Recomendado llegar con margen para acreditación.' }
]

export default async function LocationPage() {
  const event = await getEventConfig()

  return (
    <main className="brand-stage relative min-h-screen overflow-hidden bg-[#020302] px-4 py-5 text-white md:px-8">
      <Image src="/brand/finca-clean.png" alt="" fill className="pointer-events-none object-cover object-center opacity-[0.14] invert mix-blend-screen" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_16%_10%,rgba(247,247,242,0.14),transparent_24%),radial-gradient(circle_at_84%_12%,rgba(255,255,255,0.38),transparent_34%),linear-gradient(135deg,#020302_0%,#0a0f07_54%,#020302_100%)]" />
      <div className="festival-lasers absolute inset-0 opacity-[0.78]" />
      <div className="brand-grid absolute inset-0 opacity-[0.18]" />
      <div className="festival-noise absolute inset-0 opacity-[0.38]" />

      <section className="relative z-10 mx-auto max-w-7xl">
        <Link href="/" className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/[0.12] bg-black/[0.45] px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-white/[0.70] backdrop-blur-xl transition hover:text-white">
          <ArrowLeft size={14} />
          Home
        </Link>

        <div className="grid overflow-hidden rounded-[3rem] border border-white/[0.12] bg-black/[0.54] shadow-[0_46px_150px_rgba(0,0,0,0.62)] backdrop-blur-xl lg:grid-cols-[1fr_420px]">
          <div className="relative min-h-[620px] p-6 md:p-9">
            <div className="absolute right-10 top-10 hidden h-64 w-64 rounded-full border border-[#f5f5f5]/[0.18] md:block" />
            <div className="relative">
              <div className="inline-flex rounded-[1.8rem] border border-white/[0.10] bg-white/[0.05] p-4 shadow-[0_22px_80px_rgba(0,0,0,0.35)]">
                <NoSleepBrand />
              </div>
              <p className="mt-8 inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.32em] text-[#f5f5f5]"><Sparkles size={14} /> Venue map</p>
              <h1 className="mt-3 max-w-5xl font-display text-[clamp(5rem,11vw,10.5rem)] leading-[0.70] tracking-[-0.09em] text-white">Find the field</h1>
              <p className="mt-7 font-display text-6xl leading-[0.82] tracking-[-0.04em] text-[#f7f7f2]">{event.venueName}</p>
              <p className="mt-4 max-w-2xl text-base leading-8 text-white/[0.62]">{event.address}</p>
            </div>
          </div>

          <aside className="relative overflow-hidden border-t border-white/[0.10] bg-[#f7f7f2] p-6 text-black lg:border-l lg:border-t-0 lg:p-8">
            <div className="absolute -right-24 -top-24 h-56 w-56 rounded-full bg-[#1a1a1a]/[0.26] blur-3xl" />
            <div className="relative">
              <p className="text-xs font-black uppercase tracking-[0.30em] text-[#111111]">City access</p>
              <p className="mt-3 font-display text-6xl leading-[0.78] tracking-[-0.05em]">{event.city}</p>
              <div className="motion-scan mt-7 rounded-[2rem] border border-black/[0.10] bg-white p-5 shadow-[0_24px_80px_rgba(0,0,0,0.14)]">
                <MapPin size={42} className="text-[#111111]" />
                <p className="mt-5 text-sm leading-6 text-black/[0.62]">Abre tu app de mapas favorita y guarda la ruta antes de salir.</p>
              </div>
            </div>
          </aside>
        </div>

        <section className="mt-5 grid gap-3 md:grid-cols-3">
          {accessCards.map(({ icon: VisualIcon, title, text }) => {
            return (
              <div key={title} className="motion-tilt rounded-[2rem] border border-white/[0.12] bg-black/[0.42] p-5 shadow-[0_24px_90px_rgba(0,0,0,0.28)] backdrop-blur-xl hover:border-[#f5f5f5]/[0.40]">
                <VisualIcon size={20} className="text-[#f5f5f5]" />
                <p className="mt-5 text-sm font-black uppercase tracking-[0.16em] text-white">{title}</p>
                <p className="mt-2 text-sm leading-6 text-white/[0.60]">{text}</p>
              </div>
            )
          })}
        </section>

        <section className="mt-5 grid gap-2 sm:grid-cols-4">
          <a className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#f7f7f2] px-5 text-sm font-black uppercase tracking-[0.14em] text-black transition hover:bg-[#f5f5f5]" href={event.googleMapsUrl} target="_blank">
            <Navigation size={16} />
            Google Maps
          </a>
          <a className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-[#f5f5f5]/[0.28] bg-[#1a1a1a]/[0.16] px-5 text-sm font-black uppercase tracking-[0.14em] text-[#f5f5f5] transition hover:bg-[#1a1a1a]/[0.24]" href={venueWebsite} target="_blank">
            Web finca
            <ArrowUpRight size={16} />
          </a>
          {event.appleMapsUrl ? (
            <a className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-white/[0.18] bg-white/[0.06] px-5 text-sm font-black uppercase tracking-[0.14em] text-white transition hover:border-[#f5f5f5]/[0.44]" href={event.appleMapsUrl} target="_blank">
              Apple Maps
              <ArrowUpRight size={16} />
            </a>
          ) : null}
          {event.wazeUrl ? (
            <a className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-white/[0.18] bg-white/[0.06] px-5 text-sm font-black uppercase tracking-[0.14em] text-white transition hover:border-[#f5f5f5]/[0.44]" href={event.wazeUrl} target="_blank">
              Waze
              <ArrowUpRight size={16} />
            </a>
          ) : null}
        </section>
      </section>
    </main>
  )
}
