import { UpdateIconButton, DeleteIconButton } from '@/components/icon-buttons'
import { ActionGuard } from '@/components/action-guard/ActionGuard'
import { useOrganizationStore } from '../organization-store'
import type { Organization } from '../organization-schema'

interface OrganizationActionsCellProps {
  row: Organization
}

export const OrganizationActionsCell = ({
  row,
}: OrganizationActionsCellProps) => {
  const updateOrganization = useOrganizationStore(
    (state) => state.updateOrganization
  )
  const deleteOrganization = useOrganizationStore(
    (state) => state.deleteOrganization
  )

  const handleUpdate = () => {
    updateOrganization(row)
  }

  const handleDelete = () => {
    deleteOrganization(row.id)
  }

  return (
    <div className="flex gap-2">
      <UpdateIconButton onClick={handleUpdate} />
      <ActionGuard
        onAction={handleDelete}
        shouldConfirm={true}
        renderTrigger={(handleTrigger) => (
          <DeleteIconButton onClick={handleTrigger} />
        )}
        title={`${row.name}を本当に削除しますか？`}
        description="この操作は取り消せません"
        actionLabel="削除"
      />
    </div>
  )
}
