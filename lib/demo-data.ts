export type DemoTicketStatus = 'ACTIVE' | 'USED' | 'CANCELLED'

export type DemoAttendanceStatus = 'CONFIRMED' | 'DECLINED' | 'PENDING'

export type DemoBusPreference = 'NONE' | 'OUTBOUND' | 'RETURN' | 'BOTH'

export const demoEventConfig = {
  eventName: 'NO SLEEP WEDDING CLUB',
  coupleNames: 'PILAR & GERMÁN',
  date: '6 · 12 · 2026',
  startTime: '17:30',
  venueName: 'FINCA SAN ISIDRO',
  city: 'ARDALES',
  address: 'FINCA SAN ISIDRO, ARDALES',
  googleMapsUrl: 'https://share.google/gpKNBvCS03JEzRHFP',
  appleMapsUrl: 'https://maps.apple.com',
  wazeUrl: 'https://waze.com',
  contactInfo: 'info@marquee.es',
  dressCode: 'Black & white club elegance'
}

export const demoBusRoutes = [
  {
    id: 1,
    type: 'OUTBOUND' as const,
    title: 'Bus Cártama estación → Finca San Isidro',
    pointName: 'Cártama estación',
    address: 'Salida desde Cártama estación hasta FINCA SAN ISIDRO, ARDALES',
    mapsUrl: 'https://share.google/gpKNBvCS03JEzRHFP',
    departureTime: 'Horario por confirmar',
    notes: 'Trayecto único de ida para invitados que confirmen bus en el registro'
  }
]

export const demoGuests = [
  {
    id: 1,
    firstName: 'María',
    lastName: 'García',
    phone: '+34 600 111 111',
    email: 'maria@example.com',
    invitedBy: 'Novia',
    attendanceStatus: 'CONFIRMED' as DemoAttendanceStatus,
    busPreference: 'OUTBOUND' as DemoBusPreference,
    busPoint: 'Puerta oeste',
    allergies: 'Ninguna',
    notes: 'Llega con amiga',
    ticket: { id: 1, token: 'DEMO-TOKEN-MARIA', status: 'ACTIVE' as DemoTicketStatus }
  },
  {
    id: 2,
    firstName: 'Carlos',
    lastName: 'López',
    phone: '+34 600 222 222',
    email: 'carlos@example.com',
    invitedBy: 'Novio',
    attendanceStatus: 'DECLINED' as DemoAttendanceStatus,
    busPreference: 'NONE' as DemoBusPreference,
    busPoint: null,
    allergies: null,
    notes: null,
    ticket: null
  },
  {
    id: 3,
    firstName: 'Lucía',
    lastName: 'Martín',
    phone: '+34 600 333 333',
    email: 'lucia@example.com',
    invitedBy: 'Amigos',
    attendanceStatus: 'PENDING' as DemoAttendanceStatus,
    busPreference: 'BOTH' as DemoBusPreference,
    busPoint: 'Entrada norte',
    allergies: 'Lácteos',
    notes: 'Tiene coche compartido',
    ticket: { id: 3, token: 'DEMO-TOKEN-LUCIA', status: 'CANCELLED' as DemoTicketStatus }
  }
] as const

export function isDemoTicketToken(token: string) {
  return token.startsWith('DEMO-')
}

export function getDemoTicket(token: string) {
  const existingGuest = demoGuests.find((guest) => guest.ticket?.token === token)
  if (existingGuest?.ticket) {
    return {
      id: existingGuest.ticket.id,
      token: existingGuest.ticket.token,
      status: existingGuest.ticket.status,
      guest: existingGuest
    }
  }

  if (!isDemoTicketToken(token)) {
    return null
  }

  return {
    id: 999,
    token,
    status: 'ACTIVE' as DemoTicketStatus,
    guest: {
      id: 999,
      firstName: 'Invitado',
      lastName: 'confirmado',
      phone: '',
      email: '',
      invitedBy: 'Evento',
      attendanceStatus: 'CONFIRMED' as DemoAttendanceStatus,
      busPreference: 'NONE' as DemoBusPreference,
      busPoint: null,
      allergies: null,
      notes: null,
      ticket: null
    }
  }
}

export function isDemoMode() {
  return !process.env.DATABASE_URL
}

export async function withDatabaseFallback<T>(action: () => Promise<T>, fallback: T): Promise<T> {
  try {
    return await action()
  } catch {
    return fallback
  }
}

type SearchQuery = Record<string, string | string[] | undefined>

export function filterDemoGuests(query: SearchQuery, rows: typeof demoGuests) {
  const q = typeof query.q === 'string' ? query.q.trim().toLowerCase() : ''
  const attendance = typeof query.attendanceStatus === 'string' ? query.attendanceStatus : ''
  const invitedBy = typeof query.invitedBy === 'string' ? query.invitedBy : ''
  const bus = typeof query.busPreference === 'string' ? query.busPreference : ''

  return rows.filter((row) => {
    if (q) {
      const hit = [row.firstName, row.lastName, row.phone, row.email].some((value) => String(value).toLowerCase().includes(q))
      if (!hit) return false
    }
    if (attendance && row.attendanceStatus !== attendance) return false
    if (invitedBy && row.invitedBy !== invitedBy) return false
    if (bus && row.busPreference !== bus) return false
    return true
  })
}
