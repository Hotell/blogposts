import React, { Component } from 'react'
import { HeroList } from './hero-list'
import { Inject, AsyncPipe } from '../../inject'
import { HeroService } from '../hero.service'
import { Hero } from '../hero'
import { HeroDetail } from './hero-detail'

type Props = {}
type State = Readonly<typeof initialState>
const initialState = {
  currentHero: (null as any) as Hero,
}
export class Heroes extends Component<Props, State> {
  readonly state = initialState
  render() {
    const { currentHero } = this.state
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
                      'Fetching data...'
                    ) : (
                      <HeroList
                        heroes={resolved}
                        onSelect={(selectedHero) => this.setCurrentHero(selectedHero)}
                      />
                    )
                  }
                </AsyncPipe>
                {/* {currentHero && <HeroDetail hero={currentHero} />} */}
                {currentHero && (
                  <AsyncPipe value={heroService.getHero(currentHero.id)}>
                    {({ isLoading, resolved }) =>
                      isLoading ? 'Fetching detail...' : <HeroDetail hero={resolved} />
                    }
                  </AsyncPipe>
                )}
              </>
            )
          }}
        </Inject>
      </>
    )
  }

  private setCurrentHero(hero: Hero) {
    this.setState((prevState) => ({ currentHero: hero }))
  }
}
