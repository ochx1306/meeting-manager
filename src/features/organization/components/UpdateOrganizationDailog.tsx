import { UpdateIconButton } from '@/components/icon-buttons'
import { AppDialog } from '@/components/dialog/AppDialog'
import type { Organization } from '../organization-schema'
import { OrganizationForm } from './OrganizationForm'

interface UpdateOrganizationDialogProps {
  organization: Organization
}

export const UpdateOrganizationDialog = ({
  organization,
}: UpdateOrganizationDialogProps) => {
  return (
    <AppDialog
      trigger={<UpdateIconButton label="更新" />}
      title="組織を更新"
      description="更新する組織の情報を入力してください。"
    >
      {(onSuccess) => (
        <OrganizationForm
          initialOrganization={organization}
          onSuccess={onSuccess}
        />
      )}
    </AppDialog>
  )
}
