import { createAppStore, createHydrationAwaiter } from '@/lib/create-app-store'
import { generateAppId } from '@/lib/app-id'
import { createCrudSlice, type CrudState } from '@/lib/crud-slice'
import type { Meeting } from '@/features/meeting/meeting-schema'
import type { Reception } from './reception-schema'

type ReceptionState = CrudState<Reception> & {
  initializeReception: (meeting: Meeting) => void
}

export const useReceptionStore = createAppStore<ReceptionState>(
  (set, get, api) => ({
    ...createCrudSlice<Reception, ReceptionState>()(set, get, api),
    initializeReception: (meeting) => {
      set((state) => ({
        items: [
          ...state.items,
          {
            id: generateAppId(),
            name: meeting.name,
            meetingId: meeting.id,
            status: 'not_started',
            records: [],
          },
        ],
      }))
    },
  }),
  {
    name: 'reception',
  }
)

export const awaitReceptionStoreHydration =
  createHydrationAwaiter(useReceptionStore)
