import { useState } from 'react'
import { XMarkIcon, PlusIcon } from '@heroicons/react/24/outline'
import type { RoomSettings } from '../data/mockData'
import { availableGames } from '../data/mockData'

interface Props {
  settings: RoomSettings
  onSave: (updated: RoomSettings) => void
  onClose: () => void
}

const ACCENT_COLORS = [
  { label: 'MrQ Blue',  value: '#0A2ECB' },
  { label: 'Purple',    value: '#7C3AED' },
  { label: 'Green',     value: '#059669' },
  { label: 'Orange',    value: '#EA580C' },
  { label: 'Red',       value: '#DC2626' },
  { label: 'Teal',      value: '#0891B2' },
]

const VIBES = [
  { id: 'default',  label: '🎲 Default' },
  { id: 'classic',  label: '🎰 Classic Casino' },
  { id: 'neon',     label: '🌙 Neon Night' },
  { id: 'lucky',    label: '🍀 Lucky Green' },
] as const

const LUCKY_CHARMS = ['🍀', '🎰', '🐉', '💎', '🔔', '⭐', '🦄', '🏆']

export default function SettingsDrawer({ settings, onSave, onClose }: Props) {
  const [local, setLocal] = useState<RoomSettings>({ ...settings })

  function update<K extends keyof RoomSettings>(key: K, value: RoomSettings[K]) {
    setLocal(prev => ({ ...prev, [key]: value }))
  }

  function removeGame(game: string) {
    update('playlist', local.playlist.filter(g => g !== game))
  }

  function addGame(game: string) {
    if (!local.playlist.includes(game)) {
      update('playlist', [...local.playlist, game])
    }
  }

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/20 z-[140]"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="fixed top-0 right-0 h-full w-80 bg-white shadow-2xl z-[150] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 flex-shrink-0">
          <h2 className="text-sm font-bold text-gray-900">Room Settings</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <XMarkIcon className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-6 scrollbar-hide">

          {/* Room Name */}
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1.5">
              Room Name
            </label>
            <input
              value={local.name}
              onChange={e => update('name', e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-[#0A2ECB]"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1.5">
              Description
            </label>
            <textarea
              rows={2}
              value={local.description}
              onChange={e => update('description', e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-[#0A2ECB]"
            />
          </div>

          {/* Accent Colour */}
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">
              Accent Colour
            </label>
            <div className="flex gap-2 flex-wrap">
              {ACCENT_COLORS.map(c => (
                <button
                  key={c.value}
                  onClick={() => update('accentColor', c.value)}
                  title={c.label}
                  className={[
                    'w-8 h-8 rounded-full transition-transform hover:scale-110',
                    local.accentColor === c.value ? 'ring-2 ring-offset-2 ring-gray-400 scale-110' : '',
                  ].join(' ')}
                  style={{ backgroundColor: c.value }}
                />
              ))}
            </div>
          </div>

          {/* Vibe Preset */}
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">
              Vibe
            </label>
            <div className="grid grid-cols-2 gap-2">
              {VIBES.map(v => (
                <button
                  key={v.id}
                  onClick={() => update('vibe', v.id)}
                  className={[
                    'py-2 px-3 rounded-lg text-xs font-semibold border text-left transition-colors',
                    local.vibe === v.id
                      ? 'border-[#0A2ECB] bg-blue-50 text-[#0A2ECB]'
                      : 'border-gray-200 text-gray-600 hover:border-gray-300',
                  ].join(' ')}
                >
                  {v.label}
                </button>
              ))}
            </div>
          </div>

          {/* Welcome Message */}
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1.5">
              Welcome Message
            </label>
            <input
              value={local.welcomeMessage}
              onChange={e => update('welcomeMessage', e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-[#0A2ECB]"
            />
          </div>

          {/* Lucky Charm */}
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">
              Lucky Charm
            </label>
            <div className="grid grid-cols-4 gap-2">
              {LUCKY_CHARMS.map(charm => (
                <button
                  key={charm}
                  onClick={() => update('luckyCharm', charm)}
                  className={[
                    'aspect-square rounded-lg text-xl flex items-center justify-center border transition-all hover:scale-105',
                    local.luckyCharm === charm
                      ? 'border-[#0A2ECB] bg-blue-50 ring-2 ring-[#0A2ECB]/20'
                      : 'border-gray-200 hover:border-gray-300',
                  ].join(' ')}
                >
                  {charm}
                </button>
              ))}
            </div>
          </div>

          {/* Game Playlist */}
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">
              Game Playlist
            </label>
            <div className="space-y-1.5 mb-2">
              {local.playlist.map((game, i) => (
                <div key={game} className="flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-2">
                  <span className="text-xs text-gray-400 w-4 flex-shrink-0">{i + 1}.</span>
                  <span className="text-xs text-gray-800 flex-1 truncate">{game}</span>
                  <button
                    onClick={() => removeGame(game)}
                    className="text-gray-300 hover:text-red-400 transition-colors flex-shrink-0"
                  >
                    <XMarkIcon className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>

            {/* Add game */}
            <select
              onChange={e => { if (e.target.value) { addGame(e.target.value); e.target.value = '' } }}
              defaultValue=""
              className="w-full border border-dashed border-gray-300 rounded-lg px-3 py-2 text-xs text-gray-500 bg-white focus:outline-none hover:border-gray-400 transition-colors"
            >
              <option value="" disabled>
                + Add a game…
              </option>
              {availableGames.filter(g => !local.playlist.includes(g)).map(g => (
                <option key={g} value={g}>{g}</option>
              ))}
            </select>
          </div>

        </div>

        {/* Save */}
        <div className="px-5 py-4 border-t border-gray-100 flex-shrink-0">
          <button
            onClick={() => { onSave(local); onClose() }}
            className="w-full py-2.5 rounded-lg text-sm font-bold text-white transition-colors hover:opacity-90"
            style={{ backgroundColor: local.accentColor }}
          >
            Save Changes
          </button>
        </div>
      </div>
    </>
  )
}
