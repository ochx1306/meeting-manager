import type { ColumnDef } from '@/components/data-table'
import { formatEra } from '@/lib/formatter'
import { useOrganizationStore } from '../organization/organization-store'
import { useRoleStore } from '../role/role-store'
import type { Member } from './member-schema'

export const memberColumns: ColumnDef<Member>[] = [
  {
    accessorKey: 'organizationId',
    header: '組織',
    cell: ({ row }) =>
      useOrganizationStore
        .getState()
        .items.find((item) => item.id === row.organizationId)?.name,
  },
  {
    accessorKey: 'fiscalYear',
    header: '年度',
    cell: ({ row }) => formatEra(row.fiscalYear),
  },
  {
    accessorKey: 'roleId',
    header: '役職',
    cell: ({ row }) =>
      useRoleStore.getState().items.find((item) => item.id === row.roleId)
        ?.name,
  },
  {
    accessorKey: 'index',
    header: '連番',
    cell: ({ row }) => row.index + 1,
  },
]
