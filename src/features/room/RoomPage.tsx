import { RoomTable } from './components/RoomTable'
import { awaitRoomHydration } from './room-store'

const RoomPage = () => {
  return <RoomTable />
}

const roomPageLoader = async () => awaitRoomHydration()

export { RoomPage as Component, roomPageLoader as loader }
