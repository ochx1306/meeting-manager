import { AddMeetingDialog } from './components/AddMeetingDialog'
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

export { MeetingPage as Component }
