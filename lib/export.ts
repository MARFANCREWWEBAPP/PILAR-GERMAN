import { Prisma } from '@prisma/client'

export type GuestExportRow = {
  firstName: string
  lastName: string
  phone: string
  email: string
  invitedBy: string
  attendanceStatus: string
  busPreference: string
  busPoint: string | null
  allergies: string | null
  notes: string | null
  token: string | null
  ticketStatus: string | null
  createdAt: Date
  checkedInAt: Date | null
}

export function guestRowsToCsv(rows: GuestExportRow[]) {
  const headers = [
    'Nombre',
    'Apellidos',
    'Teléfono',
    'Email',
    'Invitación',
    'Confirmación asistencia',
    'Preferencia de bus',
    'Punto de bus',
    'Alergias',
    'Observaciones',
    'Token de entrada',
    'Estado entrada',
    'Fecha de registro',
    'Fecha de validación'
  ]

  const escape = (value: string) => `"${String(value).replaceAll('"', '""')}"`
  const rowsCsv = rows.map((row) =>
    [
      escape(row.firstName),
      escape(row.lastName),
      escape(row.phone),
      escape(row.email),
      escape(row.invitedBy),
      escape(row.attendanceStatus),
      escape(row.busPreference),
      escape(row.busPoint || ''),
      escape(row.allergies || ''),
      escape(row.notes || ''),
      escape(row.token || ''),
      escape(row.ticketStatus || 'SIN ENTRADA'),
      escape(row.createdAt.toISOString()),
      escape(row.checkedInAt ? row.checkedInAt.toISOString() : '')
    ].join(',')
  )

  return [headers.join(','), ...rowsCsv].join('\n')
}

export function buildGuestFilterWhere(query: Record<string, string | string[] | undefined>) {
  const where: Prisma.GuestWhereInput = {}

  if (query.q) {
    const q = String(query.q)
    where.OR = [
      { firstName: { contains: q, mode: 'insensitive' } },
      { lastName: { contains: q, mode: 'insensitive' } },
      { email: { contains: q, mode: 'insensitive' } },
      { phone: { contains: q, mode: 'insensitive' } }
    ]
  }

  if (query.attendanceStatus) {
    where.attendanceStatus = String(query.attendanceStatus) as any
  }

  if (query.invitedBy) {
    where.invitedBy = String(query.invitedBy)
  }

  if (query.busPreference) {
    where.busPreference = String(query.busPreference) as any
  }

  if (query.validated) {
    if (String(query.validated) === 'true') {
      where.ticket = { is: { status: 'USED' } }
    } else {
      where.AND = [
        ...(Array.isArray(where.AND) ? where.AND : where.AND ? [where.AND] : []),
        {
          OR: [
            { ticket: { is: null } },
            { ticket: { is: { status: { not: 'USED' } } } }
          ]
        }
      ]
    }
  }

  return where
}

export function guestRowsForExcel(rows: GuestExportRow[]) {
  return rows.map((row) => ({
    Nombre: row.firstName,
    Apellidos: row.lastName,
    Teléfono: row.phone,
    Email: row.email,
    Invitacion: row.invitedBy,
    Confirmación: row.attendanceStatus,
    'Preferencia de bus': row.busPreference,
    'Punto de bus': row.busPoint || '',
    Alergias: row.allergies || '',
    Observaciones: row.notes || '',
    Token: row.token || '',
    'Estado entrada': row.ticketStatus || 'SIN ENTRADA',
    'Fecha de registro': row.createdAt.toISOString(),
    'Fecha de validación': row.checkedInAt ? row.checkedInAt.toISOString() : ''
  }))
}
