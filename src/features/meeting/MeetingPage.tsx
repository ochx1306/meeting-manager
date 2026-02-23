import { AddMeetingDialog } from './components/AddMeetingDialog'
import { awaitMeetingHydration } from './meeting-store'
import { MeetingTable } from './components/MeetingTable'

const MeetingPage = () => {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-4">会議一覧</h1>
      <div className="mb-4">
        <AddMeetingDialog />
      </div>
      <MeetingTable />
    </div>
  )
}

const MeetingPageLoader = async () => awaitMeetingHydration()

export { MeetingPage as Component, MeetingPageLoader as loader }
