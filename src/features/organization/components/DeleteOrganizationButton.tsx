import { DeleteIconButton } from '@/components/icon-buttons'
import { ActionGuard } from '@/components/action-guard/ActionGuard'
import type { Organization } from '../organization-schema'
import { useOrganizationStore } from '../organization-store'

interface DeleteOrganizationButtonProps {
  organization: Organization
}

export const DeleteOrganizationButton = ({
  organization,
}: DeleteOrganizationButtonProps) => {
  const deleteOrganization = useOrganizationStore(
    (state) => state.deleteOrganization
  )

  const handleDelete = () => {
    deleteOrganization(organization.id)
  }

  return (
    <ActionGuard
      onAction={handleDelete}
      shouldConfirm={true}
      renderTrigger={(handleTrigger) => (
        <DeleteIconButton label="削除" onClick={handleTrigger} />
      )}
      title={`「${organization.name}」を本当に削除しますか？`}
      description="この操作は取り消せません。"
      actionLabel="削除"
    />
  )
}
