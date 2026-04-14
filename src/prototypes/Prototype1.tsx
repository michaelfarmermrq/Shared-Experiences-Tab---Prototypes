import Header from '../components/Header'
import SubNav from '../components/SubNav'
import FeaturedCarousel from '../components/FeaturedCarousel'
import GameRow from '../components/GameRow'
import { categories } from '../data/games'

interface Props {
  topOffset: number
}

export default function Prototype1({ topOffset }: Props) {
  return (
    <div className="bg-white min-h-screen">
      <Header topOffset={topOffset} />
      <SubNav topOffset={topOffset + 64} />
      <main className="bg-gray-100">
        <FeaturedCarousel />
        {categories.map((category) => (
          <GameRow key={category.id} category={category} />
        ))}
        <div className="pb-8" />
      </main>
    </div>
  )
}
