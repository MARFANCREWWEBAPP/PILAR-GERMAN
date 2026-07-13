import { redirect } from 'next/navigation'
import { FileText, Save, Sparkles } from 'lucide-react'
import { getPublicCopy, savePublicCopyFromForm } from '@/lib/public-copy'
import { publicCopySections } from '@/lib/public-copy-fields'
import { AutosaveStatus } from '@/components/admin/AutosaveStatus'

const inputClass = 'h-12 w-full rounded-2xl border border-white/[0.14] bg-black/[0.42] px-3 text-sm text-white outline-none transition placeholder:text-white/[0.32] focus:border-white/[0.55] focus:ring-4 focus:ring-white/[0.08]'
const textareaClass = 'min-h-28 w-full rounded-2xl border border-white/[0.14] bg-black/[0.42] px-3 py-3 text-sm leading-6 text-white outline-none transition placeholder:text-white/[0.32] focus:border-white/[0.55] focus:ring-4 focus:ring-white/[0.08]'

export default async function AdminContentPage({ searchParams }: { searchParams: Record<string, string | undefined> }) {
  const copy = await getPublicCopy()
  const saved = searchParams.saved === '1'

  async function save(formData: FormData) {
    'use server'

    await savePublicCopyFromForm(formData)
    redirect('/admin/content?saved=1')
  }

  return (
    <main className="space-y-6">
      <section className="relative overflow-hidden rounded-[2.7rem] border border-white/[0.10] bg-black/[0.62] p-6 shadow-[0_40px_130px_rgba(0,0,0,0.48)] backdrop-blur-xl md:p-8">
        <div className="absolute -right-24 -top-28 h-80 w-80 rounded-full border border-white/[0.12] bg-white/[0.08]" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/80 to-transparent" />
        <div className="relative">
          <p className="inline-flex items-center gap-2 rounded-full border border-white/[0.12] bg-white/[0.05] px-3 py-2 text-[10px] font-black uppercase tracking-[0.24em] text-white/64">
            <FileText size={14} />
            Guest-facing copy
          </p>
          <h1 className="mt-5 max-w-3xl font-display text-[clamp(4rem,8vw,8rem)] leading-[0.76] tracking-[-0.08em] text-white">
            Textos invitados
          </h1>
          <p className="mt-5 max-w-2xl text-sm leading-6 text-white/[0.62]">
            Edita desde aquí los textos que ven los invitados en la portada pública y en el registro cuando les pasas el link.
          </p>
          {saved ? (
            <p className="mt-5 inline-flex rounded-full border border-white/[0.18] bg-white px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-black">
              Cambios guardados
            </p>
          ) : null}
        </div>
      </section>

      <form id="public-copy-form" action={save} className="space-y-5">
        {publicCopySections.map((section) => (
          <section key={section.key} className="rounded-[2rem] border border-white/[0.12] bg-black/[0.42] p-5 shadow-[0_24px_90px_rgba(0,0,0,0.28)] backdrop-blur-xl">
            <div className="flex flex-col gap-2 border-b border-white/[0.08] pb-5 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.24em] text-white/42">
                  <Sparkles size={14} />
                  {section.eyebrow}
                </p>
                <h2 className="mt-2 font-display text-5xl leading-none text-white">{section.title}</h2>
              </div>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-white/38">{section.fields.length} textos</p>
            </div>

            <div className="mt-5 grid gap-4 md:grid-cols-2">
              {section.fields.map((field) => (
                <label key={field.key} className={field.multiline ? 'block md:col-span-2' : 'block'}>
                  <span className="text-[11px] font-black uppercase tracking-[0.22em] text-white/[0.52]">{field.label}</span>
                  {field.hint ? <span className="ml-2 text-[11px] text-white/[0.35]">{field.hint}</span> : null}
                  <div className="mt-2">
                    {field.multiline ? (
                      <textarea name={`${section.key}.${field.key}`} defaultValue={copy[section.key][field.key]} className={textareaClass} />
                    ) : (
                      <input name={`${section.key}.${field.key}`} defaultValue={copy[section.key][field.key]} className={inputClass} />
                    )}
                  </div>
                </label>
              ))}
            </div>
          </section>
        ))}

        <div className="sticky bottom-4 z-20 flex flex-col gap-3 rounded-[2rem] border border-white/[0.16] bg-black/[0.76] p-4 shadow-[0_24px_90px_rgba(0,0,0,0.48)] backdrop-blur-xl sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-2">
            <AutosaveStatus endpoint="/api/admin/content/autosave" formId="public-copy-form" />
            <p className="text-sm leading-6 text-white/[0.62]">
              Los textos se autoguardan en base de datos y sobreviven a nuevas versiones de la app.
            </p>
          </div>
          <button className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-white px-6 text-sm font-black uppercase tracking-[0.14em] text-black transition hover:bg-white/86">
            <Save size={16} />
            Guardar textos
          </button>
        </div>
      </form>
    </main>
  )
}
