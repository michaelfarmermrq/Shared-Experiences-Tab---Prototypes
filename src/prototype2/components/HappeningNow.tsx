import { useNavigate } from 'react-router-dom'
import { GlobeAltIcon } from '@heroicons/react/24/outline'
import type { Room } from '../data/mockData'

interface Props {
  rooms: Room[]
}

export default function HappeningNow({ rooms }: Props) {
  const navigate = useNavigate()

  if (rooms.length === 0) return null

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-gray-900">Happening Now</h2>
        <div className="flex items-center gap-1.5 text-xs text-gray-400">
          <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
          {rooms.reduce((acc, r) => acc + r.players.length, 0)} players live
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {rooms.map((room) => (
          <div
            key={room.id}
            onClick={() => navigate(`/prototype/2/room/${room.id}`)}
            className="bg-white rounded-2xl overflow-hidden border border-gray-200 cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:shadow-lg group"
          >
            {/* Large thumbnail */}
            <div className="h-44 bg-gradient-to-br from-gray-200 to-gray-300 relative">
              {/* Large charm icon */}
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-6xl opacity-20 group-hover:opacity-30 transition-opacity">
                  {room.luckyCharm}
                </span>
              </div>

              {/* LIVE badge */}
              <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-red-500 rounded-full px-2.5 py-1">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                <span className="text-[10px] font-bold text-white tracking-wide">LIVE</span>
              </div>

              {/* Player count */}
              <div className="absolute top-3 right-3 flex items-center gap-1 bg-black/50 rounded-full px-2.5 py-1">
                <GlobeAltIcon className="w-3.5 h-3.5 text-white" />
                <span className="text-[11px] text-white font-semibold">
                  {room.players.length}/{room.maxPlayers}
                </span>
              </div>

              {/* Bottom gradient overlay with room info */}
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/70 to-transparent pt-10 pb-3 px-4">
                <p className="text-white font-bold text-base">{room.name}</p>
                <p className="text-white/70 text-xs">🎰 {room.game} · Hosted by {room.host}</p>
              </div>
            </div>

            {/* Bottom: players + join */}
            <div className="px-4 py-3 flex items-center justify-between">
              {/* Player avatars */}
              <div className="flex items-center">
                {room.players.slice(0, 5).map((p, i) => (
                  <div
                    key={p.name}
                    className="w-7 h-7 rounded-full bg-[#0A2ECB] flex items-center justify-center text-[10px] font-bold text-white border-2 border-white"
                    style={{ marginLeft: i > 0 ? -6 : 0 }}
                  >
                    {p.initials}
                  </div>
                ))}
                {room.players.length > 5 && (
                  <div
                    className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center text-[9px] font-bold text-gray-500 border-2 border-white"
                    style={{ marginLeft: -6 }}
                  >
                    +{room.players.length - 5}
                  </div>
                )}
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation()
                  navigate(`/prototype/2/room/${room.id}`)
                }}
                className="bg-[#0A2ECB] text-white text-xs font-bold px-4 py-2 rounded-lg hover:bg-[#0825a8] transition-colors"
              >
                Join Room
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
