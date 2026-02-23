import { AppTable } from '../../../components/table/AppTable'
import type { ColumnDef } from '../../../components/table/column'
import { useRoomStore } from '../room-store'
import type { Room } from '../room-schema'

const columns: ColumnDef<Room>[] = [
  {
    accessorKey: 'name',
    header: '会議室名',
  },
  {
    accessorKey: 'capacity',
    header: '定員（人）',
  },
]

const SampleTable = () => {
  const sampleData = useRoomStore((state) => state.rooms)

  return <AppTable columns={columns} data={sampleData} />
}

export { SampleTable }
