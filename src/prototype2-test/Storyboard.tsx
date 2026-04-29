import { useState, type ReactNode } from 'react'
import { ChevronRightIcon } from '@heroicons/react/24/outline'
import Panel from './Panel'
import {
  HeaderStub,
  Avatar,
  AvatarStack,
  RoomCardStub,
  StreamCardStub,
  ChatLine,
  SlotReels,
  Block,
  WireSectionTitle,
} from './parts'

const STREAMING_NAV = [
  { label: 'Home', active: true },
  { label: 'Wallet' },
  { label: 'Go Live' },
]

const STREAMING_NAV_GO_LIVE = [
  { label: 'Home' },
  { label: 'Wallet' },
  { label: 'Go Live', active: true },
]

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
              Concept storyboards
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

        {/* ─── Streaming storyboard ───────────────────────────────────── */}
        <FlowAccordion
          title="Flow C · Streaming"
          subtitle="Players broadcast their gameplay to an audience — Twitch-style. Viewers watch live; streamers can share their game."
        >
          {/* 1. Browse streams */}
          <Panel
            index={1}
            total={5}
            showCaption={showCaptions}
            title="Browsing live streams"
            caption="Sarah opens the Live tab and sees players streaming right now — sorted by category."
          >
            <StreamingLobbyWireframe />
          </Panel>

          {/* 2. Watching a streamer */}
          <Panel
            index={2}
            total={5}
            showCaption={showCaptions}
            title="Watching a streamer"
            caption="She picks a stream and lands inside — the streamer fills the screen, with the viewer count up top."
          >
            <StreamWatchingWireframe />
          </Panel>

          {/* 3. Watching gameplay */}
          <Panel
            index={3}
            total={5}
            showCaption={showCaptions}
            title="Watching them play"
            caption="The streamer shares their game — Sarah sees their gameplay in real time with the streamer's cam in the corner."
          >
            <StreamGameplayWireframe />
          </Panel>

          {/* 4. Go Live setup */}
          <Panel
            index={4}
            total={5}
            showCaption={showCaptions}
            title="Setting up your stream"
            caption="Mike decides to stream — he sets a title, picks a category, chooses an accent colour."
          >
            <GoLiveSetupWireframe />
          </Panel>

          {/* 5. Streamer broadcasting */}
          <Panel
            index={5}
            total={5}
            showCaption={showCaptions}
            title="Going live"
            caption="Mike's broadcast is live — his cam is on, viewers are joining, and he can see the count tick up."
          >
            <BroadcastingWireframe />
          </Panel>
        </FlowAccordion>

        {/* ─── Arena storyboard ───────────────────────────────────────── */}
        <FlowAccordion
          title="Flow D · Arena"
          subtitle="Team-based competition. Players are auto-assigned to a team for the season; daily quests + every game played feed a shared leaderboard."
        >
          {/* 1. Discover Arena */}
          <Panel
            index={1}
            total={8}
            showCaption={showCaptions}
            title="Discovering Arena"
            caption="Sarah opens the app and meets Arena for the first time — the new Shared tab kicks off with a season intro."
          >
            <ArenaDiscoveryWireframe />
          </Panel>

          {/* 2. Team assignment */}
          <Panel
            index={2}
            total={8}
            showCaption={showCaptions}
            title="You're on Team Volt"
            caption="She's assigned to Team Volt for the season — no choice, locked in. The matchmaking explains the why."
          >
            <ArenaTeamAssignmentWireframe />
          </Panel>

          {/* 3. Three ways to score */}
          <Panel
            index={3}
            total={8}
            showCaption={showCaptions}
            title="Three ways to score"
            caption="She learns how to contribute — boosted games, live events, climbing the ladder. Plus 1,000 starter points dropped onto Volt's total."
          >
            <ArenaThreeWaysWireframe />
          </Panel>

          {/* 4. Arena hub */}
          <Panel
            index={4}
            total={8}
            showCaption={showCaptions}
            title="The Arena hub"
            caption="The dashboard: live team scoreboard, her contribution and rank, today's daily quests, eligible games to play right now."
          >
            <ArenaHubWireframe />
          </Panel>

          {/* 5. Daily quests */}
          <Panel
            index={5}
            total={8}
            showCaption={showCaptions}
            title="Today's daily quests"
            caption="A fresh set of quests every day — each one is points for Volt. Some take a single spin, others take an evening."
          >
            <ArenaDailyQuestsWireframe />
          </Panel>

          {/* 6. Playing an eligible game */}
          <Panel
            index={6}
            total={8}
            showCaption={showCaptions}
            title="Playing for the team"
            caption="She plays an eligible game — the team standing follows her into the game so every spin feels tied to Volt's score."
          >
            <ArenaInGameWireframe />
          </Panel>

          {/* 7. Team standing moment */}
          <Panel
            index={7}
            total={8}
            showCaption={showCaptions}
            title="Volt's up — hold it"
            caption="A live update lands while she's in the app — Volt is ahead by 16k. The kind of moment that pulls her back tomorrow."
          >
            <ArenaWinningWireframe />
          </Panel>

          {/* 8. Prize earned */}
          <Panel
            index={8}
            total={8}
            showCaption={showCaptions}
            title="Volt wins — your prize"
            caption="The day ends, Volt held the lead. Sarah's reward is scaled by how much she contributed — bonus points and free spins land in her wallet."
          >
            <ArenaPrizeWireframe />
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

