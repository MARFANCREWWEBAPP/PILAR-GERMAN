import { NextResponse } from 'next/server'
import { getPublicCopy } from '@/lib/public-copy'

export const dynamic = 'force-dynamic'

export async function GET() {
  const copy = await getPublicCopy()
  return NextResponse.json(copy)
}
