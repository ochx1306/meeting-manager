import { CrudTableTemplate } from '@/components/crud/CrudTableTemplate'
import { useRoleStore } from './role-store'
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

export { RolePage as Component }
