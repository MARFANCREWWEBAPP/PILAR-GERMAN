import { z } from 'zod'

const optionalText = z.string().trim().optional().or(z.literal('')).transform((v) => v || undefined)

export const rsvpSchema = z
  .object({
    firstName: z.string().trim().min(1, 'El nombre es obligatorio'),
    lastName: z.string().trim().min(1, 'El apellido es obligatorio'),
    phone: z.string().trim().min(7, 'Teléfono no válido'),
    email: z.string().trim().email('Email no válido'),
    invitedBy: z.string().trim().optional().default('Invitado'),
    companion: z.preprocess((value) => value === true || value === 'YES' || value === 'on', z.boolean()).default(false),
    companionFirstName: optionalText,
    companionLastName: optionalText,
    privacyAccepted: z.preprocess((value) => value === undefined || value === 'on' || value === true, z.boolean()).default(true),
    notes: optionalText,
    busPreference: z.enum(['NONE', 'OUTBOUND']).default('NONE'),
    busPoint: optionalText
  })
  .superRefine((data, ctx) => {
    if (data.companion && !data.companionFirstName) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, path: ['companionFirstName'], message: 'Indica el nombre del acompañante' })
    }
    if (data.companion && !data.companionLastName) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, path: ['companionLastName'], message: 'Indica los apellidos del acompañante' })
    }
  })

export const adminLoginSchema = z.object({
  email: z.string().trim().email(),
  password: z.string().min(6)
})

export const guestEditSchema = z.object({
  firstName: z.string().trim().min(1).optional(),
  lastName: z.string().trim().min(1).optional(),
  phone: z.string().trim().min(7).optional(),
  email: z.string().trim().email().optional(),
  invitedBy: z.string().trim().min(2).optional(),
  attendanceStatus: z.enum(['CONFIRMED', 'DECLINED', 'PENDING']).optional(),
  partySize: z.coerce.number().int().min(1).optional(),
  busPreference: z.enum(['NONE', 'OUTBOUND', 'RETURN', 'BOTH']).optional(),
  busPoint: z.string().trim().optional(),
  allergies: optionalText,
  notes: optionalText,
  privacyAccepted: z
    .preprocess((value) => value === 'on' || value === true, z.boolean())
    .optional()
    .transform((v) => v ?? false)
})

export const scanSchema = z.object({
  token: z.string().trim().min(8)
})
