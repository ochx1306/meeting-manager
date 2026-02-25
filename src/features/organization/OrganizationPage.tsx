import { CrudTable } from '@/components/crud/CrudTable'
import {
  useOrganizationStore,
  awaitOrganizationStoreHydration,
} from './organization-store'
import { OrganizationForm } from './components/OrganizationForm'
import { organizationColumns } from './organization-columns'

const OrganizationPage = () => {
  const items = useOrganizationStore((state) => state.items)
  const deleteItem = useOrganizationStore((state) => state.deleteItem)

  return (
    <CrudTable
      featureName="組織"
      items={items}
      deleteItem={deleteItem}
      columns={organizationColumns}
      CrudForm={OrganizationForm}
    />
  )
}

const organizationPageLoader = async () => awaitOrganizationStoreHydration()

export { OrganizationPage as Component, organizationPageLoader as loader }
