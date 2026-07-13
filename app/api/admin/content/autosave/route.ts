import { NextRequest, NextResponse } from 'next/server'
import { requireAdminSessionFromRequest } from '@/lib/auth'
import { savePublicCopyFromForm } from '@/lib/public-copy'

export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  await requireAdminSessionFromRequest(request)
  const formData = await request.formData()
  await savePublicCopyFromForm(formData)

  return NextResponse.json({ ok: true })
}
