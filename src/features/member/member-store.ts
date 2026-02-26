import { createAppStore, createHydrationAwaiter } from '@/lib/create-app-store'
import { createCrudSlice, type CrudState } from '@/lib/crud-slice'
import type { Member, MemberFormValues } from './member-schema'

export type MemberState = CrudState<Member> & {
  countMember: (member: MemberFormValues) => number
}

export const useMemberStore = createAppStore<MemberState>(
  (set, get, api) => ({
    ...createCrudSlice<Member, MemberState>()(set, get, api),
    countMember: (member) =>
      get().items.filter(
        (m) =>
          m.organizationId === member.organizationId &&
          m.fiscalYear === member.fiscalYear &&
          m.roleId === member.roleId
      ).length,
  }),
  { name: 'member' }
)

export const awaitMemberStoreHydration = createHydrationAwaiter(useMemberStore)
