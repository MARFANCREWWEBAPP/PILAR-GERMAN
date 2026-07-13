'use client'

import { createContext, useCallback, useContext, useMemo, useState } from 'react'
import { X } from 'lucide-react'

type ToastMessage = { id: number; type: 'success' | 'error' | 'info'; text: string }

type ToastContext = {
  push: (toast: Omit<ToastMessage, 'id'>) => void
}

const Ctx = createContext<ToastContext | null>(null)

function ToastItem({ t, onClose }: { t: ToastMessage; onClose: (id: number) => void }) {
  return (
    <div
      className={`animate-fade-up rounded-lg border px-4 py-2 text-sm ${
        t.type === 'success'
          ? 'border-emerald-300/50 text-emerald-100 bg-emerald-900/40'
          : t.type === 'error'
            ? 'border-red-300/50 text-red-100 bg-red-900/40'
            : 'border-white/40 text-white bg-white/10'
      }`}
    >
      <div className="flex items-center justify-between gap-3">
        <span>{t.text}</span>
        <button onClick={() => onClose(t.id)}>
          <X size={16} />
        </button>
      </div>
    </div>
  )
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastMessage[]>([])

  const push = useCallback((toast: Omit<ToastMessage, 'id'>) => {
    const id = Date.now() + Math.floor(Math.random() * 1000)
    setToasts((current) => [...current, { ...toast, id }])
    setTimeout(() => setToasts((current) => current.filter((item) => item.id !== id)), 3200)
  }, [])

  const remove = useCallback((id: number) => setToasts((current) => current.filter((item) => item.id !== id)), [])

  const value = useMemo(() => ({ push }), [push])

  return (
    <Ctx.Provider value={value}>
      {children}
      <div className="fixed right-4 top-4 z-50 flex w-80 flex-col gap-2">
        {toasts.map((toast) => (
          <ToastItem key={toast.id} t={toast} onClose={remove} />
        ))}
      </div>
    </Ctx.Provider>
  )
}

export function useToast() {
  const context = useContext(Ctx)
  if (!context) throw new Error('useToast must be used inside ToastProvider')
  return context
}
