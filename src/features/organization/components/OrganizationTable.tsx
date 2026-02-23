import { AppTable } from '@/components/table'
import { useOrganizationStore } from '../organization-store'
import { organizationColumns } from '../organization-columns'
import { AddOrganizationDialog } from './AddOrganizationDialog'

export const OrganizationTable = () => {
  const organizations = useOrganizationStore((state) => state.organizations)

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-4">組織一覧</h1>
      <div>
        <AddOrganizationDialog />
      </div>
      <AppTable columns={organizationColumns} data={organizations} />
    </div>
  )
}
