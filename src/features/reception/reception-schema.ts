import { z } from 'zod'
import { appIdSchema } from '@/lib/app-id'
import { appEntitySchema } from '@/lib/app-entity'

export const receptionStatusSchema = z.enum([
  'not_started',
  'in_progress',
  'completed',
])

export const receptionRecordSchema = z.object({
  memberId: appIdSchema,
  registeredAt: z.date(),
})

export const receptionSchema = appEntitySchema.extend({
  meetingId: appIdSchema,
  status: receptionStatusSchema,
  records: z.array(receptionRecordSchema),
})

export type Reception = z.infer<typeof receptionSchema>

export const receptionFormSchema = receptionSchema.omit({ id: true })
export type ReceptionFormValues = z.infer<typeof receptionFormSchema>
