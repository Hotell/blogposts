// DONT ❌ !

/** @jsx createElement */
import { createElement } from 'react'

type Trick = {
  name: string
  difficulty: 'beginner' | 'intermediate' | 'pro'
}
type Props = {
  tricks: Trick[]
}

export const SkaterBoy = ({ tricks }: Props) => (
  <div>
    <ul>
      {tricks.map((trick) => (
        <li>{JSON.stringify(trick, null, 2)}</li>
      ))}
    </ul>
  </div>
)
