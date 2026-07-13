import { cookies } from 'next/headers'
import { jwtVerify, SignJWT } from 'jose'
import { NextRequest } from 'next/server'
import bcrypt from 'bcryptjs'
import { prisma } from '@/lib/db'

const COOKIE_NAME = 'admin_session'
const secret = new TextEncoder().encode(process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET || 'dev_secret_change_me')

export type AdminSession = {
  id: number
  email: string
  role: 'ADMIN' | 'STAFF'
}

export async function hashPassword(password: string) {
  return bcrypt.hash(password, 10)
}

export async function verifyPassword(password: string, hash: string) {
  return bcrypt.compare(password, hash)
}

export async function createSession(user: { id: number; email: string; role: 'ADMIN' | 'STAFF' }) {
  return new SignJWT({ email: user.email, role: user.role, sub: String(user.id) })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('8h')
    .sign(secret)
}

export async function verifySession(token?: string) {
  if (!token) return null
  try {
    const { payload } = await jwtVerify(token, secret, { algorithms: ['HS256'] })
    return {
      id: Number(payload.sub),
      email: payload.email as string,
      role: payload.role as 'ADMIN' | 'STAFF'
    }
  } catch {
    return null
  }
}

export async function requireAdminSession() {
  const cookie = cookies().get(COOKIE_NAME)?.value
  const session = await verifySession(cookie)
  if (!session) throw new Error('No autorizado')
  return session
}

export async function requireAdminSessionFromRequest(req: NextRequest) {
  const cookieHeader = req.headers.get('cookie') ?? ''
  const match = cookieHeader
    .split(';')
    .map((value) => value.trim())
    .find((part) => part.startsWith(`${COOKIE_NAME}=`))
  const token = match ? match.substring(COOKIE_NAME.length + 1) : undefined
  const session = await verifySession(token)
  if (!session) throw new Error('No autorizado')

  return session
}

export async function getAdminByEmail(email: string) {
  return prisma.userAdmin.findUnique({ where: { email } })
}

export function setAdminCookie(response: Response, token: string) {
  const secure = process.env.NODE_ENV === 'production'
  response.headers.append(
    'Set-Cookie',
    `${COOKIE_NAME}=${token}; HttpOnly; Path=/; Max-Age=${60 * 60 * 8}; SameSite=Lax${secure ? '; Secure' : ''}`
  )
}

export function clearAdminCookie(response: Response) {
  response.headers.append('Set-Cookie', `${COOKIE_NAME}=; HttpOnly; Path=/; Max-Age=0; SameSite=Lax`)
}
