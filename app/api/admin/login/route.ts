import { NextRequest, NextResponse } from 'next/server'
import { adminLoginSchema } from '@/lib/schemas'
import { getAdminByEmail, verifyPassword, createSession, setAdminCookie } from '@/lib/auth'
import { isDemoMode } from '@/lib/demo-data'

export async function POST(req: NextRequest) {
  const body = await req.json()
  const parsed = adminLoginSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ ok: false, message: 'Credenciales inválidas' }, { status: 400 })
  }

  const { email, password } = parsed.data
  const normalized = email.toLowerCase()
  let user = null

  try {
    user = await getAdminByEmail(normalized)
  } catch {
    user = null
  }

  const demoEmail = process.env.ADMIN_SEED_EMAIL?.toLowerCase()
  const demoPassword = process.env.ADMIN_SEED_PASSWORD
  const demoCredentials = isDemoMode() && demoEmail && demoPassword && normalized === demoEmail && password === demoPassword
  if (demoCredentials && !user) {
    const response = NextResponse.json({ ok: true })
    const token = await createSession({ id: 1, email: normalized, role: 'ADMIN' })
    setAdminCookie(response, token)
    return response
  }

  if (!user) return NextResponse.json({ ok: false, message: 'Usuario no encontrado' }, { status: 401 })

  const valid = await verifyPassword(password, user.passwordHash)
  if (!valid) return NextResponse.json({ ok: false, message: 'Contraseña incorrecta' }, { status: 401 })

  const token = await createSession({ id: user.id, email: user.email, role: user.role })
  const response = NextResponse.json({ ok: true })
  setAdminCookie(response, token)
  return response
}
