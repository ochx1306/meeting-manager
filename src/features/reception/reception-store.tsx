import { createAppStore, createHydrationAwaiter } from '@/lib/create-app-store'
import { generateAppId } from '@/lib/app-id'
import { createCrudSlice, type CrudState } from '@/lib/crud-slice'
import type { Meeting } from '@/features/meeting/meeting-schema'
import type { Reception, ReceptionRecord } from './reception-schema'

type ReceptionState = CrudState<Reception> & {
  initializeReception: (meeting: Meeting) => void
  addReceptionRecord: (itemId: string, newRecord: ReceptionRecord) => void
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
    addReceptionRecord: (itemId, newRecord) =>
      set((state) => ({
        items: state.items.map((i) =>
          i.id === itemId ? { ...i, records: [...i.records, newRecord] } : i
        ),
      })),
  }),
  {
    name: 'reception',
  }
)

export const awaitReceptionStoreHydration =
  createHydrationAwaiter(useReceptionStore)
