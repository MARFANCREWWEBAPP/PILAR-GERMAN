'use client'

import { useEffect, useRef, useState } from 'react'

type AutosaveState = 'idle' | 'saving' | 'saved' | 'error'

type AutosaveStatusProps = {
  endpoint: string
  formId: string
}

export function AutosaveStatus({ endpoint, formId }: AutosaveStatusProps) {
  const [state, setState] = useState<AutosaveState>('idle')
  const timerRef = useRef<number | null>(null)
  const savingRef = useRef(false)
  const pendingRef = useRef(false)

  useEffect(() => {
    const formElement = document.getElementById(formId)
    if (!(formElement instanceof HTMLFormElement)) return
    const form = formElement

    async function saveNow() {
      if (savingRef.current) {
        pendingRef.current = true
        return
      }

      savingRef.current = true
      pendingRef.current = false
      setState('saving')

      try {
        const response = await fetch(endpoint, {
          method: 'POST',
          body: new FormData(form),
          credentials: 'same-origin'
        })

        if (!response.ok) throw new Error('Autosave failed')
        setState('saved')
      } catch {
        setState('error')
      } finally {
        savingRef.current = false
        if (pendingRef.current) {
          window.setTimeout(saveNow, 350)
        }
      }
    }

    function scheduleSave() {
      if (timerRef.current) window.clearTimeout(timerRef.current)
      timerRef.current = window.setTimeout(saveNow, 850)
    }

    form.addEventListener('input', scheduleSave)
    form.addEventListener('change', scheduleSave)

    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current)
      form.removeEventListener('input', scheduleSave)
      form.removeEventListener('change', scheduleSave)
    }
  }, [endpoint, formId])

  const label =
    state === 'saving'
      ? 'Guardando automáticamente...'
      : state === 'saved'
        ? 'Guardado automático activo'
        : state === 'error'
          ? 'No se pudo autoguardar'
          : 'Autoguardado preparado'

  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-white/[0.14] bg-white/[0.055] px-3 py-2 text-[11px] font-black uppercase tracking-[0.16em] text-white/[0.66]">
      <span
        className={`h-2 w-2 rounded-full ${
          state === 'error'
            ? 'bg-red-300 shadow-[0_0_18px_rgba(252,165,165,0.70)]'
            : state === 'saving'
              ? 'bg-white/50'
              : 'bg-white shadow-[0_0_18px_rgba(255,255,255,0.70)]'
        }`}
      />
      {label}
    </span>
  )
}
