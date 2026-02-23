import { CreateIconButton } from '@/components/icon-buttons'
import { AppDialog } from '@/components/dialog/AppDialog'
import { OrganizationForm } from './OrganizationForm'

export const CreateOrganizationDialog = () => {
  return (
    <AppDialog
      trigger={<CreateIconButton label="組織を追加" />}
      title="組織を新規作成"
      description="新しい組織の情報を入力してください。保存ボタンでリストに追加されます。"
    >
      {(onSuccess) => <OrganizationForm onSuccess={onSuccess} />}
    </AppDialog>
  )
}
