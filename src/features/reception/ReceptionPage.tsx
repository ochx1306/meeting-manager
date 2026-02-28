import { CrudTable } from '@/components/crud/CrudTable'
import { awaitMeetingStoreHydration } from '../meeting/meeting-store'
import {
  useReceptionStore,
  awaitReceptionStoreHydration,
} from './reception-store'
import { receptionColumns } from './reception-columns'

const ReceptionPage = () => {
  const items = useReceptionStore((state) => state.items)

  return (
    <CrudTable
      featureName="受付"
      items={items}
      columns={receptionColumns}
      allowCreate={false}
      allowUpdate={false}
      allowDelete={false}
    />
  )
}

const receptionPageLoader = async () => {
  await Promise.all([
    awaitMeetingStoreHydration(),
    awaitReceptionStoreHydration(),
  ])
}

export { ReceptionPage as Component, receptionPageLoader as loader }
