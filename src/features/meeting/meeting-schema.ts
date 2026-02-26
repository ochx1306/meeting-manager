import { z } from 'zod'
import { appIdSchema } from '@/lib/app-id'
import { appEntitySchema } from '@/lib/app-entity'

export const meetingSchema = appEntitySchema.extend({
  name: z.string().min(1, '会議名を入力してください'),
  date: z.date(),
  meetingRoomId: appIdSchema,
  memberIds: z.array(appIdSchema),
  isReception: z.boolean(),
})
export type Meeting = z.infer<typeof meetingSchema>

export const meetingFormSchema = meetingSchema.omit({ id: true })
export type MeetingFormValues = z.infer<typeof meetingFormSchema>
