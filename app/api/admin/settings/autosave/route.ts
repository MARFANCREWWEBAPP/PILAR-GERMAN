import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { requireAdminSessionFromRequest } from '@/lib/auth'

export const dynamic = 'force-dynamic'

function value(formData: FormData, key: string, fallback = '') {
  const raw = formData.get(key)
  const text = typeof raw === 'string' ? raw.trim() : ''
  return text || fallback
}

export async function POST(request: NextRequest) {
  await requireAdminSessionFromRequest(request)

  if (!process.env.DATABASE_URL) {
    return NextResponse.json({ ok: true, demo: true })
  }

  const formData = await request.formData()
  const currentConfig = await prisma.eventConfig.findFirst({ orderBy: { createdAt: 'desc' } })
  const data = {
    eventName: value(formData, 'eventName', currentConfig?.eventName || 'NO SLEEP WEDDING CLUB'),
    coupleNames: value(formData, 'coupleNames', currentConfig?.coupleNames || 'PILAR & GERMÁN'),
    date: value(formData, 'date', currentConfig?.date || '06.12.2026'),
    startTime: value(formData, 'startTime', currentConfig?.startTime || '17:30'),
    venueName: value(formData, 'venueName', currentConfig?.venueName || 'FINCA SAN ISIDRO'),
    city: value(formData, 'city', currentConfig?.city || 'ARDALES'),
    address: value(formData, 'address', currentConfig?.address || 'Finca San Isidro, Ardales, Málaga'),
    googleMapsUrl: value(formData, 'googleMapsUrl', currentConfig?.googleMapsUrl || 'https://share.google/gpKNBvCS03JEzRHFP'),
    appleMapsUrl: value(formData, 'appleMapsUrl', currentConfig?.appleMapsUrl || ''),
    wazeUrl: value(formData, 'wazeUrl', currentConfig?.wazeUrl || ''),
    contactInfo: value(formData, 'contactInfo', currentConfig?.contactInfo || 'info@marquee.es'),
    dressCode: value(formData, 'dressCode', currentConfig?.dressCode || '')
  }

  if (currentConfig) {
    await prisma.eventConfig.update({
      where: { id: currentConfig.id },
      data
    })
  } else {
    await prisma.eventConfig.create({ data })
  }

  return NextResponse.json({ ok: true })
}
