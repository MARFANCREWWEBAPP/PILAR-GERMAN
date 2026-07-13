import { InputHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

type Props = InputHTMLAttributes<HTMLInputElement> & {
  label?: string
  error?: string
}

export function Input({ label, error, className, ...props }: Props) {
  return (
    <label className="flex w-full flex-col gap-2 text-sm">
      {label ? <span className="font-medium text-white/85">{label}</span> : null}
      <input
        className={cn(
          'h-11 rounded-lg border border-white/15 bg-white/[0.035] px-3 text-white placeholder:text-white/35 outline-none transition',
          'focus:border-white/55 focus:ring-2 focus:ring-white/20',
          className
        )}
        {...props}
      />
      {error ? <span className="text-sm text-red-400">{error}</span> : null}
    </label>
  )
}
