import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { generateAppId } from '@/lib/app-id'
import { roomSchema, type Room } from '../room-schema'
import { useRoomStore } from '../room-store'

interface RoomFormProps {
  initialRoom?: Room
  onSuccess?: () => void
}

export const RoomForm = ({ initialRoom, onSuccess }: RoomFormProps) => {
  const isEditMode = !!initialRoom

  const addRoom = useRoomStore((state) => state.createRoom)
  const updateRoom = useRoomStore((state) => state.updateRoom)

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
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>会議室名</FormLabel>
              <FormControl>
                <Input placeholder="Room Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="capacity"
          render={({ field }) => (
            <FormItem>
              <FormLabel>定員</FormLabel>
              <FormControl>
                <Input placeholder="Capacity" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
