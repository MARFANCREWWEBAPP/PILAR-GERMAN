import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { requireAdminSessionFromRequest } from '@/lib/auth'
import { scanSchema } from '@/lib/schemas'
import { TicketStatus } from '@prisma/client'
import { getDemoTicket, isDemoMode } from '@/lib/demo-data'

export async function POST(req: NextRequest) {
  let session
  try {
    session = await requireAdminSessionFromRequest(req)
  } catch {
    return NextResponse.json({ ok: false, message: 'No autorizado' }, { status: 401 })
  }

  const body = await req.json()
  const parsed = scanSchema.safeParse(body)
  if (!parsed.success) return NextResponse.json({ ok: false, message: 'Token inválido' }, { status: 400 })

  if (isDemoMode()) {
    const ticket = getDemoTicket(parsed.data.token)
    if (!ticket) return NextResponse.json({ ok: false, message: 'Entrada no encontrada' }, { status: 404 })

    if (ticket.status === 'CANCELLED') {
      return NextResponse.json({ ok: false, status: 'CANCELLED', message: 'Entrada cancelada', name: `${ticket.guest.firstName} ${ticket.guest.lastName}` })
    }

    if (ticket.status === 'USED') {
      return NextResponse.json({ ok: false, status: 'USED', message: 'Entrada ya utilizada', name: `${ticket.guest.firstName} ${ticket.guest.lastName}` })
    }

    return NextResponse.json({ ok: true, status: 'ACTIVE', name: `${ticket.guest.firstName} ${ticket.guest.lastName}` })
  }

  const ticket = await prisma.ticket.findUnique({
    where: { token: parsed.data.token },
    include: { guest: true }
  })

  if (!ticket) return NextResponse.json({ ok: false, message: 'Entrada no encontrada' }, { status: 404 })

  if (ticket.status === TicketStatus.CANCELLED) {
    return NextResponse.json({ ok: false, status: 'CANCELLED', message: 'Entrada cancelada', name: `${ticket.guest.firstName} ${ticket.guest.lastName}` })
  }

  if (ticket.status === TicketStatus.USED) {
    return NextResponse.json({ ok: false, status: 'USED', message: 'Entrada ya utilizada', name: `${ticket.guest.firstName} ${ticket.guest.lastName}` })
  }

  await prisma.ticket.update({
    where: { id: ticket.id },
    data: {
      status: TicketStatus.USED,
      checkedInAt: new Date(),
      checkedInBy: session.id
    }
  })

  return NextResponse.json({ ok: true, status: 'ACTIVE', name: `${ticket.guest.firstName} ${ticket.guest.lastName}` })
}
