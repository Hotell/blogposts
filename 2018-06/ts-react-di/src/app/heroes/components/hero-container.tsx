import React, { Component } from 'react'
import { HeroService } from '../hero.service'
import { HeroList } from './hero-list'
import { HeroDetail } from './hero-detail'

type Props = {
  service: HeroService
}
export class HeroCointainer extends Component<Props> {
  render() {
    const { service } = this.props
    return (
      <>
        {service.state.heroes && (
          <HeroList
            heroes={service.state.heroes}
            onSelect={(selectedHero) => service.getHero(selectedHero.id)}
          />
        )}
        <hr />
        {service.state.current && <HeroDetail hero={service.state.current} />}
      </>
    )
  }
  componentDidMount() {
    this.props.service.getHeroes()
  }
}
