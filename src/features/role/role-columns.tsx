import type { ColumnDef } from '@/components/data-table'
import type { Role } from './role-schema'

export const roleColumns: ColumnDef<Role>[] = [
  {
    accessorKey: 'name',
    header: '役職名',
  },
]
