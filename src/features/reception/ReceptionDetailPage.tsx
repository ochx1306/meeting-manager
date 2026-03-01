import { useParams } from 'react-router-dom'
import { QrScanner } from '@/components/qr/QrScanner'
import type { AppId } from '@/lib/app-id'
import { useReceptionStore } from './reception-store'

const ReceptionDetailPage = () => {
  const { id } = useParams<{ id: string }>()
  const receptionId = id as AppId

  const getItem = useReceptionStore((state) => state.getItem)
  const item = receptionId ? getItem(receptionId) : undefined
  if (!item) return null

  const handleScanSuccess = (data: string) => console.log(data)

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-xl font-bold mb-4">QRコードをスキャンしてください</h1>

      <div className="w-full max-w-lg aspect-square shadow-lg">
        <QrScanner onScanSuccess={handleScanSuccess} />
      </div>
    </div>
  )
}

//, receptionDetailPageLoader as loader
export { ReceptionDetailPage as Component }
