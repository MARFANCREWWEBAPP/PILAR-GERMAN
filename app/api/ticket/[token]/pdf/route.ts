import { NextRequest, NextResponse } from 'next/server'
import { readFile } from 'fs/promises'
import { join } from 'path'
import { prisma } from '@/lib/db'
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib'
import { generateQrPng } from '@/lib/ticket'
import { getEventConfig } from '@/lib/event'
import { getDemoTicket, isDemoMode } from '@/lib/demo-data'

export const runtime = 'nodejs'

export async function GET(_: NextRequest, { params }: { params: { token: string } }) {
  const ticket = isDemoMode()
    ? getDemoTicket(params.token)
    : await prisma.ticket.findUnique({ where: { token: params.token }, include: { guest: true } })

  if (!ticket) {
    return NextResponse.json({ ok: false, message: 'Ticket no encontrado' }, { status: 404 })
  }

  const event = await getEventConfig()
  const qrBuffer = await generateQrPng(ticket.token)
  const fincaBuffer = await readFile(join(process.cwd(), 'public/brand/finca-clean.png'))

  const doc = await PDFDocument.create()
  const page = doc.addPage([595.28, 842.0])
  const regular = await doc.embedFont(StandardFonts.Helvetica)
  const bold = await doc.embedFont(StandardFonts.HelveticaBold)
  const qr = await doc.embedPng(qrBuffer)
  const finca = await doc.embedPng(fincaBuffer)
  const logoBuffer = await readFile(join(process.cwd(), 'public/brand/pg-logo.jpg'))
  const logo = await doc.embedJpg(logoBuffer)

  const black = rgb(0.012, 0.016, 0.012)
  const cream = rgb(0.965, 0.965, 0.945)
  const mono = rgb(0.88, 0.88, 0.86)
  const paleMono = rgb(0.96, 0.96, 0.94)
  const muted = rgb(0.52, 0.52, 0.45)
  const white = rgb(1, 1, 1)
  const guestName = `${ticket.guest.firstName} ${ticket.guest.lastName}`.toUpperCase()
  const passportCode = `NSWC-0612-${ticket.token.slice(0, 8).toUpperCase()}`

  page.drawRectangle({ x: 0, y: 0, width: 595.28, height: 842, color: black })
  page.drawRectangle({ x: 0, y: 792, width: 595.28, height: 50, color: mono })
  page.drawText('NO SLEEP WEDDING CLUB', { x: 38, y: 811, size: 15, font: bold, color: black })
  page.drawText('P&G WEDDING EDITION  /  06.12.2026', { x: 326, y: 812, size: 9, font: bold, color: black })

  page.drawRectangle({ x: 34, y: 92, width: 527, height: 670, color: cream, borderColor: rgb(0.18, 0.18, 0.14), borderWidth: 1.2 })
  page.drawImage(finca, { x: 292, y: 382, width: 250, height: 375, opacity: 0.18 })
  page.drawRectangle({ x: 50, y: 112, width: 94, height: 630, color: black })
  page.drawRectangle({ x: 144, y: 112, width: 1, height: 630, color: mono })

  page.drawRectangle({ x: 62, y: 642, width: 68, height: 82, color: cream })
  page.drawImage(logo, { x: 68, y: 648, width: 56, height: 68 })
  page.drawText('NO SLEEP', { x: 62, y: 620, size: 8, font: bold, color: paleMono })
  page.drawText('WEDDING CLUB', { x: 58, y: 606, size: 6, font: bold, color: paleMono })
  page.drawText('ACCESS', { x: 70, y: 624, size: 11, font: bold, color: paleMono })
  page.drawText('PASSPORT', { x: 65, y: 607, size: 11, font: bold, color: paleMono })
  page.drawText('VIP FIELD', { x: 68, y: 160, size: 10, font: bold, color: cream })
  page.drawText('ADMIT ONE', { x: 63, y: 140, size: 10, font: bold, color: cream })

  for (let y = 126; y < 725; y += 18) {
    page.drawCircle({ x: 155, y, size: 3, color: black, opacity: 0.22 })
  }

  page.drawText('CLUB PASSPORT', { x: 176, y: 704, size: 34, font: bold, color: black })
  page.drawText('14 HOURS / SECRET INTERNATIONAL GUEST', { x: 178, y: 682, size: 10, font: bold, color: mono })
  page.drawText('CATORCE HORAS. UNA BODA. CERO GANAS DE IRSE A CASA.', { x: 178, y: 664, size: 7, font: bold, color: muted })
  page.drawText('HOLDER', { x: 178, y: 630, size: 8, font: bold, color: muted })
  page.drawText(guestName, { x: 178, y: 604, size: 21, font: bold, color: black })

  page.drawRectangle({ x: 178, y: 540, width: 168, height: 42, color: black })
  page.drawText('STATUS', { x: 190, y: 564, size: 7, font: bold, color: paleMono })
  page.drawText(ticket.status, { x: 190, y: 548, size: 14, font: bold, color: white })
  page.drawRectangle({ x: 356, y: 540, width: 150, height: 42, color: mono })
  page.drawText('PASSPORT CODE', { x: 368, y: 564, size: 7, font: bold, color: black })
  page.drawText(passportCode, { x: 368, y: 548, size: 10, font: bold, color: black })

  page.drawRectangle({ x: 178, y: 456, width: 168, height: 58, color: rgb(1, 1, 1), borderColor: rgb(0.82, 0.79, 0.68), borderWidth: 0.8 })
  page.drawText('DATE / TIME', { x: 190, y: 493, size: 7, font: bold, color: muted })
  page.drawText(`${event.date}  ${event.startTime}`, { x: 190, y: 473, size: 13, font: bold, color: black })
  page.drawRectangle({ x: 356, y: 456, width: 150, height: 58, color: rgb(1, 1, 1), borderColor: rgb(0.82, 0.79, 0.68), borderWidth: 0.8 })
  page.drawText('ZONE', { x: 368, y: 493, size: 7, font: bold, color: muted })
  page.drawText('MAIN FIELD', { x: 368, y: 473, size: 13, font: bold, color: black })

  page.drawRectangle({ x: 178, y: 376, width: 328, height: 54, color: black })
  page.drawText('LOCATION', { x: 190, y: 410, size: 7, font: bold, color: paleMono })
  page.drawText(`${event.venueName} / ${event.city}`.toUpperCase(), { x: 190, y: 390, size: 13, font: bold, color: cream })

  page.drawRectangle({ x: 178, y: 150, width: 170, height: 178, color: white, borderColor: rgb(0.12, 0.12, 0.1), borderWidth: 1 })
  page.drawImage(qr, { x: 190, y: 164, width: 146, height: 146 })
  page.drawText('SCAN AT GATE', { x: 202, y: 136, size: 9, font: bold, color: black })

  page.drawRectangle({ x: 370, y: 150, width: 136, height: 178, color: mono })
  page.drawText('LINEUP', { x: 388, y: 298, size: 9, font: bold, color: black })
  page.drawText('17:30  TARDEO', { x: 388, y: 272, size: 8, font: bold, color: black })
  page.drawText('19:00  BAILE NOVIOS', { x: 388, y: 250, size: 8, font: bold, color: black })
  page.drawText('20:00  SECRET DJ', { x: 388, y: 228, size: 8, font: bold, color: black })
  page.drawText('00:00  NO SLEEP PARTY', { x: 388, y: 206, size: 8, font: bold, color: black })
  page.drawText('ZAMBOMBA + FLAMENQUITO', { x: 388, y: 174, size: 7, font: bold, color: black })
  page.drawText('USE ORIGINAL PDF', { x: 388, y: 160, size: 7, font: bold, color: black })

  page.drawRectangle({ x: 34, y: 44, width: 527, height: 30, color: mono })
  page.drawText('PERSONAL AND NON TRANSFERABLE  /  QR REQUIRED  /  KEEP THIS PASSPORT READY AT THE GATE', {
    x: 52,
    y: 55,
    size: 8,
    font: bold,
    color: black
  })

  const bytes = await doc.save()
  return new NextResponse(Buffer.from(bytes), {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="no-sleep-wedding-club-passport-${ticket.token}.pdf"`
    }
  })
}
