import { z } from 'zod'
import { appEntitySchema } from '@/lib/app-entity'

export const meetingRoomSchema = appEntitySchema.extend({
  name: z.string().min(1, '会議室名を入力してください'),
  capacity: z.number().min(1, '定員を半角数字で入力してください'),
})
export type MeetingRoom = z.infer<typeof meetingRoomSchema>

export const meetingRoomFormSchema = meetingRoomSchema.omit({ id: true })
export type MeetingRoomFormValues = z.infer<typeof meetingRoomFormSchema>
