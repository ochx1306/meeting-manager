import { generateAppId, type AppID } from '@/lib/app-id'

export type AppEntity = {
  id: AppID
  name: string
}

export const cloneWithNewId = <T extends AppEntity>(entity: T): T => {
  const clonedEntity = structuredClone(entity)
  const clonedEntityWithNewId = { ...clonedEntity, id: generateAppId() }

  return clonedEntityWithNewId
}

export const cloneWithCopiedSuffix = <T extends AppEntity>(
  entity: T,
  entities?: T[]
): T => {
  const baseSuffix = ' - コピー'

  const escapedSuffix = baseSuffix.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const regex = new RegExp(`^(.*?)(?:${escapedSuffix}(?:\\(\\d+\\))?)?$`)
  const match = entity.name.match(regex)

  const baseName = match ? match[1] : entity.name

  const existingNames = new Set(entities?.map((e) => e.name) || [])

  let count = 0
  const generateSuffix = () => {
    return count === 0 ? baseSuffix : `${baseSuffix}(${count + 1})`
  }

  let newName = `${baseName}${generateSuffix()}`

  while (existingNames.has(newName)) {
    count++
    newName = `${baseName}${generateSuffix()}`
  }

  const clonedEntityWithNewId = {
    ...structuredClone(entity),
    id: generateAppId(),
    name: newName,
  }

  return clonedEntityWithNewId
}

export const normalizeEntities = <T extends AppEntity>(
  entities: T[]
): Record<AppID, T> => {
  return entities.reduce(
    (acc, entity) => {
      acc[entity.id] = entity
      return acc
    },
    {} as Record<AppID, T>
  )
}

export const denormalizeEntities = <T extends AppEntity>(
  entityRecord: Record<AppID, T>
): T[] => {
  return Object.values(entityRecord)
}

export const extractIds = <T extends AppEntity>(entities: T[]): AppID[] => {
  return entities.map((entity) => entity.id)
}
