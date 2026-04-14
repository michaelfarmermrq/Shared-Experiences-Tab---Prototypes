import { useState } from 'react'
import Header from '../../components/Header'
import { mockRooms, mockMyRooms, mockFriends, createdRooms } from '../data/mockData'
import type { Room } from '../data/mockData'
import LobbySidebar from '../components/LobbySidebar'
import HappeningNow from '../components/HappeningNow'
import GameGrid from '../components/GameGrid'
import CreateRoomModal from '../components/CreateRoomModal'

const publicRooms = mockRooms.filter(r => r.isPublic)

interface Props {
  topOffset: number
}

export default function RoomLobby({ topOffset }: Props) {
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [myRooms, setMyRooms] = useState<Room[]>([...mockMyRooms, ...createdRooms])

  function handleRoomCreated(room: Room) {
    createdRooms.push(room)
    setMyRooms(prev => [...prev, room])
  }

  const headerHeight = 64
  const contentHeight = `calc(100vh - ${topOffset + headerHeight}px)`

  return (
    <div className="bg-white min-h-screen">
      <Header topOffset={topOffset} />

      <div className="flex" style={{ height: contentHeight }}>
        {/* Left sidebar */}
        <LobbySidebar
          myRooms={myRooms}
          friends={mockFriends}
          onCreateRoom={() => setShowCreateModal(true)}
        />

        {/* Main area */}
        <main className="flex-1 overflow-y-auto bg-gray-50 p-6 space-y-8">
          <HappeningNow rooms={publicRooms} />
          <GameGrid />
        </main>
      </div>

      {/* Create Room modal */}
      {showCreateModal && (
        <CreateRoomModal
          onClose={() => setShowCreateModal(false)}
          onRoomCreated={handleRoomCreated}
        />
      )}
    </div>
  )
}
