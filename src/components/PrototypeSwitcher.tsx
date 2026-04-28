import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/24/outline'

const prototypes = [
  { path: '/prototype/1', label: 'Prototype 1' },
  { path: '/prototype/2', label: 'Prototype 2' },
  { path: '/prototype/2-test', label: 'Storyboards' },
]

interface Props {
  onHeightChange: (px: number) => void
}

export default function PrototypeSwitcher({ onHeightChange }: Props) {
  const [open, setOpen] = useState(true)

  function toggle() {
    const next = !open
    setOpen(next)
    onHeightChange(next ? 40 : 20)
  }

  return (
    <div
      className={[
        'sticky top-0 z-[100] bg-slate-800 flex items-center transition-all duration-200 overflow-hidden',
        open ? 'h-10' : 'h-5',
      ].join(' ')}
    >
      {open ? (
        <>
          {/* Left label */}
          <span className="pl-4 pr-6 text-[10px] font-bold tracking-widest uppercase text-slate-500 whitespace-nowrap select-none">
            Prototypes
          </span>

          {/* Centre: prototype links */}
          <div className="flex items-center gap-1.5 flex-1">
            {prototypes.map((p) => (
              <NavLink
                key={p.path}
                to={p.path}
                className={({ isActive }) =>
                  [
                    'px-3 py-0.5 rounded-full text-xs font-semibold transition-colors',
                    isActive
                      ? 'bg-white text-slate-800'
                      : 'text-slate-400 hover:text-white',
                  ].join(' ')
                }
              >
                {p.label}
              </NavLink>
            ))}
          </div>

          {/* Right: collapse */}
          <button
            onClick={toggle}
            aria-label="Collapse prototype switcher"
            className="pr-4 pl-2 text-slate-500 hover:text-slate-300 transition-colors"
          >
            <ChevronUpIcon className="w-4 h-4" />
          </button>
        </>
      ) : (
        /* Collapsed: just the expand chevron centred */
        <button
          onClick={toggle}
          aria-label="Expand prototype switcher"
          className="w-full flex items-center justify-center text-slate-500 hover:text-slate-300 transition-colors"
        >
          <ChevronDownIcon className="w-3.5 h-3.5" />
        </button>
      )}
    </div>
  )
}
