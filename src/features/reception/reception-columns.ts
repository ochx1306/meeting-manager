import type { ColumnDef } from '@/components/data-table'
import { useMeetingStore } from '../meeting/meeting-store'
import type { Reception } from './reception-schema'

export const receptionColumns: ColumnDef<Reception>[] = [
  {
    accessorKey: 'meetingId',
    header: '会議名',
    cell: ({ row }) => {
      const meeting = useMeetingStore.getState().getItem(row.meetingId)
      return meeting?.name
    },
  },
]
