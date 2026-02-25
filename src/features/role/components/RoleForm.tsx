import { useCrudForm, type CrudFormProps } from '@/lib/use-crud-form'
import { BaseForm, BaseTextInput } from '@/components/form/'
import { roleFormSchema, type Role, type RoleFormValues } from '../role-schema'
import { useRoleStore } from '../role-store'

export const RoleForm = ({
  crudMode,
  defaultValues,
  onSuccess,
}: CrudFormProps<Role>) => {
  const createItem = useRoleStore((state) => state.createItem)
  const updateItem = useRoleStore((state) => state.updateItem)

  const { form, onSubmit } = useCrudForm<RoleFormValues, Role>({
    defaultValues: defaultValues ?? { name: '' },
    crudMode,
    schema: roleFormSchema,
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
        label="役職名"
        placeholder="役職名"
      />
    </BaseForm>
  )
}
