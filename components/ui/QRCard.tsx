import Image from 'next/image'
import { Card } from './Card'

export function QRCard({ qrUrl, title, subtitle }: { qrUrl: string; title: string; subtitle?: string }) {
  return (
    <Card title={title} subtitle={subtitle}>
      <div className="mx-auto mt-4 max-w-xs rounded-2xl border border-white/20 bg-white p-3">
        <Image src={qrUrl} alt="QR de acceso" width={280} height={280} />
      </div>
    </Card>
  )
}
