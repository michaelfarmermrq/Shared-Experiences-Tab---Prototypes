import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { categories } from '../data/games'

interface Props {
  topOffset: number
  extraTabs?: string[]
}

export default function SubNav({ topOffset, extraTabs = [] }: Props) {
  const tabs = ['All', ...extraTabs, ...categories.map((c) => c.title)]

  return (
    <nav
      className="sticky z-40 bg-white border-b border-gray-200 flex items-stretch h-12 overflow-x-auto scrollbar-hide"
      style={{ top: topOffset }}
    >
      <button
        aria-label="Search"
        className="flex-shrink-0 flex items-center justify-center w-12 text-gray-400 hover:text-gray-600 transition-colors"
      >
        <MagnifyingGlassIcon className="w-5 h-5" />
      </button>
      <div className="flex items-stretch">
        {tabs.map((tab) => (
          <button
            key={tab}
            className="flex-shrink-0 px-4 text-[13.5px] font-medium text-gray-500 border-b-2 border-transparent hover:text-[#0A2ECB] transition-colors whitespace-nowrap"
          >
            {tab}
          </button>
        ))}
      </div>
    </nav>
  )
}
