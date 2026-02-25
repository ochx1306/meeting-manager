import { createAppStore, createHydrationAwaiter } from '@/lib/create-app-store'
import { createCrudSlice, type CrudState } from '@/lib/crud-slice'
import type { Organization } from './organization-schema'

type OrganizationState = CrudState<Organization>

export const useOrganizationStore = createAppStore<OrganizationState>(
  (set, get, api) => ({
    ...createCrudSlice<Organization, OrganizationState>()(set, get, api),
  }),
  {
    name: 'organization',
  }
)

export const awaitOrganizationStoreHydration =
  createHydrationAwaiter(useOrganizationStore)
