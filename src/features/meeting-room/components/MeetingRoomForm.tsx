import { useCrudForm, type CrudFormProps } from '@/lib/use-crud-form'
import { BaseForm, BaseTextInput, BaseNumberInput } from '@/components/form/'
import {
  meetingRoomFormSchema,
  type MeetingRoom,
  type MeetingRoomFormValues,
} from '../meeting-room-schema'
import { useMeetingRoomStore } from '../meeting-room-store'

export const MeetingRoomForm = ({
  crudMode,
  defaultValues,
  onSuccess,
}: CrudFormProps<MeetingRoom>) => {
  const createItem = useMeetingRoomStore((state) => state.createItem)
  const updateItem = useMeetingRoomStore((state) => state.updateItem)

  const { form, onSubmit } = useCrudForm<MeetingRoomFormValues, MeetingRoom>({
    defaultValues: defaultValues ?? { name: '', capacity: 200 },
    crudMode,
    schema: meetingRoomFormSchema,
    entityId: defaultValues?.id,
    createItem,
    updateItem,
    onSuccess,
  })

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
