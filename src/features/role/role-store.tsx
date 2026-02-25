import { createAppStore, createHydrationAwaiter } from '@/lib/create-app-store'
import { createCrudSlice, type CrudState } from '@/lib/crud-slice'
import type { Role } from './role-schema'

type RoleState = CrudState<Role>

export const useRoleStore = createAppStore<RoleState>(
  (set, get, api) => ({
    ...createCrudSlice<Role, RoleState>()(set, get, api),
  }),
  {
    name: 'role',
  }
)

export const awaitRoleStoreHydration = createHydrationAwaiter(useRoleStore)
