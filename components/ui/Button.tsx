'use client'

import { ButtonHTMLAttributes, forwardRef } from 'react'
import { cn } from '@/lib/utils'

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'ghost' | 'outline'
  size?: 'sm' | 'md' | 'lg'
}

export const Button = forwardRef<HTMLButtonElement, Props>(function Button(
  { className, variant = 'primary', size = 'md', ...props },
  ref
) {
  return (
    <button
      ref={ref}
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-xl border font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f5f5f5]/60',
        {
          'border-transparent bg-[#f7f7f2] text-black hover:translate-y-[-1px] hover:bg-[#f5f5f5] hover:shadow-[0_18px_45px_rgba(245,245,245,0.20)]': variant === 'primary',
          'bg-transparent border-white/25 text-white hover:border-[#f5f5f5]/40 hover:bg-white/10': variant === 'outline',
          'text-white bg-white/5 border-white/10 hover:border-[#f5f5f5]/30 hover:bg-white/[0.12]': variant === 'ghost'
        }[variant],
        {
          'h-9 px-4 text-sm': size === 'sm',
          'h-11 px-6 text-base': size === 'md',
          'h-12 px-8 text-lg': size === 'lg'
        }[size],
        className
      )}
      {...props}
    />
  )
})

Button.displayName = 'Button'
