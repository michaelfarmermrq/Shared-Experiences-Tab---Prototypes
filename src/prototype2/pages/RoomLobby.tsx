import { useState } from 'react'
import Header from '../../components/Header'
import SubNav from '../../components/SubNav'
import FeaturedCarousel from '../../components/FeaturedCarousel'
import GameRow from '../../components/GameRow'
import { categories } from '../../data/games'
import { mockRooms } from '../data/mockData'
import RoomCard from '../components/RoomCard'
import CreateRoomModal from '../components/CreateRoomModal'

interface Props {
  topOffset: number
}

export default function RoomLobby({ topOffset }: Props) {
  const [showCreateModal, setShowCreateModal] = useState(false)

  return (
    <div className="bg-white min-h-screen">
      <Header topOffset={topOffset} />
      <SubNav topOffset={topOffset + 64} />

      <main className="bg-gray-100">
        <FeaturedCarousel />

        {/* ── Rooms section ── */}
        <div className="pt-5 pb-1">
          {/* Section header */}
          <div className="flex items-center justify-between px-5 mb-3">
            <h2 className="text-[15px] font-bold text-gray-900">Rooms</h2>
            <button
              onClick={() => setShowCreateModal(true)}
              className="text-xs font-semibold text-[#0A2ECB] hover:opacity-70 transition-opacity"
            >
              + Create Room
            </button>
          </div>

          {/* Horizontal scroll strip */}
          <div className="flex gap-3 overflow-x-auto scrollbar-hide px-5 pb-1">
            {mockRooms.map(room => (
              <RoomCard key={room.id} room={room} />
            ))}
          </div>
        </div>

        {/* ── Game rows (same as P1) ── */}
        {categories.map((category) => (
          <GameRow key={category.id} category={category} />
        ))}

        <div className="pb-8" />
      </main>

      {/* Create Room modal */}
      {showCreateModal && (
        <CreateRoomModal onClose={() => setShowCreateModal(false)} />
      )}
    </div>
  )
}
