import { DataTable } from '@/components/DataTable'
import { useMeetingStore } from '../meeting-store'
import { meetingColumns } from '../meeting-columns'

export const MeetingTable = () => {
  const meetings = useMeetingStore((state) => state.meetings)

  return (
    <DataTable columns={meetingColumns} data={meetings} key={meetings.length} />
  )
}
