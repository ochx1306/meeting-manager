import { z } from 'zod'
import { appIdSchema } from '@/lib/app-id'
import { appEntitySchema } from '@/lib/app-entity'

export const memberSchema = appEntitySchema.extend({
  name: z.string().min(1, '名前を入力してください'),
  organizationId: appIdSchema,
  roleId: appIdSchema,
})
export type Member = z.infer<typeof memberSchema>

export const memberFormSchema = memberSchema.omit({ id: true })
export type MemberFormValues = z.infer<typeof memberFormSchema>
