import { NextRequest, NextResponse } from 'next/server'
import { isGoogleWalletConfigured } from '@/lib/ticket'

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => ({}))
  const token = typeof body.token === 'string' ? body.token : ''

  if (!token) {
    return NextResponse.json({ ok: false, message: 'No encuentro el passport para añadirlo a Google Wallet.' }, { status: 400 })
  }

  if (!isGoogleWalletConfigured()) {
    return NextResponse.json({
      ok: false,
      message: 'Google Wallet ya está preparado en la entrada. Para activarlo de verdad necesitamos Issuer ID, Class ID y credenciales de Google Wallet API.'
    })
  }

  return NextResponse.json({
    ok: false,
    message: 'Google Wallet está configurado, pero falta crear el objeto real y devolver el enlace Save to Google Wallet.'
  })
}
