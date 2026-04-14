import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { mockRooms, mockChatMessages, mockActivity, defaultRoomSettings } from '../data/mockData'
import type { Player, RoomSettings } from '../data/mockData'
import RoomSidebar from './RoomSidebar'
import GameView from './GameView'
import ActivityFeed from './ActivityFeed'
import SettingsDrawer from './SettingsDrawer'

interface Props {
  topOffset: number
}

export default function RoomInterior({ topOffset }: Props) {
  const { id } = useParams<{ id: string }>()

  const room = mockRooms.find(r => r.id === id) ?? mockRooms[0]

  const [playing, setPlaying] = useState(false)
  const [observingPlayer, setObservingPlayer] = useState<Player | null>(null)
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [roomSettings, setRoomSettings] = useState<RoomSettings>(() => defaultRoomSettings(room))

  function handleObserve(player: Player) {
    // Clicking the active observer toggles it off
    setObservingPlayer(prev => (prev?.name === player.name ? null : player))
  }

  function handleStopObserving() {
    setObservingPlayer(null)
  }

  function handlePlay() {
    setPlaying(true)
    setObservingPlayer(null) // stop observing if we start playing
  }

  function handleStopPlaying() {
    setPlaying(false)
  }

  const vibeClass =
    roomSettings.vibe === 'neon'    ? 'vibe-neon'    :
    roomSettings.vibe === 'classic' ? 'vibe-classic' :
    roomSettings.vibe === 'lucky'   ? 'vibe-lucky'   : ''

  const containerHeight = `calc(100vh - ${topOffset}px)`

  return (
    <div
      className={`flex overflow-hidden ${vibeClass}`}
      style={{ height: containerHeight, marginTop: topOffset }}
    >
      {/* Sidebar */}
      <RoomSidebar
        roomName={room.name}
        players={room.players}
        messages={mockChatMessages}
        settings={roomSettings}
        playing={playing}
        observingPlayer={observingPlayer?.name ?? null}
        onObserve={handleObserve}
        onSettingsOpen={() => setSettingsOpen(true)}
      />

      {/* Main area */}
      <div className="room-main flex-1 overflow-y-auto bg-gray-100 p-5 space-y-5">
        <GameView
          game={room.game}
          playing={playing}
          onPlay={handlePlay}
          onStopPlaying={handleStopPlaying}
          observingPlayer={observingPlayer?.name ?? null}
          observingGame={observingPlayer?.game ?? null}
          onStopObserving={handleStopObserving}
        />
        <ActivityFeed events={mockActivity} />
      </div>

      {/* Settings drawer */}
      {settingsOpen && (
        <SettingsDrawer
          settings={roomSettings}
          onSave={(updated) => setRoomSettings(updated)}
          onClose={() => setSettingsOpen(false)}
        />
      )}
    </div>
  )
}
