import type { GameCategory } from '../data/games'
import GameTile from './GameTile'

interface Props {
  category: GameCategory
}

export default function GameRow({ category }: Props) {
  return (
    <section className="bg-white mb-2 pt-5 pb-5">
      <div className="flex items-baseline justify-between px-5 mb-3.5">
        <h2 className="text-[15px] font-bold text-gray-900 tracking-tight">{category.title}</h2>
        <button className="text-[13px] font-semibold text-[#0A2ECB] hover:opacity-70 transition-opacity">
          See all
        </button>
      </div>
      <div className="flex gap-2.5 overflow-x-auto scrollbar-hide px-5 pb-1">
        {category.games.map((game) => (
          <GameTile key={game.id} />
        ))}
      </div>
    </section>
  )
}
