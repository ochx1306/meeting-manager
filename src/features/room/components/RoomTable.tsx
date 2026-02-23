import { DataTable } from '@/components/DataTable'
import { useRoomStore } from '../room-store'
import { roomColumns } from '../room-columns'

export const RoomTable = () => {
  const rooms = useRoomStore((state) => state.rooms)

  return <DataTable columns={roomColumns} data={rooms} key={rooms.length} />
}
