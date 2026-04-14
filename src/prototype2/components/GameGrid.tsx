import { availableGames, mockRooms } from '../data/mockData'

// Count how many rooms are active per game (from mock data)
function getRoomCount(game: string): number {
  return mockRooms.filter(r => r.game === game).length
}

export default function GameGrid() {
  return (
    <div>
      <h2 className="text-lg font-bold text-gray-900 mb-4">Games</h2>
      <div className="grid grid-cols-3 gap-3">
        {availableGames.map((game) => {
          const roomCount = getRoomCount(game)
          return (
            <div
              key={game}
              className="bg-white rounded-xl border border-gray-200 overflow-hidden cursor-pointer transition-all duration-150 hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="h-24 bg-gray-200 relative">
                {roomCount > 0 && (
                  <div className="absolute top-2 right-2 flex items-center gap-1 bg-black/60 rounded-full px-2 py-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                    <span className="text-[10px] font-bold text-white">
                      {roomCount} {roomCount === 1 ? 'room' : 'rooms'}
                    </span>
                  </div>
                )}
              </div>
              <div className="px-3 py-2.5">
                <p className="text-sm font-semibold text-gray-900">{game}</p>
                {roomCount > 0 ? (
                  <p className="text-[11px] text-green-600 font-medium">
                    {roomCount} active {roomCount === 1 ? 'room' : 'rooms'}
                  </p>
                ) : (
                  <p className="text-[11px] text-gray-400">No rooms yet</p>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
