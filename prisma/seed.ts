import { PrismaClient } from '@prisma/client'
import { hash } from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  const adminEmail = process.env.ADMIN_SEED_EMAIL || 'admin@boda.com'
  const adminPassword = process.env.ADMIN_SEED_PASSWORD || 'Cambiar123!'
  const passwordHash = await hash(adminPassword, 10)

  await prisma.userAdmin.upsert({
    where: { email: adminEmail },
    update: { passwordHash },
    create: {
      email: adminEmail,
      name: 'Admin Boda',
      passwordHash,
      role: 'ADMIN'
    }
  })

  await prisma.eventConfig.upsert({
    where: { id: 1 },
    update: {
      eventName: 'NO SLEEP WEDDING CLUB',
      coupleNames: 'PILAR & GERMÁN',
      date: '06.12.2026',
      startTime: '17:30',
      venueName: 'FINCA SAN ISIDRO',
      city: 'ARDALES',
      address: 'Finca San Isidro, Ardales, Málaga',
      googleMapsUrl: 'https://share.google/gpKNBvCS03JEzRHFP',
      contactInfo: 'info@marquee.es',
      dressCode: 'Black & white festival wedding club'
    },
    create: {
      id: 1,
      eventName: 'NO SLEEP WEDDING CLUB',
      coupleNames: 'PILAR & GERMÁN',
      date: '06.12.2026',
      startTime: '17:30',
      venueName: 'FINCA SAN ISIDRO',
      city: 'ARDALES',
      address: 'Finca San Isidro, Ardales, Málaga',
      googleMapsUrl: 'https://share.google/gpKNBvCS03JEzRHFP',
      contactInfo: 'info@marquee.es',
      dressCode: 'Black & white festival wedding club'
    }
  })

  await prisma.busRoute.upsert({
    where: { id: 1 },
    update: {
      type: 'OUTBOUND',
      title: 'Bus Cártama estación → Finca',
      pointName: 'Cártama estación',
      address: 'Estación de Cártama, Málaga',
      mapsUrl: 'https://maps.google.com',
      departureTime: '17:00',
      notes: 'Único trayecto confirmado hacia Finca San Isidro.'
    },
    create: {
      id: 1,
      type: 'OUTBOUND',
      title: 'Bus Cártama estación → Finca',
      pointName: 'Cártama estación',
      address: 'Estación de Cártama, Málaga',
      mapsUrl: 'https://maps.google.com',
      departureTime: '17:00',
      notes: 'Único trayecto confirmado hacia Finca San Isidro.'
    }
  })
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
