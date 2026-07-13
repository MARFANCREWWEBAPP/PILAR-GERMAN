import { mkdir, readFile, writeFile } from 'fs/promises'
import { dirname, join } from 'path'
import { defaultPublicCopy, publicCopySections, type PublicCopy } from '@/lib/public-copy-fields'
import { prisma } from '@/lib/db'

const copyPath = join(process.cwd(), 'data', 'public-copy.json')
const publicCopyId = 'guest-facing-copy'

function cloneDefaults(): PublicCopy {
  return JSON.parse(JSON.stringify(defaultPublicCopy)) as PublicCopy
}

function mergeCopy(raw: unknown): PublicCopy {
  const next = cloneDefaults()
  const source = raw && typeof raw === 'object' ? (raw as Partial<PublicCopy>) : {}

  for (const section of publicCopySections) {
    const sectionValue = source[section.key]
    if (!sectionValue || typeof sectionValue !== 'object') continue

    for (const field of section.fields) {
      const value = (sectionValue as Record<string, unknown>)[field.key]
      if (typeof value === 'string') {
        next[section.key][field.key] = value
      }
    }
  }

  return next
}

export async function getPublicCopy(): Promise<PublicCopy> {
  if (process.env.DATABASE_URL) {
    try {
      const record = await prisma.publicContent.findUnique({ where: { id: publicCopyId } })
      return mergeCopy(record?.content)
    } catch {
      return cloneDefaults()
    }
  }

  try {
    const file = await readFile(copyPath, 'utf8')
    return mergeCopy(JSON.parse(file))
  } catch {
    return cloneDefaults()
  }
}

export async function savePublicCopyFromForm(formData: FormData) {
  const next = cloneDefaults()

  for (const section of publicCopySections) {
    for (const field of section.fields) {
      const value = formData.get(`${section.key}.${field.key}`)
      next[section.key][field.key] = typeof value === 'string' ? value : defaultPublicCopy[section.key][field.key]
    }
  }

  if (process.env.DATABASE_URL) {
    await prisma.publicContent.upsert({
      where: { id: publicCopyId },
      update: { content: next },
      create: { id: publicCopyId, content: next }
    })
    return
  }

  await mkdir(dirname(copyPath), { recursive: true })
  await writeFile(copyPath, `${JSON.stringify(next, null, 2)}\n`, 'utf8')
}
