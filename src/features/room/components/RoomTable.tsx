import { AppTable } from '@/components/data-table'
import { useRoomStore } from '../room-store'
import { roomColumns } from '../room-columns'
import { CreateRoomDialog } from './CreateRoomDialog'
import { TablePageLayout } from '@/components/layout/TablePageLayput'

export const RoomTable = () => {
  const rooms = useRoomStore((state) => state.items)

  return (
    <TablePageLayout title="会議室一覧" action={<CreateRoomDialog />}>
      <AppTable columns={roomColumns} data={rooms} />
    </TablePageLayout>
  )
}
