import React, { Component } from 'react'
import { HeroList } from './hero-list'
import { Inject } from '../../inject'
import { HeroService } from '../hero.service'

export class Heroes extends Component {
  render() {
    return (
      <>
        <h2>Heroes</h2>
        <Inject injectablesMap={{ heroService: HeroService }}>
          {({ heroService }) => {
            return <HeroList heroes={heroService.getHeroes()} />
          }}
        </Inject>
      </>
    )
  }
}
