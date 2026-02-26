import { formatDateIntl } from '@/lib/formatter'
import { Badge } from '@/components/ui/badge'
import type { ColumnDef } from '@/components/data-table'
import { useMeetingRoomStore } from '../meeting-room/meeting-room-store'
import type { Meeting } from './meeting-schema'

export const meetingColumns: ColumnDef<Meeting>[] = [
  {
    accessorKey: 'name',
    header: '会議名',
  },
  {
    accessorKey: 'date',
    header: '日付',
    cell: ({ row }) => {
      const date = new Date(row.date)
      return formatDateIntl(date)
    },
  },
  {
    accessorKey: 'meetingRoomId',
    header: '会議室名',
    cell: ({ row }) => {
      const meetingRoomId = row.meetingRoomId
      const meetingRoom = useMeetingRoomStore
        .getState()
        .items.find((item) => item.id === meetingRoomId)
      return meetingRoom?.name
    },
  },
  {
    accessorKey: 'isReception',
    header: '受付',
    cell: ({ row }) => {
      const isReception = row.isReception as boolean
      return isReception && <Badge className="self-center">受付済み</Badge>
    },
  },
]
