import { CreateIconButton } from '@/components/icon-buttons'
import { BaseDialog } from '@/components/dialog/BaseDialog'
import { RoomForm } from './RoomForm'

export const CreateRoomDialog = () => {
  return (
    <BaseDialog
      trigger={<CreateIconButton label="会議室を追加" />}
      title="会議室を新規作成"
      description="新しい会議室の情報を入力してください。保存ボタンでリストに追加されます。"
    >
      {(onSuccess) => <RoomForm onSuccess={onSuccess} />}
    </BaseDialog>
  )
}
