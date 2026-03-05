import { useParams } from 'react-router-dom'
import { ReceptionScanner } from '@/components/qr/ReceptionScanner'
import type { AppId } from '@/lib/app-id'
import { useMeetingStore } from '../meeting/meeting-store'
import { useReceptionStore } from './reception-store'
import { useReception } from './use-reception'

const ReceptionDetailPage = () => {
  const { id } = useParams<{ id: string }>()
  const receptionId = id as AppId

  const getItem = useReceptionStore((state) => state.getItem)
  const updateItem = useReceptionStore((state) => state.updateItem)
  const addReceptionRecord = useReceptionStore(
    (state) => state.addReceptionRecord
  )
  const getMeeting = useMeetingStore((state) => state.getItem)

  const item = receptionId ? getItem(receptionId) : undefined

  const meeting = item ? getMeeting(item.meetingId) : undefined

  const handleSuccess = (id: string) => {
    const memberId = id as AppId
    const registeredAt = new Date()

    addReceptionRecord(receptionId, { memberId, registeredAt })
  }

  const { handleScan } = useReception({
    initialAttendedIds: item?.records.map((r) => r.memberId),
    allowedIds: meeting?.memberIds,
    onSuccess: handleSuccess,
  })

  if (!item) return null

  return <ReceptionScanner eventName={item.name} onScan={handleScan} />
}

//, receptionDetailPageLoader as loader
export { ReceptionDetailPage as Component }
