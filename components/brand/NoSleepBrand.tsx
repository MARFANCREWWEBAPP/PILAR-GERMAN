import Image from 'next/image'

export function NoSleepBrand({ compact = false, inverted = false, hero = false }: { compact?: boolean; inverted?: boolean; hero?: boolean }) {
  if (hero) {
    return (
      <div className="w-full max-w-3xl">
        <div className="flex items-center gap-5 border-b border-current/15 pb-5">
          <span className="grid h-24 w-24 shrink-0 place-items-center rounded-[1.7rem] bg-[#f7f7f2] p-3 shadow-[0_22px_70px_rgba(0,0,0,0.24)]">
            <Image src="/brand/pg-logo.jpg" alt="PG" width={96} height={110} className="h-full w-full object-contain mix-blend-multiply" priority />
          </span>
          <span className="min-w-0">
            <span className="block text-xs font-black uppercase tracking-[0.42em] text-white/45">Pilar & German present</span>
            <span className="mt-2 block font-black uppercase leading-[0.72] tracking-[-0.08em] text-white text-[clamp(3.2rem,9vw,7rem)]">No Sleep</span>
          </span>
        </div>
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          <span className="text-xs font-black uppercase tracking-[0.52em] text-white/70">Wedding Club</span>
          <span className="text-xs font-black uppercase tracking-[0.28em] text-white/45">06.12.2026 · Finca San Isidro</span>
        </div>
      </div>
    )
  }

  return (
    <div className={`flex items-center gap-4 ${compact ? 'gap-3' : ''}`}>
      <span className={`${compact ? 'h-12 w-12 rounded-2xl' : 'h-20 w-20 rounded-[1.35rem]'} grid shrink-0 place-items-center bg-[#f7f7f2] p-2 shadow-[0_18px_55px_rgba(0,0,0,0.22)]`}>
        <Image src="/brand/pg-logo.jpg" alt="PG" width={80} height={92} className="h-full w-full object-contain mix-blend-multiply" priority />
      </span>
      <span className="block min-w-0">
        <span className={`${compact ? 'text-[9px]' : 'text-xs'} block font-black uppercase leading-none tracking-[0.34em] ${inverted ? 'text-black/50' : 'text-white/50'}`}>Pilar & German</span>
        <span className={`${compact ? 'text-2xl' : 'text-4xl'} mt-1 block font-black uppercase leading-[0.78] tracking-[-0.07em] ${inverted ? 'text-black' : 'text-white'}`}>No Sleep</span>
        <span className={`${compact ? 'text-[9px]' : 'text-sm'} block font-black uppercase tracking-[0.32em] ${inverted ? 'text-black/65' : 'text-white/70'}`}>Wedding Club</span>
      </span>
    </div>
  )
}
