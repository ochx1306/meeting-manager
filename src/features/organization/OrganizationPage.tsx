import { OrganizationTable } from './components/OrganizationTable'
import { awaitOrganizationHydration } from './organization-store'

const OrganizationPage = () => {
  return <OrganizationTable />
}

const organizationPageLoader = async () => awaitOrganizationHydration()

export { OrganizationPage as Component, organizationPageLoader as loader }
