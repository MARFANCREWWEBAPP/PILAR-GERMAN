'use client'

import { ReactNode } from 'react'
import { Button } from '../ui/Button'

export function ConfirmDialog({
  title,
  message,
  onConfirm,
  children
}: {
  title: string
  message: string
  onConfirm: () => void
  children?: ReactNode
}) {
  return (
    <div className="rounded-xl border border-white/15 p-4">
      <h4 className="font-display text-lg text-white">{title}</h4>
      <p className="mt-2 text-sm text-white/70">{message}</p>
      <div className="mt-3">
        <Button onClick={onConfirm}>{children || 'Confirmar'}</Button>
      </div>
    </div>
  )
}
