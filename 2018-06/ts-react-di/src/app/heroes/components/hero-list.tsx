import React, { Component, SyntheticEvent } from 'react'

import { Hero } from '../hero'

type Props = {
  onSelect: (hero: Hero) => void
  heroes: Hero[]
}

export class HeroList extends Component<Props> {
  render() {
    return (
      <>
        {this.props.heroes!.map((hero) => (
          <div key={hero.id} onClick={this.handleHeroSelect(hero)} style={{ cursor: 'pointer' }}>
            {hero.id} - {hero.name}
          </div>
        ))}
      </>
    )
  }
  private handleHeroSelect(hero: Hero) {
    return (ev: SyntheticEvent) => this.props.onSelect(hero)
  }
}
