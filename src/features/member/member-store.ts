import { createAppStore, createHydrationAwaiter } from '@/lib/create-app-store'
import { createCrudSlice, type CrudState } from '@/lib/crud-slice'
import type { Member } from './member-schema'

export type MemberState = CrudState<Member>

export const useMemberStore = createAppStore<MemberState>(
  (set, get, api) => ({
    ...createCrudSlice<Member, MemberState>()(set, get, api),
  }),
  { name: 'member' }
)

export const awaitMemberStoreHydration = createHydrationAwaiter(useMemberStore)
