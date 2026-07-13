import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { rsvpSchema } from '@/lib/schemas'
import { consumeRateLimit } from '@/lib/rate-limit'
import { generateUniqueToken, generateQrDataUrl } from '@/lib/ticket'
import { TicketStatus } from '@prisma/client'
import { isDemoMode } from '@/lib/demo-data'

const BUS_POINT = 'Cártama estación → Finca San Isidro'

export async function POST(req: NextRequest) {
  const ip = req.ip || req.headers.get('x-forwarded-for') || 'anonymous'
  const rate = consumeRateLimit(ip)
  if (!rate.allowed) {
    return NextResponse.json({ ok: false, message: 'Demasiadas peticiones. Intenta en unos minutos.' }, { status: 429 })
  }

  const body = await req.json()
  const parsed = rsvpSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ ok: false, message: parsed.error.issues[0]?.message || 'Datos no válidos' }, { status: 400 })
  }

  const data = parsed.data
  const email = data.email.toLowerCase()
  const phone = data.phone
  const busPoint = data.busPreference === 'OUTBOUND' ? BUS_POINT : undefined

  if (isDemoMode()) {
    const token = `DEMO-${generateUniqueToken()}`
    const companionToken = data.companion ? `DEMO-${generateUniqueToken()}` : undefined

    return NextResponse.json({
      ok: true,
      message: data.companion ? 'Passports emitidos para invitado y acompañante.' : 'Passport emitido correctamente.',
      token,
      ticketUrl: `/ticket/${token}`,
      companionToken,
      companionTicketUrl: companionToken ? `/ticket/${companionToken}` : undefined
    })
  }

  const duplicate = await prisma.guest.findFirst({ where: { OR: [{ email }, { phone }] } })
  if (duplicate) {
    return NextResponse.json({ ok: false, message: 'Ya existe un registro con ese email o teléfono.', duplicate: true }, { status: 409 })
  }

  const token = generateUniqueToken()
  const qrCodeData = await generateQrDataUrl(token)
  const companionToken = data.companion ? generateUniqueToken() : undefined
  const companionQrCodeData = companionToken ? await generateQrDataUrl(companionToken) : undefined

  await prisma.$transaction(async (tx) => {
    const guest = await tx.guest.create({
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        phone: data.phone,
        email,
        invitedBy: data.invitedBy,
        attendanceStatus: 'CONFIRMED',
        partySize: data.companion ? 2 : 1,
        privacyAccepted: data.privacyAccepted,
        allergies: undefined,
        notes: data.notes,
        busPreference: data.busPreference,
        busPoint
      }
    })

    await tx.ticket.create({
      data: {
        guestId: guest.id,
        token,
        qrCodeData,
        status: TicketStatus.ACTIVE
      }
    })

    if (data.companion && companionToken && companionQrCodeData) {
      const companionGuest = await tx.guest.create({
        data: {
          firstName: data.companionFirstName || 'Acompañante',
          lastName: data.companionLastName || data.lastName,
          phone: `${phone}-AC-${companionToken.slice(0, 6)}`,
          email: `acompanante-${companionToken.slice(0, 12)}@no-sleep.local`,
          invitedBy: `Acompañante de ${data.firstName} ${data.lastName}`,
          attendanceStatus: 'CONFIRMED',
          partySize: 1,
          privacyAccepted: data.privacyAccepted,
          allergies: undefined,
          notes: `Acompañante de ${data.firstName} ${data.lastName}${data.notes ? ` · ${data.notes}` : ''}`,
          busPreference: data.busPreference,
          busPoint
        }
      })

      await tx.ticket.create({
        data: {
          guestId: companionGuest.id,
          token: companionToken,
          qrCodeData: companionQrCodeData,
          status: TicketStatus.ACTIVE
        }
      })
    }
  })

  return NextResponse.json({
    ok: true,
    message: data.companion ? 'Passports emitidos para invitado y acompañante.' : 'Passport emitido correctamente.',
    token,
    ticketUrl: `/ticket/${token}`,
    companionToken,
    companionTicketUrl: companionToken ? `/ticket/${companionToken}` : undefined
  })
}
