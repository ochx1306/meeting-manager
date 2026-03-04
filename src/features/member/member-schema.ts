import { z } from 'zod'
import { appIdSchema } from '@/lib/app-id'
import { appEntitySchema } from '@/lib/app-entity'

export const memberSchema = appEntitySchema.extend({
  organizationId: appIdSchema,
  fiscalYear: z
    .number()
    .min(1970, '年度（西暦）を半角数字で入力してください'),
  roleId: appIdSchema,
  index: z.number(),
  downloadCount: z.number().default(0),
})
export type Member = z.infer<typeof memberSchema>

export const memberFormSchema = memberSchema.omit({
  id: true,
  name: true,
  downloadCount: true,
})
export type MemberFormValues = z.infer<typeof memberFormSchema>
