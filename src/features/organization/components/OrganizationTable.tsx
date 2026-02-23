import { AppTable } from '@/components/data-table'
import { useOrganizationStore } from '../organization-store'
import { organizationColumns } from '../organization-columns'
import { CreateOrganizationDialog } from './CreateOrganizationDialog'
import { TablePageLayout } from '@/components/layout/TablePageLayput'

export const OrganizationTable = () => {
  const organizations = useOrganizationStore((state) => state.organizations)

  return (
    <TablePageLayout title="組織一覧" action={<CreateOrganizationDialog />}>
      <AppTable columns={organizationColumns} data={organizations} />
    </TablePageLayout>
  )
}
