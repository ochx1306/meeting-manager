import { z } from 'zod'

export const appIdSchema = z.uuid().brand<'AppID'>()

export type AppId = z.infer<typeof appIdSchema>

export const generateAppId = (): AppId => {
  return crypto.randomUUID() as AppId
}
