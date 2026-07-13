'use client'

import { createPortal } from 'react-dom'
import { ReactNode } from 'react'
import { X } from 'lucide-react'
import { Button } from './Button'

export function Modal({ open, title, children, onClose }: { open: boolean; title: string; children: ReactNode; onClose: () => void }) {
  if (!open) return null

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
      <div className="w-full max-w-lg rounded-2xl border border-white/15 bg-[#111] p-6 shadow-2xl">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-xl font-display text-white">{title}</h3>
          <Button variant="ghost" size="sm" onClick={onClose} title="Cerrar">
            <X size={16} />
          </Button>
        </div>
        {children}
      </div>
    </div>,
    document.body
  )
}
