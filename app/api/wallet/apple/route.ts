import { NextRequest, NextResponse } from 'next/server'
import { isAppleWalletConfigured } from '@/lib/ticket'

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => ({}))
  const token = typeof body.token === 'string' ? body.token : ''

  if (!token) {
    return NextResponse.json({ ok: false, message: 'No encuentro el passport para añadirlo a Apple Wallet.' }, { status: 400 })
  }

  if (!isAppleWalletConfigured()) {
    return NextResponse.json({
      ok: false,
      message: 'Apple Wallet ya está preparado en la entrada. Para activarlo de verdad necesitamos cargar Pass Type ID, Team ID y certificados Apple para generar el archivo .pkpass.'
    })
  }

  return NextResponse.json({
    ok: false,
    message: 'Apple Wallet está configurado, pero falta conectar la generación real del .pkpass firmado para este passport.'
  })
}