/* ─── Streaming wireframes (dark themed, matches Twitch-style prototype) ─── */

/** Lobby of live streams — dark grid, Twitch-ish. */
function StreamingLobbyWireframe() {
  const categories = [
    { label: 'For You', active: true },
    { label: 'Followed' },
    { label: 'Live Casino' },
    { label: 'Slots Streams' },
    { label: 'Table Games' },
    { label: 'Sports Betting' },
    { label: 'Entertainment' },
    { label: 'Other' },
  ]
  const streams = [
    { title: 'Mega Jackpot Breaks', streamer: 'BigWinDave', cat: 'Slots Streams', viewers: '340', initials: 'BD' },
    { title: 'High Roller Roulette', streamer: 'RouletteQueen', cat: 'Live Casino', viewers: '567', initials: 'RQ' },
    { title: 'Blackjack Marathon', streamer: 'CardShark21', cat: 'Table Games', viewers: '234', initials: 'CS' },
    { title: 'Poker Night Live', streamer: 'AceHighPro', cat: 'Table Games', viewers: '891', initials: 'AH' },
    { title: 'Crash & Burn', streamer: 'MoonShot', cat: 'Entertainment', viewers: '1.2k', initials: 'MS' },
    { title: 'Sports Pick of the Night', streamer: 'OddsMaker', cat: 'Sports Betting', viewers: '478', initials: 'OM' },
    { title: 'After Hours Freestyle', streamer: 'NightOwl', cat: 'Other', viewers: '162', initials: 'NO' },
    { title: 'Late Night Slots', streamer: 'SpinKing', cat: 'Slots Streams', viewers: '89', initials: 'SK' },
  ]
  return (
    <div className="flex flex-col flex-1 min-h-0">
      <HeaderStub nav={STREAMING_NAV} dark />
      <div className="flex flex-1 min-h-0 bg-gray-900">
        {/* Sidebar */}
        <aside className="w-44 border-r border-gray-800 p-3 space-y-3">
          <div>
            <div className="text-[10px] text-gray-200 font-semibold">Hello, Player1</div>
            <div className="text-[9px] text-gray-500">What are we watching?</div>
          </div>
          <div className="space-y-0.5">
            {categories.map((c) => (
              <div
                key={c.label}
                className={[
                  'flex items-center gap-1.5 px-1.5 py-1 rounded text-[10px]',
                  c.active ? 'bg-gray-800 text-gray-100 font-semibold' : 'text-gray-400',
                ].join(' ')}
              >
                <span
                  className={[
                    'w-1.5 h-1.5 rounded-full',
                    c.active ? 'bg-gray-300' : 'bg-gray-700',
                  ].join(' ')}
                />
                {c.label}
              </div>
            ))}
          </div>
        </aside>
        {/* Main */}
        <main className="flex-1 p-4 space-y-3 overflow-hidden">
          <div className="h-14 bg-gray-800 rounded flex items-center justify-center text-[10px] text-gray-500">
            Promo banner
          </div>
          <div>
            <div className="text-[11px] font-bold text-gray-200 mb-2 tracking-wide">
              Live Streams · {streams.length} live
            </div>
            <div className="grid grid-cols-4 gap-2">
              {streams.map((s) => (
                <StreamCardStub
                  key={s.streamer}
                  title={s.title}
                  streamer={s.streamer}
                  category={s.cat}
                  viewers={s.viewers}
                  initials={s.initials}
                />
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

/**
 * Audience watching a stream — full-screen streamer cam, viewer count in the
 * info strip. Used when the streamer is on camera but not yet sharing a game.
 */
function StreamWatchingWireframe() {
  return (
    <div className="flex flex-col flex-1 min-h-0">
      <HeaderStub nav={STREAMING_NAV} dark />
      <div className="bg-gray-900 px-4 py-2 flex items-center gap-2 border-b border-gray-800">
        <Avatar initials="BD" size={20} />
        <div className="text-[11px] font-semibold text-gray-100">BigWinDave</div>
        <div className="ml-2 flex items-center gap-1">
          <div className="text-[8px] font-bold tracking-wider text-white bg-red-700 rounded px-1 py-px">
            LIVE
          </div>
          <div className="text-[10px] text-gray-300">340 watching</div>
        </div>
      </div>
      <div className="flex-1 bg-black flex items-center justify-center relative">
        <div className="w-40 h-40 rounded-full bg-gray-700" />
        <div className="absolute bottom-3 left-4 text-[10px] text-gray-400">
          Mega Jackpot Breaks
        </div>
        <div className="absolute bottom-3 right-4 w-6 h-6 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 text-[12px]">
          ⓧ
        </div>
      </div>
    </div>
  )
}

/**
 * Audience watching gameplay — streamer's screenshare fills the viewport with
 * the streamer's webcam circle in the corner.
 */
function StreamGameplayWireframe() {
  return (
    <div className="flex flex-col flex-1 min-h-0">
      <HeaderStub nav={STREAMING_NAV} dark />
      <div className="bg-gray-900 px-4 py-2 flex items-center gap-2 border-b border-gray-800">
        <Avatar initials="BD" size={20} />
        <div className="text-[11px] font-semibold text-gray-100">BigWinDave</div>
        <div className="ml-2 flex items-center gap-1">
          <div className="text-[8px] font-bold tracking-wider text-white bg-red-700 rounded px-1 py-px">
            LIVE
          </div>
          <div className="text-[10px] text-gray-300">412 watching</div>
        </div>
        <div className="ml-auto text-[10px] text-gray-400">
          Sharing — Book of Dead
        </div>
      </div>
      <div className="flex-1 bg-gray-950 flex items-center justify-center relative">
        {/* Mock gameplay: slot reels in dark style */}
        <div className="flex gap-3">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-20 h-28 rounded bg-gray-800 border border-gray-700 flex items-center justify-center text-gray-500 text-3xl"
            >
              ?
            </div>
          ))}
        </div>
        <div className="absolute bottom-3 left-4 text-[10px] text-gray-500">
          Spin to play
        </div>
        {/* Streamer cam in corner */}
        <div className="absolute bottom-3 right-3 w-20 h-20 rounded-full bg-gray-700 border-2 border-gray-600 flex items-center justify-center text-[10px] text-gray-400 font-semibold">
          BD
        </div>
      </div>
    </div>
  )
}

/** Streamer's pre-broadcast setup form. */
function GoLiveSetupWireframe() {
  return (
    <div className="flex flex-col flex-1 min-h-0">
      <HeaderStub nav={STREAMING_NAV_GO_LIVE} dark />
      <div className="flex-1 bg-gray-900 p-6 flex justify-center">
        <div className="flex gap-6 max-w-3xl w-full">
          {/* Form column */}
          <div className="flex-1 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-red-700 flex items-center justify-center text-white text-[12px]">
                ◉
              </div>
              <div>
                <div className="text-sm font-bold text-gray-100">Go Live</div>
                <div className="text-[10px] text-gray-500">Set up your stream and go live</div>
              </div>
            </div>
            <div className="space-y-1.5">
              <div className="text-[9px] font-semibold tracking-wider uppercase text-gray-500">
                Stream title
              </div>
              <div className="h-8 rounded border border-gray-700 bg-gray-800 flex items-center px-2 text-[11px] text-gray-300">
                Big Bonus Friday Night
              </div>
            </div>
            <div className="space-y-1.5">
              <div className="text-[9px] font-semibold tracking-wider uppercase text-gray-500">
                Category
              </div>
              <div className="flex flex-wrap gap-1.5">
                {['Live Casino', 'Slots Streams', 'Table Games', 'Sports Betting', 'Entertainment', 'Other'].map(
                  (cat, i) => (
                    <div
                      key={cat}
                      className={[
                        'h-6 px-2 rounded-full text-[9px] flex items-center',
                        i === 1
                          ? 'bg-gray-200 text-gray-900 font-semibold'
                          : 'bg-gray-800 text-gray-400 border border-gray-700',
                      ].join(' ')}
                    >
                      {cat}
                    </div>
                  ),
                )}
              </div>
            </div>
            <div className="space-y-1.5">
              <div className="text-[9px] font-semibold tracking-wider uppercase text-gray-500">
                Stream colour
              </div>
              <div className="flex gap-1.5">
                {Array.from({ length: 10 }).map((_, i) => {
                  const tones = ['bg-gray-300', 'bg-gray-400', 'bg-gray-500', 'bg-gray-600', 'bg-gray-700']
                  return (
                    <div
                      key={i}
                      className={[
                        'w-5 h-5 rounded-full',
                        tones[i % tones.length],
                        i === 0 ? 'ring-2 ring-white' : '',
                      ].join(' ')}
                    />
                  )
                })}
              </div>
            </div>
            <div className="h-9 rounded bg-red-900 text-red-100 flex items-center justify-center text-[12px] font-semibold mt-2">
              ◉ Start Streaming →
            </div>
          </div>
          {/* Preview column */}
          <div className="w-64 space-y-3">
            <div className="space-y-1.5">
              <div className="text-[9px] font-semibold tracking-wider uppercase text-gray-500">
                Camera preview
              </div>
              <div className="aspect-video rounded bg-gray-800 border border-gray-700 flex items-center justify-center relative">
                <div className="w-12 h-12 rounded-full bg-gray-700" />
                <div className="absolute top-1.5 left-1.5 text-[8px] font-bold text-white bg-black/60 rounded px-1 py-px">
                  • Preview
                </div>
              </div>
            </div>
            <div className="rounded border border-gray-700 bg-gray-800 p-2 space-y-1.5">
              <div className="text-[9px] font-semibold tracking-wider uppercase text-gray-500">
                Viewer preview
              </div>
              <div className="flex items-center gap-2">
                <Avatar initials="MK" size={20} />
                <div className="flex-1 min-w-0">
                  <div className="text-[10px] font-semibold text-gray-100 truncate">
                    Big Bonus Friday Nigh…
                  </div>
                  <div className="text-[9px] text-gray-500">Slots · 0 viewers</div>
                </div>
                <div className="text-[8px] font-bold tracking-wider text-white bg-red-700 rounded px-1 py-px">
                  LIVE
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/** Streamer broadcasting — their cam centre, viewer count growing, end-stream control. */
function BroadcastingWireframe() {
  return (
    <div className="flex flex-col flex-1 min-h-0">
      <HeaderStub nav={STREAMING_NAV_GO_LIVE} dark />
      <div className="flex flex-1 min-h-0 bg-gray-900">
        {/* Main broadcast area */}
        <div className="flex-1 relative bg-black flex items-center justify-center">
          <div className="absolute top-3 left-3 flex items-center gap-1">
            <div className="text-[9px] font-bold tracking-wider text-white bg-red-700 rounded px-1.5 py-px">
              LIVE
            </div>
          </div>
          <div className="w-44 h-44 rounded-full bg-gray-700" />
          <div className="absolute bottom-3 left-4 text-[10px] text-gray-400">
            Big Bonus Friday Night
          </div>
        </div>
        {/* Streamer side panel */}
        <aside className="w-56 border-l border-gray-800 p-3 space-y-3">
          <div className="flex items-center gap-2">
            <Avatar initials="MK" size={26} />
            <div>
              <div className="text-[11px] font-semibold text-gray-100">michaelf</div>
              <div className="text-[9px] text-gray-500">Big Bonus Friday Night</div>
            </div>
          </div>
          <div className="rounded border border-gray-700 bg-gray-800 p-2.5 space-y-0.5">
            <div className="text-[9px] font-semibold tracking-wider uppercase text-gray-500">
              Viewers
            </div>
            <div className="text-xl font-bold text-gray-100">128</div>
            <div className="text-[9px] text-gray-500">↑ growing</div>
          </div>
          <div className="rounded border border-gray-700 bg-gray-800 p-2.5 space-y-1.5">
            <div className="text-[10px] font-bold text-gray-200">Broadcast settings</div>
            <div className="text-[9px] text-gray-500 leading-snug">
              RTMP push from OBS or any encoder.
            </div>
            <div className="h-6 rounded bg-gray-700 text-gray-200 flex items-center justify-center text-[9px] font-semibold">
              ◉ Mux stream active
            </div>
          </div>
          <div className="h-7 rounded bg-red-900 text-red-100 flex items-center justify-center text-[10px] font-semibold">
            ⏹ End Stream
          </div>
        </aside>
      </div>
    </div>
  )
}

/* ─── Arena wireframes (mobile-shaped, dark themed) ───────────────────── */

/** Phone-shaped frame. Renders centered in the panel with a soft drop shadow. */
function MobileFrame({ children }: { children: ReactNode }) {
  return (
    <div className="flex-1 flex items-center justify-center px-6 py-4 min-h-0">
      <div className="h-full aspect-[9/19.5] rounded-[1.75rem] border-[6px] border-gray-900 bg-gray-950 overflow-hidden flex flex-col shadow-[0_20px_50px_-12px_rgba(0,0,0,0.25)]">
        {/* iOS status bar */}
        <div className="h-5 flex items-center justify-between px-4 flex-shrink-0">
          <span className="text-[8px] font-semibold text-white">9:41</span>
          <div className="flex items-center gap-1 text-white text-[8px]">
            <span>•••</span>
            <span>▮▮</span>
          </div>
        </div>
        {/* Content */}
        <div className="flex-1 overflow-hidden flex flex-col">{children}</div>
        {/* Home indicator */}
        <div className="h-3 flex items-center justify-center flex-shrink-0">
          <div className="h-0.5 w-16 rounded-full bg-gray-300" />
        </div>
      </div>
    </div>
  )
}

/** App header stub — logo placeholder + balance pill + avatar. Used inside MobileFrame. */
function ArenaAppHeader() {
  return (
    <div className="flex items-center justify-between px-3 py-2 flex-shrink-0">
      <div className="w-10 h-2.5 rounded bg-gray-700" />
      <div className="flex items-center gap-1.5">
        <div className="w-12 h-3 rounded bg-gray-800" />
        <div className="w-5 h-5 rounded-full bg-gray-600" />
      </div>
    </div>
  )
}

/** Onboarding progress dashes + close button. */
function OnboardingProgressBar({ active }: { active: number }) {
  return (
    <div className="flex items-center gap-1 px-3 pb-2 flex-shrink-0">
      <div className="flex gap-0.5 flex-1">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className={[
              'flex-1 h-0.5 rounded-full',
              i < active ? 'bg-gray-300' : 'bg-gray-700',
            ].join(' ')}
          />
        ))}
      </div>
      <div className="text-gray-400 text-[10px] leading-none ml-1">×</div>
    </div>
  )
}

/** Bottom tab bar. */
function ArenaBottomNav({ active = 'Arena' }: { active?: string }) {
  const tabs = ['Casino', 'Live', 'Bingo', 'Arena', 'Rewards']
  return (
    <div className="flex items-stretch justify-around border-t border-gray-800 px-1 py-1.5 flex-shrink-0 bg-gray-950">
      {tabs.map((t) => (
        <div key={t} className="flex flex-col items-center gap-0.5 px-1">
          <div
            className={[
              'w-3 h-3 rounded-sm',
              t === active ? 'bg-gray-200' : 'bg-gray-700',
            ].join(' ')}
          />
          <div
            className={[
              'text-[7px] leading-none',
              t === active
                ? 'text-white font-semibold'
                : 'text-gray-500',
            ].join(' ')}
          >
            {t}
          </div>
        </div>
      ))}
    </div>
  )
}

/** Volt vs Shock scoreboard with progress bar. */
function TeamScoreboard({
  volt,
  shock,
  progress = 65,
  compact = false,
}: {
  volt: string
  shock: string
  progress?: number
  compact?: boolean
}) {
  return (
    <div className={compact ? 'space-y-1' : 'space-y-1.5'}>
      <div className="flex justify-between items-baseline">
        <div>
          <div className="text-[7px] font-bold tracking-wider uppercase text-gray-400">
            Team Volt
          </div>
          <div
            className={[
              'font-bold text-white leading-tight',
              compact ? 'text-[12px]' : 'text-[15px]',
            ].join(' ')}
          >
            {volt}
          </div>
        </div>
        <div className="text-right">
          <div className="text-[7px] font-bold tracking-wider uppercase text-gray-500">
            Team Shock
          </div>
          <div
            className={[
              'font-bold text-gray-400 leading-tight',
              compact ? 'text-[12px]' : 'text-[15px]',
            ].join(' ')}
          >
            {shock}
          </div>
        </div>
      </div>
      <div className="relative h-1 rounded-full bg-gray-700 overflow-hidden">
        <div
          className="absolute left-0 top-0 h-full bg-gray-300 rounded-full"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  )
}

/* ── Arena panels ─────────────────────────────────────────────────────── */

/** 1. Onboarding intro — "Something new just landed" */
function ArenaDiscoveryWireframe() {
  return (
    <MobileFrame>
      <ArenaAppHeader />
      <OnboardingProgressBar active={1} />
      <div className="flex-1 px-4 flex flex-col justify-end pb-8">
        <div className="text-[8px] tracking-widest font-semibold text-gray-400 uppercase mb-2">
          Season 01 — Now Live
        </div>
        <div className="text-[20px] font-extrabold text-white leading-[1.1] mb-3">
          Something new<br />
          just <span className="underline decoration-gray-300 underline-offset-2">landed.</span>
        </div>
        <div className="text-[10px] text-gray-300 leading-snug">
          Say hi to <span className="text-white font-semibold">Arena</span>. Two teams,
          one season, every game you play counts for your side.
        </div>
      </div>
    </MobileFrame>
  )
}

/** 2. Team assignment — "You're on Team Volt" */
function ArenaTeamAssignmentWireframe() {
  return (
    <MobileFrame>
      <ArenaAppHeader />
      <OnboardingProgressBar active={3} />
      <div className="flex-1 px-4 flex flex-col justify-end pb-8">
        <div className="text-[8px] tracking-widest font-semibold text-gray-400 uppercase mb-2">
          Your assignment
        </div>
        <div className="text-[20px] font-extrabold text-white leading-[1.05] mb-1">
          You're
        </div>
        <div className="text-[20px] font-extrabold text-white leading-[1.05] mb-1">on</div>
        <div className="text-[28px] font-black text-gray-100 leading-[1] mb-3 tracking-tight">
          Team Volt
        </div>
        <div className="text-[10px] text-gray-300 leading-snug">
          You are locked in for the whole season. Make Volt proud (or not, we
          still love you).
        </div>
      </div>
    </MobileFrame>
  )
}

/** 3. How you help — three cards */
function ArenaThreeWaysWireframe() {
  const ways = [
    {
      title: 'Play boosted games',
      body: "Some give 2x or 3x Team points, we'll flag which.",
    },
    {
      title: 'Join live events',
      body: 'Head-to-heads, tournaments, group challenges.',
    },
    {
      title: 'Climb the ladder',
      body: 'Top individuals bank bonus points for Volt.',
    },
  ]
  return (
    <MobileFrame>
      <ArenaAppHeader />
      <OnboardingProgressBar active={5} />
      <div className="flex-1 px-4 pb-4 flex flex-col">
        <div className="text-[8px] tracking-widest font-semibold text-gray-400 uppercase mb-2">
          How you help
        </div>
        <div className="text-[22px] font-extrabold text-white leading-[1.05] mb-4">
          Three ways<br />
          to <span className="underline decoration-gray-300 underline-offset-2">score.</span>
        </div>
        <div className="space-y-2">
          {ways.map((w) => (
            <div
              key={w.title}
              className="rounded-lg bg-gray-800 px-3 py-2.5 border border-gray-700"
            >
              <div className="text-[10px] font-bold text-white leading-tight">
                {w.title}
              </div>
              <div className="text-[8px] text-gray-400 leading-snug mt-0.5">
                {w.body}
              </div>
            </div>
          ))}
        </div>
      </div>
    </MobileFrame>
  )
}

/** 4. Arena hub — main dashboard */
function ArenaHubWireframe() {
  const tabs = ['Dashboard', 'Games', 'Live Battles', 'Rooms', 'Lea']
  return (
    <MobileFrame>
      <ArenaAppHeader />
      {/* Search + tabs */}
      <div className="px-3 pb-2 flex items-center gap-2 flex-shrink-0">
        <div className="w-3 h-3 rounded bg-gray-700 flex-shrink-0" />
        {tabs.map((t, i) => (
          <div
            key={t}
            className={[
              'text-[8px] font-semibold whitespace-nowrap',
              i === 0
                ? 'text-white border-b-2 border-gray-300 pb-0.5'
                : 'text-gray-500',
            ].join(' ')}
          >
            {t}
          </div>
        ))}
      </div>
      {/* Body */}
      <div className="flex-1 px-3 pb-2 space-y-2 overflow-hidden">
        {/* Scoreboard card */}
        <div className="rounded-xl bg-gray-800 p-2.5 space-y-2 border border-gray-700">
          <TeamScoreboard volt="508,109" shock="248,125" progress={67} />
          <div className="bg-gray-700 rounded-md text-center py-1 text-[9px] text-white font-semibold">
            See full scorecard
          </div>
        </div>
        {/* Your contribution card */}
        <div className="rounded-xl bg-white p-2.5 space-y-1">
          <div className="text-[7px] tracking-wider uppercase text-gray-500 font-bold">
            Your contribution
          </div>
          <div className="flex items-baseline justify-between">
            <div className="text-[16px] font-extrabold text-gray-900 leading-tight">
              3,472
            </div>
            <div className="text-[8px] text-gray-500 font-semibold">
              1.4% OF VOLT
            </div>
          </div>
          <div className="h-0.5 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-gray-700 rounded-full"
              style={{ width: '4%' }}
            />
          </div>
          <div className="text-[7px] text-gray-500 font-semibold">
            RANK <span className="text-gray-700">1.4%</span> ON VOLT · #312 OVERALL
          </div>
        </div>
        {/* Daily quests preview */}
        <div className="rounded-xl bg-gray-800 p-2.5 space-y-1.5 border border-gray-700">
          <div className="flex items-center justify-between">
            <div className="text-[7px] tracking-wider uppercase text-gray-400 font-bold">
              Daily quests · 1 of 3
            </div>
            <div className="text-[7px] text-gray-500">View all →</div>
          </div>
          <div className="space-y-1">
            <CompactQuestRow
              title="Spin Buffalo Bill's 50×"
              progress={64}
              progressText="32/50"
              points="+500"
            />
            <CompactQuestRow
              title="Win a bonus on any slot"
              progress={0}
              progressText="0/1"
              points="+1,000"
            />
          </div>
        </div>
        {/* Eligible games grid */}
        <div>
          <div className="text-[7px] tracking-wider uppercase text-gray-500 font-bold mb-1.5">
            Eligible games
          </div>
          <div className="grid grid-cols-3 gap-1.5">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className={[
                  'aspect-square rounded-md',
                  i === 2 ? 'bg-gray-300' : 'bg-gray-800',
                ].join(' ')}
              />
            ))}
          </div>
        </div>
      </div>
      <ArenaBottomNav active="Arena" />
    </MobileFrame>
  )
}

