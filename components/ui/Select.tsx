import { SelectHTMLAttributes, ReactNode } from 'react'

type Props = SelectHTMLAttributes<HTMLSelectElement> & {
  label?: string
  children: ReactNode
}

export function Select({ label, children, className = '', ...props }: Props) {
  return (
    <label className="flex w-full flex-col gap-2 text-sm">
      {label ? <span className="font-medium text-white/85">{label}</span> : null}
      <select className={`h-11 rounded-lg border border-white/15 bg-black/45 px-3 text-white outline-none transition focus:border-white/55 ${className}`} {...props}>
        {children}
      </select>
    </label>
  )
}
