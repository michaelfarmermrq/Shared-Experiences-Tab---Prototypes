/**
 * Greyscale wireframe primitives used by the storyboard panels.
 * Everything is intentionally low-fidelity: no brand colour, no real imagery,
 * just shapes that communicate spatial layout.
 */
import type { ReactNode } from 'react'

type NavItem = { label: string; active?: boolean }

const DEFAULT_NAV: NavItem[] = [
  { label: 'Casino' },
  { label: 'Live' },
  { label: 'Slots' },
  { label: 'Shared', active: true },
]

/**
 * Thin abstracted top header, present on every panel for context.
 * Accepts a custom nav so different prototype directions (Rooms, Streaming)
 * can share the same header look with their own tabs.
 */
export function HeaderStub({
  nav = DEFAULT_NAV,
  dark = false,
}: {
  nav?: NavItem[]
  dark?: boolean
}) {
  const bg = dark ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'
  const logo = dark ? 'bg-gray-700' : 'bg-gray-200'
  const inactive = dark
    ? 'bg-gray-800 text-gray-400'
    : 'bg-gray-100 text-gray-500'
  const active = dark ? 'bg-white text-gray-900' : 'bg-gray-800 text-white'
  const balance = dark ? 'bg-gray-800' : 'bg-gray-100'
  const avatar = dark ? 'bg-gray-600' : 'bg-gray-300'
  return (
    <div
      className={`h-12 ${bg} border-b flex items-center px-4 gap-3`}
    >
      <div className={`w-16 h-3 rounded ${logo}`} />
      <div className="flex gap-1.5 ml-4">
        {nav.map(({ label, active: isActive }) => (
          <div
            key={label}
            className={[
              'h-5 px-2 rounded text-[9px] font-semibold flex items-center',
              isActive ? active : inactive,
            ].join(' ')}
          >
            {label}
          </div>
        ))}
      </div>
      <div className="ml-auto flex items-center gap-2">
        <div className={`w-12 h-4 rounded ${balance}`} />
        <div className={`w-6 h-6 rounded-full ${avatar}`} />
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

/**
 * Stream card for the streaming lobby — Twitch-ish.
 * Thumbnail tile (representing the streamer's cam) with LIVE + viewer count
 * top-left, REC top-right, and a name/category strip at the bottom.
 */
export function StreamCardStub({
  title,
  streamer,
  category,
  viewers,
  initials,
  highlight,
  dark = true,
}: {
  title: string
  streamer: string
  category: string
  viewers: string
  initials: string
  highlight?: boolean
  dark?: boolean
}) {
  const cardBg = dark ? 'bg-gray-800' : 'bg-white'
  const thumbBg = dark ? 'bg-gray-700' : 'bg-gray-200'
  const titleColor = dark ? 'text-gray-100' : 'text-gray-800'
  const metaColor = dark ? 'text-gray-400' : 'text-gray-500'
  const ringColor = dark ? 'ring-gray-300' : 'ring-gray-700'
  return (
    <div
      className={[
        'rounded-md overflow-hidden',
        cardBg,
        highlight ? `ring-2 ${ringColor}` : '',
      ].join(' ')}
    >
      <div className={`relative aspect-[16/10] ${thumbBg}`}>
        {/* LIVE + viewer count */}
        <div className="absolute top-1.5 left-1.5 flex items-center gap-1">
          <div className="text-[8px] font-bold tracking-wider text-white bg-red-700 rounded px-1 py-px">
            LIVE
          </div>
          <div className="text-[8px] font-semibold text-white bg-black/50 rounded px-1 py-px">
            {viewers}
          </div>
        </div>
        {/* REC indicator */}
        <div className="absolute top-1.5 right-1.5 text-[8px] font-bold tracking-wider text-white/70">
          • REC
        </div>
        {/* Streamer cam silhouette in centre */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className={`w-10 h-10 rounded-full ${dark ? 'bg-gray-600' : 'bg-gray-300'}`} />
        </div>
      </div>
      <div className="px-2 py-1.5 flex items-center gap-2">
        <Avatar initials={initials} size={18} />
        <div className="flex-1 min-w-0">
          <div className={`text-[10px] font-semibold ${titleColor} truncate`}>
            {streamer}
          </div>
          <div className={`text-[9px] ${metaColor} truncate`}>{category}</div>
        </div>
      </div>
      <div className={`px-2 pb-1.5 text-[10px] font-semibold ${titleColor} truncate`}>
        {title}
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
