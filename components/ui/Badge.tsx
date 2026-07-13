export function Badge({ children, tone = 'default' }: { children: React.ReactNode; tone?: 'default' | 'success' | 'danger' | 'muted' }) {
  const palette = {
    default: 'bg-white/[0.08] text-white/90 border-white/20',
    success: 'bg-white text-black border-white/40',
    danger: 'bg-white/[0.08] text-white border-white/20',
    muted: 'bg-white/[0.045] text-white/55 border-white/10'
  }

  return <span className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold ${palette[tone]}`}>{children}</span>
}
