import { OrganizationTable } from './components/OrganizationTable'
import { awaitOrganizationHydration } from './organization-store'

const OrganizationPage = () => {
  return <OrganizationTable />
}

const organizationPageLoader = () => awaitOrganizationHydration()

export { OrganizationPage as Component, organizationPageLoader as loader }