/** 5. Playing an eligible game — with team standing strip */
function ArenaInGameWireframe() {
  return (
    <MobileFrame>
      <ArenaAppHeader />
      <div className="flex-1 bg-black flex flex-col items-center justify-center gap-3 px-4">
        <div className="text-[9px] text-gray-300 font-semibold tracking-wide">
          Buffalo Bill's Big Bonus
        </div>
        <div className="flex gap-1.5">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-12 h-16 rounded bg-gray-800 border border-gray-700 flex items-center justify-center text-gray-500 text-2xl"
            >
              ?
            </div>
          ))}
        </div>
        <div className="h-7 px-5 bg-gray-200 rounded-full flex items-center text-[10px] font-bold text-gray-900">
          ▶ Spin
        </div>
        <div className="text-[8px] text-gray-500 mt-1">
          Earning points for Team Volt
        </div>
      </div>
      {/* Team standing strip — keeps Arena visible mid-game */}
      <div className="px-3 py-2 bg-gray-900 border-t border-gray-800 flex-shrink-0">
        <TeamScoreboard volt="312,109" shock="248,125" progress={56} compact />
      </div>
      <ArenaBottomNav active="Arena" />
    </MobileFrame>
  )
}

/** Compact quest row used inside the hub's Daily Quests preview card. */
function CompactQuestRow({
  title,
  progress,
  progressText,
  points,
}: {
  title: string
  progress: number
  progressText: string
  points: string
}) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-baseline gap-2 mb-0.5">
          <div className="text-[8px] text-gray-200 truncate">{title}</div>
          <div className="text-[7px] text-gray-500 flex-shrink-0">{progressText}</div>
        </div>
        <div className="h-0.5 bg-gray-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-gray-300 rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
      <div className="text-[7px] text-gray-200 font-bold flex-shrink-0">{points}</div>
    </div>
  )
}

