import { Button } from '@/components/ui/button'
import { useRoomStore } from '../room-store'

interface DeleteRoomButtonProps {
  id: string
}

export const DeleteRoomButton = ({ id }: DeleteRoomButtonProps) => {
  const deleteRoom = useRoomStore((state) => state.deleteRoom)

  const handleDelete = () => {
    deleteRoom(id)
  }

  return (
    <Button variant="destructive" size="sm" onClick={handleDelete}>
      削除
    </Button>
  )
}
