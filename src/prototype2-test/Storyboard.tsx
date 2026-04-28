import { useState, type ReactNode } from 'react'
import { ChevronRightIcon } from '@heroicons/react/24/outline'
import Panel from './Panel'
import {
  HeaderStub,
  Avatar,
  AvatarStack,
  RoomCardStub,
  ChatLine,
  SlotReels,
  Block,
  WireSectionTitle,
} from './parts'

interface Props {
  topOffset: number
}

/**
 * Storyboard for user research. Two flows — public (interest-based rooms with
 * strangers) and private (friends-only rooms) — rendered as static greyscale
 * wireframes. Nothing clickable; intended to be walked through by a researcher.
 */
export default function Storyboard({ topOffset }: Props) {
  const [showCaptions, setShowCaptions] = useState(true)

  return (
    <div className="bg-gray-50 min-h-screen" style={{ paddingTop: topOffset }}>
      <div className="max-w-5xl mx-auto px-6 py-10 space-y-12">
        {/* Page intro */}
        <header className="flex items-start justify-between gap-6">
          <div className="space-y-2">
            <div className="text-xs font-semibold tracking-widest uppercase text-gray-500">
              Concept testing — Shared Experiences
            </div>
            <h1 className="text-2xl font-bold text-gray-900">
              Rooms — concept storyboards
            </h1>
          </div>

          {/* Caption visibility toggle */}
          <button
            type="button"
            role="switch"
            aria-checked={showCaptions}
            onClick={() => setShowCaptions((v) => !v)}
            className="flex-shrink-0 flex items-center gap-3 px-3 py-2 rounded-md border border-gray-300 bg-white hover:bg-gray-50 transition-colors"
          >
            <span className="text-sm text-gray-700 font-medium">
              Show step descriptions
            </span>
            <span
              className={[
                'relative w-9 h-5 rounded-full transition-colors',
                showCaptions ? 'bg-gray-800' : 'bg-gray-300',
              ].join(' ')}
            >
              <span
                className={[
                  'absolute top-0.5 w-4 h-4 rounded-full bg-white transition-all',
                  showCaptions ? 'left-4' : 'left-0.5',
                ].join(' ')}
              />
            </span>
          </button>
        </header>

        {/* ─── Public storyboard ──────────────────────────────────────── */}
        <FlowAccordion
          title="Flow A · Public rooms"
          subtitle="Strangers cluster around a shared game or theme. Open to anyone."
        >
          {/* 1. Viewing the lobby */}
          <Panel
            index={1}
            total={5}
            showCaption={showCaptions}
            title="Viewing the lobby"
            caption="Sarah opens the Shared tab and sees a list of public Rooms — strangers playing together, organised by game."
          >
            <LobbyWireframe highlightCard={false} />
          </Panel>

          {/* 2. Joining a room */}
          <Panel
            index={2}
            total={5}
            showCaption={showCaptions}
            title="Joining a public room"
            caption="A Book of Dead room with eight strangers catches her eye — she taps in."
          >
            <LobbyWireframe highlightCard={true} />
          </Panel>

          {/* 3. Chatting in the room */}
          <Panel
            index={3}
            total={5}
            showCaption={showCaptions}
            title="Chatting in the room"
            caption="Inside the room, she sees the live chat alongside the game — strangers reacting to each other's spins."
          >
            <RoomWireframe
              members={[
                { name: 'Tom', initials: 'TM' },
                { name: 'Jess', initials: 'JS' },
                { name: 'Mike', initials: 'MK' },
                { name: 'Sarah (you)', initials: 'SA' },
                { name: 'Liam', initials: 'LI' },
                { name: 'Eve', initials: 'EV' },
              ]}
              messages={[
                { initials: 'TM', message: 'big spin coming up lads' },
                { initials: 'JS', message: 'this game is mental' },
                { initials: 'LI', message: 'good luck Sarah!', highlight: true },
              ]}
              gameState="idle"
            />
          </Panel>

          {/* 4. Streaming your own play */}
          <Panel
            index={4}
            total={5}
            showCaption={showCaptions}
            title="Playing live in the room"
            caption="Sarah starts a spin — the room sees her play in real time and reacts in chat."
          >
            <RoomWireframe
              members={[
                { name: 'Tom', initials: 'TM' },
                { name: 'Jess', initials: 'JS' },
                { name: 'Mike', initials: 'MK' },
                { name: 'Sarah (you)', initials: 'SA', playing: true },
                { name: 'Liam', initials: 'LI' },
                { name: 'Eve', initials: 'EV' },
              ]}
              messages={[
                { initials: 'TM', message: 'go on Sarah' },
                { initials: 'JS', message: 'big one big one' },
              ]}
              gameState="playing"
              gameLabel="You're playing — Book of Dead"
            />
          </Panel>

          {/* 5. Watching someone else */}
          <Panel
            index={5}
            total={5}
            showCaption={showCaptions}
            title="Watching someone else play"
            caption="She switches to watch Tom's game — co-presence with strangers around the moments that matter."
          >
            <RoomWireframe
              members={[
                { name: 'Tom', initials: 'TM', watching: true },
                { name: 'Jess', initials: 'JS' },
                { name: 'Mike', initials: 'MK' },
                { name: 'Sarah (you)', initials: 'SA' },
                { name: 'Liam', initials: 'LI' },
                { name: 'Eve', initials: 'EV' },
              ]}
              messages={[
                { initials: 'SA', message: 'come on Tom 🤞' },
                { initials: 'JS', message: 'he never wins lol' },
              ]}
              gameState="observing"
              gameLabel="Watching Tom — Book of Dead"
            />
          </Panel>
        </FlowAccordion>

        {/* ─── Private storyboard ─────────────────────────────────────── */}
        <FlowAccordion
          title="Flow B · Private rooms"
          subtitle="Small groups of friends gambling together. Invite-only."
        >
          {/* 1. Creating a room */}
          <Panel
            index={1}
            total={5}
            showCaption={showCaptions}
            title="Creating a private room"
            caption="Mike sets up a room — names it, picks a game, switches it to private."
          >
            <CreateRoomWireframe />
          </Panel>

          {/* 2. Sharing the link */}
          <Panel
            index={2}
            total={5}
            showCaption={showCaptions}
            title="Sharing with friends"
            caption="The room is live — Mike copies the invite link and sends it to Tom and Jess on WhatsApp."
          >
            <ShareRoomWireframe />
          </Panel>

          {/* 3. Friends join */}
          <Panel
            index={3}
            total={5}
            showCaption={showCaptions}
            title="Friends join the room"
            caption="Tom taps the link in WhatsApp and joins — the room appears in his Rooms list too."
          >
            <JoinPrivateWireframe />
          </Panel>

          {/* 4. Chatting with friends */}
          <Panel
            index={4}
            total={5}
            showCaption={showCaptions}
            title="Chatting with friends"
            caption="The three of them catch up in chat while choosing what to play — friends-only banter."
          >
            <RoomWireframe
              roomLabel="Mike's Room · Private"
              members={[
                { name: 'Mike (you)', initials: 'MK' },
                { name: 'Tom', initials: 'TM' },
                { name: 'Jess', initials: 'JS' },
              ]}
              messages={[
                { initials: 'MK', message: 'lads we live' },
                { initials: 'TM', message: 'first spin let\'s go' },
                { initials: 'JS', message: 'who\'s starting?', highlight: true },
              ]}
              gameState="idle"
            />
          </Panel>

          {/* 5. Watching a friend play */}
          <Panel
            index={5}
            total={5}
            showCaption={showCaptions}
            title="Watching a friend play"
            caption="Mike spins, Tom and Jess watch live — co-presence with people they actually know."
          >
            <RoomWireframe
              roomLabel="Mike's Room · Private"
              members={[
                { name: 'Mike (you)', initials: 'MK', playing: true },
                { name: 'Tom', initials: 'TM', watching: true },
                { name: 'Jess', initials: 'JS', watching: true },
              ]}
              messages={[
                { initials: 'TM', message: 'go onnn' },
                { initials: 'JS', message: 'this is gonna hit' },
              ]}
              gameState="playing"
              gameLabel="Mike is playing — Book of Dead"
            />
          </Panel>
        </FlowAccordion>
      </div>
    </div>
  )
}

