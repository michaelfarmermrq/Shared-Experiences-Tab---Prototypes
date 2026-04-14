export interface Player {
  name: string
  initials: string
  netWinnings: number
  game: string
}

export interface Room {
  id: string
  name: string
  game: string
  host: string
  players: Player[]
  maxPlayers: number
  isPublic: boolean
  luckyCharm: string
}

export interface ChatMessage {
  id: string
  player: string
  initials: string
  text: string
  time: string
}

export interface ActivityEvent {
  id: string
  player: string
  initials: string
  game: string
  amount: number
  time: string
}

export const availableGames = [
  'Book of the Dead',
  'Fishin Frenzy',
  'Goosicorn Racing',
  'Crash',
  'Buffalo Bills Roulette',
  'Wolf Gold',
  'Book of Oz',
]

export const mockRooms: Room[] = [
  {
    id: 'book-of-dead',
    name: 'Book of the Dead Room',
    game: 'Book of the Dead',
    host: 'Michael',
    isPublic: true,
    maxPlayers: 8,
    luckyCharm: '📖',
    players: [
      { name: 'Michael', initials: 'M', netWinnings: 4.20, game: 'Book of the Dead' },
      { name: 'Sarah', initials: 'S', netWinnings: -1.00, game: 'Book of the Dead' },
      { name: 'Jamie', initials: 'J', netWinnings: 0.80, game: 'Book of the Dead' },
    ],
  },
  {
    id: 'fishin-frenzy',
    name: 'Fishin Frenzy Room',
    game: 'Fishin Frenzy',
    host: 'Emma',
    isPublic: true,
    maxPlayers: 6,
    luckyCharm: '🎣',
    players: [
      { name: 'Emma', initials: 'E', netWinnings: 12.50, game: 'Fishin Frenzy' },
      { name: 'Luke', initials: 'L', netWinnings: -3.40, game: 'Fishin Frenzy' },
    ],
  },
  {
    id: 'goosicorn-racing',
    name: 'Goosicorn Racing Room',
    game: 'Goosicorn Racing',
    host: 'Alex',
    isPublic: true,
    maxPlayers: 10,
    luckyCharm: '🦄',
    players: [
      { name: 'Alex', initials: 'A', netWinnings: -2.00, game: 'Goosicorn Racing' },
      { name: 'Priya', initials: 'P', netWinnings: 7.60, game: 'Goosicorn Racing' },
      { name: 'Tom', initials: 'T', netWinnings: 1.20, game: 'Goosicorn Racing' },
      { name: 'Zoe', initials: 'Z', netWinnings: -0.50, game: 'Goosicorn Racing' },
    ],
  },
  {
    id: 'wolf-gold-vip',
    name: 'Wolf Gold VIP 🔒',
    game: 'Wolf Gold',
    host: 'Dan',
    isPublic: false,
    maxPlayers: 4,
    luckyCharm: '🐺',
    players: [
      { name: 'Dan', initials: 'D', netWinnings: 30.00, game: 'Wolf Gold' },
      { name: 'Chloe', initials: 'C', netWinnings: 5.20, game: 'Wolf Gold' },
    ],
  },
]

export const mockChatMessages: ChatMessage[] = [
  { id: '1', player: 'Michael', initials: 'M', text: 'Just hit a bonus round! 🎉', time: '2m ago' },
  { id: '2', player: 'Sarah', initials: 'S', text: 'Nice one! I keep missing the scatter', time: '2m ago' },
  { id: '3', player: 'Jamie', initials: 'J', text: 'This game is brutal tonight lol', time: '1m ago' },
  { id: '4', player: 'Michael', initials: 'M', text: 'Got £4.20 up so far — not bad', time: '1m ago' },
  { id: '5', player: 'Sarah', initials: 'S', text: 'I\'m down a quid, someone send luck 🍀', time: '1m ago' },
  { id: '6', player: 'Jamie', initials: 'J', text: 'You got this Sarah! 💪', time: '45s ago' },
  { id: '7', player: 'Michael', initials: 'M', text: 'Shall we all move to Crash after this?', time: '30s ago' },
  { id: '8', player: 'Sarah', initials: 'S', text: 'Yes let\'s do it', time: '20s ago' },
  { id: '9', player: 'Jamie', initials: 'J', text: 'I\'m in!', time: '10s ago' },
]

export const mockActivity: ActivityEvent[] = [
  { id: '1', player: 'Michael', initials: 'M', game: 'Book of the Dead', amount: 45.00, time: '1m ago' },
  { id: '2', player: 'Emma', initials: 'E', game: 'Fishin Frenzy', amount: 12.50, time: '3m ago' },
  { id: '3', player: 'Priya', initials: 'P', game: 'Goosicorn Racing', amount: 7.60, time: '5m ago' },
  { id: '4', player: 'Sarah', initials: 'S', game: 'Book of the Dead', amount: 22.00, time: '7m ago' },
  { id: '5', player: 'Dan', initials: 'D', game: 'Wolf Gold', amount: 30.00, time: '9m ago' },
  { id: '6', player: 'Alex', initials: 'A', game: 'Goosicorn Racing', amount: 15.00, time: '12m ago' },
]

export interface RoomSettings {
  name: string
  description: string
  accentColor: string
  vibe: 'default' | 'classic' | 'neon' | 'lucky'
  welcomeMessage: string
  luckyCharm: string
  playlist: string[]
}

export const defaultRoomSettings = (room: Room): RoomSettings => ({
  name: room.name,
  description: `${room.host}'s ${room.game} room. Join us!`,
  accentColor: '#0A2ECB',
  vibe: 'default',
  welcomeMessage: `Welcome to ${room.name}! 🎰`,
  luckyCharm: room.luckyCharm,
  playlist: [room.game],
})
