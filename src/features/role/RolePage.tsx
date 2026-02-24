import { CrudTableTemplate } from '@/components/crud/CrudTableTemplate'
import { useRoleStore } from './role-store'
import { RoleForm } from './components/RoleForm'
import { DeleteRoleButton } from './components/DeleteRoleButton'
import { roleColumns } from './role-columns'

const RolePage = () => {
  const items = useRoleStore((state) => state.items)

  return (
    <CrudTableTemplate
      featureName="役職"
      data={items}
      columns={roleColumns}
      CrudForm={RoleForm}
      DeleteAction={DeleteRoleButton}
    />
  )
}

export { RolePage as Component }
