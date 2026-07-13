import { prisma } from '@/lib/db'
import { demoBusRoutes, demoEventConfig, withDatabaseFallback } from '@/lib/demo-data'

export async function getEventConfig() {
  return withDatabaseFallback(() => prisma.eventConfig.findFirst({ orderBy: { createdAt: 'desc' } }), {
    ...demoEventConfig,
    contactInfo: demoEventConfig.contactInfo,
    dressCode: demoEventConfig.dressCode
  })
}

export async function getBusRoutes() {
  return withDatabaseFallback(() => prisma.busRoute.findMany({ orderBy: [{ type: 'asc' }, { departureTime: 'asc' }] }), demoBusRoutes)
}
