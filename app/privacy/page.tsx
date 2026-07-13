import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, ShieldCheck, Sparkles } from 'lucide-react'
import { NoSleepBrand } from '@/components/brand/NoSleepBrand'

const sections = [
  ['Responsable', 'Los organizadores de la boda. Finalidad: gestión de asistencia, envío de confirmaciones y control de acceso.'],
  ['Datos tratados', 'Nombre, apellidos, email, teléfono, preferencias de asistencia y transporte, notas y alergias.'],
  ['Conservación', 'Se conservarán solo el tiempo necesario para organización y seguimiento del evento.'],
  ['Tus derechos', 'Acceso, rectificación, oposición, supresión y limitación de tus datos.'],
  ['Contacto', 'Disponible en la configuración pública del evento.']
]

export default function PrivacyPage() {
  return (
    <main className="brand-stage relative min-h-screen overflow-hidden bg-[#020302] px-4 py-5 text-white md:px-8">
      <Image src="/brand/finca-clean.png" alt="" fill className="pointer-events-none object-cover object-center opacity-[0.10] invert mix-blend-screen" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_16%_10%,rgba(247,247,242,0.14),transparent_24%),radial-gradient(circle_at_84%_12%,rgba(255,255,255,0.30),transparent_34%),linear-gradient(135deg,#020302_0%,#0a0f07_54%,#020302_100%)]" />
      <div className="festival-lasers absolute inset-0 opacity-[0.70]" />
      <div className="brand-grid absolute inset-0 opacity-[0.16]" />
      <div className="festival-noise absolute inset-0 opacity-[0.35]" />

      <section className="relative z-10 mx-auto max-w-5xl">
        <Link href="/" className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/[0.12] bg-black/[0.45] px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-white/[0.70] backdrop-blur-xl transition hover:text-white">
          <ArrowLeft size={14} />
          Home
        </Link>

        <div className="relative overflow-hidden rounded-[2.8rem] border border-white/[0.12] bg-black/[0.52] p-6 shadow-[0_42px_140px_rgba(0,0,0,0.56)] backdrop-blur-xl md:p-8">
          <div className="absolute right-0 top-0 h-full w-1/2 bg-[radial-gradient(circle_at_78%_16%,rgba(245,245,245,0.18),transparent_42%)]" />
          <div className="relative">
            <NoSleepBrand />
            <p className="mt-8 inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.32em] text-[#f5f5f5]"><Sparkles size={14} /> Legal briefing</p>
            <h1 className="mt-3 font-display text-[clamp(5rem,12vw,10rem)] leading-[0.70] tracking-[-0.09em] text-white">Privacidad</h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/[0.66]">Tu información se usa solo para preparar una noche segura y organizada.</p>
          </div>
        </div>

        <section className="mt-5 grid gap-3 md:grid-cols-2">
          {sections.map(([title, text]) => (
            <article key={title} className="motion-tilt rounded-[2rem] border border-white/[0.12] bg-black/[0.46] p-5 shadow-[0_22px_80px_rgba(0,0,0,0.26)] backdrop-blur-xl hover:border-[#f5f5f5]/[0.34]">
              <ShieldCheck size={20} className="text-[#f5f5f5]" />
              <p className="mt-5 text-xs font-black uppercase tracking-[0.22em] text-[#f5f5f5]">{title}</p>
              <p className="mt-3 text-sm leading-7 text-white/[0.62]">{text}</p>
            </article>
          ))}
        </section>
      </section>
    </main>
  )
}
