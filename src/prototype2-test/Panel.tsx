import type { ReactNode } from 'react'

interface Props {
  index: number
  total: number
  title: string
  caption: string
  showCaption: boolean
  children: ReactNode
}

/**
 * Frame for a single storyboard step: a numbered greyscale panel
 * with an optional caption above the image. Static — nothing clickable.
 */
export default function Panel({ index, total, title, caption, showCaption, children }: Props) {
  return (
    <figure className="flex flex-col">
      {showCaption ? (
        <figcaption className="mb-3 flex gap-3 items-start">
          <div className="flex-shrink-0 w-7 h-7 rounded-full bg-gray-800 text-white text-xs font-semibold flex items-center justify-center">
            {index}
          </div>
          <div className="flex-1">
            <div className="text-sm font-semibold text-gray-900">
              {title}
              <span className="text-gray-400 font-normal ml-2">
                · Step {index} of {total}
              </span>
            </div>
            <div className="text-sm text-gray-600 leading-snug">{caption}</div>
          </div>
        </figcaption>
      ) : null}
      <div className="rounded-lg border border-gray-300 bg-white overflow-hidden shadow-sm">
        {/* The wireframe content fills the panel — fixed aspect for visual rhythm */}
        <div className="aspect-[16/10] flex flex-col">{children}</div>
      </div>
    </figure>
  )
}
