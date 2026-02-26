import { CrudTable } from '@/components/crud/CrudTable'
import { awaitMeetingRoomStoreHydration } from '../meeting-room/meeting-room-store'
import { awaitMemberStoreHydration } from '../member/member-store'
import { useMeetingStore, awaitMeetingStoreHydration } from './meeting-store'
import { MeetingForm } from './components/MeetingForm'
import { meetingColumns } from './meeting-columns'

const MeetingPage = () => {
  const items = useMeetingStore((state) => state.items)
  const deleteItem = useMeetingStore((state) => state.deleteItem)

  return (
    <CrudTable
      featureName="会議"
      items={items}
      deleteItem={deleteItem}
      columns={meetingColumns}
      CrudForm={MeetingForm}
    />
  )
}

const MeetingPageLoader = async () => {
  Promise.all([
    awaitMeetingStoreHydration(),
    awaitMeetingRoomStoreHydration(),
    awaitMemberStoreHydration(),
  ])
  return null
}

export { MeetingPage as Component, MeetingPageLoader as loader }
