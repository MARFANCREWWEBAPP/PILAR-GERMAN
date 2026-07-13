import { prisma } from '@/lib/db'
import { demoBusRoutes, demoEventConfig, withDatabaseFallback } from '@/lib/demo-data'

export async function getEventConfig() {
  const config = await withDatabaseFallback(
    () => prisma.eventConfig.findFirst({ orderBy: { createdAt: 'desc' } }),
    null
  )

  return config ?? {
    ...demoEventConfig,
    contactInfo: demoEventConfig.contactInfo,
    dressCode: demoEventConfig.dressCode
  }
}

export async function getBusRoutes() {
  return withDatabaseFallback(
    () =>
      prisma.busRoute.findMany({
        select: {
          id: true,
          type: true,
          title: true,
          pointName: true,
          address: true,
          mapsUrl: true,
          departureTime: true,
          notes: true
        },
        orderBy: [{ type: 'asc' }, { departureTime: 'asc' }]
      }),
    demoBusRoutes
  )
}
