import { XMarkIcon, PlayIcon } from '@heroicons/react/24/outline'

interface Props {
  game: string
  playing: boolean
  onPlay: () => void
  onStopPlaying: () => void
  observingPlayer: string | null
  observingGame: string | null
  onStopObserving: () => void
}

const SYMBOLS = ['🍒', '💎', '7️⃣', '🎰', '⭐', '🔔', '🍋', '🎯']

function SlotColumn({ offset }: { offset: number }) {
  return (
    <div
      className="flex flex-col gap-2 animate-[slotSpin_1.2s_linear_infinite]"
      style={{ animationDelay: `${offset}ms` }}
    >
      {[...SYMBOLS, ...SYMBOLS].map((s, i) => (
        <div key={i} className="text-3xl leading-none select-none">{s}</div>
      ))}
    </div>
  )
}

export default function GameView({
  game,
  playing,
  onPlay,
  onStopPlaying,
  observingPlayer,
  observingGame,
  onStopObserving,
}: Props) {
  const isObserving = observingPlayer !== null

  // ── Idle state ────────────────────────────────────────────────
  if (!playing && !isObserving) {
    return (
      <div className="relative rounded-xl overflow-hidden bg-gray-800 h-72 flex-shrink-0 flex flex-col items-center justify-center gap-4">
        {/* Faint background reels */}
        <div className="absolute inset-0 flex items-center justify-center gap-8 opacity-10 pointer-events-none">
          <SlotColumn offset={0} />
          <SlotColumn offset={180} />
          <SlotColumn offset={360} />
        </div>

        {/* Game title */}
        <div className="relative text-center px-6">
          <p className="text-white/50 text-xs font-semibold uppercase tracking-widest mb-1">Now in this room</p>
          <p className="text-white text-xl font-bold mb-1">{game}</p>
          <p className="text-white/40 text-xs">Ready when you are</p>
        </div>

        {/* Play button */}
        <button
          onClick={onPlay}
          className="relative flex items-center gap-2 bg-white text-gray-900 font-bold text-sm px-6 py-3 rounded-full hover:bg-gray-100 transition-colors shadow-lg"
        >
          <PlayIcon className="w-4 h-4" />
          Play Now
        </button>
      </div>
    )
  }

  // ── Active (playing or observing) ─────────────────────────────
  return (
    <div className="relative rounded-xl overflow-hidden bg-gray-800 h-72 flex-shrink-0">

      {/* Animated slot reels */}
      <div className="absolute inset-0 flex items-center justify-center gap-8 opacity-30">
        <SlotColumn offset={0} />
        <SlotColumn offset={180} />
        <SlotColumn offset={360} />
      </div>

      {/* Dark overlay when observing */}
      {isObserving && (
        <div className="absolute inset-0 bg-black/55" />
      )}

      {/* LIVE badge */}
      <div className="absolute top-3 right-3 flex items-center gap-1.5 bg-black/60 rounded-full px-2.5 py-1">
        <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
        <span className="text-xs font-bold text-white tracking-wider">LIVE</span>
      </div>

      {/* Stop watching / Stop playing button */}
      {isObserving ? (
        <button
          onClick={onStopObserving}
          className="absolute top-3 left-3 flex items-center gap-1 bg-black/60 rounded-full px-2.5 py-1 text-white text-xs font-medium hover:bg-black/80 transition-colors"
        >
          <XMarkIcon className="w-3 h-3" />
          Stop watching
        </button>
      ) : (
        <button
          onClick={onStopPlaying}
          className="absolute top-3 left-3 flex items-center gap-1 bg-black/60 rounded-full px-2.5 py-1 text-white text-xs font-medium hover:bg-black/80 transition-colors"
        >
          <XMarkIcon className="w-3 h-3" />
          Stop playing
        </button>
      )}

      {/* Centre: observing label */}
      {isObserving && (
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
          <div className="text-2xl mb-2">👁</div>
          <p className="text-sm font-bold">Watching {observingPlayer}</p>
          <p className="text-xs text-white/70 mt-0.5">{observingGame}</p>
        </div>
      )}

      {/* Bottom: game title */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent px-4 pb-3 pt-8">
        <p className="text-white text-sm font-bold">
          {isObserving ? observingGame : game}
        </p>
        <p className="text-white/60 text-xs">
          {isObserving ? `Watching ${observingPlayer}` : 'Your game · Playing'}
        </p>
      </div>
    </div>
  )
}
