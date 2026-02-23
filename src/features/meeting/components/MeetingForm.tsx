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
import { Calendar } from '@/components/ui/calendar'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { generateAppId } from '@/lib/app-id'
import { meetingSchema, type Meeting } from '../meeting-schema'
import { useMeetingStore } from '../meeting-store'
import { useRoomStore } from '@/features/room/room-store'

interface MeetingFormProps {
  initialMeeting?: Meeting
  onSuccess?: () => void
}

export const MeetingForm = ({
  initialMeeting,
  onSuccess,
}: MeetingFormProps) => {
  const isEditMode = !!initialMeeting

  const addMeeting = useMeetingStore((state) => state.addMeeting)
  const updateMeeting = useMeetingStore((state) => state.updateMeeting)

  const rooms = useRoomStore((state) => state.rooms)
  const getSortedRoomsByCapacity = useRoomStore(
    (state) => state.getSortedRoomsByCapacity
  )
  const sortedRooms = getSortedRoomsByCapacity()

  const form = useForm<Meeting>({
    resolver: zodResolver(meetingSchema),
    defaultValues: isEditMode
      ? initialMeeting
      : {
          id: generateAppId(),
          title: '',
          date: new Date(),
          roomId: rooms[0].id,
          // participants
          isReception: false,
        },
  })

  const onSubmit = (meeting: Meeting) => {
    if (isEditMode) {
      updateMeeting(meeting)
    } else {
      addMeeting(meeting)
    }

    onSuccess?.()
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>会議名</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem>
              <FormLabel>日付</FormLabel>
              <FormControl>
                <Calendar
                  mode="single"
                  selected={field.value}
                  onSelect={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="roomId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>会議室</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="会議室" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {sortedRooms.map((room) => (
                    <SelectItem key={room.id} value={room.id}>
                      {room.name}（定員：{room.capacity}人）
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">保存</Button>
      </form>
    </Form>
  )
}
