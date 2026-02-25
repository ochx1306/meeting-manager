import { z } from 'zod'
import { appEntitySchema } from '@/lib/app-entity'

export const organizationSchema = appEntitySchema.extend({
  name: z.string().min(1, '組織名を入力してください'),
  type: z.enum(['unit', 'group']),
  parentId: z.string().nullable(),
  validFrom: z.date(),
  isIndefinite: z.boolean(),
  validTo: z.date().nullable(),
  isProvisional: z.boolean(),
  isSuspended: z.boolean(),
})
export type Organization = z.infer<typeof organizationSchema>

export const organizationFormSchema = organizationSchema.omit({ id: true })
export type OrganizationForm = z.infer<typeof organizationFormSchema>
