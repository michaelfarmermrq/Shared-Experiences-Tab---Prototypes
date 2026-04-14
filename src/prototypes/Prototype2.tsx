import { Routes, Route } from 'react-router-dom'
import RoomLobby from '../prototype2/pages/RoomLobby'
import RoomInterior from '../prototype2/components/RoomInterior'

interface Props {
  topOffset: number
}

export default function Prototype2({ topOffset }: Props) {
  return (
    <Routes>
      <Route path="/" element={<RoomLobby topOffset={topOffset} />} />
      <Route path="/room/:id" element={<RoomInterior topOffset={topOffset} />} />
    </Routes>
  )
}
