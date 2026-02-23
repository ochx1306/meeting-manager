import type { ColumnDef } from '@/components/table'
import type { Organization } from './organization-schema'
import { useOrganizationStore } from './organization-store'
import { Badge } from '@/components/ui/badge'
import { OrganizationActionsCell } from './components/OrganizationActionsCell'

export const organizationColumns: ColumnDef<Organization>[] = [
  {
    accessorKey: 'name',
    header: '組織名',
  },
  {
    accessorKey: 'type',
    header: '種別',
    cell: ({ row }) => {
      const type = row.type
      return <Badge variant="outline">{type.toUpperCase()}</Badge>
    },
  },
  {
    accessorKey: 'parentId',
    header: '親組織',
    cell: ({ row }) => {
      const parentId = row.parentId
      if (!parentId) return <span className="text-muted-foreground">-</span>

      const parent = useOrganizationStore.getState().getOrganization(parentId)
      if (!parent) return <span className="text-muted-foreground">不明</span>

      return <div>{parent.name}</div>
    },
  },
  {
    accessorKey: 'validFrom',
    header: '活動開始日',
    cell: ({ row }) => {
      const date = new Date(row.validFrom)
      return <div>{date.toLocaleDateString()}</div>
    },
  },
  {
    accessorKey: 'validTo',
    header: '活動終了日',
    cell: ({ row }) => {
      const validTo = row.validTo
      if (!validTo) {
        return <div>-</div>
      }

      const date = new Date(validTo)
      return <div>{date.toLocaleDateString()}</div>
    },
  },
  {
    id: 'actions',
    header: '操作',
    cell: ({ row }) => {
      return <OrganizationActionsCell row={row} />
    },
  },
]
