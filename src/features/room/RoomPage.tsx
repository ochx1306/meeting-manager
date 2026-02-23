// import { RoomTable } from './components/RoomTable'
import { AddRoomDialog } from '../room/components/AddRoomDialog'
import { SampleTable } from './components/SampleTable'

const RoomPage = () => {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-4">会議室一覧</h1>
      <div className="mb-4">
        <AddRoomDialog />
      </div>
      {/* <RoomTable /> */}
      <SampleTable />
    </div>
  )
}

export { RoomPage as Component }
