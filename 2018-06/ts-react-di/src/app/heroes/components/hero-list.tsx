import React, { Component } from 'react'
import { Hero } from '../hero'
import { HEROES } from '../mock-heroes'

type Props = {
  heroes?: Hero[]
}

export class HeroList extends Component<Props> {
  static defaultProps = {
    heroes: HEROES.slice(2),
  }
  render() {
    return (
      <>
        {this.props.heroes!.map((hero) => (
          <div key={hero.id}>
            {hero.id} - {hero.name}
          </div>
        ))}
      </>
    )
  }
}
