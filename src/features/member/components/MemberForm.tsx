import { useCrudForm, type CrudFormProps } from '@/lib/use-crud-form'
import type { AppID } from '@/lib/app-id'
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

// import { useEffect } from 'react'

export const MemberForm = ({
  crudMode,
  defaultValues,
  onSuccess,
}: CrudFormProps<Member>) => {
  const roles = useRoleStore((state) => state.items)
  const getRole = useRoleStore((state) => state.getItem)
  const organizations = useOrganizationStore((state) => state.items)
  const getOrganization = useOrganizationStore((state) => state.getItem)

  const createItem = useMemberStore((state) => state.createItem)
  const updateItem = useMemberStore((state) => state.updateItem)

  const { form, onSubmit } = useCrudForm<MemberFormValues, Member>({
    defaultValues: defaultValues ?? { name: ' ' },
    crudMode,
    formSchema: memberFormSchema,
    entityId: defaultValues?.id,
    createItem,
    updateItem,
    transform: (data) => {
      const organizationName = getOrganization(data.organizationId)?.name
      const roleName = getRole(data.roleId)?.name

      return {
        name: `${organizationName} ${roleName}`,
        organizationId: data.organizationId as AppID,
        roleId: data.roleId as AppID,
      }
    },
    onSuccess,
  })

  // useEffect(() => {
  //   if (Object.keys(form.formState.errors).length > 0) {
  //     console.log('Validation Errors:', form.formState.errors)
  //   }
  // }, [form.formState.errors])

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
