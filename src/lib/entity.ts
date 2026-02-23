import { generateAppId, type AppID } from '@/lib/app-id'

export type AppEntity = { id: AppID }

export const cloneWithNewId = <T extends AppEntity>(entity: T): T => {
  const clonedEntity = structuredClone(entity)
  const clonedEntityWithNewId = { ...clonedEntity, id: generateAppId() }

  return clonedEntityWithNewId
}
