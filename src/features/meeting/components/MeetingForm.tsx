import { useCrudForm, type CrudFormProps } from '@/lib/use-crud-form'
import { convertToOptions } from '@/lib/app-entity'
import { BaseForm, BaseTextInput, BaseSelect } from '@/components/form/'
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form'
import { Calendar } from '@/components/ui/calendar'
import { useReceptionStore } from '@/features/reception/reception-store'
import {
  meetingFormSchema,
  type Meeting,
  type MeetingFormValues,
} from '../meeting-schema'
import { useMeetingStore } from '../meeting-store'
import { useMeetingRoomStore } from '@/features/meeting-room/meeting-room-store'

export const MeetingForm = ({
  crudMode,
  defaultValues,
  onSuccess,
}: CrudFormProps<Meeting>) => {
  const initializeReception = useReceptionStore(
    (state) => state.initializeReception
  )

  const createItem = useMeetingStore((state) => state.createItem)
  const updateItem = useMeetingStore((state) => state.updateItem)

  const meetingRooms = useMeetingRoomStore((state) => state.items)
  const getSortedMeetingRoomsByCapacity = useMeetingRoomStore(
    (state) => state.getSortedMeetingRoomsByCapacity
  )
  const sortedMeetingRooms = getSortedMeetingRoomsByCapacity()

  const handleCreateItem = (item: Meeting) => {
    createItem(item)
    initializeReception(item)
  }

  const { form, onSubmit } = useCrudForm<MeetingFormValues, Meeting>({
    defaultValues: defaultValues ?? {
      name: '',
      date: new Date(),
      meetingRoomId: meetingRooms[0].id,
      memberIds: [],
    },
    crudMode,
    formSchema: meetingFormSchema,
    entityId: defaultValues?.id,
    createItem: handleCreateItem,
    updateItem,
    onSuccess,
  })

  return (
    <BaseForm form={form} onSubmit={onSubmit}>
      <BaseTextInput
        control={form.control}
        name="name"
        label="会議名"
        placeholder="会議名"
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
      <BaseSelect
        control={form.control}
        name="meetingRoomId"
        label="会議室"
        options={convertToOptions(sortedMeetingRooms)}
      />
    </BaseForm>
  )
}
