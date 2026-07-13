import { QRCard } from './QRCard'

export function TicketPreview({
  eventName,
  name,
  date,
  venue,
  qrUrl,
  token
}: {
  eventName: string
  name: string
  date: string
  venue: string
  qrUrl: string
  token: string
}) {
  return (
    <div className="space-y-3 rounded-3xl border border-white/15 bg-gradient-to-br from-white/[0.06] to-noir-soft/20 p-6">
      <p className="text-xs uppercase tracking-[0.25em] text-white/50">Entrada digital</p>
      <h3 className="font-display text-2xl text-white">{eventName}</h3>
      <p className="text-white">{name}</p>
      <p className="text-sm text-white/75">{date}</p>
      <p className="text-sm text-white/75">{venue}</p>
      <p className="text-xs text-white/60">Token: {token}</p>
      <QRCard qrUrl={qrUrl} title="Tu pase" subtitle="Escanea en puerta" />
      <p className="text-xs text-white/70">Entrada personal e intransferible. Necesaria para acceder a la fiesta.</p>
    </div>
  )
}
