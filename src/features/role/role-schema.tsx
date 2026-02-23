import { z } from 'zod'
import { appIdSchema } from '@/lib/app-id'

export const roleSchema = z.object({
  id: appIdSchema,
  name: z.string().min(1, '役職名を入力してください'),
})
export type Role = z.infer<typeof roleSchema>

export const roleFormSchema = roleSchema.omit({ id: true })
export type RoleFormValues = z.infer<typeof roleFormSchema>