/**
 * Collapsible wrapper for a flow. Defaults closed so a researcher can reveal
 * each flow only when ready — prevents the next flow leaking into view as the
 * participant is reacting to the current one.
 */
function FlowAccordion({
  title,
  subtitle,
  children,
}: {
  title: string
  subtitle: string
  children: ReactNode
}) {
  const [open, setOpen] = useState(false)
  return (
    <section>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="w-full flex items-start gap-3 p-3 -mx-3 rounded-md text-left hover:bg-gray-100 transition-colors"
      >
        <ChevronRightIcon
          className={[
            'w-5 h-5 mt-1 text-gray-500 flex-shrink-0 transition-transform duration-200',
            open ? 'rotate-90' : '',
          ].join(' ')}
        />
        <div className="flex-1 space-y-1">
          <h2 className="text-lg font-bold text-gray-900">{title}</h2>
          <p className="text-sm text-gray-600">{subtitle}</p>
        </div>
      </button>
      {open ? <div className="space-y-32 mt-6">{children}</div> : null}
    </section>
  )
}

/* ─── Wireframe layouts ────────────────────────────────────────────── */

/** Lobby with public rooms grid + sidebar. */
function LobbyWireframe({ highlightCard }: { highlightCard: boolean }) {
  return (
    <div className="flex flex-col flex-1 min-h-0">
      <HeaderStub />
      <div className="flex flex-1 min-h-0">
        {/* Sidebar */}
        <aside className="w-44 bg-white border-r border-gray-200 p-3 space-y-3">
          <Block className="h-7 w-full" label="+ Create room" />
          <div>
            <div className="text-[9px] font-bold uppercase tracking-wider text-gray-400 mb-1.5">
              My rooms
            </div>
            <div className="space-y-1">
              <Block className="h-5 w-full" />
              <Block className="h-5 w-full" />
            </div>
          </div>
          <div>
            <div className="text-[9px] font-bold uppercase tracking-wider text-gray-400 mb-1.5">
              Friends
            </div>
            <div className="space-y-1.5">
              {['TM', 'JS', 'MK', 'LI'].map((i) => (
                <div key={i} className="flex items-center gap-1.5">
                  <Avatar initials={i} size={16} />
                  <div className="h-2 flex-1 bg-gray-100 rounded" />
                </div>
              ))}
            </div>
          </div>
        </aside>

        {/* Main */}
        <main className="flex-1 bg-gray-50 p-4 overflow-hidden">
          <WireSectionTitle>Happening now</WireSectionTitle>
          <div className="grid grid-cols-3 gap-3">
            <RoomCardStub
              title="Book of Dead chat"
              meta="Book of Dead · 8/12"
              initials={['JS', 'TM', 'EV', 'LI']}
              overflow={4}
              highlight={highlightCard}
            />
            <RoomCardStub
              title="Slingo Sundays"
              meta="Slingo · 5/8"
              initials={['MK', 'AB', 'CD']}
              overflow={2}
            />
            <RoomCardStub
              title="Big spinners"
              meta="Mega Moolah · 6/10"
              initials={['HG', 'ZK', 'QP']}
              overflow={3}
            />
            <RoomCardStub
              title="Crash chat"
              meta="Aviator · 9/12"
              initials={['MN', 'OP', 'RS']}
              overflow={6}
            />
            <RoomCardStub
              title="Late night spins"
              meta="Starburst · 4/8"
              initials={['TM', 'JS']}
            />
            <RoomCardStub
              title="Roulette table"
              meta="Live Roulette · 7/10"
              initials={['DF', 'GH', 'IJ']}
              overflow={4}
            />
          </div>
        </main>
      </div>
    </div>
  )
}

