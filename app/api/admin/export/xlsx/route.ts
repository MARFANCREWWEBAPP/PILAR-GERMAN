import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import * as XLSX from 'xlsx'
import { buildGuestFilterWhere, guestRowsForExcel } from '@/lib/export'
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

  const rows = guestRowsForExcel(
    guests.map((g) => ({
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
  )

  const book = XLSX.utils.book_new()
  const sheet = XLSX.utils.json_to_sheet(rows)
  XLSX.utils.book_append_sheet(book, sheet, 'Invitados')
  const bytes = XLSX.write(book, { type: 'buffer', bookType: 'xlsx' })

  return new NextResponse(bytes, {
    headers: {
      'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'Content-Disposition': 'attachment; filename="invitados.xlsx"'
    }
  })
}
