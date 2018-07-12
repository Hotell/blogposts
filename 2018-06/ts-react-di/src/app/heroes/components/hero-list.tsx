import React, { Component, SyntheticEvent } from 'react'

import './hero-list.css'

import { Hero } from '../hero'

type Props = {
  onSelect: (hero: Hero) => void
  heroes: Hero[]
}

export class HeroList extends Component<Props> {
  render() {
    return (
      <div className="hero-list">
        {this.props.heroes.map((hero) => (
          <div
            key={hero.id}
            className="hero-list__item"
            onClick={this.handleHeroSelect(hero)}
            style={{ cursor: 'pointer' }}
          >
            {hero.id} - {hero.name}
          </div>
        ))}
      </div>
    )
  }
  private handleHeroSelect(hero: Hero) {
    return (ev: SyntheticEvent) => this.props.onSelect(hero)
  }
}
