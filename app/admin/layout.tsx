import { redirect } from 'next/navigation'
import { AdminSidebar } from '@/components/admin/AdminSidebar'
import { requireAdminSession } from '@/lib/auth'

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  let session = null

  try {
    const authSession = await requireAdminSession()
    session = authSession
  } catch {
    if (!session) {
      redirect('/login')
    }
  }

  if (!session) {
    redirect('/login')
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#030303] text-white">
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 bg-cover bg-center opacity-[0.12] invert mix-blend-screen"
        style={{ backgroundImage: "url('/brand/finca-clean.png')" }}
      />
      <div aria-hidden="true" className="festival-lasers pointer-events-none fixed inset-0 opacity-[0.52]" />
      <div aria-hidden="true" className="festival-noise pointer-events-none fixed inset-0 opacity-[0.34]" />
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_82%_6%,rgba(255,255,255,0.18),transparent_26%),radial-gradient(circle_at_8%_0%,rgba(255,255,255,0.10),transparent_22%),linear-gradient(180deg,rgba(3,3,3,0.34),#030303_68%)]" />
      <div className="pointer-events-none fixed left-[42%] top-0 h-full w-px bg-white/[0.08]" />
      <div className="pointer-events-none fixed left-[64%] top-0 h-full w-px bg-white/[0.05]" />

      <div className="relative z-10 grid min-h-screen md:grid-cols-[312px_minmax(0,1fr)]">
        <AdminSidebar session={session} />
        <main className="min-w-0 px-4 py-5 md:px-8 md:py-8">
          <header className="mb-6 flex flex-col gap-4 rounded-[2rem] border border-white/[0.10] bg-black/[0.58] px-5 py-4 shadow-[0_24px_90px_rgba(0,0,0,0.42)] backdrop-blur-xl md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.28em] text-white/48">No Sleep OS</p>
              <h1 className="mt-1 font-display text-4xl leading-none text-white">NO SLEEP · CONTROL ROOM</h1>
            </div>
            <div className="flex flex-wrap items-center gap-3 text-xs font-black uppercase tracking-[0.18em] text-white/55">
              <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-2">{session.email}</span>
              <span className="flex items-center gap-2 rounded-full border border-white/[0.22] bg-white/[0.06] px-3 py-2 text-white">
                <span className="h-2 w-2 rounded-full bg-white shadow-[0_0_20px_rgba(255,255,255,0.85)]" />
                Sesión activa
              </span>
            </div>
          </header>
          <div className="animate-fade-up">{children}</div>
        </main>
      </div>
    </div>
  )
}
