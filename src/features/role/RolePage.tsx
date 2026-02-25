import { CrudTableTemplate } from '@/components/crud/CrudTableTemplate'
import { useRoleStore, awaitRoleHydration } from './role-store'
import { RoleForm } from './components/RoleForm'
import { roleColumns } from './role-columns'

const RolePage = () => {
  return (
    <CrudTableTemplate
      featureName="役職"
      crudStore={useRoleStore}
      columns={roleColumns}
      CrudForm={RoleForm}
    />
  )
}

const rolePageLoader = async () => awaitRoleHydration()

export { RolePage as Component, rolePageLoader as loader }
