import { CrudTable } from '@/components/crud/CrudTable'
import {
  useMeetingRoomStore,
  awaitMeetingRoomStoreHydration,
} from './meeting-room-store'
import { MeetingRoomForm } from './components/MeetingRoomForm'
import { meetingRoomColumns } from './meeting-room-columns'

const MeetingRoomPage = () => {
  const items = useMeetingRoomStore((state) => state.items)
  const deleteItem = useMeetingRoomStore((state) => state.deleteItem)

  return (
    <CrudTable
      featureName="会議室"
      items={items}
      deleteItem={deleteItem}
      columns={meetingRoomColumns}
      CrudForm={MeetingRoomForm}
    />
  )
}

const meetingRoomPageLoader = async () => awaitMeetingRoomStoreHydration()

export { MeetingRoomPage as Component, meetingRoomPageLoader as loader }
