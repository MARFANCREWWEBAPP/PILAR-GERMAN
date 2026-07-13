'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ClipboardCheck, Database, FileText, Home, LayoutGrid, Rocket, ScanLine, Settings, Users } from 'lucide-react'
import { AdminSession } from '@/lib/auth'
import { NoSleepBrand } from '@/components/brand/NoSleepBrand'

const links = [
  { href: '/admin', label: 'Dashboard', icon: Home },
  { href: '/admin/launch', label: 'Lanzamiento', icon: Rocket },
  { href: '/admin/menus', label: 'Menús', icon: LayoutGrid },
  { href: '/admin/content', label: 'Textos', icon: FileText },
  { href: '/admin/guests', label: 'Invitados', icon: Users },
  { href: '/rsvp', label: 'Registro', icon: ClipboardCheck },
  { href: '/admin/scan', label: 'Scanner', icon: ScanLine },
  { href: '/admin/backups', label: 'Backups', icon: Database },
  { href: '/admin/settings', label: 'Ajustes', icon: Settings }
]

export function AdminSidebar({ session }: { session: AdminSession }) {
  const pathname = usePathname()

  return (
    <aside className="border-b border-white/10 bg-black/55 p-3 backdrop-blur-xl md:min-h-screen md:border-b-0 md:border-r md:p-5">
      <div className="relative mb-4 overflow-hidden rounded-[2rem] border border-white/10 bg-[#f7f2e6] px-4 py-5 text-black shadow-[0_24px_70px_rgba(0,0,0,0.35)]">
        <div className="absolute inset-x-0 bottom-0 h-28 bg-[radial-gradient(circle_at_50%_100%,rgba(0,0,0,0.10),transparent_62%)]" />
        <div className="relative">
          <NoSleepBrand inverted />
          <p className="mt-6 text-xs uppercase tracking-[0.26em] text-black/45">Private control room</p>
          <p className="mt-1 font-display text-4xl leading-none text-black">Backstage</p>
          <p className="mt-3 truncate rounded-full border border-black/10 bg-white/55 px-3 py-2 text-xs font-semibold text-black/60">
            {session.email}
          </p>
        </div>
      </div>
      <nav className="grid gap-2 sm:grid-cols-3 md:grid-cols-1">
        {links.map((link) => {
          const active = link.href === '/admin' ? pathname === '/admin' : pathname.startsWith(link.href)
          const Icon = link.icon
          return (
            <Link
              key={link.href}
              className={`group flex min-h-12 items-center gap-3 rounded-2xl border px-3 py-2 text-sm transition ${
                active
                  ? 'border-[#f5f5f5]/[0.45] bg-[#1f1f1f]/25 text-white shadow-[0_0_34px_rgba(139,153,86,0.22)]'
                  : 'border-white/[0.08] bg-white/[0.035] text-white/70 hover:border-[#f5f5f5]/[0.35] hover:bg-white/[0.075] hover:text-white'
              }`}
              href={link.href}
            >
              <span
                className={`flex h-8 w-8 items-center justify-center rounded-xl ${
                  active ? 'bg-[#f7f2e6] text-black' : 'bg-white/[0.06] text-white/45 group-hover:text-[#f5f5f5]'
                }`}
              >
                <Icon size={16} />
              </span>
              <span className="font-medium">{link.label}</span>
            </Link>
          )
        })}
      </nav>
      <form method="post" action="/api/admin/logout" className="mt-6">
        <button className="w-full rounded-2xl border border-white/15 bg-white/[0.035] px-3 py-3 text-sm text-white/70 transition hover:border-white/30 hover:bg-white/[0.08] hover:text-white">
          Cerrar sesión
        </button>
      </form>
    </aside>
  )
}
