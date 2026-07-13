import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { requireAdminSessionFromRequest } from '@/lib/auth'
import { TicketStatus } from '@prisma/client'

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await requireAdminSessionFromRequest(req)
  } catch {
    return NextResponse.json({ ok: false, message: 'No autorizado' }, { status: 401 })
  }

  const guest = await prisma.guest.findUnique({ where: { id: Number(params.id) }, include: { ticket: true } })
  if (!guest?.ticket) return NextResponse.json({ ok: false, message: 'No tiene entrada' }, { status: 404 })

  await prisma.ticket.update({ where: { id: guest.ticket.id }, data: { status: TicketStatus.CANCELLED } })
  return NextResponse.json({ ok: true })
}
