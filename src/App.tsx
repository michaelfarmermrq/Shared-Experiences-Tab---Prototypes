import { useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import PrototypeSwitcher from './components/PrototypeSwitcher'
import Prototype1 from './prototypes/Prototype1'
import Prototype2 from './prototypes/Prototype2'

const SWITCHER_OPEN_HEIGHT = 40
const SWITCHER_CLOSED_HEIGHT = 20

export default function App() {
  const [switcherHeight, setSwitcherHeight] = useState(SWITCHER_OPEN_HEIGHT)

  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      <PrototypeSwitcher onHeightChange={setSwitcherHeight} />
      <Routes>
        <Route path="/" element={<Navigate to="/prototype/1" replace />} />
        <Route path="/prototype/1" element={<Prototype1 topOffset={switcherHeight} />} />
        <Route path="/prototype/2/*" element={<Prototype2 topOffset={switcherHeight} />} />
      </Routes>
    </div>
  )
}
