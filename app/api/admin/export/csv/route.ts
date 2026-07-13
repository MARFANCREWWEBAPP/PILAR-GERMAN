import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { buildGuestFilterWhere, guestRowsToCsv } from '@/lib/export'
import { requireAdminSessionFromRequest } from '@/lib/auth'

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

  const rows = guests.map((g) => ({
    firstName: g.firstName,
    lastName: g.lastName,
    phone: g.phone,
    email: g.email,
    invitedBy: g.invitedBy,
    attendanceStatus: g.attendanceStatus,
    busPreference: g.busPreference,
    busPoint: g.busPoint,
    allergies: g.allergies,
    notes: g.notes,
    token: g.ticket?.token || null,
    ticketStatus: g.ticket?.status || null,
    createdAt: g.createdAt,
    checkedInAt: g.ticket?.checkedInAt || null
  }))

  const csv = guestRowsToCsv(rows)
  return new NextResponse(csv, {
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': 'attachment; filename="invitados.csv"'
    }
  })
}