/** Daily Quests dedicated panel — full list of today's quests. */
function ArenaDailyQuestsWireframe() {
  const quests = [
    {
      title: "Spin Buffalo Bill's 50 times",
      progress: 64,
      progressText: '32 / 50',
      points: '+500 pts',
      done: false,
    },
    {
      title: 'Win a bonus on any slot',
      progress: 0,
      progressText: '0 / 1',
      points: '+1,000 pts',
      done: false,
    },
    {
      title: 'Play 3 different games',
      progress: 33,
      progressText: '1 / 3',
      points: '+250 pts',
      done: false,
    },
    {
      title: 'Place a Live Casino bet',
      progress: 100,
      progressText: 'Done',
      points: '+150 pts',
      done: true,
    },
  ]
  return (
    <MobileFrame>
      <ArenaAppHeader />
      <div className="px-3 pb-2 flex items-center gap-2 flex-shrink-0">
        <div className="w-3 h-3 rounded bg-gray-700 flex-shrink-0" />
        {['Dashboard', 'Games', 'Live Battles', 'Rooms', 'Lea'].map((t, i) => (
          <div
            key={t}
            className={[
              'text-[8px] font-semibold whitespace-nowrap',
              i === 0
                ? 'text-white border-b-2 border-gray-300 pb-0.5'
                : 'text-gray-500',
            ].join(' ')}
          >
            {t}
          </div>
        ))}
      </div>
      <div className="flex-1 px-3 pb-2 overflow-hidden flex flex-col">
        <div className="flex items-baseline justify-between mb-2">
          <div>
            <div className="text-[8px] tracking-widest font-bold uppercase text-gray-400">
              Daily quests
            </div>
            <div className="text-[16px] font-extrabold text-white leading-tight">
              Today's quests
            </div>
          </div>
          <div className="text-right">
            <div className="text-[7px] tracking-wider uppercase text-gray-500 font-bold">
              Earned
            </div>
            <div className="text-[12px] font-extrabold text-white leading-tight">
              150
            </div>
          </div>
        </div>
        <div className="space-y-1.5 flex-1 overflow-hidden">
          {quests.map((q) => (
            <div
              key={q.title}
              className={[
                'rounded-lg px-2.5 py-2 border',
                q.done
                  ? 'bg-gray-700 border-gray-600'
                  : 'bg-gray-800 border-gray-700',
              ].join(' ')}
            >
              <div className="flex items-center justify-between gap-2 mb-1">
                <div className="flex items-center gap-1.5 min-w-0">
                  <div
                    className={[
                      'w-3 h-3 rounded-full border flex items-center justify-center text-[8px] flex-shrink-0',
                      q.done
                        ? 'bg-gray-200 border-gray-200 text-gray-800 font-bold'
                        : 'border-gray-500 text-transparent',
                    ].join(' ')}
                  >
                    ✓
                  </div>
                  <div
                    className={[
                      'text-[10px] font-semibold truncate',
                      q.done ? 'text-gray-400 line-through' : 'text-white',
                    ].join(' ')}
                  >
                    {q.title}
                  </div>
                </div>
                <div className="text-[8px] font-bold text-gray-200 flex-shrink-0">
                  {q.points}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex-1 h-1 bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className={[
                      'h-full rounded-full',
                      q.done ? 'bg-gray-300' : 'bg-gray-400',
                    ].join(' ')}
                    style={{ width: `${q.progress}%` }}
                  />
                </div>
                <div className="text-[7px] text-gray-500 font-semibold flex-shrink-0">
                  {q.progressText}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="text-[8px] text-gray-500 text-center mt-2">
          Quests reset at midnight · Points feed into Volt's total
        </div>
      </div>
      <ArenaBottomNav active="Arena" />
    </MobileFrame>
  )
}

/** Prize celebration — Volt won the day, you got a reward. */
function ArenaPrizeWireframe() {
  return (
    <MobileFrame>
      <ArenaAppHeader />
      <div className="flex-1 px-4 flex flex-col items-center justify-center text-center gap-3">
        <div className="text-[8px] tracking-widest font-bold uppercase text-gray-400">
          Yesterday's battle
        </div>
        {/* Trophy / medal */}
        <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center text-3xl text-gray-800">
          ★
        </div>
        <div>
          <div className="text-[24px] font-extrabold text-white leading-[1.05] tracking-tight">
            Volt wins!
          </div>
          <div className="text-[10px] text-gray-400 mt-1">
            612,440 vs Shock 524,201
          </div>
        </div>
        {/* Prize card */}
        <div className="w-full rounded-xl bg-gray-800 border border-gray-700 px-3 py-3 space-y-2">
          <div className="text-[7px] tracking-wider uppercase text-gray-500 font-bold text-left">
            Your reward
          </div>
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <div className="text-[10px] text-gray-200">Bonus points</div>
              <div className="text-[12px] font-extrabold text-white">+2,500</div>
            </div>
            <div className="flex items-center justify-between">
              <div className="text-[10px] text-gray-200">Free spins</div>
              <div className="text-[12px] font-extrabold text-white">50</div>
            </div>
          </div>
          <div className="text-[7px] text-gray-500 text-left">
            Scaled by your contribution: <span className="text-gray-300">1.4% of Volt</span>
          </div>
        </div>
        <div className="w-full h-9 rounded-full bg-gray-200 text-gray-900 flex items-center justify-center text-[12px] font-bold">
          Claim your prize →
        </div>
      </div>
      <ArenaBottomNav active="Arena" />
    </MobileFrame>
  )
}

/** 6. Volt's up by 16k — the social moment */
function ArenaWinningWireframe() {
  return (
    <MobileFrame>
      <ArenaAppHeader />
      <div className="flex-1 px-4 flex flex-col justify-center">
        <div className="text-[24px] font-extrabold text-white leading-[1.05] tracking-tight">
          Volt's up by{' '}
          <span className="text-gray-100">16k</span>
        </div>
        <div className="text-[24px] font-extrabold text-white leading-[1.05] tracking-tight">
          hold it!
        </div>
      </div>
      <div className="px-3 pb-3 flex-shrink-0">
        <TeamScoreboard volt="308,109" shock="248,125" progress={55} />
      </div>
      <ArenaBottomNav active="Arena" />
    </MobileFrame>
  )
}
