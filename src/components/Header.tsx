import { PlusIcon } from '@heroicons/react/24/outline'
import mrqLogo from '../assets/mrq-logo.svg'

const navTabs = [
  { id: 'casino', label: 'Casino' },
  { id: 'live', label: 'Live' },
  { id: 'bingo', label: 'Bingo' },
  { id: 'shared', label: 'Shared', active: true },
  { id: 'rewards', label: 'Rewards' },
]

interface Props {
  topOffset: number
}

export default function Header({ topOffset }: Props) {
  return (
    <header
      className="sticky z-50 bg-white border-b border-gray-200 flex items-stretch h-16 px-2"
      style={{ top: topOffset }}
    >
      {/* Left: nav tabs — flex-1 so logo stays centred */}
      <nav className="flex items-stretch flex-1">
        {navTabs.map((tab) => (
          <button
            key={tab.id}
            className={[
              'flex flex-col items-center justify-center gap-1 px-3 h-full text-[10px] font-semibold tracking-wide border-b-2 transition-colors',
              tab.active
                ? 'text-[#0A2ECB] border-[#0A2ECB]'
                : 'text-gray-400 border-transparent hover:text-gray-500',
            ].join(' ')}
          >
            {/* Placeholder icon box */}
            <div className={[
              'w-6 h-5 rounded',
              tab.active ? 'bg-blue-100' : 'bg-gray-200',
            ].join(' ')} />
            {tab.label}
          </button>
        ))}
      </nav>

      {/* Centre: MrQ logo — fixed width so it stays truly centred */}
      <div className="flex items-center justify-center px-6 flex-shrink-0">
        <img src={mrqLogo} alt="MrQ" className="h-7 w-auto" />
      </div>

      {/* Right: balance pill + avatar — all h-9, flex-1 to mirror left */}
      <div className="flex items-center justify-end gap-2.5 flex-1">
        {/* Balance pill — boxy with + inside, matching MrQ reference */}
        <div className="h-9 flex items-center gap-1.5 bg-gray-100 rounded-lg px-3">
          <span className="text-sm font-bold text-gray-900 tracking-tight">£9.23</span>
          <PlusIcon className="w-4 h-4 text-gray-600" strokeWidth={2.5} />
        </div>

        {/* Avatar */}
        <button
          aria-label="Account"
          className="w-9 h-9 rounded-full bg-gray-300 flex items-center justify-center hover:bg-gray-400 transition-colors overflow-hidden flex-shrink-0"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="8" r="4" fill="white" />
            <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" fill="white" />
          </svg>
        </button>
      </div>
    </header>
  )
}
