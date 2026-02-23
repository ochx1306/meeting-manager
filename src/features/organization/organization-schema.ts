import { z } from 'zod'
// import { appIdSchema } from '@/lib/app-id'

export const organizationSchema = z.object({
  id: z.uuid(),
  name: z.string().min(1, '組織名を入力してください'),
  type: z.enum(['unit', 'group']),
  parentId: z.string().nullable(),
  validFrom: z.date(),
  isIndefinite: z.boolean(),
  validTo: z.date().optional(),
  isProvisional: z.boolean(),
  isSuspended: z.boolean(),
})

export type Organization = z.infer<typeof organizationSchema>
