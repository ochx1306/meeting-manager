import { CrudTable } from '@/components/crud/CrudTable'
import { useRoleStore, awaitRoleHydration } from './role-store'
import { RoleForm } from './components/RoleForm'
import { roleColumns } from './role-columns'

const RolePage = () => {
  const items = useRoleStore((state) => state.items)
  const deleteItem = useRoleStore((state) => state.deleteItem)

  return (
    <CrudTable
      featureName="役職"
      items={items}
      deleteItem={deleteItem}
      columns={roleColumns}
      CrudForm={RoleForm}
    />
  )
}

const rolePageLoader = async () => awaitRoleHydration()

export { RolePage as Component, rolePageLoader as loader }
