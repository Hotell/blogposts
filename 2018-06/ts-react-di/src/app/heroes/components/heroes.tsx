import React, { Component } from 'react'
import { HeroList } from './hero-list'
import { Inject, AsyncPipe, asyncPipe } from '../../inject'
import { HeroService } from '../hero.service'
import { Hero } from '../hero'
import { HeroDetail } from './hero-detail'

type Maybe<T> = T | null
type Props = {}
type State = Readonly<typeof initialState>
const initialState = {
  selectedHero: null as Maybe<Hero>,
}
export class Heroes extends Component<Props, State> {
  readonly state = initialState
  render() {
    const { selectedHero } = this.state
    return (
      <>
        <h2>Heroes</h2>
        <Inject providers={{ heroService: HeroService }}>
          {({ heroService }) => {
            return (
              <>
                <AsyncPipe value={heroService.getHeroes()}>
                  {({ isLoading, resolved }) =>
                    isLoading ? (
                      'Fetching Heroes...'
                    ) : (
                      <HeroList heroes={resolved} onSelect={this.setCurrentHero} />
                    )
                  }
                </AsyncPipe>
                {selectedHero && (
                  <>
                    <button onClick={this.handleCloseDetail}>Close detail</button>
                    <AsyncPipe key={selectedHero.id} value={heroService.getHero(selectedHero.id)}>
                      {({ isLoading, resolved }) =>
                        isLoading ? 'Fetching detail...' : <HeroDetail hero={resolved} />
                      }
                    </AsyncPipe>
                  </>
                )}
              </>
            )
          }}
        </Inject>
      </>
    )
  }

  private setCurrentHero = (hero: Hero | null) => {
    this.setState((prevState) => ({ selectedHero: hero }))
  }
  private handleCloseDetail = () => this.setCurrentHero(null)
}
