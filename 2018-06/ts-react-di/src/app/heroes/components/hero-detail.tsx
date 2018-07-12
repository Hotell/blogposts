import React, { Component } from 'react'
import { Hero } from '../hero'

type Props = { hero: Hero }
export class HeroDetail extends Component<Props> {
  render() {
    const { hero } = this.props
    return (
      <div>
        <h3>Hero: {hero.name}</h3>
        <form>
          <div>
            <label>Id:</label>
            <span>{hero.id}</span>
          </div>
          <label>
            <b>Is Secret?:</b>
            <input type="checkbox" checked={hero.isSecret} onChange={console.log} />
          </label>
        </form>
      </div>
    )
  }
}
