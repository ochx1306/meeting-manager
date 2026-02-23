import type { ColumnDef } from '@tanstack/react-table'
import { Badge } from '@/components/ui/badge'
import { formatDateIntl } from '@/lib/formatter'
import type { Meeting } from './meeting-schema'

export const meetingColumns: ColumnDef<Meeting>[] = [
  {
    accessorKey: 'title',
    header: '会議名',
  },
  {
    accessorKey: 'date',
    header: '日付',
    cell: ({ row }) => {
      const date = new Date(row.getValue('date'))
      return formatDateIntl(date)
    },
  },
  {
    accessorKey: 'isReception',
    header: '受付',
    cell: ({ row }) => {
      const isReception = row.getValue('isReception') as boolean
      return isReception && <Badge className="self-center">受付済み</Badge>
    },
  },
]
