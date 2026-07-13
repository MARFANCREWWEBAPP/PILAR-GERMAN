import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { requireAdminSessionFromRequest } from '@/lib/auth'
import { demoBusRoutes, demoEventConfig, demoGuests, isDemoMode } from '@/lib/demo-data'
import { getPublicCopy } from '@/lib/public-copy'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  const session = await requireAdminSessionFromRequest(request)
  const generatedAt = new Date().toISOString()
  const publicCopy = await getPublicCopy()

  const payload = isDemoMode()
    ? {
        version: 1,
        generatedAt,
        generatedBy: session.email,
        mode: 'demo',
        warning: 'Backup demo sin base de datos conectada.',
        eventConfig: demoEventConfig,
        publicCopy,
        busRoutes: demoBusRoutes,
        guests: demoGuests,
        tickets: demoGuests.map((guest) => guest.ticket).filter(Boolean)
      }
    : {
        version: 1,
        generatedAt,
        generatedBy: session.email,
        mode: 'production',
        eventConfig: await prisma.eventConfig.findFirst({ orderBy: { createdAt: 'desc' } }),
        publicContent: await prisma.publicContent.findMany({ orderBy: { updatedAt: 'desc' } }),
        publicCopy,
        busRoutes: await prisma.busRoute.findMany({ orderBy: [{ type: 'asc' }, { departureTime: 'asc' }] }),
        guests: await prisma.guest.findMany({
          include: { ticket: true },
          orderBy: { createdAt: 'desc' }
        }),
        tickets: await prisma.ticket.findMany({
          include: {
            guest: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true,
                phone: true
              }
            },
            validator: {
              select: {
                id: true,
                email: true,
                name: true,
                role: true
              }
            }
          },
          orderBy: { createdAt: 'desc' }
        }),
        admins: await prisma.userAdmin.findMany({
          select: {
            id: true,
            email: true,
            name: true,
            role: true,
            createdAt: true,
            updatedAt: true
          },
          orderBy: { createdAt: 'asc' }
        })
      }

  return NextResponse.json(payload, {
    headers: {
      'Content-Disposition': `attachment; filename="no-sleep-wedding-club-backup-${generatedAt.slice(0, 10)}.json"`,
      'Cache-Control': 'no-store'
    }
  })
}
