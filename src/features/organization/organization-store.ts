import { createHydrationAwaiter } from '@/utils/create-partial-async-store'
import { createAppStore } from '@/lib/create-app-store'
import type { Organization } from './organization-schema'

type OrganizationState = {
  organizations: Organization[]
  setOrganizations: (organizations: Organization[]) => void
  createOrganization: (organization: Organization) => void
  updateOrganization: (organization: Organization) => void
  deleteOrganization: (id: string) => void
  getOrganization: (id: string) => Organization | undefined
}

export const useOrganizationStore = createAppStore<OrganizationState>(
  (set, get) => ({
    organizations: [],
    setOrganizations: (organizations: Organization[]) => set({ organizations }),
    createOrganization: (organization: Organization) => {
      set((state) => ({
        organizations: [...state.organizations, organization],
      }))
    },
    updateOrganization: (organization: Organization) => {
      set((state) => ({
        organizations: state.organizations.map((o) =>
          o.id === organization.id ? organization : o
        ),
      }))
    },
    deleteOrganization: (id: string) => {
      set((state) => ({
        organizations: state.organizations.filter((o) => o.id !== id),
      }))
    },
    getOrganization: (id: string) =>
      get().organizations.find((o) => o.id === id),
  }),
  {
    name: 'organization',
  }
)

export const awaitOrganizationHydration =
  createHydrationAwaiter(useOrganizationStore)
