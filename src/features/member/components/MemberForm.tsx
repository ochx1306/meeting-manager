import { useCrudForm, type CrudFormProps } from '@/lib/use-crud-form'
import { convertToOptions } from '@/lib/app-entity'
import { BaseForm, BaseSelect } from '@/components/form/'
import { useRoleStore } from '@/features/role/role-store'
import { useOrganizationStore } from '@/features/organization/organization-store'
import {
  memberFormSchema,
  type Member,
  type MemberFormValues,
} from '../member-schema'
import { useMemberStore } from '../member-store'

export const MemberForm = ({
  crudMode,
  defaultValues,
  onSuccess,
}: CrudFormProps<Member>) => {
  const roles = useRoleStore((state) => state.items)
  const organizations = useOrganizationStore((state) => state.items)

  const createItem = useMemberStore((state) => state.createItem)
  const updateItem = useMemberStore((state) => state.updateItem)

  const { form, onSubmit } = useCrudForm<MemberFormValues, Member>({
    defaultValues: defaultValues ?? { name: '' },
    crudMode,
    schema: memberFormSchema,
    entityId: defaultValues?.id,
    createItem,
    updateItem,
    onSuccess,
  })

  return (
    <BaseForm form={form} onSubmit={onSubmit}>
      <BaseSelect
        control={form.control}
        name="organizationId"
        label="組織"
        options={convertToOptions(organizations)}
      />
      <BaseSelect
        control={form.control}
        name="roleId"
        label="役職"
        options={convertToOptions(roles)}
      />
    </BaseForm>
  )
}
