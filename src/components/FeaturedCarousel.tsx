const featuredGames = [
  'Crash',
  'Buffalo Bills Roulette',
  'Goosicorn Racing',
]

export default function FeaturedCarousel() {
  return (
    <div className="bg-white pt-4 pb-5">
      <div className="flex gap-3 overflow-x-auto scrollbar-hide px-5 pb-1">
        {featuredGames.map((name) => (
          <div
            key={name}
            className="flex-shrink-0 w-72 h-44 rounded-2xl bg-gray-300 cursor-pointer flex items-end p-4 transition-transform duration-150 hover:-translate-y-1 hover:shadow-lg"
          >
            <span className="text-sm font-semibold text-gray-500">{name}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
