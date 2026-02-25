import { UpdateIconButton } from '@/components/icon-buttons'
import { BaseDialog } from '@/components/dialog/BaseDialog'
import type { Room } from '../room-schema'
import { RoomForm } from './RoomForm'

interface UpdateRoomDialogProps {
  room: Room
}

export const UpdateRoomDialog = ({ room }: UpdateRoomDialogProps) => {
  return (
    <BaseDialog
      trigger={<UpdateIconButton label="更新" />}
      title="会議室を更新"
      description="更新する会議室の情報を入力してください。"
    >
      {(onSuccess) => <RoomForm initialRoom={room} onSuccess={onSuccess} />}
    </BaseDialog>
  )
}
