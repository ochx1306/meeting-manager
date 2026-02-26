import { z } from 'zod'
import { appIdSchema } from '@/lib/app-id'
import { appEntitySchema } from '@/lib/app-entity'

export const organizationSchema = appEntitySchema.extend({
  name: z.string().min(1, '組織名を入力してください'),
  type: z.enum(['unit', 'group']),
  parentId: appIdSchema.nullable(),
  path: z.array(appIdSchema),
  validFrom: z.date(),
  isIndefinite: z.boolean(),
  validTo: z.date().nullable(),
  isProvisional: z.boolean(),
  isSuspended: z.boolean(),
})
export type Organization = z.infer<typeof organizationSchema>

export const organizationFormSchema = organizationSchema.omit({
  id: true,
  path: true,
})
export type OrganizationFormValues = z.infer<typeof organizationFormSchema>
