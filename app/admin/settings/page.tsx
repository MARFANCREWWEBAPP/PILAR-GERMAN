import { redirect } from 'next/navigation'
import { Save, Settings, Sparkles } from 'lucide-react'
import { prisma } from '@/lib/db'
import { demoEventConfig, isDemoMode } from '@/lib/demo-data'
import { AutosaveStatus } from '@/components/admin/AutosaveStatus'

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block text-sm font-semibold text-white/[0.62]">
      {label}
      <div className="mt-2">{children}</div>
    </label>
  )
}

const inputClass = 'h-12 w-full rounded-2xl border border-white/[0.14] bg-black/[0.42] px-3 text-sm text-white outline-none transition placeholder:text-white/[0.32] focus:border-[#f5f5f5]/[0.55] focus:ring-4 focus:ring-[rgba(245,245,245,0.10)]'

export default async function AdminSettingsPage() {
  const dbConfig = isDemoMode() ? null : await prisma.eventConfig.findFirst({ orderBy: { createdAt: 'desc' } })
  const config = isDemoMode() ? demoEventConfig : dbConfig

  if (!config) {
    return <main className="text-white">No hay configuración del evento.</main>
  }

  const configDefaults = {
    eventName: config.eventName,
    coupleNames: config.coupleNames,
    date: config.date,
    startTime: config.startTime,
    venueName: config.venueName,
    city: config.city,
    address: config.address,
    googleMapsUrl: config.googleMapsUrl,
    appleMapsUrl: config.appleMapsUrl || '',
    wazeUrl: config.wazeUrl || '',
    contactInfo: config.contactInfo,
    dressCode: config.dressCode || ''
  }

  async function save(formData: FormData) {
    'use server'

    if (isDemoMode()) {
      redirect('/admin/settings')
    }

    const currentConfig = await prisma.eventConfig.findFirst({ orderBy: { createdAt: 'desc' } })
    if (!currentConfig) {
      redirect('/admin/settings')
    }

    await prisma.eventConfig.update({
      where: { id: currentConfig.id },
      data: {
        eventName: String(formData.get('eventName') || configDefaults.eventName),
        coupleNames: String(formData.get('coupleNames') || configDefaults.coupleNames),
        date: String(formData.get('date') || configDefaults.date),
        startTime: String(formData.get('startTime') || configDefaults.startTime),
        venueName: String(formData.get('venueName') || configDefaults.venueName),
        city: String(formData.get('city') || configDefaults.city),
        address: String(formData.get('address') || configDefaults.address),
        googleMapsUrl: String(formData.get('googleMapsUrl') || configDefaults.googleMapsUrl),
        appleMapsUrl: String(formData.get('appleMapsUrl') || configDefaults.appleMapsUrl),
        wazeUrl: String(formData.get('wazeUrl') || configDefaults.wazeUrl),
        contactInfo: String(formData.get('contactInfo') || configDefaults.contactInfo),
        dressCode: String(formData.get('dressCode') || configDefaults.dressCode)
      }
    })
  }

  return (
    <main className="space-y-6">
      <section className="relative overflow-hidden rounded-[2.5rem] border border-white/[0.12] bg-black/[0.48] p-6 shadow-[0_30px_100px_rgba(0,0,0,0.42)] backdrop-blur-xl md:p-8">
        <div className="absolute right-0 top-0 h-full w-1/2 bg-[radial-gradient(circle_at_72%_18%,rgba(245,245,245,0.22),transparent_42%)]" />
        <div className="relative">
          <p className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.30em] text-[#f5f5f5]"><Settings size={14} /> Production settings</p>
          <h1 className="mt-3 max-w-3xl font-display text-6xl leading-[0.86] tracking-[-0.04em] text-white md:text-7xl">Ajustes</h1>
          <p className="mt-4 max-w-2xl text-sm leading-6 text-white/[0.62]">Datos que alimentan portada, registro, passports, ubicación y comunicaciones del NO SLEEP WEDDING CLUB.</p>
        </div>
      </section>

      <form id="event-settings-form" action={save} className="space-y-4">
        <section className="rounded-[2rem] border border-white/[0.12] bg-black/[0.38] p-5 shadow-[0_24px_90px_rgba(0,0,0,0.28)] backdrop-blur-xl">
          <div className="flex items-center gap-2">
            <Sparkles size={18} className="text-[#f5f5f5]" />
            <h2 className="font-display text-4xl leading-none text-white">Identidad del festival</h2>
          </div>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <Field label="Nombre del evento">
              <input name="eventName" defaultValue={config.eventName} className={inputClass} />
            </Field>
            <Field label="Novia & Novio">
              <input name="coupleNames" defaultValue={config.coupleNames} className={inputClass} />
            </Field>
            <Field label="Fecha">
              <input name="date" defaultValue={config.date} className={inputClass} />
            </Field>
            <Field label="Hora de inicio">
              <input name="startTime" defaultValue={config.startTime} className={inputClass} />
            </Field>
            <Field label="Dress code">
              <input name="dressCode" defaultValue={config.dressCode || ''} className={inputClass} />
            </Field>
            <Field label="Contacto">
              <input name="contactInfo" defaultValue={config.contactInfo} className={inputClass} />
            </Field>
          </div>
        </section>

        <section className="rounded-[2rem] border border-white/[0.12] bg-black/[0.38] p-5 shadow-[0_24px_90px_rgba(0,0,0,0.28)] backdrop-blur-xl">
          <div className="flex items-center gap-2">
            <Sparkles size={18} className="text-[#f5f5f5]" />
            <h2 className="font-display text-4xl leading-none text-white">Lugar y mapas</h2>
          </div>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <Field label="Espacio">
              <input name="venueName" defaultValue={config.venueName} className={inputClass} />
            </Field>
            <Field label="Ciudad">
              <input name="city" defaultValue={config.city} className={inputClass} />
            </Field>
            <Field label="Dirección completa">
              <input name="address" defaultValue={config.address} className={inputClass} />
            </Field>
            <Field label="Google Maps URL">
              <input name="googleMapsUrl" defaultValue={config.googleMapsUrl} className={inputClass} />
            </Field>
            <Field label="Apple Maps URL">
              <input name="appleMapsUrl" defaultValue={config.appleMapsUrl || ''} className={inputClass} />
            </Field>
            <Field label="Waze URL">
              <input name="wazeUrl" defaultValue={config.wazeUrl || ''} className={inputClass} />
            </Field>
          </div>
        </section>

        <div className="flex flex-col gap-3 rounded-[2rem] border border-[#f5f5f5]/[0.20] bg-[#1a1a1a]/[0.12] p-5 shadow-[0_24px_90px_rgba(0,0,0,0.25)] backdrop-blur-xl sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-2">
            <AutosaveStatus endpoint="/api/admin/settings/autosave" formId="event-settings-form" />
            <p className="text-sm leading-6 text-white/[0.62]">
              {isDemoMode() ? 'Modo demo activo: se autoguarda solo cuando haya base de datos conectada.' : 'Los cambios se autoguardan en base de datos y sobreviven a nuevas versiones de la app.'}
            </p>
          </div>
          <button className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#f7f7f2] px-6 text-sm font-black uppercase tracking-[0.14em] text-black transition hover:bg-[#f5f5f5]">
            <Save size={16} />
            Guardar
          </button>
        </div>
      </form>
    </main>
  )
}
