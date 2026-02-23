import { z } from 'zod'

export const roomSchema = z.object({
  id: z.uuid(),
  name: z.string().min(1, '会議室名を入力してください'),
  capacity: z.coerce.number().min(1, '定員を半角数字で入力してください'),
})

export type Room = z.infer<typeof roomSchema>
