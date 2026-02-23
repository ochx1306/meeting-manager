import { ActionGuard } from '@/components/action-guard/ActionGuard'
import { DeleteIconButton } from '@/components/icon-buttons'
import type { Room } from '../room-schema'
import { useRoomStore } from '../room-store'

interface DeleteRoomButtonProps {
  room: Room
}

export const DeleteRoomButton = ({ room }: DeleteRoomButtonProps) => {
  const deleteRoom = useRoomStore((state) => state.deleteRoom)

  const handleDelete = () => {
    deleteRoom(room.id)
  }

  return (
    <ActionGuard
      onAction={handleDelete}
      shouldConfirm={true}
      renderTrigger={(handleTrigger) => (
        <DeleteIconButton label="削除" onClick={handleTrigger} />
      )}
      title={`「${room.name}」を本当に削除しますか？`}
      description="この操作は取り消せません。"
      actionLabel="削除"
    />
  )
}
