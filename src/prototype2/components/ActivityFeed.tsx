import type { ActivityEvent } from '../data/mockData'

interface Props {
  events: ActivityEvent[]
}

export default function ActivityFeed({ events }: Props) {
  return (
    <div>
      <h3 className="text-[15px] font-bold text-gray-900 mb-3">Activity</h3>
      <div className="space-y-2.5">
        {events.map((e) => (
          <div key={e.id} className="flex items-center gap-3">
            {/* Avatar */}
            <div className="w-7 h-7 rounded-full bg-gray-200 flex items-center justify-center text-[11px] font-bold text-gray-600 flex-shrink-0">
              {e.initials}
            </div>

            {/* Text */}
            <p className="text-sm text-gray-700 flex-1 min-w-0">
              <span className="font-semibold">{e.player}</span>
              {' won '}
              <span className="font-bold text-green-600">£{e.amount.toFixed(2)}</span>
              {' on '}
              <span className="text-gray-500">{e.game}</span>
            </p>

            {/* Time */}
            <span className="text-xs text-gray-400 flex-shrink-0">{e.time}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
