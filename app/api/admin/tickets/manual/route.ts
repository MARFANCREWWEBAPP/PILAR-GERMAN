import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { requireAdminSessionFromRequest } from '@/lib/auth'
import { TicketStatus } from '@prisma/client'

export async function POST(req: NextRequest) {
  try {
    await requireAdminSessionFromRequest(req)
  } catch {
    return NextResponse.json({ ok: false, message: 'No autorizado' }, { status: 401 })  
  }

  let token = ''
  let action = 'validate'

  const contentType = req.headers.get('content-type') || ''
  if (contentType.includes('application/json')) {
    const body = await req.json()
    token = String(body.token || '')
    action = String(body.action || 'validate')
  } else {
    const form = await req.formData()
    token = String(form.get('token') || '')
    action = String(form.get('action') || 'validate')
  }

  if (!token) {
    return NextResponse.json({ ok: false, message: 'Token requerido' }, { status: 400 })
  }

  const ticket = await prisma.ticket.findUnique({ where: { token } })
  if (!ticket) {
    return NextResponse.json({ ok: false, message: 'Entrada no encontrada' }, { status: 404 })
  }

  if (action === 'unvalidate') {
    if (ticket.status !== TicketStatus.USED) {
      return NextResponse.json({ ok: false, message: 'La entrada no está validada' }, { status: 400 })
    }
    await prisma.ticket.update({ where: { id: ticket.id }, data: { status: TicketStatus.ACTIVE, checkedInAt: null, checkedInBy: null } })
    return NextResponse.json({ ok: true })
  }

  if (ticket.status === TicketStatus.CANCELLED) {
    return NextResponse.json({ ok: false, message: 'No se puede validar una entrada cancelada' }, { status: 400 })
  }
  if (ticket.status === TicketStatus.USED) {
    return NextResponse.json({ ok: false, message: 'Ya estaba validada' }, { status: 400 })
  }

  await prisma.ticket.update({ where: { id: ticket.id }, data: { status: TicketStatus.USED, checkedInAt: new Date() } })
  return NextResponse.json({ ok: true })
}
