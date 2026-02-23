import { createAppStore, createHydrationAwaiter } from '@/lib/create-app-store'
import { createCrudSlice, type CrudState } from '@/lib/crud-slice'
import type { Room } from './room-schema'

// type RoomState = {
//   rooms: Room[]
//   setRooms: (rooms: Room[]) => void
//   createRoom: (room: Room) => void
//   updateRoom: (room: Room) => void
//   deleteRoom: (id: string) => void
//   getRoom: (id: string) => Room
//   getSortedRoomsByCapacity: () => Room[]
// }

// export const useRoomStore = createAppStore<RoomState>(
//   (set, get) => ({
//     rooms: [],
//     setRooms: (rooms: Room[]) => set({ rooms }),
//     createRoom: (room: Room) =>
//       set((state) => ({ rooms: [...state.rooms, room] })),
//     updateRoom: (room: Room) => {
//       set((state) => ({
//         rooms: state.rooms.map((r) => (r.id === room.id ? room : r)),
//       }))
//     },
//     deleteRoom: (id: string) =>
//       set((state) => ({ rooms: state.rooms.filter((r) => r.id !== id) })),
//     getRoom: (id: string) => get().rooms.find((r) => r.id === id)!,
//     getSortedRoomsByCapacity: () =>
//       get().rooms.sort((a, b) => b.capacity - a.capacity),
//   }),
//   { name: 'room' }
// )

type RoomState = CrudState<Room> & { getSortedRoomsByCapacity: () => Room[] }

export const useRoomStore = createAppStore<RoomState>(
  (set, get, api) => ({
    ...createCrudSlice<Room, RoomState>()(set, get, api),

    getSortedRoomsByCapacity: () =>
      [...get().items].sort((a, b) => b.capacity - a.capacity),
  }),
  { name: 'room' }
)

export const awaitRoomHydration = createHydrationAwaiter(useRoomStore)
