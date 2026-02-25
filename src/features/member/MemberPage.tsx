import { CrudTable } from '@/components/crud/CrudTable'
import { awaitOrganizationStoreHydration } from '../organization/organization-store'
import { awaitRoleStoreHydration } from '../role/role-store'
import { useMemberStore, awaitMemberStoreHydration } from './member-store'
import { MemberForm } from './components/MemberForm'
import { memberColumns } from './member-columns'

const MemberPage = () => {
  const items = useMemberStore((state) => state.items)
  const deleteItem = useMemberStore((state) => state.deleteItem)

  return (
    <CrudTable
      featureName="メンバー"
      items={items}
      deleteItem={deleteItem}
      columns={memberColumns}
      CrudForm={MemberForm}
    />
  )
}

const memberPageLoader = async () => {
  Promise.all([
    awaitMemberStoreHydration(),
    awaitOrganizationStoreHydration(),
    awaitRoleStoreHydration(),
  ])
  return null
}

export { MemberPage as Component, memberPageLoader as loader }
