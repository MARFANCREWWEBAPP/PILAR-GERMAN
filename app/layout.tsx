import './globals.css'
import { ReactNode } from 'react'
import { ToastProvider } from '@/components/ui/Toast'
import { SiteMusicPlayer } from '@/components/brand/SiteMusicPlayer'
import { ClubEntryGate } from '@/components/brand/ClubEntryGate'

export const metadata = {
  title: 'NO SLEEP WEDDING CLUB · 6.12.2026',
  description: 'Catorce horas. Una boda. Un invitado internacional secreto. Y cero ganas de irse a casa.'
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es">
      <body>
        <ToastProvider>
          {children}
          <ClubEntryGate />
          <SiteMusicPlayer />
        </ToastProvider>
      </body>
    </html>
  )
}
