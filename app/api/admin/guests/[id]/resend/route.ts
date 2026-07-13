import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { requireAdminSessionFromRequest } from '@/lib/auth'

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await requireAdminSessionFromRequest(req)
  } catch {
    return NextResponse.json({ ok: false, message: 'No autorizado' }, { status: 401 })
  }

  const guest = await prisma.guest.findUnique({ where: { id: Number(params.id) }, include: { ticket: true } })
  if (!guest) return NextResponse.json({ ok: false, message: 'Invitado no encontrado' }, { status: 404 })
  if (!guest.ticket) return NextResponse.json({ ok: false, message: 'Sin entrada para reenviar' }, { status: 400 })

  return NextResponse.json({ ok: true, message: 'Enlace reenviado (mock).', ticket: guest.ticket.token })
}
