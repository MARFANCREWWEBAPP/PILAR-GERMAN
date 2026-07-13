import { NextResponse, NextRequest } from 'next/server'
import { prisma } from '@/lib/db'
import { requireAdminSessionFromRequest } from '@/lib/auth'
import { buildGuestFilterWhere } from '@/lib/export'

export async function GET(req: NextRequest) {
  try {
    await requireAdminSessionFromRequest(req)
  } catch {
    return NextResponse.json({ ok: false, message: 'No autorizado' }, { status: 401 })
  }

  const params = Object.fromEntries(req.nextUrl.searchParams.entries())
  const guests = await prisma.guest.findMany({
    where: buildGuestFilterWhere(params),
    include: { ticket: true },
    orderBy: { createdAt: 'desc' }
  })

  return NextResponse.json({ ok: true, guests })
}