/** Inside-the-room split-pane layout. */
function RoomWireframe({
  members,
  messages,
  gameState,
  gameLabel,
  roomLabel = 'Book of Dead chat · Public',
}: {
  members: { name: string; initials: string; playing?: boolean; watching?: boolean }[]
  messages: { initials: string; message: string; highlight?: boolean }[]
  gameState: 'idle' | 'playing' | 'observing'
  gameLabel?: string
  roomLabel?: string
}) {
  return (
    <div className="flex flex-col flex-1 min-h-0">
      <HeaderStub />
      <div className="flex flex-1 min-h-0">
        {/* Room sidebar: members + chat */}
        <aside className="w-56 bg-white border-r border-gray-200 flex flex-col">
          <div className="px-3 py-2 border-b border-gray-200">
            <div className="text-[10px] text-gray-400">← Back</div>
            <div className="text-[12px] font-bold text-gray-800 truncate">
              {roomLabel}
            </div>
          </div>
          {/* Members */}
          <div className="px-3 py-2 border-b border-gray-200">
            <div className="text-[9px] font-bold uppercase tracking-wider text-gray-400 mb-1.5">
              In the room ({members.length})
            </div>
            <div className="space-y-1">
              {members.map((m) => (
                <div key={m.name} className="flex items-center gap-1.5">
                  <Avatar initials={m.initials} size={18} />
                  <div className="text-[10px] text-gray-700 flex-1 truncate">
                    {m.name}
                  </div>
                  {m.playing ? (
                    <div className="text-[8px] font-bold tracking-wider text-gray-600 bg-gray-100 rounded px-1 py-px">
                      LIVE
                    </div>
                  ) : null}
                  {m.watching ? (
                    <div className="text-[8px] font-bold tracking-wider text-gray-700 bg-gray-200 rounded px-1 py-px">
                      WATCH
                    </div>
                  ) : null}
                </div>
              ))}
            </div>
          </div>
          {/* Chat */}
          <div className="flex-1 px-2 py-2 overflow-hidden">
            <div className="text-[9px] font-bold uppercase tracking-wider text-gray-400 mb-1 px-1">
              Chat
            </div>
            <div className="space-y-0.5">
              {messages.map((m, idx) => (
                <ChatLine key={idx} {...m} />
              ))}
            </div>
          </div>
          <div className="border-t border-gray-200 p-2">
            <Block className="h-6 w-full" label="Type a message…" />
          </div>
        </aside>

        {/* Main: game + activity feed */}
        <main className="flex-1 bg-gray-50 p-4 flex flex-col gap-3 overflow-hidden">
          {/* Game viewport */}
          <div className="rounded-md border border-gray-200 bg-white p-4 flex flex-col items-center justify-center gap-2 flex-1">
            {gameState !== 'idle' && gameLabel ? (
              <div className="text-[11px] font-semibold text-gray-700">
                {gameLabel}
              </div>
            ) : null}
            <SlotReels state={gameState} />
            {gameState === 'idle' ? (
              <Block className="h-7 w-32 mt-2 bg-gray-200 text-gray-700" label="▶ Press play" />
            ) : null}
            {gameState === 'observing' ? (
              <div className="text-[10px] text-gray-500">You're watching — chat to react</div>
            ) : null}
          </div>
          {/* Activity feed */}
          <div className="rounded-md border border-gray-200 bg-white p-3">
            <div className="text-[9px] font-bold uppercase tracking-wider text-gray-400 mb-1.5">
              Recent wins
            </div>
            <div className="space-y-1">
              {[
                { i: 'TM', t: 'Tom won £24 on Book of Dead' },
                { i: 'JS', t: 'Jess won £8 on Book of Dead' },
                { i: 'EV', t: 'Eve hit a bonus round' },
              ].map((row, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <Avatar initials={row.i} size={16} />
                  <div className="text-[10px] text-gray-600 flex-1">{row.t}</div>
                  <div className="text-[9px] text-gray-400">2m</div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

/** Create-room form. */
function CreateRoomWireframe() {
  return (
    <div className="flex flex-col flex-1 min-h-0">
      <HeaderStub />
      <div className="flex-1 bg-gray-50 flex items-center justify-center p-6">
        <div className="w-[380px] rounded-lg bg-white border border-gray-200 p-5 space-y-3 shadow-sm">
          <div className="text-sm font-bold text-gray-800">Create a room</div>
          <div className="space-y-1.5">
            <div className="text-[10px] font-semibold text-gray-500">Room name</div>
            <div className="h-7 rounded border border-gray-300 bg-white flex items-center px-2 text-[11px] text-gray-700">
              Mike's Room
            </div>
          </div>
          <div className="space-y-1.5">
            <div className="text-[10px] font-semibold text-gray-500">Game</div>
            <div className="h-7 rounded border border-gray-300 bg-white flex items-center px-2 text-[11px] text-gray-700">
              Book of Dead ⌄
            </div>
          </div>
          <div className="space-y-1.5">
            <div className="text-[10px] font-semibold text-gray-500">Visibility</div>
            <div className="flex gap-2">
              <div className="flex-1 h-7 rounded border border-gray-300 bg-gray-50 flex items-center justify-center text-[10px] text-gray-500">
                Public
              </div>
              <div className="flex-1 h-7 rounded bg-gray-800 text-white flex items-center justify-center text-[10px] font-semibold">
                Private
              </div>
            </div>
          </div>
          <div className="space-y-1.5">
            <div className="text-[10px] font-semibold text-gray-500">Password (optional)</div>
            <div className="h-7 rounded border border-gray-300 bg-white" />
          </div>
          <div className="h-8 rounded bg-gray-800 text-white flex items-center justify-center text-[11px] font-semibold mt-2">
            Create room →
          </div>
        </div>
      </div>
    </div>
  )
}

/** Share-link confirmation. */
function ShareRoomWireframe() {
  return (
    <div className="flex flex-col flex-1 min-h-0">
      <HeaderStub />
      <div className="flex-1 bg-gray-50 flex items-center justify-center p-6">
        <div className="w-[420px] rounded-lg bg-white border border-gray-200 p-5 space-y-3 shadow-sm">
          <div className="text-[10px] font-bold uppercase tracking-wider text-gray-500">
            Room created
          </div>
          <div className="text-sm font-bold text-gray-800">
            Mike's Room is live
          </div>
          <div className="text-xs text-gray-600">
            Send this link to your friends to invite them in.
          </div>
          <div className="space-y-1.5">
            <div className="text-[10px] font-semibold text-gray-500">Invite link</div>
            <div className="flex gap-2">
              <div className="flex-1 h-8 rounded border border-gray-300 bg-gray-50 flex items-center px-2 text-[11px] text-gray-600 truncate">
                mrq.com/room/mike-x9k2
              </div>
              <div className="h-8 px-3 rounded bg-gray-800 text-white flex items-center text-[10px] font-semibold">
                Copy
              </div>
            </div>
          </div>
          <div className="flex gap-2 pt-1">
            {['WhatsApp', 'iMessage', 'Email', 'Other'].map((l) => (
              <div
                key={l}
                className="flex-1 h-8 rounded border border-gray-200 bg-gray-50 flex items-center justify-center text-[10px] text-gray-600"
              >
                {l}
              </div>
            ))}
          </div>
          <div className="h-8 rounded bg-gray-200 text-gray-700 flex items-center justify-center text-[11px] font-semibold mt-2">
            Enter room →
          </div>
        </div>
      </div>
    </div>
  )
}

/** Friend joining via link. */
function JoinPrivateWireframe() {
  return (
    <div className="flex flex-col flex-1 min-h-0">
      <HeaderStub />
      <div className="flex-1 bg-gray-50 flex items-center justify-center p-6">
        <div className="w-[400px] rounded-lg bg-white border border-gray-200 p-5 space-y-3 shadow-sm">
          <div className="text-[10px] font-bold uppercase tracking-wider text-gray-500">
            Invitation
          </div>
          <div className="flex items-center gap-2">
            <Avatar initials="MK" size={32} />
            <div>
              <div className="text-sm font-bold text-gray-800">Mike's Room</div>
              <div className="text-[11px] text-gray-500">Mike invited you · Private room</div>
            </div>
          </div>
          <div className="rounded border border-gray-200 bg-gray-50 p-2.5 space-y-1">
            <div className="text-[10px] text-gray-500">Currently in the room</div>
            <div className="flex items-center gap-2">
              <AvatarStack initials={['MK', 'JS']} size={20} />
              <div className="text-[10px] text-gray-600">Mike, Jess</div>
            </div>
          </div>
          <div className="flex gap-2 pt-1">
            <div className="flex-1 h-8 rounded border border-gray-300 bg-white flex items-center justify-center text-[11px] text-gray-600">
              Not now
            </div>
            <div className="flex-1 h-8 rounded bg-gray-800 text-white flex items-center justify-center text-[11px] font-semibold">
              Join room →
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
