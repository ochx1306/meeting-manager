import { createAppStore, createHydrationAwaiter } from '@/lib/create-app-store'
import { createCrudSlice, type CrudState } from '@/lib/crud-slice'
import type { MeetingRoom } from './meeting-room-schema'

type MeetingRoomState = CrudState<MeetingRoom> & {
  getSortedMeetingRoomsByCapacity: () => MeetingRoom[]
}

export const useMeetingRoomStore = createAppStore<MeetingRoomState>(
  (set, get, api) => ({
    ...createCrudSlice<MeetingRoom, MeetingRoomState>()(set, get, api),
    getSortedMeetingRoomsByCapacity: () =>
      [...get().items].sort((a, b) => b.capacity - a.capacity),
  }),
  { name: 'meetingRoom' }
)

export const awaitMeetingRoomStoreHydration =
  createHydrationAwaiter(useMeetingRoomStore)
