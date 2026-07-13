import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { generateQrPng } from '@/lib/ticket'
import { getDemoTicket, isDemoMode } from '@/lib/demo-data'

export async function GET(_: NextRequest, { params }: { params: { token: string } }) {
  const ticket = isDemoMode() ? getDemoTicket(params.token) : await prisma.ticket.findUnique({ where: { token: params.token } })
  if (!ticket) {
    return new NextResponse('No encontrado', { status: 404 })
  }

  const png = await generateQrPng(ticket.token)
  return new NextResponse(new Uint8Array(png), {
    headers: {
      'Content-Type': 'image/png',
      'Content-Disposition': 'inline; filename="ticket-qr.png"'
    }
  })
}
