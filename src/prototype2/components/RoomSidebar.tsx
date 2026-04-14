import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeftIcon, Cog6ToothIcon, PaperAirplaneIcon, EyeIcon } from '@heroicons/react/24/outline'
import type { Player, ChatMessage, RoomSettings } from '../data/mockData'

interface Props {
  roomName: string
  players: Player[]
  messages: ChatMessage[]
  settings: RoomSettings
  playing: boolean
  observingPlayer: string | null
  onObserve: (player: Player) => void
  onSettingsOpen: () => void
}

export default function RoomSidebar({
  roomName,
  players,
  messages,
  settings,
  playing,
  observingPlayer,
  onObserve,
  onSettingsOpen,
}: Props) {
  const navigate = useNavigate()
  const [input, setInput] = useState('')
  const [localMessages, setLocalMessages] = useState(messages)

  function handleSend() {
    if (!input.trim()) return
    setLocalMessages(prev => [...prev, {
      id: String(Date.now()),
      player: 'You',
      initials: 'Y',
      text: input.trim(),
      time: 'just now',
    }])
    setInput('')
  }

  const accentColor = settings.accentColor

  return (
    <div className="room-sidebar w-[280px] flex-shrink-0 flex flex-col border-r border-gray-200 bg-gray-50 h-full">

      {/* Header: back + room name */}
      <div className="px-4 py-3 border-b border-gray-200 flex items-center gap-2.5 flex-shrink-0">
        <button
          onClick={() => navigate('/prototype/2')}
          className="text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Back to lobby"
        >
          <ArrowLeftIcon className="w-4 h-4" />
        </button>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-bold text-gray-900 truncate">
            {settings.luckyCharm} {settings.name}
          </p>
          <p className="text-[11px] text-gray-400">{players.length + 1} playing</p>
        </div>
      </div>

      {/* Members */}
      <div className="px-4 py-3 border-b border-gray-200 flex-shrink-0">
        <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">
          Members — {players.length}
        </p>
        <div className="space-y-2">
          {/* You */}
          <div className="flex items-center gap-2.5">
            <div className="relative flex-shrink-0">
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-bold text-white"
                style={{ backgroundColor: accentColor }}
              >
                Y
              </div>
              {playing && (
                <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-green-500 border-2 border-gray-50" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-gray-800">You</p>
              <p className="text-[10px] text-gray-400 truncate">
                {playing ? `Playing · ${players[0]?.game ?? ''}` : 'Not playing yet'}
              </p>
            </div>
            <span className="text-xs font-bold text-green-600 flex-shrink-0">+£0.00</span>
            <div className="w-3.5 h-3.5 flex-shrink-0" />{/* spacer to align with eye icons */}
          </div>

          {players.map((player) => (
            <div key={player.name} className="flex items-center gap-2.5">
              {/* Avatar */}
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-bold text-white flex-shrink-0"
                style={{ backgroundColor: accentColor }}
              >
                {player.initials}
              </div>

              {/* Name */}
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-gray-800 truncate">{player.name}</p>
                <p className="text-[10px] text-gray-400 truncate">{player.game}</p>
              </div>

              {/* Net winnings */}
              <span className={[
                'text-xs font-bold flex-shrink-0',
                player.netWinnings >= 0 ? 'text-green-600' : 'text-red-500',
              ].join(' ')}>
                {player.netWinnings >= 0 ? '+' : '−'}£{Math.abs(player.netWinnings).toFixed(2)}
              </span>

              {/* Watch button */}
              <button
                onClick={() => onObserve(player)}
                className={[
                  'flex-shrink-0 transition-colors',
                  observingPlayer === player.name ? 'text-blue-600' : 'text-gray-300 hover:text-gray-500',
                ].join(' ')}
                aria-label={`Watch ${player.name}`}
              >
                <EyeIcon className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Chat — flex-1, scrollable */}
      <div className="flex-1 flex flex-col min-h-0">
        <p className="px-4 pt-3 text-[10px] font-bold uppercase tracking-widest text-gray-400 flex-shrink-0">
          Chat
        </p>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-2 space-y-2.5 scrollbar-hide">
          {localMessages.map((msg) => (
            <div key={msg.id} className="flex gap-2 items-start">
              <div
                className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold text-white flex-shrink-0 mt-0.5"
                style={{ backgroundColor: msg.player === 'You' ? accentColor : '#9ca3af' }}
              >
                {msg.initials}
              </div>
              <div>
                <p className="text-[11px] font-semibold text-gray-500">
                  {msg.player} <span className="font-normal text-gray-400">{msg.time}</span>
                </p>
                <p className="text-xs text-gray-800 leading-relaxed">{msg.text}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Input */}
        <div className="px-3 py-2.5 border-t border-gray-200 flex gap-2 items-center flex-shrink-0">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Message the room..."
            className="flex-1 text-xs bg-white border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#0A2ECB]/30 focus:border-[#0A2ECB] placeholder-gray-400"
          />
          <button
            onClick={handleSend}
            className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 hover:opacity-80 transition-opacity"
            style={{ backgroundColor: accentColor }}
          >
            <PaperAirplaneIcon className="w-3.5 h-3.5 text-white" />
          </button>
        </div>
      </div>

      {/* Footer: settings */}
      <div className="px-4 py-3 border-t border-gray-200 flex-shrink-0">
        <button
          onClick={onSettingsOpen}
          className="flex items-center gap-2 text-xs font-semibold text-gray-500 hover:text-gray-800 transition-colors w-full"
        >
          <Cog6ToothIcon className="w-4 h-4" />
          Room Settings
        </button>
      </div>
    </div>
  )
}
