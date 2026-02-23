import { z } from 'zod'

export const appIdSchema = z.uuid().brand<'AppID'>()

export type AppID = z.infer<typeof appIdSchema>

export const generateAppId = (): AppID => {
  return crypto.randomUUID() as AppID
}
