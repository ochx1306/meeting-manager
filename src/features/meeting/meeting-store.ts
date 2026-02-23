import { createHydrationAwaiter } from '@/utils/create-partial-async-store'
import { createAppStore } from '@/lib/create-app-store'
import type { Meeting } from './meeting-schema'

type MeetingState = {
  meetings: Meeting[]
  setMeetings: (meetings: Meeting[]) => void
  addMeeting: (meeting: Meeting) => void
  updateMeeting: (meeting: Meeting) => void
  deleteMeeting: (id: string) => void
  getMeeting: (id: string) => Meeting
}

export const useMeetingStore = createAppStore<MeetingState>(
  (set, get) => ({
    meetings: [],
    setMeetings: (meetings: Meeting[]) => set({ meetings }),
    addMeeting: (meeting: Meeting) =>
      set((state) => ({ meetings: [...state.meetings, meeting] })),
    updateMeeting: (meeting: Meeting) => {
      set((state) => ({
        meetings: state.meetings.map((m) =>
          m.id === meeting.id ? meeting : m
        ),
      }))
    },
    deleteMeeting: (id: string) =>
      set((state) => ({ meetings: state.meetings.filter((m) => m.id !== id) })),
    getMeeting: (id: string) => get().meetings.find((m) => m.id === id)!,
  }),
  { name: 'meeting' }
)

export const awaitMeetingHydration = createHydrationAwaiter(useMeetingStore)
