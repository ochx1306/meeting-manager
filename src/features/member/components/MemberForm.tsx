import { useCrudForm, type CrudFormProps } from '@/lib/use-crud-form'
import { formatEra } from '@/lib/formatter'
import type { AppId } from '@/lib/app-id'
import { convertToOptions } from '@/lib/app-entity'
import { BaseForm, BaseNumberInput, BaseSelect } from '@/components/form/'
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
  const countMember = useMemberStore((state) => state.countMember)

  const { form, onSubmit } = useCrudForm<MemberFormValues, Member>({
    defaultValues: defaultValues ?? {
      organizationId: organizations[0].id,
      fiscalYear: new Date().getFullYear(),
      roleId: roles[0].id,
      index: 0,
    },
    crudMode,
    formSchema: memberFormSchema,
    entityId: defaultValues?.id,
    createItem,
    updateItem,
    transform: (data) => {
      const organizationName = getOrganization(data.organizationId)?.name
      const roleName = getRole(data.roleId)?.name
      const index = countMember(data)

      return {
        ...data,
        name: `${organizationName} ${formatEra(data.fiscalYear)} ${roleName} ${index + 1}`,
        organizationId: data.organizationId as AppId,
        roleId: data.roleId as AppId,
        index,
        downloadCount: 0,
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
      <BaseNumberInput
        control={form.control}
        name="fiscalYear"
        label="年度（西暦）"
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
