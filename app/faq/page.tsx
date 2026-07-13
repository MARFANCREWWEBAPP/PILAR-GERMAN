import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, HelpCircle, Sparkles } from 'lucide-react'

export default function FaqPage() {
  const faqs = [
    ['¿Necesito entrada para entrar?', 'Sí. Sin QR o passport válido no hay acceso. Guarda el PDF o añade el pase a Wallet cuando esté configurado.'],
    ['¿Puedo llevar acompañante?', 'Si tu confirmación incluye acompañantes, sí. Si no aparece en lista, hay que revisarlo con producción.'],
    ['¿Hay buses?', 'Sí. Las rutas de ida y vuelta aparecen en la sección Shuttles / Buses.'],
    ['¿Qué pasa si pierdo mi entrada?', 'Puedes usar el enlace original del passport o pedir reenvío desde organización.'],
    ['¿Puedo cambiar mi confirmación?', 'Sí, escribiendo a la organización con tu email registrado.'],
    ['¿Cuál es el dress code?', 'Elegancia festivalera en blanco y negro. Que parezca boda, pero con alma de headline.'],
    ['¿Dónde es?', 'La localización completa está en la sección Map / Ubicación.']
  ]

  return (
    <main className="brand-stage relative min-h-screen overflow-hidden bg-[#020302] px-4 py-5 text-white md:px-8">
      <Image src="/brand/finca-clean.png" alt="" fill className="pointer-events-none object-cover object-center opacity-[0.10] invert mix-blend-screen" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_16%_10%,rgba(247,247,242,0.14),transparent_24%),radial-gradient(circle_at_84%_12%,rgba(255,255,255,0.36),transparent_34%),linear-gradient(135deg,#020302_0%,#0a0f07_54%,#020302_100%)]" />
      <div className="festival-lasers absolute inset-0 opacity-[0.76]" />
      <div className="brand-grid absolute inset-0 opacity-[0.18]" />
      <div className="festival-noise absolute inset-0 opacity-[0.38]" />

      <section className="relative z-10 mx-auto max-w-5xl">
        <Link href="/" className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/[0.12] bg-black/[0.45] px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-white/[0.70] backdrop-blur-xl transition hover:text-white">
          <ArrowLeft size={14} />
          Home
        </Link>

        <div className="relative overflow-hidden rounded-[2.8rem] border border-white/[0.12] bg-black/[0.52] p-6 shadow-[0_42px_140px_rgba(0,0,0,0.56)] backdrop-blur-xl md:p-8">
          <div className="absolute right-0 top-0 h-full w-1/2 bg-[radial-gradient(circle_at_78%_16%,rgba(245,245,245,0.20),transparent_42%)]" />
          <div className="relative">
            <HelpCircle size={26} className="text-[#f5f5f5]" />
            <p className="mt-6 inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.32em] text-[#f5f5f5]"><Sparkles size={14} /> Guest briefing</p>
            <h1 className="mt-3 font-display text-[clamp(5rem,12vw,10rem)] leading-[0.70] tracking-[-0.09em] text-white">FAQ</h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/[0.66]">Respuestas rápidas para llegar al NO SLEEP WEDDING CLUB sin dudas y con el passport listo.</p>
          </div>
        </div>

        <section className="mt-5 grid gap-3">
          {faqs.map(([q, a], index) => (
            <details key={q} className="group motion-tilt rounded-[2rem] border border-white/[0.12] bg-black/[0.46] p-5 shadow-[0_22px_80px_rgba(0,0,0,0.26)] backdrop-blur-xl transition open:border-[#f5f5f5]/[0.40] hover:border-[#f5f5f5]/[0.34]">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-black uppercase tracking-[0.10em] text-white">
                <span>{q}</span>
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#f7f7f2] text-xs font-black text-black transition group-open:rotate-45">0{index + 1}</span>
              </summary>
              <p className="mt-4 border-t border-white/[0.10] pt-4 text-sm leading-7 text-white/[0.62]">{a}</p>
            </details>
          ))}
        </section>
      </section>
    </main>
  )
}
