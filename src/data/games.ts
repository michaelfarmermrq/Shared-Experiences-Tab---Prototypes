export interface Game {
  id: string
}

export interface GameCategory {
  id: string
  title: string
  games: Game[]
}

export const categories: GameCategory[] = [
  {
    id: 'live-multiplayer',
    title: 'Multiplayer',
    games: Array.from({ length: 9 }, (_, i) => ({ id: `mp-${i}` })),
  },
  {
    id: 'crash',
    title: 'Crash',
    games: Array.from({ length: 9 }, (_, i) => ({ id: `crash-${i}` })),
  },
  {
    id: 'chat',
    title: 'Chat with Others',
    games: Array.from({ length: 9 }, (_, i) => ({ id: `chat-${i}` })),
  },
  {
    id: 'category-a',
    title: 'Category A',
    games: Array.from({ length: 9 }, (_, i) => ({ id: `ext-${i}` })),
  },
]
