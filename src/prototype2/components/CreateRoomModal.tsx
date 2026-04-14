import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { XMarkIcon, ClipboardDocumentIcon, CheckIcon } from '@heroicons/react/24/outline'
import { availableGames } from '../data/mockData'

interface Props {
  onClose: () => void
}

type Step = 'form' | 'success'
type Privacy = 'public' | 'private'

export default function CreateRoomModal({ onClose }: Props) {
  const navigate = useNavigate()
  const [step, setStep] = useState<Step>('form')
  const [name, setName] = useState('')
  const [game, setGame] = useState(availableGames[0])
  const [privacy, setPrivacy] = useState<Privacy>('public')
  const [password, setPassword] = useState('')
  const [copied, setCopied] = useState(false)

  const fakeLink = 'mrq.com/room/abc123'

  function handleCreate() {
    if (!name.trim()) return
    setStep('success')
  }

  function handleCopy() {
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  function handleEnterRoom() {
    onClose()
    navigate('/prototype/2/room/book-of-dead')
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-[200] flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">

        {step === 'form' ? (
          <>
            {/* Header */}
            <div className="flex items-center justify-between px-6 pt-5 pb-4 border-b border-gray-100">
              <h2 className="text-base font-bold text-gray-900">Create a Room</h2>
              <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
                <XMarkIcon className="w-5 h-5" />
              </button>
            </div>

            {/* Form */}
            <div className="px-6 py-5 space-y-4">
              {/* Room name */}
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
                  Room Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Michael's Lucky Room"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0A2ECB]/30 focus:border-[#0A2ECB]"
                />
              </div>

              {/* Game */}
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
                  Game
                </label>
                <select
                  value={game}
                  onChange={(e) => setGame(e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#0A2ECB]/30 focus:border-[#0A2ECB] bg-white"
                >
                  {availableGames.map((g) => (
                    <option key={g} value={g}>{g}</option>
                  ))}
                </select>
              </div>

              {/* Public / Private */}
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
                  Privacy
                </label>
                <div className="flex gap-2">
                  {(['public', 'private'] as Privacy[]).map((opt) => (
                    <button
                      key={opt}
                      onClick={() => setPrivacy(opt)}
                      className={[
                        'flex-1 py-2 rounded-lg text-sm font-semibold border transition-colors capitalize',
                        privacy === opt
                          ? 'bg-[#0A2ECB] text-white border-[#0A2ECB]'
                          : 'bg-white text-gray-500 border-gray-200 hover:border-gray-300',
                      ].join(' ')}
                    >
                      {opt === 'public' ? '🌐 Public' : '🔒 Private'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Password (private only) */}
              {privacy === 'private' && (
                <div className="animate-[slideDown_150ms_ease-out]">
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
                    Password
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Set a room password"
                    className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0A2ECB]/30 focus:border-[#0A2ECB]"
                  />
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex gap-3 px-6 pb-6">
              <button
                onClick={onClose}
                className="flex-1 py-2.5 rounded-lg border border-gray-200 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleCreate}
                disabled={!name.trim()}
                className="flex-1 py-2.5 rounded-lg bg-[#0A2ECB] text-white text-sm font-semibold disabled:opacity-40 hover:bg-[#0825a8] transition-colors"
              >
                Create Room
              </button>
            </div>
          </>
        ) : (
          /* Success step */
          <div className="px-6 py-8 text-center">
            <div className="text-4xl mb-3">🎉</div>
            <h2 className="text-lg font-bold text-gray-900 mb-1">Room Created!</h2>
            <p className="text-sm text-gray-500 mb-6">Share the link with your friends to invite them.</p>

            {/* Copy link */}
            <div className="flex items-center gap-2 bg-gray-100 rounded-lg px-4 py-3 mb-6">
              <span className="flex-1 text-sm text-gray-600 text-left truncate">{fakeLink}</span>
              <button
                onClick={handleCopy}
                className="flex-shrink-0 text-[#0A2ECB] hover:opacity-70 transition-opacity"
                aria-label="Copy link"
              >
                {copied
                  ? <CheckIcon className="w-4 h-4 text-green-500" />
                  : <ClipboardDocumentIcon className="w-4 h-4" />
                }
              </button>
            </div>

            <button
              onClick={handleEnterRoom}
              className="w-full py-3 rounded-lg bg-[#0A2ECB] text-white text-sm font-bold hover:bg-[#0825a8] transition-colors"
            >
              Enter Room →
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
