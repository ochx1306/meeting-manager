import { useEffect } from 'react'
import { useWatch } from 'react-hook-form'
import { generateAppId } from '@/lib/app-id'
import { useCrudForm, type CrudFormProps } from '@/lib/use-crud-form'
import { convertToOptions } from '@/lib/app-entity'
import {
  BaseForm,
  BaseTextInput,
  BaseCheckbox,
  BaseSelect,
} from '@/components/form/'
import {
  organizationFormSchema,
  type Organization,
  type OrganizationFormValues,
} from '../organization-schema'
import { useOrganizationStore } from '../organization-store'
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form'
import { Calendar } from '@/components/ui/calendar'

export const OrganizationForm = ({
  crudMode,
  defaultValues,
  onSuccess,
}: CrudFormProps<Organization>) => {
  const items = useOrganizationStore((state) => state.items)
  const createItem = useOrganizationStore((state) => state.createItem)
  const updateItem = useOrganizationStore((state) => state.updateItem)
  const getItem = useOrganizationStore((state) => state.getItem)

  const entityId = defaultValues ? defaultValues.id : generateAppId()

  const { form, onSubmit } = useCrudForm<OrganizationFormValues, Organization>({
    defaultValues: defaultValues ?? {
      name: '',
      type: 'unit',
      parentId: null,
      validFrom: new Date(),
      isIndefinite: true,
      validTo: null,
      isProvisional: false,
      isSuspended: false,
    },
    crudMode,
    formSchema: organizationFormSchema,
    entityId,
    createItem,
    updateItem,
    transform: (data) => {
      const path = [entityId]
      if (data.parentId) {
        const item = getItem(data.parentId)
        if (item) {
          path.unshift(...item.path)
        }
      }

      return {
        ...data,
        path,
      }
    },
    onSuccess,
  })

  const isIndefinite = useWatch({
    control: form.control,
    name: 'isIndefinite',
  })

  useEffect(() => {
    if (isIndefinite) {
      form.setValue('validTo', null)
    }
  }, [isIndefinite, form])

  return (
    <BaseForm form={form} onSubmit={onSubmit}>
      <BaseTextInput
        control={form.control}
        name="name"
        label="組織名"
        placeholder="組織名"
      />
      <BaseSelect
        control={form.control}
        name="type"
        label="タイプ"
        options={[
          { label: 'ユニット', value: 'unit' },
          { label: 'グループ', value: 'group' },
        ]}
      />
      <BaseSelect
        control={form.control}
        name="parentId"
        label="親組織"
        allowClear={true}
        options={convertToOptions(
          items.filter((item) => item.id !== defaultValues?.id)
        )}
      />
      <FormField
        control={form.control}
        name="validFrom"
        render={({ field }) => (
          <FormItem>
            <FormLabel>活動開始日</FormLabel>
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
      <BaseCheckbox
        control={form.control}
        name="isIndefinite"
        label="活動終了日未定"
      />
      {!isIndefinite && (
        <FormField
          control={form.control}
          name="validTo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>活動終了日</FormLabel>
              <FormControl>
                <Calendar
                  mode="single"
                  selected={field.value ?? undefined}
                  onSelect={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      )}
      <BaseCheckbox
        control={form.control}
        name="isProvisional"
        label="仮認定"
      />
      <BaseCheckbox control={form.control} name="isSuspended" label="休止中" />
    </BaseForm>
  )
}
