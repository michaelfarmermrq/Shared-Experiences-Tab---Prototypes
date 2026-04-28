/**
 * Greyscale wireframe primitives used by the storyboard panels.
 * Everything is intentionally low-fidelity: no brand colour, no real imagery,
 * just shapes that communicate spatial layout.
 */
import type { ReactNode } from 'react'

/** Thin abstracted top header, present on every panel for context. */
export function HeaderStub() {
  return (
    <div className="h-12 bg-white border-b border-gray-200 flex items-center px-4 gap-3">
      <div className="w-16 h-3 rounded bg-gray-200" />
      <div className="flex gap-1.5 ml-4">
        {['Casino', 'Live', 'Slots', 'Shared'].map((label, i) => (
          <div
            key={label}
            className={[
              'h-5 px-2 rounded text-[9px] font-semibold flex items-center',
              i === 3
                ? 'bg-gray-800 text-white'
                : 'bg-gray-100 text-gray-500',
            ].join(' ')}
          >
            {label}
          </div>
        ))}
      </div>
      <div className="ml-auto flex items-center gap-2">
        <div className="w-12 h-4 rounded bg-gray-100" />
        <div className="w-6 h-6 rounded-full bg-gray-300" />
      </div>
    </div>
  )
}

/** Greyscale avatar circle with initials. */
export function Avatar({ initials, size = 24 }: { initials: string; size?: number }) {
  return (
    <div
      className="rounded-full bg-gray-300 flex items-center justify-center text-gray-700 font-semibold flex-shrink-0"
      style={{ width: size, height: size, fontSize: size * 0.4 }}
    >
      {initials}
    </div>
  )
}

/** Stack of avatars (overlapping). */
export function AvatarStack({
  initials,
  overflow,
  size = 22,
}: {
  initials: string[]
  overflow?: number
  size?: number
}) {
  return (
    <div className="flex items-center">
      {initials.map((i, idx) => (
        <div
          key={idx}
          className="rounded-full bg-gray-300 flex items-center justify-center text-gray-700 font-semibold border-2 border-white -ml-1 first:ml-0"
          style={{ width: size, height: size, fontSize: size * 0.4 }}
        >
          {i}
        </div>
      ))}
      {overflow ? (
        <div
          className="rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-semibold border-2 border-white -ml-1"
          style={{ width: size, height: size, fontSize: size * 0.35 }}
        >
          +{overflow}
        </div>
      ) : null}
    </div>
  )
}

/**
 * A single greyscale room card — used in the lobby.
 * `highlight` outlines the card to indicate the focal point of the panel.
 */
export function RoomCardStub({
  title,
  meta,
  initials,
  overflow,
  highlight,
}: {
  title: string
  meta: string
  initials: string[]
  overflow?: number
  highlight?: boolean
}) {
  return (
    <div
      className={[
        'rounded-lg overflow-hidden bg-white',
        highlight ? 'ring-2 ring-gray-700' : 'border border-gray-200',
      ].join(' ')}
    >
      <div className="h-24 bg-gray-200 relative flex items-end p-2">
        <div className="text-[8px] font-bold tracking-wider text-gray-500 bg-white/80 rounded px-1">
          LIVE
        </div>
      </div>
      <div className="p-2.5 space-y-1.5">
        <div className="text-[11px] font-semibold text-gray-800 truncate">{title}</div>
        <div className="text-[9px] text-gray-400">{meta}</div>
        <div className="flex items-center justify-between pt-0.5">
          <AvatarStack initials={initials} overflow={overflow} size={18} />
          <div className="text-[9px] text-gray-500 font-semibold">Join →</div>
        </div>
      </div>
    </div>
  )
}

/** A chat message line in the room sidebar. */
export function ChatLine({
  initials,
  message,
  highlight,
}: {
  initials: string
  message: string
  highlight?: boolean
}) {
  return (
    <div
      className={[
        'flex gap-1.5 items-start py-1 px-1.5 rounded',
        highlight ? 'bg-gray-100' : '',
      ].join(' ')}
    >
      <Avatar initials={initials} size={18} />
      <div className="flex-1 min-w-0">
        <div className="text-[9px] font-semibold text-gray-700">{initials}</div>
        <div className="text-[10px] text-gray-600 leading-snug">{message}</div>
      </div>
    </div>
  )
}

/**
 * Three reels representing slot game state.
 * `state`:
 *   idle      — flat grey, "Press play"
 *   playing   — slightly varied tones (active state)
 *   observing — same as playing but with overlay banner
 */
export function SlotReels({ state }: { state: 'idle' | 'playing' | 'observing' }) {
  const tones =
    state === 'idle'
      ? ['bg-gray-100', 'bg-gray-100', 'bg-gray-100']
      : ['bg-gray-200', 'bg-gray-300', 'bg-gray-200']
  return (
    <div className="flex gap-2 justify-center items-center">
      {tones.map((tone, i) => (
        <div
          key={i}
          className={`w-16 h-20 rounded ${tone} border border-gray-300 flex items-center justify-center text-gray-400 text-2xl`}
        >
          ?
        </div>
      ))}
    </div>
  )
}

/** Generic labelled placeholder block. */
export function Block({
  label,
  className,
  children,
}: {
  label?: string
  className?: string
  children?: ReactNode
}) {
  return (
    <div
      className={[
        'bg-gray-100 border border-gray-200 rounded flex items-center justify-center text-[10px] text-gray-500 font-medium',
        className ?? '',
      ].join(' ')}
    >
      {children ?? label}
    </div>
  )
}

/** Thin section title used inside wireframes (e.g. "Happening now"). */
export function WireSectionTitle({ children }: { children: ReactNode }) {
  return (
    <div className="text-[11px] font-bold text-gray-700 mb-2 tracking-wide">{children}</div>
  )
}
