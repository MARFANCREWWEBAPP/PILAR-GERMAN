export function EmptyState({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="rounded-lg border border-dashed border-white/20 bg-white/[0.025] p-8 text-center">
      <p className="font-display text-2xl leading-none text-white">{title}</p>
      <p className="mt-2 text-sm text-white/60">{subtitle}</p>
    </div>
  )
}
