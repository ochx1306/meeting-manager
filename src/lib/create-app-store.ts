import type { StateCreator } from 'zustand'
import {
  createPartialAsyncStore,
  createHydrationAwaiter,
  type CustomPersistOptions,
} from '@/utils/create-partial-async-store'
import { APP_NAME } from '@/constants/app'
import { appStateStorage } from './storage'

export const createAppStore = <T extends object>(
  initializer: StateCreator<T, [], []>,
  options: CustomPersistOptions<T>
) => {
  const { name } = options
  const nameWithAppPrefix = `${APP_NAME}-${name}`

  return createPartialAsyncStore(initializer, {
    ...options,
    name: nameWithAppPrefix,
    driver: appStateStorage,
  })
}

export { createHydrationAwaiter }
