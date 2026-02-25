import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { BaseForm, BaseTextInput, BaseNumberInput } from '@/components/form'
import { generateAppId } from '@/lib/app-id'
import { roomSchema, type Room } from '../room-schema'
import { useRoomStore } from '../room-store'

interface RoomFormProps {
  initialRoom?: Room
  onSuccess?: () => void
}

export const RoomForm = ({ initialRoom, onSuccess }: RoomFormProps) => {
  const isEditMode = !!initialRoom

  const addRoom = useRoomStore((state) => state.createItem)
  const updateRoom = useRoomStore((state) => state.updateItem)

  const form = useForm<Room>({
    resolver: zodResolver(roomSchema),
    defaultValues: isEditMode
      ? initialRoom
      : {
          id: generateAppId(),
          name: '',
          capacity: 1,
        },
  })

  const onSubmit = (room: Room) => {
    if (isEditMode) {
      updateRoom(room)
    } else {
      addRoom(room)
    }

    onSuccess?.()
  }

  return (
    <BaseForm form={form} onSubmit={onSubmit}>
      <BaseTextInput
        control={form.control}
        name="name"
        label="会議室名"
        placeholder="会議室名"
      />
      <BaseNumberInput
        control={form.control}
        name="capacity"
        label="定員"
        placeholder="定員"
      />
    </BaseForm>
  )
}
