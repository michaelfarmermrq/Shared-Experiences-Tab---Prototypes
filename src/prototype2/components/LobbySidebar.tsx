import { useNavigate } from 'react-router-dom'
import { PlusIcon } from '@heroicons/react/24/outline'
import type { Room, Friend } from '../data/mockData'

interface Props {
  myRooms: Room[]
  friends: Friend[]
  onCreateRoom: () => void
}

export default function LobbySidebar({ myRooms, friends, onCreateRoom }: Props) {
  const navigate = useNavigate()

  return (
    <aside className="w-[240px] flex-shrink-0 bg-white border-r border-gray-200 flex flex-col overflow-y-auto">
      {/* My Rooms */}
      <div className="p-4 pb-2">
        <h3 className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-3">
          My Rooms
        </h3>
        <div className="space-y-1">
          {myRooms.map((room) => (
            <button
              key={room.id}
              onClick={() => navigate(`/prototype/2/room/${room.id}`)}
              className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg hover:bg-gray-50 transition-colors text-left group"
            >
              <span className="text-lg flex-shrink-0">{room.luckyCharm}</span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-900 truncate group-hover:text-[#0A2ECB] transition-colors">
                  {room.name}
                </p>
                <p className="text-[11px] text-gray-400">{room.game}</p>
              </div>
              <span className="flex-shrink-0 bg-gray-100 text-gray-500 text-[10px] font-bold rounded-full px-1.5 py-0.5">
                {room.players.length}
              </span>
            </button>
          ))}
        </div>
        <button
          onClick={onCreateRoom}
          className="w-full flex items-center gap-2 px-2.5 py-2 mt-1 rounded-lg text-[#0A2ECB] hover:bg-blue-50 transition-colors text-sm font-semibold"
        >
          <PlusIcon className="w-4 h-4" />
          Create Room
        </button>
      </div>

      {/* Divider */}
      <div className="mx-4 border-t border-gray-100" />

      {/* Friends Online */}
      <div className="p-4 pt-3">
        <h3 className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-3">
          Friends Online
          <span className="ml-1.5 text-green-500">{friends.length}</span>
        </h3>
        <div className="space-y-1">
          {friends.map((friend) => (
            <div
              key={friend.name}
              className="flex items-center gap-2.5 px-2.5 py-2 rounded-lg"
            >
              {/* Avatar with status dot */}
              <div className="relative flex-shrink-0">
                <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-bold text-gray-600">
                  {friend.initials}
                </div>
                <span
                  className={[
                    'absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-white',
                    friend.status === 'in-room' ? 'bg-green-500' :
                    friend.status === 'playing' ? 'bg-yellow-500' :
                    'bg-gray-300',
                  ].join(' ')}
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">{friend.name}</p>
                <p className="text-[11px] text-gray-400 truncate">
                  {friend.status === 'in-room' && friend.roomName
                    ? `In ${friend.roomName}`
                    : friend.status === 'playing' && friend.game
                    ? `Playing ${friend.game}`
                    : 'Online'}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </aside>
  )
}
