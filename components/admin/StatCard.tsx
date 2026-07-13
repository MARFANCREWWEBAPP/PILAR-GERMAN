export function StatCard({
  label,
  value,
  note,
  tone = 'neutral'
}: {
  label: string
  value: number | string
  note?: string
  tone?: 'neutral' | 'white' | 'red'
}) {
  const toneClass = {
    neutral: 'border-white/10 bg-white/[0.04]',
    white: 'border-[#f5f5f5]/30 bg-[#1f1f1f]/[0.18]',
    red: 'border-white/20 bg-white/[0.075]'
  }[tone]

  return (
    <div className={`rounded-[1.7rem] border p-5 transition hover:-translate-y-0.5 hover:border-[#f5f5f5]/40 ${toneClass}`}>
      <p className="text-xs uppercase tracking-[0.16em] text-white/45">{label}</p>
      <p className="mt-3 font-display text-5xl leading-none text-white">{value}</p>
      {note ? <p className="mt-3 text-xs leading-5 text-white/55">{note}</p> : null}
    </div>
  )
}
