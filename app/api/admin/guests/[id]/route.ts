import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { requireAdminSessionFromRequest } from '@/lib/auth'
import { guestEditSchema } from '@/lib/schemas'

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await requireAdminSessionFromRequest(req)
  } catch {
    return NextResponse.json({ ok: false, message: 'No autorizado' }, { status: 401 })
  }

  const payload = await req.json()
  const parsed = guestEditSchema.safeParse(payload)
  if (!parsed.success) {
    return NextResponse.json({ ok: false, message: 'Datos inválidos' }, { status: 400 })
  }

  await prisma.guest.update({ where: { id: Number(params.id) }, data: parsed.data })
  return NextResponse.json({ ok: true })
}

export async function GET(_: NextRequest, { params }: { params: { id: string } }) {
  const guest = await prisma.guest.findUnique({ where: { id: Number(params.id) }, include: { ticket: true } })
  if (!guest) return NextResponse.json({ ok: false, message: 'Invitado no encontrado' }, { status: 404 })
  return NextResponse.json({ ok: true, guest })
}
