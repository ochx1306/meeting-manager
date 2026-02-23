import { z } from 'zod'

export const meetingSchema = z.object({
  id: z.uuid(),
  title: z.string().min(1, '会議名を入力してください'),
  date: z.date(),
  roomId: z.uuid(),
  // participants
  isReception: z.boolean(),
})

export type Meeting = z.infer<typeof meetingSchema>
