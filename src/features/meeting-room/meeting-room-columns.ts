import type { ColumnDef } from '@/components/data-table'
import type { MeetingRoom } from './meeting-room-schema'

export const meetingRoomColumns: ColumnDef<MeetingRoom>[] = [
  {
    accessorKey: 'name',
    header: '会議室名',
  },
  {
    accessorKey: 'capacity',
    header: '定員（人）',
  },
]
