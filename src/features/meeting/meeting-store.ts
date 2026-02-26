import { createAppStore, createHydrationAwaiter } from '@/lib/create-app-store'
import { createCrudSlice, type CrudState } from '@/lib/crud-slice'
import type { Meeting } from './meeting-schema'

type MeetingState = CrudState<Meeting>

export const useMeetingStore = createAppStore<MeetingState>(
  (set, get, api) => ({
    ...createCrudSlice<Meeting, MeetingState>()(set, get, api),
  }),
  { name: 'meeting' }
)

export const awaitMeetingStoreHydration =
  createHydrationAwaiter(useMeetingStore)
