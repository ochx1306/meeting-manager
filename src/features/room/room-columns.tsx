import type { ColumnDef } from '@/components/data-table'
import type { Room } from './room-schema'
import { UpdateRoomDialog } from './components/UpdateRoomDialog'
import { DeleteRoomButton } from './components/DeleteRoomButton'

export const roomColumns: ColumnDef<Room>[] = [
  {
    accessorKey: 'name',
    header: '会議室名',
  },
  {
    accessorKey: 'capacity',
    header: '定員（人）',
  },
  {
    id: 'actions',
    header: '操作',
    cell: ({ row }) => {
      return (
        <div className="flex gap-2">
          <UpdateRoomDialog room={row} />
          <DeleteRoomButton room={row} />
        </div>
      )
    },
  },
]
