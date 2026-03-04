import type { AppId } from '@/lib/app-id'
import { createAppStore, createHydrationAwaiter } from '@/lib/create-app-store'
import { createCrudSlice, type CrudState } from '@/lib/crud-slice'
import type { Member, MemberFormValues } from './member-schema'

type AdjacentMemberTuple = [Member | null, Member | null, Member | null]

export type MemberState = CrudState<Member> & {
  countMember: (member: MemberFormValues) => number
  getAdjacentMemebers: (id: AppId) => AdjacentMemberTuple
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
    getAdjacentMemebers: (id) => {
      const result = [null, null, null] as AdjacentMemberTuple

      let i = 0
      const currentItem = get().items.find((item) => {
        if (item.id === id) {
          return true
        } else {
          i++
          return false
        }
      })
      if (!currentItem) return result

      const prevIndex = i - 1
      if (prevIndex >= 0) result[0] = get().items[prevIndex]
      result[1] = currentItem
      const nextIndex = i + 1
      if (nextIndex < get().items.length) result[2] = get().items[nextIndex]

      return result
    },
  }),
  { name: 'member' }
)

export const awaitMemberStoreHydration = createHydrationAwaiter(useMemberStore)
