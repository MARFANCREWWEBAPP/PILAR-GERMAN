import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, ArrowUpRight, Clock, MapPin, Music2, Sparkles, Ticket } from 'lucide-react'
import { ClubCountdown } from '@/components/brand/ClubCountdown'

const lineup = [
  {
    time: '17:30',
    eyebrow: 'Tardeo',
    title: 'Zambomba y flamenquito divertido',
    text: 'Arranque con alma andaluza, palmas, risas y el punto justo de caos bonito.',
    tone: 'bg-[#f7f7f2] text-black'
  },
  {
    time: '19:00',
    eyebrow: 'Main moment',
    title: 'Baile novios',
    text: 'El momento que abre oficialmente la pista y cambia la energia de la tarde.',
    tone: 'bg-[#1a1a1a] text-black'
  },
  {
    time: '20:00',
    eyebrow: 'Secret booth',
    title: 'Secret DJ',
    text: 'Invitado internacional secreto. No se anuncia. Se descubre cuando empiece a sonar.',
    tone: 'bg-black text-[#f5f5f5]'
  },
  {
    time: '00:00',
    eyebrow: 'Club mode',
    title: 'NO SLEEP WEDDING PARTY',
    text: 'La boda se convierte en club: luces, barra, pista y cero ganas de irse a casa.',
    tone: 'bg-[#f5f5f5] text-black'
  }
]

export default function LineupPage() {
  return (
    <main className="brand-stage relative min-h-screen overflow-hidden bg-[#020302] px-4 py-5 text-white md:px-8">
      <Image src="/brand/finca-clean.png" alt="" fill className="pointer-events-none object-cover object-center opacity-[0.12] invert mix-blend-screen" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_16%_10%,rgba(247,247,242,0.16),transparent_24%),radial-gradient(circle_at_84%_12%,rgba(255,255,255,0.40),transparent_34%),linear-gradient(135deg,#020302_0%,#0a0f07_54%,#020302_100%)]" />
      <div className="festival-lasers absolute inset-0 opacity-[0.82]" />
      <div className="brand-grid absolute inset-0 opacity-[0.18]" />
      <div className="festival-noise absolute inset-0 opacity-[0.40]" />
      <div className="motion-float pointer-events-none absolute left-[8%] top-[22%] hidden h-24 w-24 rounded-full border border-[#f5f5f5]/[0.18] bg-[#f5f5f5]/[0.06] md:block" />
      <div className="motion-float-delay pointer-events-none absolute right-[12%] top-[38%] hidden h-20 w-20 rotate-45 border border-white/[0.14] bg-white/[0.04] md:block" />

      <section className="relative z-10 mx-auto max-w-7xl">
        <Link href="/" className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/[0.12] bg-black/[0.45] px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-white/[0.70] backdrop-blur-xl transition hover:text-white">
          <ArrowLeft size={14} />
          Home
        </Link>

        <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_410px]">
          <section className="relative overflow-hidden rounded-[3rem] border border-white/[0.12] bg-black/[0.54] p-6 shadow-[0_46px_150px_rgba(0,0,0,0.62)] backdrop-blur-xl md:p-9">
            <div className="absolute right-0 top-0 h-full w-1/2 bg-[radial-gradient(circle_at_78%_18%,rgba(245,245,245,0.23),transparent_42%)]" />
            <div className="relative">
              <p className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.32em] text-[#f5f5f5]"><Sparkles size={14} /> Party structure</p>
              <h1 className="mt-4 max-w-5xl font-display text-[clamp(5rem,12vw,11rem)] leading-[0.68] tracking-[-0.09em] text-white">Line-up de la fiesta</h1>
              <p className="mt-7 max-w-2xl text-xl leading-8 text-white/[0.70]">
                Catorce horas. Una boda. Un invitado internacional secreto. Y una noche pensada para que nadie mire el reloj con ganas de irse.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link href="/rsvp" className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#f7f7f2] px-5 text-sm font-black uppercase tracking-[0.14em] text-black transition hover:bg-[#f5f5f5]">
                  <Ticket size={16} />
                  Crear passport
                </Link>
                <Link href="/location" className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-white/[0.18] bg-white/[0.06] px-5 text-sm font-black uppercase tracking-[0.14em] text-white transition hover:border-[#f5f5f5]/[0.44]">
                  <MapPin size={16} />
                  Ver finca
                </Link>
              </div>
            </div>
          </section>

          <aside className="motion-scan rounded-[3rem] border border-[#f5f5f5]/[0.22] bg-[#f7f7f2] p-6 text-black shadow-[0_42px_130px_rgba(0,0,0,0.42)]">
            <p className="text-xs font-black uppercase tracking-[0.30em] text-black/[0.46]">Club clock</p>
            <h2 className="mt-3 font-display text-6xl leading-[0.78] tracking-[-0.05em]">14 hours. No sleep.</h2>
            <div className="mt-6 rounded-[2rem] bg-black p-5 text-white">
              <Clock size={24} className="text-[#f5f5f5]" />
              <p className="mt-5 text-sm leading-6 text-white/[0.64]">Comienzo aproximado 17:30. A partir de medianoche, la boda entra en modo club.</p>
            </div>
            <div className="mt-4">
              <ClubCountdown compact />
            </div>
          </aside>
        </div>

        <section className="mt-5 grid gap-4 lg:grid-cols-4">
          {lineup.map((item, index) => (
            <article key={item.time} className="motion-tilt group relative overflow-hidden rounded-[2.4rem] border border-white/[0.12] bg-black/[0.45] p-5 shadow-[0_30px_100px_rgba(0,0,0,0.36)] backdrop-blur-xl hover:border-[#f5f5f5]/[0.42]">
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#f7f7f2] via-[#f5f5f5] to-transparent" />
              <div className="flex items-start justify-between gap-3">
                <span className={`grid h-16 w-16 place-items-center rounded-2xl ${item.tone}`}>
                  <Music2 size={23} />
                </span>
                <span className="font-display text-5xl leading-none text-white/[0.18] group-hover:text-[#f5f5f5]">0{index + 1}</span>
              </div>
              <p className="mt-8 font-display text-6xl leading-[0.78] tracking-[-0.05em] text-[#f5f5f5]">{item.time}</p>
              <p className="mt-4 text-[10px] font-black uppercase tracking-[0.26em] text-white/[0.42]">{item.eyebrow}</p>
              <h2 className="mt-2 text-lg font-black uppercase tracking-[0.12em] text-white">{item.title}</h2>
              <p className="mt-3 text-sm leading-6 text-white/[0.58]">{item.text}</p>
            </article>
          ))}
        </section>

        <div className="festival-marquee mt-5 overflow-hidden rounded-full border border-white/[0.10] bg-white/[0.045] py-3 text-xs font-black uppercase tracking-[0.34em] text-white/[0.58] backdrop-blur-xl">
          <div>
            <span>17:30 TARDEO · ZAMBOMBA Y FLAMENQUITO · 19:00 BAILE NOVIOS · 20:00 SECRET DJ · 00:00 NO SLEEP WEDDING PARTY · </span>
            <span>17:30 TARDEO · ZAMBOMBA Y FLAMENQUITO · 19:00 BAILE NOVIOS · 20:00 SECRET DJ · 00:00 NO SLEEP WEDDING PARTY · </span>
          </div>
        </div>
      </section>
    </main>
  )
}
