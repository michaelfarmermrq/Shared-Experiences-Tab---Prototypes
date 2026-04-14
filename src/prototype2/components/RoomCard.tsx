import { useNavigate } from 'react-router-dom'
import { GlobeAltIcon, LockClosedIcon } from '@heroicons/react/24/outline'
import type { Room } from '../data/mockData'

interface Props {
  room: Room
}

export default function RoomCard({ room }: Props) {
  const navigate = useNavigate()
  const visiblePlayers = room.players.slice(0, 4)
  const overflow = room.players.length - 4

  function handleJoin() {
    navigate(`/prototype/2/room/${room.id}`)
  }

  return (
    <div
      className="flex-shrink-0 w-[260px] rounded-xl overflow-hidden border border-gray-200 cursor-pointer transition-all duration-150 hover:-translate-y-1 hover:shadow-md"
      onClick={handleJoin}
    >
      {/* Top: game thumbnail placeholder */}
      <div className="h-32 bg-gray-300 relative">
        {/* LIVE badge */}
        <div className="absolute top-2.5 right-2.5 flex items-center gap-1 bg-black/60 rounded-full px-2 py-0.5">
          <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
          <span className="text-[10px] font-bold text-white tracking-wide">LIVE</span>
        </div>

        {/* Bottom-left: room icon */}
        <div className="absolute bottom-2 left-2.5 text-xl">
          {room.luckyCharm}
        </div>

        {/* Bottom-right: visibility + player count */}
        <div className="absolute bottom-2 right-2.5 flex items-center gap-1 bg-black/60 rounded-full px-2 py-0.5">
          {room.isPublic
            ? <GlobeAltIcon className="w-3 h-3 text-white" />
            : <LockClosedIcon className="w-3 h-3 text-white" />
          }
          <span className="text-[10px] text-white font-medium">
            {room.players.length}/{room.maxPlayers}
          </span>
        </div>
      </div>

      {/* Bottom: room info */}
      <div className="bg-white px-3 py-2.5">
        <p className="text-sm font-bold text-gray-900 truncate">{room.name}</p>
        <p className="text-xs text-gray-400 mb-2">🎰 {room.game}</p>

        <div className="flex items-center justify-between">
          {/* Player avatars */}
          <div className="flex items-center gap-0.5">
            {visiblePlayers.map((p) => (
              <div
                key={p.name}
                className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-[10px] font-bold text-gray-600 border-2 border-white -ml-1 first:ml-0"
              >
                {p.initials}
              </div>
            ))}
            {overflow > 0 && (
              <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-[9px] font-bold text-gray-500 border-2 border-white -ml-1">
                +{overflow}
              </div>
            )}
          </div>

          {/* Join button */}
          <button
            className="text-xs font-semibold text-[#0A2ECB] hover:opacity-70 transition-opacity"
            onClick={(e) => { e.stopPropagation(); handleJoin() }}
          >
            Join →
          </button>
        </div>
      </div>
    </div>
  )
}
